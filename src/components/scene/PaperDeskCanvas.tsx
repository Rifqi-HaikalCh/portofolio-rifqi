'use client';

import { Component, useEffect, useState, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { FigurineModel, type FigurinePalette } from './figurine-model';

/*
  R3F view of the figurine (DesignRules.md §9.3). Loaded only through
  next/dynamic after the capability gate passes. Renders on demand: a frame is
  drawn when the theme changes or during the one-off head turn, never in a loop.
  Any error or a lost WebGL context calls onFail, and the poster stays.
*/

function readPalette(): { palette: FigurinePalette; lightX: number } {
  const css = getComputedStyle(document.documentElement);
  const v = (name: string) => css.getPropertyValue(name).trim();
  const dark = document.documentElement.classList.contains('dark');
  return {
    lightX: Number(v('--light-x')) || 1,
    palette: {
      skin: v('--ill-skin'),
      skinShade: v('--ill-skin-shade'),
      hair: v('--ill-hair'),
      hairHi: v('--ill-hair-hi'),
      shirt: v('--ill-shirt'),
      denim: v('--ill-denim'),
      denimFade: v('--ill-denim-fade'),
      sneaker: v('--ill-sneaker'),
      sole: v('--ill-sole'),
      page: v('--ill-page'),
      shadow: v('--ill-hair'),
      shadowOpacity: dark ? 0.5 : 0.18,
      light: dark ? v('--ill-bulb') : v('--ill-frame'),
    },
  };
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
        camera={{ near: 1, far: 2000, position: [0, 230, 600] }}
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
