import { organizationExperience, workExperience } from '../../../data/portfolio';
import type { BeatSpec, ChapterSpec } from '../chapter/spec';
import { lampActs } from '../lamp';
import { EXP_SHIFT, roleSlots } from './board';
import { EXPERIENCE_FRAMES, cabinetLamp, folderMouth } from './CabinetStation';

/*
  Chapter `03` — The Filing Cabinet (DesignRules.md §4.5 `03`, v3.4; career board v3.19). Arrives
  by a tilt down from the pinboard. The drawer slides out with the title →
  every role is a file of its own: its folder lifts and the role's sheet
  emerges from it past the drawer front (occluder), newest first; reaching the
  organisation roles swaps the folder set in the drawer. A record chapter
  (§4.6): one pinned beat per entry, so its track may run past 600 svh.
*/

/** `first` is the role's place in the whole walk: the sheet is folded and pinned to that pin of the career board (board.ts). */
const slots = roleSlots(workExperience.length, organizationExperience.length);
const files = (set: 'work' | 'organization', n: number, first: number): BeatSpec[] =>
  Array.from({ length: n }, (_, i) => ({
    id: `${set}-${i}`,
    hold: 30,
    origin: { emerge: folderMouth(n, i, EXP_SHIFT) },
    occluder: ['drawer-front'],
    exit: { pin: [slots[first + i].x, slots[first + i].y] as const },
  }));

export const CABINET_CHAPTER: ChapterSpec = {
  id: 'experience',
  lane: 'left',
  frames: EXPERIENCE_FRAMES,
  theatre: { x: -156, y: -220, w: 1700, h: 947 },
  // The board, the cabinet and the figure always stay in view (v3.19).
  safe: { x: 500, y: -40, w: 1090, h: 690 },
  theatreMobile: { x: 620, y: 40, w: 960, h: 580 },
  handoffIn: 'tilt-down',
  handoffOut: 'tilt-up',
  records: true,
  beats: [
    {
      id: 'title',
      hold: 30,
      origin: 'rise',
      acts: [
        ...['drawer', 'folders', 'drawer-front'].map((layer) => ({
          target: { layer },
          moved: 'translateY(-2.6cqw) scale(0.95)',
          mode: 'in' as const,
        })),
        ...lampActs(cabinetLamp(EXP_SHIFT), -8),
      ],
    },
    ...files('work', workExperience.length, 0),
    ...files('organization', organizationExperience.length, workExperience.length),
    // The last file is pinned and the camera moves in on the career board (scene.css via CabinetStation).
    { id: 'board', hold: 30, origin: 'rise' },
  ],
};
