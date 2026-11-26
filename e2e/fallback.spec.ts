import { expect, test } from '@playwright/test';

/* Runs in the `fallback` project: reduced motion and WebGL disabled. */
test.describe('fallbacks', () => {
  test('the poster holds the stage and no canvas loads', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);
    await expect(page.locator('#home [role="img"] svg').first()).toBeVisible();
    await expect(page.locator('[data-figurine="3d"]')).toHaveCount(0);
    await expect(page.locator('canvas')).toHaveCount(0);
  });

  test('sections do not animate under reduced motion', async ({ page }) => {
    await page.goto('/');
    const names = await page
      .locator('main > section[data-studio]:not(#home) > div')
      .evaluateAll((nodes) => nodes.map((n) => getComputedStyle(n).animationName));
    expect(names.every((name) => name === 'none')).toBe(true);
  });

  test('?webgl=off forces the poster on a capable desktop', async ({ page }) => {
    await page.goto('/?webgl=off');
    await page.waitForTimeout(1500);
    await expect(page.locator('[data-figurine="3d"]')).toHaveCount(0);
  });
});
