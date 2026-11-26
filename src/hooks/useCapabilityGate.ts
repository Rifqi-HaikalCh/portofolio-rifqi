import { useEffect, useState } from 'react';

/*
  Decides, after hydration and when the browser is idle, whether the 3D figurine
  may load (DesignRules.md §9.3). Anything missing or unknown keeps the poster.
*/

type NavigatorHints = Navigator & {
  connection?: { saveData?: boolean };
  deviceMemory?: number;
};

function canRender3d(): boolean {
  if (window.innerWidth < 1024) return false;
  if (!window.matchMedia('(pointer: fine)').matches) return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;

  const nav = navigator as NavigatorHints;
  if (nav.connection?.saveData) return false;
  if (typeof nav.deviceMemory === 'number' && nav.deviceMemory < 4) return false;
  if (typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency < 4) return false;

  // Opt-out switch for testing the fallback: append ?webgl=off to the URL.
  if (new URLSearchParams(window.location.search).get('webgl') === 'off') return false;

  try {
    const probe = document.createElement('canvas').getContext('webgl2');
    if (!probe) return false;
    probe.getExtension('WEBGL_lose_context')?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export function useCapabilityGate(): boolean {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const decide = () => setAllowed(canRender3d());
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(decide, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(decide, 1200);
    return () => clearTimeout(id);
  }, []);

  return allowed;
}
