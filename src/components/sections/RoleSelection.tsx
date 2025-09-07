"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useRole, UserRole } from '../../context/RoleContext';
import { useLanguage } from '../../context/LanguageContext';
import { InteractiveButton } from '../shared/InteractiveButton';

interface RoleOption {
  id: UserRole;
  titleEn: string;
  titleId: string;
  descriptionEn: string;
  descriptionId: string;
  icon: string;
  gradient: string;
  features: {
    en: string[];
    id: string[];
  };
}

const roleOptions: RoleOption[] = [
  {
    id: 'uiux',
    titleEn: 'UI/UX Designer',
    titleId: 'Desainer UI/UX',
    descriptionEn: 'Explore my creative design portfolio and visual solutions',
    descriptionId: 'Jelajahi portofolio desain kreatif dan solusi visual saya',
    icon: '🎨',
    gradient: 'from-purple-500 via-pink-500 to-rose-500',
    features: {
      en: ['Design Portfolio Gallery', 'Creative Process Showcase', 'Visual Design Systems', 'User Experience Focus'],
      id: ['Galeri Portofolio Desain', 'Tampilan Proses Kreatif', 'Sistem Desain Visual', 'Fokus Pengalaman Pengguna']
    }
  },
  {
    id: 'developer',
    titleEn: 'Web Developer',
    titleId: 'Pengembang Web',
    descriptionEn: 'Discover my technical expertise and development projects',
    descriptionId: 'Temukan keahlian teknis dan proyek pengembangan saya',
    icon: '💻',
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    features: {
      en: ['Technical Projects', 'Code Architecture', 'Development Process', 'Performance Optimization'],
      id: ['Proyek Teknis', 'Arsitektur Kode', 'Proses Pengembangan', 'Optimisasi Performa']
    }
  },
  {
    id: 'fullstack',
    titleEn: 'Full-Stack Solution',
    titleId: 'Solusi Full-Stack',
    descriptionEn: 'Experience the complete journey from design to development',
    descriptionId: 'Rasakan perjalanan lengkap dari desain hingga pengembangan',
    icon: '🚀',
    gradient: 'from-emerald-500 via-green-500 to-lime-500',
    features: {
      en: ['End-to-End Solutions', 'Design + Development', 'Complete Portfolio', 'All Services Combined'],
      id: ['Solusi End-to-End', 'Desain + Pengembangan', 'Portofolio Lengkap', 'Semua Layanan Tergabung']
    }
  }
];

export function RoleSelection() {
  const { setUserRole } = useRole();
  const { language } = useLanguage();

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 px-4 py-20">
      <motion.div
        className="max-w-7xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="mb-16" variants={cardVariants}>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {language === 'en' ? 'Choose Your Journey' : 'Pilih Perjalanan Anda'}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {language === 'en' 
              ? 'I wear multiple hats as a creative designer and technical developer. Which aspect of my expertise would you like to explore?' 
              : 'Saya berperan ganda sebagai desainer kreatif dan pengembang teknis. Aspek keahlian mana yang ingin Anda jelajahi?'
            }
          </p>
        </motion.div>

        {/* Role Cards */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
          variants={containerVariants}
        >
          {roleOptions.map((role) => (
            <motion.div
              key={role.id}
              className="relative group"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${role.gradient} opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500 blur-xl`} />
              
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 hover:border-transparent transition-all duration-500 h-full flex flex-col">
                {/* Icon */}
                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {role.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {language === 'en' ? role.titleEn : role.titleId}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                  {language === 'en' ? role.descriptionEn : role.descriptionId}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-8">
                  {(language === 'en' ? role.features.en : role.features.id).map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span className="w-2 h-2 bg-gradient-to-r bg-gray-400 rounded-full mr-3" />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <InteractiveButton
                  onClick={() => handleRoleSelect(role.id)}
                  className={`w-full bg-gradient-to-r ${role.gradient} text-white font-semibold py-4 px-6 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}
                  ariaLabel={`Select ${language === 'en' ? role.titleEn : role.titleId} journey`}
                >
                  {language === 'en' ? 'Explore This Path' : 'Jelajahi Jalur Ini'}
                </InteractiveButton>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div 
          className="text-center"
          variants={cardVariants}
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {language === 'en' 
              ? 'Don\'t worry! You can always switch between different perspectives later.' 
              : 'Jangan khawatir! Anda selalu dapat beralih antara perspektif yang berbeda nanti.'
            }
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}