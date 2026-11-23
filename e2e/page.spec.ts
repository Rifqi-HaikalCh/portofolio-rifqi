import { expect, test } from '@playwright/test';
import { eqbotAnchors, sectionIds, trackErrors } from './helpers';

test.describe('page structure', () => {
  test('renders every section in order with one h1 and no errors', async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto('/');

    const order = await page.locator('main > section[id]').evaluateAll((nodes) => nodes.map((n) => n.id));
    expect(order).toEqual([...sectionIds]);

    await expect(page.locator('h1')).toHaveCount(1);
    for (const id of sectionIds.slice(1)) {
      await expect(page.locator(`#${id} h2`).first(), `#${id} has an h2`).toBeVisible();
    }

    await page.waitForLoadState('networkidle');
    expect(errors).toEqual([]);
  });

  test('has no horizontal overflow', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test('keeps every EQbot anchor', async ({ page }) => {
    await page.goto('/');
    for (const anchor of eqbotAnchors) {
      await expect(page.locator(`[data-eqbot="${anchor}"]`), anchor).toHaveCount(1);
    }
  });

  test('skip link is the first tab stop and reaches main', async ({ page, isMobile }) => {
    test.skip(isMobile, 'keyboard tour runs on desktop');
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Skip to main content' });
    await expect(skip).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#main$/);
  });

  test('external links open safely', async ({ page }) => {
    await page.goto('/');
    const unsafe = await page
      .locator('a[target="_blank"]')
      .evaluateAll((links) => links.filter((a) => !/noopener/.test(a.getAttribute('rel') ?? '')).map((a) => a.getAttribute('href')));
    expect(unsafe).toEqual([]);
  });

  test('language switch flips <html lang> and the copy', async ({ page, isMobile }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    if (isMobile) {
      await page.getByRole('button', { name: 'Open menu' }).click();
      await page.getByRole('button', { name: 'Bahasa', exact: true }).click();
    } else {
      await page.locator('header').getByRole('button', { name: /Bahasa Indonesia/ }).click();
    }
    await expect(page.locator('html')).toHaveAttribute('lang', 'id');
    await expect(page.locator('#about-title [lang="id"]')).toHaveText('Tentang saya');
    await expect(page.locator('#about-title [lang="id"]')).toBeVisible();
    await expect(page.locator('#about-title [lang="en"]')).toBeHidden();
  });

  test('unknown routes show the empty drawer with a 404', async ({ page }) => {
    const response = await page.goto('/no-such-page');
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Nothing is filed here.');
    await expect(page.getByRole('link', { name: 'Back to the desk' })).toHaveAttribute('href', '/');
  });
});
