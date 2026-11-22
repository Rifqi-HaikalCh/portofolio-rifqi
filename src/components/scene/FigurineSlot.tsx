'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useCapabilityGate } from '../../hooks/useCapabilityGate';
import { RifqiFigurine } from './RifqiFigurine';

/*
  The figurine's place on the stage. The SVG poster renders first and stays as
  the fallback; on capable desktops the 3D view loads after idle and fades in
  over the poster with identical framing, so nothing shifts (DesignRules.md §9.3).
*/

const PaperDeskCanvas = dynamic(() => import('./PaperDeskCanvas'), { ssr: false });

export function FigurineSlot({ title }: { title: string }) {
  const allowed = useCapabilityGate();
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const live = allowed && !failed;
  const shown = live && ready;

  return (
    <div className="relative h-full w-full" role="img" aria-label={title}>
      <RifqiFigurine
        className="absolute inset-0 h-full w-full transition-opacity duration-(--dur-ui)"
        style={{ opacity: shown ? 0 : 1 }}
      />
      {live && (
        <div
          className="absolute inset-0 transition-opacity duration-(--dur-ui)"
          style={{ opacity: shown ? 1 : 0 }}
          data-figurine="3d"
        >
          <PaperDeskCanvas onReady={() => setReady(true)} onFail={() => setFailed(true)} />
        </div>
      )}
    </div>
  );
}
