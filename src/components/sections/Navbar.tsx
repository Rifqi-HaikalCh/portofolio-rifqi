'use client';

import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from 'react';
import { useHydrated } from '../../hooks/useHydrated';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useThemeToggle } from '../shared/Providers';
import { useLanguage } from '../../context/LanguageContext';
import { pageSections } from '../../data/sections';
import { useStudio, scrollToStudioSection } from '../shared/StudioProvider';
import { BrandLockup } from '../shared/BrandLockup';
import { T } from '../ui/T';

/*
  Paper top bar (DesignRules.md §4 Navbar). Renders on the server so the first
  paint has navigation; the theme icon swaps through the `dark` class, never
  through hydration state, so nothing flashes.
*/
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useThemeToggle();
  const hydrated = useHydrated();
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Escape closes the menu; Tab cycles inside the bar and the open menu (§14.2).
  const onMenuKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!menuOpen) return;
    if (event.key === 'Escape') {
      setMenuOpen(false);
      menuButtonRef.current?.focus();
      return;
    }
    if (event.key !== 'Tab' || !headerRef.current) return;
    const stops = Array.from(
      headerRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
    ).filter((node) => node.offsetParent !== null);
    const first = stops[0];
    const last = stops[stops.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  useEffect(() => {
    if (!menuOpen) return undefined;
    const close = () => setMenuOpen(false);
    const wide = window.matchMedia('(min-width: 1024px)');
    wide.addEventListener('change', close);
    return () => wide.removeEventListener('change', close);
  }, [menuOpen]);
  const { language, toggleLanguage, say } = useLanguage();
  const { activeId } = useStudio();

  const go = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    scrollToStudioSection(id);
    history.replaceState(null, '', `#${id}`);
    setMenuOpen(false);
  };

  const links = pageSections.slice(1);

  return (
    <header ref={headerRef} onKeyDown={onMenuKeyDown} className="fixed inset-x-0 top-0 z-chrome border-b border-line bg-paper">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center px-5 lg:px-8">
        <a href="#home" onClick={(event) => go(event, 'home')} aria-label="Rifqi Haikal, home" className="inline-flex min-h-11 items-center">
          <BrandLockup variant="mark" label="" className="h-8 w-auto sm:h-9" />
        </a>

        <nav className="hidden flex-1 items-center justify-center gap-6 lg:flex" aria-label={say('Primary', 'Utama')}>
          {links.map((section) => {
            const here = activeId === section.id;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(event) => go(event, section.id)}
                aria-current={here ? 'location' : undefined}
                className={`inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap text-sm ${here ? 'nav-current' : 'text-muted hover:text-ink'}`}
              >
                <span className="font-mono text-[10px] text-accent" aria-hidden="true">
                  {section.index}
                </span>
                <T en={section.en} id={section.idn} />
              </a>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <div className="hidden items-stretch border border-line sm:flex">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={say('Dark mode', 'Mode gelap')}
              aria-pressed={hydrated ? isDark : undefined}
              className="inline-flex h-11 w-11 items-center justify-center border-r border-line text-ink hover:bg-ink hover:text-paper"
            >
              <Moon size={16} className="dark:hidden" aria-hidden="true" />
              <Sun size={16} className="hidden dark:block" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label={say('Baca dalam Bahasa Indonesia', 'Read in English')}
              className="inline-flex h-11 min-w-11 items-center justify-center px-2.5 font-mono text-[11px] tracking-[0.14em] text-ink hover:bg-ink hover:text-paper"
            >
              {language === 'en' ? 'ID' : 'EN'}
            </button>
          </div>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? say('Close menu', 'Tutup menu') : say('Open menu', 'Buka menu')}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="inline-flex h-11 w-11 items-center justify-center border border-line text-ink lg:hidden"
          >
            {menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div id="mobile-nav" hidden={!menuOpen} className="border-t border-line bg-paper lg:hidden">
        <nav className="mx-auto flex max-w-6xl flex-col px-5 py-3" aria-label={say('Mobile', 'Seluler')}>
          {links.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={(event) => go(event, section.id)}
              aria-current={activeId === section.id ? 'location' : undefined}
              className={`flex min-h-12 items-center gap-3 border-b border-line text-base last:border-b-0 ${
                activeId === section.id ? 'text-accent' : 'text-ink'
              }`}
            >
              <span className="font-mono text-xs text-accent" aria-hidden="true">
                {section.index}
              </span>
              <T en={section.en} id={section.idn} />
            </a>
          ))}
          <div className="flex gap-2 py-4">
            <button type="button" onClick={toggleTheme} className="h-11 flex-1 border border-line text-sm text-ink">
              <span className="dark:hidden">
                <T en="Dark mode" id="Mode gelap" />
              </span>
              <span className="hidden dark:inline">
                <T en="Light mode" id="Mode terang" />
              </span>
            </button>
            <button type="button" onClick={toggleLanguage} className="h-11 border border-line px-4 text-sm text-ink">
              {language === 'en' ? 'Bahasa' : 'English'}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
