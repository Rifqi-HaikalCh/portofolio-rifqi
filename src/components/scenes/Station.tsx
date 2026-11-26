import type { ReactNode } from 'react';
import { PaperScene, type Frames, type SceneLayer } from './PaperScene';
import { ShadowBox } from './ShadowBox';

/*
  A station's scene (DesignRules.md §4.4, §7 Station): the shadow box, its layers,
  and the CSS that ties scene objects to the section's HTML controls (§4.3).
  Server Component; ShadowBox is the only client leaf.
*/
export function Station({
  name,
  layers,
  frames,
  light,
  css,
  children,
  className = '',
  only,
}: {
  name: string;
  layers: SceneLayer[];
  frames: Frames;
  light?: 'morning' | 'midday' | 'afternoon' | 'golden';
  css?: string;
  /** HTML at the z = 0 plane. */
  children?: ReactNode;
  className?: string;
  /** Render only these layers (a chapter's occluder copy, §4.4 step 7); drops the HTML and state CSS. */
  only?: readonly string[];
}) {
  const shown = only ? layers.filter((layer) => only.includes(layer.id)) : layers;
  return (
    <ShadowBox className={`station ${className}`} light={light}>
      <PaperScene layers={shown} frames={frames} label={name} lazy>
        {only ? null : children}
      </PaperScene>
      {css && !only && <style>{css}</style>}
    </ShadowBox>
  );
}
