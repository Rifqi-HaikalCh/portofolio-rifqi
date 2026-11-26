import { expect, test } from '@playwright/test';
import { cueBeat, toReadingWindow } from './helpers';

test.describe('interaction', () => {
  test('every role comes out of its own folder as its own beat', async ({ page }) => {
    await page.goto('/');
    const chapter = page.locator('#experience');
    await expect(chapter.locator('.beat[data-beat^="work-"]')).toHaveCount(6);
    await expect(chapter.locator('.beat[data-beat^="organization-"]')).toHaveCount(2);
    // Eight roles and the closing beat that zooms in on the career board (v3.19).
    await expect(chapter.locator('.beat-track')).toHaveCount(10);
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

  test('at the closing beat a pin brings its role card back, then the file opens from it (v3.23)', async ({ page, isMobile }) => {
    test.skip(isMobile, 'the board is a theatre layout; on a phone the files open from their sheets');
    await page.goto('/');
    await cueBeat(page, 'experience', 'board');
    await page.waitForTimeout(1500);
    const chapter = page.locator('#experience');
    // A real mouse click at the pin: a locator click would scroll the page, which moves the camera.
    const pinClick = async (n: number) => {
      const box = (await page.locator(`#experience [data-obj="pin-${n}"]`).boundingBox())!;
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    };
    await pinClick(1);
    // The card, not the dialog; the beat is still the closing one (the path is not replayed).
    await expect(page.locator('dialog[open]')).toHaveCount(0);
    await expect(chapter).toHaveAttribute('data-peek', 'work-1');
    await expect(chapter).toHaveAttribute('data-beat', 'board');
    const card = page.locator('#experience [data-beat="work-1"] > .beat-sheet');
    await expect(card).toHaveCSS('opacity', '1');
    // Another pin swaps the card.
    await pinClick(3);
    await expect(chapter).toHaveAttribute('data-peek', 'work-3');
    // The card's own button opens the full entry.
    await page.waitForTimeout(900);
    const open = (await page.locator('#experience [data-beat="work-3"] button[aria-haspopup="dialog"]').boundingBox())!;
    await page.mouse.click(open.x + open.width / 2, open.y + open.height / 2);
    const dialog = page.locator('dialog[open]');
    await expect(dialog).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    // The same pin again puts the card away.
    await pinClick(3);
    await expect(chapter).not.toHaveAttribute('data-peek', /.+/);
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
    await expect(status).toHaveText('24 of 24 projects');

    await drawer.getByRole('button', { name: /^Design/ }).click();
    await expect(status).toHaveText('7 of 24 projects');

    await drawer.getByRole('button', { name: /^All/ }).click();
    await drawer.getByLabel('Search by name or tool').fill('spring');
    await expect(status).not.toHaveText('24 of 24 projects');
    await drawer.getByLabel('Search by name or tool').fill('zzzz');
    await expect(status).toHaveText('0 of 24 projects');
    await expect(drawer.getByText('This drawer is empty.')).toBeVisible();

    await drawer.getByRole('button', { name: /Back to desk/ }).click();
    await expect(drawer).toHaveCount(0);
    await expect(opener).toBeFocused();
  });

  test('the welcome tour shows on a first visit, two pages, and is remembered (v3.11)', async ({ page }) => {
    test.setTimeout(60_000);
    // Automation never sees it on its own (navigator.webdriver); `?welcome` asks for it.
    await page.goto('/?welcome');
    const dialog = page.locator('dialog[open].welcome-dialog');
    await expect(dialog).toBeVisible({ timeout: 5000 });
    await expect(dialog.getByRole('heading', { level: 3 })).toContainText(/welcome/i);
    await dialog.getByRole('button', { name: /Show me how/ }).click();
    await expect(dialog.locator('.welcome-demo')).toBeVisible();
    await dialog.getByRole('button', { name: /Start scrolling/ }).click();
    await expect(page.locator('dialog[open]')).toHaveCount(0);
    expect(await page.evaluate(() => localStorage.getItem('studio-welcome'))).toBe('1');
  });

  test('certificate books open in the theatre and link out safely (v3.11)', async ({ page, isMobile }) => {
    test.skip(isMobile, 'the books are a theatre layout; the folio page keeps the folios');
    await page.goto('/');
    await page.evaluate(() => (document.documentElement.style.scrollBehavior = 'auto'));
    const chapter = page.locator('#certificates');
    await expect(chapter.locator('[data-eqbot="certificates-list"]')).toBeHidden();
    await expect(chapter.locator('.book-sheet')).toHaveCount(4);
    await chapter.locator('.beat-track[data-track="book-1"]').evaluate((el) => {
      const r = el.getBoundingClientRect();
      scrollTo(0, r.top + scrollY + r.height / 2 - innerHeight / 2);
    });
    const beat = chapter.locator('.beat-deck > [data-beat="book-1"]');
    await expect(beat).toHaveAttribute('data-state', 'in');
    await page.waitForTimeout(2800);
    const links = beat.locator('a.book-entry');
    await expect(links).toHaveCount(5);
    for (const link of await links.all()) {
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', /noopener/);
    }
    // The open pages take the pointer: the middle of every entry hits the entry itself.
    const hits = await links.evaluateAll((els) =>
      els.map((el) => {
        const r = el.getBoundingClientRect();
        return el.contains(document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2));
      }),
    );
    expect(hits).toEqual([true, true, true, true, true]);
  });

  test('certificate folios open and link out safely', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'the theatre shows the books instead (covered above)');
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
