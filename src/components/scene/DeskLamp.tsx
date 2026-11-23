'use client';

import { useLanguage } from '../../context/LanguageContext';
import { useHydrated } from '../../hooks/useHydrated';
import { useThemeToggle } from '../shared/Providers';
import type { CSSProperties } from 'react';

/*
  The desk lamp is the theme switch (DesignRules.md §2.2, §4 `01`).
  The artwork is the lamp layer of the Desk station; this is the transparent hit
  area over it, placed by the station with frame variables (.scene-hit).
  Same action as the navbar toggle.
*/

export function DeskLamp({ style }: { style: CSSProperties }) {
  const { language } = useLanguage();
  const say = (en: string, id: string) => (language === 'en' ? en : id);
  const { isDark, toggleTheme } = useThemeToggle();
  const hydrated = useHydrated();
  const on = hydrated && isDark;

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
      onClick={toggleTheme}
      className="desk-lamp scene-hit z-scene-front bg-transparent"
      style={style}
    />
  );
}
