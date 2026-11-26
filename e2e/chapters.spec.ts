import { expect, test } from '@playwright/test';

/*
  Chapter Theatre (DesignRules.md §4, §9.7). On a desktop with scroll-driven
  animations every chapter pins its stage; scroll only cues beats, so every
  pinned sheet lands, lies flat and holds still while the wheel moves through
  its track (§4.4 v3.3), and no handoff widens the page. Under reduced motion
  the same markup is the stacked studio.
*/

const chapters = ['about', 'experience', 'services', 'projects', 'certificates', 'contact'];

test.describe('chapter theatre', () => {
  // Every test walks the whole page; under six workers a cold load alone can take 20 s.
  test.describe.configure({ timeout: 60_000 });

  test('every pinned beat is cued, composed and still during its track', async ({ page, isMobile }) => {
    test.skip(isMobile, 'pinned sheets are a desktop layout; the split stage keeps sheets in flow');
    // v3.11: four certificate books joined the walk.
    test.setTimeout(180_000);
    await page.goto('/');
    await page.evaluate(() => (document.documentElement.style.scrollBehavior = 'auto'));

    for (const id of chapters) {
      const chapter = page.locator(`#${id}`);
      await expect(chapter, id).toHaveClass(/chapter/);
      await expect(chapter, `${id} is cued`).toHaveAttribute('data-cue', '');
      await expect(chapter, `${id} is in the theatre`).not.toHaveAttribute('data-stacked', /.*/);
      expect(await chapter.locator('.stage').evaluate((el) => getComputedStyle(el).position), `${id} stage`).toBe('sticky');

      const beats = await chapter.locator('.beat-track').evaluateAll((nodes) => nodes.map((n) => (n as HTMLElement).dataset.track));
      for (const [i, beat] of beats.entries()) {
        const where = `${id}/${beat}`;
        const sheet = chapter.locator(`.beat-deck > [data-beat="${beat}"] > .beat-sheet`);
        // Cue line (viewport middle) at the centre of the beat's track, then give the sheet time to land.
        const centre = async (shift = 0) =>
          chapter.locator('.beat-track').nth(i).evaluate((el, s) => {
            const r = el.getBoundingClientRect();
            scrollTo(0, r.top + scrollY + r.height / 2 - innerHeight / 2 + s * innerHeight);
          }, shift);
        await centre();
        await expect(chapter.locator(`.beat-deck > [data-beat="${beat}"]`), `${where} is on`).toHaveAttribute('data-state', 'in');
        await page.waitForTimeout(1500);
        const read = () =>
          sheet.evaluate((el) => {
            const r = el.getBoundingClientRect();
            const cs = getComputedStyle(el);
            return { top: r.top, bottom: r.bottom, transform: cs.transform, opacity: Number(cs.opacity), vh: innerHeight, label: el.classList.contains('rail-seg'), board: el.classList.contains('svc-sheet'), book: el.classList.contains('book-sheet'), grid: Boolean(el.parentElement?.dataset.group?.startsWith('grid')) };
          });
        const state = await read();
        // A service is written on the drafting board (v3.7): it lies in the board's tilted plane, not flat on the deck.
        if (!state.board) expect(state.transform === 'none' || state.transform === 'matrix(1, 0, 0, 1, 0, 0)', `${where} lies flat (${state.transform})`).toBe(true);
        expect(state.opacity, `${where} opacity`).toBe(1);
        // The gallery's label cards hang under their frames on the stage rail (v3.7), lower than --beat-top.
        if (state.label) expect(state.top, `${where} hangs under the frames`).toBeGreaterThan(state.vh * 0.4);
        else if (state.board) expect(state.top, `${where} is on the board, under the navbar`).toBeGreaterThan(64);
        // A certificate book (v3.11) opens in the middle of the stage, under the navbar.
        else if (state.book) expect(state.top, `${where} is open under the navbar`).toBeGreaterThan(64);
        // An index card (v3.19) lies in its slot of the grid: the first row sits at --beat-top, the second below it.
        else if (state.grid) expect(state.top, `${where} is in its grid slot`).toBeGreaterThanOrEqual(state.vh * 0.18 - 10);
        else expect(state.top, `${where} sits at --beat-top`).toBeCloseTo(state.vh * 0.18, -1);
        expect(state.bottom, `${where} fits the viewport`).toBeLessThanOrEqual(state.vh);
        // The wheel moves inside the track: the text does not (§4.4 v3.3).
        await centre(0.12);
        await page.waitForTimeout(150);
        expect((await read()).top, `${where} holds still while scrolling`).toBeCloseTo(state.top, 0);
        // Exactly one pinned sheet is showing, or one group (a pile of blueprints, a wire of cards, v3.6).
        const shown = await chapter
          .locator('.beat-deck > .beat')
          .evaluateAll((beats, on) => {
            const active = beats.find((b) => (b as HTMLElement).dataset.beat === on) as HTMLElement;
            return beats
              .filter((b) => Number(getComputedStyle(b.querySelector('.beat-sheet')!).opacity) > 0)
              .filter((b) => b !== active && (!active.dataset.group || (b as HTMLElement).dataset.group !== active.dataset.group)).length;
          }, beat);
        expect(shown, `${where}: one sheet (or one group) at a time`).toBe(0);
      }
    }
  });

  test('the gallery wire moves sideways too: a drag, the arrow buttons (v3.7)', async ({ page, isMobile }) => {
    test.skip(isMobile, 'the wire is a theatre layout');
    await page.goto('/');
    await page.evaluate(() => (document.documentElement.style.scrollBehavior = 'auto'));
    const chapter = page.locator('#projects');
    await page.locator('#projects .beat-track[data-track="wire-0"]').evaluate((el) => {
      const r = el.getBoundingClientRect();
      scrollTo(0, r.top + scrollY + r.height / 2 - innerHeight / 2);
    });
    await expect(chapter).toHaveAttribute('data-beat', 'wire-0');
    await page.waitForTimeout(1500);
    // Drag the pair to the left: the next pair comes in (the page scrolls to its track).
    const card = page.locator('#projects .beat[data-beat="wire-0"] .rail-card').first();
    const box = (await card.boundingBox())!;
    await page.mouse.move(box.x + box.width / 2, box.y + 40);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width / 2 - 200, box.y + 44, { steps: 8 });
    await page.mouse.up();
    await expect(chapter).toHaveAttribute('data-beat', 'wire-1', { timeout: 5000 });
    // The drag did not open a case study.
    await expect(page.locator('dialog[open]')).toHaveCount(0);
    await page.waitForTimeout(1500);
    await page.locator('#projects .beat[data-beat="wire-1"] .rail-nav-prev').click();
    await expect(chapter).toHaveAttribute('data-beat', 'wire-0', { timeout: 5000 });
  });

  test('no stage shows before its chapter arrives', async ({ page, isMobile }) => {
    test.skip(isMobile, 'stage moves are desktop only');
    await page.goto('/');
    await page.evaluate(() => (document.documentElement.style.scrollBehavior = 'auto'));
    for (const id of chapters) {
      const tracks = page.locator(`#${id} .beat-track`);
      const n = await tracks.count();
      for (const k of [0, n - 1]) {
        await tracks.nth(k).evaluate((t) => {
          const r = t.getBoundingClientRect();
          scrollTo(0, r.top + scrollY + r.height / 2 - innerHeight / 2);
        });
        await page.waitForTimeout(100);
        const seen = await page.evaluate(() =>
          [0.2, 0.5, 0.8].flatMap((fy) => [0.1, 0.9].map((fx) => document.elementFromPoint(innerWidth * fx, innerHeight * fy)?.closest('section')?.id)),
        );
        expect(seen.filter((s) => s && s !== id), `${id} track ${k}`).toEqual([]);
      }
    }
  });

  test('handoffs never widen the page', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => (document.documentElement.style.scrollBehavior = 'auto'));
    for (const id of chapters) {
      // Halfway through the move into this chapter.
      await page.locator(`#${id}`).evaluate((el) => scrollTo(0, el.getBoundingClientRect().top + scrollY - innerHeight / 2));
      await page.waitForTimeout(80);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      expect(overflow, `entering #${id}`).toBeLessThanOrEqual(0);
    }
  });

  test('text zoom that makes a pinned sheet too tall drops that chapter to the stacked studio', async ({ page, isMobile }) => {
    test.skip(isMobile, 'the 70 % test is a desktop-lane measure');
    await page.goto('/');
    await expect(page.locator('#about')).toHaveAttribute('data-cue', '');
    // 200 % text zoom (browser text-size setting): the root font doubles, the viewport does not.
    await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
    const stacked = page.locator('.chapter[data-stacked]');
    await expect.poll(() => stacked.count()).toBeGreaterThan(0);
    for (const id of await stacked.evaluateAll((els) => els.map((e) => e.id))) {
      expect(await page.locator(`#${id} .stage`).evaluate((el) => getComputedStyle(el).position), id).not.toBe('sticky');
      await expect(page.locator(`#${id} .beat-sheet`).first(), id).toBeVisible();
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0);
  });

  test('page zoom of 200 % (a 720 × 450 viewport) is the stacked studio with no overflow', async ({ page, isMobile }) => {
    test.skip(isMobile, 'desktop zoom');
    await page.setViewportSize({ width: 720, height: 450 });
    await page.goto('/');
    for (const id of chapters) {
      expect(await page.locator(`#${id} .stage`).evaluate((el) => getComputedStyle(el).position), id).not.toBe('sticky');
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0);
  });

  test('no horizontal overflow at 320 px anywhere on the walk', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 640 });
    await page.goto('/');
    await page.evaluate(() => (document.documentElement.style.scrollBehavior = 'auto'));
    for (const y of [0, 0.2, 0.4, 0.6, 0.8, 1]) {
      await page.evaluate((f) => scrollTo(0, (document.documentElement.scrollHeight - innerHeight) * f), y);
      await page.waitForTimeout(150);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth), `at ${y}`).toBeLessThanOrEqual(0);
    }
  });

  test('the chapter bar names the chapter and links the next one', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    const bar = page.getByRole('navigation', { name: 'Chapter' });
    await expect(bar).toBeHidden();
    await page.locator('#experience').evaluate((el) => el.scrollIntoView());
    await expect(bar).toBeVisible();
    await expect(bar).toContainText('Experience');
    await bar.getByRole('link').click();
    await expect(bar).toContainText('Services');
  });

  test('reduced motion lays chapters out as the stacked studio', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    for (const id of chapters) {
      expect(await page.locator(`#${id} .stage`).evaluate((el) => getComputedStyle(el).position), id).not.toBe('sticky');
      await expect(page.locator(`#${id} .beat-sheet`).first(), id).toBeVisible();
    }
  });
});

test.describe('pocket studio (mobile, v3.14)', () => {
  test('under 768 px every chapter opens with its window in flow; the desk sits under the hero tickets', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'mobile layout');
    await page.goto('/');
    for (const id of chapters) {
      const stage = page.locator(`#${id} .stage`);
      expect(await stage.evaluate((el) => getComputedStyle(el).display), `${id} stage`).toBe('block');
      expect(await stage.evaluate((el) => getComputedStyle(el).position), `${id} stage is in flow`).not.toBe('sticky');
    }
    await expect(page.locator('#home .hero-desk')).toBeVisible();
    const photo = page.locator('#about [data-beat="dossier"] img[alt="Rifqi Haikal"]');
    await photo.scrollIntoViewIfNeeded();
    await expect(photo).toBeVisible();
    expect(await photo.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  });

  test('the gallery wire scrolls sideways and holds every project card', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'mobile layout');
    await page.goto('/');
    const deck = page.locator('#projects .beat-deck');
    await deck.scrollIntoViewIfNeeded();
    const { scrollable, cards } = await deck.evaluate((el) => ({
      scrollable: el.scrollWidth > el.clientWidth,
      cards: el.querySelectorAll('.rail-card').length,
    }));
    expect(scrollable).toBe(true);
    expect(cards).toBeGreaterThan(2);
  });
});
