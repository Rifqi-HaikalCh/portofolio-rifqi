import AxeBuilder from '@axe-core/playwright';
import { expect, type Locator, type Page } from '@playwright/test';

export const sectionIds = ['home', 'about', 'experience', 'services', 'projects', 'certificates', 'contact'] as const;

export const eqbotAnchors = [
  'home-name',
  'home-role',
  'home-available',
  'about-photo',
  'experience-total',
  'experience-files',
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

/*
  Brings a beat on (§4.4 v3.3): pinned sheets only show while their track is
  under the cue line, as a visitor would scroll to them. On the split stage
  (tracks not laid out) the sheet itself is scrolled into view.
*/
export async function cueBeat(page: Page, chapter: string, beat: string) {
  await page.evaluate(
    ([chapter, beat]) => {
      document.documentElement.style.scrollBehavior = 'auto';
      const root = document.getElementById(chapter)!;
      const track = root.querySelector<HTMLElement>(`.beat-track[data-track="${beat}"]`);
      if (track && track.offsetHeight > 0) {
        const r = track.getBoundingClientRect();
        scrollTo(0, r.top + scrollY + r.height / 2 - innerHeight / 2);
      } else root.querySelector(`[data-beat="${beat}"]`)?.scrollIntoView({ block: 'center' });
    },
    [chapter, beat],
  );
  await expect(page.locator(`#${chapter} .beat[data-beat="${beat}"] > .beat-sheet`)).toHaveCSS('opacity', '1');
}

/*
  Scrolls a control into the reading window before a tap. On the split stage
  (§4.4 mobile) the top of the viewport belongs to the sticky stage, so a
  visitor scrolls a control below it; Playwright's own scroll stops as soon as
  the control is anywhere in the viewport.
*/
export async function toReadingWindow(locator: Locator) {
  await locator.evaluate(async (el) => {
    document.documentElement.style.scrollBehavior = 'auto';
    scrollBy(0, el.getBoundingClientRect().top - innerHeight * 0.68);
    // Let the sheet's entrance finish first: it may have been cued by this scroll.
    await new Promise(requestAnimationFrame);
    const sheet = el.closest('.beat') ?? el;
    const finite = sheet.getAnimations({ subtree: true }).filter((a) => a.effect?.getTiming().iterations !== Infinity);
    await Promise.all(finite.map((a) => a.finished.catch(() => undefined)));
    scrollBy(0, el.getBoundingClientRect().top - innerHeight * 0.68);
  });
  return locator;
}
