import type { Act, BeatSpec, ChapterSpec, Handoff, Origin } from './spec';

/*
  Beat CSS generator (DesignRules.md §9.7). Everything here runs on scroll
  timelines, so scroll position is the clock and every move reverses when the
  visitor scrolls back. Only viewport-bounded things animate: the stage, its
  layers, sheets and occluders. Rules are scoped to the chapter id and apply
  only in the theatre layouts (chapter.css holds the static part).

  Sheet maths: a pinned sheet rises with the page from the viewport bottom to
  its sticky top (--beat-top) during its beat's `entry` range. An origin is an
  extra transform on that natural path, written as V − N(t): the visual
  position wanted minus where scrolling alone would put it.
*/

const THEATRE = '@supports (animation-timeline: view()) { @media (prefers-reduced-motion: no-preference) and (min-height: 561px) {';
const DESKTOP = '@media (min-width: 768px) {';
const ENTRY = 'entry 0% entry calc(100svh - var(--beat-top))';

const n = (v: number) => Math.round(v * 100) / 100;

/*
  Sub-steps share a pinned beat's working window, measured on its entry range:
  from 60 % of the sheet's arrival to the end of its hold. Steps start while the
  sheet is still landing, so it never travels as an empty tray.
*/
function stepRange(beat: BeatSpec, i: number, count: number, share: number) {
  const hold = typeof beat.hold === 'number' ? beat.hold : 0;
  const start = '0.6 * (100svh - var(--beat-top))';
  const span = `(100svh + ${hold}svh - ${start})`;
  const at = (k: number) => `entry calc(${start} + ${n(k)} * ${span})`;
  return `${at(i / count)} ${at((i + share) / count)}`;
}

/** Natural top of a pinned sheet at progress t of its entry. */
const natural = (t: number) => `(100svh - ${t} * (100svh - var(--beat-top)))`;

function sheetIn(spec: ChapterSpec, beat: BeatSpec, name: string) {
  const o: Origin = beat.origin;
  const counter = 'calc(var(--beat-top) - 100svh)';
  if (o === 'drop') return `@keyframes ${name}{from{transform:translateY(calc(-100svh - 100%))}to{transform:none}}`;
  if (o === 'rise') return `@keyframes ${name}{from{transform:translateY(8svh);opacity:0}to{transform:none;opacity:1}}`;
  if (o === 'slide-left' || o === 'slide-right') {
    const x = o === 'slide-left' ? '-70cqw' : '70cqw';
    return `@keyframes ${name}{from{transform:translate(${x},${counter})}to{transform:none}}`;
  }
  if (o === 'unfold') {
    return `@keyframes ${name}{from{transform:translateY(${counter}) perspective(1600px) rotateX(-84deg);opacity:.3}35%{opacity:1}to{transform:translateY(0) perspective(1600px) rotateX(0deg)}}`;
  }
  // Emerge: from an object in the stage (world coordinates → viewport through the cover fit).
  const t = spec.theatre;
  const cs = `max(calc(100cqw / ${t.w}), calc(100svh / ${t.h}))`;
  const vx = (x: number) => `((100cqw - ${t.w} * ${cs}) / 2 + ${n(x - t.x)} * ${cs})`;
  const vy = (y: number) => `((100svh - ${t.h} * ${cs}) / 2 + ${n(y - t.y)} * ${cs})`;
  const centre =
    spec.lane === 'right' ? '(100cqw - var(--lane-pad) - var(--lane-w) / 2)' : '(var(--lane-pad) + var(--lane-w) / 2)';
  const at = ([x, y]: readonly [number, number], tt: number, scale: number) =>
    `translate(calc(${vx(x)} - ${centre}),calc(${vy(y)} - ${natural(tt)})) scale(${scale})`;
  const { from, via } = o.emerge;
  return `@keyframes ${name}{from{transform:${at(from, 0, 0.32)}}40%{transform:${at(via, 0.4, 0.55)}}to{transform:translate(0,0) scale(1)}}`;
}

function sheetOut(beat: BeatSpec, name: string) {
  const o = beat.origin;
  if (o === 'slide-left' || o === 'slide-right') {
    return `@keyframes ${name}{to{transform:translateX(${o === 'slide-left' ? '-70cqw' : '70cqw'});opacity:0}}`;
  }
  return `@keyframes ${name}{to{transform:translateY(calc(-1 * (var(--beat-top) + 100%)));opacity:0}}`;
}

function actCss(sel: string, tl: string, act: Act, name: string) {
  const target = 'layer' in act.target ? `${sel} [data-layer="${act.target.layer}"] > *` : `${sel} [data-obj="${act.target.obj}"]`;
  const prop = act.property ?? 'transform';
  const rest = prop === 'translate' ? '0 0' : 'none';
  if (act.mode === 'in') {
    return (
      `@keyframes ${name}{from{${prop}:${act.moved}}to{${prop}:${rest}}}` +
      `${target}{animation:${name} linear both;animation-timeline:${tl};animation-range:entry 0% entry 60%}`
    );
  }
  return (
    `@keyframes ${name}-go{from{${prop}:${rest}}to{${prop}:${act.moved}}}` +
    `@keyframes ${name}-back{from{${prop}:${act.moved}}to{${prop}:${rest}}}` +
    `${target}{animation:${name}-go linear both,${name}-back linear forwards;animation-timeline:${tl},${tl};animation-range:entry 0% entry 50%,exit 0% exit 25%}`
  );
}

/** Stop-motion pose swap: `alt` shows for the first 60 % of each step window, `base` the rest (§10.2). */
function poseCss(sel: string, tl: string, beat: BeatSpec, name: string) {
  const p = beat.poses!;
  const on: string[] = [];
  for (let j = 0; j < p.swaps; j += 1) {
    const a = (j / p.swaps) * 100;
    on.push(`${n(a + 1)}%{opacity:1}`, `${n(a + (0.6 / p.swaps) * 100)}%{opacity:0}`);
  }
  const off = on.map((k) => k.replace('opacity:1', 'opacity:X').replace('opacity:0', 'opacity:1').replace('opacity:X', 'opacity:0'));
  const anim = (n2: string) => `animation:${n2} step-end both;animation-timeline:${tl};animation-range:${stepRange(beat, 0, 1, 1)}`;
  return (
    `@keyframes ${name}-alt{0%{opacity:0}${on.join('')}100%{opacity:0}}` +
    `@keyframes ${name}-base{0%{opacity:1}${off.join('')}100%{opacity:1}}` +
    `${sel} .stage [data-layer="${p.alt}"] > *{${anim(`${name}-alt`)}}` +
    `${sel} .stage [data-layer="${p.base}"] > *{${anim(`${name}-base`)}}`
  );
}

function handoffCss(sel: string, spec: ChapterSpec) {
  const tl = `--ch-${spec.id}`;
  const layerAnims: string[] = [];
  const stageAnims: string[] = [];
  let keys = '';
  const tilt = (dir: 1 | -1, phase: 'in' | 'out') => {
    const name = `ch-${spec.id}-tilt-${phase}`;
    const shifted = `translateY(calc(var(--k) * ${dir * 40}svh))`;
    keys += phase === 'in' ? `@keyframes ${name}{from{transform:${shifted}}to{transform:none}}` : `@keyframes ${name}{from{transform:none}to{transform:${shifted}}}`;
    layerAnims.push(`${name} linear ${phase === 'in' ? 'both' : 'forwards'}|${phase === 'in' ? 'entry 0% entry 100%' : 'exit 0% exit 100%'}`);
  };
  const pan = (phase: 'in' | 'out') => {
    const name = `ch-${spec.id}-pan-${phase}`;
    keys +=
      phase === 'in'
        ? `@keyframes ${name}{from{transform:translate(100%,-100svh)}to{transform:none}}`
        : `@keyframes ${name}{from{transform:none}to{transform:translate(-100%,100svh)}}`;
    stageAnims.push(`${name} linear ${phase === 'in' ? 'both' : 'forwards'}|${phase === 'in' ? 'entry 0% entry 100%' : 'exit 0% exit 100%'}`);
  };
  const apply = (h: Handoff, phase: 'in' | 'out') => {
    if (h === 'none') return;
    if (h === 'tilt-down') tilt(phase === 'in' ? 1 : -1, phase);
    else if (h === 'pan-right') pan(phase);
    else throw new Error(`Handoff "${h}" lands in W2 (DesignRules.md §16.3)`);
  };
  apply(spec.handoffIn, 'in');
  apply(spec.handoffOut, 'out');
  const rule = (target: string, list: string[]) =>
    list.length
      ? `${target}{animation:${list.map((a) => a.split('|')[0]).join(',')};animation-timeline:${list.map(() => tl).join(',')};animation-range:${list.map((a) => a.split('|')[1]).join(',')}}`
      : '';
  // Pans counter-translate the natural scroll of a 100svh stage: desktop only until W2 tunes the split stage.
  return keys + rule(`${sel} .stage .scene-layer`, layerAnims) + (stageAnims.length ? `${DESKTOP}${rule(`${sel} .stage`, stageAnims)}}` : '');
}

export function chapterCss(spec: ChapterSpec) {
  const sel = `#${spec.id}:not([data-stacked])`;
  const beatTl = (b: BeatSpec) => `--b-${spec.id}-${b.id}`;
  let all = `${sel}{view-timeline:--ch-${spec.id};timeline-scope:${spec.beats.map(beatTl).join(',')}}`;
  let desktop = '';

  for (const beat of spec.beats) {
    const tl = beatTl(beat);
    const b = `${sel} [data-beat="${beat.id}"]`;
    const name = `b-${spec.id}-${beat.id}`;
    all += `${b}{view-timeline:${tl};${beat.hold === 'flow' ? '' : `--hold:${beat.hold}`}}`;

    // Acts and occluders play at every width; sheets move only in the desktop theatre.
    (beat.acts ?? []).forEach((act, i) => {
      all += actCss(sel, tl, act, `${name}-act${i}`);
    });

    if (beat.hold === 'flow') {
      desktop += `@keyframes ${name}-in{from{transform:translateY(8svh);opacity:0}to{transform:none;opacity:1}}`;
      desktop += `${b} > .beat-sheet{animation:${name}-in linear both;animation-timeline:${tl};animation-range:entry 0% entry 40%}`;
      continue;
    }

    desktop += sheetIn(spec, beat, `${name}-in`) + sheetOut(beat, `${name}-out`);
    // No backwards fill: before its entry a sheet waits at its natural place below the fold. A filled
    // `from` (counter-translated by up to a viewport) would show it early over the previous beat.
    desktop += `${b} > .beat-sheet{animation:${name}-in linear forwards,${name}-out linear forwards;animation-timeline:${tl},${tl};animation-range:${ENTRY},exit 0% exit 25%}`;
    if (typeof beat.origin === 'object') desktop += `${b} > .beat-sheet{transform-origin:50% 0}`;
    if (beat.origin === 'unfold') desktop += `${b} > .beat-sheet{transform-origin:50% 0}`;

    if (beat.occluder) {
      desktop += `@keyframes ${name}-occlude{from,to{opacity:1}}`;
      desktop += beat.occluder
        .map((l) => `${sel} .stage-front [data-layer="${l}"]{animation:${name}-occlude linear none;animation-timeline:${tl};animation-range:${ENTRY}}`)
        .join('');
    }

    if (beat.steps) {
      const fromX = spec.lane === 'left' ? '40cqw' : '-40cqw';
      desktop += `@keyframes ${name}-step{from{transform:translateX(${fromX}) rotate(2deg);opacity:0}to{transform:none;opacity:1}}`;
      for (let i = 0; i < beat.steps; i += 1) {
        desktop += `${b} [data-step="${i}"]{animation:${name}-step linear both;animation-timeline:${tl};animation-range:${stepRange(beat, i, beat.steps, 0.6)}}`;
      }
    }

    if (beat.poses) desktop += poseCss(sel, tl, beat, `${name}-pose`);
  }

  return `${THEATRE}${all}${handoffCss(sel, spec)}${DESKTOP}${desktop}}}}`;
}
