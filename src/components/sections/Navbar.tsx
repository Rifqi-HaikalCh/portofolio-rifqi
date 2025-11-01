'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useThemeAnimation } from '../shared/Providers';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { navLinks } from '../../data/portfolio';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { premiumEasing, navTransition } from '../../lib/optimized-animations';
import GooeyNav from '../shared/GooeyNav';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const { theme } = useTheme();
  const { toggleTheme } = useThemeAnimation();
  const { language, toggleLanguage, t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);
      
      // Show floating button on mobile when scrolled significantly
      setShowFloatingButton(scrollY > 300 && window.innerWidth < 1024);
    };
    
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShowFloatingButton(false);
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
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

  const gooeyNavItems = navLinks.map(link => ({
    label: language === 'en' ? link.labelEn : link.labelId,
    href: link.href
  }));

  const handleGooeyNavClick = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`hidden lg:block fixed top-0 left-0 w-full z-navigation transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="container mx-auto px-6">
        {/* Single Glassmorphic Container */}
        <div className="relative">
          {/* Glossy glow background */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 rounded-full blur-xl opacity-50" />

          {/* Main glassmorphic wrapper */}
          <div className={`relative flex items-center justify-between gap-4 px-6 py-3 rounded-full backdrop-blur-2xl shadow-xl border transition-all duration-500 ${
            scrolled
              ? 'bg-white/50 dark:bg-gray-900/60 border-white/20 dark:border-gray-700/30 shadow-2xl'
              : 'bg-white/40 dark:bg-gray-900/50 border-white/15 dark:border-gray-700/20'
          }`}>
            {/* Glossy overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/5 to-transparent dark:from-white/5 dark:via-transparent pointer-events-none rounded-full" />

            {/* Logo */}
            <Link href="#home" className="relative group flex-shrink-0 z-10">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent"
              >
                Rifqi Haikal
              </motion.div>
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-500"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </Link>

            {/* Center Navigation with GooeyNav */}
            <div className="flex-1 flex justify-center relative z-10">
              <GooeyNav
                items={gooeyNavItems}
                particleCount={12}
                particleDistances={[80, 8]}
                particleR={90}
                animationTime={500}
                timeVariance={250}
                colors={[1, 2, 3, 4]}
                initialActiveIndex={0}
                onItemClick={handleGooeyNavClick}
              />
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center gap-3 flex-shrink-0 relative z-10">
              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="relative w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 border border-gray-200/50 dark:border-gray-600/50 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <motion.div
                  key={theme}
                  initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 180, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3, type: "spring" }}
                  className="relative z-10"
                >
                  {theme === 'dark' ? (
                    <Sun size={18} className='text-yellow-500' />
                  ) : (
                    <Moon size={18} className='text-blue-600' />
                  )}
                </motion.div>
              </motion.button>

              {/* Language Toggle */}
              <motion.button
                onClick={toggleLanguage}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 border border-gray-200/50 dark:border-gray-600/50 shadow-md hover:shadow-lg font-bold text-xs transition-all duration-300 overflow-hidden group"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <span className="relative z-10 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">
                  {language === 'en' ? 'ID' : 'EN'}
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Glassmorphic Mobile Menu Button */}
      <div className="lg:hidden absolute top-4 right-4">
        <motion.button
          onClick={() => setMobileMenuOpen(true)}
          className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-white/80 to-white/60 dark:from-gray-800/80 dark:to-gray-800/60 backdrop-blur-xl border border-white/40 dark:border-gray-700/40 shadow-lg hover:shadow-xl text-gray-700 dark:text-gray-300 flex items-center justify-center transition-all duration-300 overflow-hidden group"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* Glossy overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/10 pointer-events-none" />

          {/* Glow effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <motion.div
            animate={mobileMenuOpen ? { rotate: 180 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            <Menu size={24} className="text-emerald-600 dark:text-emerald-400" />
          </motion.div>

          {/* Animated indicator */}
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full shadow-lg"
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
      
      {/* Enhanced Glassmorphic Floating Button for Mobile */}
      <AnimatePresence>
        {showFloatingButton && (
          <motion.button
            onClick={() => setMobileMenuOpen(true)}
            className="fixed top-6 right-6 z-[9996] lg:hidden w-16 h-16 rounded-2xl bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-800/90 dark:to-gray-800/70 backdrop-blur-2xl shadow-2xl hover:shadow-3xl flex items-center justify-center border-2 border-white/50 dark:border-gray-700/50 group overflow-hidden"
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            animate={{
              scale: 1,
              opacity: 1,
              rotate: 0,
              y: [0, -5, 0]
            }}
            exit={{ scale: 0, opacity: 0, rotate: 180 }}
            transition={{
              scale: { type: "spring", stiffness: 300, damping: 20 },
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{
              scale: 1.1,
              rotate: [0, -5, 5, 0]
            }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/20 to-transparent dark:from-white/20 dark:via-transparent pointer-events-none rounded-2xl" />

            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />

            {/* Menu icon */}
            <motion.div
              animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              <Menu size={28} className="text-emerald-600 dark:text-emerald-400" />
            </motion.div>

            {/* Pulse indicator */}
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-emerald-500/40"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.3, 0, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />

            {/* Status dot */}
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full border-2 border-white dark:border-gray-800 shadow-lg"
              animate={{
                scale: [1, 1.3, 1],
                boxShadow: [
                  "0 0 5px rgba(16, 185, 129, 0.5)",
                  "0 0 15px rgba(16, 185, 129, 0.8)",
                  "0 0 5px rgba(16, 185, 129, 0.5)"
                ]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;