'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';

/*
  Sideways moves for the gallery wire (DesignRules.md §4.5 `04b`, v3.7, owner
  request: "can be swiped sideways and scrolled down"). The scroll position
  stays the one source of truth: a sideways drag, swipe, trackpad swipe, arrow
  key or button scrolls the page to the next or previous segment's track, so
  the cue, the rail and the cards move exactly as they do on vertical scroll.
  Only in the theatre; in the folio the cards are a plain column.
*/

const CHAPTER = 'projects';
const STEP_PX = 48;

/** Scroll the page to the centre of segment `to`'s track; false if there is none. */
function goTo(to: number) {
  const track = document.querySelector<HTMLElement>(`#${CHAPTER} .beat-track[data-track="wire-${to}"]`);
  if (!track) return false;
  const r = track.getBoundingClientRect();
  const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: window.scrollY + r.top + r.height / 2 - window.innerHeight / 2, behavior: smooth ? 'smooth' : 'auto' });
  return true;
}

/** The segment on now, from the chapter cue (`data-beat="wire-n"`). */
function current() {
  const beat = document.getElementById(CHAPTER)?.dataset.beat ?? '';
  const m = /^wire-(\d+)$/.exec(beat);
  return m ? Number(m[1]) : null;
}

function step(by: 1 | -1) {
  const now = current();
  if (now === null) return;
  goTo(now + by);
}

/** The gestures, attached once for the whole wire. */
function useRailGestures() {
  useEffect(() => {
    const chapter = document.getElementById(CHAPTER);
    if (!chapter) return undefined;
    const inTheatre = () => chapter.hasAttribute('data-cue') && !chapter.hasAttribute('data-stacked') && window.innerWidth >= 768;
    const onWire = (t: EventTarget | null) => t instanceof Element && Boolean(t.closest('.rail-seg'));

    let start: { x: number; y: number; id: number } | null = null;
    let swallowClick = false;
    const down = (e: PointerEvent) => {
      if (!inTheatre() || !onWire(e.target) || (e.pointerType === 'mouse' && e.button !== 0)) return;
      start = { x: e.clientX, y: e.clientY, id: e.pointerId };
    };
    const up = (e: PointerEvent) => {
      if (!start || e.pointerId !== start.id) return;
      const dx = e.clientX - start.x;
      const dy = e.clientY - start.y;
      start = null;
      if (Math.abs(dx) < STEP_PX || Math.abs(dx) < Math.abs(dy) * 1.5) return;
      // A drag is not a click on the card it started on.
      swallowClick = true;
      window.setTimeout(() => (swallowClick = false), 350);
      step(dx < 0 ? 1 : -1);
    };
    const cancel = () => (start = null);
    const click = (e: MouseEvent) => {
      if (!swallowClick) return;
      swallowClick = false;
      e.preventDefault();
      e.stopPropagation();
    };

    // Trackpad swipes and shift + wheel: one segment per gesture.
    let acc = 0;
    let quietUntil = 0;
    const wheel = (e: WheelEvent) => {
      if (!inTheatre() || current() === null) return;
      const dx = e.deltaX || (e.shiftKey ? e.deltaY : 0);
      if (Math.abs(dx) <= Math.abs(e.deltaY) && !e.shiftKey) return;
      e.preventDefault();
      const now = performance.now();
      if (now < quietUntil) return;
      acc += dx;
      if (Math.abs(acc) > 60) {
        step(acc > 0 ? 1 : -1);
        acc = 0;
        quietUntil = now + 700;
      }
    };

    const key = (e: KeyboardEvent) => {
      if (!inTheatre() || !onWire(e.target) || (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')) return;
      e.preventDefault();
      step(e.key === 'ArrowRight' ? 1 : -1);
    };

    chapter.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', cancel);
    chapter.addEventListener('click', click, true);
    chapter.addEventListener('wheel', wheel, { passive: false });
    chapter.addEventListener('keydown', key);
    return () => {
      chapter.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', cancel);
      chapter.removeEventListener('click', click, true);
      chapter.removeEventListener('wheel', wheel);
      chapter.removeEventListener('keydown', key);
    };
  }, []);
}

function Gestures() {
  useRailGestures();
  return null;
}

/** The two arrow buttons beside a segment; the first segment also mounts the gestures. */
export function RailNav({ segment, count }: { segment: number; count: number }) {
  const { say } = useLanguage();
  return (
    <>
      {segment === 0 && <Gestures />}
      <button
        type="button"
        className="rail-nav rail-nav-prev"
        onClick={() => goTo(segment - 1)}
        disabled={segment === 0}
        aria-label={say('Previous projects', 'Proyek sebelumnya')}
      >
        <ChevronLeft size={20} aria-hidden="true" />
      </button>
      <button
        type="button"
        className="rail-nav rail-nav-next"
        onClick={() => goTo(segment + 1)}
        disabled={segment === count - 1}
        aria-label={say('Next projects', 'Proyek berikutnya')}
      >
        <ChevronRight size={20} aria-hidden="true" />
      </button>
    </>
  );
}
