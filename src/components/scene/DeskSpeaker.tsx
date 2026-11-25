'use client';

import { useSyncExternalStore, type CSSProperties } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useHydrated } from '../../hooks/useHydrated';
import { setSound, soundServerSnapshot, soundSnapshot, subscribeSound } from '../../lib/sound/control';
import { SPEAKER } from './stage-geometry';

/*
  v3.13 (owner: "a hint to turn the sound on, or a speaker asset you can
  interact with"). The paper speaker on the desk is the sound switch, the
  same switch as the navbar icon (§10.4: sound stays off until the visitor
  asks). The cabinet is the speaker layer of the Desk station; this is the
  transparent hit area over it (.scene-hit), with the moving parts drawn in
  world units on top: the woofer cone pumps and paper sound waves ripple out
  while the sound is on. Until sound has been on once this visit, a pulsing
  ring and a paper tag say it can be tapped, like the lamp (DeskLamp).
*/

const USED = 'studio-speaker-used';
const EVENT = 'studio:speaker-used';

function wasUsed() {
  try {
    return sessionStorage.getItem(USED) === '1';
  } catch {
    return false;
  }
}

function subscribeUsed(fn: () => void) {
  window.addEventListener(EVENT, fn);
  return () => window.removeEventListener(EVENT, fn);
}

const VIEW = `${SPEAKER.x} ${SPEAKER.y} ${SPEAKER.w} ${SPEAKER.h}`;

export function DeskSpeaker({ style, className = '' }: { style: CSSProperties; className?: string }) {
  const { say } = useLanguage();
  const hydrated = useHydrated();
  const on = useSyncExternalStore(subscribeSound, soundSnapshot, soundServerSnapshot);
  const used = useSyncExternalStore(subscribeUsed, wasUsed, () => true);

  const tap = () => {
    setSound(!on);
    try {
      sessionStorage.setItem(USED, '1');
    } catch {
      /* private mode */
    }
    window.dispatchEvent(new Event(EVENT));
  };

  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? say('Turn the sound off', 'Matikan suara') : say('Turn the sound on', 'Nyalakan suara')}
      data-sound="none"
      data-on={on || undefined}
      onClick={tap}
      className={`desk-speaker scene-hit z-scene-front bg-transparent ${className}`}
      style={style}
    >
      <svg viewBox={VIEW} className="speaker-live" aria-hidden="true">
        <g className="speaker-waves" fill="none" stroke="var(--color-accent)" strokeWidth="4.5" strokeLinecap="round">
          <path d="M1240 500Q1286 476 1332 500" />
          <path d="M1230 484Q1286 454 1342 484" />
          <path d="M1220 468Q1286 432 1352 468" />
        </g>
        <g className="speaker-cone">
          <circle cx="1286" cy="590" r="19" fill="var(--ill-bezel)" />
          <circle cx="1286" cy="590" r="7" fill="var(--ill-laptop)" />
        </g>
        <rect className="speaker-led" x="1252" y="620" width="10" height="3" fill="var(--color-sage)" />
      </svg>
      {hydrated && !used && !on && (
        <span className="lamp-hint speaker-hint" aria-hidden="true">
          <span className="lamp-ping" />
          <span className="lamp-tag">{say('Tap for sound', 'Ketuk untuk suara')}</span>
        </span>
      )}
    </button>
  );
}
