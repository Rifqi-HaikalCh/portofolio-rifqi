"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useThemeAnimation } from '../shared/Providers';
import { useLanguage } from '../../context/LanguageContext';
import { navLinks } from '../../data/portfolio';
import { Menu, X, Sun, Moon, Sparkles, Zap, Home, User, Code, Briefcase, FolderOpen, Award, Mail } from 'lucide-react';

const iconMap: { [key: string]: any } = {
  '#home': Home,
  '#about': User,
  '#skills': Code,
  '#experience': Briefcase,
  '#projects': FolderOpen,
  '#certificates': Award,
  '#contact': Mail,
};

export const InnovativeMobileNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();
  const { toggleTheme } = useThemeAnimation();
  const { language, toggleLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldShow = window.innerWidth < 1024 && scrollY > 50; // Show earlier for better UX
      setIsVisible(shouldShow);
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsVisible(false);
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleScroll(); // Initial check

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
      setIsOpen(false);
    }
  };

  const floatingButtonVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0,
      rotate: -180,
      y: 100 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.2
      }
    },
    exit: {
      opacity: 0,
      scale: 0,
      rotate: 180,
      y: 100,
      transition: {
        duration: 0.3
      }
    }
  };

  const sidebarVariants = {
    closed: {
      x: '100%',
      opacity: 0,
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: {
      x: '100%',
      opacity: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    closed: {
      x: 100,
      opacity: 0,
      scale: 0.8,
      rotate: 10
    },
    open: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    },
    exit: {
      x: 100,
      opacity: 0,
      scale: 0.8,
      rotate: -10,
      transition: {
        duration: 0.2
      }
    }
  };

  if (!mounted) return null;

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {isVisible && !isOpen && (
          <motion.button
            variants={floatingButtonVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setIsOpen(true)}
            className="fixed top-6 right-6 z-[50] w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-600 shadow-2xl hover:shadow-glow border-2 border-white/30 backdrop-blur-sm group overflow-hidden"
            whileHover={{ 
              scale: 1.1,
              rotate: [0, -3, 3, 0],
              boxShadow: "0 25px 50px rgba(16, 185, 129, 0.4)"
            }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Animated background patterns */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 via-blue-400/30 to-purple-400/30"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Floating particles */}
            <div className="absolute inset-0">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/60 rounded-full"
                  style={{
                    top: `${30 + i * 15}%`,
                    left: `${25 + i * 20}%`,
                  }}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 2 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>

            {/* Menu icon with morphing animation */}
            <motion.div 
              className="relative z-10 flex items-center justify-center text-white"
              animate={{ 
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <Menu size={28} className="drop-shadow-lg" />
            </motion.div>

            {/* Pulse indicator */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-white/20"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />

            {/* Status indicator */}
            <motion.div
              className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white shadow-lg"
              animate={{
                scale: [1, 1.4, 1],
                boxShadow: [
                  "0 0 8px rgba(34, 197, 94, 0.5)",
                  "0 0 16px rgba(34, 197, 94, 0.8)",
                  "0 0 8px rgba(34, 197, 94, 0.5)"
                ]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.div
                className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                animate={{ scale: [1, 0.7, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop with advanced blur */}
            <motion.div
              className="fixed inset-0 z-[51] bg-black/60 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="exit"
              className="fixed top-0 right-0 bottom-0 w-80 bg-gradient-to-br from-white/95 via-white/90 to-gray-50/95 dark:from-gray-900/95 dark:via-gray-800/90 dark:to-gray-900/95 backdrop-blur-xl shadow-2xl z-[52] overflow-hidden"
            >
              {/* Animated background elements */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 180, 360],
                    x: [0, -20, 0],
                    y: [0, 20, 0]
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <motion.div
                  className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl"
                  animate={{
                    scale: [1.2, 0.8, 1.2],
                    rotate: [360, 180, 0],
                    x: [0, 15, 0],
                    y: [0, -15, 0]
                  }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>

              {/* Header */}
              <motion.div 
                className="relative z-10 p-8 border-b border-white/20 dark:border-gray-700/30"
                variants={itemVariants}
              >
                <div className="flex items-center justify-between">
                  <motion.div
                    className="flex items-center gap-3"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles size={20} className="text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Navigation
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Explore the portfolio
                      </p>
                    </div>
                  </motion.div>

                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="w-12 h-12 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-emerald-500 hover:text-white transition-all duration-300 shadow-lg border border-white/30 dark:border-gray-700/30"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <X size={20} />
                  </motion.button>
                </div>
              </motion.div>

              {/* Navigation Links */}
              <div className="relative z-10 flex-1 p-6 overflow-y-auto">
                <motion.div className="space-y-3">
                  {navLinks.map((link, index) => {
                    const IconComponent = iconMap[link.href] || Zap;
                    return (
                      <motion.div
                        key={link.href}
                        variants={itemVariants}
                        custom={index}
                        whileHover={{ scale: 1.02, x: 10 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link.href)}
                          className="group relative flex items-center gap-4 p-4 rounded-2xl bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-blue-500 hover:text-white hover:border-white/40 transition-all duration-500 shadow-lg hover:shadow-xl overflow-hidden"
                        >
                          <motion.div
                            className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-blue-500/20 flex items-center justify-center group-hover:from-white/20 group-hover:to-white/20 transition-all duration-300"
                            whileHover={{ 
                              scale: 1.2, 
                              rotate: [0, -10, 10, 0],
                              background: "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))"
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <IconComponent size={20} className="text-emerald-600 group-hover:text-white transition-colors" />
                          </motion.div>

                          <div className="flex-1">
                            <span className="font-semibold text-lg text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors">
                              {language === 'en' ? link.labelEn : link.labelId}
                            </span>
                          </div>

                          <motion.div
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            initial={{ x: -10 }}
                            whileHover={{ x: 0 }}
                          >
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </motion.div>

                          {/* Enhanced shimmer effect */}
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out rounded-2xl"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '100%' }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                          />
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>

              {/* Bottom Controls */}
              <motion.div 
                className="relative z-10 p-6 border-t border-white/20 dark:border-gray-700/30 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm"
                variants={itemVariants}
              >
                <div className="grid grid-cols-2 gap-4">
                  {/* Theme Toggle */}
                  <motion.button
                    onClick={toggleTheme}
                    className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-500 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-blue-600"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <motion.div
                      key={theme}
                      initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
                    </motion.div>
                    <span className="text-sm">
                      {theme === 'dark' ? 'Light' : 'Dark'}
                    </span>
                  </motion.button>

                  {/* Language Toggle */}
                  <motion.button
                    onClick={toggleLanguage}
                    className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-gray-700 dark:text-gray-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <motion.div
                      className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold"
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.3 }}
                    >
                      {language.toUpperCase()}
                    </motion.div>
                    <span className="text-sm">
                      {language === 'en' ? 'ID' : 'EN'}
                    </span>
                  </motion.button>
                </div>
              </motion.div>

              {/* Decorative bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default InnovativeMobileNav;