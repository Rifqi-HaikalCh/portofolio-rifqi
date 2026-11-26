import type { CSSProperties } from 'react';
import { air, circle, poly, rect, type Kit } from '../../lib/paper-kit';
import { RifqiFigurine } from '../scene/RifqiFigurine';
import type { PoseId } from '../scene/figurine-parts';
import { StaticArt, type Rect, type SceneLayer } from './PaperScene';

/*
  The shared office (DesignRules.md §2.1, §2.5): every station is one corner of
  the same room, so the wall, its seams, the skirting, the floor, the window
  and the Jakarta skyline outside are built here once and reused. Stations are
  1600 × 640 world strips (the Desk keeps its own 1600 × 1000 frame).
*/

export type P = readonly [number, number];

export const STRIP = { x: 0, y: 0, w: 1600, h: 640 } as const;
/** Top of the skirting and of the floor in a station strip. */
export const SKIRT_Y = 566;
export const FLOOR_Y = 590;

export const night: CSSProperties = { opacity: 'var(--night-opacity)' };
export const day: CSSProperties = { opacity: 'var(--beam-opacity)' };
export const lineMuted = { stroke: 'var(--ill-page-muted)', strokeWidth: 2, opacity: 0.5 } as const;

/** A straight bar between two points as a polygon (lamp arms, ladder rails). */
export function bar([x1, y1]: P, [x2, y2]: P, w: number) {
  const len = Math.hypot(x2 - x1, y2 - y1);
  const nx = (-(y2 - y1) / len) * (w / 2);
  const ny = ((x2 - x1) / len) * (w / 2);
  return poly([
    [x1 + nx, y1 + ny],
    [x2 + nx, y2 + ny],
    [x2 - nx, y2 - ny],
    [x1 - nx, y1 - ny],
  ]);
}

/** Step outline of a row of towers standing on `base`. */
export function skyline(base: number, towers: readonly (readonly [number, number, number])[]) {
  const pts: [number, number][] = [[towers[0][0], base]];
  for (const [x, w, h] of towers) pts.push([x, base - h], [x + w, base - h]);
  const last = towers[towers.length - 1];
  pts.push([last[0] + last[1], base]);
  return poly(pts);
}

export const FAR_TOWERS = [
  [40, 34, 150], [74, 22, 186], [96, 40, 128], [136, 26, 212], [162, 46, 158], [208, 30, 196],
  [238, 44, 140], [282, 24, 230], [306, 40, 170], [346, 30, 204], [376, 46, 150], [422, 38, 188],
] as const;
export const NEAR_TOWERS = [
  [40, 52, 96], [92, 36, 132], [128, 56, 84], [184, 30, 118], [300, 44, 104], [344, 58, 140], [402, 58, 92],
] as const;

/** Lit window grid for one tower (night only). */
export function windows(x: number, w: number, top: number, base: number, seed: number) {
  let d = '';
  let n = seed;
  for (let y = top + 10; y < base - 8; y += 12) {
    for (let wx = x + 6; wx < x + w - 6; wx += 10) {
      n = (n * 9301 + 49297) % 233280;
      if (n / 233280 < 0.34) d += `M${wx} ${y}h4v5h-4z`;
    }
  }
  return d;
}

/** One keyboard row: n keys between x0 and x1 at y, height h. */
export function keyRow(x0: number, x1: number, y: number, h: number, n: number) {
  const gap = 3;
  const w = (x1 - x0 - gap * (n - 1)) / n;
  let d = '';
  for (let i = 0; i < n; i += 1) d += rect(Math.round((x0 + i * (w + gap)) * 10) / 10, y, Math.round(w * 10) / 10, h, 1.5);
  return d;
}

/* ---- Window to the city -------------------------------------------------- */

type Sky = 'day' | 'dusk';

/*
  The outside is authored in a 420 × 420 block (the Desk's window) and placed
  into any window rect: three far layers (sky, two skylines) and the frame.
*/
export function windowLayers(k: Kit, id: string, win: Rect, sky: Sky = 'day'): SceneLayer[] {
  const s = win.w / 350;
  const place = `translate(${win.x - 70 * s} ${win.y - 70 * s}) scale(${s})`;
  const box = (b: Rect): Rect => ({ x: win.x + (b.x - 70) * s, y: win.y + (b.y - 70) * s, w: b.w * s, h: b.h * s });
  const skyFill = sky === 'dusk' ? 'var(--ill-dusk)' : 'var(--ill-sky)';

  return [
    {
      id: `${id}-sky`,
      band: 'far',
      z: -900,
      box: box({ x: 60, y: 60, w: 380, h: 400 }),
      art: (
        <g transform={place}>
          {k.sheet({ d: rect(60, 60, 380, 400), fill: skyFill, edge: 0, rim: false, material: 'none' })}
          {sky === 'dusk' ? (
            <g style={day}>
              {k.sheet({ d: rect(60, 300, 380, 160), fill: 'var(--ill-dusk-low)', edge: 0, rim: false, material: 'none', falloff: false })}
              {k.sheet({ d: circle(150, 330, 34), fill: 'var(--ill-sun)', gap: 20, edge: 0 })}
            </g>
          ) : (
            <g style={day}>
              {k.sheet({ d: 'M118 168q0-20 22-20q8-18 30-14q14-14 32 0q22-2 24 20q16 4 14 16H118Z', fill: 'var(--ill-cloud)', gap: 60, edge: 2 })}
            </g>
          )}
          <g style={night}>
            {k.sheet({ d: `${circle(338, 146, 26)}${circle(326, 138, 23)}`, fill: 'var(--ill-sun)', gap: 30, edge: 0, fillRule: 'evenodd' })}
            <path d="M150 128l3 7 7 3-7 3-3 7-3-7-7-3 7-3zM206 196l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="var(--ill-sun)" opacity="0.8" />
          </g>
        </g>
      ),
    },
    {
      id: `${id}-city`,
      band: 'far',
      z: -640,
      box: box({ x: 30, y: 200, w: 440, h: 270 }),
      art: (
        <g transform={place}>
          {k.sheet({ d: skyline(470, FAR_TOWERS), fill: air('var(--ill-city-far)', 'far'), gap: 70, edge: 2 })}
          {k.sheet({ d: skyline(470, NEAR_TOWERS), fill: air('var(--ill-city-near)', 'far', -14), gap: 120, edge: 3 })}
          <path
            d={[...FAR_TOWERS, ...NEAR_TOWERS].map(([x, w, h], i) => windows(x, w, 470 - h, 470, i * 41 + 7)).join('')}
            fill="var(--ill-city-lit)"
            style={night}
          />
        </g>
      ),
    },
    {
      id: `${id}-window`,
      band: 'back',
      z: -270,
      box: box({ x: 50, y: 60, w: 400, h: 400 }),
      art: (
        <g transform={place}>
          {k.sheet({
            d: `${rect(70, 70, 350, 360, 2)}${rect(92, 92, 149, 154)}${rect(249, 92, 149, 154)}${rect(92, 254, 149, 154)}${rect(249, 254, 149, 154)}`,
            fillRule: 'evenodd',
            fill: 'var(--ill-frame)',
            gap: 34,
            edge: 5,
          })}
          {k.sheet({ d: rect(56, 428, 378, 20, 2), fill: 'var(--ill-frame)', gap: 30, edge: 6 })}
        </g>
      ),
    },
  ];
}

/** The glass opening of a window rect, for the wall's evenodd hole. */
export function windowHole(win: Rect) {
  const s = win.w / 350;
  return rect(win.x + 22 * s, win.y + 22 * s, 306 * s, 316 * s);
}

/* ---- Wall and floor -------------------------------------------------------- */

/*
  The wall of a station strip: three sheets with lit seams, optional window
  hole and daylight beam, the shade under furniture, skirting, and the floor.
*/
/** World extent of wall and floor: the strip, or (`wide`) enough bleed for a fullscreen chapter stage (§9.1 stage fit). */
const extent = (wide?: boolean) => (wide ? { x: -1100, y: -700, w: 3800 } : { x: -40, y: -40, w: 1680 });

export function wallLayer(
  k: Kit,
  { hole, beam, shade, wide }: { hole?: string; beam?: string; shade?: Rect; wide?: boolean } = {},
): SceneLayer {
  const e = extent(wide);
  return {
    id: 'wall',
    band: 'back',
    z: -300,
    box: { x: e.x, y: e.y, w: e.w, h: 680 - e.y },
    art: (
      <>
        {k.sheet({
          d: `${rect(e.x, e.y, e.w, 720 - e.y)}${hole ?? ''}`,
          fillRule: 'evenodd',
          fill: 'var(--ill-wall)',
          gap: 260,
          edge: 6,
        })}
        <path d={`M533 ${e.y}V${SKIRT_Y}M1066 ${e.y}V${SKIRT_Y}`} stroke="var(--ill-wall-shade)" strokeWidth="3" />
        <path d={`M535 ${e.y}V${SKIRT_Y}M1068 ${e.y}V${SKIRT_Y}`} stroke="var(--paper-cut)" strokeWidth="1" />
        {beam && (
          <g fill="var(--ill-beam)" style={day}>
            <path d={beam} opacity="0.55" />
          </g>
        )}
        {shade && <rect x={shade.x} y={shade.y} width={shade.w} height={shade.h} fill="var(--paper-fold)" />}
        {k.sheet({ d: rect(e.x, SKIRT_Y, e.w, 24), fill: 'var(--ill-frame)', gap: 14, edge: 3 })}
      </>
    ),
  };
}

export function floorLayer(k: Kit, extra?: SceneLayer['art'], wide?: boolean): SceneLayer {
  const e = extent(wide);
  const deep = wide ? 760 : 90;
  return {
    id: 'floor',
    band: 'back',
    z: -180,
    box: { x: e.x, y: FLOOR_Y - 10, w: e.w, h: deep + 10 },
    art: (
      <>
        {k.sheet({ d: rect(e.x, FLOOR_Y, e.w, deep), fill: 'var(--color-wood-dark)', edge: 0, material: 'wood', rim: false })}
        <path d={`M${e.x} ${FLOOR_Y + 22}H${e.x + e.w}`} stroke="var(--pk-dark)" strokeWidth="2" opacity="0.25" />
        {extra}
      </>
    ),
  };
}

/* ---- The figurine at a station ------------------------------------------ */

/** Station figurine: a static poster in its pose (§2.7). `x, y` = top-left, `h` = height in world units. */
export function figureLayer(pose: PoseId, x: number, y: number, h: number, z = 0, id = 'figure'): SceneLayer {
  const w = (h * 340) / 470;
  return {
    id,
    band: 'mid',
    z,
    box: { x, y, w, h },
    className: 'station-fig',
    html: <StaticArt className="h-full w-full" node={<RifqiFigurine crop="wide" pose={pose} className="h-full w-full" />} />,
  };
}

/* ---- Scene state from the page (CSS :has, no JS) ------------------------- */

/**
  Rules that move a scene object when its HTML control changes state, e.g. a
  folder lifts while its ledger row is open. `pairs` maps a control selector
  to the transform of `[data-obj="key"]` in the same section.
*/
export function stateCss(section: string, pairs: Array<{ when: string; key: string; transform: string }>) {
  return pairs
    .map(({ when, key, transform }) => `#${section}:has(${when}) [data-obj="${key}"]{transform:${transform}}`)
    .join('');
}
