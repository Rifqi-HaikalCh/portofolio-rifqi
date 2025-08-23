'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { navLinks } from '../../data/portfolio';
import { Menu, X, Sun, Moon } from 'lucide-react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
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
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg' : 'py-5 bg-transparent'}`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="#home" className="text-xl font-bold text-gray-900 dark:text-white hover:text-primary-green transition-colors">
          Rifqi Haikal
        </Link>
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="font-medium text-gray-700 dark:text-gray-300 hover:text-primary-green transition-colors">
              {language === 'en' ? link.labelEn : link.labelId}
            </Link>
          ))}
          <motion.button 
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.9 }}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
            className="w-10 h-10 rounded-full flex items-center justify-center bg-primary-green hover:bg-secondary-green transition-all duration-300 shadow-lg"
          >
            <motion.div
              key={theme}
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {theme === 'dark' ? <Sun size={20} className='text-white' /> : <Moon size={20} className='text-white' />}
            </motion.div>
          </motion.button>
          <button onClick={toggleLanguage} className="w-10 h-10 rounded-full flex items-center justify-center bg-primary-green hover:bg-secondary-green font-bold text-white transition-all duration-300 shadow-lg">
            {language === 'en' ? 'ID' : 'EN'}
          </button>
        </div>
        <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden text-gray-900 dark:text-white">
          <Menu size={28} />
        </button>
      </div>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-64 bg-gray-800/90 backdrop-blur-lg p-8 lg:hidden"
          >
            <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-6 text-white">
              <X size={28} />
            </button>
            <div className="flex flex-col gap-6 mt-12">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="font-medium text-xl text-gray-300 hover:text-white transition-colors">
                  {language === 'en' ? link.labelEn : link.labelId}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;