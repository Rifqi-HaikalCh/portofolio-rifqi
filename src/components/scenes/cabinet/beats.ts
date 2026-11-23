import { organizationExperience, workExperience } from '../../../data/portfolio';
import type { BeatSpec, ChapterSpec } from '../chapter/spec';
import { CABINET_FRAMES, folderMouth } from './CabinetStation';

/*
  Chapter `03` — The Filing Cabinet (DesignRules.md §4.5 `03`, v3.4). Arrives
  by a tilt down from the pinboard. The drawer slides out with the title →
  every role is a file of its own: its folder lifts and the role's sheet
  emerges from it past the drawer front (occluder), newest first; reaching the
  organisation roles swaps the folder set in the drawer. A record chapter
  (§4.6): one pinned beat per entry, so its track may run past 600 svh.
*/

const files = (set: 'work' | 'organization', n: number): BeatSpec[] =>
  Array.from({ length: n }, (_, i) => ({
    id: `${set}-${i}`,
    hold: 30,
    origin: { emerge: folderMouth(n, i) },
    occluder: ['drawer-front'],
  }));

export const CABINET_CHAPTER: ChapterSpec = {
  id: 'experience',
  lane: 'left',
  frames: CABINET_FRAMES,
  theatre: { x: -156, y: -220, w: 1516, h: 947 },
  theatreMobile: { x: 520, y: 60, w: 620, h: 560 },
  handoffIn: 'tilt-down',
  handoffOut: 'tilt-up',
  records: true,
  beats: [
    {
      id: 'title',
      hold: 30,
      origin: 'rise',
      acts: ['drawer', 'folders', 'drawer-front'].map((layer) => ({
        target: { layer },
        moved: 'translateY(-2.6cqw) scale(0.95)',
        mode: 'in' as const,
      })),
    },
    ...files('work', workExperience.length),
    ...files('organization', organizationExperience.length),
  ],
};
