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
  /**
   * The CSS property animated: `transform` on layers, `translate` / `scale` on objects that also have :has() state,
   * `opacity` for an object that hands its place to a sheet (an index card lifted off the board, v3.6).
   */
  property?: 'transform' | 'translate' | 'scale' | 'opacity';
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
  /**
   * Stage layers copied above the sheet while it emerges (§4.4 step 7). Required for an Emerge beat;
   * `[]` when the object it comes off sits in front of everything (a card lifted off the board, v3.6).
   */
  occluder?: readonly string[];
  /** Children (`[data-step]`) that arrive one by one once the sheet has landed (pinned) or shows (flow). */
  steps?: number;
  poses?: PoseSwap;
  /**
   * The sheet is folded small and pinned to a point of the stage when the next beat comes on (v3.19,
   * the career board): it flies there in world coordinates and is gone; backwards it comes out again.
   */
  exit?: { pin: readonly [number, number] };
};

/** Camera moves of §4.3. `tilt-up` is the tilt up and pan (`03 → 04`); `turn-over` only leaves (`06 → footer`). */
export type Handoff = 'none' | 'pan-right' | 'tilt-down' | 'tilt-up' | 'dolly-out' | 'turn-over';

export type ChapterSpec = {
  id: string;
  lane: 'left' | 'right';
  frames: Frames;
  /** The part of the world that fills the viewport when the screen's ratio allows (cover fit). */
  theatre: Rect;
  /**
   * The part that must always stay in view (v3.7, §9.1): on a screen wider or taller than the
   * theatre's ratio the fit zooms out just enough to keep it, and the camera slides to it, so a
   * slightly different ratio never crops the lamp or the figure. Defaults to `safeOf(theatre)`.
   */
  safe?: Rect;
  theatreMobile: Rect;
  handoffIn: Handoff;
  handoffOut: Handoff;
  /**
   * A record chapter (§4.6 v3.4): one pinned beat per entry (a role, a file) instead of an
   * in-flow list. Its track may run to 800 svh, with every entry held at the minimum.
   */
  records?: boolean;
  /**
   * Beats that share one composition while any of them is on (§4.4 v3.6). `stack`: their sheets
   * lie in one pile and the front sheet is tucked under the back as the next comes up (the
   * service blueprints). `rail`: their sheets are segments of one wire, side by side, and the
   * wire slides sideways to the active one (the gallery). `grid` (v3.19): the sheets stay once they
   * have arrived and fill a two-column grid, one more with each beat (the About index cards). Each group is a record run (§4.6).
   */
  groups?: Array<{ layout: 'stack' | 'rail' | 'grid'; beats: readonly string[]; /** `grid`: the beat that lets the sheets go again (they fly back to where they came from). */ release?: string }>;
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
    if (typeof beat.origin === 'object' && !beat.occluder) fail(`emerge beat ${beat.id} needs an occluder (or [] in front of the scene)`);
    if (beat.hold !== 'flow') {
      if (beat.hold < 30 || beat.hold > 60) fail(`beat ${beat.id} holds ${beat.hold} svh, outside 30–60`);
      track += 40 + beat.hold;
    }
    if (beat.steps && beat.hold !== 'flow' && beat.hold / beat.steps < 10) fail(`beat ${beat.id} sub-steps are under 10 svh`);
    for (const act of beat.acts ?? []) actors.add('layer' in act.target ? act.target.layer : act.target.obj);
    if (beat.poses) poses.add(beat.poses.base).add(beat.poses.alt);
  }
  // Each pinned beat is a cue track of 40 svh plus its hold (v3.3: sheets no longer travel with the scroll).
  const cap = spec.records ? 880 : 600;
  if (track > cap) fail(`track is ${track} svh, max ${cap}`);
  if (spec.records && spec.beats.slice(1).some((beat) => beat.hold !== 30 && beat.hold !== 'flow')) fail('record entries hold 30 svh');
  for (const group of spec.groups ?? []) {
    if (group.beats.length < 2) fail('a group needs two beats or more');
    group.beats.forEach((id, i) => {
      const at = spec.beats.findIndex((b) => b.id === id);
      if (at < 0) fail(`group beat ${id} is not in the spec`);
      if (spec.beats[at].hold !== 30) fail(`group beat ${id} holds 30 svh`);
      if (i > 0 && spec.beats[at - 1]?.id !== group.beats[i - 1]) fail(`group beats ${group.beats.join(', ')} are not consecutive`);
    });
  }
  if (actors.size > 12) fail(`${actors.size} actors, max 12`);
  if (poses.size > 4) fail(`${poses.size} poses, max 4`);
}

/**
  Default safe rect: the theatre without 8 % at each side, and from just above the furniture
  (world y -40) to just under the skirting (FLOOR_Y 590 + 60): every station stands on the same floor.
*/
export function safeOf(t: Rect): Rect {
  return { x: Math.round(t.x + t.w * 0.08), y: -40, w: Math.round(t.w * 0.84), h: 690 };
}
