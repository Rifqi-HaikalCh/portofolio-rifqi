import type { CSSProperties, ReactNode } from 'react';
import type { Band } from '../../lib/paper-kit';
import { svgString } from '../../lib/paper-kit/svg-string';

/*
  PaperScene — 2D paper layers at real depths (DesignRules.md §9.1–§9.2).

  Each layer sits at a depth z (scene units; P = 1400 is the camera distance).
  The projection is solved per layer instead of with a CSS 3D context: a camera
  shift moves a layer by k = z / (P − z) of the shift, so the z = 0 plane (the
  laptop, its HTML screen, the lamp button) never moves, far layers move with
  the camera and near layers against it. Same picture as a perspective camera,
  but only `translate`/`transform` on flat layers: compositor-friendly, no
  preserve-3d flattening, and the flat fallback is the authored composition.

  Layer boxes are cropped to their art (GPU memory, §9.2) and placed in % of
  the active frame: `desktop` ≥ 768 px, `mobile` below. Layer art is static,
  so it ships as markup (svgString) that React never hydrates.
*/

export const PERSPECTIVE = 1400;

export type Rect = { x: number; y: number; w: number; h: number };

export type SceneLayer = {
  id: string;
  band: Band | 'frame';
  z: number;
  box: Rect;
  /** SVG children in world coordinates. */
  art?: ReactNode;
  /** HTML children, laid over the box (e.g. the figurine slot). */
  html?: ReactNode;
  className?: string;
  /** Hide below 768 px (outside the mobile frame). */
  desktopOnly?: boolean;
};

export type Frames = { desktop: Rect; mobile: Rect };

const pct = (v: number) => `${Math.round(v * 10000) / 100}%`;

/** Percent placement of a world rect inside both frames, as CSS variables. */
export function frameVars(r: Rect, frames: Frames): CSSProperties {
  const { desktop: d, mobile: m } = frames;
  return {
    '--l': pct((r.x - d.x) / d.w),
    '--t': pct((r.y - d.y) / d.h),
    '--w': pct(r.w / d.w),
    '--h': pct(r.h / d.h),
    '--lm': pct((r.x - m.x) / m.w),
    '--tm': pct((r.y - m.y) / m.h),
    '--wm': pct(r.w / m.w),
    '--hm': pct(r.h / m.h),
  } as CSSProperties;
}

/** Static markup for server-made art inside HTML (station figures): painted, never hydrated (§9.6). */
export function StaticArt({ node, className }: { node: ReactNode; className?: string }) {
  return <div className={className} aria-hidden="true" dangerouslySetInnerHTML={{ __html: svgString(node) }} />;
}

export function depthFactor(z: number) {
  return Math.round((z / (PERSPECTIVE - z)) * 10000) / 10000;
}

export function PaperScene({
  layers,
  frames,
  children,
  label,
  lazy = false,
}: {
  layers: SceneLayer[];
  frames: Frames;
  /** HTML at the z = 0 plane (buttons over art), placed with frameVars. */
  children?: ReactNode;
  label?: string;
  /** Skip painting while far off screen (content-visibility, §9.2). Not for the hero. */
  lazy?: boolean;
}) {
  const style = {
    '--aspect': `${frames.desktop.w} / ${frames.desktop.h}`,
    '--aspect-m': `${frames.mobile.w} / ${frames.mobile.h}`,
  } as CSSProperties;

  return (
    <div className={`scene-viewport ${lazy ? 'scene-lazy' : ''}`} style={style} data-scene={label}>
      {layers.map((layer) => (
        <div
          key={layer.id}
          className={`scene-layer ${layer.desktopOnly ? 'scene-desktop-only' : ''} ${layer.className ?? ''}`}
          data-band={layer.band}
          data-layer={layer.id}
          style={{ ...frameVars(layer.box, frames), '--k': depthFactor(layer.z) } as CSSProperties}
          aria-hidden={layer.html ? undefined : true}
        >
          {layer.art && (
            <svg
              viewBox={`${layer.box.x} ${layer.box.y} ${layer.box.w} ${layer.box.h}`}
              className="absolute inset-0 h-full w-full overflow-visible"
              aria-hidden="true"
              focusable="false"
              dangerouslySetInnerHTML={{ __html: svgString(layer.art) }}
            />
          )}
          {layer.html}
        </div>
      ))}
      <span className="shadowbox-frame" aria-hidden="true" />
      {children}
    </div>
  );
}
