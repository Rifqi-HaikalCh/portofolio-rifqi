'use client';

import { useLanguage } from '../../context/LanguageContext';
import { useHydrated } from '../../hooks/useHydrated';
import { useThemeToggle } from '../shared/Providers';
import { LAMP, STAGE, stageBox, type StageRect } from './stage-geometry';

/*
  The desk lamp is the theme switch (DesignRules.md §2.2, §4 `01`).
  The artwork lives in LampArt; this is the transparent hit area over it.
  Same action as the navbar toggle.
*/

export function DeskLamp({
  rect = LAMP,
  stage = STAGE,
}: {
  rect?: StageRect;
  stage?: { width: number; height: number };
} = {}) {
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
      onClick={toggleTheme}
      className="desk-lamp absolute z-scene-front bg-transparent"
      style={stageBox(rect, stage)}
    />
  );
}
