"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useLanguage } from '../../context/LanguageContext';
import { navLinks } from '../../data/portfolio';
import { Menu, X, Sun, Moon, Code } from 'lucide-react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 sm:py-4">
          {/* Logo */}
          <Link 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2 text-emerald-500 font-bold text-xl sm:text-2xl hover:scale-105 transition-transform"
          >
            <i className="fas fa-code"></i>
            <span>Rifqi Haikal</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative font-medium text-gray-900 dark:text-white hover:text-emerald-500 transition-colors after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-1/2 after:bg-emerald-500 after:transition-all after:duration-300 hover:after:w-full hover:after:left-0"
              >
                {language === 'en' ? link.labelEn : link.labelId}
              </Link>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 transition-all hover:-translate-y-0.5"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-emerald-500 text-white font-medium text-sm sm:text-base hover:bg-emerald-600 transition-all hover:-translate-y-0.5"
            >
              {language === 'en' ? 'ID' : 'EN'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-900 dark:text-white hover:text-emerald-500 transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden fixed top-0 right-0 h-screen w-72 sm:w-80 bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="p-4 sm:p-6 pt-16 sm:pt-20">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-medium text-lg text-gray-900 dark:text-white hover:text-emerald-500 transition-colors py-2"
                >
                  {language === 'en' ? link.labelEn : link.labelId}
                </Link>
              ))}

              <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 transition-all"
                >
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <button
                  onClick={toggleLanguage}
                  className="px-4 py-2 rounded-full bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-all"
                >
                  {language === 'en' ? 'ID' : 'EN'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;