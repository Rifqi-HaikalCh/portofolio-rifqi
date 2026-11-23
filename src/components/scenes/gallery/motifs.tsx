import type { ReactNode } from 'react';
import { circle, cut, paperKit, poly, rect, type Kit } from '../../../lib/paper-kit';
import type { ProjectMotif } from '../../../types';
import { svgString } from '../../../lib/paper-kit/svg-string';

/*
  Domain sheets inside a project's shadow box (DesignRules.md §4.5 `04`):
  two depths of paper cut from what the project does, in a 400 × 300 box.
  The paper laptop with the real screenshot sits in front (ProjectShadowBox),
  over the lower right, so motifs keep the top and the left clear to read.
*/

/** Serialised SVG markup: the shelf is a client component, so the art travels as two small strings. */
export type MotifArt = { back: string; mid: string };
type MotifNodes = { back: ReactNode; mid: ReactNode };

const line = { stroke: 'var(--ill-page)', strokeWidth: 3, strokeLinecap: 'round' } as const;

function backing(k: Kit, fill: string) {
  return k.sheet({ d: rect(0, 0, 400, 300), fill, edge: 0, rim: false });
}

const MOTIFS: Record<ProjectMotif, (k: Kit) => MotifNodes> = {
  // API documentation: stacked spec sheets with braces, endpoint strips.
  api: (k) => ({
    back: (
      <>
        {backing(k, 'var(--ill-wall)')}
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`rotate(${-6 + i * 4} 90 150)`}>
            {k.sheet({ d: rect(30 + i * 14, 34 + i * 10, 130, 170, 2), fill: 'var(--ill-page)', gap: 14, edge: 2 })}
          </g>
        ))}
        <path d="M78 98q-14 0-14 14v16q0 10-10 10q10 0 10 10v16q0 14 14 14M122 98q14 0 14 14v16q0 10 10 10q-10 0-10 10v16q0 14-14 14" fill="none" stroke="var(--color-blueprint)" strokeWidth="5" />
      </>
    ),
    mid: (
      <>
        {[
          ['var(--color-sage)', 40],
          ['var(--color-blueprint)', 66],
          ['var(--color-accent)', 92],
        ].map(([fill, y]) => (
          <g key={String(y)}>
            {k.sheet({ d: rect(196, Number(y) - 30, 170, 20, 2), fill: 'var(--ill-page)', gap: 16, edge: 1.5 })}
            {k.sheet({ d: rect(200, Number(y) - 26, 36, 12, 1), fill: String(fill), gap: 2, edge: 0.8, rim: false })}
            <path d={`M246 ${Number(y) - 20}H${330 - Number(y) / 3}`} stroke="var(--color-muted)" strokeWidth="3" opacity="0.4" />
          </g>
        ))}
      </>
    ),
  }),
  // Shipment tracking: a map sheet, a dashed route, pins and a truck.
  route: (k) => ({
    back: (
      <>
        {backing(k, 'var(--ill-sky)')}
        {k.sheet({ d: cut([[0, 120], [90, 96], [170, 128], [260, 90], [400, 118], [400, 300], [0, 300]], { seed: 3, jitter: 3 }), fill: 'var(--color-sage)', gap: 18, edge: 2 })}
        {k.sheet({ d: cut([[0, 200], [120, 176], [220, 206], [400, 180], [400, 300], [0, 300]], { seed: 5, jitter: 3 }), fill: 'var(--ill-leaf)', gap: 18, edge: 2 })}
      </>
    ),
    mid: (
      <>
        <path d="M34 80Q90 150 150 110T300 60" fill="none" {...line} strokeDasharray="8 8" />
        {[[34, 80, 'var(--color-blueprint)'], [300, 60, 'var(--color-accent)']].map(([x, y, fill]) => (
          <g key={String(x)}>{k.sheet({ d: `M${x} ${y}q-14-18 0-30q14 12 0 30z`, fill: String(fill), gap: 10, edge: 1.5 })}</g>
        ))}
        {k.sheet({ d: `${rect(40, 150, 58, 32, 2)}`, fill: 'var(--ill-page)', gap: 14, edge: 2 })}
        {k.sheet({ d: `${rect(98, 160, 26, 22, 2)}`, fill: 'var(--color-accent)', gap: 14, edge: 2 })}
        {k.sheet({ d: `${circle(58, 186, 7)}${circle(108, 186, 7)}`, fill: 'var(--ill-bezel)', gap: 6, edge: 1, material: 'none' })}
      </>
    ),
  }),
  // Influencer marketplace: a striped storefront awning and profile cards.
  market: (k) => ({
    back: (
      <>
        {backing(k, 'var(--ill-wall)')}
        {Array.from({ length: 8 }, (_, i) => (
          <g key={i}>
            {k.sheet({
              d: `M${i * 50} 0H${i * 50 + 50}V56Q${i * 50 + 25} 76 ${i * 50} 56Z`,
              fill: i % 2 ? 'var(--ill-page)' : 'var(--color-accent)',
              gap: 20,
              edge: 2,
            })}
          </g>
        ))}
      </>
    ),
    mid: (
      <>
        {[0, 1].map((i) => (
          <g key={i} transform={`rotate(${i ? 4 : -5} ${70 + i * 30} 160)`}>
            {k.sheet({ d: rect(26 + i * 52, 100 + i * 22, 92, 120, 3), fill: 'var(--ill-page)', gap: 18, edge: 2 })}
            {k.sheet({ d: circle(72 + i * 52, 136 + i * 22, 20), fill: i ? 'var(--color-blueprint)' : 'var(--color-sage)', gap: 4, edge: 1 })}
            <path d={`M${44 + i * 52} ${176 + i * 22}H${100 + i * 52}M${50 + i * 52} ${190 + i * 22}H${94 + i * 52}`} stroke="var(--color-muted)" strokeWidth="3" opacity="0.45" />
          </g>
        ))}
      </>
    ),
  }),
  // Hiring platform: a stack of CVs and an approval check.
  hiring: (k) => ({
    back: (
      <>
        {backing(k, 'var(--ill-wall)')}
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`rotate(${-8 + i * 6} 120 120)`}>
            {k.sheet({ d: rect(40 + i * 20, 30 + i * 8, 120, 160, 2), fill: 'var(--ill-page)', gap: 14, edge: 2 })}
            {k.sheet({ d: circle(70 + i * 20, 66 + i * 8, 14), fill: 'var(--color-blueprint)', gap: 2, edge: 0.8, rim: false })}
            <path d={`M${92 + i * 20} ${60 + i * 8}H${144 + i * 20}M${92 + i * 20} ${72 + i * 8}H${130 + i * 20}M${56 + i * 20} ${102 + i * 8}H${144 + i * 20}M${56 + i * 20} ${116 + i * 8}H${136 + i * 20}`} stroke="var(--color-muted)" strokeWidth="3" opacity="0.4" />
          </g>
        ))}
      </>
    ),
    mid: (
      <>
        {k.sheet({ d: circle(330, 62, 34), fill: 'var(--color-sage)', gap: 20, edge: 2.5 })}
        <path d="M314 62l12 12 22-24" fill="none" {...line} strokeWidth="6" />
      </>
    ),
  }),
  // Delivery app: city blocks, a parcel and the phone it is ordered from.
  delivery: (k) => ({
    back: (
      <>
        {backing(k, 'var(--ill-sky)')}
        {k.sheet({ d: 'M0 300V150H40V110H90V170H130V90H180V140H230V120H270V160H330V100H400V300Z', fill: 'var(--ill-city-near)', gap: 18, edge: 2 })}
      </>
    ),
    mid: (
      <>
        {k.sheet({ d: rect(28, 60, 74, 136, 10), fill: 'var(--ill-bezel)', gap: 18, edge: 2.5 })}
        {k.sheet({ d: rect(36, 74, 58, 104, 3), fill: 'var(--ill-page)', gap: 0, edge: 0, rim: false })}
        <path d="M44 96H86M44 110H78" stroke="var(--color-muted)" strokeWidth="3" opacity="0.5" />
        {k.sheet({ d: rect(44, 140, 42, 14, 2), fill: 'var(--color-accent)', gap: 2, edge: 0.8, rim: false })}
        {k.sheet({ d: poly([[130, 210], [190, 196], [190, 246], [130, 262]]), fill: 'var(--ill-kraft)', gap: 16, edge: 2, material: 'kraft' })}
        {k.sheet({ d: poly([[190, 196], [232, 210], [232, 260], [190, 246]]), fill: 'var(--ill-kraft-dark)', gap: 16, edge: 2, material: 'kraft' })}
        {k.sheet({ d: poly([[130, 210], [172, 222], [232, 210], [190, 196]]), fill: 'var(--ill-folder)', gap: 0, edge: 1, material: 'kraft' })}
      </>
    ),
  }),
  // Sports platform: court lines, a ball and a booking pass.
  sport: (k) => ({
    back: (
      <>
        {backing(k, 'var(--color-sage)')}
        <path d="M20 20H380V280H20ZM200 20V280M200 150m-44 0a44 44 0 1 0 88 0a44 44 0 1 0 -88 0" fill="none" stroke="var(--ill-page)" strokeWidth="3" opacity="0.7" />
      </>
    ),
    mid: (
      <>
        {k.sheet({ d: circle(76, 84, 34), fill: 'var(--color-accent)', gap: 22, edge: 2.5 })}
        <path d="M46 70Q76 86 106 70M46 98Q76 82 106 98" fill="none" stroke="var(--ill-page)" strokeWidth="2.5" opacity="0.8" />
        {k.sheet({ d: rect(280, 26, 96, 56, 3), fill: 'var(--ill-page)', gap: 16, edge: 2 })}
        <path d="M292 44H350M292 58H334" stroke="var(--color-muted)" strokeWidth="3" opacity="0.45" />
        {k.sheet({ d: rect(354, 26, 22, 56, 1), fill: 'var(--color-blueprint)', gap: 0, edge: 0.8, rim: false })}
      </>
    ),
  }),
};

export function motifArt(id: string, motif: ProjectMotif): MotifArt {
  const art = MOTIFS[motif](paperKit(`m-${id}`));
  return { back: svgString(art.back), mid: svgString(art.mid) };
}
