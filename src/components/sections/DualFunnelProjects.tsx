"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { AnimatedSectionTitle } from '../shared/AnimatedSectionTitle';
import { InteractiveButton } from '../shared/InteractiveButton';
import TiltedCard from '../shared/TiltedCard';
import { Projects } from './Projects';
import { ImmersivePortfolioGallery } from './ImmersivePortfolioGallery';
import UiUxSkills from './UiUxSkills';
import { SelectedRole } from './RoleSelectionModal';
import { ViewAllProjects } from './ViewAllProjects';

export type ProjectRole = 'developer' | 'uiux';

interface DualFunnelProjectsProps {
  selectedRole?: SelectedRole;
}

export function DualFunnelProjects({ selectedRole }: DualFunnelProjectsProps) {
  const { language } = useLanguage();
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [activeRole, setActiveRole] = useState<ProjectRole>(() => {
    if (selectedRole === 'uiux') return 'uiux';
    if (selectedRole === 'developer') return 'developer';
    return 'developer'; // default
  });

  // Sync with global role selection
  useEffect(() => {
    if (selectedRole === 'uiux') setActiveRole('uiux');
    else if (selectedRole === 'developer') setActiveRole('developer');
  }, [selectedRole]);

  const roleOptions = [
    {
      id: 'developer' as const,
      titleEn: 'Web Developer',
      titleId: 'Pengembang Web',
      icon: '💻',
      descriptionEn: 'Technical projects & development expertise',
      descriptionId: 'Proyek teknis & keahlian pengembangan'
    },
    {
      id: 'uiux' as const,
      titleEn: 'UI/UX Designer',
      titleId: 'Desainer UI/UX',
      icon: '🎨',
      descriptionEn: 'Design portfolio & creative solutions',
      descriptionId: 'Portofolio desain & solusi kreatif'
    }
  ];

  const contentVariants = {
    hidden: { 
      opacity: 0, 
      x: activeRole === 'developer' ? -20 : 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      x: activeRole === 'developer' ? 20 : -20,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  if (showAllProjects) {
    return <ViewAllProjects onBack={() => setShowAllProjects(false)} projectType="all" />;
  }

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSectionTitle
          badge={language === 'en' ? 'Portfolio' : 'Portofolio'}
          title={language === 'en' ? 'Choose Your Experience' : 'Pilih Pengalaman Anda'}
          subtitle={language === 'en' 
            ? 'Explore my work from different professional perspectives. Select the role that matches your interest to see relevant projects and expertise.'
            : 'Jelajahi karya saya dari perspektif profesional yang berbeda. Pilih peran yang sesuai dengan minat Anda untuk melihat proyek dan keahlian yang relevan.'
          }
        />

        {/* Role Selection Tabs */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="glass-card p-2 inline-flex rounded-2xl bg-gray-50/50 dark:bg-gray-800/30 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50">
            {roleOptions.map((role) => (
              <motion.button
                key={role.id}
                className={`px-6 py-4 rounded-xl font-semibold text-sm flex items-center space-x-3 transition-all duration-300 min-w-[180px] justify-center ${
                  activeRole === role.id
                    ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg'
                    : 'text-gray-500 hover:bg-white/50 dark:hover:bg-gray-700/50'
                }`}
                onClick={() => setActiveRole(role.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-xl">{role.icon}</span>
                <div className="text-left">
                  <div className="font-semibold">
                    {language === 'en' ? role.titleEn : role.titleId}
                  </div>
                  <div className={`text-xs ${activeRole === role.id ? 'text-white/80' : 'text-gray-400'}`}>
                    {language === 'en' ? role.descriptionEn : role.descriptionId}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Content Area */}
        <div className="relative min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRole}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full"
            >
              {activeRole === 'developer' ? (
                <div className="space-y-16">
                  {/* Developer Skills */}
                  <TiltedCard
                    scaleOnHover={1.03}
                    rotateAmplitude={6}
                    containerHeight="100%"
                    containerWidth="100%"
                  >
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                        {language === 'en' ? 'Technical Skills & Expertise' : 'Keahlian & Keahlian Teknis'}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-center mb-8 max-w-3xl mx-auto italic leading-relaxed">
                        "{language === 'en'
                          ? 'I specialize in modern web technologies and frameworks, building scalable and performant applications.'
                          : 'Saya spesialisasi dalam teknologi web modern dan framework, membangun aplikasi yang skalabel dan berkinerja tinggi.'
                        }"
                      </p>
                    </div>
                  </TiltedCard>
                  
                  {/* Developer Projects */}
                  <Projects onShowAll={() => setShowAllProjects(true)} />
                </div>
              ) : (
                <div className="space-y-16">
                  {/* UI/UX Skills */}
                  <UiUxSkills />
                  
                  {/* Design Portfolio */}
                  <ImmersivePortfolioGallery />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Call to Action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <TiltedCard
            scaleOnHover={1.03}
            rotateAmplitude={6}
            containerHeight="100%"
            containerWidth="100%"
          >
            <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-10 rounded-[2.5rem] text-white shadow-2xl">
              <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter">
                {language === 'en' ? 'Open for Opportunities' : 'Terbuka untuk Peluang'}
              </h3>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto font-medium text-lg italic">
                {language === 'en'
                  ? 'I am available for full-time positions and freelance projects. Let\'s discuss how I can contribute to your team or project!'
                  : 'Saya tersedia untuk posisi full-time dan proyek freelance. Mari diskusikan bagaimana saya dapat berkontribusi pada tim atau proyek Anda!'
                }
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <InteractiveButton
                  onClick={() => {
                    const contactSection = document.querySelector('#contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-white text-emerald-600 font-black py-4 px-10 rounded-2xl hover:bg-gray-100 transition-all shadow-xl uppercase text-xs tracking-widest"
                >
                  {language === 'en' ? 'Contact for Full-time' : 'Kontak untuk Full-time'}
                </InteractiveButton>
                <InteractiveButton
                  onClick={() => {
                    const contactSection = document.querySelector('#contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="border-2 border-white text-white font-black py-4 px-10 rounded-2xl hover:bg-white hover:text-emerald-600 transition-all backdrop-blur-sm uppercase text-xs tracking-widest"
                >
                  {language === 'en' ? 'Hire for Freelance' : 'Sewa untuk Freelance'}
                </InteractiveButton>
              </div>
            </div>
          </TiltedCard>
        </motion.div>
      </div>
    </section>
  );
}
