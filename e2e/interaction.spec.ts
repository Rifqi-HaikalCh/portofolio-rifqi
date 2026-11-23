import { expect, test } from '@playwright/test';

test.describe('interaction', () => {
  test('experience tabs follow the ARIA tabs pattern', async ({ page }) => {
    await page.goto('/');
    const work = page.locator('#experience-tab-work');
    const org = page.locator('#experience-tab-organization');
    await work.focus();
    await page.keyboard.press('ArrowRight');
    await expect(org).toBeFocused();
    await expect(org).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('#experience-panel-organization')).toBeVisible();
    await expect(page.locator('#experience-panel-work')).toBeHidden();
    await page.keyboard.press('Home');
    await expect(work).toBeFocused();
  });

  test('in-page links land on their target', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'View projects' }).click();
    await expect
      .poll(() => page.locator('#projects').evaluate((el) => Math.round(el.getBoundingClientRect().top)))
      .toBeLessThan(200);
    const top = await page.locator('#projects').evaluate((el) => el.getBoundingClientRect().top);
    expect(top).toBeGreaterThanOrEqual(0);
  });

  test('ledger rows unfold from the keyboard', async ({ page }) => {
    await page.goto('/');
    const row = page.locator('#experience-panel-work details').first();
    await row.locator('summary').focus();
    await page.keyboard.press('Enter');
    await expect(row).toHaveAttribute('open', '');
    await expect(row.locator('.folio-body li').first()).toBeVisible();
  });

  test('case study opens, closes on Escape and returns focus', async ({ page }) => {
    await page.goto('/');
    const trigger = page.locator('#projects .stretched').first();
    await trigger.click();
    const dialog = page.locator('dialog[open]');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('heading', { level: 3 })).toHaveText(await trigger.innerText());
    const scrollBefore = await page.evaluate(() => window.scrollY);
    expect(scrollBefore).toBeGreaterThan(0);
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();
  });

  test('archive filters, searches and announces the count', async ({ page }) => {
    await page.goto('/');
    const opener = page.getByRole('button', { name: /Open the archive/ });
    await opener.click();
    const drawer = page.locator('dialog[open]');
    const status = drawer.getByRole('status');
    await expect(status).toHaveText('22 of 22 projects');

    await drawer.getByRole('button', { name: /^Design/ }).click();
    await expect(status).toHaveText('7 of 22 projects');

    await drawer.getByRole('button', { name: /^All/ }).click();
    await drawer.getByLabel('Search by name or tool').fill('spring');
    await expect(status).not.toHaveText('22 of 22 projects');
    await drawer.getByLabel('Search by name or tool').fill('zzzz');
    await expect(status).toHaveText('0 of 22 projects');
    await expect(drawer.getByText('This drawer is empty.')).toBeVisible();

    await drawer.getByRole('button', { name: /Back to desk/ }).click();
    await expect(drawer).toHaveCount(0);
    await expect(opener).toBeFocused();
  });

  test('certificate folios open and link out safely', async ({ page }) => {
    await page.goto('/');
    const folios = page.locator('[data-eqbot="certificates-list"] details');
    await expect(folios).toHaveCount(4);
    await expect(folios.first()).toHaveAttribute('open', '');
    await folios.nth(1).locator('summary').click();
    await expect(folios.nth(1)).toHaveAttribute('open', '');
    const link = folios.nth(1).getByRole('link').first();
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', /noopener/);
  });

  test('theme switch toggles the dark class and reports its state', async ({ page, isMobile }) => {
    test.skip(isMobile, 'navbar theme button is hidden under 640 px; covered by the mobile menu');
    await page.goto('/');
    const html = page.locator('html');
    const startsDark = await html.evaluate((el) => el.classList.contains('dark'));
    const toggle = page.locator('header').getByRole('button', { name: /dark mode/i });
    await expect(toggle).toHaveAttribute('aria-pressed', String(startsDark));
    await toggle.click();
    await expect.poll(() => html.evaluate((el) => el.classList.contains('dark'))).toBe(!startsDark);
    await expect(toggle).toHaveAttribute('aria-pressed', String(!startsDark));
  });

  test('mobile menu opens, keeps focus inside and closes on Escape', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'mobile only');
    await page.goto('/');
    const button = page.getByRole('button', { name: 'Open menu' });
    await button.click();
    const menu = page.locator('#mobile-nav');
    await expect(menu).toBeVisible();
    for (let i = 0; i < 12; i += 1) await page.keyboard.press('Tab');
    const inside = await page.evaluate(() => {
      const active = document.activeElement;
      return Boolean(active?.closest('#mobile-nav') || active?.closest('header'));
    });
    expect(inside).toBe(true);
    await page.keyboard.press('Escape');
    await expect(menu).toBeHidden();
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused();
  });
});
