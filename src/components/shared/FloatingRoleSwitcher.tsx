"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { InteractiveButton } from './InteractiveButton';
import { Palette, Code, Settings } from 'lucide-react';
import { SelectedRole } from '../sections/RoleSelectionModal';

interface FloatingRoleSwitcherProps {
  selectedRole: SelectedRole;
  onRoleChange: (role: SelectedRole) => void;
  onOpenModal: () => void;
}

export function FloatingRoleSwitcher({ selectedRole, onRoleChange, onOpenModal }: FloatingRoleSwitcherProps) {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('#home');
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setIsVisible(heroBottom < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const roleOptions = [
    {
      id: 'uiux' as const,
      icon: Palette,
      labelEn: 'UI/UX',
      labelId: 'UI/UX',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'developer' as const,
      icon: Code,
      labelEn: 'Developer',
      labelId: 'Developer',
      color: 'from-blue-500 to-cyan-500'
    }
  ];

  const handleRoleSelect = (role: SelectedRole) => {
    onRoleChange(role);
    setIsExpanded(false);
  };

  const getCurrentRoleInfo = () => {
    if (!selectedRole) return null;
    return roleOptions.find(option => option.id === selectedRole);
  };

  const currentRole = getCurrentRoleInfo();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-40"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
        >
          {/* Expanded Menu */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="absolute bottom-16 right-0 mb-2"
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <div className="glass-card p-3 min-w-[200px]">
                  <div className="space-y-2">
                    {/* Role Options */}
                    {roleOptions.map((role) => {
                      const IconComponent = role.icon;
                      const isActive = selectedRole === role.id;

                      return (
                        <InteractiveButton
                          key={role.id}
                          onClick={() => handleRoleSelect(role.id)}
                          className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                            isActive
                              ? `bg-gradient-to-r ${role.color} text-white shadow-lg`
                              : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          <IconComponent className="w-4 h-4" />
                          <span className="font-medium text-sm">
                            {language === 'en' ? role.labelEn : role.labelId}
                          </span>
                          {isActive && (
                            <motion.div
                              className="w-2 h-2 bg-white rounded-full ml-auto"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.1 }}
                            />
                          )}
                        </InteractiveButton>
                      );
                    })}

                    {/* Divider */}
                    <div className="border-t border-gray-200 dark:border-gray-600 my-2" />

                    {/* View All Option */}
                    <InteractiveButton
                      onClick={() => {
                        onRoleChange(null);
                        setIsExpanded(false);
                      }}
                      className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                        !selectedRole
                          ? 'bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <Settings className="w-4 h-4" />
                      <span className="font-medium text-sm">
                        {language === 'en' ? 'View All' : 'Lihat Semua'}
                      </span>
                    </InteractiveButton>

                    {/* Reopen Modal Option */}
                    <InteractiveButton
                      onClick={() => {
                        onOpenModal();
                        setIsExpanded(false);
                      }}
                      className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 transition-all duration-200"
                    >
                      <motion.div
                        className="w-4 h-4 rounded-full bg-blue-500"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="font-medium text-sm">
                        {language === 'en' ? 'Choose Again' : 'Pilih Ulang'}
                      </span>
                    </InteractiveButton>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Floating Button */}
          <motion.button
            className={`glass-card p-4 rounded-full shadow-lg border ${
              selectedRole && currentRole 
                ? `border-transparent bg-gradient-to-r ${currentRole.color}` 
                : 'border-gray-200 dark:border-gray-700'
            }`}
            onClick={() => setIsExpanded(!isExpanded)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={isExpanded ? { rotate: 45 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            {selectedRole && currentRole ? (
              <div className="flex items-center space-x-2">
                <currentRole.icon className="w-5 h-5 text-white" />
                <span className="hidden sm:inline text-white font-medium text-sm">
                  {language === 'en' ? currentRole.labelEn : currentRole.labelId}
                </span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                <span className="hidden sm:inline text-gray-700 dark:text-gray-300 font-medium text-sm">
                  {language === 'en' ? 'Role' : 'Peran'}
                </span>
              </div>
            )}

            {/* Notification Dot */}
            {!selectedRole && (
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}