import type { ChapterSpec } from '../chapter/spec';
import { ARCHIVE_FRAMES } from './ArchiveStation';

/*
  Chapter `05` — The Archive Shelf (DesignRules.md §4.5 `05`). Arrives by the
  dolly out and pan from the gallery. The title rises as the binders settle
  onto their shelf → four books, one per category, come off the shelf and
  open (v3.11). Stacked and folio layouts keep the in-flow folios; opening a
  folio pulls its binder (the station's :has() rule). Lane on the right, over the
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
    /*
      v3.11 (owner): one book per category. Its binder leaves the shelf, the book
      flies to the middle of the stage closed and opens on its pages of
      certificates; scrolling on closes it and puts it back, and the next book
      comes out; scrolling back does the same in reverse (scene.css `.book`).
    */
    ...[0, 1, 2, 3].map((i) => ({
      id: `book-${i}`,
      hold: 40,
      origin: 'rise' as const,
      acts: [{ target: { obj: `binder-${i}` }, moved: '0', mode: 'out' as const, property: 'opacity' as const, delay: 450 }],
    })),
    // The folios stay for the stacked studio and the folio page (< 768 px); the theatre shows the books instead.
    { id: 'folios', hold: 'flow', origin: 'rise' },
  ],
};
