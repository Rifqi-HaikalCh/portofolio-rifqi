"use client";

import React, { useState, useRef, useEffect } from 'react'; // DIUBAH: Tambahkan useRef, useEffect
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { individualProjects, groupProjects } from '../../data/portfolio';
import type { Project } from '../../types';
import { Github, ExternalLink, FileText, Smartphone, FolderOpen } from 'lucide-react';
import StandardModal from '../shared/StandardModal';
import TiltedCard from '../shared/TiltedCard';
import { AnimatedSectionTitle } from '../shared/AnimatedSectionTitle';

// Component ProjectCard ada di dalam file ini, kita akan modifikasi
// ... (ProjectCard component akan ada di bawah)

export function Projects() {
  const { language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // --- State & Ref untuk Hybrid Auto-Scroll (Individual) ---
  const individualScrollRef = useRef<HTMLDivElement>(null);
  const [isInteractingIndividual, setIsInteractingIndividual] = useState(false);
  const individualIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isDraggingIndividualRef = useRef(false);

  // --- State & Ref untuk Hybrid Auto-Scroll (Group) ---
  const groupScrollRef = useRef<HTMLDivElement>(null);
  const [isInteractingGroup, setIsInteractingGroup] = useState(false);
  const groupIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isDraggingGroupRef = useRef(false);

  // --- Logic untuk Hybrid Auto-Scroll (Individual) ---
  useEffect(() => {
    const container = individualScrollRef.current;

    if (individualIntervalRef.current) {
      clearInterval(individualIntervalRef.current);
    }

    if (isInteractingIndividual) {
      return;
    }

    individualIntervalRef.current = setInterval(() => {
      if (container) {
        if (Math.ceil(container.scrollLeft) >= container.scrollWidth - container.clientWidth) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollLeft += 1;
        }
      }
    }, 50); // Kecepatan scroll

    return () => {
      if (individualIntervalRef.current) {
        clearInterval(individualIntervalRef.current);
      }
    };
  }, [isInteractingIndividual]);

  // --- Logic untuk Hybrid Auto-Scroll (Group) ---
  useEffect(() => {
    const container = groupScrollRef.current;

    if (groupIntervalRef.current) {
      clearInterval(groupIntervalRef.current);
    }

    if (isInteractingGroup) {
      return;
    }

    groupIntervalRef.current = setInterval(() => {
      if (container) {
        if (Math.ceil(container.scrollLeft) >= container.scrollWidth - container.clientWidth) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollLeft += 1;
        }
      }
    }, 50); // Kecepatan scroll

    return () => {
      if (groupIntervalRef.current) {
        clearInterval(groupIntervalRef.current);
      }
    };
  }, [isInteractingGroup]);

  const openModal = (project: Project) => setSelectedProject(project);
  const closeModal = () => setSelectedProject(null);

  const getCategoryStyles = (category: 'individual' | 'group' | 'design') => {
    switch (category) {
      case 'individual':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500 border-cyan-300/50';
      case 'group':
        return 'bg-gradient-to-r from-green-500 to-emerald-500 border-emerald-300/50';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600 border-gray-300/50';
    }
  };

  return (
    <>
    {/* Enhanced Header */}
        <AnimatedSectionTitle
          badge="Portfolio Showcase"
          badgeIcon={<FolderOpen className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />}
          title={language === 'en' ? "Featured Projects" : "Projek Unggulan"} // UBAH INI
          subtitle={language === 'en' // UBAH INI
            ? "Discover the projects that showcase my technical expertise and creative problem-solving abilities"
            : "Temukan proyek-proyek yang menunjukkan keahlian teknis dan kemampuan pemecahan masalah kreatif saya"
          }
        />
      {/* ----- INDIVIDUAL PROJECTS SECTION ----- */}
      <div className="mb-16">
        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3 text-center">
          {language === 'en' ? 'Individual Projects' : 'Proyek Individu'}
        </h3>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full mb-8" />
        
        {/* --- Wrapper Scroll Hybrid (Individual) --- */}
        <div
          ref={individualScrollRef}
          className="relative w-full overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-blue-500/50 scrollbar-track-blue-100/30 dark:scrollbar-thumb-blue-400/50 dark:scrollbar-track-blue-900/30 cursor-grab active:cursor-grabbing"
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

      {/* ----- GROUP PROJECTS SECTION ----- */}
      <div>
        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3 text-center">
          {language === 'en' ? 'Group Projects' : 'Proyek Kelompok'}
        </h3>
        <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto rounded-full mb-8" />
        
        {/* --- Wrapper Scroll Hybrid (Group) --- */}
        <div
          ref={groupScrollRef}
          className="relative w-full overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-green-500/50 scrollbar-track-green-100/30 dark:scrollbar-thumb-green-400/50 dark:scrollbar-track-green-900/30 cursor-grab active:cursor-grabbing"
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

      {/* Modal untuk Detail Proyek */}
      <ProjectModal selectedProject={selectedProject} closeModal={closeModal} />
    </>
  );
}

// --- PROJECT CARD COMPONENT (MODIFIED) ---
interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const { language } = useLanguage();
  const title = language === 'en' ? project.title : project.title || project.title;
  const description = language === 'en' ? project.description : project.descriptionId || project.description;

  const getCategoryStyles = (category: 'individual' | 'group' | 'design' | undefined) => {
    switch (category) {
      case 'individual':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white';
      case 'group':
        return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      case 'design':
        return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const getIcon = (type: 'web' | 'mobile' | 'design' | undefined) => {
    switch (type) {
      case 'mobile':
        return <Smartphone className="w-3 h-3" />;
      case 'design':
        return <ExternalLink className="w-3 h-3" />; // Menggunakan ikon figma/external
      default:
        return <ExternalLink className="w-3 h-3" />;
    }
  };

  return (
    <TiltedCard
      scaleOnHover={1.05}
      rotateAmplitude={8}
      containerHeight="100%"
      containerWidth="100%"
    >
      <motion.div
        // DIUBAH: Tambahkan flex flex-col agar layout internal konsisten
        className="group relative h-full overflow-hidden rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:shadow-2xl flex flex-col"
        layoutId={`project-card-${project.id}`}
        onClick={onClick}
        whileHover={{ y: -8 }}
      >
        <div className="relative h-56 w-full overflow-hidden flex-shrink-0">
          <Image
            src={project.image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            className="transition-all duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          <span
            className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full shadow-lg border border-white/20 ${getCategoryStyles(project.category)}`}
          >
            {project.category}
          </span>
        </div>

        {/* DIUBAH: Tambahkan flex-grow flex flex-col */}
        <div className="p-5 flex-grow flex flex-col">
          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {title}
          </h4>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3 mb-4">
            {description}
          </p>

          {/* DIUBAH: Tambahkan flex-grow untuk mendorong link ke bawah */}
          <div className="mt-4 flex flex-wrap gap-2 flex-grow">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2.5 py-1 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-200 text-xs font-medium rounded-full">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>

          {/* Tombol Aksi (flex-shrink-0 agar tidak mengecil) */}
          <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-700/50 flex-shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {language === 'en' ? 'Click to view details' : 'Klik untuk lihat detail'}
              </span>
              <div className="flex items-center space-x-2">
                {project.links.github && (
                  <span className="p-2 rounded-full bg-gray-100/80 dark:bg-gray-700/80 group-hover:bg-gray-200 dark:group-hover:bg-gray-600 transition-colors">
                    <Github className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                  </span>
                )}
                {project.links.demo && (
                  <span className="p-2 rounded-full bg-gray-100/80 dark:bg-gray-700/80 group-hover:bg-gray-200 dark:group-hover:bg-gray-600 transition-colors">
                    {getIcon(project.type)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </TiltedCard>
  );
};

// --- MODAL COMPONENT (Tidak berubah) ---
interface ProjectModalProps {
  selectedProject: Project | null;
  closeModal: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ selectedProject, closeModal }) => {
  const { language } = useLanguage();

  if (!selectedProject) return null;

  const title = language === 'en' ? selectedProject.title : selectedProject.title || selectedProject.title;
  const description = language === 'en' ? selectedProject.description : selectedProject.descriptionId || selectedProject.description;

  return (
    <StandardModal
      isOpen={!!selectedProject}
      onClose={closeModal}
      title={title}
      maxWidth="2xl"
    >
      <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden mb-6">
        <Image
          src={selectedProject.image}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex-shrink-0">
            {language === 'en' ? 'Tech Stack:' : 'Teknologi:'}
          </span>
          <div className="flex flex-wrap gap-2">
            {selectedProject.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-4">
          {selectedProject.links.github && (
            <a
              href={selectedProject.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg shadow-md hover:bg-gray-900 transition-colors"
            >
              <Github className="w-4 h-4" />
              {language === 'en' ? 'View on GitHub' : 'Lihat di GitHub'}
            </a>
          )}
          {selectedProject.links.demo && (
            <a
              href={selectedProject.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              {language === 'en' ? 'View Live Demo' : 'Lihat Live Demo'}
            </a>
          )}
          {selectedProject.links.prototype && (
             <a
              href={selectedProject.links.prototype}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              {language === 'en' ? 'View Prototype' : 'Lihat Prototype'}
            </a>
          )}
          {selectedProject.links.needToKnow && (
            <a
              href={selectedProject.links.needToKnow}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <FileText className="w-4 h-4" />
              {language === 'en' ? 'View Documentation' : 'Lihat Dokumentasi'}
            </a>
          )}
        </div>
      </div>
    </StandardModal>
  );
};