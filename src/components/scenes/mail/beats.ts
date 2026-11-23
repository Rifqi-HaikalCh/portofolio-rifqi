import type { ChapterSpec } from '../chapter/spec';
import { MAIL_FRAMES } from './MailStation';

/*
  Chapter `06` — The Mail Tray (DesignRules.md §4.5 `06`). Arrives by a pan
  right back to the window at golden hour. The letterhead drops → the
  letterpress card emerges from the envelope in the figure's hands (the
  envelope is the occluder) while the tray slides forward → the correspondence
  sheet rises in flow. Leaves by the turn-over to the back of the frame.
  W3: the flap folds open as the card comes out, and the figure goes from
  `seal` to `hand`, holding the card out to the visitor.
*/
export const MAIL_CHAPTER: ChapterSpec = {
  id: 'contact',
  lane: 'left',
  frames: MAIL_FRAMES,
  theatre: { x: -226, y: -180, w: 1900, h: 1188 },
  theatreMobile: { x: 480, y: 60, w: 900, h: 560 },
  handoffIn: 'pan-right',
  handoffOut: 'turn-over',
  beats: [
    { id: 'letterhead', hold: 30, origin: 'drop' },
    {
      id: 'card',
      hold: 50,
      origin: { emerge: { from: [765, 404], via: [765, 300] } },
      occluder: ['letters'],
      acts: [
        { target: { obj: 'env-flap' }, moved: '1 -1', mode: 'off', property: 'scale' },
        { target: { layer: 'tray' }, moved: 'translate(-6%, 8%)', mode: 'out', delay: 200 },
      ],
      poses: { base: 'figure', alt: 'figure-alt', swaps: 1, end: 'alt' },
    },
    { id: 'form', hold: 'flow', origin: 'rise' },
  ],
};
