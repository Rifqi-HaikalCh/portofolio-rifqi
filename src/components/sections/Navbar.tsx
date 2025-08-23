'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useThemeAnimation } from '../shared/Providers';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { navLinks } from '../../data/portfolio';
import { Menu, X, Sun, Moon } from 'lucide-react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const { toggleTheme } = useThemeAnimation();
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
      className={`fixed top-0 left-0 w-full z-[9997] transition-all duration-300 ${scrolled ? 'py-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg' : 'py-5 bg-transparent'}`}
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
            onClick={toggleTheme} 
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
        {/* Enhanced Mobile Menu Button */}
        <motion.button 
          onClick={() => setMobileMenuOpen(true)} 
          className="lg:hidden relative w-12 h-12 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-glow"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={mobileMenuOpen ? { rotate: 180 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Menu size={24} />
          </motion.div>
          
          {/* Animated indicator */}
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.button>
      </div>
      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99998] lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30, duration: 0.4 }}
              className="fixed top-0 right-0 h-full w-80 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-2xl z-[99999] lg:hidden overflow-hidden"
            >
              {/* Animated Background Elements */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <motion.div
                  className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"
                  animate={{
                    scale: [1, 0.8, 1],
                    x: [0, 10, 0]
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
              
              {/* Header */}
              <div className="relative z-10 p-8 border-b border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center justify-between">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                  >
                    <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                      Menu
                    </h3>
                  </motion.div>
                  
                  <motion.button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-emerald-500 hover:text-white transition-all duration-300 shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <X size={24} />
                  </motion.button>
                </div>
              </div>
              
              {/* Navigation Links */}
              <div className="relative z-10 p-8 flex flex-col gap-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ 
                      delay: 0.1 + index * 0.1,
                      type: "spring",
                      stiffness: 300,
                      damping: 24
                    }}
                  >
                    <Link 
                      href={link.href} 
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="group flex items-center gap-4 p-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30 hover:bg-emerald-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-glow"
                    >
                      <motion.div
                        className="w-2 h-2 rounded-full bg-emerald-500 group-hover:bg-white"
                        whileHover={{ scale: 1.5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      />
                      <span className="font-semibold text-lg text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors">
                        {language === 'en' ? link.labelEn : link.labelId}
                      </span>
                      <motion.div
                        className="ml-auto opacity-0 group-hover:opacity-100"
                        initial={{ x: -10 }}
                        whileHover={{ x: 0 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              {/* Bottom Controls */}
              <div className="relative z-10 absolute bottom-0 left-0 right-0 p-8 border-t border-gray-200/50 dark:border-gray-700/50">
                <div className="flex gap-4">
                  {/* Theme Toggle */}
                  <motion.button 
                    onClick={toggleTheme} 
                    className="flex-1 h-14 rounded-2xl bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-glow flex items-center justify-center gap-3"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.div
                      key={theme}
                      initial={{ rotate: -180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </motion.div>
                    <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
                  </motion.button>
                  
                  {/* Language Toggle */}
                  <motion.button 
                    onClick={toggleLanguage} 
                    className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-gray-800 hover:bg-emerald-500 text-gray-700 dark:text-gray-300 hover:text-white font-bold transition-all duration-300 shadow-lg hover:shadow-glow flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    {language === 'en' ? 'ID' : 'EN'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;