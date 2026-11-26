'use client';

import dynamic from 'next/dynamic';

/*
  EQbot and its script (~70 KB of source) load after hydration in their own
  chunk, so the first-load bundle carries only this loader.
*/
const EqbotCompanion = dynamic(() => import('./EqbotCompanion').then((mod) => mod.EqbotCompanion), { ssr: false });

export function EqbotLoader() {
  return <EqbotCompanion />;
}
