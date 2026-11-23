import type { Frames, Rect } from '../PaperScene';

/*
  Chapter data (DesignRules.md §4.1, §9.7). A station's chapter is declared,
  not hand-animated: beats with an origin and a hold, the acts the scene plays
  for them, and the handoffs in and out. `chapterCss` turns it into one style
  block; `validateChapter` enforces the caps of §4.6 at build time.
*/

/** Where the paper comes from (§4.1). Emerge points are world coordinates in the station. */
export type Origin =
  | 'drop'
  | 'rise'
  | 'slide-left'
  | 'slide-right'
  | 'unfold'
  | { emerge: { from: readonly [number, number]; via: readonly [number, number] } };

/** A scene act: a stage layer (by id) or an object inside one (`[data-obj]`), keyed to a beat. */
export type Act = {
  target: { layer: string } | { obj: string };
  /** CSS for the moved state; the authored composition is the other end. */
  moved: string;
  /** `in`: moved before the beat, authored after it (e.g. the drawer slides out). `out`: authored → moved while the beat arrives, back when it leaves. */
  mode: 'in' | 'out';
  /** The CSS property animated: `transform` on layers, `translate` on objects that also have :has() state. */
  property?: 'transform' | 'translate';
};

/** Stop-motion swap between two pose layers over a beat's hold (§10.2). */
export type PoseSwap = { base: string; alt: string; swaps: number };

export type BeatSpec = {
  id: string;
  /** Hold in svh (30–60), or `flow` for a long in-flow sheet (a ledger) that never pins. */
  hold: number | 'flow';
  origin: Origin;
  acts?: Act[];
  /** Stage layers copied above the sheet while it emerges (§4.4 step 7). */
  occluder?: readonly string[];
  /** Children (`[data-step]`) that arrive one by one during the hold. */
  steps?: number;
  poses?: PoseSwap;
};

export type Handoff = 'none' | 'pan-right' | 'tilt-down' | 'tilt-up' | 'dolly-out' | 'turn-over';

export type ChapterSpec = {
  id: string;
  lane: 'left' | 'right';
  frames: Frames;
  /** The part of the world that fills the viewport (cover fit); mobile uses the split-stage crop. */
  theatre: Rect;
  theatreMobile: Rect;
  handoffIn: Handoff;
  handoffOut: Handoff;
  beats: BeatSpec[];
};

const ORIGINS = new Set(['drop', 'rise', 'slide-left', 'slide-right', 'unfold']);

/** Track caps and vocabulary of §4.6 / §10.2; throws so a bad chapter fails the build. */
export function validateChapter(spec: ChapterSpec) {
  const fail = (msg: string) => {
    throw new Error(`Chapter "${spec.id}": ${msg} (DesignRules.md §4.6)`);
  };
  let track = 100; // arrival
  const actors = new Set<string>();
  const poses = new Set<string>();
  for (const beat of spec.beats) {
    if (typeof beat.origin === 'string' && !ORIGINS.has(beat.origin)) fail(`beat ${beat.id} has an unknown origin`);
    if (typeof beat.origin === 'object' && !beat.occluder?.length) fail(`emerge beat ${beat.id} needs an occluder`);
    if (beat.hold !== 'flow') {
      if (beat.hold < 30 || beat.hold > 60) fail(`beat ${beat.id} holds ${beat.hold} svh, outside 30–60`);
      track += beat.hold + 100;
    }
    if (beat.steps && beat.hold !== 'flow' && beat.hold / beat.steps < 10) fail(`beat ${beat.id} sub-steps are under 10 svh`);
    for (const act of beat.acts ?? []) actors.add('layer' in act.target ? act.target.layer : act.target.obj);
    if (beat.poses) poses.add(beat.poses.base).add(beat.poses.alt);
  }
  // Each pinned beat costs one viewport of travel plus its hold (measured in W1).
  if (track > 600) fail(`track is ${track} svh, max 600`);
  if (actors.size > 6) fail(`${actors.size} actors, max 6`);
  if (poses.size > 4) fail(`${poses.size} poses, max 4`);
}
