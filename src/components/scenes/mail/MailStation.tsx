import { circle, paperKit, poly, rect } from '../../../lib/paper-kit';
import { frameVars, type Frames, type SceneLayer } from '../PaperScene';
import { Station } from '../Station';
import { DeskLamp } from '../../scene/DeskLamp';
import { lampGeometry, lampLayers, type LampSpec } from '../lamp';
import { STRIP, bar, figureLayer, floorLayer, wallLayer, windowHole, windowLayers } from '../office';

/*
  Station `06` — The Mail Tray (DesignRules.md §2.2, §4.5 `06`): the desk
  corner by the window at the end of the day (golden hour in light theme,
  lamp-on night in dark). A letter tray, the letterpress card, and the figure
  sealing an envelope. The postmark lands on that envelope only after the
  contact form reports a real send (`#contact:has(.postmark)`, scene.css).
*/

export const MAIL_FRAMES: Frames = { desktop: STRIP, mobile: { x: 420, y: 40, w: 1000, h: 600 } };
const FRAMES = MAIL_FRAMES;
const WIN = { x: 100, y: 56, w: 320, h: 330 };
const ENV = { x: 694, y: 362, w: 142, h: 90 };

/** Classic banker's study lamp on the desk corner by the letter tray (§1.11, §2.3 v3.26). */
export const MAIL_LAMP: LampSpec = {
  kind: 'banker',
  base: [1500, 424],
  elbow: [1524, 256],
  head: [1448, 212],
  aim: [1205, 434],
  spread: 165,
  plane: 'floor',
  surfaceY: 434,
  z: -30,
  desktopOnly: true,
};

/*
  As a chapter stage (§4.5): `wide` bleeds the wall and floor for the fullscreen
  cover fit; `only` renders a subset of layers (the occluder copy).
*/
export function MailStation({ wide = false, only }: { wide?: boolean; only?: readonly string[] } = {}) {
  const k = paperKit('mail');

  const layers: SceneLayer[] = [
    ...windowLayers(k, 'mail', WIN, 'dusk').map((l) => ({ ...l, desktopOnly: true })),
    wallLayer(k, { hole: windowHole(WIN), beam: 'M150 400L420 400L1040 566L640 566Z', wide }),
    floorLayer(k, undefined, wide),
    figureLayer('seal', 572, 72, 520, -70),
    ...(wide ? [{ ...figureLayer('hand', 572, 72, 520, -70, 'figure-alt'), className: 'station-fig pose-alt' }] : []),
    {
      id: 'desk',
      band: 'mid',
      z: -40,
      box: { x: 320, y: 410, w: 1320, h: 230 },
      art: (
        <>
          {/* Modesty panel: the desk's back board hides the space under the top. */}
          {k.sheet({ d: rect(470, 496, 720, 86), fill: 'var(--color-wood-dark)', gap: 80, edge: 0, material: 'wood' })}
          {k.sheet({ d: rect(420, 500, 64, 100), fill: 'var(--color-wood-dark)', gap: 60, edge: 3, material: 'wood' })}
          {k.sheet({ d: rect(1180, 500, 300, 96, 2), fill: 'var(--color-wood)', gap: 60, edge: 4, material: 'wood' })}
          {k.sheet({ d: rect(1300, 530, 60, 14, 6), fill: 'var(--color-wood-dark)', gap: 6, edge: 2 })}
          {k.sheet({ d: poly([[380, 420], [1640, 420], [1660, 468], [348, 468]]), fill: 'var(--color-wood)', gap: 120, edge: 0, material: 'wood' })}
          {k.sheet({ d: rect(348, 468, 1312, 34), fill: 'var(--color-wood-dark)', gap: 100, edge: 0, material: 'wood' })}
          <path d="M348 469.5H1660" stroke="var(--paper-cut)" strokeWidth="3" />
        </>
      ),
    },
    {
      id: 'tray',
      band: 'mid',
      z: -24,
      box: { x: 1060, y: 280, w: 320, h: 180 },
      art: (
        <>
          {/* Two-tier letter tray with letters waiting. */}
          {k.sheet({ d: rect(1104, 330, 220, 10, 1), fill: 'var(--ill-page)', gap: 6, edge: 1.5 })}
          {k.sheet({ d: rect(1110, 316, 210, 14, 1), fill: 'var(--ill-envelope)', gap: 6, edge: 1.5 })}
          {k.sheet({ d: poly([[1092, 336], [1336, 336], [1328, 356], [1100, 356]]), fill: 'var(--ill-lamp)', gap: 30, edge: 3 })}
          {k.sheet({ d: bar([1108, 356], [1100, 430], 8), fill: 'var(--ill-lamp)', gap: 30, edge: 2 })}
          {k.sheet({ d: bar([1320, 356], [1328, 430], 8), fill: 'var(--ill-lamp)', gap: 30, edge: 2 })}
          {k.sheet({ d: rect(1096, 404, 236, 12, 1), fill: 'var(--ill-envelope)', gap: 6, edge: 1.5 })}
          {k.sheet({ d: poly([[1080, 412], [1348, 412], [1340, 432], [1088, 432]]), fill: 'var(--ill-lamp)', gap: 20, edge: 3 })}
        </>
      ),
    },
    {
      id: 'letters',
      band: 'mid',
      z: -10,
      box: { x: 400, y: 330, w: 640, h: 150 },
      art: (
        <>
          {/* The letterpress card, flat on the desk. */}
          {k.sheet({ d: poly([[440, 436], [600, 436], [610, 462], [432, 462]]), fill: 'var(--ill-page)', gap: 6, edge: 2 })}
          <path d="M462 446H560M466 454H528" stroke="var(--ill-page-muted)" strokeWidth="2" opacity="0.55" />
          {/* The envelope in his hands: flap, stamp, and the postmark (after a real send). */}
          {k.sheet({ d: rect(ENV.x, ENV.y, ENV.w, ENV.h, 2), fill: 'var(--ill-envelope)', gap: 40, edge: 2 })}
          {/* The flap: hinged on the envelope's top edge; the card beat folds it open (scale 1 → −1). */}
          <g data-obj="env-flap" className="env-flap">
            {k.sheet({ d: poly([[ENV.x, ENV.y], [ENV.x + ENV.w, ENV.y], [ENV.x + ENV.w / 2, ENV.y + 50]]), fill: 'var(--ill-envelope)', gap: 6, edge: 1.5 })}
          </g>
          {k.sheet({ d: rect(ENV.x + ENV.w - 40, ENV.y + 52, 28, 30, 1), fill: 'var(--color-accent)', gap: 3, edge: 1, rim: false })}
          <g className="scene-postmark">
            <path d={`${circle(ENV.x + ENV.w - 34, ENV.y + 64, 20)}`} fill="none" stroke="var(--ill-page-ink)" strokeWidth="2.5" opacity="0.75" />
            <path d={`M${ENV.x + ENV.w - 66} ${ENV.y + 58}h52M${ENV.x + ENV.w - 66} ${ENV.y + 66}h52M${ENV.x + ENV.w - 66} ${ENV.y + 74}h52`} stroke="var(--ill-page-ink)" strokeWidth="2" opacity="0.6" />
          </g>
        </>
      ),
    },
    // v3.25: classic banker's study lamp on the desk corner, with folded cased-paper shade, pull chain and 3-tier beam onto the letter tray.
    ...lampLayers(k, MAIL_LAMP),
    {
      id: 'chair',
      band: 'front',
      z: 160,
      box: { x: 160, y: 440, w: 360, h: 200 },
      desktopOnly: true,
      art: k.stack({
        d: 'M190 650V520Q190 476 236 476H440Q486 476 486 520V650Z',
        fill: 'var(--ill-chair)',
        layers: 3,
        step: 6,
        gap: 90,
        edge: 4,
        material: 'kraft',
      }),
    },
  ];

  return (
    <Station name="mail" layers={layers} frames={FRAMES} light="golden" only={only}>
      {/* v3.10 (owner): the Mail Tray lamp is a theme switch too, like the desk lamp in `01`. */}
      <DeskLamp pointerOnly className="scene-desktop-only mail-lamp" style={frameVars(lampGeometry(MAIL_LAMP).hitRect, FRAMES)} />
    </Station>
  );
}
