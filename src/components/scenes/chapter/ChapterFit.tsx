'use client';

import { useEffect, useRef } from 'react';

/*
  ChapterFit — the one measured fallback (DesignRules.md §8): when a pinned
  beat sheet is taller than 70 % of the viewport (large text zoom, short
  window), its bottom could never be read while pinned, so the chapter drops
  to the stacked studio (`data-stacked`). Re-checked on resize; no scroll work.
*/
export function ChapterFit() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const chapter = ref.current?.closest<HTMLElement>('.chapter');
    if (!chapter) return undefined;
    const sheets = [...chapter.querySelectorAll<HTMLElement>('.beat:not([data-flow]) > .beat-sheet')];
    const wide = window.matchMedia('(min-width: 768px)');

    // Measured in the theatre layout (lane width); the stacked layout is wider, so its heights would flip it back.
    // Heights come from ResizeObserver, which reports after the browser's own layout: reading
    // offsetHeight on mount forced a synchronous style and layout per chapter (§9.6, v3.5).
    const heights = new Map<Element, number>();
    const decide = () => {
      const limit = window.innerHeight * 0.7;
      const tooTall = wide.matches && [...heights.values()].some((h) => h > limit);
      chapter.toggleAttribute('data-stacked', tooTall);
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
