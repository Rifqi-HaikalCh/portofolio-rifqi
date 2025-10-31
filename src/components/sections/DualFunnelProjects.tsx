"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { AnimatedSectionTitle } from '../shared/AnimatedSectionTitle';
import { InteractiveButton } from '../shared/InteractiveButton';
import TiltedCard from '../shared/TiltedCard';
import { Projects } from './Projects';
import { ImmersivePortfolioGallery } from './ImmersivePortfolioGallery';
import { UiUxSkills } from './UiUxSkills';
import { SelectedRole } from './RoleSelectionModal';

export type ProjectRole = 'developer' | 'uiux';

interface DualFunnelProjectsProps {
  selectedRole?: SelectedRole;
}

export function DualFunnelProjects({ selectedRole }: DualFunnelProjectsProps) {
  const { language } = useLanguage();
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

  const tabVariants = {
    inactive: {
      backgroundColor: 'transparent',
      color: '#6B7280',
      borderColor: '#E5E7EB'
    },
    active: {
      backgroundColor: '#3B82F6',
      color: '#FFFFFF',
      borderColor: '#3B82F6'
    }
  };

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
          <div className="glass-card p-2 inline-flex rounded-2xl">
            {roleOptions.map((role) => (
              <motion.button
                key={role.id}
                className={`px-6 py-4 rounded-xl font-semibold text-sm flex items-center space-x-3 transition-all duration-300 min-w-[180px] justify-center ${
                  activeRole === role.id
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                    : 'text-text-secondary hover:bg-white/50 dark:hover:bg-gray-700/50'
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
                  <div className={`text-xs ${activeRole === role.id ? 'text-white/80' : 'text-text-tertiary'}`}>
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
                    <div className="glass-card-strong p-8 h-full">
                      <h3 className="text-2xl font-bold text-text-primary mb-6 text-center">
                        {language === 'en' ? 'Technical Skills & Expertise' : 'Keahlian & Keahlian Teknis'}
                      </h3>
                      <p className="text-text-secondary text-center mb-8 max-w-3xl mx-auto">
                        {language === 'en'
                          ? 'I specialize in modern web technologies and frameworks, building scalable and performant applications.'
                          : 'Saya spesialisasi dalam teknologi web modern dan framework, membangun aplikasi yang skalabel dan berkinerja tinggi.'
                        }
                      </p>
                    </div>
                  </TiltedCard>
                  
                  {/* Developer Projects */}
                  <Projects />
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
            <div className="glass-card-strong bg-gradient-to-r from-primary-500 to-secondary-500 p-8 text-white h-full">
              <h3 className="text-2xl font-bold mb-4">
                {language === 'en' ? 'Open for Opportunities' : 'Terbuka untuk Peluang'}
              </h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                {language === 'en'
                  ? 'I am available for full-time positions and freelance projects. Let\'s discuss how I can contribute to your team or project!'
                  : 'Saya tersedia untuk posisi full-time dan proyek freelance. Mari diskusikan bagaimana saya dapat berkontribusi pada tim atau proyek Anda!'
                }
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <InteractiveButton
                  onClick={() => {
                    const contactSection = document.querySelector('#contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-white text-primary-600 font-semibold py-3 px-6 rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
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
                  className="border-2 border-white/80 text-white font-semibold py-3 px-6 rounded-xl hover:bg-white hover:text-primary-600 transition-colors backdrop-blur-sm"
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