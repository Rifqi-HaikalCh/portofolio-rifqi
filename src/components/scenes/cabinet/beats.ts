import type { ChapterSpec } from '../chapter/spec';
import { CABINET_FRAMES } from './CabinetStation';

/*
  Chapter `03` — The Filing Cabinet (DesignRules.md §4.5 `03`). Arrives by a
  tilt down from the pinboard. The drawer slides out with the title → the
  newest folder rises and the current role emerges from it, past the drawer
  front (occluder) → the ledger rises as one long in-flow sheet. Lane on the
  left over the kraft boxes, so the cabinet and figure stay in view.
*/
export const CABINET_CHAPTER: ChapterSpec = {
  id: 'experience',
  lane: 'left',
  frames: CABINET_FRAMES,
  theatre: { x: -156, y: -220, w: 1516, h: 947 },
  theatreMobile: { x: 520, y: 60, w: 620, h: 560 },
  handoffIn: 'tilt-down',
  handoffOut: 'none',
  beats: [
    {
      id: 'title',
      hold: 36,
      origin: 'rise',
      acts: ['drawer', 'folders', 'drawer-front'].map((layer) => ({
        target: { layer },
        moved: 'translateY(-2.6cqw) scale(0.95)',
        mode: 'in' as const,
      })),
    },
    {
      id: 'current',
      hold: 50,
      origin: { emerge: { from: [800, 330], via: [800, 170] } },
      occluder: ['drawer-front'],
      acts: [{ target: { obj: 'work-0' }, moved: '0 -64px', mode: 'out', property: 'translate' }],
    },
    { id: 'ledger', hold: 'flow', origin: 'rise' },
  ],
};
