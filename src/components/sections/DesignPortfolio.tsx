"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { AnimatedSectionTitle } from '../shared/AnimatedSectionTitle';
import { AnimatedCard } from '../shared/AnimatedCard';
import { InteractiveButton } from '../shared/InteractiveButton';

interface DesignProject {
  id: string;
  titleEn: string;
  titleId: string;
  descriptionEn: string;
  descriptionId: string;
  category: string;
  images: string[];
  tools: string[];
  year: string;
  client?: string;
}

const designProjects: DesignProject[] = [
  {
    id: 'assets-management',
    titleEn: 'Assets Management Web Design',
    titleId: 'Desain Web Manajemen Aset',
    descriptionEn: 'A comprehensive web design system for asset management platform with focus on user experience and data visualization.',
    descriptionId: 'Sistem desain web komprehensif untuk platform manajemen aset dengan fokus pada pengalaman pengguna dan visualisasi data.',
    category: 'Web Design',
    images: Array.from({length: 10}, (_, i) => `/assets/placeholder-design.svg`), // Using placeholder for now
    tools: ['Figma', 'Adobe Photoshop', 'Principle'],
    year: '2024',
    client: 'Enterprise Client'
  },
  {
    id: 'campus-website',
    titleEn: 'Campus Website Design',
    titleId: 'Desain Website Kampus',
    descriptionEn: 'Modern and accessible campus website design focusing on student experience and information architecture.',
    descriptionId: 'Desain website kampus modern dan accessible yang berfokus pada pengalaman mahasiswa dan arsitektur informasi.',
    category: 'Web Design',
    images: Array.from({length: 9}, (_, i) => `/assets/placeholder-design.svg`), // Using placeholder for now
    tools: ['Figma', 'Sketch', 'InVision'],
    year: '2024',
    client: 'Educational Institution'
  },
  {
    id: 'gordenaise',
    titleEn: 'Gordenaise Website Design',
    titleId: 'Desain Website Gordenaise',
    descriptionEn: 'E-commerce website design for home decor and curtains with emphasis on visual appeal and conversion optimization.',
    descriptionId: 'Desain website e-commerce untuk dekorasi rumah dan gorden dengan penekanan pada daya tarik visual dan optimasi konversi.',
    category: 'E-commerce Design',
    images: Array.from({length: 10}, (_, i) => `/assets/placeholder-design.svg`), // Using placeholder for now
    tools: ['Figma', 'Adobe XD', 'Photoshop'],
    year: '2024',
    client: 'Retail Business'
  }
];

export function DesignPortfolio() {
  const { language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<DesignProject | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', 'Web Design', 'E-commerce Design'];
  const filteredProjects = activeCategory === 'all' 
    ? designProjects 
    : designProjects.filter(project => project.category === activeCategory);

  const openModal = (project: DesignProject, imageIndex: number = 0) => {
    setSelectedProject(project);
    setSelectedImageIndex(imageIndex);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    if (selectedProject) {
      setSelectedImageIndex((prev) => 
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setSelectedImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-rose-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSectionTitle
          badge={language === 'en' ? 'Design Portfolio' : 'Portofolio Desain'}
          title={language === 'en' ? 'Creative Design Showcase' : 'Showcase Desain Kreatif'}
          subtitle={language === 'en' 
            ? 'Explore my visual design projects that combine aesthetics with user experience' 
            : 'Jelajahi proyek desain visual saya yang menggabungkan estetika dengan pengalaman pengguna'
          }
        />

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {categories.map((category) => (
            <InteractiveButton
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
              }`}
            >
              {category === 'all' 
                ? (language === 'en' ? 'All Projects' : 'Semua Proyek')
                : category
              }
            </InteractiveButton>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <AnimatedCard delay={index * 0.1} className="group h-full">
                  <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700 h-full flex flex-col">
                    {/* Project Header */}
                    <div className="p-6 pb-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-full">
                          {project.category}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {project.year}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {language === 'en' ? project.titleEn : project.titleId}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {language === 'en' ? project.descriptionEn : project.descriptionId}
                      </p>
                    </div>

                    {/* Image Grid Preview */}
                    <div className="flex-1 p-6 pt-0">
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {project.images.slice(0, 4).map((image, imgIndex) => (
                          <motion.div
                            key={imgIndex}
                            className={`relative overflow-hidden rounded-lg cursor-pointer ${
                              imgIndex === 0 ? 'col-span-2 aspect-video' : 'aspect-square'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => openModal(project, imgIndex)}
                          >
                            <img
                              src={image}
                              alt={`${project.titleEn} - ${imgIndex + 1}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/assets/placeholder-design.svg';
                              }}
                            />
                            {imgIndex === 3 && project.images.length > 4 && (
                              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                <span className="text-white font-semibold">
                                  +{project.images.length - 4} {language === 'en' ? 'more' : 'lagi'}
                                </span>
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>

                      {/* Tools & Client */}
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          {project.tools.map((tool) => (
                            <span
                              key={tool}
                              className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-md"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                        {project.client && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {language === 'en' ? 'Client: ' : 'Klien: '}{project.client}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* View All Button */}
                    <div className="p-6 pt-0">
                      <InteractiveButton
                        onClick={() => openModal(project, 0)}
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                      >
                        {language === 'en' ? 'View Full Project' : 'Lihat Proyek Lengkap'}
                      </InteractiveButton>
                    </div>
                  </div>
                </AnimatedCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <motion.div
                className="relative max-w-6xl max-h-[90vh] mx-4 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {language === 'en' ? selectedProject.titleEn : selectedProject.titleId}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">
                        {selectedImageIndex + 1} / {selectedProject.images.length}
                      </p>
                    </div>
                    <InteractiveButton
                      onClick={closeModal}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </InteractiveButton>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="relative">
                  <img
                    src={selectedProject.images[selectedImageIndex]}
                    alt={`${selectedProject.titleEn} - ${selectedImageIndex + 1}`}
                    className="w-full max-h-[60vh] object-contain bg-gray-50 dark:bg-gray-900"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/assets/placeholder-design.svg';
                    }}
                  />

                  {/* Navigation Arrows */}
                  {selectedProject.images.length > 1 && (
                    <>
                      <InteractiveButton
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </InteractiveButton>
                      <InteractiveButton
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </InteractiveButton>
                    </>
                  )}
                </div>

                {/* Image Thumbnails */}
                {selectedProject.images.length > 1 && (
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex space-x-2 overflow-x-auto">
                      {selectedProject.images.map((image, index) => (
                        <InteractiveButton
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                            index === selectedImageIndex
                              ? 'border-purple-500'
                              : 'border-gray-300 dark:border-gray-600'
                          }`}
                        >
                          <img
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/assets/placeholder-design.svg';
                            }}
                          />
                        </InteractiveButton>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}