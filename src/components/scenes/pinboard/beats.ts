import type { ChapterSpec } from '../chapter/spec';
import { PINBOARD_FRAMES } from './PinboardStation';

/*
  Chapter `02` — The Pinboard (DesignRules.md §4.5 `02`). Lane on the left over
  the window wall; the board, photo card and figure fill the rest.
  Title drops onto a pin → the dossier unfolds as the photo card tilts out →
  the four index cards are handed to the board one by one (stop-motion
  pin ↔ reach). Leaves by tilting down to the filing cabinet below.
*/
export const PINBOARD_CHAPTER: ChapterSpec = {
  id: 'about',
  lane: 'left',
  frames: PINBOARD_FRAMES,
  theatre: { x: -260, y: -170, w: 1860, h: 1162 },
  theatreMobile: { x: 760, y: 30, w: 760, h: 620 },
  handoffIn: 'pan-right',
  handoffOut: 'tilt-down',
  beats: [
    { id: 'title', hold: 30, origin: 'drop' },
    {
      id: 'dossier',
      hold: 50,
      origin: 'unfold',
      acts: [{ target: { layer: 'photo' }, moved: 'rotate(-7deg) translateY(-1.2cqw) scale(1.06)', mode: 'out' }],
    },
    {
      id: 'cards',
      hold: 56,
      origin: 'slide-right',
      steps: 4,
      poses: { base: 'figure', alt: 'figure-alt', swaps: 4 },
    },
  ],
};
