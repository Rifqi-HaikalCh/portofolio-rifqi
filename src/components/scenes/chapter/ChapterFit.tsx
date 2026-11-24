'use client';

import { useEffect, useRef } from 'react';

/*
  ChapterFit — the one measured fallback (DesignRules.md §8): when a pinned
  beat sheet is taller than 70 % of the viewport (large text zoom, short
  window), the deck first rises toward the navbar (`--beat-top-fit`, v3.12);
  only when even that cannot show the sheet whole does the chapter drop to
  the stacked studio (`data-stacked`). Re-checked on resize; no scroll work.
  v3.11: sheets drawn on the stage itself (`.stage-sheet`, the services on the
  blueprint) are sized by the stage fit, not by the lane, so they never count:
  their box is taller than what shows (it is tilted onto the board), and on
  wide-short screens it flipped the whole Services chapter to the stacked
  studio.
*/
export function ChapterFit() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const chapter = ref.current?.closest<HTMLElement>('.chapter');
    if (!chapter) return undefined;
    const sheets = [...chapter.querySelectorAll<HTMLElement>('.beat:not([data-flow]) > .beat-sheet:not(.stage-sheet)')];
    const wide = window.matchMedia('(min-width: 768px)');

    // Measured in the theatre layout (lane width); the stacked layout is wider, so its heights would flip it back.
    // Heights come from ResizeObserver, which reports after the browser's own layout: reading
    // offsetHeight on mount forced a synchronous style and layout per chapter (§9.6, v3.5).
    const heights = new Map<Element, number>();
    // v3.12 (owner: "any desktop ratio"): before giving up on a short screen (1280 × 720,
    // 1024 × 768), the deck moves up under the navbar to make room for the tallest sheet.
    const decide = () => {
      const vh = window.innerHeight;
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      const tallest = Math.max(0, ...heights.values());
      const room = vh - 4.75 * rem - 1.25 * rem; // under the navbar, above the bottom edge
      const tooTall = wide.matches && tallest > room;
      chapter.toggleAttribute('data-stacked', tooTall);
      if (!tooTall && tallest > vh * 0.7) {
        chapter.style.setProperty('--beat-top-fit', `${Math.round(Math.max(4.75 * rem, Math.min(vh * 0.18, vh - tallest - 1.25 * rem)))}px`);
      } else {
        chapter.style.removeProperty('--beat-top-fit');
      }
    };

    const observer = new ResizeObserver((entries) => {
      if (chapter.hasAttribute('data-stacked')) return;
      entries.forEach((e) => heights.set(e.target, e.borderBoxSize[0]?.blockSize ?? e.contentRect.height));
      decide();
    });
    sheets.forEach((sheet) => observer.observe(sheet));
    // A resize re-measures in the theatre layout: drop the fallback and let the observer report.
    const reset = () => {
      if (!chapter.hasAttribute('data-stacked')) return decide();
      chapter.removeAttribute('data-stacked');
      sheets.forEach((sheet) => {
        observer.unobserve(sheet);
        observer.observe(sheet);
      });
    };
    window.addEventListener('resize', reset);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', reset);
    };
  }, []);

  return <span ref={ref} hidden />;
}
