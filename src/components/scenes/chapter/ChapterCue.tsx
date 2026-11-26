'use client';

import { useEffect, useRef } from 'react';

/*
  ChapterCue — the beat cue (DesignRules.md §4.4, §9.7 v3.3). Scroll position
  only decides *which* beat is on; the sheet then plays its whole entrance or
  exit in time (chapter-css.ts), so text never travels with the wheel.

  Desktop theatre: the active beat is the `.beat-track` under the viewport's
  middle line. Each pinned `.beat` gets `data-state` (before | in | after) and
  `data-dir` (fwd | back | none — none = set without playing, on load or for a
  skipped beat). The chapter gets `data-beat` (active id) and `data-reached`
  (ids reached so far) for the scene's acts and poses.
  Split stage (< 768 px): sheets stay in flow; the active beat is the last
  sheet whose top passed 70 % of the viewport.
  Every layout: flow sheets (and all sheets on mobile) get `data-shown` once,
  when their top first enters the lower viewport edge.

  IntersectionObserver only: callbacks fire on threshold crossings, never per
  scroll frame. Without JS the chapter keeps the stacked studio (no data-cue).
*/
export function ChapterCue() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const chapter = ref.current?.closest<HTMLElement>('.chapter');
    if (!chapter) return undefined;
    const pins = [...chapter.querySelectorAll<HTMLElement>('.beat-deck > .beat')];
    const tracks = [...chapter.querySelectorAll<HTMLElement>('.beat-track')];
    const reveal = [...chapter.querySelectorAll<HTMLElement>('.beat')];
    const split = window.matchMedia('(max-width: 767px)');
    let current = Number.NaN;
    let observers: IntersectionObserver[] = [];

    const apply = (index: number, animate: boolean) => {
      if (index === current) return;
      const fwd = Number.isNaN(current) || index > current;
      pins.forEach((pin, i) => {
        const state = i < index ? 'after' : i === index ? 'in' : 'before';
        const was = pin.dataset.state;
        if (was === state) return;
        // A beat jumped over (before ↔ after) never flashes through its composed state.
        const skipped = (was === 'before' && state === 'after') || (was === 'after' && state === 'before');
        pin.dataset.dir = !animate || skipped || !was ? 'none' : fwd ? 'fwd' : 'back';
        pin.dataset.state = state;
      });
      chapter.dataset.beat = pins[index]?.dataset.beat ?? '';
      chapter.dataset.reached = pins
        .slice(0, Math.max(0, index + 1))
        .map((p) => p.dataset.beat)
        .join(' ');
      // The sound director (§10.4) listens for this; nothing else does. No listener, no cost.
      if (animate && !Number.isNaN(current)) {
        window.dispatchEvent(
          new CustomEvent('studio:cue', { detail: { chapter: chapter.id, beat: pins[index]?.dataset.beat ?? '', dir: fwd ? 'fwd' : 'back' } }),
        );
      }
      current = index;
    };

    const rectOf = (el: Element) => el.getBoundingClientRect();
    const locate = (rect: (el: Element) => DOMRectReadOnly = rectOf) => {
      if (split.matches) {
        const line = window.innerHeight * 0.7;
        let index = -1;
        pins.forEach((pin, i) => {
          if (rect(pin).top <= line) index = i;
        });
        return index;
      }
      const line = window.innerHeight / 2;
      let index = -1;
      tracks.forEach((track, i) => {
        if (rect(track).top <= line) index = i;
      });
      const last = tracks[tracks.length - 1];
      if (last && rect(last).bottom <= line) index = tracks.length;
      return index;
    };

    /*
      The starting state comes from each observer's first report, which carries every target's
      rect from the browser's own layout. Measuring in the effect instead forced a synchronous
      style and layout per chapter on hydration, after the previous chapter's writes (§9.6, v3.5).
      Until then the chapter shows what the server HTML painted.
    */
    const build = () => {
      observers.forEach((o) => o.disconnect());
      observers = [];
      const band = split.matches ? '-70% 0px -29% 0px' : '-50% 0px -49% 0px';
      let started = false;
      const cue = new IntersectionObserver(
        (entries) => {
          if (started) return apply(locate(), true);
          started = true;
          const rects = new Map(entries.map((e) => [e.target, e.boundingClientRect]));
          apply(locate((el) => rects.get(el) ?? rectOf(el)), false);
        },
        { rootMargin: band },
      );
      (split.matches ? pins : tracks).forEach((el) => cue.observe(el));
      const seen = new WeakSet<Element>();
      const fold = () => window.innerHeight * 0.9;
      const shown = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const el = entry.target as HTMLElement;
            const first = !seen.has(el);
            seen.add(el);
            // Whatever is already above the fold when the cue starts shows without playing.
            if (first && entry.boundingClientRect.top < fold() && entry.boundingClientRect.left < window.innerWidth) el.dataset.shown = 'now';
            else if (entry.isIntersecting) el.dataset.shown = '';
            else continue;
            shown.unobserve(el);
          }
        },
        { rootMargin: '0px 0px -10% 0px' },
      );
      reveal.forEach((el) => shown.observe(el));
      observers = [cue, shown];
    };

    // Keyboard focus inside a hidden pinned sheet: bring its track under the cue line.
    const onFocus = (event: FocusEvent) => {
      if (split.matches) return;
      const target = event.target as HTMLElement;
      const pin = target.closest<HTMLElement>('.beat-deck > .beat');
      if (!pin || pin.dataset.state === 'in' || !target.matches(':focus-visible')) return;
      const track = tracks[pins.indexOf(pin)];
      if (!track) return;
      const r = track.getBoundingClientRect();
      window.scrollTo({ top: window.scrollY + r.top + r.height / 2 - window.innerHeight / 2, behavior: 'instant' });
      apply(locate(), false);
    };

    // Mobile trays scroll sideways: keyboard users reach them with a tab stop (WCAG 2.1.1).
    const trays: HTMLElement[] = [];
    if (split.matches) {
      const name = document.getElementById(chapter.getAttribute('aria-labelledby') ?? '')?.textContent ?? '';
      const found = new Set<HTMLElement>(chapter.querySelectorAll<HTMLElement>('.beat-deck, [data-eqbot="services-tabs"]'));
      chapter.querySelectorAll('.tracing').forEach((el) => el.parentElement && found.add(el.parentElement));
      found.forEach((el) => {
        if (el.hasAttribute('tabindex')) return;
        el.tabIndex = 0;
        el.setAttribute('role', 'group');
        el.setAttribute('aria-label', name);
        trays.push(el);
      });
    }

    // A tray nudges once when it first comes into view (a hint that it swipes); not if it was already swiped.
    let hinter: IntersectionObserver | null = null;
    if (split.matches) {
      hinter = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const tray = entry.target as HTMLElement;
            hinter?.unobserve(tray);
            if (tray.scrollLeft < 4) tray.dataset.hint = '';
          }
        },
        { threshold: 0.6 },
      );
    }
    if (hinter) chapter.querySelectorAll<HTMLElement>('.beat-deck').forEach((tray) => hinter.observe(tray));

    chapter.dataset.cue = '';
    build();
    split.addEventListener('change', build);
    chapter.addEventListener('focusin', onFocus);
    return () => {
      observers.forEach((o) => o.disconnect());
      split.removeEventListener('change', build);
      chapter.removeEventListener('focusin', onFocus);
      hinter?.disconnect();
      delete chapter.dataset.cue;
      trays.forEach((el) => {
        el.removeAttribute('tabindex');
        el.removeAttribute('role');
        el.removeAttribute('aria-label');
      });
    };
  }, []);

  return <span ref={ref} hidden />;
}
