"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { individualProjects, groupProjects } from '../../data/portfolio';
import type { Project } from '../../types';
import { Github, ExternalLink, Smartphone, X, BadgeCheck, FileText, Figma } from 'lucide-react';
import TiltedCard from '../shared/TiltedCard';
import { Portal } from '../shared/Portal';

export function Projects({ onShowAll }: { onShowAll: () => void }) {
  const { language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const individualScrollRef = useRef<HTMLDivElement>(null);
  const [isInteractingIndividual, setIsInteractingIndividual] = useState(false);
  const individualIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isDraggingIndividualRef = useRef(false);

  const groupScrollRef = useRef<HTMLDivElement>(null);
  const [isInteractingGroup, setIsInteractingGroup] = useState(false);
  const groupIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isDraggingGroupRef = useRef(false);

  useEffect(() => {
    const container = individualScrollRef.current;
    if (individualIntervalRef.current) clearInterval(individualIntervalRef.current);
    if (isInteractingIndividual) return;
    individualIntervalRef.current = setInterval(() => {
      if (container) {
        if (Math.ceil(container.scrollLeft) >= container.scrollWidth - container.clientWidth) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollLeft += 1;
        }
      }
    }, 50);
    return () => { if (individualIntervalRef.current) clearInterval(individualIntervalRef.current); };
  }, [isInteractingIndividual]);

  useEffect(() => {
    const container = groupScrollRef.current;
    if (groupIntervalRef.current) clearInterval(groupIntervalRef.current);
    if (isInteractingGroup) return;
    groupIntervalRef.current = setInterval(() => {
      if (container) {
        if (Math.ceil(container.scrollLeft) >= container.scrollWidth - container.clientWidth) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollLeft += 1;
        }
      }
    }, 50);
    return () => { if (groupIntervalRef.current) clearInterval(groupIntervalRef.current); };
  }, [isInteractingGroup]);

  const openModal = (project: Project) => setSelectedProject(project);
  const closeModal = () => setSelectedProject(null);

  return (
    <div id="projects-container" className="bg-transparent">
      {/* INDIVIDUAL PROJECTS */}
      <div className="mb-16">
        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3 text-center uppercase tracking-tighter">
          {language === 'en' ? 'Individual Projects' : 'Proyek Individu'}
        </h3>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full mb-8" />
        
        <div
          ref={individualScrollRef}
          className="relative w-full overflow-x-auto pb-6 scrollbar-hide cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsInteractingIndividual(true)}
          onMouseLeave={() => { if (!isDraggingIndividualRef.current) setIsInteractingIndividual(false); }}
          onMouseDown={() => { isDraggingIndividualRef.current = true; setIsInteractingIndividual(true); }}
          onMouseUp={() => { isDraggingIndividualRef.current = false; setIsInteractingIndividual(false); }}
          onTouchStart={() => setIsInteractingIndividual(true)}
          onTouchEnd={() => setIsInteractingIndividual(false)}
        >
          <div className="flex space-x-6 lg:space-x-8 px-4 sm:px-0 py-6">
            {individualProjects.map((project) => (
              <div key={project.id} className="w-80 md:w-96 flex-shrink-0 h-full">
                <ProjectCard project={project} onClick={() => openModal(project)} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GROUP PROJECTS */}
      <div>
        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3 text-center uppercase tracking-tighter">
          {language === 'en' ? 'Group Projects' : 'Proyek Kelompok'}
        </h3>
        <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto rounded-full mb-8" />
        
        <div
          ref={groupScrollRef}
          className="relative w-full overflow-x-auto pb-6 scrollbar-hide cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsInteractingGroup(true)}
          onMouseLeave={() => { if (!isDraggingGroupRef.current) setIsInteractingGroup(false); }}
          onMouseDown={() => { isDraggingGroupRef.current = true; setIsInteractingGroup(true); }}
          onMouseUp={() => { isDraggingGroupRef.current = false; setIsInteractingGroup(false); }}
          onTouchStart={() => setIsInteractingGroup(true)}
          onTouchEnd={() => setIsInteractingGroup(false)}
        >
          <div className="flex space-x-6 lg:space-x-8 px-4 sm:px-0 py-6">
            {groupProjects.map((project) => (
              <div key={project.id} className="w-80 md:w-96 flex-shrink-0 h-full">
                <ProjectCard project={project} onClick={() => openModal(project)} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <motion.button
          onClick={onShowAll}
          className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 uppercase text-xs tracking-widest"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {language === 'en' ? 'View All Projects' : 'Lihat Semua Projek'}
        </motion.button>
      </div>

      <ProjectModal selectedProject={selectedProject} closeModal={closeModal} />
    </div>
  );
}

const ProjectCard = ({ project, onClick }: { project: Project, onClick: () => void }) => {
  const { language } = useLanguage();
  
  return (
    <TiltedCard scaleOnHover={1.02} rotateAmplitude={3} containerHeight="100%" containerWidth="100%">
      <motion.div
        className="group relative h-full overflow-hidden rounded-[2rem] bg-white dark:bg-gray-800 shadow-xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:shadow-2xl flex flex-col cursor-pointer"
        onClick={onClick}
        whileHover={{ y: -8 }}
      >
        <div className="relative h-52 w-full overflow-hidden shrink-0">
          <Image src={project.image} alt={project.title} fill style={{ objectFit: 'cover' }} className="transition-all duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-black/20" />
          <span className={`absolute top-4 left-4 px-3 py-1 text-[9px] font-black rounded-full uppercase tracking-widest ${project.category === 'individual' ? 'bg-blue-500' : 'bg-emerald-500'} text-white`}>
            {project.category}
          </span>
        </div>
        <div className="p-8 flex-grow flex flex-col">
          <h4 className="text-xl font-black text-gray-900 dark:text-white mb-2 line-clamp-1 uppercase tracking-tighter">{project.title}</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 italic mb-6">"{project.description}"</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack.slice(0, 3).map((tech) => (
              <span key={tech} className="px-3 py-1 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-[9px] font-bold rounded-lg uppercase">{tech}</span>
            ))}
          </div>
          <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center text-emerald-500 font-black text-[10px] uppercase tracking-widest">
            <span>Explore Details</span>
            <ExternalLink size={14} />
          </div>
        </div>
      </motion.div>
    </TiltedCard>
  );
};

const ProjectModal = ({ selectedProject, closeModal }: { selectedProject: Project | null, closeModal: () => void }) => {
  if (!selectedProject) return null;

  return (
    <Portal>
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[999999] flex items-center justify-center p-4 sm:p-8"
            onClick={closeModal}
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
                  onClick={closeModal}
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
                        <span className={`px-4 py-1.5 ${selectedProject.category === 'individual' ? 'bg-blue-500/10 text-blue-500' : 'bg-emerald-500/10 text-emerald-500'} rounded-full text-[10px] font-black uppercase tracking-[0.2em]`}>
                          {selectedProject.category} Project
                        </span>
                      </div>
                      <h3 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tighter uppercase leading-tight">
                        {selectedProject.title}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-4 shrink-0">
                      {selectedProject.links.github && (
                        <a href={selectedProject.links.github} target="_blank" className="flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs shadow-xl hover:bg-black hover:-translate-y-1 transition-all uppercase tracking-widest">
                          <Github size={18} /> SOURCE
                        </a>
                      )}
                      {selectedProject.links.demo && (
                        <a href={selectedProject.links.demo} target="_blank" className="flex items-center gap-3 px-8 py-4 bg-emerald-500 text-white rounded-2xl font-black text-xs shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 hover:-translate-y-1 transition-all uppercase tracking-widest">
                          <ExternalLink size={18} /> PREVIEW
                        </a>
                      )}
                      {selectedProject.links.needToKnow && (
                        <a href={selectedProject.links.needToKnow} target="_blank" className="flex items-center gap-3 px-8 py-4 bg-orange-500 text-white rounded-2xl font-black text-xs shadow-xl shadow-orange-500/20 hover:bg-orange-600 hover:-translate-y-1 transition-all uppercase tracking-widest">
                          <FileText size={18} /> DOCUMENTATION
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-8">
                      <h4 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500 mb-8 flex items-center gap-4">
                        Implementation Detail
                        <span className="flex-1 h-px bg-emerald-500/10"></span>
                      </h4>
                      <p className="text-xl text-gray-600 dark:text-gray-300 leading-[2] font-medium">
                        {selectedProject.description}
                      </p>
                    </div>

                    <div className="lg:col-span-4 space-y-12">
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500 mb-6 flex items-center gap-4">
                          Stack Integration
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {selectedProject.techStack.map((tech) => (
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
  );
};
