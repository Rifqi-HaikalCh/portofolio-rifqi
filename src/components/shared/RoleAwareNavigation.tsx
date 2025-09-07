"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRole } from '../../context/RoleContext';
import { useLanguage } from '../../context/LanguageContext';
import { InteractiveButton } from './InteractiveButton';

interface RoleSwitcherProps {
  className?: string;
}

export function RoleSwitcher({ className = '' }: RoleSwitcherProps) {
  const { userRole, setUserRole, resetRole } = useRole();
  const { language } = useLanguage();

  const roles = [
    { id: 'uiux' as const, label: language === 'en' ? 'UI/UX Designer' : 'Desainer UI/UX', icon: '🎨' },
    { id: 'developer' as const, label: language === 'en' ? 'Web Developer' : 'Pengembang Web', icon: '💻' },
    { id: 'fullstack' as const, label: language === 'en' ? 'Full-Stack' : 'Full-Stack', icon: '🚀' }
  ];

  return (
    <AnimatePresence>
      {userRole && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-4 right-4 z-50 ${className}`}
        >
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-2 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              {/* Current Role Indicator */}
              <div className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl text-sm font-semibold">
                <span>{roles.find(r => r.id === userRole)?.icon}</span>
                <span className="hidden sm:inline">{roles.find(r => r.id === userRole)?.label}</span>
              </div>

              {/* Role Switcher Buttons */}
              <div className="flex items-center space-x-1">
                {roles.filter(role => role.id !== userRole).map((role) => (
                  <InteractiveButton
                    key={role.id}
                    onClick={() => setUserRole(role.id)}
                    className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                    ariaLabel={`Switch to ${role.label}`}
                    title={language === 'en' ? `Switch to ${role.label}` : `Beralih ke ${role.label}`}
                  >
                    <span className="text-lg">{role.icon}</span>
                  </InteractiveButton>
                ))}
              </div>

              {/* Reset Button */}
              <InteractiveButton
                onClick={resetRole}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                ariaLabel={language === 'en' ? 'Reset role selection' : 'Reset pilihan peran'}
                title={language === 'en' ? 'Choose different path' : 'Pilih jalur berbeda'}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </InteractiveButton>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface RoleBasedNavigationProps {
  className?: string;
}

export function RoleBasedNavigation({ className = '' }: RoleBasedNavigationProps) {
  const { userRole } = useRole();
  const { language } = useLanguage();

  const getNavigationItems = () => {
    const baseItems = [
      { href: '#home', label: language === 'en' ? 'Home' : 'Beranda' },
      { href: '#about', label: language === 'en' ? 'About' : 'Tentang' }
    ];

    const roleSpecificItems = {
      uiux: [
        { href: '#services', label: language === 'en' ? 'Design Services' : 'Layanan Desain' },
        { href: '#portfolio', label: language === 'en' ? 'Design Portfolio' : 'Portofolio Desain' },
        { href: '#process', label: language === 'en' ? 'Design Process' : 'Proses Desain' }
      ],
      developer: [
        { href: '#services', label: language === 'en' ? 'Dev Services' : 'Layanan Dev' },
        { href: '#projects', label: language === 'en' ? 'Projects' : 'Proyek' },
        { href: '#skills', label: language === 'en' ? 'Skills' : 'Keahlian' },
        { href: '#experience', label: language === 'en' ? 'Experience' : 'Pengalaman' }
      ],
      fullstack: [
        { href: '#services', label: language === 'en' ? 'All Services' : 'Semua Layanan' },
        { href: '#portfolio', label: language === 'en' ? 'Portfolio' : 'Portofolio' },
        { href: '#projects', label: language === 'en' ? 'Projects' : 'Proyek' },
        { href: '#skills', label: language === 'en' ? 'Skills' : 'Keahlian' }
      ]
    };

    const endItems = [
      { href: '#certificates', label: language === 'en' ? 'Certificates' : 'Sertifikat' },
      { href: '#contact', label: language === 'en' ? 'Contact' : 'Kontak' }
    ];

    if (!userRole) return [...baseItems, ...endItems];
    
    return [
      ...baseItems,
      ...roleSpecificItems[userRole],
      ...endItems
    ];
  };

  const navigationItems = getNavigationItems();

  return (
    <nav className={`${className}`}>
      <ul className="flex space-x-6">
        {navigationItems.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}