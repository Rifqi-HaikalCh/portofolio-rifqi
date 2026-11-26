'use client';

import { useSyncExternalStore, type CSSProperties, type MouseEvent } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useHydrated } from '../../hooks/useHydrated';
import { useThemeToggle } from '../shared/Providers';

/*
  The desk lamp is the theme switch (DesignRules.md §2.2, §4 `01`).
  The artwork is the lamp layer of its station; this is the transparent hit
  area over it, placed by the station with frame variables (.scene-hit).
  Same action as the navbar toggle. Used by the Desk (`01`) and, from v3.10,
  the Mail Tray (`06`).

  v3.10 (owner): until a lamp has been switched once this visit, a paper tag
  with a pulsing ring says it can be tapped; each tap makes the lamp nod
  (`data-lamp-tap` on its scene for 650 ms, scene.css).
*/

const USED = 'studio-lamp-used';
const EVENT = 'studio:lamp-used';

function wasUsed() {
  try {
    return sessionStorage.getItem(USED) === '1';
  } catch {
    return false;
  }
}

function subscribe(fn: () => void) {
  window.addEventListener(EVENT, fn);
  return () => window.removeEventListener(EVENT, fn);
}

export function DeskLamp({
  style,
  className = '',
  pointerOnly = false,
}: {
  style: CSSProperties;
  className?: string;
  /** Inside an `aria-hidden` chapter stage: a pointer target only; the navbar and footer switches serve the keyboard. */
  pointerOnly?: boolean;
}) {
  const { say } = useLanguage();
  const { isDark, toggleTheme } = useThemeToggle();
  const hydrated = useHydrated();
  const on = hydrated && isDark;
  const used = useSyncExternalStore(subscribe, wasUsed, () => true);

  const tap = (event: MouseEvent<HTMLButtonElement>) => {
    toggleTheme();
    const scene = event.currentTarget.closest<HTMLElement>('.chapter, .shadowbox');
    if (scene) {
      scene.dataset.lampTap = '';
      window.setTimeout(() => delete scene.dataset.lampTap, 650);
    }
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
      aria-label={
        on
          ? say('Turn desk lamp off (light theme)', 'Matikan lampu meja (tema terang)')
          : say('Turn desk lamp on (dark theme)', 'Nyalakan lampu meja (tema gelap)')
      }
      data-sound="lamp"
      tabIndex={pointerOnly ? -1 : undefined}
      onClick={tap}
      className={`desk-lamp scene-hit z-scene-front bg-transparent ${className}`}
      style={style}
    >
      {hydrated && !used && (
        <span className="lamp-hint" aria-hidden="true">
          <span className="lamp-ping" />
          <span className="lamp-tag">{on ? say('Tap: lights on', 'Ketuk: nyalakan terang') : say('Tap the lamp', 'Ketuk lampunya')}</span>
        </span>
      )}
    </button>
  );
}
