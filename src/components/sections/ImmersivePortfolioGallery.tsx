"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { individualProjects } from '../../data/portfolio';
import { AnimatedSectionTitle } from '../shared/AnimatedSectionTitle';
import { InteractiveButton } from '../shared/InteractiveButton';
import StandardModal from '../shared/StandardModal';
import TiltedCard from '../shared/TiltedCard';
import { ChevronLeft, ChevronRight, ExternalLink, Eye, Figma } from 'lucide-react';
import type { Project } from '../../types';

export function ImmersivePortfolioGallery() {
  const { language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Filter UI/UX design projects from portfolio data
  const uiuxProjects = individualProjects.filter(project => project.type === 'design');

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
  }, [uiuxProjects]);

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
          badge="Design Portfolio"
          badgeIcon={<Eye className="w-6 h-6 text-purple-600 dark:text-purple-400" />}
          title={language === 'en' ? "UI/UX Design Projects" : "Proyek Desain UI/UX"}
          subtitle={language === 'en'
            ? "Explore my design work showcasing user-centered solutions and creative interfaces"
            : "Jelajahi karya desain saya yang menampilkan solusi berfokus pengguna dan antarmuka kreatif"
          }
        />

        {/* Enhanced Carousel Container */}
        <div className="relative mb-16">
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
          <div className={`absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-[5] pointer-events-none transition-opacity duration-300 ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`} />
          <div className={`absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-[5] pointer-events-none transition-opacity duration-300 ${canScrollRight ? 'opacity-100' : 'opacity-0'}`} />

          {/* Horizontal Scrollable Projects */}
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            className={`flex gap-6 overflow-x-auto pb-8 scroll-smooth px-2 ${isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'}`}
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
          {uiuxProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="flex-shrink-0 w-[400px]"
            >
              <TiltedCard
                scaleOnHover={1.05}
                rotateAmplitude={8}
                containerHeight="100%"
                containerWidth="100%"
              >
                <div
                  onClick={() => openModal(project)}
                  className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 cursor-pointer h-full shadow-lg group"
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
                      {project.links.prototype && (
                        <motion.a
                          href={project.links.prototype}
                          target="_blank"
                          className="w-10 h-10 rounded-full bg-purple-500 hover:bg-purple-600 text-white flex items-center justify-center shadow-lg transition-colors"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Figma size={16} />
                        </motion.a>
                      )}
                      {project.links.demo && (
                        <motion.a
                          href={project.links.demo}
                          target="_blank"
                          className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center shadow-lg transition-colors"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={16} />
                        </motion.a>
                      )}
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-purple-500/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                        UI/UX Design
                      </span>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed">
                      {language === 'en' ? project.description : (project.descriptionId || project.description)}
                    </p>

                    {/* Tech Stack */}
                    {project.techStack && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.techStack.slice(0, 3).map((tech: string) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium">
                            +{project.techStack.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2 flex-wrap">
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
                      {project.links.demo && (
                        <InteractiveButton
                          href={project.links.demo}
                          size="sm"
                          variant="outline"
                          className="flex-1 min-w-[120px] border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white"
                          icon={<ExternalLink size={16} />}
                        >
                          {language === 'en' ? 'View Demo' : 'Lihat Demo'}
                        </InteractiveButton>
                      )}
                    </div>
                  </div>
                </div>
              </TiltedCard>
            </motion.div>
          ))}
        </div>

        {/* Scroll Progress Indicator */}
        <div className="mt-6 flex items-center justify-center gap-3 px-4">
          {/* Progress Bar */}
          <div className="flex-1 max-w-md h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
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
            {language === 'en' ? 'Drag or click arrows to explore more designs' : 'Geser atau klik panah untuk melihat lebih banyak desain'}
          </p>
        </motion.div>
        </div>
      </div>

      {/* Modal for Project Details */}
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
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              {language === 'en' ? selectedProject.description : (selectedProject.descriptionId || selectedProject.description)}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedProject.techStack?.map(tech => (
                <span key={tech} className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">{tech}</span>
              ))}
            </div>
            <div className="flex gap-4 flex-wrap">
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
              {selectedProject.links.demo && (
                <a
                  href={selectedProject.links.demo}
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  <ExternalLink size={16} />
                  {language === 'en' ? 'Live Demo' : 'Demo Langsung'}
                </a>
              )}
            </div>
          </div>
        )}
      </StandardModal>
    </>
  );
}