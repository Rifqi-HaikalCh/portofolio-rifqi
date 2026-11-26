import type { ReactNode } from 'react';
import { type Kit } from '../../../lib/paper-kit';
import { on, quad as boardQuad } from './board';

/*
  The pile of service blueprints on the drafting board (DesignRules.md §4.5 `04`,
  v3.7). One sheet per service, in the order of the `svc-*` beats, each with its
  own drawing in board space (so it lies in the board's perspective). Every line
  is an `.ink` path with pathLength 1, so the scene CSS can draw it in; the
  swatches of the identity sheet are `.ink-fill` and are painted after the lines.
  The pile itself (depth, tuck, draw-in) is driven by the chapter cue in
  `DraftingStation` (station CSS) and `scene.css`.
*/

export const PLAN_BOX = { x: 540, y: 160, w: 640, h: 300 } as const;

/*
  v3.7 (owner: "the text straight on the board"): the service's text is written on the
  left of the sheet, so each drawing is drawn at 42 % on the right. Drawings are
  authored in full-sheet board space and mapped here.
*/
const DRAW = { u: 0.735, v: 0.5, k: 0.42 } as const;
const P = (u: number, v: number) => on(DRAW.u + (u - 0.5) * DRAW.k, DRAW.v + (v - 0.45) * DRAW.k).join(' ');
/** A polyline in the sheet's own (unmapped) board space: its grid and title block. */
const R = (...pts: Array<[number, number]>) => `M${pts.map(([u, v]) => on(u, v).join(' ')).join('L')}`;
/** A rectangle in drawing space. */
const quad = (u0: number, v0: number, u1: number, v1: number) => `M${P(u0, v0)}L${P(u1, v0)}L${P(u1, v1)}L${P(u0, v1)}Z`;
/** A polyline through board points. */
const L = (...pts: Array<[number, number]>) => `M${pts.map(([u, v]) => P(u, v)).join('L')}`;
/** A closed ellipse (or an arc from `a0` to `a1`) in board space, so it keeps the perspective. */
function E(u: number, v: number, ru: number, rv: number, a0 = 0, a1 = Math.PI * 2) {
  const n = 28;
  const pts: string[] = [];
  for (let i = 0; i <= n; i += 1) {
    const a = a0 + ((a1 - a0) * i) / n;
    pts.push(P(u + Math.cos(a) * ru, v + Math.sin(a) * rv));
  }
  return `M${pts.join('L')}${a1 - a0 >= Math.PI * 2 ? 'Z' : ''}`;
}
/** A quadratic curve between board points, for flow arrows. */
const C = (a: [number, number], c: [number, number], b: [number, number]) => `M${P(...a)}Q${P(...c)} ${P(...b)}`;
/** An arrow head at `b`, pointing away from `a`. */
function head(a: [number, number], b: [number, number]) {
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
  const [du, dv] = [(b[0] - a[0]) / len, (b[1] - a[1]) / len];
  const s = 0.035;
  return L([b[0] - du * s - dv * s * 0.6, b[1] - dv * s + du * s * 0.6], b, [b[0] - du * s + dv * s * 0.6, b[1] - dv * s - du * s * 0.6]);
}

const Ink = ({ d, dashed = false, w = 2 }: { d: string; dashed?: boolean; w?: number }) => (
  <path className={dashed ? 'ink ink-dash' : 'ink'} d={d} pathLength={1} strokeWidth={w} />
);

/* The drawings, in service order: .NET app, SQL Server, dashboards, app and web design, prototypes, identity. */
const DRAWINGS: Array<() => ReactNode> = [
  // .NET application: an app window with code brackets, and the gears behind it.
  () => (
    <>
      <Ink d={quad(0.2, 0.17, 0.62, 0.7)} w={2.4} />
      <Ink d={`${L([0.2, 0.25], [0.62, 0.25])}${L([0.29, 0.25], [0.29, 0.7])}`} />
      <Ink d={`${E(0.225, 0.21, 0.008, 0.016)}${E(0.25, 0.21, 0.008, 0.016)}${E(0.275, 0.21, 0.008, 0.016)}`} w={1.5} />
      <Ink d={`${L([0.4, 0.38], [0.35, 0.47], [0.4, 0.56])}${L([0.48, 0.35], [0.44, 0.59])}${L([0.52, 0.38], [0.57, 0.47], [0.52, 0.56])}`} w={3} />
      <Ink d={`${E(0.75, 0.35, 0.075, 0.11)}${E(0.75, 0.35, 0.028, 0.042)}`} />
      <Ink
        d={Array.from({ length: 8 }, (_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return L([0.75 + Math.cos(a) * 0.075, 0.35 + Math.sin(a) * 0.11], [0.75 + Math.cos(a) * 0.1, 0.35 + Math.sin(a) * 0.145]);
        }).join('')}
        w={4}
      />
      <Ink d={`${E(0.71, 0.6, 0.045, 0.07)}${E(0.71, 0.6, 0.015, 0.024)}`} />
    </>
  ),
  // SQL Server: three database cylinders and the keys between them.
  () => (
    <>
      {[0.28, 0.5, 0.72].map((u) => (
        <Ink
          key={u}
          d={`${E(u, 0.24, 0.075, 0.045)}${L([u - 0.075, 0.24], [u - 0.075, 0.62])}${L([u + 0.075, 0.24], [u + 0.075, 0.62])}${E(u, 0.62, 0.075, 0.045, 0, Math.PI)}${E(u, 0.37, 0.075, 0.045, 0, Math.PI)}${E(u, 0.5, 0.075, 0.045, 0, Math.PI)}`}
          w={2.2}
        />
      ))}
      <Ink d={`${L([0.355, 0.44], [0.425, 0.44])}${L([0.575, 0.56], [0.645, 0.56])}`} dashed />
      <Ink d={`${L([0.2, 0.76], [0.8, 0.76])}${L([0.2, 0.74], [0.2, 0.78])}${L([0.8, 0.74], [0.8, 0.78])}`} w={1.5} />
    </>
  ),
  // Operational dashboards: a screen of bars, a trend line, a donut and two KPI lines.
  () => (
    <>
      <Ink d={quad(0.18, 0.16, 0.82, 0.74)} w={2.4} />
      <Ink d={L([0.24, 0.24], [0.24, 0.64], [0.58, 0.64])} />
      <Ink d={[0, 1, 2, 3, 4].map((i) => quad(0.27 + i * 0.06, 0.64 - [0.14, 0.24, 0.18, 0.3, 0.36][i], 0.31 + i * 0.06, 0.64)).join('')} />
      <Ink d={L([0.27, 0.46], [0.35, 0.38], [0.41, 0.42], [0.47, 0.3], [0.55, 0.25])} w={2.8} />
      <Ink d={`${E(0.71, 0.36, 0.07, 0.105)}${E(0.71, 0.36, 0.035, 0.052)}${L([0.71, 0.255], [0.71, 0.308])}${L([0.74, 0.39], [0.77, 0.43])}`} />
      <Ink d={`${L([0.63, 0.58], [0.78, 0.58])}${L([0.63, 0.64], [0.74, 0.64])}`} w={3} />
    </>
  ),
  // App and website design: a desktop wireframe beside a phone.
  () => (
    <>
      <Ink d={`${quad(0.17, 0.15, 0.6, 0.64)}${L([0.17, 0.22], [0.6, 0.22])}${L([0.38, 0.64], [0.38, 0.71])}${L([0.31, 0.71], [0.45, 0.71])}`} w={2.4} />
      <Ink d={`${quad(0.21, 0.27, 0.56, 0.4)}${quad(0.21, 0.45, 0.32, 0.59)}${quad(0.335, 0.45, 0.445, 0.59)}${quad(0.46, 0.45, 0.56, 0.59)}`} />
      <Ink d={`${quad(0.65, 0.2, 0.8, 0.76)}${L([0.7, 0.24], [0.75, 0.24])}`} w={2.4} />
      <Ink d={`${quad(0.67, 0.29, 0.78, 0.42)}${L([0.67, 0.48], [0.78, 0.48])}${L([0.67, 0.53], [0.75, 0.53])}${quad(0.67, 0.63, 0.78, 0.69)}`} />
    </>
  ),
  // High-fidelity prototypes: three screens linked by flow arrows.
  () => (
    <>
      <Ink d={`${quad(0.17, 0.22, 0.31, 0.6)}${quad(0.43, 0.32, 0.57, 0.7)}${quad(0.69, 0.16, 0.83, 0.54)}`} w={2.4} />
      <Ink
        d={`${quad(0.19, 0.3, 0.29, 0.4)}${L([0.19, 0.46], [0.29, 0.46])}${quad(0.45, 0.4, 0.55, 0.5)}${L([0.45, 0.56], [0.53, 0.56])}${quad(0.71, 0.24, 0.81, 0.34)}${L([0.71, 0.4], [0.79, 0.4])}`}
      />
      <Ink d={`${E(0.24, 0.53, 0.02, 0.03)}${E(0.5, 0.63, 0.02, 0.03)}`} w={1.6} />
      <Ink d={`${C([0.26, 0.53], [0.33, 0.7], [0.43, 0.6])}${head([0.38, 0.66], [0.43, 0.6])}`} w={2.2} />
      <Ink d={`${C([0.52, 0.63], [0.63, 0.66], [0.69, 0.46])}${head([0.66, 0.56], [0.69, 0.46])}`} w={2.2} />
      <Ink d={C([0.76, 0.16], [0.5, 0.04], [0.26, 0.22])} dashed />
    </>
  ),
  // Branding and identity: a monogram on its construction circle, type lines and swatches.
  () => (
    <>
      <Ink d={E(0.32, 0.4, 0.15, 0.22)} dashed />
      <Ink d={E(0.32, 0.4, 0.1, 0.15)} w={2.6} />
      <Ink d={`${L([0.28, 0.5], [0.28, 0.3], [0.34, 0.3], [0.365, 0.345], [0.34, 0.39], [0.28, 0.39])}${L([0.32, 0.39], [0.37, 0.5])}`} w={3.4} />
      <Ink d={`${L([0.2, 0.7], [0.44, 0.7])}${L([0.23, 0.75], [0.41, 0.75])}`} w={3} />
      {['var(--color-accent)', 'var(--color-sage)', 'var(--ill-sun)', 'var(--ill-page)'].map((fill, i) => (
        <g key={fill}>
          <path className="ink-fill" d={quad(0.54 + i * 0.07, 0.22, 0.6 + i * 0.07, 0.36)} fill={fill} style={{ transitionDelay: `${1.3 + i * 0.12}s` }} />
          <Ink d={quad(0.54 + i * 0.07, 0.22, 0.6 + i * 0.07, 0.36)} />
        </g>
      ))}
      <Ink d={`${L([0.54, 0.46], [0.81, 0.46])}${L([0.54, 0.52], [0.74, 0.52])}${L([0.54, 0.58], [0.78, 0.58])}`} w={2.4} />
    </>
  ),
];

export const PLAN_COUNT = DRAWINGS.length;

/** The pile: one absolutely placed sheet per service; each is its own SVG so the pile can be re-stacked. */
export function planSheets(k: Kit) {
  const { x, y, w, h } = PLAN_BOX;
  return (
    <div className="plan-pile">
      {DRAWINGS.map((draw, i) => (
        <div key={i} className="plan" data-plan={i} aria-hidden="true">
          <svg viewBox={`${x} ${y} ${w} ${h}`} aria-hidden="true" focusable="false">
            {k.sheet({
              d: boardQuad(0.12, 0.09, 0.88, 0.88),
              fill: 'var(--color-blueprint)',
              gap: 18,
              edge: 2,
            })}
            <path
              d={
                [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8].map((u) => R([u, 0.11], [u, 0.86])).join('') +
                [0.2, 0.32, 0.44, 0.56, 0.68, 0.8].map((v) => R([0.14, v], [0.86, v])).join('')
              }
              stroke="var(--ill-blueprint-ink)"
              strokeWidth="1"
              opacity="0.16"
              fill="none"
            />
            {/* Title block with the sheet's number as tally marks. */}
            <path d={boardQuad(0.7, 0.79, 0.86, 0.86)} fill="none" stroke="var(--ill-blueprint-ink)" strokeWidth="1.2" opacity="0.65" />
            <path
              d={Array.from({ length: i + 1 }, (_, t) => R([0.72 + t * 0.016, 0.81], [0.72 + t * 0.016, 0.84])).join('')}
              stroke="var(--ill-blueprint-ink)"
              strokeWidth="1.6"
              opacity="0.8"
            />
            <g>{draw()}</g>
          </svg>
        </div>
      ))}
    </div>
  );
}

/*
  Station CSS for the pile, keyed on the chapter cue (§4.4): the active sheet is
  on top, the ones after it under it in order, the ones already read at the
  bottom (`--d` = depth). Leaving a sheet forward tucks it: lifted off to the
  left, then slid under the pile; scrolling back draws it out again. A sheet's
  drawing is inked the first time its beat is reached.
*/
export function planCss(chapter: string, beat: (i: number) => string) {
  const N = PLAN_COUNT;
  let css = '';
  for (let a = 0; a < N; a += 1) {
    for (let j = 0; j < N; j += 1) {
      css += `#${chapter}[data-beat="${beat(a)}"] [data-plan="${j}"]{--d:${(j - a + N) % N}}`;
    }
    css += `#${chapter}[data-reached~="${beat(a)}"] [data-plan="${a}"]{--ink:0}`;
  }
  let motion = '';
  for (let a = 1; a < N; a += 1) {
    motion += `#${chapter}:has([data-beat="${beat(a)}"][data-state="in"][data-dir="fwd"]) [data-plan="${a - 1}"]{animation:plan-tuck 1.15s var(--ease-leaf)}`;
    motion += `#${chapter}:has([data-beat="${beat(a - 1)}"][data-state="in"][data-dir="back"]) [data-plan="${a - 1}"]{animation:plan-untuck 1.15s var(--ease-leaf)}`;
  }
  return `${css}@media (prefers-reduced-motion: no-preference){${motion}}`;
}
