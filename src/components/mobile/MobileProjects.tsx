'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { individualProjects } from '../../data/portfolio';
import { ExternalLink, Github, Figma, FileText, X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Project } from '../../types';
import { ViewAllProjects } from './ViewAllProjects';
import Carousel from '../shared/Carousel';

export const MobileProjects: React.FC = () => {
  const { language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [carouselWidth, setCarouselWidth] = useState(340);

  // Set carousel width based on window size
  React.useEffect(() => {
    const updateWidth = () => {
      setCarouselWidth(Math.min(340, window.innerWidth - 48));
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Take first 6 projects for mobile grid
  const mobileProjects = individualProjects.slice(0, 6);

  // Filter projects by type for carousels
  const uiuxProjects = individualProjects.filter(project => project.type === 'design');
  const webDevProjects = individualProjects.filter(project => project.type === 'web');

  const nextImage = () => {
    if (selectedProject?.slides) {
      setImageIndex((prev) => (prev + 1) % selectedProject.slides!.length);
    }
  };

  const prevImage = () => {
    if (selectedProject?.slides) {
      setImageIndex((prev) => (prev - 1 + selectedProject.slides!.length) % selectedProject.slides!.length);
    }
  };

  // Show ViewAllProjects component if toggled (with 'web' filter for Developer role)
  if (showAllProjects) {
    return <ViewAllProjects onBack={() => setShowAllProjects(false)} projectType="web" />;
  }

  return (
    <section id="projects" className="py-16 px-6 bg-white dark:bg-gray-800">
      {/* Section Header */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-semibold mb-4">
          {language === 'en' ? 'Portfolio' : 'Portofolio'}
        </span>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          {language === 'en' ? 'Featured Projects' : 'Projek Unggulan'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          {language === 'en'
            ? 'Showcasing my best work and creative solutions'
            : 'Menampilkan karya terbaik dan solusi kreatif saya'
          }
        </p>
      </motion.div>

      {/* Web Dev Projects Carousel - ONLY for Developer Role */}
      {webDevProjects.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {language === 'en' ? '💻 Web Development Projects' : '💻 Proyek Pengembangan Web'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {language === 'en'
                ? 'Swipe to explore my web development portfolio'
                : 'Geser untuk menjelajahi portofolio pengembangan web saya'}
            </p>
          </motion.div>
          <div className="flex justify-center overflow-x-auto pb-2">
            <Carousel
              items={webDevProjects}
              baseWidth={carouselWidth}
              autoplay={true}
              autoplayDelay={4000}
              pauseOnHover={true}
              loop={true}
              language={language}
            />
          </div>
        </motion.div>
      )}

      {/* View All Button */}
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        onClick={() => setShowAllProjects(true)}
        className="w-full py-4 px-6 border-2 border-emerald-500 text-emerald-500 rounded-full font-semibold active:scale-95 transition-transform hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
      >
        {language === 'en' ? 'View All Projects' : 'Lihat Semua Projek'}
      </motion.button>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 z-10">
              <div className="flex items-center justify-between p-4">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center active:scale-90 transition-transform"
                >
                  <X size={20} />
                </button>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {language === 'en' ? 'Project Details' : 'Detail Projek'}
                </span>
                <div className="w-10" /> {/* Spacer */}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Image Gallery */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                <Image
                  src={selectedProject.slides?.[imageIndex] || selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 90vw"
                  className="object-cover"
                />

                {/* Navigation Arrows (if slides exist) */}
                {selectedProject.slides && selectedProject.slides.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm flex items-center justify-center active:scale-90 transition-transform shadow-lg"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm flex items-center justify-center active:scale-90 transition-transform shadow-lg"
                    >
                      <ChevronRight size={20} />
                    </button>

                    {/* Dots Indicator */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                      {selectedProject.slides.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setImageIndex(idx)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            idx === imageIndex
                              ? 'bg-white w-6'
                              : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Project Info */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {selectedProject.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {language === 'en' ? selectedProject.description : (selectedProject.descriptionId || selectedProject.description)}
                </p>
              </div>

              {/* Tech Stack */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">
                  {language === 'en' ? 'Technologies' : 'Teknologi'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                {selectedProject.links.demo && (
                  <a
                    href={selectedProject.links.demo}
                    target="_blank"
                    className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-full font-semibold shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
                  >
                    <ExternalLink size={18} />
                    {language === 'en' ? 'View Live Demo' : 'Lihat Demo'}
                  </a>
                )}
                {selectedProject.links.prototype && (
                  <a
                    href={selectedProject.links.prototype}
                    target="_blank"
                    className="w-full py-4 px-6 bg-purple-500 text-white rounded-full font-semibold shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
                  >
                    <Figma size={18} />
                    {language === 'en' ? 'View Prototype' : 'Lihat Prototipe'}
                  </a>
                )}
                <div className="grid grid-cols-2 gap-3">
                  {selectedProject.links.github && (
                    <a
                      href={selectedProject.links.github}
                      target="_blank"
                      className="py-3 px-4 bg-gray-800 dark:bg-gray-700 text-white rounded-full font-semibold active:scale-95 transition-transform flex items-center justify-center gap-2"
                    >
                      <Github size={16} />
                      {language === 'en' ? 'Code' : 'Kode'}
                    </a>
                  )}
                  {selectedProject.links.needToKnow && (
                    <a
                      href={selectedProject.links.needToKnow}
                      target="_blank"
                      className="py-3 px-4 bg-blue-500 text-white rounded-full font-semibold active:scale-95 transition-transform flex items-center justify-center gap-2"
                    >
                      <FileText size={16} />
                      {language === 'en' ? 'Docs' : 'Dokumen'}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
