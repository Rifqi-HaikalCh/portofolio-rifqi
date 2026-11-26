import { circle, paperKit, poly, rect } from '../../../lib/paper-kit';
import { DeskLamp } from '../../scene/DeskLamp';
import { frameVars, type Frames, type SceneLayer } from '../PaperScene';
import { Station } from '../Station';
import { STRIP, figureLayer, floorLayer, stateCss, wallLayer } from '../office';
import { lampGeometry, lampLayers, type LampSpec } from '../lamp';

/*
  Station `05` — The Archive Shelf (DesignRules.md §2.2, §4.5 `05`), afternoon.
  A bookcase with one binder per certificate category (spine label and count
  from data, also in the HTML folio). Opening a folio pulls its binder out and
  tilts it toward the visitor (CSS :has, no JS).
*/

export const ARCHIVE_FRAMES: Frames = { desktop: STRIP, mobile: { x: 280, y: 40, w: 1060, h: 600 } };
const FRAMES = ARCHIVE_FRAMES;
const CASE = { x: 540, y: 70, w: 760, h: 520 };
const SHELF_1 = 300;
const SHELF_2 = 520;

/** Library brass-paper picture & reading lamp mounted above the bookcase (§1.11, §2.3 v3.25). */
export const ARCHIVE_LAMP: LampSpec = {
  kind: 'picture-hood',
  base: [1088, -18],
  elbow: [1048, -56],
  head: [986, -12],
  aim: [772, 214],
  spread: 245,
  z: -50,
};

export type BinderData = { label: string; count: number };

/** Binder colours and widths, shared with the v3.11 certificate books (Certificates.tsx). */
export const BINDER_FILLS = ['var(--color-accent)', 'var(--color-blueprint)', 'var(--color-sage)', 'var(--ill-kraft)'];
const WIDTHS = [86, 78, 70, 64];

/** Binder i on the upper shelf, in world units: left edge, width, height, and its centre. */
export function binderSpine(i: number) {
  const w = WIDTHS[i % WIDTHS.length];
  const x = CASE.x + 52 + WIDTHS.slice(0, i).reduce((sum, v) => sum + v + 8, 0);
  const h = 178 - (i % 2) * 12;
  return { x, w, h, cx: x + w / 2, cy: SHELF_1 - h / 2 };
}

/*
  As a chapter stage (§4.5): `wide` bleeds the wall and floor for the fullscreen
  cover fit; `only` renders a subset of layers (the occluder copy).
*/
export function ArchiveStation({ binders, wide = false, only }: { binders: BinderData[]; wide?: boolean; only?: readonly string[] }) {
  const k = paperKit('archive');
  const spines = binders.map((b, i) => ({ ...b, ...binderSpine(i), fill: BINDER_FILLS[i % BINDER_FILLS.length] }));

  const layers: SceneLayer[] = [
    wallLayer(k, { beam: 'M-40 20L180 20L760 566L-40 566Z', wide }),
    floorLayer(k, undefined, wide),
    {
      id: 'case',
      band: 'back',
      z: -220,
      box: { x: CASE.x - 20, y: CASE.y - 20, w: CASE.w + 40, h: CASE.h + 30 },
      art: (
        <>
          {k.sheet({ d: rect(CASE.x, CASE.y, CASE.w, CASE.h, 2), fill: 'var(--color-wood-dark)', gap: 60, edge: 6, material: 'wood' })}
          {k.sheet({ d: rect(CASE.x + 22, CASE.y + 20, CASE.w - 44, SHELF_1 - CASE.y - 20), fill: 'var(--ill-wall-shade)', gap: 0, edge: 0, rim: false })}
          {k.sheet({ d: rect(CASE.x + 22, SHELF_1 + 18, CASE.w - 44, SHELF_2 - SHELF_1 - 18), fill: 'var(--ill-wall-shade)', gap: 0, edge: 0, rim: false })}
          {/* Lower shelf: archive boxes with label holders. */}
          {[0, 1, 2].map((i) => (
            <g key={i}>
              {k.sheet({ d: rect(CASE.x + 50 + i * 232, SHELF_2 - 150, 210, 150, 2), fill: 'var(--ill-kraft)', gap: 24, edge: 4, material: 'kraft' })}
              {k.sheet({ d: rect(CASE.x + 120 + i * 232, SHELF_2 - 104, 70, 34, 1), fill: 'var(--ill-page)', gap: 3, edge: 1, rim: false })}
              {k.sheet({ d: circle(CASE.x + 155 + i * 232, SHELF_2 - 40, 12), fill: 'var(--ill-kraft-dark)', gap: 0, edge: 1, rim: false, material: 'none' })}
            </g>
          ))}
          {/* Upper shelf, right of the binders: a small stack and a bookend. */}
          {k.sheet({ d: rect(CASE.x + 520, SHELF_1 - 34, 170, 16, 1), fill: 'var(--ill-page)', gap: 8, edge: 2 })}
          {k.sheet({ d: rect(CASE.x + 530, SHELF_1 - 18, 160, 18, 1), fill: 'var(--color-blueprint)', gap: 8, edge: 2 })}
          {k.sheet({ d: poly([[CASE.x + 440, SHELF_1], [CASE.x + 440, SHELF_1 - 90], [CASE.x + 452, SHELF_1 - 90], [CASE.x + 452, SHELF_1 - 10], [CASE.x + 490, SHELF_1 - 10], [CASE.x + 490, SHELF_1]]), fill: 'var(--ill-lamp)', gap: 14, edge: 3 })}
          {/* On top of the case: a plant. */}
          {k.sheet({ d: `M${CASE.x + 640} ${CASE.y - 4}Q${CASE.x + 600} ${CASE.y - 70} ${CASE.x + 584} ${CASE.y - 60}Q${CASE.x + 620} ${CASE.y - 40} ${CASE.x + 640} ${CASE.y - 4}Z`, fill: 'var(--ill-leaf)', gap: 18, edge: 2 })}
          {k.sheet({ d: `M${CASE.x + 650} ${CASE.y - 4}Q${CASE.x + 680} ${CASE.y - 80} ${CASE.x + 710} ${CASE.y - 74}Q${CASE.x + 676} ${CASE.y - 44} ${CASE.x + 650} ${CASE.y - 4}Z`, fill: 'var(--ill-leaf)', gap: 18, edge: 2 })}
          {k.sheet({ d: poly([[CASE.x + 612, CASE.y - 30], [CASE.x + 680, CASE.y - 30], [CASE.x + 672, CASE.y], [CASE.x + 620, CASE.y]]), fill: 'var(--ill-pot)', gap: 10, edge: 3, material: 'kraft' })}
        </>
      ),
    },
    {
      id: 'binders',
      band: 'mid',
      z: -100,
      box: { x: CASE.x + 30, y: SHELF_1 - 210, w: 420, h: 230 },
      art: (
        <>
          {spines.map((b, i) => (
            <g key={b.label} data-obj={`binder-${i}`}>
              {k.sheet({ d: rect(b.x, SHELF_1 - b.h, b.w, b.h, 3), fill: b.fill, gap: 18, edge: 4 })}
              {k.sheet({ d: rect(b.x + 12, SHELF_1 - b.h + 18, b.w - 24, 96, 1), fill: 'var(--ill-page)', gap: 3, edge: 1, rim: false })}
              <text
                transform={`translate(${b.x + b.w / 2 + 5} ${SHELF_1 - b.h + 108}) rotate(-90)`}
                fontFamily="var(--font-mono)"
                fontSize="13"
                fontWeight="600"
                letterSpacing="1"
                fill="var(--color-ink)"
              >
                {b.label}
              </text>
              {k.sheet({ d: circle(b.x + b.w / 2, SHELF_1 - 44, 11), fill: 'var(--ill-page)', gap: 4, edge: 1.5 })}
              <text x={b.x + b.w / 2} y={SHELF_1 - 40} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fontWeight="600" fill="var(--color-accent)">
                {String(b.count).padStart(2, '0')}
              </text>
            </g>
          ))}
        </>
      ),
    },
    {
      id: 'shelves',
      band: 'mid',
      z: -60,
      box: { x: CASE.x - 10, y: SHELF_1 - 4, w: CASE.w + 20, h: SHELF_2 - SHELF_1 + 30 },
      art: (
        <>
          {k.sheet({ d: rect(CASE.x, SHELF_1, CASE.w, 18, 1), fill: 'var(--color-wood)', gap: 40, edge: 4, material: 'wood' })}
          {k.sheet({ d: rect(CASE.x, SHELF_2, CASE.w, 18, 1), fill: 'var(--color-wood)', gap: 40, edge: 4, material: 'wood' })}
        </>
      ),
    },
    // v3.25: library brass-paper picture & reading lamp above the bookcase, its trough reflector hood and 3-tier beam aimed at the binders/books.
    ...lampLayers(k, ARCHIVE_LAMP),
    figureLayer('binder', 300, 92, 500),
    {
      id: 'stack',
      band: 'front',
      z: 100,
      box: { x: 1340, y: 380, w: 240, h: 240 },
      desktopOnly: true,
      art: (
        <>
          {k.sheet({ d: rect(1370, 528, 190, 68, 2), fill: 'var(--ill-kraft)', gap: 50, edge: 4, material: 'kraft' })}
          {k.sheet({ d: rect(1388, 500, 156, 30, 2), fill: 'var(--color-accent)', gap: 12, edge: 3 })}
          {k.sheet({ d: rect(1380, 470, 170, 30, 2), fill: 'var(--color-sage)', gap: 12, edge: 3 })}
          {k.sheet({ d: rect(1396, 444, 140, 26, 2), fill: 'var(--color-blueprint)', gap: 12, edge: 3 })}
        </>
      ),
    },
  ];

  const css = stateCss(
    'certificates',
    spines.map((_, i) => ({ when: `details[data-binder="${i}"][open]`, key: `binder-${i}`, transform: 'translateY(6px) rotate(-6deg) scale(1.06)' })),
  );

  return (
    <Station name="archive" layers={layers} frames={FRAMES} light="afternoon" css={css} only={only}>
      <DeskLamp pointerOnly className="scene-desktop-only" style={frameVars(lampGeometry(ARCHIVE_LAMP).hitRect, FRAMES)} />
    </Station>
  );
}
