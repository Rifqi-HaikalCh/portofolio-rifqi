'use client';

import dynamic from 'next/dynamic';
import { useState, type ReactNode } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useCapabilityGate } from '../../hooks/useCapabilityGate';

/*
  The figurine's place on the stage. The SVG poster renders first and stays as
  the fallback; on capable desktops the 3D view loads after idle and fades in
  over the poster with identical framing, so nothing shifts (DesignRules.md §9.4).
  The poster arrives as a server-rendered node, so the puppet data stays out of
  the client bundle.
*/

const PaperDeskCanvas = dynamic(() => import('./PaperDeskCanvas'), { ssr: false });

export function FigurineSlot({ title, poster }: { title?: string; poster: ReactNode }) {
  const { language } = useLanguage();
  const label = title ?? (language === 'en' ? 'Paper figurine of Rifqi at his desk' : 'Figur kertas Rifqi di mejanya');
  const allowed = useCapabilityGate();
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const live = allowed && !failed;
  const shown = live && ready;

  return (
    <div className="relative h-full w-full" role="img" aria-label={label} style={{ filter: 'var(--figure-rim)' }}>
      <div
        className="absolute inset-0 transition-opacity duration-(--dur-ui)"
        style={{ opacity: shown ? 0 : 1 }}
        aria-hidden="true"
      >
        {poster}
      </div>
      {live && (
        <div
          className="absolute inset-0 transition-opacity duration-(--dur-ui)"
          style={{ opacity: shown ? 1 : 0, filter: 'var(--paper-drop-sm)' }}
          data-figurine="3d"
        >
          <PaperDeskCanvas onReady={() => setReady(true)} onFail={() => setFailed(true)} />
        </div>
      )}
    </div>
  );
}
