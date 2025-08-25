"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useThemeAnimation } from './Providers';
import { useLanguage } from '../../context/LanguageContext';
import { navLinks } from '../../data/portfolio';
import { 
  Home, User, Code, Briefcase, FolderOpen, Award, Mail, 
  Sun, Moon, Globe, Menu, X, ChevronUp, Sparkles, Zap 
} from 'lucide-react';

const iconMap: { [key: string]: any } = {
  '#home': Home,
  '#about': User,
  '#skills': Code,
  '#experience': Briefcase,
  '#projects': FolderOpen,
  '#certificates': Award,
  '#contact': Mail,
};

export const FloatingNavigation: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');
  
  const { theme } = useTheme();
  const { toggleTheme } = useThemeAnimation();
  const { language, toggleLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldShow = window.innerWidth < 1024 && scrollY > 100;
      setIsVisible(shouldShow);
      
      // Detect active section
      const sections = navLinks.map(link => link.href);
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.querySelector(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsVisible(false);
        setIsExpanded(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNavClick = (href: string) => {
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsExpanded(false);
    }
  };

  const handleThemeToggle = (event: React.MouseEvent) => {
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }
    toggleTheme(event);
  };

  const handleLanguageToggle = (event: React.MouseEvent) => {
    event.preventDefault();
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }
    toggleLanguage();
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-[9999] lg:hidden"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          {/* Compact FAB */}
          <AnimatePresence>
            {!isExpanded && (
              <motion.button
                onClick={() => setIsExpanded(true)}
                className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center text-white shadow-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Menu size={24} />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Expanded Panel */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="absolute bottom-0 right-0 w-72 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/30 dark:border-gray-700/30 overflow-hidden"
                initial={{ opacity: 0, scale: 0.8, transformOrigin: "bottom right" }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                {/* Header */}
                <div className="p-4 border-b border-gray-200/30 dark:border-gray-700/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center">
                      <Sparkles size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Navigation</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Quick access</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-red-500 hover:text-white transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Navigation Grid */}
                <div className="p-4 grid grid-cols-2 gap-3">
                  {navLinks.map((link, index) => {
                    const IconComponent = iconMap[link.href] || Zap;
                    const isActive = activeSection === link.href;
                    
                    return (
                      <motion.button
                        key={link.href}
                        onClick={() => handleNavClick(link.href)}
                        className={`p-4 rounded-2xl transition-all duration-300 flex flex-col items-center gap-2 ${
                          isActive 
                            ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg' 
                            : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                      >
                        <IconComponent 
                          size={24} 
                          className={isActive ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'} 
                        />
                        <span className="text-xs font-medium text-center">
                          {language === 'en' ? link.labelEn : link.labelId}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Actions */}
                <div className="p-4 pt-0 grid grid-cols-2 gap-3">
                  {/* Theme Toggle */}
                  <button
                    onClick={handleThemeToggle}
                    className="flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-slate-500 to-slate-600 text-white font-medium transition-all duration-300 hover:scale-105"
                  >
                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    <span className="text-sm">{theme === 'dark' ? 'Light' : 'Dark'}</span>
                  </button>

                  {/* Language Toggle */}
                  <button
                    onClick={handleLanguageToggle}
                    className="flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium transition-all duration-300 hover:scale-105"
                  >
                    <Globe size={18} />
                    <span className="text-sm">{language === 'en' ? 'ID' : 'EN'}</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingNavigation;