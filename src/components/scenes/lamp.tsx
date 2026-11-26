import type { CSSProperties } from 'react';
import { circle, ellipse, poly, rect, type Kit } from '../../lib/paper-kit';
import type { Act } from './chapter/spec';
import type { Rect, SceneLayer } from './PaperScene';
import { bar } from './office';

/*
  Station-tailored multi-layered 2D/3D papercraft lamps & realistic volumetric lighting
  (DesignRules.md §1.11, §2.3 v3.26).

  Realistic Perspective Lighting & Surface Termination:
  - Instead of ending along a tilted perpendicular line (`farL → farR`) or floating a pool in mid-air,
    each lamp beam terminates on the actual receiving surface plane (`plane: 'floor' | 'wall'`, plus
    `surfaceY`):
    * `'floor'` (horizontal surface — desk top, drawer mouth, shelf, floor under the ladder): the
      left and right rays from the hood aperture (`frontL`, `frontR`) are intersected with the
      horizontal surface plane, so the light cone lands flat on the surface and casts a perspective-
      foreshortened elliptical pool (`rx = hitSpan`, `ry = hitSpan * 0.16`) right where the beam
      meets the plane.
    * `'wall'` (vertical surface — pinboard, drafting board): the rays terminate smoothly into a
      soft radial wall/board wash (`radialGradient`) with no misplaced horizontal rings.
  - Soft Gaussian blur (`url(#pk-blur-3)` and `url(#pk-blur-2)` from `PaperDefs`), radial bulb
    bloom at the hood mouth, and soft lateral feathering eliminate hard geometric triangle cutouts
    while keeping the warm papercraft shadow-box atmosphere.
  - Ambient Dust Motes & Fireflies:
    * 14 deterministic dust specks (`lamp-mote`) drift slowly inside the illuminated cone.
    * 5 warm fireflies (`lamp-firefly`) with soft glowing halos orbit gently around the lamp and
      upper beam.
*/

export type P = readonly [number, number];

export type LampKind =
  | 'architect'
  | 'barn-door'
  | 'clamp'
  | 'drafting'
  | 'track-can'
  | 'picture-hood'
  | 'banker';

export type LampSpec = {
  kind: LampKind;
  base: P;
  elbow: P;
  head: P;
  aim: P;
  spread: number;
  /** Receiving surface orientation: `'floor'` for horizontal surfaces (desk, floor, drawer, shelf), `'wall'` for vertical/angled boards. */
  plane?: 'floor' | 'wall';
  /** Exact world Y of the receiving horizontal plane (defaults to `aim[1]`). */
  surfaceY?: number;
  id?: string;
  z?: number;
  desktopOnly?: boolean;
};

const unit = ([x, y]: P): P => {
  const l = Math.hypot(x, y) || 1;
  return [x / l, y / l];
};

const add = (a: P, b: P, k = 1): P => [
  Math.round((a[0] + b[0] * k) * 10) / 10,
  Math.round((a[1] + b[1] * k) * 10) / 10,
];

const lerp = (a: number, b: number, t: number) => Math.round((a + (b - a) * t) * 10) / 10;
const lerpP = (a: P, b: P, t: number): P => [lerp(a[0], b[0], t), lerp(a[1], b[1], t)];

const boxOf = (pts: P[], pad: number): Rect => {
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  const x = Math.min(...xs) - pad;
  const y = Math.min(...ys) - pad;
  return {
    x: Math.round(x),
    y: Math.round(y),
    w: Math.round(Math.max(...xs) + pad - x),
    h: Math.round(Math.max(...ys) + pad - y),
  };
};

const pct = (v: number) => `${Math.round(v * 1000) / 10}%`;

/** Seeded deterministic PRNG (0..1) so server and client SVG match without hydration drift. */
function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return (s & 0xfffffff) / 0xfffffff;
  };
}

/** Zig-zag paper tension spring between two arm points. */
function springPath(a: P, b: P, coils = 6, amp = 5) {
  const dir = unit([b[0] - a[0], b[1] - a[1]]);
  const norm: P = [-dir[1], dir[0]];
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const pts: string[] = [`M${a[0]} ${a[1]}`];
  for (let i = 1; i < coils; i += 1) {
    const t = i / coils;
    const p = add(add(a, dir, len * t), norm, (i % 2 === 0 ? 1 : -1) * amp);
    pts.push(`L${p[0]} ${p[1]}`);
  }
  pts.push(`L${b[0]} ${b[1]}`);
  return pts.join('');
}

/** Project a ray `p0 -> p1` onto a horizontal line `y = targetY`. */
function projectToY(p0: P, p1: P, targetY: number): P {
  const dy = p1[1] - p0[1];
  if (Math.abs(dy) < 1) return [p1[0], targetY];
  const t = Math.max(0.2, (targetY - p0[1]) / dy);
  return [Math.round((p0[0] + (p1[0] - p0[0]) * t) * 10) / 10, targetY];
}

/** Compute the exact open aperture geometry, perspective beam termination, bounding boxes, and pivot origins. */
export function lampGeometry(o: LampSpec) {
  const { kind, base, elbow, head, aim, spread } = o;
  const plane = o.plane ?? (kind === 'barn-door' || kind === 'drafting' ? 'wall' : 'floor');
  const surfaceY = o.surfaceY ?? aim[1];
  const d = unit([aim[0] - head[0], aim[1] - head[1]]);
  const n: P = [-d[1], d[0]];

  // Head dimensions vary by fixture archetype so each silhouette is distinct.
  const cfg = {
    architect: { back: -14, backW: 11, len: 52, frontW: 34, flap: 10 },
    'barn-door': { back: -12, backW: 10, len: 42, frontW: 24, flap: 18 },
    clamp: { back: -14, backW: 9, len: 44, frontW: 27, flap: 12 },
    drafting: { back: -10, backW: 12, len: 46, frontW: 38, flap: 14 },
    'track-can': { back: -18, backW: 14, len: 46, frontW: 21, flap: 14 },
    'picture-hood': { back: -10, backW: 14, len: 36, frontW: 42, flap: 10 },
    banker: { back: -12, backW: 16, len: 42, frontW: 38, flap: 8 },
  }[kind];

  const backC = add(head, d, cfg.back);
  const backL = add(backC, n, cfg.backW);
  const backR = add(backC, n, -cfg.backW);
  const faceMid = add(head, d, cfg.len);
  const frontL = add(faceMid, n, cfg.frontW);
  const frontR = add(faceMid, n, -cfg.frontW);
  const flapL = add(add(frontL, d, cfg.flap), n, cfg.flap * 0.55);
  const flapR = add(add(frontR, d, cfg.flap), n, -cfg.flap * 0.55);

  const dist = Math.hypot(aim[0] - head[0], aim[1] - head[1]);
  const rawFar = add(head, d, dist);
  const rawFarL = add(rawFar, n, spread);
  const rawFarR = add(rawFar, n, -spread);

  // Perspective surface termination: floor/desk beams flatten onto `y = surfaceY`; wall/board beams fan over the surface.
  const farL: P = plane === 'floor' ? projectToY(frontL, rawFarL, surfaceY) : add(rawFarL, d, dist * 0.08);
  const farR: P = plane === 'floor' ? projectToY(frontR, rawFarR, surfaceY) : add(rawFarR, d, dist * 0.08);
  const poolAt: P = plane === 'floor' ? [Math.round((farL[0] + farR[0]) / 2), surfaceY] : aim;
  const hitRx = plane === 'floor' ? Math.max(spread * 0.85, Math.round(Math.abs(farR[0] - farL[0]) * 0.54)) : spread * 0.92;
  const hitRy = plane === 'floor' ? Math.max(18, Math.round(hitRx * 0.14)) : Math.round(spread * 0.52);

  const midL = lerpP(farL, farR, 0.16);
  const midR = lerpP(farL, farR, 0.84);
  const coreL = lerpP(farL, farR, 0.3);
  const coreR = lerpP(farL, farR, 0.7);

  const lampBox = boxOf([base, elbow, head, backL, backR, frontL, frontR, flapL, flapR], 54);
  const lightBox = boxOf(
    [
      frontL,
      frontR,
      farL,
      farR,
      poolAt,
      [poolAt[0] - hitRx * 1.15, poolAt[1] - hitRy * 1.2],
      [poolAt[0] + hitRx * 1.15, poolAt[1] + hitRy * 1.2],
    ],
    44,
  );

  // Pivot for synchronized rotation of head and beam (elbow for wall/clamp lamps, head for desk lamps).
  const pivot = kind === 'architect' || kind === 'banker' ? head : elbow;
  const lampOrigin = `${pct((pivot[0] - lampBox.x) / lampBox.w)} ${pct((pivot[1] - lampBox.y) / lampBox.h)}`;
  const lightOrigin = `${pct((pivot[0] - lightBox.x) / lightBox.w)} ${pct((pivot[1] - lightBox.y) / lightBox.h)}`;

  // Interactive hit rect around the lamp fixture for DeskLamp button placement.
  const hitRect: Rect = boxOf([base, elbow, head, frontL, frontR], 24);

  return {
    plane,
    surfaceY,
    d,
    n,
    cfg,
    backC,
    backL,
    backR,
    faceMid,
    frontL,
    frontR,
    flapL,
    flapR,
    farL,
    farR,
    midL,
    midR,
    coreL,
    coreR,
    poolAt,
    hitRx,
    hitRy,
    lampBox,
    lightBox,
    lampOrigin,
    lightOrigin,
    hitRect,
  };
}

/**
 * Synchronized beat acts for a station's lamp and its volumetric beam: both rotate about the exact
 * same world pivot (`lampOrigin` / `lightOrigin`), so the light cone never detaches from the hood.
 */
export function lampActs(o: LampSpec, deg: number, mode: Act['mode'] = 'in'): Act[] {
  const id = o.id ?? 'lamp';
  const { lampOrigin, lightOrigin } = lampGeometry(o);
  const moved = `rotate(${deg}deg)`;
  return [
    { target: { layer: id }, moved, mode, origin: lampOrigin },
    { target: { layer: `${id}-light` }, moved, mode, origin: lightOrigin },
  ];
}

export function lampLayers(k: Kit, o: LampSpec): SceneLayer[] {
  const { kind, base, elbow, head } = o;
  const id = o.id ?? 'lamp';
  const g = lampGeometry(o);
  const {
    plane,
    d,
    n,
    backC,
    backL,
    backR,
    faceMid,
    frontL,
    frontR,
    flapL,
    flapR,
    farL,
    farR,
    midL,
    midR,
    coreL,
    coreR,
    poolAt,
    hitRx,
    hitRy,
    lampBox,
    lightBox,
  } = g;

  // Shared helper vectors for twin parallel arm struts.
  const arm1 = unit([elbow[0] - base[0], elbow[1] - base[1]]);
  const norm1: P = [-arm1[1], arm1[0]];
  const arm2 = unit([head[0] - elbow[0], head[1] - elbow[1]]);
  const norm2: P = [-arm2[1], arm2[0]];

  // Recessed reflector inner lip points.
  const rimInL = add(add(frontL, d, -5), n, -4);
  const rimInR = add(add(frontR, d, -5), n, 4);
  const deepInL = add(add(backL, d, 10), n, -3);
  const deepInR = add(add(backR, d, 10), n, 3);
  const bulbL = add(faceMid, n, g.cfg.frontW * 0.56);
  const bulbR = add(faceMid, n, -g.cfg.frontW * 0.56);
  const bulbTip = add(faceMid, d, 7);

  /* ---- 1. Mount & Arm Art (Depth planes 1–3) ---- */
  const renderMountAndArm = () => {
    switch (kind) {
      case 'architect': {
        const cw = add(elbow, arm2, -26);
        return (
          <>
            {k.stack({
              d: poly([
                [base[0] - 74, base[1] + 18],
                [base[0] + 74, base[1] + 18],
                [base[0] + 62, base[1] - 6],
                [base[0] - 62, base[1] - 6],
              ]),
              fill: 'var(--ill-lamp)',
              layers: 2,
              step: 5,
              gap: 16,
              edge: 4,
            })}
            {k.sheet({ d: rect(base[0] - 24, base[1] - 20, 48, 16, 2), fill: 'var(--ill-cabinet-shade)', gap: 24, edge: 3 })}
            <rect x={base[0] + 22} y={base[1] + 1} width="16" height="7" rx="1" fill="var(--color-accent)" />
            {k.sheet({ d: bar(add(base, norm1, 7), add(elbow, norm1, 6), 8), fill: 'var(--ill-lamp)', gap: 48, edge: 2.5 })}
            {k.sheet({ d: bar(add(base, norm1, -7), add(elbow, norm1, -6), 7), fill: 'var(--ill-cabinet-shade)', gap: 42, edge: 2 })}
            <path d={springPath(add(base, arm1, 28), add(elbow, arm1, -24), 7, 5)} fill="none" stroke="var(--color-accent)" strokeWidth="2.2" />
            {k.sheet({ d: bar(elbow, cw, 14), fill: 'var(--ill-bezel)', gap: 44, edge: 3 })}
            {k.sheet({ d: bar(add(elbow, norm2, 6), add(head, norm2, 5), 8), fill: 'var(--ill-lamp)', gap: 52, edge: 2.5 })}
            {k.sheet({ d: bar(add(elbow, norm2, -6), add(head, norm2, -5), 6), fill: 'var(--ill-cabinet-shade)', gap: 46, edge: 2 })}
            {k.sheet({ d: circle(elbow[0], elbow[1], 13), fill: 'var(--ill-lamp)', gap: 54, edge: 3 })}
            {k.sheet({ d: circle(elbow[0], elbow[1], 5), fill: 'var(--ill-page)', gap: 4, edge: 1, rim: false })}
          </>
        );
      }

      case 'barn-door': {
        const mid1 = add(add(base, elbow, 0.5), norm1, 10);
        return (
          <>
            {k.stack({ d: circle(base[0], base[1], 22), fill: 'var(--color-wood-dark)', layers: 2, step: 3, gap: 18, edge: 3.5, material: 'wood' })}
            {k.sheet({ d: circle(base[0], base[1], 13), fill: 'var(--ill-folder)', gap: 26, edge: 2.5 })}
            {k.sheet({ d: bar(base, mid1, 12), fill: 'var(--ill-lamp)', gap: 46, edge: 2.5 })}
            {k.sheet({ d: bar(mid1, elbow, 11), fill: 'var(--ill-lamp)', gap: 50, edge: 2.5 })}
            {k.sheet({ d: bar(elbow, head, 10), fill: 'var(--ill-lamp)', gap: 52, edge: 2.5 })}
            {k.sheet({ d: circle(mid1[0], mid1[1], 7.5), fill: 'var(--ill-folder)', gap: 48, edge: 2 })}
            {k.sheet({ d: circle(elbow[0], elbow[1], 9.5), fill: 'var(--ill-lamp)', gap: 52, edge: 2.5 })}
            {k.sheet({ d: circle(elbow[0], elbow[1], 4), fill: 'var(--color-accent)', gap: 4, edge: 1, rim: false })}
          </>
        );
      }

      case 'clamp': {
        return (
          <>
            {k.sheet({ d: rect(base[0] - 18, base[1] - 16, 36, 32, 3), fill: 'var(--ill-cabinet-shade)', gap: 18, edge: 3.5 })}
            {k.sheet({ d: rect(base[0] - 12, base[1] + 12, 24, 14, 2), fill: 'var(--ill-lamp)', gap: 22, edge: 2.5 })}
            {k.sheet({ d: bar([base[0], base[1] + 22], [base[0], base[1] + 38], 5), fill: 'var(--ill-folder)', gap: 20, edge: 1.5 })}
            {k.sheet({ d: rect(base[0] - 11, base[1] + 35, 22, 7, 2), fill: 'var(--color-accent)', gap: 24, edge: 2 })}
            {k.sheet({ d: bar(add(base, norm1, 5), add(elbow, norm1, 5), 8), fill: 'var(--ill-lamp)', gap: 48, edge: 2.5 })}
            {k.sheet({ d: bar(add(base, norm1, -5), add(elbow, norm1, -5), 6), fill: 'var(--ill-cabinet-shade)', gap: 44, edge: 2 })}
            <path d={springPath(add(base, arm1, 14), add(elbow, arm1, -14), 6, 4.5)} fill="none" stroke="var(--ill-folder)" strokeWidth="2" />
            {k.sheet({ d: bar(add(elbow, norm2, 4), add(head, norm2, 4), 8), fill: 'var(--ill-lamp)', gap: 52, edge: 2.5 })}
            {k.sheet({ d: bar(add(elbow, norm2, -4), add(head, norm2, -4), 6), fill: 'var(--ill-cabinet-shade)', gap: 46, edge: 2 })}
            {k.sheet({ d: circle(elbow[0], elbow[1], 10), fill: 'var(--ill-lamp)', gap: 54, edge: 2.5 })}
            {k.sheet({ d: circle(elbow[0], elbow[1], 4.5), fill: 'var(--ill-folder)', gap: 6, edge: 1, rim: false })}
          </>
        );
      }

      case 'drafting': {
        return (
          <>
            {k.stack({ d: rect(base[0] - 18, base[1] - 12, 36, 26, 2), fill: 'var(--ill-lamp)', layers: 2, step: 3, gap: 14, edge: 3.5 })}
            {k.sheet({ d: circle(base[0], base[1], 7), fill: 'var(--color-accent)', gap: 20, edge: 2 })}
            {k.sheet({ d: bar(add(base, norm1, 6), add(elbow, norm1, 5), 8), fill: 'var(--ill-lamp)', gap: 48, edge: 2.5 })}
            {k.sheet({ d: bar(add(base, norm1, -6), add(elbow, norm1, -5), 6), fill: 'var(--ill-cabinet-shade)', gap: 42, edge: 2 })}
            <path d={springPath(add(base, arm1, 16), add(elbow, arm1, -16), 6, 4.5)} fill="none" stroke="var(--color-accent)" strokeWidth="2" />
            {k.sheet({ d: bar(add(elbow, norm2, 5), add(head, norm2, 4), 8), fill: 'var(--ill-lamp)', gap: 52, edge: 2.5 })}
            {k.sheet({ d: bar(add(elbow, norm2, -5), add(head, norm2, -4), 6), fill: 'var(--ill-cabinet-shade)', gap: 46, edge: 2 })}
            {k.sheet({ d: circle(elbow[0], elbow[1], 11), fill: 'var(--ill-lamp)', gap: 54, edge: 2.5 })}
            {k.sheet({ d: circle(elbow[0], elbow[1], 4.5), fill: 'var(--ill-page)', gap: 4, edge: 1, rim: false })}
          </>
        );
      }

      case 'track-can': {
        const yokeL = add(head, n, 19);
        const yokeR = add(head, n, -19);
        return (
          <>
            {k.sheet({ d: rect(base[0] - 64, base[1] - 10, 128, 16, 2), fill: 'var(--ill-bezel)', gap: 22, edge: 3.5 })}
            <path d={`M${base[0] - 56} ${base[1] - 2}H${base[0] + 56}`} stroke="var(--paper-cut)" strokeWidth="1.5" />
            {k.sheet({ d: rect(base[0] - 20, base[1] - 4, 40, 22, 2), fill: 'var(--ill-lamp)', gap: 32, edge: 3 })}
            <rect x={base[0] - 12} y={base[1] + 5} width="8" height="4" fill="var(--color-accent)" />
            {k.sheet({ d: bar(base, elbow, 11), fill: 'var(--ill-lamp)', gap: 44, edge: 2.5 })}
            {k.sheet({ d: bar(elbow, yokeL, 7), fill: 'var(--ill-cabinet-shade)', gap: 48, edge: 2 })}
            {k.sheet({ d: bar(elbow, yokeR, 7), fill: 'var(--ill-cabinet-shade)', gap: 48, edge: 2 })}
            {k.sheet({ d: circle(elbow[0], elbow[1], 9), fill: 'var(--ill-lamp)', gap: 50, edge: 2 })}
          </>
        );
      }

      case 'picture-hood': {
        return (
          <>
            {k.stack({ d: rect(base[0] - 22, base[1] - 16, 44, 30, 3), fill: 'var(--color-wood-dark)', layers: 2, step: 3, gap: 18, edge: 3.5, material: 'wood' })}
            {k.sheet({ d: rect(base[0] - 14, base[1] - 10, 28, 18, 2), fill: 'var(--ill-folder)', gap: 26, edge: 2.5 })}
            {k.sheet({ d: bar(base, elbow, 11), fill: 'var(--ill-folder)', gap: 48, edge: 2.5 })}
            {k.sheet({ d: bar(add(base, [0, 12], 1), add(elbow, head, 0.45), 6), fill: 'var(--ill-kraft-dark)', gap: 40, edge: 2 })}
            {k.sheet({ d: bar(elbow, head, 10), fill: 'var(--ill-folder)', gap: 52, edge: 2.5 })}
            {k.sheet({ d: circle(elbow[0], elbow[1], 9), fill: 'var(--ill-lamp)', gap: 54, edge: 2.5 })}
          </>
        );
      }

      case 'banker': {
        return (
          <>
            {k.stack({
              d: poly([
                [base[0] - 58, base[1] + 12],
                [base[0] + 58, base[1] + 12],
                [base[0] + 48, base[1] - 8],
                [base[0] - 48, base[1] - 8],
              ]),
              fill: 'var(--color-wood-dark)',
              layers: 2,
              step: 4,
              gap: 14,
              edge: 4,
              material: 'wood',
            })}
            {k.sheet({ d: rect(base[0] - 32, base[1] - 18, 64, 12, 2), fill: 'var(--ill-folder)', gap: 22, edge: 2.5 })}
            {k.sheet({ d: bar([base[0] - 8, base[1] - 14], [elbow[0] - 7, elbow[1]], 7), fill: 'var(--ill-folder)', gap: 46, edge: 2.5 })}
            {k.sheet({ d: bar([base[0] + 8, base[1] - 14], [elbow[0] + 7, elbow[1]], 7), fill: 'var(--ill-kraft-dark)', gap: 42, edge: 2 })}
            {k.sheet({ d: bar(elbow, head, 9), fill: 'var(--ill-folder)', gap: 50, edge: 2.5 })}
            {k.sheet({ d: circle(elbow[0], elbow[1], 10), fill: 'var(--ill-folder)', gap: 52, edge: 2.5 })}
            <path d={`M${head[0] + 10} ${head[1] + 18}V${head[1] + 64}`} stroke="var(--ill-folder)" strokeWidth="2" strokeDasharray="3 2" />
            {k.sheet({ d: circle(head[0] + 10, head[1] + 68, 5), fill: 'var(--color-accent)', gap: 18, edge: 1.5 })}
          </>
        );
      }
    }
  };

  /* ---- 2. Multi-Layered 3D-Illusion Lamp Head (Depth planes 4–8) ---- */
  const renderHead = () => {
    const collarBack = add(backC, d, -12);
    const collarL = add(collarBack, n, g.cfg.backW * 0.68);
    const collarR = add(collarBack, n, -g.cfg.backW * 0.68);
    const hoodFill =
      kind === 'banker'
        ? 'var(--color-sage)'
        : kind === 'picture-hood'
          ? 'var(--ill-folder)'
          : 'var(--ill-lamp)';

    return (
      <g className="lamp-head">
        {/* Plane 4: Rear socket collar / heat-dissipation cap */}
        {k.sheet({
          d: poly([collarL, collarR, backR, backL]),
          fill: 'var(--ill-bezel)',
          gap: 44,
          edge: 3,
        })}

        {/* Plane 5: Recessed inner reflector wall */}
        {k.sheet({
          d: poly([deepInL, deepInR, rimInR, rimInL]),
          fill: 'var(--ill-page)',
          gap: 10,
          edge: 1.5,
          rim: false,
        })}

        {/* Plane 6: Warm glowing bulb core + filament strip protruding from the reflector */}
        {k.sheet({
          d: poly([bulbL, bulbR, add(bulbTip, n, -g.cfg.frontW * 0.34), add(bulbTip, n, g.cfg.frontW * 0.34)]),
          fill: 'var(--ill-bulb)',
          gap: 14,
          edge: 2,
          rim: false,
        })}
        <polygon
          points={[frontL, frontR, rimInR, rimInL].map((p) => p.join(',')).join(' ')}
          fill="var(--ill-bulb)"
        />

        {/* Plane 7: Main outer hood cowl */}
        {k.sheet({
          d: poly([backL, backR, frontR, frontL]),
          fill: hoodFill,
          gap: 58,
          edge: 4.5,
        })}

        {/* 3D cylindrical/conical fold facet on the side away from the primary light */}
        <polygon
          points={[backC, backR, frontR, faceMid].map((p) => p.join(',')).join(' ')}
          fill="var(--paper-fold)"
        />
        <path
          d={`M${backC[0]} ${backC[1]}L${faceMid[0]} ${faceMid[1]}`}
          stroke="var(--paper-cut)"
          strokeWidth="1.3"
        />

        {/* Plane 8: Fixture-specific front hardware */}
        {kind === 'barn-door' && (
          <>
            {k.sheet({
              d: poly([frontL, add(frontL, n, -7), add(flapL, n, -5), flapL]),
              fill: 'var(--ill-bezel)',
              gap: 64,
              edge: 3,
            })}
            {k.sheet({
              d: poly([frontR, add(frontR, n, 7), add(flapR, n, 5), flapR]),
              fill: 'var(--ill-bezel)',
              gap: 64,
              edge: 3,
            })}
          </>
        )}

        {kind === 'track-can' && (
          <>
            {k.sheet({
              d: poly([frontL, frontR, add(frontR, d, 10), add(frontL, d, 10)]),
              fill: 'var(--ill-bezel)',
              gap: 64,
              edge: 3,
            })}
            {[-0.45, 0, 0.45].map((t) => {
              const p0 = add(faceMid, n, g.cfg.frontW * t);
              const p1 = add(p0, d, 10);
              return (
                <path
                  key={t}
                  d={`M${p0[0]} ${p0[1]}L${p1[0]} ${p1[1]}`}
                  stroke="var(--ill-page)"
                  strokeWidth="1.6"
                  opacity="0.7"
                />
              );
            })}
          </>
        )}

        {(kind === 'drafting' || kind === 'clamp' || kind === 'architect') && (
          <>
            {k.sheet({
              d: poly([frontL, add(faceMid, n, 4), add(add(faceMid, d, 8), n, 2), flapL]),
              fill: 'var(--ill-cabinet-shade)',
              gap: 62,
              edge: 2.5,
            })}
          </>
        )}

        {(kind === 'picture-hood' || kind === 'banker') && (
          <>
            {k.sheet({
              d: poly([add(frontL, d, -8), add(frontR, d, -8), frontR, frontL]),
              fill: kind === 'banker' ? 'var(--ill-folder)' : 'var(--color-accent)',
              gap: 62,
              edge: 2.5,
            })}
          </>
        )}

        {k.sheet({ d: circle(head[0], head[1], 8.5), fill: 'var(--ill-lamp)', gap: 62, edge: 2.5 })}
        {k.sheet({ d: circle(head[0], head[1], 3.8), fill: 'var(--color-accent)', gap: 4, edge: 1, rim: false })}
      </g>
    );
  };

  const lamp: SceneLayer = {
    id,
    band: 'mid',
    z: o.z ?? -45,
    box: lampBox,
    desktopOnly: o.desktopOnly,
    art: (
      <>
        {renderMountAndArm()}
        {renderHead()}
      </>
    ),
  };

  /* ---- 3. Realistic Volumetric Light Refraction, Perspective Surface Pool, Dust & Fireflies (`z: 10`) ---- */
  const gidOuter = `${id}-beam-outer`;
  const gidMid = `${id}-beam-mid`;
  const gidCore = `${id}-beam-core`;
  const gidBloom = `${id}-bulb-bloom`;
  const gidPool = `${id}-surface-pool`;
  const gidFly = `${id}-firefly-glow`;

  const midInL = lerpP(frontL, frontR, 0.14);
  const midInR = lerpP(frontL, frontR, 0.86);
  const coreInL = lerpP(frontL, frontR, 0.28);
  const coreInR = lerpP(frontL, frontR, 0.72);

  // Curved quadratic paths for the cone bottoms so the beam wraps naturally into the elliptical surface pool.
  const bend = plane === 'floor' ? Math.round(hitRy * 0.65) : Math.round(hitRy * 0.25);
  const conePath = (inL: P, inR: P, outR: P, outL: P) => {
    const midOut: P = [Math.round((outL[0] + outR[0]) / 2), Math.round((outL[1] + outR[1]) / 2 + bend)];
    return `M${inL[0]} ${inL[1]}L${inR[0]} ${inR[1]}L${outR[0]} ${outR[1]}Q${midOut[0]} ${midOut[1]} ${outL[0]} ${outL[1]}Z`;
  };

  // Deterministic dust motes inside the beam cone & fireflies around the lamp.
  const rand = seeded(Math.round(head[0] * 31 + head[1] * 17 + poolAt[0] * 13));
  const motes = Array.from({ length: 14 }, (_, i) => {
    // Concentrate motes in the upper and middle 80% of the beam where light is brightest.
    const u = Math.round((0.12 + rand() * 0.76) * 100) / 100;
    const v = Math.round((0.2 + rand() * 0.6) * 100) / 100;
    const rowL = lerpP(frontL, farL, u);
    const rowR = lerpP(frontR, farR, u);
    const pos = lerpP(rowL, rowR, v);
    const r = Math.round((1.1 + rand() * 1.5) * 10) / 10;
    const dx = Math.round((rand() * 18 - 9) * 10) / 10;
    const dy = Math.round((-8 - rand() * 14) * 10) / 10;
    const dur = Math.round((5.2 + rand() * 4.5) * 10) / 10;
    const delay = Math.round((i * 0.42 + rand() * 1.2) * 10) / 10;
    const alpha = Math.round((0.32 + (1 - u) * 0.45) * 100) / 100;
    return { pos, r, dx, dy, dur, delay, alpha };
  });

  const fireflies = Array.from({ length: 5 }, (_, i) => {
    const u = Math.round((0.06 + rand() * 0.58) * 100) / 100;
    const v = Math.round((0.04 + rand() * 0.92) * 100) / 100;
    const rowL = lerpP(add(frontL, n, 24), add(farL, n, 38), u);
    const rowR = lerpP(add(frontR, n, -24), add(farR, n, -38), u);
    const pos = lerpP(rowL, rowR, v);
    const r = Math.round((2.2 + rand() * 1.1) * 10) / 10;
    const dx = Math.round((rand() > 0.5 ? 1 : -1) * (14 + rand() * 18));
    const dy = Math.round((rand() > 0.5 ? 1 : -1) * (10 + rand() * 14));
    const dur = Math.round((4.4 + rand() * 3.2) * 10) / 10;
    const delay = Math.round((i * 0.75 + rand() * 0.8) * 10) / 10;
    return { pos, r, dx, dy, dur, delay };
  });

  const light: SceneLayer = {
    id: `${id}-light`,
    band: 'mid',
    z: 10,
    box: lightBox,
    className: 'lamp-glow',
    desktopOnly: o.desktopOnly,
    art: (
      <g style={{ opacity: 'var(--glow-opacity)' }}>
        <defs>
          {/* Soft inverse-square falloff for outer penumbra */}
          <linearGradient id={gidOuter} gradientUnits="userSpaceOnUse" x1={faceMid[0]} y1={faceMid[1]} x2={poolAt[0]} y2={poolAt[1]}>
            <stop offset="0" stopColor="var(--ill-bulb)" stopOpacity="0.28" />
            <stop offset="0.28" stopColor="var(--ill-bulb)" stopOpacity="0.16" />
            <stop offset="0.68" stopColor="var(--ill-bulb)" stopOpacity="0.06" />
            <stop offset="1" stopColor="var(--ill-bulb)" stopOpacity="0.01" />
          </linearGradient>
          {/* Mid volumetric scatter cone */}
          <linearGradient id={gidMid} gradientUnits="userSpaceOnUse" x1={faceMid[0]} y1={faceMid[1]} x2={poolAt[0]} y2={poolAt[1]}>
            <stop offset="0" stopColor="var(--ill-bulb)" stopOpacity="0.34" />
            <stop offset="0.38" stopColor="var(--ill-bulb)" stopOpacity="0.18" />
            <stop offset="0.78" stopColor="var(--ill-bulb)" stopOpacity="0.06" />
            <stop offset="1" stopColor="var(--ill-bulb)" stopOpacity="0" />
          </linearGradient>
          {/* High-intensity warm core ray near the bulb */}
          <linearGradient id={gidCore} gradientUnits="userSpaceOnUse" x1={faceMid[0]} y1={faceMid[1]} x2={poolAt[0]} y2={poolAt[1]}>
            <stop offset="0" stopColor="var(--ill-page)" stopOpacity="0.48" />
            <stop offset="0.22" stopColor="var(--ill-bulb)" stopOpacity="0.3" />
            <stop offset="0.62" stopColor="var(--ill-bulb)" stopOpacity="0.09" />
            <stop offset="1" stopColor="var(--ill-bulb)" stopOpacity="0" />
          </linearGradient>
          {/* Warm radial bloom right at the lamp aperture */}
          <radialGradient id={gidBloom} cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="var(--ill-page)" stopOpacity="0.65" />
            <stop offset="0.38" stopColor="var(--ill-bulb)" stopOpacity="0.32" />
            <stop offset="1" stopColor="var(--ill-bulb)" stopOpacity="0" />
          </radialGradient>
          {/* Soft radial pool on the receiving surface (floor or board) */}
          <radialGradient id={gidPool} cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="var(--ill-page)" stopOpacity="0.26" />
            <stop offset="0.32" stopColor="var(--ill-bulb)" stopOpacity="0.18" />
            <stop offset="0.68" stopColor="var(--ill-bulb)" stopOpacity="0.07" />
            <stop offset="1" stopColor="var(--ill-bulb)" stopOpacity="0" />
          </radialGradient>
          {/* Firefly radial halo */}
          <radialGradient id={gidFly} cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="var(--ill-page)" stopOpacity="0.95" />
            <stop offset="0.3" stopColor="var(--ill-bulb)" stopOpacity="0.55" />
            <stop offset="1" stopColor="var(--ill-bulb)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Blurred Volumetric Cones (feGaussianBlur from PaperDefs removes harsh triangle edges) */}
        <path d={conePath(frontL, frontR, farR, farL)} fill={`url(#${gidOuter})`} filter="url(#pk-blur-3)" />
        <path d={conePath(midInL, midInR, midR, midL)} fill={`url(#${gidMid})`} filter="url(#pk-blur-2)" />
        <path d={conePath(coreInL, coreInR, coreR, coreL)} fill={`url(#${gidCore})`} filter="url(#pk-blur-2)" />

        {/* Subtle inner papercraft light-crease whisper near the hood */}
        <path
          d={`M${midInL[0]} ${midInL[1]}L${lerpP(midInL, midL, 0.55).join(' ')}M${midInR[0]} ${midInR[1]}L${lerpP(midInR, midR, 0.55).join(' ')}`}
          stroke="var(--ill-bulb)"
          strokeWidth="1"
          opacity="0.11"
          filter="url(#pk-blur-1)"
        />

        {/* 2. Aperture Bulb Bloom Halo at the hood opening */}
        <path
          d={ellipse(faceMid[0], faceMid[1], g.cfg.frontW * 1.45, g.cfg.frontW * 0.95)}
          fill={`url(#${gidBloom})`}
          filter="url(#pk-blur-2)"
        />

        {/* 3. Perspective Surface Pool at the exact termination plane */}
        <path
          d={ellipse(poolAt[0], poolAt[1], hitRx * 1.08, hitRy * 1.15)}
          fill={`url(#${gidPool})`}
          filter="url(#pk-blur-2)"
        />
        <path
          d={ellipse(poolAt[0], poolAt[1], hitRx * 0.58, hitRy * 0.6)}
          fill={`url(#${gidPool})`}
          filter="url(#pk-blur-1)"
        />

        {/* 4. Floating Dust Motes inside the light beam */}
        <g className="lamp-dust">
          {motes.map((m, i) => (
            <circle
              key={`mote-${i}`}
              cx={m.pos[0]}
              cy={m.pos[1]}
              r={m.r}
              className="lamp-mote"
              style={
                {
                  '--dx': `${m.dx}px`,
                  '--dy': `${m.dy}px`,
                  '--dur': `${m.dur}s`,
                  '--delay': `-${m.delay}s`,
                  '--a': m.alpha,
                } as CSSProperties
              }
            />
          ))}
        </g>

        {/* 5. Glowing Fireflies orbiting around the lamp and upper cone */}
        <g className="lamp-fireflies">
          {fireflies.map((f, i) => (
            <g
              key={`fly-${i}`}
              className="lamp-firefly"
              style={
                {
                  '--dx': `${f.dx}px`,
                  '--dy': `${f.dy}px`,
                  '--dur': `${f.dur}s`,
                  '--delay': `-${f.delay}s`,
                } as CSSProperties
              }
            >
              <circle cx={f.pos[0]} cy={f.pos[1]} r={f.r * 5.2} fill={`url(#${gidFly})`} />
              <circle cx={f.pos[0]} cy={f.pos[1]} r={f.r * 0.72} fill="var(--ill-page)" />
            </g>
          ))}
        </g>
      </g>
    ),
  };

  return [lamp, light];
}
