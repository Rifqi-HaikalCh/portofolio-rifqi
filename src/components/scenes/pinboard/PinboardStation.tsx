import { PhotoPrint } from '../../ui/PhotoPrint';
import type { ReactNode } from 'react';
import { circle, cut, paperKit, poly, rect } from '../../../lib/paper-kit';
import type { Frames, SceneLayer } from '../PaperScene';
import { Station } from '../Station';
import { STRIP, figureLayer, floorLayer, lineMuted, wallLayer, windowHole, windowLayers } from '../office';

/*
  Station `02` — The Pinboard (DesignRules.md §2.2, §4.5 `02`), midday.
  The cork board on the wall by the window: pinned sheets at two depths, the
  owner's photograph pinned as a print (v3.6, owner request: the photo, not
  the bust), four index cards cut with the About highlights' icons, and the
  figure pressing a card to the board's edge.
*/

export const PINBOARD_FRAMES: Frames = { desktop: STRIP, mobile: { x: 490, y: 40, w: 930, h: 600 } };
const WIN = { x: 90, y: 64, w: 300, h: 310 };
const BOARD = { x: 520, y: 70, w: 700, h: 400 };
const PHOTO = { x: 790, y: 96, w: 170, h: 204 };
/** The index cards on the board (world units): the About sheets for them lift off these (beats.ts). */
export const PIN_CARDS = [0, 1, 2, 3].map((i) => ({ x: 560 + i * 158, y: 318 + (i % 2) * 14, w: 132, h: 112, tilt: [-1.5, 1.2, -0.8, 1.5][i] }));

type Icon = 'graduation-cap' | 'briefcase' | 'trophy' | 'users' | string;

/** Die-cut icon shapes for the index cards, centred on (cx, cy). */
function iconPath(icon: Icon, cx: number, cy: number) {
  switch (icon) {
    case 'graduation-cap':
      return poly([[cx - 26, cy - 4], [cx, cy - 16], [cx + 26, cy - 4], [cx, cy + 8]]) + rect(cx - 14, cy + 2, 28, 12, 2);
    case 'briefcase':
      return `${rect(cx - 22, cy - 8, 44, 26, 3)}${rect(cx - 9, cy - 16, 18, 10, 2)}`;
    case 'trophy':
      return `M${cx - 16} ${cy - 16}H${cx + 16}V${cy - 2}Q${cx + 16} ${cy + 10} ${cx + 4} ${cy + 12}V${cy + 16}H${cx + 10}V${cy + 20}H${cx - 10}V${cy + 16}H${cx - 4}V${cy + 12}Q${cx - 16} ${cy + 10} ${cx - 16} ${cy - 2}Z`;
    default:
      return `${circle(cx - 10, cy - 6, 8)}${circle(cx + 12, cy - 4, 7)}${rect(cx - 24, cy + 4, 28, 14, 6)}${rect(cx, cy + 5, 24, 12, 6)}`;
  }
}

/*
  As a chapter stage (§4.5 `02`): `wide` bleeds the wall and floor for the
  fullscreen fit, and `figure-alt` is the stop-motion partner pose (`reach`)
  the cards beat swaps in. `only` renders a subset (occluder copies).
*/
export function PinboardStation({ icons, wide = false, only }: { icons: readonly Icon[]; wide?: boolean; only?: readonly string[] }) {
  const k = paperKit('pin');
  const pins = ['var(--color-accent)', 'var(--color-blueprint)', 'var(--color-sage)', 'var(--color-muted)'];

  const layers: SceneLayer[] = [
    ...windowLayers(k, 'pin', WIN).map((l) => ({ ...l, desktopOnly: true })),
    wallLayer(k, {
      hole: windowHole(WIN),
      beam: 'M120 392L380 392L960 566L560 566Z',
      shade: { x: 1240, y: 470, w: 400, h: 96 },
      wide,
    }),
    floorLayer(k, undefined, wide),
    {
      id: 'board',
      band: 'back',
      z: -200,
      box: { x: BOARD.x - 30, y: BOARD.y - 30, w: BOARD.w + 60, h: BOARD.h + 60 },
      art: (
        <>
          {k.sheet({ d: rect(BOARD.x - 16, BOARD.y - 16, BOARD.w + 32, BOARD.h + 32, 3), fill: 'var(--color-wood)', gap: 30, edge: 6, material: 'wood' })}
          {k.stack({ d: rect(BOARD.x, BOARD.y, BOARD.w, BOARD.h, 2), fill: 'var(--ill-cork)', layers: 3, step: 4, gap: 10, edge: 3, material: 'cork' })}
        </>
      ),
    },
    {
      id: 'sheets',
      band: 'mid',
      z: -130,
      box: { x: BOARD.x, y: BOARD.y, w: BOARD.w, h: BOARD.h },
      art: (
        <>
          {/* A month sheet and a Jakarta map: back row, pinned flat. */}
          <g transform="rotate(-2 640 120)">
            {k.sheet({ d: rect(560, 104, 180, 214, 1), fill: 'var(--ill-page)', gap: 14, edge: 1.5 })}
            {k.sheet({ d: rect(560, 104, 180, 30, 1), fill: 'var(--color-accent)', gap: 0, edge: 0, rim: false, material: 'none' })}
            <path
              d={Array.from({ length: 5 }, (_, r) => Array.from({ length: 6 }, (_, c) => rect(572 + c * 27, 148 + r * 32, 20, 22)).join('')).join('')}
              fill="none"
              stroke="var(--color-line)"
              strokeWidth="1.5"
            />
            <path d={rect(626, 212, 20, 22)} fill="var(--color-accent)" opacity="0.35" />
          </g>
          <g transform="rotate(2.5 1090 130)">
            {k.sheet({ d: rect(990, 112, 196, 150, 1), fill: 'var(--ill-sky)', gap: 14, edge: 1.5 })}
            {k.sheet({ d: cut([[990, 196], [1046, 176], [1104, 206], [1186, 184], [1186, 262], [990, 262]], { seed: 9, jitter: 2 }), fill: 'var(--color-sage)', gap: 4, edge: 1, rim: false })}
            <path d="M1010 146Q1060 180 1092 168T1168 228" fill="none" stroke="var(--color-accent)" strokeWidth="3" strokeDasharray="7 6" />
            {k.sheet({ d: 'M1092 168q-10-14 0-22q10 8 0 22z', fill: 'var(--color-accent)', gap: 6, edge: 1 })}
          </g>
          {[[650, 112], [1088, 120]].map(([x, y]) => (
            <g key={x}>{k.sheet({ d: circle(x, y, 5), fill: 'var(--color-ink)', gap: 8, edge: 1.5, material: 'none' })}</g>
          ))}
        </>
      ),
    },
    {
      id: 'cards',
      band: 'mid',
      z: -70,
      box: { x: BOARD.x, y: 280, w: BOARD.w, h: 200 },
      art: (
        <>
          {icons.slice(0, 4).map((icon, i) => {
            const { x, y, tilt } = PIN_CARDS[i];
            return (
              <g key={icon + i} data-obj={`card-${i}`} transform={`rotate(${tilt} ${x + 66} ${y})`}>
                {k.sheet({ d: rect(x, y, 132, 112, 1), fill: 'var(--ill-page)', gap: 22, edge: 2 })}
                {k.sheet({ d: iconPath(icon, x + 66, y + 46), fill: pins[i], gap: 6, edge: 1.5, rim: false })}
                <path d={`M${x + 18} ${y + 88}H${x + 114}M${x + 18} ${y + 100}H${x + 84}`} {...lineMuted} />
                {k.sheet({ d: circle(x + 66, y + 10, 5.5), fill: pins[(i + 1) % 4], gap: 10, edge: 1.5, material: 'none' })}
              </g>
            );
          })}
        </>
      ),
    },
    {
      // The print itself is HTML (a real photograph cannot be paper-kit art); the About dossier beat
      // carries it off the board to beside the bio and back (beats.ts). After the cards in paint
      // order, so it passes in front of them on the way.
      id: 'photo',
      band: 'mid',
      z: -126,
      box: PHOTO,
      html: (
        <PhotoPrint sizes="(min-width: 1024px) 320px, 40vw" />
      ),
    },
    figureLayer('pin', 1150, 92, 520),
    ...(wide ? [{ ...figureLayer('reach', 1150, 92, 520, 0, 'figure-alt'), className: 'station-fig pose-alt' }] : []),
    {
      id: 'plant',
      band: 'front',
      z: 110,
      box: { x: 1430, y: 300, w: 200, h: 340 },
      desktopOnly: true,
      art: <Plant k={k} />,
    },
  ];

  return <Station name="pinboard" layers={layers} frames={PINBOARD_FRAMES} light="midday" only={only} />;
}

/** A floor plant on a stool, in front of the board's right edge. */
function Plant({ k }: { k: ReturnType<typeof paperKit> }): ReactNode {
  const leaves = [
    { tip: [1470, 330], ctrl: [1488, 420], bend: [1520, 400] },
    { tip: [1540, 310], ctrl: [1520, 410], bend: [1566, 392] },
    { tip: [1612, 360], ctrl: [1572, 420], bend: [1604, 430] },
    { tip: [1448, 430], ctrl: [1490, 460], bend: [1500, 440] },
  ];
  return (
    <>
      {leaves.map(({ tip, ctrl, bend }) => (
        <g key={tip[0]}>
          {k.sheet({ d: `M1540 500Q${ctrl[0]} ${ctrl[1]} ${tip[0]} ${tip[1]}Q${bend[0]} ${bend[1]} 1540 500Z`, fill: 'var(--ill-leaf)', gap: 24, edge: 2 })}
          <path d={`M1540 500Q${(ctrl[0] + bend[0]) / 2} ${(ctrl[1] + bend[1]) / 2} ${tip[0]} ${tip[1]}Q${bend[0]} ${bend[1]} 1540 500Z`} fill="var(--ill-leaf-fold)" />
        </g>
      ))}
      {k.sheet({ d: poly([[1488, 504], [1592, 504], [1578, 596], [1502, 596]]), fill: 'var(--ill-pot)', gap: 30, edge: 4, material: 'kraft' })}
      {k.sheet({ d: rect(1478, 490, 124, 20, 2), fill: 'var(--ill-pot-rim)', gap: 8, edge: 4, material: 'kraft' })}
    </>
  );
}
