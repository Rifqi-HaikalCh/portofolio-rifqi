'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { MobileProjects } from './MobileProjects';
import { MobileImmersivePortfolioGallery } from './MobileImmersivePortfolioGallery';
import { Code, Palette } from 'lucide-react';

export type ProjectRole = 'developer' | 'uiux';

export const MobileDualFunnelProjects: React.FC = () => {
  const { language } = useLanguage();
  const [activeRole, setActiveRole] = useState<ProjectRole>('developer');

  const roleOptions = [
    {
      id: 'developer' as const,
      titleEn: 'Developer',
      titleId: 'Developer',
      icon: <Code size={20} />,
      descriptionEn: 'Technical projects',
      descriptionId: 'Proyek teknis',
      gradient: 'from-emerald-500 to-blue-500'
    },
    {
      id: 'uiux' as const,
      titleEn: 'UI/UX Designer',
      titleId: 'Desainer UI/UX',
      icon: <Palette size={20} />,
      descriptionEn: 'Design portfolio',
      descriptionId: 'Portofolio desain',
      gradient: 'from-pink-500 to-purple-500'
    }
  ];

  return (
    <div className="space-y-0">
      {/* Role Selection Header */}
      <div className="bg-white dark:bg-gray-800 px-6 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4">
            {language === 'en' ? 'Portfolio' : 'Portofolio'}
          </span>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            {language === 'en' ? 'Choose Your View' : 'Pilih Tampilan'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            {language === 'en'
              ? 'Explore my work from different professional perspectives'
              : 'Jelajahi karya saya dari perspektif profesional yang berbeda'}
          </p>
        </motion.div>

        {/* Tab Buttons */}
        <div className="flex gap-3">
          {roleOptions.map((role) => (
            <button
              key={role.id}
              onClick={() => setActiveRole(role.id)}
              className={`flex-1 py-4 px-4 rounded-2xl font-semibold transition-all duration-300 ${
                activeRole === role.id
                  ? `bg-gradient-to-r ${role.gradient} text-white shadow-lg scale-105`
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <div className={`${activeRole === role.id ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                  {role.icon}
                </div>
                <div>
                  <div className="text-sm font-bold">
                    {language === 'en' ? role.titleEn : role.titleId}
                  </div>
                  <div className={`text-xs ${activeRole === role.id ? 'text-white/80' : 'text-gray-500 dark:text-gray-500'}`}>
                    {language === 'en' ? role.descriptionEn : role.descriptionId}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeRole}
          initial={{ opacity: 0, x: activeRole === 'developer' ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: activeRole === 'developer' ? 20 : -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeRole === 'developer' ? <MobileProjects /> : <MobileImmersivePortfolioGallery />}
        </motion.div>
      </AnimatePresence>

      {/* Call to Action */}
      <div className="px-6 py-8 bg-white dark:bg-gray-800">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className={`bg-gradient-to-r ${
            activeRole === 'developer'
              ? 'from-emerald-500 to-blue-500'
              : 'from-pink-500 to-purple-500'
          } rounded-3xl p-6 text-white shadow-xl`}
        >
          <h3 className="text-xl font-bold mb-2 text-center">
            {language === 'en' ? 'Open for Opportunities' : 'Terbuka untuk Peluang'}
          </h3>
          <p className="text-white/90 text-sm mb-6 text-center">
            {language === 'en'
              ? "Available for full-time positions and freelance projects. Let's work together!"
              : 'Tersedia untuk posisi full-time dan proyek freelance. Mari bekerja sama!'}
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full py-3 px-6 bg-white text-gray-900 rounded-full font-semibold shadow-lg active:scale-95 transition-transform"
            >
              {language === 'en' ? 'Contact for Full-time' : 'Kontak untuk Full-time'}
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full py-3 px-6 border-2 border-white/80 text-white rounded-full font-semibold active:scale-95 transition-transform"
            >
              {language === 'en' ? 'Hire for Freelance' : 'Sewa untuk Freelance'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
