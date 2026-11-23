import { expect, test } from '@playwright/test';
import { cueBeat, toReadingWindow } from './helpers';

test.describe('interaction', () => {
  test('every role comes out of its own folder as its own beat', async ({ page }) => {
    await page.goto('/');
    const chapter = page.locator('#experience');
    await expect(chapter.locator('.beat[data-beat^="work-"]')).toHaveCount(6);
    await expect(chapter.locator('.beat[data-beat^="organization-"]')).toHaveCount(2);
    await expect(chapter.locator('.beat-track')).toHaveCount(9);
    // Each role has a folder in the drawer for its sheet to come out of.
    for (const set of ['work', 'organization']) {
      const beats = await chapter.locator(`.beat[data-beat^="${set}-"]`).evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.beat));
      for (const id of beats) await expect(chapter.locator(`.stage [data-obj="${id}"]`), id).toHaveCount(1);
    }
  });

  test('in-page links land on their target', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'View projects' }).click();
    // A chapter link lands with its first beat composed (§4.4), so the title is what must be on screen.
    await expect(page.locator('#projects-title')).toBeInViewport({ ratio: 1 });
  });

  test('a role file opens from the keyboard and returns focus', async ({ page }) => {
    await page.goto('/');
    await cueBeat(page, 'experience', 'work-1');
    const open = await toReadingWindow(page.locator('#experience .beat[data-beat="work-1"]').getByRole('button', { name: /Open the file/ }));
    await open.focus();
    await page.keyboard.press('Enter');
    const dialog = page.locator('dialog[open]');
    await expect(dialog).toBeVisible();
    await expect(dialog.locator('li').first()).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    await expect(open).toBeFocused();
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
