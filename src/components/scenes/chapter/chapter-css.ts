import type { Act, BeatSpec, ChapterSpec, Handoff, Origin } from './spec';

/*
  Beat CSS generator (DesignRules.md §4.4, §9.7 v3.3). Two clocks:

  - Camera (scroll-driven): the stage handoffs between chapters run on the
    chapter's view timeline, so the camera moves with the wheel and reverses.
  - Paper (time-driven): sheets, sub-steps, acts and poses are *cued*. The
    scroll position only picks the active beat (ChapterCue sets `data-state`,
    `data-dir`, `data-beat`, `data-reached`); each sheet then plays its whole
    entrance or exit in time, flexing like paper, and holds still to be read.

  Rules are scoped to the chapter id and apply only in the cued theatre
  (chapter.css holds the static part and the shared leaf keyframes).
*/

// From 768 px only (v3.6): below that the page is the folio, the v1 layout without stages (chapter.css).
const THEATRE = '@supports (animation-timeline: view()) { @media (prefers-reduced-motion: no-preference) and (min-height: 561px) and (min-width: 768px) {';
const DESKTOP = '@media (min-width: 768px) {';

/** Time a sheet takes to land (in) and to be lifted away (out). */
const IN = 'var(--dur-leaf-in)';
const OUT = 'var(--dur-leaf-out)';
const EASE = 'var(--ease-leaf)';
const P = 'perspective(1400px)';

const n = (v: number) => Math.round(v * 100) / 100;

/*
  Entrances, one per origin (§4.1). Every one bends the sheet on its way in
  (rotateX/skew about the edge that leads), overshoots a little and settles
  flat: paper has weight and give, a card does not. They all end on
  `transform: none` so the held sheet is pixel-still.
*/
function sheetIn(spec: ChapterSpec, beat: BeatSpec, name: string) {
  const o: Origin = beat.origin;
  const frames = (body: string) => `@keyframes ${name}{${body}}@keyframes ${name}-r{${body}}`;
  if (o === 'drop') {
    return frames(
      `0%{transform:${P} translateY(calc(-1 * (var(--beat-top) + 100%) - 6svh)) rotate(-2.5deg) rotateX(26deg);opacity:0}` +
        `8%{opacity:1}` +
        `60%{transform:${P} translateY(1.2svh) rotate(.5deg) rotateX(-7deg)}` +
        `80%{transform:${P} translateY(-.4svh) rotate(-.15deg) rotateX(2.5deg)}` +
        `to{transform:none;opacity:1}`,
    );
  }
  if (o === 'rise') {
    return frames(
      `0%{transform:${P} translateY(34svh) rotateX(-30deg);opacity:0}` +
        `25%{opacity:1}` +
        `58%{transform:${P} translateY(-1svh) rotateX(5deg)}` +
        `80%{transform:${P} translateY(.3svh) rotateX(-1.5deg)}` +
        `to{transform:none;opacity:1}`,
    );
  }
  if (o === 'slide-left' || o === 'slide-right') {
    const s = o === 'slide-left' ? -1 : 1;
    return frames(
      `0%{transform:translateX(${s * 100}cqw) skewX(${-s * 9}deg) rotate(${s * 2}deg);opacity:0}` +
        `10%{opacity:1}` +
        `64%{transform:translateX(${-s * 1.2}cqw) skewX(${s * 3}deg) rotate(${-s * 0.4}deg)}` +
        `84%{transform:translateX(${s * 0.3}cqw) skewX(${-s}deg)}` +
        `to{transform:none;opacity:1}`,
    );
  }
  if (o === 'unfold') {
    return frames(
      `0%{transform:${P} rotateX(-96deg);opacity:0}` +
        `15%{opacity:1}` +
        `55%{transform:${P} rotateX(11deg)}` +
        `76%{transform:${P} rotateX(-4deg)}` +
        `90%{transform:${P} rotateX(1.2deg)}` +
        `to{transform:none;opacity:1}`,
    );
  }
  // Emerge: out of an object in the stage (world coordinates → viewport through the stage fit, chapter.css).
  const f = spec.frames.desktop;
  const vx = (x: number) => `(50cqw + ${n(x - f.x)} * var(--s) - var(--cxs))`;
  const vy = (y: number) => `(50svh + ${n(y - f.y)} * var(--s) - var(--cys))`;
  const centre =
    spec.lane === 'right' ? '(100cqw - var(--lane-pad) - var(--lane-w) / 2)' : '(var(--lane-pad) + var(--lane-w) / 2)';
  const at = ([x, y]: readonly [number, number]) => `translate(calc(${vx(x)} - ${centre}),calc(${vy(y)} - var(--beat-top)))`;
  const { from, via } = o.emerge;
  return frames(
    `0%{transform:${at(from)} scale(.3) rotate(-5deg);opacity:0}` +
      `10%{opacity:1}` +
      `42%{transform:${at(via)} scale(.56) rotate(3deg)}` +
      `78%{transform:translate(0,-.6svh) scale(1.015) rotate(-.4deg)}` +
      `to{transform:none;opacity:1}`,
  );
}

/* Exits: the sheet is lifted by its near edge and carried off (slides go back the way they came). */
function sheetOut(beat: BeatSpec, name: string) {
  const o = beat.origin;
  const frames = (body: string) => `@keyframes ${name}{${body}}@keyframes ${name}-r{${body}}`;
  if (o === 'slide-left' || o === 'slide-right') {
    const s = o === 'slide-left' ? -1 : 1;
    return frames(
      `0%{transform:none;opacity:1}` +
        `25%{transform:translateX(${-s * 0.8}cqw) skewX(${-s * 1.5}deg)}` +
        `80%{opacity:1}` +
        `to{transform:translateX(${s * 100}cqw) skewX(${s * 8}deg) rotate(${s * 2}deg);opacity:0}`,
    );
  }
  return frames(
    `0%{transform:none;opacity:1}` +
      `28%{transform:${P} translateY(-1.2svh) rotateX(9deg)}` +
      `75%{opacity:1}` +
      `to{transform:${P} translateY(calc(-1 * (var(--beat-top) + 100%))) rotateX(-14deg) rotate(1.5deg);opacity:0}`,
  );
}

/** Where each sheet bends from: the edge that leads its move. */
function sheetOrigin(o: Origin) {
  if (o === 'drop' || o === 'unfold' || typeof o === 'object') return '50% 0';
  if (o === 'rise') return '50% 100%';
  return o === 'slide-left' ? '100% 50%' : '0 50%';
}

/*
  Acts are cued too: the scene moves when its beat comes on, in time, and
  rests at a transition's end. `in` = moved until the beat is reached;
  `off` = moved once reached; `out` = moved only while the beat is on.
*/
function actCss(sel: string, beat: BeatSpec, act: Act, name: string) {
  // The stage and its occluder copy (stage-front) act together, so an occluding envelope opens with the real one.
  const target = `:is(.stage, .stage-front) ${'layer' in act.target ? `[data-layer="${act.target.layer}"] > *` : `[data-obj="${act.target.obj}"]`}`;
  const prop = act.property ?? 'transform';
  const rest = prop === 'transform' ? 'none' : prop === 'scale' || prop === 'opacity' ? '1' : '0 0';
  const delay = `${act.delay ?? 0}ms`;
  const origin = act.origin ? `transform-origin:${act.origin};` : '';
  if (act.mode === 'pulse') {
    return (
      `@keyframes ${name}{0%,100%{${prop}:${rest}}45%{${prop}:${act.moved}}}` +
      (origin ? `${sel} ${target}{${origin}}` : '') +
      `${sel}[data-beat="${beat.id}"] ${target}{animation:${name} calc(var(--dur-act) * 1.3) var(--ease-paper) ${delay} both}`
    );
  }
  const when =
    act.mode === 'in'
      ? `${sel}:not([data-reached~="${beat.id}"])`
      : act.mode === 'off'
        ? `${sel}[data-reached~="${beat.id}"]`
        : `${sel}[data-beat="${beat.id}"]`;
  return `${sel} ${target}{${origin}transition:${prop} var(--dur-act) var(--ease-paper) ${delay}}${when} ${target}{${prop}:${act.moved}}`;
}

/** Stop-motion pose swap while the beat is on: `alt` for the first 60 % of each swap (§10.2), in time. */
function poseCss(sel: string, beat: BeatSpec, name: string) {
  const p = beat.poses!;
  const on: string[] = [];
  for (let j = 0; j < p.swaps; j += 1) {
    const a = (j / p.swaps) * 100;
    on.push(`${n(a + 1)}%{opacity:1}`, `${n(a + (0.6 / p.swaps) * 100)}%{opacity:0}`);
  }
  const off = on.map((k) => k.replace('opacity:1', 'opacity:X').replace('opacity:0', 'opacity:1').replace('opacity:X', 'opacity:0'));
  const dur = `calc(${p.swaps} * var(--dur-pose))`;
  const hold = p.end === 'alt';
  // A held pose changes as the sheet comes out (30 % into its flight); swaps wait until it has landed.
  const anim = (k: string) => `animation:${k} ${dur} step-end ${hold ? `calc(${IN} * .3)` : IN} both`;
  const on2 = `${sel}[data-beat="${beat.id}"] .stage`;
  return (
    `@keyframes ${name}-alt{0%{opacity:0}${on.join('')}100%{opacity:${hold ? 1 : 0}}}` +
    `@keyframes ${name}-base{0%{opacity:1}${off.join('')}100%{opacity:${hold ? 0 : 1}}}` +
    `${on2} [data-layer="${p.alt}"] > *{${anim(`${name}-alt`)}}` +
    `${on2} [data-layer="${p.base}"] > *{${anim(`${name}-base`)}}`
  );
}

/*
  Stage moves for the camera handoffs (§4.3). Each is one viewport of scroll
  (the chapter's `entry` or `exit` range) and counter-translates the natural
  scroll where the stage should look held: `in` keyframes run from → none,
  `out` keyframes none → to. Outgoing and incoming moves of a pair mirror each
  other, so the two stages travel as one camera move.
*/
const STAGE_MOVES: Partial<Record<Handoff, { in?: string; out?: string; outRange?: string; canvasIn?: string; canvasOut?: string }>> = {
  'pan-right': { in: 'translate(100%,-100svh)', out: 'translate(-100%,100svh)' },
  // Tilt up: the outgoing station sinks, the next drops in from above. (A diagonal tilt-and-pan left
  // two empty viewport corners between the stages in W2, so the pan part was dropped.)
  'tilt-up': { in: 'translateY(-200svh)', out: 'translateY(200svh)' },
  // Dolly out and pan: the stages pan; inside them the scene pulls back (outgoing) and settles (incoming).
  'dolly-out': { in: 'translate(100%,-100svh)', out: 'translate(-100%,100svh)', canvasIn: 'scale(1.12)', canvasOut: 'scale(0.86)' },
  // Turn-over: the frame turns edge-on while the footer (its kraft back) rises over it.
  'turn-over': { out: 'translateY(50svh) perspective(1600px) rotateY(-90deg)', outRange: 'exit 0% exit 50%' },
};

function handoffCss(sel: string, spec: ChapterSpec) {
  const tl = `--ch-${spec.id}`;
  const layerAnims: string[] = [];
  const stageAnims: string[] = [];
  const canvasAnims: string[] = [];
  let keys = '';
  const tilt = (dir: 1 | -1, phase: 'in' | 'out') => {
    const name = `ch-${spec.id}-tilt-${phase}`;
    const shifted = `translateY(calc(var(--k) * ${dir * 40}svh))`;
    keys += phase === 'in' ? `@keyframes ${name}{from{transform:${shifted}}to{transform:none}}` : `@keyframes ${name}{from{transform:none}to{transform:${shifted}}}`;
    layerAnims.push(`${name} linear ${phase === 'in' ? 'both' : 'forwards'}|${phase === 'in' ? 'entry 0% entry 100%' : 'exit 0% exit 100%'}`);
  };
  const stage = (h: Handoff, phase: 'in' | 'out') => {
    const move = STAGE_MOVES[h];
    const end = move?.[phase];
    if (!end) throw new Error(`Handoff "${h}" has no ${phase} move (DesignRules.md §4.3)`);
    const name = `ch-${spec.id}-${h}-${phase}`;
    keys += phase === 'in' ? `@keyframes ${name}{from{transform:${end}}to{transform:none}}` : `@keyframes ${name}{from{transform:none}to{transform:${end}}}`;
    const range = phase === 'in' ? 'entry 0% entry 100%' : (move.outRange ?? 'exit 0% exit 100%');
    // `forwards`, never `both`: filled backwards, an incoming `tilt-up` stage (−200svh) showed
    // through two viewports before its chapter arrived (v3.4). Every `in` move starts off-screen.
    stageAnims.push(`${name} linear forwards|${range}`);
    const canvas = phase === 'in' ? move.canvasIn : move.canvasOut;
    if (canvas) {
      keys += phase === 'in' ? `@keyframes ${name}-c{from{transform:${canvas}}to{transform:none}}` : `@keyframes ${name}-c{from{transform:none}to{transform:${canvas}}}`;
      canvasAnims.push(`${name}-c linear forwards|${range}`);
    }
  };
  const apply = (h: Handoff, phase: 'in' | 'out') => {
    if (h === 'none') return;
    if (h === 'tilt-down') tilt(phase === 'in' ? 1 : -1, phase);
    else stage(h, phase);
  };
  apply(spec.handoffIn, 'in');
  apply(spec.handoffOut, 'out');
  const rule = (target: string, list: string[]) =>
    list.length
      ? `${target}{animation:${list.map((a) => a.split('|')[0]).join(',')};animation-timeline:${list.map(() => tl).join(',')};animation-range:${list.map((a) => a.split('|')[1]).join(',')}}`
      : '';
  // Stage moves counter-translate a 100svh stage: desktop only (the split stage is 46svh).
  return (
    keys +
    rule(`${sel} .stage .scene-layer`, layerAnims) +
    (stageAnims.length ? `${DESKTOP}${rule(`${sel} .stage`, stageAnims)}${rule(`${sel} .stage > .stage-canvas`, canvasAnims)}}` : '')
  );
}

/*
  Groups (§4.4 v3.6): beats that keep one composition while any of them is on.
  Written after the beats, with one more attribute in each selector, so they
  override the single-sheet flights inside the group and leave the flights in
  and out of the group to them.

  stack — one pile. `--d` is a sheet's depth under the active one; the pile
  steps up and back. Advancing tucks the front sheet: lifted off the pile,
  then slid under it (z-index drops at the top of the lift). Going back plays
  the tuck reversed. Only the top three sheets of the pile show.

  rail — one wire. `--x` is a segment's place from the active one; the wire
  slides sideways, in time, to the segment the scroll has reached. Before the
  group the wire waits one segment to the right, after it one to the left.
*/
function groupCss(sel: string, spec: ChapterSpec, group: NonNullable<ChapterSpec['groups']>[number], gi: number) {
  const ids = group.beats;
  const N = ids.length;
  const on = (id: string) => `${sel}[data-beat="${id}"]`;
  // `[data-state][data-dir]` (always set together once cued) lifts these to the specificity of the flights they replace.
  const sheet = (id: string) => `[data-beat="${id}"][data-state][data-dir] > .beat-sheet`;
  const any = `:is(${ids.map((id) => `[data-beat="${id}"]`).join(',')})`;
  const name = `g-${spec.id}-${gi}`;
  let css = '';

  if (group.layout === 'stack') {
    const pose = `translate(calc(var(--d) * 1.1cqw), calc(var(--d) * -1.6svh)) rotate(calc(var(--d) * .9deg))`;
    css += `@keyframes ${name}-tuck{0%{transform:none;z-index:${N + 2}}38%{transform:translate(-3cqw,-26svh) rotate(-4deg);z-index:${N + 2}}40%{z-index:0}100%{transform:translate(${n((N - 1) * 1.1)}cqw,${n((N - 1) * -1.6)}svh) rotate(${n((N - 1) * 0.9)}deg);z-index:0}}`;
    css += `${sel} ${any} > .beat-sheet{transition:transform var(--dur-leaf-in) var(--ease-leaf),opacity var(--dur-act) var(--ease-paper);transform-origin:50% 100%}`;
    ids.forEach((a, ai) => {
      ids.forEach((id, i) => {
        const d = (i - ai + N) % N;
        css += `${on(a)} ${sheet(id)}{--d:${d};z-index:${N - d};transform:${d ? pose : 'none'};opacity:${d < 3 ? 1 : 0};animation:none}`;
      });
      // Tucked: the sheet that was on top a moment ago (the beat before a).
      if (ai > 0) css += `${on(a)} [data-beat="${ids[ai - 1]}"][data-state="after"][data-dir="fwd"] > .beat-sheet{animation:${name}-tuck calc(var(--dur-leaf-in) * 1.25) var(--ease-leaf)}`;
      // Back from the next sheet: this one comes out from under the pile.
      if (ai < N - 1) css += `${on(a)} [data-beat="${a}"][data-state="in"][data-dir="back"] > .beat-sheet{animation:${name}-tuck calc(var(--dur-leaf-in) * 1.25) var(--ease-leaf) reverse}`;
    });
    // Into the group from before it, and back into it from after it: the single-sheet flights.
    const first = `b-${spec.id}-${ids[0]}`;
    const last = `b-${spec.id}-${ids[N - 1]}`;
    css += `${on(ids[0])} [data-beat="${ids[0]}"][data-state="in"][data-dir="fwd"] > .beat-sheet{animation:${first}-in ${IN} ${EASE} both}`;
    css += `${on(ids[N - 1])} [data-beat="${ids[N - 1]}"][data-state="in"][data-dir="back"] > .beat-sheet{animation:${last}-out-r ${OUT} ${EASE} reverse both}`;
    return css;
  }

  // rail
  const slide = `translateX(calc(var(--x) * (var(--rail-w) + var(--rail-gap))))`;
  css += `${sel} ${any} > .beat-sheet{left:calc(var(--rail-cx, 50cqw) - var(--rail-w) / 2);right:auto;width:var(--rail-w);transform:${slide};transition:transform calc(var(--dur-leaf-in) * 1.2) var(--ease-leaf),opacity var(--dur-act) var(--ease-paper)}`;
  css += `${sel} ${any}[data-state][data-dir] > .beat-sheet{animation:none}`;
  ids.forEach((id, i) => {
    css += `${sel} [data-beat="${id}"][data-state="before"] > .beat-sheet{--x:${i + 1}}`;
    css += `${sel} [data-beat="${id}"][data-state="after"] > .beat-sheet{--x:${i - N}}`;
  });
  ids.forEach((a, ai) => {
    ids.forEach((id, i) => {
      css += `${on(a)} ${sheet(id)}{--x:${i - ai};opacity:${Math.abs(i - ai) < 2 ? 1 : 0}}`;
    });
  });
  return css;
}

export function chapterCss(spec: ChapterSpec) {
  const sel = `#${spec.id}[data-cue]:not([data-stacked])`;
  let all = `${sel}{view-timeline:--ch-${spec.id}}`;
  let desktop = '';

  for (const beat of spec.beats) {
    const b = `${sel} [data-beat="${beat.id}"]`;
    const name = `b-${spec.id}-${beat.id}`;

    // Acts and poses play at every width (the split stage too); sheets fly only on the desktop deck.
    (beat.acts ?? []).forEach((act, i) => {
      all += actCss(sel, beat, act, `${name}-act${i}`);
    });
    if (beat.poses) all += poseCss(sel, beat, `${name}-pose`);
    if (beat.hold === 'flow') {
      if (beat.steps) {
        // Sub-steps of a long sheet hang one group after another once it shows (frames dropped onto their wire).
        all += `@keyframes ${name}-hang{0%{transform:translateY(-1.4rem) rotate(-2.4deg);opacity:0}25%{opacity:1}60%{transform:translateY(.2rem) rotate(1deg)}82%{transform:rotate(-.35deg)}to{transform:none;opacity:1}}`;
        for (let i = 0; i < beat.steps; i += 1) {
          all += `${b}[data-shown=""] [data-step="${i}"]{transform-origin:50% 0;animation:${name}-hang calc(var(--dur-step) * 1.4) ${EASE} calc(${IN} * .5 + ${i} * var(--gap-step) * 2) both}`;
        }
      }
      continue;
    }

    const s = `${b} > .beat-sheet`;
    desktop += sheetIn(spec, beat, `${name}-in`) + sheetOut(beat, `${name}-out`);
    desktop += `${s}{transform-origin:${sheetOrigin(beat.origin)}}`;
    // Forward: land. Back from the next beat: the exit played backwards. Leaving: the exit.
    // Back to before: the entrance played backwards. `-r` twins restart the animation on a direction change.
    desktop += `${b}[data-state="in"][data-dir="fwd"] > .beat-sheet{animation:${name}-in ${IN} ${EASE} both}`;
    desktop += `${b}[data-state="in"][data-dir="back"] > .beat-sheet{animation:${name}-out-r ${OUT} ${EASE} reverse both}`;
    desktop += `${b}[data-state="after"][data-dir="fwd"] > .beat-sheet{animation:${name}-out ${OUT} ${EASE} both}`;
    desktop += `${b}[data-state="before"][data-dir="back"] > .beat-sheet{animation:${name}-in-r ${OUT} ${EASE} reverse both}`;

    if (beat.occluder?.length) {
      desktop += `@keyframes ${name}-occlude{0%,62%{opacity:1}to{opacity:0}}`;
      desktop += beat.occluder
        .map((l) => `${sel}:has([data-beat="${beat.id}"][data-state="in"][data-dir="fwd"]) .stage-front [data-layer="${l}"]{animation:${name}-occlude ${IN} linear both}`)
        .join('');
    }

    if (beat.steps) {
      // Sub-steps land one after another once the sheet has settled (tracing overlays on crop marks).
      desktop += `@keyframes ${name}-step{0%{transform:translateY(-.7rem) rotate(-.8deg) scale(1.01);opacity:0}65%{transform:translateY(.12rem) rotate(.15deg);opacity:1}to{transform:none;opacity:1}}`;
      for (let i = 0; i < beat.steps; i += 1) {
        desktop += `${b}[data-state="in"][data-dir="fwd"] [data-step="${i}"]{animation:${name}-step var(--dur-step) ${EASE} calc(${IN} * .6 + ${i} * var(--gap-step)) both}`;
      }
    }
  }

  (spec.groups ?? []).forEach((group, gi) => {
    desktop += groupCss(sel, spec, group, gi);
  });

  return `${THEATRE}${all}${handoffCss(sel, spec)}${DESKTOP}${desktop}}}}`;
}
