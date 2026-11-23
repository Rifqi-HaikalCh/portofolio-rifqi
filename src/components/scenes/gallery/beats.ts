import type { ChapterSpec } from '../chapter/spec';
import { GALLERY_FRAMES } from './GalleryStation';

/*
  Chapter `04b` — The Shadow-Box Gallery (DesignRules.md §4.5 `04b`). Arrives
  by a pan right along the wall from the drafting table. The title rises while
  the figure hangs the new frame on the rail (stop-motion `hang` ↔ `reach`) →
  the project frames rise as one long in-flow sheet. Leaves by the dolly out
  and pan to the archive shelf.
*/
export const GALLERY_CHAPTER: ChapterSpec = {
  id: 'projects',
  lane: 'left',
  frames: GALLERY_FRAMES,
  theatre: { x: -60, y: -170, w: 1800, h: 1125 },
  theatreMobile: { x: 500, y: 0, w: 640, h: 620 },
  handoffIn: 'pan-right',
  handoffOut: 'dolly-out',
  beats: [
    {
      id: 'title',
      hold: 40,
      origin: 'rise',
      acts: [{ target: { layer: 'new-frame' }, moved: 'translateY(70%) rotate(-9deg)', mode: 'in' }],
      poses: { base: 'figure', alt: 'figure-alt', swaps: 2 },
    },
    // W3: the six frames are hung two at a time once the shelf shows (`data-step` = row pair).
    { id: 'shelf', hold: 'flow', origin: 'rise', steps: 3 },
  ],
};
