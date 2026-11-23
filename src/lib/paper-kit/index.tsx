import type { CSSProperties, ReactNode } from 'react';
import { preload } from 'react-dom';

/*
  paper-kit — turns authored shapes into lit paper sheets (DesignRules.md §2.4, §9.3).

  Every sheet is five parts: a two-tier cast shadow (contact + penumbra) whose
  offset and blur grow with the gap to the surface behind, a cut wall (the
  paper's thickness) on the side away from the light, the face with a light
  falloff of the same hue, a rim on the lit edges, and paper grain.

  Server-only by use: scenes are Server Components, nothing here ships to the
  client. Deterministic: ids come from a per-scene counter, randomness is seeded.
*/

export type Material = 'cardstock' | 'kraft' | 'cork' | 'wood' | 'none';
export type Band = 'far' | 'back' | 'mid' | 'front';

/** Atmospheric mix toward --air by depth band (§2.4). */
const AIR: Record<Band, number> = { far: 34, back: 12, mid: 0, front: 0 };

export function air(color: string, band: Band, extra = 0) {
  const p = AIR[band] + extra;
  return p > 0 ? `color-mix(in oklab, ${color} ${100 - p}%, var(--air))` : color;
}

/** Darker tone of a fill for the cut wall. */
export const edgeOf = (fill: string, amount = 30) => `color-mix(in oklab, ${fill} ${100 - amount}%, var(--pk-dark))`;

/** Texture tiles from scripts/gen-paper-textures.mjs (seamless, 256², RGBA fibres). */
const GRAIN: Record<Exclude<Material, 'none'>, string> = {
  cardstock: '/assets/papercraft/tex-cardstock.webp',
  kraft: '/assets/papercraft/tex-kraft.webp',
  cork: '/assets/papercraft/tex-cork.webp',
  wood: '/assets/papercraft/tex-wood.webp',
};

const BLUR = [1, 2, 4, 8, 14] as const;
const blurId = (sigma: number) => {
  let best = 0;
  for (let i = 1; i < BLUR.length; i += 1) if (Math.abs(BLUR[i] - sigma) < Math.abs(BLUR[best] - sigma)) best = i;
  return `pk-blur-${best}`;
};

/* Offsets travel as two small custom properties; scene.css turns them into a lit transform (.pk-*). */
const r2 = (v: number) => Math.round(v * 100) / 100;
const lit = (x: number, y: number) => ({ '--x': r2(x), '--y': r2(y) }) as CSSProperties;

export type SheetOptions = {
  d: string;
  fill: string;
  /** Distance (scene units) to the surface behind: drives shadow length and blur. 0 = no shadow. */
  gap?: number;
  /** Paper thickness in scene units (cut wall). */
  edge?: number;
  material?: Material;
  /** Light falloff across the face. */
  falloff?: boolean;
  /** Lit rim on the light-facing edges. */
  rim?: boolean;
  fillRule?: 'evenodd' | 'nonzero';
  opacity?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export type Kit = {
  sheet: (o: SheetOptions) => ReactNode;
  /** Stacked-contour volume: `layers` sheets, each `step` units lower and darker. */
  stack: (o: SheetOptions & { layers: number; step: number }) => ReactNode;
};

/** One kit per scene: unique, stable ids. */
export function paperKit(scope: string): Kit {
  let n = 0;

  const sheet = ({
    d,
    fill,
    gap = 0,
    edge = 2.5,
    material = 'cardstock',
    falloff = true,
    rim = true,
    fillRule,
    opacity,
    className,
    style,
    children,
  }: SheetOptions) => {
    n += 1;
    const id = `pk-${scope}-${n}`;
    const href = `#${id}`;
    const off = gap * 0.05;
    const sigma = 2 + gap * 0.03;
    return (
      <g key={id} className={className} opacity={opacity} style={style}>
        <defs>
          <path id={id} d={d} fillRule={fillRule} />
        </defs>
        {gap > 0 && (
          <>
            <use href={href} className="pk-pen" filter={`url(#${blurId(sigma)})`} style={lit(off, off * 1.25)} />
            <use href={href} className="pk-con" filter={`url(#${blurId(sigma / 4)})`} style={lit(off * 0.3, off * 0.4)} />
          </>
        )}
        {edge > 0 && <use href={href} className="pk-edge" fill={edgeOf(fill)} style={lit(edge * 0.55, edge)} />}
        <use href={href} fill={fill} />
        {falloff && <use href={href} className="pk-fall" />}
        {material !== 'none' && <use href={href} className="pk-grain" fill={`url(#pk-grain-${material})`} />}
        {rim && <use href={href} className="pk-rim" />}
        {children}
      </g>
    );
  };

  const stack: Kit['stack'] = ({ layers, step, ...o }) => {
    const out: ReactNode[] = [];
    for (let i = layers - 1; i >= 0; i -= 1) {
      out.push(
        <g key={`s${i}`} transform={`translate(0 ${i * step})`}>
          {sheet({ ...o, fill: i === 0 ? o.fill : edgeOf(o.fill, 8 + i * 7), gap: i === layers - 1 ? o.gap : step * 3 })}
        </g>,
      );
    }
    return <g key={`stack-${scope}-${n}`}>{out}</g>;
  };

  return { sheet, stack };
}

/** Shared definitions for every scene on the page: render once (PaperDefs). */
export function PaperDefs() {
  // The grain tiles are fetched through an SVG <image>, which the browser discovers late and loads
  // at low priority; the cardstock tile paints over the whole hero, so it is the page's LCP image.
  // Preloading it (high) and the desk's wood (default) lets them paint with the first frame (§9.6, v3.5).
  preload(GRAIN.cardstock, { as: 'image', fetchPriority: 'high' });
  preload(GRAIN.wood, { as: 'image' });
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute' }}>
      <defs>
        {BLUR.map((s, i) => (
          <filter key={s} id={`pk-blur-${i}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation={s} />
          </filter>
        ))}
        <linearGradient id="pk-fall-day" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--pk-light)', stopOpacity: 'var(--pk-fall)' }} />
          <stop offset="0.45" style={{ stopColor: 'var(--pk-light)', stopOpacity: 0 }} />
          <stop offset="1" style={{ stopColor: 'var(--pk-dark)', stopOpacity: 'var(--pk-fall)' }} />
        </linearGradient>
        <linearGradient id="pk-fall-night" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--pk-light)', stopOpacity: 'var(--pk-fall)' }} />
          <stop offset="0.45" style={{ stopColor: 'var(--pk-light)', stopOpacity: 0 }} />
          <stop offset="1" style={{ stopColor: 'var(--pk-dark)', stopOpacity: 'var(--pk-fall)' }} />
        </linearGradient>
        <linearGradient id="pk-rim-day" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--pk-light)', stopOpacity: 0.95 }} />
          <stop offset="0.5" style={{ stopColor: 'var(--pk-light)', stopOpacity: 0 }} />
        </linearGradient>
        <linearGradient id="pk-rim-night" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--pk-light)', stopOpacity: 0.85 }} />
          <stop offset="0.5" style={{ stopColor: 'var(--pk-light)', stopOpacity: 0 }} />
        </linearGradient>
        {Object.entries(GRAIN).map(([g, src]) => (
          // Drawn at 128 and scaled ×2: the same 256-unit grain on screen, but the tile is too small to
          // be the page's LCP element, so the hero h1 is (§9.6). Rasterised after the transform: no blur.
          <pattern key={g} id={`pk-grain-${g}`} patternUnits="userSpaceOnUse" width="128" height="128" patternTransform="scale(2)">
            <image href={src} width="128" height="128" />
          </pattern>
        ))}
      </defs>
    </svg>
  );
}

/* ---- Shape helpers (scene units) ---- */

export const rect = (x: number, y: number, w: number, h: number, r = 0) =>
  r > 0
    ? `M${x + r} ${y}H${x + w - r}Q${x + w} ${y} ${x + w} ${y + r}V${y + h - r}Q${x + w} ${y + h} ${x + w - r} ${y + h}H${x + r}Q${x} ${y + h} ${x} ${y + h - r}V${y + r}Q${x} ${y} ${x + r} ${y}Z`
    : `M${x} ${y}H${x + w}V${y + h}H${x}Z`;

export const poly = (pts: readonly (readonly [number, number])[]) => `M${pts.map(([x, y]) => `${x} ${y}`).join('L')}Z`;

export const circle = (cx: number, cy: number, r: number) =>
  `M${cx - r} ${cy}A${r} ${r} 0 1 0 ${cx + r} ${cy}A${r} ${r} 0 1 0 ${cx - r} ${cy}Z`;

export const ellipse = (cx: number, cy: number, rx: number, ry: number) =>
  `M${cx - rx} ${cy}A${rx} ${ry} 0 1 0 ${cx + rx} ${cy}A${rx} ${ry} 0 1 0 ${cx - rx} ${cy}Z`;

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Organic cut: subdivides a polygon's edges and jitters them (≤ jitter units), seeded. */
export function cut(pts: readonly (readonly [number, number])[], { jitter = 0.6, step = 18, seed = 1 } = {}) {
  const rand = rng(seed);
  const out: [number, number][] = [];
  for (let i = 0; i < pts.length; i += 1) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[(i + 1) % pts.length];
    const len = Math.hypot(x1 - x0, y1 - y0);
    const steps = Math.max(1, Math.round(len / step));
    const nx = -(y1 - y0) / (len || 1);
    const ny = (x1 - x0) / (len || 1);
    for (let s = 0; s < steps; s += 1) {
      const t = s / steps;
      const j = s === 0 ? 0 : (rand() * 2 - 1) * jitter;
      out.push([Math.round((x0 + (x1 - x0) * t + nx * j) * 10) / 10, Math.round((y0 + (y1 - y0) * t + ny * j) * 10) / 10]);
    }
  }
  return poly(out);
}
