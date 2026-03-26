'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { workExperience, organizationExperience } from '../../data/portfolio';
import { 
  Briefcase, 
  Users, 
  Calendar, 
  MapPin, 
  X, 
  Star, 
  ArrowRight, 
  Building2, 
  BadgeCheck, 
  Globe,
  Monitor,
  Layout,
  Rocket
} from 'lucide-react';
import { staggerContainer, fadeInUp } from '../../lib/animations';
import { AnimatedSectionTitle } from '../shared/AnimatedSectionTitle';
import type { Experience as ExperienceType } from '../../types';

// Desktop Timeline Card Component
const DesktopTimelineCard = ({ exp, side, icon, onClick }: { 
  exp: ExperienceType, 
  side: 'left' | 'right', 
  icon: React.ReactNode,
  onClick: () => void 
}) => {
  const { language } = useLanguage();
  const alignment = side === 'left' ? 'flex-row-reverse' : 'flex-row';
  const textAlignment = side === 'left' ? 'text-right' : 'text-left';
  
  return (
    <motion.div 
      variants={fadeInUp} 
      className={`mb-16 flex justify-between items-center w-full ${alignment} group cursor-pointer`}
      onClick={onClick}
    >
      <div className="order-1 w-5/12"></div>
      
      <motion.div 
        className="z-20 flex items-center justify-center order-1 bg-white dark:bg-gray-800 shadow-xl w-14 h-14 rounded-2xl text-emerald-500 border-2 border-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500"
        whileHover={{ scale: 1.2, rotate: 360 }}
      >
        {icon}
      </motion.div>
      
      <motion.div 
        className={`order-1 bg-white dark:bg-gray-800 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.3)] w-5/12 p-8 ${textAlignment} border border-gray-100 dark:border-gray-700/50 hover:border-emerald-500 transition-all duration-500 relative overflow-hidden`}
        whileHover={{ y: -10, scale: 1.02 }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
        
        <div className="relative z-10">
          <div className={`flex items-center gap-2 mb-2 ${side === 'left' ? 'justify-end' : 'justify-start'}`}>
            <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest">
              {exp.companyType}
            </span>
          </div>

          <h4 className="font-black text-gray-900 dark:text-white text-xl mb-1 group-hover:text-emerald-500 transition-colors">
            {exp.title}
          </h4>
          
          <div className={`flex items-center gap-2 text-gray-600 dark:text-gray-400 font-bold mb-4 text-sm ${side === 'left' ? 'flex-row-reverse' : ''}`}>
            <Building2 size={16} className="text-emerald-500" />
            {exp.company}
          </div>
          
          <div className={`flex items-center gap-4 text-xs text-gray-400 font-semibold mb-6 ${side === 'left' ? 'justify-end' : 'justify-start'}`}>
            <div className="flex items-center gap-1">
              <Calendar size={14} className="text-emerald-500" />
              <span>{exp.period}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={14} className="text-emerald-500" />
              <span>{exp.location}</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 italic border-l-2 border-emerald-500/30 pl-4 py-1 leading-relaxed line-clamp-2">
            "{exp.shortDescription}"
          </p>
          
          <div className={`flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-[0.2em] group-hover:gap-4 transition-all duration-300 ${side === 'left' ? 'justify-end' : 'justify-start'}`}>
            <span>EXPLORE DETAILS</span>
            <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

import { Portal } from '../shared/Portal';

// ... (DesktopTimelineCard code tetap sama)

export const Experience: React.FC = () => {
  const { language } = useLanguage();
  const [selectedExp, setSelectedExp] = useState<ExperienceType | null>(null);
  const [activeTab, setActiveTab] = useState<'work' | 'organization'>('work');

  const experiences = activeTab === 'work' ? workExperience : organizationExperience;
  const TabIcon = activeTab === 'work' ? Briefcase : Users;

  return (
    <section id="experience" className="py-24 bg-white dark:bg-[#0B1120] relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSectionTitle
          badge={language === 'en' ? "Professional Journey" : "Perjalanan Profesional"}
          badgeIcon={<Rocket className="w-5 h-5 text-emerald-500" />}
          title={language === 'en' ? "My Experience" : "Pengalaman Saya"}
          subtitle={language === 'en' 
            ? "A chronological journey through my professional milestones and technical impact."
            : "Perjalanan kronologis melalui pencapaian profesional dan dampak teknis saya."}
        />

        {/* Tab Switcher */}
        <div className="flex justify-center mb-20">
          <div className="bg-gray-50/50 dark:bg-gray-800/30 backdrop-blur-2xl p-1.5 rounded-[1.5rem] border border-gray-200/50 dark:border-gray-700/50 shadow-xl flex gap-2">
            <button
              onClick={() => setActiveTab('work')}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-500 ${
                activeTab === 'work'
                  ? 'bg-white dark:bg-gray-700 text-emerald-500 shadow-lg'
                  : 'text-gray-400 hover:text-emerald-500'
              }`}
            >
              <Monitor size={16} />
              Work
            </button>
            <button
              onClick={() => setActiveTab('organization')}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-500 ${
                activeTab === 'organization'
                  ? 'bg-white dark:bg-gray-700 text-emerald-500 shadow-lg'
                  : 'text-gray-400 hover:text-emerald-500'
              }`}
            >
              <Users size={16} />
              Organizations
            </button>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative wrap overflow-hidden p-10 h-full max-w-6xl mx-auto">
          <div className="absolute border-2 border-emerald-500/10 h-full rounded-full" style={{ left: '50%', transform: 'translateX(-50%)' }}></div>

          <motion.div
            key={activeTab}
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {experiences.map((exp, i) => (
              <DesktopTimelineCard 
                key={exp.id} 
                exp={exp} 
                side={i % 2 === 0 ? 'left' : 'right'} 
                icon={<TabIcon size={20} />}
                onClick={() => setSelectedExp(exp)}
              />
            ))}
          </motion.div>
        </div>

        {/* Compact & Flexible Modal inside Portal */}
        <Portal>
          <AnimatePresence>
            {selectedExp && (
              <motion.div
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[99999] flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedExp(null)}
              >
                <motion.div
                  className="bg-white dark:bg-gray-900 rounded-[2.5rem] max-w-4xl w-full h-auto max-h-[90vh] overflow-hidden shadow-2xl relative border border-gray-100 dark:border-gray-800"
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedExp(null)}
                    className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-red-500 dark:hover:bg-red-500 hover:text-white flex items-center justify-center transition-all duration-300"
                  >
                    <X size={20} />
                  </button>

                  <div className="flex flex-col md:flex-row max-h-[90vh]">
                    {/* Left Column */}
                    <div className="w-full md:w-[350px] bg-gray-50/50 dark:bg-gray-800/50 p-8 border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-700 shrink-0">
                      {selectedExp.image ? (
                        <div className="relative w-full aspect-video md:aspect-[4/5] rounded-3xl overflow-hidden shadow-xl mb-8 group">
                          <Image 
                            src={selectedExp.image} 
                            alt={selectedExp.company} 
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        </div>
                      ) : (
                        <div className="w-full aspect-video rounded-3xl bg-emerald-500/10 flex items-center justify-center mb-8">
                          <Briefcase size={40} className="text-emerald-500" />
                        </div>
                      )}

                      <div className="space-y-4">
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                          <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Company Type</p>
                          <p className="text-xs font-bold text-emerald-500">{selectedExp.companyType}</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                          <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Period</p>
                          <p className="text-xs font-bold dark:text-white">{selectedExp.period}</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                          <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Location</p>
                          <p className="text-xs font-bold dark:text-white">{selectedExp.location || 'Remote'}</p>
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex-1 p-8 md:p-10 overflow-y-auto custom-scrollbar">
                      <div className="mb-8">
                        <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tighter mb-2">
                          {selectedExp.company}
                        </h3>
                        <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm">
                          <BadgeCheck size={18} />
                          {selectedExp.title}
                        </div>
                      </div>

                      <div className="space-y-8">
                        <div>
                          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 mb-4 flex items-center gap-3">
                            Overview
                            <span className="flex-1 h-px bg-emerald-500/10"></span>
                          </h4>
                          <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 font-medium leading-relaxed italic border-l-4 border-emerald-500/30 pl-4">
                            "{selectedExp.shortDescription}"
                          </p>
                        </div>

                        <div>
                          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 mb-4 flex items-center gap-3">
                            Detailed Contributions
                            <span className="flex-1 h-px bg-emerald-500/10"></span>
                          </h4>
                          <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 whitespace-pre-line leading-loose">
                            {selectedExp.description}
                          </div>
                        </div>

                        {selectedExp.techStack && (
                          <div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 mb-4 flex items-center gap-3">
                              Stack
                              <span className="flex-1 h-px bg-emerald-500/10"></span>
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedExp.techStack.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-3 py-1.5 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-[10px] font-bold border border-gray-100 dark:border-gray-700"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </Portal>
      </div>
    </section>
  );
};
