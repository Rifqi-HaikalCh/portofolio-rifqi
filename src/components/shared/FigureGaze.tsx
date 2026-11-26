'use client';

import { useEffect } from 'react';

/*
  The figure's eyes follow the visitor's pointer (owner request, v3.9;
  DesignRules.md §2.7). Every 2D figurine (`svg[data-gaze]`) gets --gaze-x and
  --gaze-y in -1..1, from its eyes toward the pointer; CSS moves the pupils
  (`.fig-look`) a couple of poster units. One rAF per pointer move, no React
  state, only figures on screen. Off for coarse pointers and reduced motion:
  the eyes then rest looking ahead.
*/

const REACH = 420; // px from the eyes at which the gaze is full

export function FigureGaze() {
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)');
    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let x = 0;
    let y = 0;

    const aim = () => {
      frame = 0;
      const vh = window.innerHeight;
      for (const svg of document.querySelectorAll<SVGSVGElement>('svg[data-gaze]')) {
        const eye = svg.querySelector('.fig-look');
        if (!eye) continue;
        const r = eye.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh || r.width === 0) continue;
        const ex = r.left + r.width / 2;
        const ey = r.top + r.height / 2;
        const dx = x - ex;
        const dy = y - ey;
        const len = Math.hypot(dx, dy);
        const k = Math.min(1, len / REACH) / (len || 1);
        svg.style.setProperty('--gaze-x', (dx * k).toFixed(3));
        svg.style.setProperty('--gaze-y', (dy * k).toFixed(3));
      }
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(aim);
    };
    const rest = () => {
      for (const svg of document.querySelectorAll<SVGSVGElement>('svg[data-gaze]')) {
        svg.style.removeProperty('--gaze-x');
        svg.style.removeProperty('--gaze-y');
      }
    };

    let on = false;
    const sync = () => {
      const want = fine.matches && !still.matches;
      if (want === on) return;
      on = want;
      if (on) {
        window.addEventListener('pointermove', move, { passive: true });
        document.documentElement.addEventListener('pointerleave', rest);
      } else {
        window.removeEventListener('pointermove', move);
        document.documentElement.removeEventListener('pointerleave', rest);
        rest();
      }
    };
    sync();
    fine.addEventListener('change', sync);
    still.addEventListener('change', sync);
    return () => {
      cancelAnimationFrame(frame);
      fine.removeEventListener('change', sync);
      still.removeEventListener('change', sync);
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', rest);
    };
  }, []);
  return null;
}
