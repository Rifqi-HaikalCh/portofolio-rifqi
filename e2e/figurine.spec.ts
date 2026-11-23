import { expect, test, type Page } from '@playwright/test';

/*
  Paper puppet gates (docs/art-motion-upgrade.md §6): the 3D view must match the
  SVG poster at rest, and the canvas must not render while nothing moves.
  Desktop only: the 3D view never loads under 1024 px.
*/

async function show3d(page: Page) {
  await page.addInitScript(() => {
    // Skip the once-per-session wave so the figure is at rest.
    sessionStorage.setItem('paperdesk:figurine-waved', '1');
    // Count WebGL draw calls.
    const w = window as unknown as { __draws: number };
    w.__draws = 0;
    for (const proto of [WebGL2RenderingContext.prototype, WebGLRenderingContext.prototype]) {
      for (const name of ['drawElements', 'drawArrays'] as const) {
        const original = proto[name] as (...args: unknown[]) => void;
        (proto as unknown as Record<string, unknown>)[name] = function (this: unknown, ...args: unknown[]) {
          w.__draws += 1;
          return original.apply(this, args);
        };
      }
    }
  });
  await page.goto('/');
  const layer = page.locator('[data-figurine="3d"]');
  await expect(layer).toHaveCSS('opacity', '1', { timeout: 15_000 });
  return page.locator('.stage-fig [role="img"]');
}

test.describe('paper puppet', () => {
  test.beforeEach(({ isMobile }) => {
    test.skip(isMobile, '3D loads on desktop only');
  });

  test('3D matches the poster at rest', async ({ page }) => {
    const slot = await show3d(page);
    await page.waitForTimeout(400);
    const threeD = await slot.screenshot();
    await page.evaluate(() => {
      const s = document.querySelector('.stage-fig [role="img"]') as HTMLElement;
      (s.children[0] as HTMLElement).style.transition = 'none';
      (s.children[1] as HTMLElement).style.transition = 'none';
      (s.children[0] as HTMLElement).style.opacity = '1';
      (s.children[1] as HTMLElement).style.opacity = '0';
    });
    await page.waitForTimeout(100);
    const poster = await slot.screenshot();

    const diff = await page.evaluate(
      async ([a, b]) => {
        const load = (src: string) =>
          new Promise<HTMLImageElement>((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.src = `data:image/png;base64,${src}`;
          });
        const [ia, ib] = await Promise.all([load(a), load(b)]);
        const read = (img: HTMLImageElement) => {
          const c = document.createElement('canvas');
          c.width = img.width;
          c.height = img.height;
          const ctx = c.getContext('2d')!;
          ctx.drawImage(img, 0, 0);
          return ctx.getImageData(0, 0, c.width, c.height).data;
        };
        const da = read(ia);
        const db = read(ib);
        // A pixel differs only if no poster pixel within 1 px matches it: SVG strokes
        // and GL lines antialias differently, and that is not a drawing mismatch.
        const w = ia.width;
        const h = ia.height;
        const close = (i: number, j: number) =>
          Math.max(Math.abs(da[i] - db[j]), Math.abs(da[i + 1] - db[j + 1]), Math.abs(da[i + 2] - db[j + 2])) <= 48;
        let off = 0;
        for (let y = 0; y < h; y += 1) {
          for (let x = 0; x < w; x += 1) {
            const i = (y * w + x) * 4;
            let match = false;
            for (let dy = -1; dy <= 1 && !match; dy += 1) {
              for (let dx = -1; dx <= 1 && !match; dx += 1) {
                const nx = x + dx;
                const ny = y + dy;
                if (nx >= 0 && ny >= 0 && nx < w && ny < h) match = close(i, (ny * w + nx) * 4);
              }
            }
            if (!match) off += 1;
          }
        }
        return off / (w * h);
      },
      [threeD.toString('base64'), poster.toString('base64')] as const,
    );
    console.log(`poster ↔ 3D pixel difference: ${(diff * 100).toFixed(2)} %`);
    expect(diff).toBeLessThan(0.02);
  });

  test('the canvas renders nothing while idle', async ({ page }) => {
    await show3d(page);
    await page.waitForTimeout(500);
    const before = await page.evaluate(() => (window as unknown as { __draws: number }).__draws);
    await page.waitForTimeout(1500); // the first blink is at least 4 s away
    const after = await page.evaluate(() => (window as unknown as { __draws: number }).__draws);
    expect(after - before).toBe(0);
  });

  test('hovering the laptop renders the look clip, then stops', async ({ page }) => {
    await show3d(page);
    await page.waitForTimeout(500);
    const before = await page.evaluate(() => (window as unknown as { __draws: number }).__draws);
    await page.locator('#home .laptop-screen').hover();
    await page.waitForTimeout(600);
    const during = await page.evaluate(() => (window as unknown as { __draws: number }).__draws);
    expect(during).toBeGreaterThan(before);
    // The clip lasts 1.75 s; then the canvas goes quiet again. A random blink
    // (one 120 ms burst) may land in between, so wait for a quiet 600 ms window.
    await expect
      .poll(
        async () => {
          const a = await page.evaluate(() => (window as unknown as { __draws: number }).__draws);
          await page.waitForTimeout(600);
          const b = await page.evaluate(() => (window as unknown as { __draws: number }).__draws);
          return b - a;
        },
        { timeout: 6_000, intervals: [0] },
      )
      .toBe(0);
  });
});
