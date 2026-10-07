'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useThemeAnimation } from '../shared/Providers';
import { useLanguage } from '../../context/LanguageContext';
import { navLinks } from '../../data/portfolio';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useStudio } from '../shared/StudioProvider';
import { BrandLockup } from '../shared/BrandLockup';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const { toggleTheme } = useThemeAnimation();
  const { language, toggleLanguage } = useLanguage();
  const { activeId } = useStudio();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  if (!mounted) return null;

  return (
    <header className="fixed top-0 inset-x-0 z-navigation bg-paper border-b border-line">
      <div className="relative max-w-6xl mx-auto px-5 lg:px-8 h-16 flex items-center">
        <Link
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          aria-label="Rifqi Haikal"
          className="relative z-10 inline-flex items-center"
        >
          <BrandLockup variant="mark" label="" className="h-8 w-auto sm:h-9" />
        </Link>

        <nav
          className="hidden lg:flex absolute inset-0 items-center justify-center gap-5 px-36 pointer-events-none"
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              aria-current={activeId === link.href.slice(1) ? 'location' : undefined}
              className={`pointer-events-auto whitespace-nowrap text-sm leading-none hover:text-ink ${
                activeId === link.href.slice(1) ? 'nav-current' : 'text-muted'
              }`}
            >
              {language === 'en' ? link.labelEn : link.labelId}
            </a>
          ))}
        </nav>

        <div className="relative z-10 ml-auto flex items-center gap-2">
          <div className="hidden sm:flex items-stretch border border-line">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="inline-flex h-9 w-9 items-center justify-center border-r border-line text-ink hover:bg-ink hover:text-paper"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label="Switch language"
              className="inline-flex h-9 min-w-9 px-2.5 items-center justify-center font-jetbrains-mono text-[11px] tracking-[0.14em] text-ink hover:bg-ink hover:text-paper"
            >
              {language === 'en' ? 'ID' : 'EN'}
            </button>
          </div>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden inline-flex h-9 w-9 items-center justify-center border border-line text-ink"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-line bg-paper">
          <nav className="max-w-6xl mx-auto px-5 py-3 flex flex-col" aria-label="Mobile">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                aria-current={activeId === link.href.slice(1) ? 'location' : undefined}
                className={`py-3 text-base border-b border-line last:border-b-0 ${
                  activeId === link.href.slice(1) ? 'text-accent' : 'text-ink'
                }`}
              >
                {language === 'en' ? link.labelEn : link.labelId}
              </a>
            ))}
            <div className="flex gap-2 py-4">
              <button
                type="button"
                onClick={toggleTheme}
                className="flex-1 h-10 border border-line text-sm text-ink"
              >
                {theme === 'dark' ? 'Light' : 'Dark'}
              </button>
              <button
                type="button"
                onClick={toggleLanguage}
                className="h-10 px-4 border border-line text-sm text-ink"
              >
                {language === 'en' ? 'Bahasa' : 'English'}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
