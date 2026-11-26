'use client';

import { Component, useEffect, useState, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { FigurineModel, type FigurinePalette, type Swatch } from './figurine-model';

/*
  R3F view of the paper puppet (DesignRules.md §9.3). Loaded only through
  next/dynamic after the capability gate passes. Renders on demand: a frame is
  drawn when the theme changes or while a clip runs, never in a loop.
  Any error or a lost WebGL context calls onFail, and the poster stays.
*/

const INKS: Record<keyof FigurinePalette, string> = {
  skin: '--ill-skin',
  'skin-shade': '--ill-skin-shade',
  hair: '--ill-hair',
  'hair-hi': '--ill-hair-hi',
  shirt: '--ill-shirt',
  denim: '--ill-denim',
  'denim-fade': '--ill-denim-fade',
  sneaker: '--ill-sneaker',
  sole: '--ill-sole',
  page: '--ill-page',
  eye: '--ill-eye',
  fold: '--paper-fold',
  cut: '--paper-cut',
  shadow: '--paper-shadow',
};

/*
  Token value → colour + alpha. Browsers may serialise a token as #rrggbb,
  #rrggbbaa (Chrome does this for rgb(… / a)) or rgb(r g b / a).
*/
function swatch(value: string): Swatch {
  const hex = value.match(/^#([\da-f]{3,8})$/i)?.[1];
  if (hex && (hex.length === 4 || hex.length === 8)) {
    const full = hex.length === 4 ? [...hex].map((c) => c + c).join('') : hex;
    return { color: `#${full.slice(0, 6)}`, alpha: parseInt(full.slice(6, 8), 16) / 255 };
  }
  const rgb = value.match(/rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:\s*[/,]\s*([\d.]+%?))?/);
  if (rgb) {
    const alpha = rgb[4] ? (rgb[4].endsWith('%') ? parseFloat(rgb[4]) / 100 : Number(rgb[4])) : 1;
    return { color: `rgb(${rgb[1]}, ${rgb[2]}, ${rgb[3]})`, alpha };
  }
  return { color: value || 'black', alpha: 1 };
}

function readPalette(): { palette: FigurinePalette; lightX: number } {
  const css = getComputedStyle(document.documentElement);
  const palette = Object.fromEntries(
    Object.entries(INKS).map(([key, token]) => [key, swatch(css.getPropertyValue(token).trim())]),
  ) as FigurinePalette;
  return { lightX: Number(css.getPropertyValue('--light-x').trim()) || 1, palette };
}

/* Re-reads the token palette whenever the theme class on <html> changes. */
function useScenePalette() {
  const [state, setState] = useState(readPalette);
  useEffect(() => {
    const observer = new MutationObserver(() => setState(readPalette()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  return state;
}

class SceneBoundary extends Component<{ onFail: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onFail();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function PaperDeskCanvas({ onReady, onFail }: { onReady: () => void; onFail: () => void }) {
  const { palette, lightX } = useScenePalette();

  return (
    <SceneBoundary onFail={onFail}>
      <Canvas
        orthographic
        flat
        frameloop="demand"
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        camera={{ near: 1, far: 2000, position: [140, -200, 600] }}
        aria-hidden="true"
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', onFail, { once: true });
          requestAnimationFrame(onReady);
        }}
      >
        <FigurineModel palette={palette} lightX={lightX} />
      </Canvas>
    </SceneBoundary>
  );
}
