"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { individualProjects, groupProjects, designProjects as uiuxProjects } from '../../data/portfolio';
import type { Project } from '../../types';
import { 
  Github, 
  ExternalLink, 
  X, 
  ArrowLeft, 
  BadgeCheck, 
  FileText,
  Search,
  Figma,
  Monitor,
  Code,
  Layout
} from 'lucide-react';
import TiltedCard from '../shared/TiltedCard';
import { Portal } from '../shared/Portal';

interface ViewAllProjectsProps {
  onBack: () => void;
  projectType?: 'individual' | 'group' | 'design' | 'all';
}

export function ViewAllProjects({ onBack, projectType = 'all' }: ViewAllProjectsProps) {
  const { language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<'all' | 'development' | 'uiux'>('all');

  // Combine and Transform Data
  const allProjects = useMemo(() => [
    ...individualProjects.map(p => ({ ...p, categoryType: 'Development' })),
    ...groupProjects.map(p => ({ ...p, categoryType: 'Development' })),
    ...uiuxProjects.map(p => ({ 
      ...p, 
      categoryType: 'UI/UX Design',
      links: { demo: p.links.demo, figma: p.links.prototype, needToKnow: p.links.needToKnow, github: (p.links as any).github }
    }))
  ], []);

  const filteredProjects = allProjects.filter(p => {
    const matchesFilter = 
      activeFilter === 'all' || 
      (activeFilter === 'development' && p.categoryType === 'Development') ||
      (activeFilter === 'uiux' && p.categoryType === 'UI/UX Design');
    
    const matchesSearch = 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.techStack.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B1120] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header & Back Button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-emerald-500 font-black text-xs uppercase tracking-[0.2em] group w-fit"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform" />
            {language === 'en' ? 'Back to Overview' : 'Kembali'}
          </button>

          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder={language === 'en' ? "Search all projects..." : "Cari semua projek..."}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all shadow-inner"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Standardized Tab Filter */}
        <div className="flex justify-center mb-16">
          <div className="bg-gray-50/50 dark:bg-gray-800/30 backdrop-blur-2xl p-1.5 rounded-[1.5rem] border border-gray-200/50 dark:border-gray-700/50 shadow-xl flex gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                activeFilter === 'all'
                  ? 'bg-white dark:bg-gray-700 text-emerald-500 shadow-md'
                  : 'text-gray-400 hover:text-emerald-500'
              }`}
            >
              <Layout size={14} />
              All Projects
            </button>
            <button
              onClick={() => setActiveFilter('development')}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                activeFilter === 'development'
                  ? 'bg-white dark:bg-gray-700 text-emerald-500 shadow-md'
                  : 'text-gray-400 hover:text-emerald-500'
              }`}
            >
              <Code size={14} />
              Development
            </button>
            <button
              onClick={() => setActiveFilter('uiux')}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                activeFilter === 'uiux'
                  ? 'bg-white dark:bg-gray-700 text-emerald-500 shadow-md'
                  : 'text-gray-400 hover:text-emerald-500'
              }`}
            >
              <Monitor size={14} />
              UI/UX Design
            </button>
          </div>
        </div>

        {/* Grid Display */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                layout
              >
                <TiltedCard scaleOnHover={1.02} rotateAmplitude={3} containerHeight="100%" containerWidth="100%">
                  <div 
                    onClick={() => setSelectedProject(project)}
                    className="group relative h-full overflow-hidden rounded-[2.5rem] bg-white dark:bg-gray-800 shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-gray-100 dark:border-gray-700 cursor-pointer transition-all duration-500 hover:border-emerald-500/50"
                  >
                    <div className="relative h-60 overflow-hidden">
                      <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                      <span className={`absolute top-6 left-6 px-4 py-1.5 text-[9px] font-black rounded-full uppercase tracking-widest shadow-lg ${project.categoryType === 'Development' ? 'bg-blue-500' : 'bg-emerald-500'} text-white`}>
                        {project.categoryType}
                      </span>
                    </div>
                    <div className="p-8">
                      <h4 className="text-xl font-black text-gray-900 dark:text-white mb-3 uppercase tracking-tighter line-clamp-1 group-hover:text-emerald-500 transition-colors">{project.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 italic line-clamp-2 mb-8 leading-relaxed">"{project.description}"</p>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.slice(0, 3).map((t: string) => (
                          <span key={t} className="px-3 py-1 bg-gray-50 dark:bg-gray-900/50 text-gray-600 dark:text-gray-300 text-[9px] font-bold rounded-lg uppercase border border-gray-100 dark:border-gray-700">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltedCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-32">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
              <Search size={32} />
            </div>
            <p className="text-gray-500 font-black uppercase tracking-widest text-xs italic">No results matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Standardized Project Modal with 20% Opacity */}
      <Portal>
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[999999] flex items-center justify-center p-4 sm:p-8"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                className="bg-white dark:bg-gray-900 rounded-[2.5rem] max-w-5xl w-full max-h-[95vh] overflow-hidden shadow-2xl relative border border-gray-100 dark:border-gray-800 flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute top-6 right-6 z-50">
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="w-12 h-12 rounded-full bg-white/40 dark:bg-black/40 backdrop-blur-md border border-white/30 text-white hover:bg-emerald-500 transition-all flex items-center justify-center shadow-xl"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="overflow-y-auto custom-scrollbar flex-1">
                  <div className="relative w-full aspect-video sm:aspect-[21/9] overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <Image src={selectedProject.image} alt={selectedProject.title} fill className="object-contain" priority />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent" />
                  </div>

                  <div className="p-8 sm:p-12">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 border-b border-gray-100 dark:border-gray-800 pb-12">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <span className={`px-4 py-1.5 ${selectedProject.categoryType === 'Development' ? 'bg-blue-500/10 text-blue-500' : 'bg-emerald-500/10 text-emerald-500'} rounded-full text-[10px] font-black uppercase tracking-[0.2em]`}>
                            {selectedProject.categoryType}
                          </span>
                        </div>
                        <h3 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tighter uppercase leading-tight">
                          {selectedProject.title}
                        </h3>
                      </div>

                      <div className="flex flex-wrap gap-4 shrink-0">
                        {selectedProject.links?.github && (
                          <a href={selectedProject.links.github} target="_blank" className="flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs shadow-xl hover:bg-black hover:-translate-y-1 transition-all uppercase tracking-widest">
                            <Github size={18} /> SOURCE
                          </a>
                        )}
                        {selectedProject.links?.figma && (
                          <a href={selectedProject.links.figma} target="_blank" className="flex items-center gap-3 px-8 py-4 bg-emerald-500 text-white rounded-2xl font-black text-xs shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 hover:-translate-y-1 transition-all uppercase tracking-widest">
                            <Figma size={18} /> FIGMA
                          </a>
                        )}
                        {selectedProject.links?.demo && (
                          <a href={selectedProject.links.demo} target="_blank" className="flex items-center gap-3 px-8 py-4 bg-blue-500 text-white rounded-2xl font-black text-xs shadow-xl shadow-blue-500/20 hover:bg-blue-600 hover:-translate-y-1 transition-all uppercase tracking-widest">
                            <ExternalLink size={18} /> PREVIEW
                          </a>
                        )}
                        {selectedProject.links?.needToKnow && (
                          <a href={selectedProject.links.needToKnow} target="_blank" className="flex items-center gap-3 px-8 py-4 bg-orange-500 text-white rounded-2xl font-black text-xs shadow-xl shadow-orange-500/20 hover:bg-orange-600 hover:-translate-y-1 transition-all uppercase tracking-widest">
                            <FileText size={18} /> DOCUMENTATION
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                      <div className="lg:col-span-8">
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500 mb-8 flex items-center gap-4">
                          Project Detail
                          <span className="flex-1 h-px bg-emerald-500/10"></span>
                        </h4>
                        <p className="text-xl text-gray-600 dark:text-gray-300 leading-[2] font-medium italic border-l-4 border-emerald-500/30 pl-8">
                          "{selectedProject.description}"
                        </p>
                      </div>

                      <div className="lg:col-span-4 space-y-12">
                        <div>
                          <h4 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500 mb-6 flex items-center gap-4">
                            Stack Integration
                          </h4>
                          <div className="flex flex-wrap gap-3">
                            {selectedProject.techStack.map((tech: string) => (
                              <span key={tech} className="px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-[10px] font-black rounded-xl border border-gray-100 dark:border-gray-700">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </div>
  );
}
