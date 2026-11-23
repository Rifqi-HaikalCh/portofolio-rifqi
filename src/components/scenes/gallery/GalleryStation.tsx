import { circle, paperKit, poly, rect, type Kit } from '../../../lib/paper-kit';
import type { Frames, SceneLayer } from '../PaperScene';
import { Station } from '../Station';
import { STRIP, bar, figureLayer, floorLayer, wallLayer } from '../office';

/*
  Station `04` — The Shadow-Box Gallery (DesignRules.md §2.2, §4.5 `04`
  projects), midday. A picture rail with frames already hung, the figure on
  a step ladder hanging one more, and frames leaning on the floor. The
  project frames themselves are the ProjectShadowBox cards below the scene.
*/

export const GALLERY_FRAMES: Frames = { desktop: STRIP, mobile: { x: 380, y: 0, w: 900, h: 640 } };
const FRAMES = GALLERY_FRAMES;
const RAIL_Y = 46;

/** One hung frame: wires to the rail, frame lip, backing, two inner sheets. */
function hungFrame(k: Kit, x: number, y: number, w: number, h: number, fills: [string, string]) {
  const cx = x + w / 2;
  return (
    <g key={x}>
      <path d={`M${cx - w * 0.3} ${y + 4}L${cx} ${RAIL_Y + 6}L${cx + w * 0.3} ${y + 4}`} fill="none" stroke="var(--ill-bezel)" strokeWidth="1.5" opacity="0.6" />
      {k.sheet({ d: `${rect(x, y, w, h, 2)}${rect(x + 12, y + 12, w - 24, h - 24)}`, fillRule: 'evenodd', fill: 'var(--ill-frame)', gap: 26, edge: 4 })}
      {k.sheet({ d: rect(x + 12, y + 12, w - 24, h - 24), fill: 'var(--color-recess)', edge: 0, rim: false })}
      {k.sheet({ d: rect(x + 24, y + h * 0.45, w - 48, h * 0.4), fill: fills[0], gap: 10, edge: 1.5 })}
      {k.sheet({ d: circle(x + w * 0.68, y + h * 0.32, Math.min(w, h) * 0.12), fill: fills[1], gap: 14, edge: 1.5 })}
    </g>
  );
}

/*
  As a chapter stage (§4.5): `wide` bleeds the wall and floor for the fullscreen
  cover fit; `only` renders a subset of layers (the occluder copy).
*/
export function GalleryStation({ wide = false, only }: { wide?: boolean; only?: readonly string[] } = {}) {
  const k = paperKit('gallery');

  const layers: SceneLayer[] = [
    wallLayer(k, { beam: 'M-40 40L140 40L560 566L-40 566Z', wide }),
    floorLayer(k, undefined, wide),
    {
      id: 'rail',
      band: 'back',
      z: -240,
      box: { x: -40, y: 20, w: 1680, h: 360 },
      art: (
        <>
          {k.sheet({ d: rect(-40, RAIL_Y, 1680, 12, 1), fill: 'var(--color-wood-dark)', gap: 20, edge: 4, material: 'wood' })}
          {hungFrame(k, 120, 120, 190, 150, ['var(--color-sage)', 'var(--color-accent)'])}
          {hungFrame(k, 360, 96, 150, 196, ['var(--color-blueprint)', 'var(--ill-sun)'])}
          {hungFrame(k, 1010, 110, 220, 160, ['var(--ill-city-near)', 'var(--color-accent)'])}
          {hungFrame(k, 1290, 92, 170, 220, ['var(--color-accent)', 'var(--ill-page)'])}
        </>
      ),
    },
    {
      id: 'ladder',
      band: 'mid',
      z: -60,
      box: { x: 690, y: 390, w: 240, h: 216 },
      art: (
        <>
          {k.sheet({ d: bar([720, 596], [764, 412], 14), fill: 'var(--color-wood)', gap: 60, edge: 3, material: 'wood' })}
          {k.sheet({ d: bar([900, 596], [856, 412], 14), fill: 'var(--color-wood)', gap: 60, edge: 3, material: 'wood' })}
          {[466, 532].map((y) => {
            const inset = ((596 - y) * 44) / 184;
            return <g key={y}>{k.sheet({ d: rect(714 + inset, y, 192 - inset * 2, 10, 1), fill: 'var(--color-wood)', gap: 30, edge: 3, material: 'wood' })}</g>;
          })}
          {k.sheet({ d: rect(750, 400, 120, 16, 2), fill: 'var(--color-wood-dark)', gap: 30, edge: 3, material: 'wood' })}
        </>
      ),
    },
    figureLayer('hang', 690, 83, 330),
    ...(wide ? [{ ...figureLayer('reach', 690, 83, 330, 0, 'figure-alt'), className: 'station-fig pose-alt' }] : []),
    {
      id: 'new-frame',
      band: 'mid',
      z: 14,
      box: { x: 730, y: 0, w: 160, h: 110 },
      art: (
        <>
          {k.sheet({ d: `${rect(756, 8, 128, 90, 2)}${rect(766, 18, 108, 70)}`, fillRule: 'evenodd', fill: 'var(--ill-frame)', gap: 40, edge: 4 })}
          {k.sheet({ d: rect(766, 18, 108, 70), fill: 'var(--color-recess)', edge: 0, rim: false })}
          {k.sheet({ d: poly([[776, 80], [810, 40], [840, 66], [862, 48], [866, 80]]), fill: 'var(--color-sage)', gap: 10, edge: 1.5 })}
        </>
      ),
    },
    {
      id: 'leaning',
      band: 'front',
      z: 100,
      box: { x: 1060, y: 330, w: 420, h: 280 },
      desktopOnly: true,
      art: (
        <>
          <g transform="rotate(-7 1180 596)">{k.sheet({ d: `${rect(1090, 380, 180, 216, 2)}${rect(1104, 394, 152, 188)}`, fillRule: 'evenodd', fill: 'var(--color-wood)', gap: 60, edge: 5, material: 'wood' })}</g>
          <g transform="rotate(-4 1340 596)">
            {k.sheet({ d: rect(1236, 420, 210, 176, 2), fill: 'var(--ill-kraft)', gap: 50, edge: 4, material: 'kraft' })}
            <path d="M1260 444H1420M1260 572H1420" stroke="var(--ill-kraft-dark)" strokeWidth="3" />
          </g>
        </>
      ),
    },
  ];

  return <Station name="gallery" layers={layers} frames={FRAMES} light="midday" only={only} />;
}
