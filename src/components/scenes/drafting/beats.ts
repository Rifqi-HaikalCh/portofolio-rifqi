import type { ChapterSpec } from '../chapter/spec';
import { DRAFTING_FRAMES } from './DraftingStation';

/*
  Chapter `04` — The Drafting Table (DesignRules.md §4.5 `04`). Arrives by the
  tilt up and pan from the cabinet. The title drops as the lamp swings to the
  board → the cover sheet slides off the blueprint and the three core-stack
  groups drop on as tracing overlays (stop-motion `draw` ↔ `reach`) → the
  service boards rise as one long in-flow sheet. Lane on the right, over the
  shelf and the stool, so the board and the figure stay in view.
*/
export const DRAFTING_CHAPTER: ChapterSpec = {
  id: 'services',
  lane: 'right',
  frames: DRAFTING_FRAMES,
  theatre: { x: 190, y: -200, w: 1900, h: 1188 },
  theatreMobile: { x: 240, y: 60, w: 1000, h: 560 },
  handoffIn: 'tilt-up',
  handoffOut: 'pan-right',
  beats: [
    {
      id: 'title',
      hold: 30,
      origin: 'drop',
      acts: [
        { target: { layer: 'lamp' }, moved: 'rotate(9deg)', mode: 'in' },
        // The light pool swings with the head, about the same point (the lamp box's centre, 1200 × 120).
        { target: { layer: 'lamp-light' }, moved: 'rotate(9deg)', mode: 'in', origin: '100% 10%' },
      ],
    },
    {
      id: 'stack',
      hold: 50,
      origin: 'drop',
      steps: 3,
      acts: [{ target: { layer: 'cover' }, moved: 'translate(-118%, 24%) rotate(-10deg)', mode: 'off' }],
      poses: { base: 'figure', alt: 'figure-alt', swaps: 3 },
    },
    { id: 'services', hold: 'flow', origin: 'rise' },
  ],
};
