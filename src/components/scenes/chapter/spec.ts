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
  /**
   * Cued (§4.4 v3.3). `in`: moved until the beat is reached, then authored (the lamp swings to the board).
   * `out`: moved only while the beat is on. `off`: moved once reached and stays (a cover sheet slid away).
   * `pulse`: authored → moved → authored once each time the beat comes on (a binder pulled and put back).
   */
  mode: 'in' | 'out' | 'off' | 'pulse';
  /** The CSS property animated: `transform` on layers, `translate` / `scale` on objects that also have :has() state. */
  property?: 'transform' | 'translate' | 'scale';
  /** Start delay in ms, for acts that follow one another (binders pulled one by one). */
  delay?: number;
  /** transform-origin of the target, when it must turn about a point other than its centre (a light pool about its lamp). */
  origin?: string;
};

/**
 * Stop-motion swap between two pose layers while a beat is on (§10.2). `end: 'alt'` keeps the
 * alternate pose for the rest of the beat (the figure goes on holding the card out).
 */
export type PoseSwap = { base: string; alt: string; swaps: number; end?: 'base' | 'alt' };

export type BeatSpec = {
  id: string;
  /** Hold in svh (30–60), or `flow` for a long in-flow sheet (a ledger) that never pins. */
  hold: number | 'flow';
  origin: Origin;
  acts?: Act[];
  /** Stage layers copied above the sheet while it emerges (§4.4 step 7). */
  occluder?: readonly string[];
  /** Children (`[data-step]`) that arrive one by one once the sheet has landed (pinned) or shows (flow). */
  steps?: number;
  poses?: PoseSwap;
};

/** Camera moves of §4.3. `tilt-up` is the tilt up and pan (`03 → 04`); `turn-over` only leaves (`06 → footer`). */
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
  /**
   * A record chapter (§4.6 v3.4): one pinned beat per entry (a role, a file) instead of an
   * in-flow list. Its track may run to 800 svh, with every entry held at the minimum.
   */
  records?: boolean;
  beats: BeatSpec[];
};

const ORIGINS = new Set(['drop', 'rise', 'slide-left', 'slide-right', 'unfold']);

/** Track caps and vocabulary of §4.6 / §10.2; throws so a bad chapter fails the build. */
export function validateChapter(spec: ChapterSpec) {
  const fail = (msg: string) => {
    throw new Error(`Chapter "${spec.id}": ${msg} (DesignRules.md §4.6)`);
  };
  let track = 35 + 70; // lead-in before the first cue + tail after the last (chapter.css)
  const actors = new Set<string>();
  const poses = new Set<string>();
  for (const beat of spec.beats) {
    if (typeof beat.origin === 'string' && !ORIGINS.has(beat.origin)) fail(`beat ${beat.id} has an unknown origin`);
    if (typeof beat.origin === 'object' && !beat.occluder?.length) fail(`emerge beat ${beat.id} needs an occluder`);
    if (beat.hold !== 'flow') {
      if (beat.hold < 30 || beat.hold > 60) fail(`beat ${beat.id} holds ${beat.hold} svh, outside 30–60`);
      track += 40 + beat.hold;
    }
    if (beat.steps && beat.hold !== 'flow' && beat.hold / beat.steps < 10) fail(`beat ${beat.id} sub-steps are under 10 svh`);
    for (const act of beat.acts ?? []) actors.add('layer' in act.target ? act.target.layer : act.target.obj);
    if (beat.poses) poses.add(beat.poses.base).add(beat.poses.alt);
  }
  // Each pinned beat is a cue track of 40 svh plus its hold (v3.3: sheets no longer travel with the scroll).
  const cap = spec.records ? 800 : 600;
  if (track > cap) fail(`track is ${track} svh, max ${cap}`);
  if (spec.records && spec.beats.slice(1).some((beat) => beat.hold !== 30)) fail('record entries hold 30 svh');
  if (actors.size > 6) fail(`${actors.size} actors, max 6`);
  if (poses.size > 4) fail(`${poses.size} poses, max 4`);
}
