"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { InteractiveButton } from '../shared/InteractiveButton';
import { Palette, Code, Layers } from 'lucide-react';
import StandardModal from '../shared/StandardModal';

export type SelectedRole = 'uiux' | 'developer' | null;

interface RoleSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRole: (role: SelectedRole) => void;
  selectedRole: SelectedRole;
}

const roleOptions = [
  {
    id: 'uiux' as const,
    icon: Palette,
    iconEmoji: '🎨',
    titleEn: 'UI/UX Designer Portfolio',
    titleId: 'Portofolio Desainer UI/UX',
    descriptionEn: 'Explore my creative design process, visual solutions, and user experience expertise',
    descriptionId: 'Jelajahi proses desain kreatif, solusi visual, dan keahlian pengalaman pengguna saya',
    features: {
      en: ['Design Portfolio Gallery', 'Creative Process Showcase', 'User Experience Solutions', 'Visual Design Systems'],
      id: ['Galeri Portofolio Desain', 'Showcase Proses Kreatif', 'Solusi Pengalaman Pengguna', 'Sistem Desain Visual']
    },
    gradient: 'from-purple-500 via-pink-500 to-rose-500',
    glowColor: 'rgba(168, 85, 247, 0.4)'
  },
  {
    id: 'developer' as const,
    icon: Code,
    iconEmoji: '💻',
    titleEn: 'Web Developer Portfolio',
    titleId: 'Portofolio Pengembang Web',
    descriptionEn: 'Discover my technical expertise, development projects, and coding solutions',
    descriptionId: 'Temukan keahlian teknis, proyek pengembangan, dan solusi coding saya',
    features: {
      en: ['Technical Projects', 'Code Architecture', 'Development Skills', 'Technology Stack'],
      id: ['Proyek Teknis', 'Arsitektur Kode', 'Keahlian Pengembangan', 'Technology Stack']
    },
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    glowColor: 'rgba(59, 130, 246, 0.4)'
  }
];

export function RoleSelectionModal({ isOpen, onClose, onSelectRole, selectedRole }: RoleSelectionModalProps) {
  const { language } = useLanguage();
  const [hoveredRole, setHoveredRole] = useState<SelectedRole>(null);


  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: 'spring',
        duration: 0.5,
        delay: 0.1
      }
    },
    hover: {
      scale: 1.02,
      y: -8,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    }
  };

  const handleRoleSelect = (role: SelectedRole) => {
    onSelectRole(role);
    setTimeout(onClose, 300);
  };

  return (
    <StandardModal
      isOpen={isOpen}
      onClose={onClose}
      title={language === 'en' ? 'Choose Your Journey' : 'Pilih Perjalanan Anda'}
      maxWidth="xl"
      className="text-center"
    >
      {/* Header Icon and Description */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 mb-4">
          <Layers className="w-8 h-8 text-white" />
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          {language === 'en' 
            ? 'I wear multiple hats as both a creative designer and technical developer. Which perspective would you like to explore?'
            : 'Saya berperan ganda sebagai desainer kreatif dan pengembang teknis. Perspektif mana yang ingin Anda jelajahi?'
          }
        </p>
      </motion.div>

      {/* Role Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {roleOptions.map((role, index) => {
          const IconComponent = role.icon;
          const isSelected = selectedRole === role.id;
          const isHovered = hoveredRole === role.id;

          return (
            <motion.div
              key={role.id}
              className="relative group cursor-pointer"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              onHoverStart={() => setHoveredRole(role.id)}
              onHoverEnd={() => setHoveredRole(null)}
              onClick={() => handleRoleSelect(role.id)}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Glow effect */}
              {(isHovered || isSelected) && (
                <motion.div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${role.gradient} opacity-20 blur-xl`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.3, scale: 1.1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                />
              )}

              {/* Card Content */}
              <div className={`relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 h-full transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 ${
                isSelected ? 'ring-2 ring-blue-400' : ''
              }`}>
                {/* Icon */}
                <div className="mb-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${role.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl mb-2">{role.iconEmoji}</div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {language === 'en' ? role.titleEn : role.titleId}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed">
                  {language === 'en' ? role.descriptionEn : role.descriptionId}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {(language === 'en' ? role.features.en : role.features.id).map((feature, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-center text-xs text-gray-500 dark:text-gray-400"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (idx * 0.1) }}
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${role.gradient} mr-2 group-hover:scale-125 transition-transform duration-300`} />
                      {feature}
                    </motion.div>
                  ))}
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <motion.div
                    className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                  >
                    <motion.div
                      className="w-3 h-3 bg-white rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 }}
                    />
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <InteractiveButton
          onClick={onClose}
          className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          {language === 'en' ? 'Browse Everything' : 'Lihat Semuanya'}
        </InteractiveButton>
        
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {language === 'en' 
            ? 'You can always switch perspectives later'
            : 'Anda selalu dapat mengubah perspektif nanti'
          }
        </p>
      </motion.div>
    </StandardModal>
  );
}