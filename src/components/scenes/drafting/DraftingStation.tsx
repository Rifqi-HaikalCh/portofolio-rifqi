import { ellipse, paperKit, poly, rect } from '../../../lib/paper-kit';
import { DeskLamp } from '../../scene/DeskLamp';
import { BL, BR, TL, TR, on, quad } from './board';
import { PLAN_BOX, planCss, planSheets } from './plans';
import { frameVars, type Frames, type SceneLayer } from '../PaperScene';
import { Station } from '../Station';
import { lampGeometry, lampLayers, type LampSpec } from '../lamp';
import { STRIP, bar, figureLayer, floorLayer, wallLayer } from '../office';

/*
  Station `04` — The Drafting Table (DesignRules.md §2.2, §4.5 `04` services),
  midday. An angled board under a clamp lamp; on it a blueprint of a small
  data model (three tables and their keys: the SQL Server work the section
  describes), a ruler and a set square.
  As the chapter stage (v3.7) a pile of six service blueprints lands on the
  board: each `svc-*` beat tucks the front sheet under the pile and the next
  drawing inks itself in (`plans.tsx`).
*/

export const DRAFTING_FRAMES: Frames = { desktop: STRIP, mobile: { x: 240, y: 40, w: 1040, h: 600 } };
const FRAMES = DRAFTING_FRAMES;

/** Swing-arm pantograph drafting lamp clamped to the upper-right edge of the drafting board (§1.11, §2.3 v3.26). */
export const DRAFTING_LAMP: LampSpec = {
  kind: 'drafting',
  base: [1186, 134],
  elbow: [1252, 54],
  head: [1162, 46],
  aim: [856, 336],
  spread: 255,
  plane: 'wall',
  z: -40,
};

/*
  As a chapter stage (§4.5): `wide` bleeds the wall and floor for the fullscreen
  cover fit; `only` renders a subset of layers (the occluder copy).
*/
export function DraftingStation({ wide = false, only }: { wide?: boolean; only?: readonly string[] } = {}) {
  const k = paperKit('draft');

  /* The blueprint: grid, three entity boxes, key lines. */
  const grid = [];
  for (let u = 0.12; u < 0.9; u += 0.04) grid.push(`M${on(u, 0.1).join(' ')}L${on(u, 0.86).join(' ')}`);
  for (let v = 0.1; v < 0.88; v += 0.06) grid.push(`M${on(0.1, v).join(' ')}L${on(0.9, v).join(' ')}`);
  const tables = [
    { u: 0.16, v: 0.18, w: 0.2, rows: 4 },
    { u: 0.46, v: 0.3, w: 0.2, rows: 5 },
    { u: 0.66, v: 0.14, w: 0.18, rows: 3 },
  ];

  const layers: SceneLayer[] = [
    wallLayer(k, { beam: 'M-40 60L120 60L660 566L-40 566Z', wide }),
    floorLayer(k, undefined, wide),
    {
      id: 'shelf',
      band: 'back',
      z: -240,
      box: { x: 1260, y: 80, w: 330, h: 200 },
      desktopOnly: true,
      art: (
        <>
          {/* Rolled drawings in a holder and two reference books. */}
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`rotate(${-8 + i * 5} ${1330 + i * 18} 230)`}>
              {k.sheet({ d: rect(1318 + i * 18, 110 + (i % 2) * 14, 20, 120, 9), fill: i % 2 ? 'var(--color-blueprint)' : 'var(--ill-page)', gap: 14, edge: 2 })}
            </g>
          ))}
          {k.sheet({ d: rect(1300, 186, 96, 46, 2), fill: 'var(--ill-kraft)', gap: 10, edge: 3, material: 'kraft' })}
          {k.sheet({ d: rect(1430, 126, 34, 106, 2), fill: 'var(--color-accent)', gap: 12, edge: 3 })}
          {k.sheet({ d: rect(1468, 140, 30, 92, 2), fill: 'var(--color-sage)', gap: 12, edge: 3 })}
          {k.sheet({ d: rect(1280, 232, 290, 16, 1), fill: 'var(--color-wood-dark)', gap: 30, edge: 5, material: 'wood' })}
        </>
      ),
    },
    {
      id: 'stand',
      band: 'back',
      z: -160,
      box: { x: 520, y: 300, w: 640, h: 300 },
      art: (
        <>
          {k.sheet({ d: bar([620, 420], [560, 592], 18), fill: 'var(--color-wood-dark)', gap: 60, edge: 3, material: 'wood' })}
          {k.sheet({ d: bar([1080, 420], [1140, 592], 18), fill: 'var(--color-wood-dark)', gap: 60, edge: 3, material: 'wood' })}
          {k.sheet({ d: bar([850, 320], [850, 592], 22), fill: 'var(--color-wood-dark)', gap: 60, edge: 3, material: 'wood' })}
          {k.sheet({ d: rect(580, 540, 540, 14, 2), fill: 'var(--color-wood-dark)', gap: 40, edge: 3, material: 'wood' })}
        </>
      ),
    },
    {
      id: 'board',
      band: 'mid',
      z: -120,
      box: { x: 460, y: 130, w: 780, h: 370 },
      art: (
        <>
          {k.sheet({ d: poly([TL, TR, BR, BL]), fill: 'var(--ill-board)', gap: 80, edge: 6 })}
          {k.sheet({ d: poly([[BL[0] - 8, BL[1]], [BR[0] + 8, BR[1]], [BR[0] + 8, BR[1] + 18], [BL[0] - 8, BL[1] + 18]]), fill: 'var(--color-wood)', gap: 30, edge: 4, material: 'wood' })}
        </>
      ),
    },
    {
      id: 'blueprint',
      band: 'mid',
      z: -100,
      box: { x: 540, y: 160, w: 640, h: 300 },
      art: (
        <>
          {k.sheet({ d: quad(0.08, 0.07, 0.92, 0.9), fill: 'var(--color-blueprint)', gap: 10, edge: 1.5 })}
          <path d={grid.join('')} stroke="var(--ill-blueprint-ink)" strokeWidth="1" opacity="0.16" />
          {tables.map((t) => (
            <g key={t.u}>
              <path d={quad(t.u, t.v, t.u + t.w, t.v + 0.06 + t.rows * 0.05)} fill="none" stroke="var(--ill-blueprint-ink)" strokeWidth="2" opacity="0.88" />
              <path d={quad(t.u, t.v, t.u + t.w, t.v + 0.06)} fill="var(--ill-blueprint-ink)" opacity="0.28" />
              {Array.from({ length: t.rows }, (_, r) => (
                <path key={r} d={`M${on(t.u + 0.02, t.v + 0.09 + r * 0.05).join(' ')}L${on(t.u + t.w * (r % 2 ? 0.6 : 0.8), t.v + 0.09 + r * 0.05).join(' ')}`} stroke="var(--ill-blueprint-ink)" strokeWidth="1.5" opacity="0.65" />
              ))}
            </g>
          ))}
          <path
            d={`M${on(0.36, 0.26).join(' ')}H${on(0.42, 0.26)[0]}V${on(0.46, 0.4)[1]}H${on(0.46, 0.4)[0]}M${on(0.66, 0.24).join(' ')}H${on(0.6, 0.24)[0]}V${on(0.6, 0.3)[1]}`}
            fill="none"
            stroke="var(--ill-blueprint-ink)"
            strokeWidth="1.5"
            strokeDasharray="5 4"
            opacity="0.82"
          />
          {/* Title block, bottom right. */}
          <path d={quad(0.7, 0.74, 0.9, 0.88)} fill="none" stroke="var(--ill-blueprint-ink)" strokeWidth="1.5" opacity="0.75" />
        </>
      ),
    },
    ...(wide
      ? [
          {
            id: 'plans',
            band: 'mid' as const,
            className: 'theatre-only',
            z: -95,
            box: PLAN_BOX,
            html: planSheets(k),
          },
          {
            id: 'cover',
            band: 'mid' as const,
            className: 'theatre-only',
            z: -90,
            box: { x: 520, y: 150, w: 700, h: 330 },
            art: (
              <>
                {k.sheet({ d: quad(0.05, 0.04, 0.95, 0.93), fill: 'var(--ill-page)', gap: 14, edge: 2 })}
                <path d={`M${on(0.12, 0.14).join(' ')}L${on(0.5, 0.14).join(' ')}M${on(0.12, 0.2).join(' ')}L${on(0.36, 0.2).join(' ')}`} stroke="var(--ill-page-muted)" strokeWidth="3" opacity="0.5" />
              </>
            ),
          },
        ]
      : []),
    {
      id: 'tools',
      band: 'mid',
      z: -80,
      box: { x: 480, y: 200, w: 760, h: 300 },
      art: (
        <>
          <g transform="rotate(-9 900 440)">
            {k.sheet({ d: rect(660, 430, 470, 22, 1), fill: 'var(--ill-frame)', gap: 10, edge: 2.5 })}
            <path d={Array.from({ length: 24 }, (_, i) => `M${674 + i * 19} 430v${i % 4 === 0 ? 10 : 6}`).join('')} stroke="var(--color-ink)" strokeWidth="1.2" opacity="0.55" />
          </g>
          {/* v3.7: the set square sits on the board's right edge, clear of the drawing. */}
          {k.sheet({ d: `${poly([[1170, 310], [1170, 450], [1282, 450]])}${poly([[1188, 358], [1188, 432], [1248, 432]])}`, fillRule: 'evenodd', fill: 'var(--color-sage)', gap: 12, edge: 2, opacity: 0.92 })}
          {/* v3.19 (owner): the pencil is gone; it lay across the blueprint text. */}
        </>
      ),
    },
    // v3.25: pantograph drafting lamp clamped to the board edge, with asymmetric visor hood and 3-tier beam onto the blueprint.
    ...lampLayers(k, DRAFTING_LAMP),
    figureLayer('draw', 250, 92, 500),
    ...(wide ? [{ ...figureLayer('reach', 250, 92, 500, 0, 'figure-alt'), className: 'station-fig pose-alt' }] : []),
    {
      id: 'stool',
      band: 'front',
      z: 120,
      box: { x: 1270, y: 330, w: 280, h: 310 },
      desktopOnly: true,
      art: (
        <>
          {k.sheet({ d: bar([1330, 460], [1300, 630], 14), fill: 'var(--ill-chair)', gap: 60, edge: 3 })}
          {k.sheet({ d: bar([1490, 460], [1520, 630], 14), fill: 'var(--ill-chair)', gap: 60, edge: 3 })}
          {k.sheet({ d: rect(1300, 540, 220, 10, 2), fill: 'var(--ill-chair)', gap: 40, edge: 2 })}
          {k.stack({ d: rect(1290, 440, 240, 30, 10), fill: 'var(--ill-chair)', layers: 2, step: 5, gap: 70, edge: 3, material: 'kraft' })}
          {/* A mug on the stool. */}
          {k.sheet({ d: `${rect(1414, 386, 30, 30, 13)}${rect(1422, 394, 14, 14, 6)}`, fillRule: 'evenodd', fill: 'var(--ill-mug)', gap: 10, edge: 2 })}
          {k.sheet({ d: rect(1360, 372, 66, 70, 3), fill: 'var(--ill-mug)', gap: 12, edge: 3 })}
          {k.sheet({ d: ellipse(1393, 377, 28, 4), fill: 'var(--ill-coffee)', edge: 0, rim: false, material: 'none' })}
        </>
      ),
    },
  ];

  return (
    <Station name="drafting" layers={layers} frames={FRAMES} light="midday" css={wide ? planCss('services', (i) => `svc-${i}`) : undefined} only={only}>
      <DeskLamp pointerOnly className="scene-desktop-only" style={frameVars(lampGeometry(DRAFTING_LAMP).hitRect, FRAMES)} />
    </Station>
  );
}
