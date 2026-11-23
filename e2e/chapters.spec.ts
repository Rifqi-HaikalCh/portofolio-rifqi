import { expect, test } from '@playwright/test';

/*
  Chapter Theatre (DesignRules.md §4, §9.7). On a desktop with scroll-driven
  animations every chapter pins its stage; scroll only cues beats, so every
  pinned sheet lands, lies flat and holds still while the wheel moves through
  its track (§4.4 v3.3), and no handoff widens the page. Under reduced motion
  the same markup is the stacked studio.
*/

const chapters = ['about', 'experience', 'services', 'projects', 'certificates', 'contact'];

test.describe('chapter theatre', () => {
  // Every test walks the whole page; under six workers a cold load alone can take 20 s.
  test.describe.configure({ timeout: 60_000 });

  test('every pinned beat is cued, composed and still during its track', async ({ page, isMobile }) => {
    test.skip(isMobile, 'pinned sheets are a desktop layout; the split stage keeps sheets in flow');
    test.setTimeout(120_000);
    await page.goto('/');
    await page.evaluate(() => (document.documentElement.style.scrollBehavior = 'auto'));

    for (const id of chapters) {
      const chapter = page.locator(`#${id}`);
      await expect(chapter, id).toHaveClass(/chapter/);
      await expect(chapter, `${id} is cued`).toHaveAttribute('data-cue', '');
      await expect(chapter, `${id} is in the theatre`).not.toHaveAttribute('data-stacked', /.*/);
      expect(await chapter.locator('.stage').evaluate((el) => getComputedStyle(el).position), `${id} stage`).toBe('sticky');

      const beats = await chapter.locator('.beat-track').evaluateAll((nodes) => nodes.map((n) => (n as HTMLElement).dataset.track));
      for (const [i, beat] of beats.entries()) {
        const where = `${id}/${beat}`;
        const sheet = chapter.locator(`.beat-deck > [data-beat="${beat}"] > .beat-sheet`);
        // Cue line (viewport middle) at the centre of the beat's track, then give the sheet time to land.
        const centre = async (shift = 0) =>
          chapter.locator('.beat-track').nth(i).evaluate((el, s) => {
            const r = el.getBoundingClientRect();
            scrollTo(0, r.top + scrollY + r.height / 2 - innerHeight / 2 + s * innerHeight);
          }, shift);
        await centre();
        await expect(chapter.locator(`.beat-deck > [data-beat="${beat}"]`), `${where} is on`).toHaveAttribute('data-state', 'in');
        await page.waitForTimeout(1500);
        const read = () =>
          sheet.evaluate((el) => {
            const r = el.getBoundingClientRect();
            const cs = getComputedStyle(el);
            return { top: r.top, bottom: r.bottom, transform: cs.transform, opacity: Number(cs.opacity), vh: innerHeight };
          });
        const state = await read();
        expect(state.transform === 'none' || state.transform === 'matrix(1, 0, 0, 1, 0, 0)', `${where} lies flat (${state.transform})`).toBe(true);
        expect(state.opacity, `${where} opacity`).toBe(1);
        expect(state.top, `${where} sits at --beat-top`).toBeCloseTo(state.vh * 0.18, -1);
        expect(state.bottom, `${where} fits the viewport`).toBeLessThanOrEqual(state.vh);
        // The wheel moves inside the track: the text does not (§4.4 v3.3).
        await centre(0.12);
        await page.waitForTimeout(150);
        expect((await read()).top, `${where} holds still while scrolling`).toBeCloseTo(state.top, 0);
        // Exactly one pinned sheet is showing.
        const shown = await chapter.locator('.beat-deck > .beat > .beat-sheet').evaluateAll((els) => els.filter((e) => Number(getComputedStyle(e).opacity) > 0).length);
        expect(shown, `${where}: one sheet at a time`).toBe(1);
      }
    }
  });

  test('no stage shows before its chapter arrives', async ({ page, isMobile }) => {
    test.skip(isMobile, 'stage moves are desktop only');
    await page.goto('/');
    await page.evaluate(() => (document.documentElement.style.scrollBehavior = 'auto'));
    for (const id of chapters) {
      const tracks = page.locator(`#${id} .beat-track`);
      const n = await tracks.count();
      for (const k of [0, n - 1]) {
        await tracks.nth(k).evaluate((t) => {
          const r = t.getBoundingClientRect();
          scrollTo(0, r.top + scrollY + r.height / 2 - innerHeight / 2);
        });
        await page.waitForTimeout(100);
        const seen = await page.evaluate(() =>
          [0.2, 0.5, 0.8].flatMap((fy) => [0.1, 0.9].map((fx) => document.elementFromPoint(innerWidth * fx, innerHeight * fy)?.closest('section')?.id)),
        );
        expect(seen.filter((s) => s && s !== id), `${id} track ${k}`).toEqual([]);
      }
    }
  });

  test('handoffs never widen the page', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => (document.documentElement.style.scrollBehavior = 'auto'));
    for (const id of chapters) {
      // Halfway through the move into this chapter.
      await page.locator(`#${id}`).evaluate((el) => scrollTo(0, el.getBoundingClientRect().top + scrollY - innerHeight / 2));
      await page.waitForTimeout(80);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      expect(overflow, `entering #${id}`).toBeLessThanOrEqual(0);
    }
  });

  test('text zoom that makes a pinned sheet too tall drops that chapter to the stacked studio', async ({ page, isMobile }) => {
    test.skip(isMobile, 'the 70 % test is a desktop-lane measure');
    await page.goto('/');
    await expect(page.locator('#about')).toHaveAttribute('data-cue', '');
    // 200 % text zoom (browser text-size setting): the root font doubles, the viewport does not.
    await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
    const stacked = page.locator('.chapter[data-stacked]');
    await expect.poll(() => stacked.count()).toBeGreaterThan(0);
    for (const id of await stacked.evaluateAll((els) => els.map((e) => e.id))) {
      expect(await page.locator(`#${id} .stage`).evaluate((el) => getComputedStyle(el).position), id).not.toBe('sticky');
      await expect(page.locator(`#${id} .beat-sheet`).first(), id).toBeVisible();
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0);
  });

  test('page zoom of 200 % (a 720 × 450 viewport) is the stacked studio with no overflow', async ({ page, isMobile }) => {
    test.skip(isMobile, 'desktop zoom');
    await page.setViewportSize({ width: 720, height: 450 });
    await page.goto('/');
    for (const id of chapters) {
      expect(await page.locator(`#${id} .stage`).evaluate((el) => getComputedStyle(el).position), id).not.toBe('sticky');
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0);
  });

  test('no horizontal overflow at 320 px anywhere on the walk', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 640 });
    await page.goto('/');
    await page.evaluate(() => (document.documentElement.style.scrollBehavior = 'auto'));
    for (const y of [0, 0.2, 0.4, 0.6, 0.8, 1]) {
      await page.evaluate((f) => scrollTo(0, (document.documentElement.scrollHeight - innerHeight) * f), y);
      await page.waitForTimeout(150);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth), `at ${y}`).toBeLessThanOrEqual(0);
    }
  });

  test('the chapter bar names the chapter and links the next one', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    const bar = page.getByRole('navigation', { name: 'Chapter' });
    await expect(bar).toBeHidden();
    await page.locator('#experience').evaluate((el) => el.scrollIntoView());
    await expect(bar).toBeVisible();
    await expect(bar).toContainText('Experience');
    await bar.getByRole('link').click();
    await expect(bar).toContainText('Services');
  });

  test('reduced motion lays chapters out as the stacked studio', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    for (const id of chapters) {
      expect(await page.locator(`#${id} .stage`).evaluate((el) => getComputedStyle(el).position), id).not.toBe('sticky');
      await expect(page.locator(`#${id} .beat-sheet`).first(), id).toBeVisible();
    }
  });
});
