'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { hardSkills, softSkills } from '../../data/portfolio';
import { useLanguage } from '../../context/LanguageContext';
import { staggerContainer, fadeInUp } from '../../lib/animations';
import { 
  PuzzlePieceIcon, 
  LightBulbIcon, 
  UsersIcon, 
  ChatBubbleLeftEllipsisIcon, 
  UserIcon, 
  ClockIcon, 
  PaintBrushIcon, 
  ArrowPathIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

export const Skills: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'hard' | 'soft'>('hard');

  const currentSkills = activeCategory === 'hard' ? hardSkills : softSkills;

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-6">
            <SparklesIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
              {t("My Expertise", "Keahlian Saya")}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t("Skills & Technologies", "Keahlian & Teknologi")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            {t(
              "Comprehensive technical and soft skills that drive exceptional results",
              "Keahlian teknis dan lunak yang komprehensif untuk hasil yang luar biasa"
            )}
          </p>
        </motion.div>

        {/* Enhanced Category Buttons */}
        <motion.div 
          className="flex justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.button
            onClick={() => setActiveCategory('hard')}
            className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 relative overflow-hidden ${
              activeCategory === 'hard'
                ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-glow'
                : 'border-2 border-emerald-500/20 text-gray-700 dark:text-gray-300 hover:border-emerald-500 hover:bg-emerald-500/10'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={`absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 translate-x-[-100%] transition-transform duration-500 ${activeCategory === 'hard' ? '' : 'group-hover:translate-x-[100%]'}`}></div>
            <span className="relative">{t("Technical Skills", "Keahlian Teknis")}</span>
          </motion.button>
          <motion.button
            onClick={() => setActiveCategory('soft')}
            className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 relative overflow-hidden ${
              activeCategory === 'soft'
                ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-glow'
                : 'border-2 border-emerald-500/20 text-gray-700 dark:text-gray-300 hover:border-emerald-500 hover:bg-emerald-500/10'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={`absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 translate-x-[-100%] transition-transform duration-500 ${activeCategory === 'soft' ? '' : 'group-hover:translate-x-[100%]'}`}></div>
            <span className="relative">{t("Personal Skills", "Keahlian Personal")}</span>
          </motion.button>
        </motion.div>

        {/* Enhanced Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCategory}
            className={`grid gap-6 max-w-7xl mx-auto ${
              activeCategory === 'hard' 
                ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6' 
                : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'
            }`}
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            {currentSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={fadeInUp}
                className="group relative p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl text-center shadow-lg hover:shadow-glow border border-gray-200/50 dark:border-gray-700/50 transition-all duration-500 cursor-pointer overflow-hidden"
                whileHover={{ 
                  scale: 1.05, 
                  y: -8,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
              >
                {/* Hover gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Icon Container */}
                <div className="relative z-10 mb-4 flex justify-center">
                  {activeCategory === 'hard' ? (
                    <div 
                      className="w-16 h-16 flex items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                      style={{ 
                        backgroundColor: `${skill.color}15`,
                        border: `2px solid ${skill.color}30`
                      }}
                    >
                      <i 
                        className={`fab fa-${skill.icon} text-3xl transition-all duration-300`}
                        style={{ color: skill.color }}
                      />
                    </div>
                  ) : (
                    <div 
                      className="w-16 h-16 flex items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                      style={{ 
                        backgroundColor: `${skill.color}15`,
                        border: `2px solid ${skill.color}30`
                      }}
                    >
                      <div style={{ color: skill.color }}>
                        {skill.icon === 'puzzle-piece' && <PuzzlePieceIcon className="w-8 h-8" />}
                        {skill.icon === 'lightbulb' && <LightBulbIcon className="w-8 h-8" />}
                        {skill.icon === 'users' && <UsersIcon className="w-8 h-8" />}
                        {skill.icon === 'comments' && <ChatBubbleLeftEllipsisIcon className="w-8 h-8" />}
                        {skill.icon === 'user-tie' && <UserIcon className="w-8 h-8" />}
                        {skill.icon === 'clock' && <ClockIcon className="w-8 h-8" />}
                        {skill.icon === 'palette' && <PaintBrushIcon className="w-8 h-8" />}
                        {skill.icon === 'sync-alt' && <ArrowPathIcon className="w-8 h-8" />}
                      </div>
                    </div>
                  )}
                </div>

                {/* Skill Name */}
                <h3 className="relative z-10 font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors duration-300">
                  {activeCategory === 'soft' && language === 'id' 
                    ? skill.name === 'Problem Solving' ? 'Pemecahan Masalah'
                    : skill.name === 'Critical Thinking' ? 'Berpikir Kritis'
                    : skill.name === 'Team Work' ? 'Kerja Tim'
                    : skill.name === 'Communication' ? 'Komunikasi'
                    : skill.name === 'Leadership' ? 'Kepemimpinan'
                    : skill.name === 'Time Management' ? 'Manajemen Waktu'
                    : skill.name === 'Creativity' ? 'Kreativitas'
                    : skill.name === 'Adaptability' ? 'Kemampuan Adaptasi'
                    : skill.name
                    : skill.name
                  }
                </h3>

                {/* Skill Level Indicator */}
                <div className="relative z-10 mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: '90%' }}
                    transition={{ duration: 1.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};