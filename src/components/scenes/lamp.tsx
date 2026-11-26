import { circle, ellipse, poly, rect, type Kit } from '../../lib/paper-kit';
import type { Act } from './chapter/spec';
import type { Rect, SceneLayer } from './PaperScene';
import { bar } from './office';

/*
  Station-tailored multi-layered 2D/3D papercraft lamps (DesignRules.md §1.11, §2.3 v3.25).

  Every station in the studio has a physical paper lamp fixture tailored to its architecture:
  - `architect` (`01` The Desk): counterpoise twin-arm desk lamp with 3-layer stacked plinth,
    tension spring, counterweight, and 4-plane conical hood.
  - `barn-door` (`02` The Pinboard): gallery wall gooseneck lamp with stepped wood/brass pattera,
    arched multi-segment neck with cable clips, and 4-plane barn-door shade with angled side flaps.
  - `clamp` (`03` The Filing Cabinet): industrial articulated C-clamp boom lamp with thumbscrew,
    twin-strut arm, heat-fin cap, and faceted trapezoidal bell aimed into the open drawer.
  - `drafting` (`04` The Drafting Table): swing-arm pantograph drafting lamp clamped to the board
    edge with parallel bars, oxide tension spring, and wide asymmetric visor hood.
  - `track-can` (`04b` The Shadow-Box Gallery): ceiling track theatrical spotlight with track rail,
    sliding adapter box, U-yoke bracket, deep cylindrical stage barrel, and glare-control louvers
    aimed at Rifqi's character on the ladder.
  - `picture-hood` (`05` The Archive Shelf): library brass-paper picture & reading lamp mounted
    above the bookcase with swan-neck tube and wide 3-layer horizontal trough reflector hood.
  - `banker` (`06` The Mail Tray): classic banker's study lamp on the desk corner with stepped
    plinth, twin uprights, folded cased-paper shade, and pull-chain with paper bead.

  3D Illusion from 2D Paper Layers:
  - Two scene layers at distinct analytic camera depths (`lamp` at `z: -60 … -10`, `lamp-light` at
    `z: 10`), so camera pointer-look (`--k`) and tilt handoffs produce real parallax between the
    fixture, the target surface, and the light cone in front.
  - Inside `lamp`: 6–9 stacked paper planes at progressive `gap` depths (10 → 64):
    1. Mount / plinth (`k.stack` / `k.sheet`)
    2. Articulated twin parallel bars / gooseneck + tension springs & cable clips
    3. Rear neck collar / heat-vent fin (`gap: 42`)
    4. Outer hood / cowl (`gap: 58`, `edge: 4.5`)
    5. Side fold facet (`--paper-fold`) for 3D cylindrical/conical volume
    6. Recessed inner reflector liner (`--ill-page`, `gap: 8`)
    7. Warm bulb core (`--ill-bulb`) + die-cut cross-baffle louvers / barn-door flaps (`gap: 64`)
  - Inside `lamp-light`: 3-tier directional paper beam (`outer penumbra`, `mid fold cone`, `inner
    core ray`) originating strictly from the head's open aperture (`frontL → frontR`) along the
    `head → aim` vector, plus a 3-tier concentric target pool at `poolAt`.
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

/** Compute the exact open aperture geometry, bounding boxes, and pivot origins for a lamp spec. */
export function lampGeometry(o: LampSpec) {
  const { kind, base, elbow, head, aim, spread } = o;
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
  const reach = dist * 1.1;
  const far = add(head, d, reach);
  const farL = add(far, n, spread);
  const farR = add(far, n, -spread);
  const midL = add(far, n, spread * 0.68);
  const midR = add(far, n, -spread * 0.68);
  const coreL = add(far, n, spread * 0.34);
  const coreR = add(far, n, -spread * 0.34);
  const poolAt = add(head, d, dist * 0.98);

  const lampBox = boxOf([base, elbow, head, backL, backR, frontL, frontR, flapL, flapR], 54);
  const lightBox = boxOf([frontL, frontR, farL, farR, poolAt], Math.round(spread * 0.36 + 28));

  // Pivot for synchronized rotation of head and beam (elbow for wall/clamp lamps, head for desk lamps).
  const pivot = kind === 'architect' || kind === 'banker' ? head : elbow;
  const lampOrigin = `${pct((pivot[0] - lampBox.x) / lampBox.w)} ${pct((pivot[1] - lampBox.y) / lampBox.h)}`;
  const lightOrigin = `${pct((pivot[0] - lightBox.x) / lightBox.w)} ${pct((pivot[1] - lightBox.y) / lightBox.h)}`;

  // Interactive hit rect around the lamp fixture for DeskLamp button placement.
  const hitRect: Rect = boxOf([base, elbow, head, frontL, frontR], 24);

  return {
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
    far,
    farL,
    farR,
    midL,
    midR,
    coreL,
    coreR,
    poolAt,
    lampBox,
    lightBox,
    lampOrigin,
    lightOrigin,
    hitRect,
  };
}

/**
 * Synchronized beat acts for a station's lamp and its 3-tier beam: both rotate about the exact
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
  const { kind, base, elbow, head, spread } = o;
  const id = o.id ?? 'lamp';
  const g = lampGeometry(o);
  const { d, n, backC, backL, backR, faceMid, frontL, frontR, flapL, flapR, far, farL, farR, midL, midR, coreL, coreR, poolAt, lampBox, lightBox } = g;

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
        // Weighted 3-layer stepped desk plinth + twin counterpoise pantograph arms + counterweight + spring.
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
            {/* Power switch tab on plinth */}
            <rect x={base[0] + 22} y={base[1] + 1} width="16" height="7" rx="1" fill="var(--color-accent)" />
            {/* Lower twin parallel bars + tension spring */}
            {k.sheet({ d: bar(add(base, norm1, 7), add(elbow, norm1, 6), 8), fill: 'var(--ill-lamp)', gap: 48, edge: 2.5 })}
            {k.sheet({ d: bar(add(base, norm1, -7), add(elbow, norm1, -6), 7), fill: 'var(--ill-cabinet-shade)', gap: 42, edge: 2 })}
            <path d={springPath(add(base, arm1, 28), add(elbow, arm1, -24), 7, 5)} fill="none" stroke="var(--color-accent)" strokeWidth="2.2" />
            {/* Counterweight cylinder behind elbow */}
            {k.sheet({ d: bar(elbow, cw, 14), fill: 'var(--ill-bezel)', gap: 44, edge: 3 })}
            {/* Upper twin parallel bars */}
            {k.sheet({ d: bar(add(elbow, norm2, 6), add(head, norm2, 5), 8), fill: 'var(--ill-lamp)', gap: 52, edge: 2.5 })}
            {k.sheet({ d: bar(add(elbow, norm2, -6), add(head, norm2, -5), 6), fill: 'var(--ill-cabinet-shade)', gap: 46, edge: 2 })}
            {k.sheet({ d: circle(elbow[0], elbow[1], 13), fill: 'var(--ill-lamp)', gap: 54, edge: 3 })}
            {k.sheet({ d: circle(elbow[0], elbow[1], 5), fill: 'var(--ill-page)', gap: 4, edge: 1, rim: false })}
          </>
        );
      }

      case 'barn-door': {
        // Gallery wall pattera (wood backplate + brass collar) + arched gooseneck with paper cord clips.
        const mid1 = add(add(base, elbow, 0.5), norm1, 10);
        return (
          <>
            {k.stack({ d: circle(base[0], base[1], 22), fill: 'var(--color-wood-dark)', layers: 2, step: 3, gap: 18, edge: 3.5, material: 'wood' })}
            {k.sheet({ d: circle(base[0], base[1], 13), fill: 'var(--ill-folder)', gap: 26, edge: 2.5 })}
            {/* Gooseneck segmented tubes */}
            {k.sheet({ d: bar(base, mid1, 12), fill: 'var(--ill-lamp)', gap: 46, edge: 2.5 })}
            {k.sheet({ d: bar(mid1, elbow, 11), fill: 'var(--ill-lamp)', gap: 50, edge: 2.5 })}
            {k.sheet({ d: bar(elbow, head, 10), fill: 'var(--ill-lamp)', gap: 52, edge: 2.5 })}
            {/* Decorative brass-paper cable clips along the neck */}
            {k.sheet({ d: circle(mid1[0], mid1[1], 7.5), fill: 'var(--ill-folder)', gap: 48, edge: 2 })}
            {k.sheet({ d: circle(elbow[0], elbow[1], 9.5), fill: 'var(--ill-lamp)', gap: 52, edge: 2.5 })}
            {k.sheet({ d: circle(elbow[0], elbow[1], 4), fill: 'var(--color-accent)', gap: 4, edge: 1, rim: false })}
          </>
        );
      }

      case 'clamp': {
        // Industrial C-clamp bracket + thumbscrew spindle + twin-strut boom arm + tension spring.
        return (
          <>
            {/* C-clamp body & thumbscrew */}
            {k.sheet({ d: rect(base[0] - 18, base[1] - 16, 36, 32, 3), fill: 'var(--ill-cabinet-shade)', gap: 18, edge: 3.5 })}
            {k.sheet({ d: rect(base[0] - 12, base[1] + 12, 24, 14, 2), fill: 'var(--ill-lamp)', gap: 22, edge: 2.5 })}
            {k.sheet({ d: bar([base[0], base[1] + 22], [base[0], base[1] + 38], 5), fill: 'var(--ill-folder)', gap: 20, edge: 1.5 })}
            {k.sheet({ d: rect(base[0] - 11, base[1] + 35, 22, 7, 2), fill: 'var(--color-accent)', gap: 24, edge: 2 })}
            {/* Twin boom struts */}
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
        // Clamp mount on the drafting board edge + pantograph parallel bars + oxide spring.
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
        // Overhead gallery track rail + sliding adapter box + U-yoke gimbal bracket.
        const yokeL = add(head, n, 19);
        const yokeR = add(head, n, -19);
        return (
          <>
            {/* Ceiling track rail segment */}
            {k.sheet({ d: rect(base[0] - 64, base[1] - 10, 128, 16, 2), fill: 'var(--ill-bezel)', gap: 22, edge: 3.5 })}
            <path d={`M${base[0] - 56} ${base[1] - 2}H${base[0] + 56}`} stroke="var(--paper-cut)" strokeWidth="1.5" />
            {/* Track adapter box */}
            {k.sheet({ d: rect(base[0] - 20, base[1] - 4, 40, 22, 2), fill: 'var(--ill-lamp)', gap: 32, edge: 3 })}
            <rect x={base[0] - 12} y={base[1] + 5} width="8" height="4" fill="var(--color-accent)" />
            {/* Stem & U-yoke arms */}
            {k.sheet({ d: bar(base, elbow, 11), fill: 'var(--ill-lamp)', gap: 44, edge: 2.5 })}
            {k.sheet({ d: bar(elbow, yokeL, 7), fill: 'var(--ill-cabinet-shade)', gap: 48, edge: 2 })}
            {k.sheet({ d: bar(elbow, yokeR, 7), fill: 'var(--ill-cabinet-shade)', gap: 48, edge: 2 })}
            {k.sheet({ d: circle(elbow[0], elbow[1], 9), fill: 'var(--ill-lamp)', gap: 50, edge: 2 })}
          </>
        );
      }

      case 'picture-hood': {
        // Library stepped brass-paper wall bracket + swan-neck curved arm + under-brace.
        return (
          <>
            {k.stack({ d: rect(base[0] - 22, base[1] - 16, 44, 30, 3), fill: 'var(--color-wood-dark)', layers: 2, step: 3, gap: 18, edge: 3.5, material: 'wood' })}
            {k.sheet({ d: rect(base[0] - 14, base[1] - 10, 28, 18, 2), fill: 'var(--ill-folder)', gap: 26, edge: 2.5 })}
            {/* Swan-neck arm & decorative scroll brace */}
            {k.sheet({ d: bar(base, elbow, 11), fill: 'var(--ill-folder)', gap: 48, edge: 2.5 })}
            {k.sheet({ d: bar(add(base, [0, 12], 1), add(elbow, head, 0.45), 6), fill: 'var(--ill-kraft-dark)', gap: 40, edge: 2 })}
            {k.sheet({ d: bar(elbow, head, 10), fill: 'var(--ill-folder)', gap: 52, edge: 2.5 })}
            {k.sheet({ d: circle(elbow[0], elbow[1], 9), fill: 'var(--ill-lamp)', gap: 54, edge: 2.5 })}
          </>
        );
      }

      case 'banker': {
        // Classic banker's study lamp: 3-tier plinth + twin brass-paper uprights + crossbar.
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
            {/* Twin vertical column bars */}
            {k.sheet({ d: bar([base[0] - 8, base[1] - 14], [elbow[0] - 7, elbow[1]], 7), fill: 'var(--ill-folder)', gap: 46, edge: 2.5 })}
            {k.sheet({ d: bar([base[0] + 8, base[1] - 14], [elbow[0] + 7, elbow[1]], 7), fill: 'var(--ill-kraft-dark)', gap: 42, edge: 2 })}
            {k.sheet({ d: bar(elbow, head, 9), fill: 'var(--ill-folder)', gap: 50, edge: 2.5 })}
            {k.sheet({ d: circle(elbow[0], elbow[1], 10), fill: 'var(--ill-folder)', gap: 52, edge: 2.5 })}
            {/* Pull-chain hanging from the socket with a paper bead */}
            <path d={`M${head[0] + 10} ${head[1] + 18}V${head[1] + 64}`} stroke="var(--ill-folder)" strokeWidth="2" strokeDasharray="3 2" />
            {k.sheet({ d: circle(head[0] + 10, head[1] + 68, 5), fill: 'var(--color-accent)', gap: 18, edge: 1.5 })}
          </>
        );
      }
    }
  };

  /* ---- 2. Multi-Layered 3D-Illusion Lamp Head (Depth planes 4–7) ---- */
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
        {/* Plane 4: Rear socket collar / heat- dissipation cap (deepest head plane) */}
        {k.sheet({
          d: poly([collarL, collarR, backR, backL]),
          fill: 'var(--ill-bezel)',
          gap: 44,
          edge: 3,
        })}

        {/* Plane 5: Recessed inner reflector wall (visible inside the open aperture) */}
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

        {/* Plane 7: Main outer hood cowl (casts deep shadow, thick cut edge) */}
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
        {/* Lit cut ridge along the centerline of the hood */}
        <path
          d={`M${backC[0]} ${backC[1]}L${faceMid[0]} ${faceMid[1]}`}
          stroke="var(--paper-cut)"
          strokeWidth="1.3"
        />

        {/* Plane 8: Fixture-specific front hardware (barn doors, glare louvers, visor lip, or brass valence) */}
        {kind === 'barn-door' && (
          <>
            {/* Two angled paper barn-door flaps framing the beam */}
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
            {/* Theatrical snoot ring & die-cut cross-baffle louvers */}
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
          /* Asymmetric angled visor lip along the top/outer rim */
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
          /* Stepped brass-paper valence band across the hood brow */
          <>
            {k.sheet({
              d: poly([
                add(frontL, d, -8),
                add(frontR, d, -8),
                frontR,
                frontL,
              ]),
              fill: kind === 'banker' ? 'var(--ill-folder)' : 'var(--color-accent)',
              gap: 62,
              edge: 2.5,
            })}
          </>
        )}

        {/* Pivot knuckle rivet with oxide accent cap */}
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

  /* ---- 3. Three-Tier Layered Paper Light Cone & Target Pool (`z: 10`) ---- */
  const gidOuter = `${id}-beam-outer`;
  const gidCore = `${id}-beam-core`;
  const midInL = add(frontL, n, -g.cfg.frontW * 0.22);
  const midInR = add(frontR, n, g.cfg.frontW * 0.22);
  const coreInL = add(frontL, n, -g.cfg.frontW * 0.48);
  const coreInR = add(frontR, n, g.cfg.frontW * 0.48);

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
          {/* Outer & mid paper light wash */}
          <linearGradient id={gidOuter} gradientUnits="userSpaceOnUse" x1={faceMid[0]} y1={faceMid[1]} x2={far[0]} y2={far[1]}>
            <stop offset="0" stopColor="var(--ill-bulb)" stopOpacity="0.34" />
            <stop offset="0.52" stopColor="var(--ill-bulb)" stopOpacity="0.15" />
            <stop offset="1" stopColor="var(--ill-bulb)" stopOpacity="0" />
          </linearGradient>
          {/* Inner high-intensity core ray */}
          <linearGradient id={gidCore} gradientUnits="userSpaceOnUse" x1={faceMid[0]} y1={faceMid[1]} x2={poolAt[0]} y2={poolAt[1]}>
            <stop offset="0" stopColor="var(--ill-bulb)" stopOpacity="0.46" />
            <stop offset="0.6" stopColor="var(--ill-bulb)" stopOpacity="0.18" />
            <stop offset="1" stopColor="var(--ill-bulb)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Tier 1: Wide outer penumbra cone */}
        <polygon points={[frontL, frontR, farR, farL].map((p) => p.join(',')).join(' ')} fill={`url(#${gidOuter})`} />
        {/* Tier 2: Mid directional paper-fold cone */}
        <polygon points={[midInL, midInR, midR, midL].map((p) => p.join(',')).join(' ')} fill={`url(#${gidOuter})`} />
        {/* Tier 3: Bright inner core ray aimed directly at the target */}
        <polygon points={[coreInL, coreInR, coreR, coreL].map((p) => p.join(',')).join(' ')} fill={`url(#${gidCore})`} />
        {/* Paper-cut crease lines along the mid cone edges for tactile papercraft authenticity */}
        <path
          d={`M${midInL[0]} ${midInL[1]}L${midL[0]} ${midL[1]}M${midInR[0]} ${midInR[1]}L${midR[0]} ${midR[1]}`}
          stroke="var(--ill-bulb)"
          strokeWidth="1"
          opacity="0.16"
        />
        {/* 3-tier concentric elliptical light pool on the target surface */}
        <path d={ellipse(poolAt[0], poolAt[1], spread * 0.94, spread * 0.27)} fill="var(--ill-bulb)" opacity="0.06" />
        <path d={ellipse(poolAt[0], poolAt[1], spread * 0.62, spread * 0.18)} fill="var(--ill-bulb)" opacity="0.08" />
        <path d={ellipse(poolAt[0], poolAt[1], spread * 0.32, spread * 0.09)} fill="var(--ill-bulb)" opacity="0.11" />
      </g>
    ),
  };

  return [lamp, light];
}
