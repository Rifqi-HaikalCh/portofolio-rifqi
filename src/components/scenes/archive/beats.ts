import type { ChapterSpec } from '../chapter/spec';
import { ARCHIVE_FRAMES } from './ArchiveStation';

/*
  Chapter `05` — The Archive Shelf (DesignRules.md §4.5 `05`). Arrives by the
  dolly out and pan from the gallery. The title rises as the binders settle
  onto their shelf → the folios rise as one in-flow sheet; opening a folio
  pulls its binder (the station's :has() rule). Lane on the right, over the
  paper stack; the bookcase and figure stay in view.
*/
export const ARCHIVE_CHAPTER: ChapterSpec = {
  id: 'certificates',
  lane: 'right',
  frames: ARCHIVE_FRAMES,
  theatre: { x: 200, y: -190, w: 1900, h: 1188 },
  theatreMobile: { x: 380, y: 40, w: 980, h: 600 },
  handoffIn: 'dolly-out',
  handoffOut: 'pan-right',
  beats: [
    {
      id: 'title',
      hold: 40,
      origin: 'rise',
      acts: [
        { target: { layer: 'binders' }, moved: 'translateY(-2.4cqw) scale(1.04)', mode: 'in' },
        // W3: then each binder is pulled half out and pushed back, one after another, left to right.
        ...[0, 1, 2, 3].map((i) => ({
          target: { obj: `binder-${i}` },
          moved: '0 -18px',
          mode: 'pulse' as const,
          property: 'translate' as const,
          delay: 700 + i * 260,
        })),
      ],
    },
    { id: 'folios', hold: 'flow', origin: 'rise' },
  ],
};
