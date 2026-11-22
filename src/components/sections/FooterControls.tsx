'use client';

import { useThemeToggle } from '../shared/Providers';
import { useLanguage } from '../../context/LanguageContext';
import { T } from '../ui/T';

/* Theme and language switches repeated at the foot of the page. */
export function FooterControls() {
  const { toggleTheme } = useThemeToggle();
  const { language, toggleLanguage } = useLanguage();
  const button = 'inline-flex min-h-11 items-center border border-paper/30 px-4 text-sm text-paper hover:border-paper';

  return (
    <div className="flex flex-wrap gap-2">
      <button type="button" onClick={toggleTheme} className={button}>
        <span className="dark:hidden">
          <T en="Turn the lamp on (dark)" id="Nyalakan lampu (gelap)" />
        </span>
        <span className="hidden dark:inline">
          <T en="Turn the lamp off (light)" id="Matikan lampu (terang)" />
        </span>
      </button>
      <button type="button" onClick={toggleLanguage} lang={language === 'en' ? 'id' : 'en'} className={button}>
        {language === 'en' ? 'Baca dalam Bahasa Indonesia' : 'Read in English'}
      </button>
    </div>
  );
}
