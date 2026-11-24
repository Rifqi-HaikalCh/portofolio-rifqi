import type { BeatSpec, ChapterSpec } from '../chapter/spec';
import { GALLERY_FRAMES } from './GalleryStation';

/*
  Chapter `04b` — The Shadow-Box Gallery (DesignRules.md §4.5 `04b`, v3.6). Arrives
  by a pan right along the wall from the drafting table. The title rises while
  the figure hangs the new frame on the rail (stop-motion `hang` ↔ `reach`) →
  the six featured projects hang as cards on one wire, two per segment (a
  `rail` group): each beat slides the wire sideways to the next pair → the
  archive drawer rises in flow. Leaves by the dolly out and pan to the shelf.
*/
// v3.7: the illustrated rail on the stage slides with the wire (GalleryStation `hung`), and the figure turns to the frames once per segment.
const wire: BeatSpec[] = [0, 1, 2, 3].map((i) => ({ id: `wire-${i}`, hold: 30, origin: 'rise', poses: { base: 'figure', alt: 'figure-alt', swaps: 1 } }));

export const GALLERY_CHAPTER: ChapterSpec = {
  id: 'projects',
  lane: 'left',
  frames: GALLERY_FRAMES,
  theatre: { x: -60, y: -170, w: 1800, h: 1125 },
  theatreMobile: { x: 500, y: 0, w: 640, h: 620 },
  handoffIn: 'pan-right',
  handoffOut: 'dolly-out',
  groups: [{ layout: 'rail', beats: wire.map((b) => b.id) }],
  beats: [
    {
      id: 'title',
      hold: 40,
      origin: 'rise',
      acts: [{ target: { layer: 'new-frame' }, moved: 'translateY(70%) rotate(-9deg)', mode: 'in' }],
      poses: { base: 'figure', alt: 'figure-alt', swaps: 2 },
    },
    ...wire,
    { id: 'archive', hold: 'flow', origin: 'rise' },
  ],
};
