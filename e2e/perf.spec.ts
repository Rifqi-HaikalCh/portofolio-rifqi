import { expect, test } from '@playwright/test';

/*
  Scroll smoothness gate (DesignRules.md §9.6, §17): a scripted top-to-bottom
  scroll through every chapter and handoff, watched with the Long Animation
  Frames API. Desktop: no frame over 50 ms. Mobile: 4× CPU throttle, no frame
  over 100 ms. Light projects only (the dark run doubles the time and paints
  the same layers). Run it alone for stable numbers:
  `npx playwright test e2e/perf.spec.ts --workers 1`.
*/

type Frame = { duration: number; y: number; section: string | null };

test('scrolling the whole page stays under the long-frame gate', async ({ page, browserName }, info) => {
  test.skip(browserName !== 'chromium', 'Long Animation Frames is Chromium-only');
  test.skip(!info.project.name.endsWith('-light'), 'Measured once per width');
  test.setTimeout(120_000);

  const mobile = info.project.name.startsWith('mobile');
  const gate = mobile ? 100 : 50;

  await page.goto('/');
  await page.waitForLoadState('load');
  await page.waitForTimeout(1500);

  if (mobile) {
    const cdp = await page.context().newCDPSession(page);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  }

  const frames = await page.evaluate(async () => {
    const found: { duration: number; y: number; section: string | null }[] = [];
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const section = [...document.querySelectorAll<HTMLElement>('section[id]')].find((s) => {
          const r = s.getBoundingClientRect();
          return r.top < innerHeight / 2 && r.bottom > innerHeight / 2;
        });
        found.push({ duration: Math.round(entry.duration), y: Math.round(scrollY), section: section?.id ?? null });
      }
    });
    observer.observe({ type: 'long-animation-frame', buffered: false });
    document.documentElement.style.scrollBehavior = 'auto';

    // About 2400 px/s: a brisk wheel scroll.
    await new Promise<void>((done) => {
      const step = () => {
        const end = document.documentElement.scrollHeight - innerHeight;
        if (scrollY >= end - 1) return done();
        scrollBy(0, 40);
        requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    await new Promise((r) => setTimeout(r, 600));
    observer.disconnect();
    return found;
  });

  const over = frames.filter((f: Frame) => f.duration > gate);
  info.annotations.push({
    type: 'long frames',
    description: JSON.stringify({ gate, count: frames.length, max: Math.max(0, ...frames.map((f) => f.duration)), over }),
  });
  expect(over, `long animation frames over ${gate} ms`).toEqual([]);
});
