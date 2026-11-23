import AxeBuilder from '@axe-core/playwright';
import { expect, type Page } from '@playwright/test';

export const sectionIds = ['home', 'about', 'experience', 'services', 'certificates', 'contact'] as const;

export const eqbotAnchors = [
  'home-name',
  'home-role',
  'home-available',
  'about-photo',
  'experience-total',
  'experience-tabs',
  'services-tabs',
  'projects-title',
  'projects-filters',
  'certificates-list',
  'contact-title',
];

/* Collects console errors and uncaught exceptions for the test that calls it. */
export function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
  return errors;
}

/* axe with WCAG 2.2 AA tags; serious and critical issues fail the test (§15). */
export async function expectNoSeriousA11yIssues(page: Page, include?: string) {
  let builder = new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']);
  if (include) builder = builder.include(include);
  const { violations } = await builder.analyze();
  const blocking = violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
  const report = blocking.map((v) => `${v.id} (${v.impact}): ${v.help}\n  ${v.nodes.map((n) => n.target.join(' ')).slice(0, 5).join('\n  ')}`);
  expect(report, report.join('\n')).toEqual([]);
}

/* Settles scroll-driven reveals so screenshots and axe see final colours. */
export async function revealAll(page: Page) {
  await page.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important}' });
}
