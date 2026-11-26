import type { BeatSpec, ChapterSpec } from '../chapter/spec';
import { lampActs } from '../lamp';
import { DRAFTING_FRAMES, DRAFTING_LAMP } from './DraftingStation';

/*
  Chapter `04` — The Drafting Table (DesignRules.md §4.5 `04`, v3.6). Arrives by
  the tilt up and pan from the cabinet. The title drops as the lamp swings to
  the board → the cover sheet slides off the blueprint and the three core-stack
  groups drop on as tracing overlays (stop-motion `draw` ↔ `reach`) → the six
  services come off the board as one pile of blueprints (a `stack` group): each
  beat tucks the front sheet under the pile, and the figure draws on the next →
  the tools rise in flow. Lane on the right, over the shelf and the stool.
  v3.7: the services are no longer a pile of HTML sheets; each one is written
  on the front blueprint on the board (chapter.css `.svc-sheet`), after the
  board's pile tucks the last sheet under (plans.tsx).
*/
export const SERVICE_COUNT = 6;
const services: BeatSpec[] = Array.from({ length: SERVICE_COUNT }, (_, i) => ({
  id: `svc-${i}`,
  hold: 30,
  origin: 'drop',
  poses: { base: 'figure', alt: 'figure-alt', swaps: 1 },
}));
export const DRAFTING_CHAPTER: ChapterSpec = {
  id: 'services',
  lane: 'right',
  frames: DRAFTING_FRAMES,
  // v3.7: closer on the board, which now carries the services' text.
  theatre: { x: 230, y: -120, w: 1640, h: 1025 },
  safe: { x: 330, y: -40, w: 1260, h: 690 },
  theatreMobile: { x: 240, y: 60, w: 1000, h: 560 },
  handoffIn: 'tilt-up',
  handoffOut: 'pan-right',
  // A pile of entries, so a record run (§4.6): 665 svh.
  records: true,
  beats: [
    {
      id: 'title',
      hold: 30,
      origin: 'drop',
      acts: lampActs(DRAFTING_LAMP, 9),
    },
    {
      id: 'stack',
      hold: 30,
      origin: 'drop',
      steps: 3,
      acts: [{ target: { layer: 'cover' }, moved: 'translate(-118%, 24%) rotate(-10deg)', mode: 'off' }],
      poses: { base: 'figure', alt: 'figure-alt', swaps: 3 },
    },
    ...services,
    { id: 'tools', hold: 'flow', origin: 'rise' },
  ],
};
