'use client';

import { useEffect } from 'react';
import { play } from '../../lib/sound/control';

/*
  A pin on the career board opens its role (v3.21, owner; v3.23). The board is stage art
  (aria-hidden, mouse only); the keyboard and screen readers reach every role from its own sheet.

  - At the closing beat (every pin is up and the camera is on the board) a click on a pin brings that
    role's sheet back into the lane, folded out of its pin, as a *card*: the path is not played
    again (the chapter's beat and reached list do not change), a second pin swaps the card, and a
    click on the same pin, on the stage, or Escape puts it away. The card's "Open the file" button
    opens the full entry as before. Scrolling on or back drops the card.
  - Anywhere else (before the last beat, on a phone) a click presses the role's "Open the file" button.

  The state is two attributes on the chapter (`data-peek`, `data-peek-out`), styled in CabinetStation.
*/
export function CareerPinClicks() {
  useEffect(() => {
    const chapter = () => document.getElementById('experience');
    let timer = 0;

    const theatre = (el: HTMLElement) =>
      el.hasAttribute('data-cue') &&
      !el.hasAttribute('data-stacked') &&
      window.matchMedia('(min-width: 768px) and (min-height: 561px) and (prefers-reduced-motion: no-preference)').matches;

    const putAway = (el: HTMLElement, id: string) => {
      el.dataset.peekOut = id;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => delete el.dataset.peekOut, 650);
    };

    const close = (el: HTMLElement) => {
      const now = el.dataset.peek;
      if (!now) return;
      delete el.dataset.peek;
      putAway(el, now);
      play('leaf-out');
    };

    const open = (el: HTMLElement, id: string) => {
      const before = el.dataset.peek;
      if (before === id) {
        close(el);
        return;
      }
      el.dataset.peek = id;
      if (before) putAway(el, before);
      else delete el.dataset.peekOut;
      play('leaf-in');
    };

    const onClick = (event: MouseEvent) => {
      const el = chapter();
      if (!el) return;
      const target = event.target as Element | null;
      const pin = target?.closest?.('.career-pin[data-role]');
      if (pin) {
        const role = pin.getAttribute('data-role') ?? '';
        if (theatre(el) && el.dataset.beat === 'board') {
          open(el, role);
          return;
        }
        document.querySelector<HTMLButtonElement>(`#experience article[data-role="${role}"] button[aria-haspopup="dialog"]`)?.click();
        return;
      }
      // A click anywhere on the stage, off the card, puts the card away.
      if (el.dataset.peek && !target?.closest('#experience .beat-sheet, dialog')) close(el);
    };

    const onKey = (event: KeyboardEvent) => {
      const el = chapter();
      if (event.key === 'Escape' && el?.dataset.peek && !document.querySelector('dialog[open]')) close(el);
    };

    // Leaving the closing beat (scrolling on or back) drops the card at once.
    const el = chapter();
    const observer = new MutationObserver(() => {
      if (el && el.dataset.peek && el.dataset.beat !== 'board') {
        delete el.dataset.peek;
        delete el.dataset.peekOut;
      }
    });
    if (el) observer.observe(el, { attributes: true, attributeFilter: ['data-beat'] });

    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);
  return null;
}
