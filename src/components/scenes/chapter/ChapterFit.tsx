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
    const check = () => {
      chapter.removeAttribute('data-stacked');
      const limit = window.innerHeight * 0.7;
      const tooTall = wide.matches && sheets.some((sheet) => sheet.offsetHeight > limit);
      chapter.toggleAttribute('data-stacked', tooTall);
    };

    const observer = new ResizeObserver(() => {
      if (!chapter.hasAttribute('data-stacked')) check();
    });
    sheets.forEach((sheet) => observer.observe(sheet));
    window.addEventListener('resize', check);
    check();
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', check);
    };
  }, []);

  return <span ref={ref} hidden />;
}
