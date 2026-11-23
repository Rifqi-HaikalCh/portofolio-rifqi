import { test } from '@playwright/test';
import { expectNoSeriousA11yIssues, revealAll } from './helpers';

test.describe('axe (WCAG 2.2 AA, serious + critical)', () => {
  test('home page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await revealAll(page);
    await expectNoSeriousA11yIssues(page);
  });

  test('home page in Bahasa Indonesia', async ({ page, isMobile }) => {
    await page.goto('/');
    if (isMobile) {
      await page.getByRole('button', { name: 'Open menu' }).click();
      await page.getByRole('button', { name: 'Bahasa', exact: true }).click();
    } else {
      await page.locator('header').getByRole('button', { name: /Bahasa Indonesia/ }).click();
    }
    await revealAll(page);
    await expectNoSeriousA11yIssues(page);
  });

  test('case study dialog', async ({ page }) => {
    await page.goto('/');
    await revealAll(page);
    await page.locator('#projects .stretched').first().click();
    await page.locator('dialog[open]').waitFor();
    await expectNoSeriousA11yIssues(page, 'dialog[open]');
  });

  test('archive drawer', async ({ page }) => {
    await page.goto('/');
    await revealAll(page);
    await page.getByRole('button', { name: /Open the archive/ }).click();
    await page.locator('dialog[open]').waitFor();
    await expectNoSeriousA11yIssues(page, 'dialog[open]');
  });

  test('additional skills dialog', async ({ page }) => {
    await page.goto('/');
    await revealAll(page);
    await page.getByRole('button', { name: /Additional skills, counted/ }).click();
    await page.locator('dialog[open]').waitFor();
    await expectNoSeriousA11yIssues(page, 'dialog[open]');
  });

  test('404 page', async ({ page }) => {
    await page.goto('/no-such-page');
    await expectNoSeriousA11yIssues(page);
  });
});
