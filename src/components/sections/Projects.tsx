'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext'; //
import { individualProjects, groupProjects } from '../../data/portfolio';
import { staggerContainer, fadeInUp } from '../../lib/animations';
import { ExternalLink, Github, FolderOpen, Figma, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatedSectionTitle } from '../shared/AnimatedSectionTitle';
import { AnimatedCard } from '../shared/AnimatedCard';
import { InteractiveButton } from '../shared/InteractiveButton';
import StandardModal from '../shared/StandardModal';
import TiltedCard from '../shared/TiltedCard';
import type { Project } from '../../types';

export const Projects: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'individual' | 'group'>('individual');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Get all individual projects EXCEPT design projects (to keep existing web projects)
  const webIndividualProjects = individualProjects.filter(project => project.type !== 'design');

  const currentProjects = activeTab === 'individual' ? webIndividualProjects : groupProjects;

  // Check scroll position
  const checkScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );

    // Calculate scroll progress (0 to 100)
    const progress = (container.scrollLeft / (container.scrollWidth - container.clientWidth)) * 100;
    setScrollProgress(Math.min(100, Math.max(0, progress)));
  };

  // Smooth scroll to direction
  const scroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = 420; // Card width (400) + gap (20)
    const targetScroll = direction === 'left'
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  // Mouse drag to scroll
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollRef.current;
    if (!container) return;

    setIsDragging(true);
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const container = scrollRef.current;
    if (!container) return;

    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    container.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Scroll event listener
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Initial check
    checkScroll();

    // Add scroll listener
    scrollContainer.addEventListener('scroll', checkScroll);

    return () => {
      scrollContainer.removeEventListener('scroll', checkScroll);
    };
  }, [currentProjects]);

  const openModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <div className="container mx-auto px-4 relative z-10">
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
        
        {/* Enhanced Tab Buttons */}
        <div className="flex justify-center gap-2 mb-16">
          <motion.button
            onClick={() => setActiveTab('individual')}
            className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 relative overflow-hidden ${
              activeTab === 'individual'
                ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-glow'
                : 'border-2 border-emerald-500/20 text-gray-700 dark:text-gray-300 hover:border-emerald-500 hover:bg-emerald-500/10'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={`absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 translate-x-[-100%] transition-transform duration-500 ${activeTab === 'individual' ? '' : 'group-hover:translate-x-[100%]'}`}></div>
            <span className="relative">{language === 'en' ? "Individual" : "Individu"}</span>
          </motion.button>
          <motion.button
            onClick={() => setActiveTab('group')}
            className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 relative overflow-hidden ${
              activeTab === 'group'
                ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-glow'
                : 'border-2 border-emerald-500/20 text-gray-700 dark:text-gray-300 hover:border-emerald-500 hover:bg-emerald-500/10'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={`absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 translate-x-[-100%] transition-transform duration-500 ${activeTab === 'group' ? '' : 'group-hover:translate-x-[100%]'}`}></div>
            <span className="relative">{language === 'en' ? "Group" : "Kelompok"}</span>
          </motion.button>
        </div>

        {/* Enhanced Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <motion.button
            onClick={() => scroll('left')}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-xl border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center transition-all duration-300 ${
              canScrollLeft
                ? 'opacity-100 hover:scale-110 hover:shadow-2xl cursor-pointer'
                : 'opacity-0 pointer-events-none'
            }`}
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-gray-900 dark:text-white" />
          </motion.button>

          <motion.button
            onClick={() => scroll('right')}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-xl border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center transition-all duration-300 ${
              canScrollRight
                ? 'opacity-100 hover:scale-110 hover:shadow-2xl cursor-pointer'
                : 'opacity-0 pointer-events-none'
            }`}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-gray-900 dark:text-white" />
          </motion.button>

          {/* Fade Edges */}
          <div className={`absolute left-0 top-0 bottom-8 w-24 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-[5] pointer-events-none transition-opacity duration-300 ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`} />
          <div className={`absolute right-0 top-0 bottom-8 w-24 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-[5] pointer-events-none transition-opacity duration-300 ${canScrollRight ? 'opacity-100' : 'opacity-0'}`} />

          {/* Horizontal Scrollable Projects */}
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            className={`flex gap-6 overflow-x-auto pb-8 scroll-smooth scrollbar-hide px-2 ${isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'}`}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          <AnimatePresence mode="wait">
            {currentProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="flex-shrink-0 w-[400px]"
              >
                {/* TiltedCard hanya untuk tilt/3D — TIDAK menambahkan layer visual lain */}
                <TiltedCard
                  scaleOnHover={1.05}
                  rotateAmplitude={8}
                  containerHeight="100%"
                  containerWidth="100%"
                >
                  {/* Pastikan hanya 1 elemen rounded dan bg: */}
                  <div
                    onClick={() => openModal(project)}
                    className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 cursor-pointer h-full shadow-lg"
                  >
                    {/* Project Image */}
                    <div className="relative overflow-hidden h-60">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  
                  {/* Floating Action Buttons */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {project.links.demo && (
                      <motion.a
                        href={project.links.demo}
                        target="_blank"
                        className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg transition-colors"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={16} />
                      </motion.a>
                    )}
                    {project.links.prototype && (
                      <motion.a
                        href={project.links.prototype}
                        target="_blank"
                        className="w-10 h-10 rounded-full bg-purple-500 hover:bg-purple-600 text-white flex items-center justify-center shadow-lg transition-colors"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.15 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Figma size={16} />
                      </motion.a>
                    )}
                    {project.links.github && (
                      <motion.a
                        href={project.links.github}
                        target="_blank"
                        className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-900 text-white flex items-center justify-center shadow-lg transition-colors"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={16} />
                      </motion.a>
                    )}
                    {project.links.needToKnow && (
                      <motion.a
                        href={project.links.needToKnow}
                        target="_blank"
                        className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center shadow-lg transition-colors"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.25 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FileText size={16} />
                      </motion.a>
                    )}
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-emerald-500/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                      {activeTab === 'individual' ? (language === 'en' ? 'Individual' : 'Individu') : (language === 'en' ? 'Group' : 'Kelompok')}
                    </span>
                  </div>
                </div>
                
                {/* Project Content */}
                <div className="p-6">
                  <motion.h3 
                    className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {project.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {language === 'en' ? project.description : (project.descriptionId || project.description)} {/* UBAH INI */}
                  </motion.p>
                  
                  {/* Tech Stack */}
                  {project.techStack && (
                    <motion.div 
                      className="flex flex-wrap gap-2 mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      {project.techStack.slice(0, 3).map((tech: string, techIndex: number) => (
                        <motion.span
                          key={tech}
                          className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-xs font-medium"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.6 + techIndex * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium">
                          +{project.techStack.length - 3}
                        </span>
                      )}
                    </motion.div>
                  )}
                  
                  {/* Action Buttons */}
                  <motion.div
                    className="flex gap-3 pt-2 flex-wrap"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    {project.links.demo && (
                      <InteractiveButton
                        href={project.links.demo}
                        size="sm"
                        variant="primary"
                        className="flex-1 min-w-[120px]"
                        icon={<ExternalLink size={16} />}
                      >
                        {language === 'en' ? 'Live Demo' : 'Demo'}
                      </InteractiveButton>
                    )}
                    {project.links.prototype && (
                      <InteractiveButton
                        href={project.links.prototype}
                        size="sm"
                        variant="primary"
                        className="flex-1 min-w-[120px] bg-purple-500 hover:bg-purple-600"
                        icon={<Figma size={16} />}
                      >
                        {language === 'en' ? 'Prototype' : 'Prototipe'}
                      </InteractiveButton>
                    )}
                    {project.links.github && (
                      <InteractiveButton
                        href={project.links.github}
                        size="sm"
                        variant="outline"
                        className="flex-1 min-w-[120px]"
                        icon={<Github size={16} />}
                      >
                        {language === 'en' ? 'Code' : 'Kode'}
                      </InteractiveButton>
                    )}
                    {project.links.needToKnow && (
                      <InteractiveButton
                        href={project.links.needToKnow}
                        size="sm"
                        variant="outline"
                        className="flex-1 min-w-[120px] border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                        icon={<FileText size={16} />}
                      >
                        {language === 'en' ? 'Docs' : 'Dokumen'}
                      </InteractiveButton>
                    )}
                  </motion.div>
                </div>
                  </div>
                </TiltedCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Scroll Progress Indicator */}
        <div className="mt-6 flex items-center justify-center gap-3 px-4">
          {/* Progress Bar */}
          <div className="flex-1 max-w-md h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"
              style={{ width: `${scrollProgress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Progress Text */}
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400 min-w-[80px] text-right">
            {Math.round(scrollProgress)}% {language === 'en' ? 'viewed' : 'dilihat'}
          </span>
        </div>

        {/* Scroll Hint */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: canScrollRight ? 1 : 0, y: canScrollRight ? 0 : 10 }}
          className="text-center mt-4"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
            <motion.span
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
            {language === 'en' ? 'Drag or click arrows to explore more projects' : 'Geser atau klik panah untuk melihat lebih banyak projek'}
          </p>
        </motion.div>
      </div>
      </div>

      {/* SINGLE MODAL INSTANCE - RENDERED OUTSIDE THE GRID */}
      <StandardModal isOpen={!!selectedProject} onClose={closeModal}>
        {selectedProject && (
          <div>
            <div className="relative w-full h-96 mb-4 rounded-lg overflow-hidden">
               <Image
                 src={selectedProject.image}
                 alt={selectedProject.title}
                 fill
                 sizes="(max-width: 768px) 100vw, 90vw"
                 className="object-cover"
                 priority
               />
            </div>
            <h3 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{selectedProject.title}</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">{language === 'en' ? selectedProject.description : (selectedProject.descriptionId || selectedProject.description)}</p> {/* UBAH INI */}
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedProject.techStack?.map(tech => (
                  <span key={tech} className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">{tech}</span>
              ))}
            </div>
            <div className="flex gap-4 flex-wrap">
              {selectedProject.links.demo && (
                <a
                  href={selectedProject.links.demo}
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
                >
                  <ExternalLink size={16} />
                  {language === 'en' ? 'Live Demo' : 'Demo'}
                </a>
              )}
              {selectedProject.links.prototype && (
                <a
                  href={selectedProject.links.prototype}
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                >
                  <Figma size={16} />
                  {language === 'en' ? 'View Prototype' : 'Lihat Prototipe'}
                </a>
              )}
              {selectedProject.links.github && (
                <a
                  href={selectedProject.links.github}
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors"
                >
                  <Github size={16} />
                  {language === 'en' ? 'View Code' : 'Lihat Kode'}
                </a>
              )}
              {selectedProject.links.needToKnow && (
                <a
                  href={selectedProject.links.needToKnow}
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  <FileText size={16} />
                  {language === 'en' ? 'Documentation' : 'Dokumentasi'}
                </a>
              )}
            </div>
          </div>
        )}
      </StandardModal>
    </>
  );
};