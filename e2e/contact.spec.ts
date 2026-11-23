import { expect, test } from '@playwright/test';
import { cueBeat, toReadingWindow } from './helpers';

/*
  The contact form is exercised without ever reaching Resend: the invalid path
  stops at validation and the honeypot path is dropped before sending.
*/
test.describe('contact form', () => {
  test('empty submit marks every field and focuses the first', async ({ page }) => {
    await page.goto('/');
    const form = page.locator('#contact form');
    await (await toReadingWindow(form.getByRole('button', { name: 'Send the letter' }))).click();
    await expect(form.locator('[aria-invalid="true"]')).toHaveCount(4);
    await expect(form.locator('#contact-name')).toBeFocused();
    await expect(form.locator('#contact-name')).toHaveAttribute('aria-describedby', 'contact-name-error');
  });

  test('a bad email is reported and other values are kept', async ({ page }) => {
    await page.goto('/');
    const form = page.locator('#contact form');
    await form.getByLabel('Your name').fill('Test Visitor');
    await form.getByLabel('Email for the reply').fill('not-an-email');
    await form.getByLabel('Subject').fill('Hello');
    await form.getByLabel('Message').fill('Checking the form.');
    await (await toReadingWindow(form.getByRole('button', { name: 'Send the letter' }))).click();
    await expect(form.locator('#contact-email-error [lang="en"]')).toHaveText('Use an address like name@example.com.');
    await expect(form.getByLabel('Your name')).toHaveValue('Test Visitor');
    await expect(form.locator('[aria-invalid="true"]')).toHaveCount(1);
  });

  test('a filled honeypot never sends', async ({ page }) => {
    await page.goto('/');
    const form = page.locator('#contact form');
    await form.locator('input[name="website"]').evaluate((el: HTMLInputElement) => {
      el.value = 'spam';
    });
    await form.getByLabel('Your name').fill('Bot');
    await (await toReadingWindow(form.getByRole('button', { name: 'Send the letter' }))).click();
    // Bots get a quiet success so they do not retry; no mail is sent.
    await expect(page.locator('#contact').getByText('Your letter is on its way.')).toBeVisible();
  });

  test('copy button announces the copy', async ({ page, context, browserName }) => {
    test.skip(browserName !== 'chromium', 'clipboard permission is Chromium-only');
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/');
    await cueBeat(page, 'contact', 'card');
    await (await toReadingWindow(page.getByRole('button', { name: 'Copy email address' }))).click();
    await expect(page.locator('#contact [role="status"]').filter({ hasText: 'Copied' })).toHaveCount(1);
  });
});
