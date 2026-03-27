'use client';
import React, { useState, useMemo } from 'react';
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
  ChevronRight, 
  Building2, 
  BadgeCheck,
  Rocket
} from 'lucide-react';
import { Portal } from '../shared/Portal';
import type { Experience as ExperienceType } from '../../types';
import { calculateTotalExperience } from '../../lib/experience-utils';

export const MobileExperience: React.FC = () => {
  const { language } = useLanguage();
  const [selectedExp, setSelectedExp] = useState<ExperienceType | null>(null);
  const [activeTab, setActiveTab] = useState<'work' | 'organization'>('work');

  const experiences = activeTab === 'work' ? workExperience : organizationExperience;
  const TabIcon = activeTab === 'work' ? Briefcase : Users;

  const totalExp = useMemo(() => calculateTotalExperience(workExperience), []);

  return (
    <section className="py-20 px-6 bg-white dark:bg-[#0B1120] overflow-hidden min-h-screen">
      {/* Section Header */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <div className="flex justify-center mb-4">
          <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
            <Rocket size={20} />
          </div>
        </div>
        <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full text-[9px] font-black uppercase tracking-widest mb-3">
          {language === 'en' ? 'Professional Journey' : 'Perjalanan Profesional'}
        </span>
        <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">
          {language === 'en' ? 'Experience' : 'Pengalaman'}
        </h2>
      </motion.div>

      {/* Total Experience Highlight (Mobile) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mb-10 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-emerald-500/20 flex items-center gap-4"
      >
        <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
          <Calendar size={18} />
        </div>
        <div>
          <p className="text-[8px] font-black uppercase tracking-widest text-gray-400 mb-0.5">
            {language === 'en' ? 'Total Work Experience' : 'Total Pengalaman Kerja'}
          </p>
          <p className="text-sm font-black text-gray-900 dark:text-white">
            {totalExp.years} {language === 'en' ? 'Years' : 'Tahun'} {totalExp.months} {language === 'en' ? 'Months' : 'Bulan'}
          </p>
        </div>
      </motion.div>

      {/* Tab Selection */}
      <div className="flex gap-2 mb-10 bg-gray-50 dark:bg-gray-800/50 p-1 rounded-2xl border border-gray-100 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('work')}
          className={`flex-1 py-3 px-4 rounded-xl font-black transition-all duration-500 flex items-center justify-center gap-2 text-[9px] uppercase tracking-widest ${
            activeTab === 'work'
              ? 'bg-white dark:bg-gray-700 text-emerald-500 shadow-sm'
              : 'text-gray-400'
          }`}
        >
          <Briefcase size={14} />
          Work
        </button>
        <button
          onClick={() => setActiveTab('organization')}
          className={`flex-1 py-3 px-4 rounded-xl font-black transition-all duration-500 flex items-center justify-center gap-2 text-[9px] uppercase tracking-widest ${
            activeTab === 'organization'
              ? 'bg-white dark:bg-gray-700 text-emerald-500 shadow-sm'
              : 'text-gray-400'
          }`}
        >
          <Users size={14} />
          Org
        </button>
      </div>

      {/* Experience Timeline */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="space-y-8"
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-10"
              onClick={() => setSelectedExp(exp)}
            >
              <div className="absolute left-[15px] top-10 bottom-[-32px] w-0.5 bg-gradient-to-b from-emerald-500/20 to-transparent" />
              <div className="absolute left-0 top-2 w-[32px] h-[32px] rounded-xl bg-white dark:bg-gray-900 border-2 border-emerald-500 flex items-center justify-center text-emerald-500 z-10 shadow-md">
                <TabIcon size={14} />
              </div>

              <div className="bg-white dark:bg-gray-800/30 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 active:scale-95 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">
                    {exp.companyType}
                  </span>
                  <ChevronRight size={16} className="text-gray-300" />
                </div>
                
                <h3 className="font-black text-gray-900 dark:text-white text-base mb-1">
                  {exp.title}
                </h3>
                
                <p className="text-gray-500 dark:text-gray-400 text-[11px] font-bold mb-3 flex items-center gap-1.5">
                  <Building2 size={12} className="text-emerald-500" />
                  {exp.company}
                </p>
                
                <p className="text-[11px] text-gray-400 italic line-clamp-2 leading-relaxed">
                  "{exp.shortDescription}"
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Adaptive Bottom Sheet Modal with Portal */}
      <Portal>
        <AnimatePresence>
          {selectedExp && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99999] flex items-end justify-center"
              onClick={() => setSelectedExp(null)}
            >
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="bg-white dark:bg-gray-900 rounded-t-[2.5rem] w-full max-h-[85vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Handle & Header */}
                <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 pt-4 pb-2 flex flex-col items-center border-b border-gray-50 dark:border-gray-800">
                  <div className="w-10 h-1 bg-gray-200 dark:bg-gray-800 rounded-full mb-4" />
                  <div className="w-full px-8 flex justify-between items-center mb-2">
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Case Study Detail</span>
                    <button onClick={() => setSelectedExp(null)} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full active:scale-90 transition-transform">
                      <X size={16} />
                    </button>
                  </div>
                </div>

                <div className="px-8 py-6 pb-12">
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-tight mb-2 tracking-tighter">
                    {selectedExp.company}
                  </h3>
                  <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs mb-8">
                    <BadgeCheck size={16} />
                    {selectedExp.title}
                  </div>

                  {selectedExp.image && (
                    <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-lg mb-8">
                      <Image src={selectedExp.image} alt={selectedExp.company} fill className="object-cover" />
                    </div>
                  )}

                  <div className="space-y-8">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                        <p className="text-[8px] uppercase font-black text-gray-400 tracking-widest mb-1">Timeline</p>
                        <p className="text-[10px] font-bold dark:text-white">{selectedExp.period}</p>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                        <p className="text-[8px] uppercase font-black text-gray-400 tracking-widest mb-1">Location</p>
                        <p className="text-[10px] font-bold dark:text-white">{selectedExp.location || 'Remote'}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-500 mb-3 flex items-center gap-3">
                        Executive Summary
                        <span className="flex-1 h-px bg-emerald-500/10"></span>
                      </h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300 font-medium leading-relaxed italic border-l-3 border-emerald-500/30 pl-4">
                        "{selectedExp.shortDescription}"
                      </p>
                    </div>

                    <div>
                      <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-500 mb-3 flex items-center gap-3">
                        Key Responsibilities
                        <span className="flex-1 h-px bg-emerald-500/10"></span>
                      </h4>
                      <ul className="space-y-3">
                        {selectedExp.description.split('\n').filter(line => line.trim() !== '').map((line, idx) => (
                          <li key={idx} className="flex gap-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            <span className="text-emerald-500 mt-1.5 shrink-0">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            </span>
                            <span>{line.replace(/^[•\-\s]+/, '')}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {selectedExp.techStack && (
                      <div>
                        <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-500 mb-3 flex items-center gap-3">
                          Tech Stack
                          <span className="flex-1 h-px bg-emerald-500/10"></span>
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedExp.techStack.map((tech) => (
                            <span key={tech} className="px-3 py-1 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg text-[9px] font-bold border border-gray-100 dark:border-gray-700 shadow-sm">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </section>
  );
};
