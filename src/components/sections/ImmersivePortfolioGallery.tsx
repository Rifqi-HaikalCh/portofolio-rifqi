"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { AnimatedSectionTitle } from '../shared/AnimatedSectionTitle';
import { InteractiveButton } from '../shared/InteractiveButton';
import StandardModal from '../shared/StandardModal';
import { Play, Pause, ChevronLeft, ChevronRight, ExternalLink, Eye } from 'lucide-react';

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
  colors: string[];
  size: 'small' | 'medium' | 'large';
}

const designProjects: DesignProject[] = [
  {
    id: 'assets-management',
    titleEn: 'Assets Management System',
    titleId: 'Sistem Manajemen Aset',
    descriptionEn: 'A comprehensive web design system for asset management platform with focus on user experience and data visualization. Features advanced dashboard analytics and intuitive navigation.',
    descriptionId: 'Sistem desain web komprehensif untuk platform manajemen aset dengan fokus pada pengalaman pengguna dan visualisasi data. Menampilkan analitik dashboard canggih dan navigasi intuitif.',
    category: 'Web Design',
    images: [
      '/assets/Assets Manajemen Web Design-01.png',
      '/assets/Assets Manajemen Web Design-02.png',
      '/assets/Assets Manajemen Web Design-03.png',
      '/assets/Assets Manajemen Web Design-04.png',
      '/assets/Assets Manajemen Web Design-05.png',
      '/assets/Assets Manajemen Web Design-06.png',
      '/assets/Assets Manajemen Web Design-07.png',
      '/assets/Assets Manajemen Web Design-08.png',
      '/assets/Assets Manajemen Web Design-09.png',
      '/assets/Assets Manajemen Web Design-10.png'
    ],
    tools: ['Figma', 'Adobe Photoshop', 'Principle', 'Framer'],
    year: '2024',
    client: 'Enterprise Client',
    colors: ['var(--primary-500)', 'var(--primary-700)', 'var(--neutral-100)'],
    size: 'large'
  },
  {
    id: 'campus-website',
    titleEn: 'Campus Portal Design',
    titleId: 'Desain Portal Kampus',
    descriptionEn: 'Modern and accessible campus website design focusing on student experience and information architecture. Includes student portal, course management, and administrative features.',
    descriptionId: 'Desain website kampus modern dan accessible yang berfokus pada pengalaman mahasiswa dan arsitektur informasi. Termasuk portal mahasiswa, manajemen kursus, dan fitur administratif.',
    category: 'Web Design',
    images: [
      '/assets/Campuss Website Design-1.png',
      '/assets/Campuss Website Design-2.png',
      '/assets/Campuss Website Design-3.png',
      '/assets/Campuss Website Design-4.png',
      '/assets/Campuss Website Design-5.png',
      '/assets/Campuss Website Design-6.png',
      '/assets/Campuss Website Design-7.png',
      '/assets/Campuss Website Design-8.png',
      '/assets/Campuss Website Design-9.png'
    ],
    tools: ['Figma', 'Sketch', 'InVision', 'Miro'],
    year: '2024',
    client: 'Educational Institution',
    colors: ['var(--accent-500)', 'var(--accent-700)', 'var(--accent-50)'],
    size: 'medium'
  },
  {
    id: 'gordenaise',
    titleEn: 'Gordenaise E-commerce',
    titleId: 'E-commerce Gordenaise',
    descriptionEn: 'Luxury home decor e-commerce platform with emphasis on visual appeal and conversion optimization. Features AR visualization and personalized recommendations.',
    descriptionId: 'Platform e-commerce dekorasi rumah mewah dengan penekanan pada daya tarik visual dan optimasi konversi. Menampilkan visualisasi AR dan rekomendasi personal.',
    category: 'E-commerce Design',
    images: [
      '/assets/Gordenaise Website Design-01.png',
      '/assets/Gordenaise Website Design-02.png',
      '/assets/Gordenaise Website Design-03.png',
      '/assets/Gordenaise Website Design-04.png',
      '/assets/Gordenaise Website Design-05.png',
      '/assets/Gordenaise Website Design-06.png',
      '/assets/Gordenaise Website Design-07.png',
      '/assets/Gordenaise Website Design-08.png',
      '/assets/Gordenaise Website Design-09.png',
      '/assets/Gordenaise Website Design-10.png'
    ],
    tools: ['Figma', 'Adobe XD', 'Photoshop', 'After Effects'],
    year: '2024',
    client: 'Retail Business',
    colors: ['var(--secondary-500)', 'var(--secondary-700)', 'var(--secondary-50)'],
    size: 'large'
  }
];

export function ImmersivePortfolioGallery() {
  const { language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<DesignProject | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isCarouselPlaying, setIsCarouselPlaying] = useState(false);
  const [viewMode, setViewMode] = useState<'masonry' | 'carousel'>('masonry');
  const carouselRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const categories = ['all', 'Web Design', 'Mobile Design', 'E-commerce Design'];
  const filteredProjects = activeCategory === 'all' 
    ? designProjects 
    : designProjects.filter(project => project.category === activeCategory);

  // Parallax effect for background
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  // Auto-carousel functionality
  useEffect(() => {
    if (!isCarouselPlaying || viewMode !== 'carousel') return;

    const interval = setInterval(() => {
      if (carouselRef.current) {
        const container = carouselRef.current;
        const scrollAmount = container.scrollLeft + container.clientWidth;
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        if (scrollAmount >= maxScroll) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: container.clientWidth, behavior: 'smooth' });
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isCarouselPlaying, viewMode]);

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

  // Masonry layout calculation
  const getMasonryHeight = (size: string, index: number) => {
    const base = 300;
    if (size === 'small') return base * 0.8;
    if (size === 'large') return base * 1.4;
    return base;
  };

  const getMasonrySpan = (size: string) => {
    if (size === 'large') return 'col-span-2 row-span-2';
    if (size === 'small') return 'col-span-1';
    return 'col-span-1 row-span-1';
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Fixed modal sizing issues */}
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-bg-primary to-bg-secondary"
        style={{ y: backgroundY }}
      />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({length: 6}).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 bg-gradient-to-br from-primary-300/10 to-accent-300/10 rounded-full blur-3xl"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 20}%`,
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-8">
        <div className="text-center mb-12">
          <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm tracking-wider uppercase badge-label">Design Showcase</span>
          <h2 className="text-5xl font-extrabold tracking-tight mt-2 text-gray-900 dark:text-white relative">
            <span className="relative">Creative Project Design</span>
            <span className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent blur-sm opacity-50 animate-gradient-bg bg-[length:400%_400%]" aria-hidden="true">Creative Project Design</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Berikut adalah beberapa desain UI/UX yang telah saya kerjakan, berfokus pada pengalaman pengguna yang intuitif dan menarik.
          </p>
        </div>

        {/* View Controls */}
        <motion.div 
          className="flex flex-row items-center justify-between gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* View Mode Toggle */}
          <div className="glass-card p-2 flex rounded-2xl">
            <button
              onClick={() => setViewMode('masonry')}
              className={`px-6 py-3 rounded-xl transition-all duration-300 flex items-center space-x-2 ${
                viewMode === 'masonry'
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
              </div>
              <span className="font-medium">Masonry</span>
            </button>
            <button
              onClick={() => setViewMode('carousel')}
              className={`px-6 py-3 rounded-xl transition-all duration-300 flex items-center space-x-2 ${
                viewMode === 'carousel'
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-current rounded-full"></div>
                <div className="w-3 h-3 bg-current rounded-full"></div>
                <div className="w-3 h-3 bg-current rounded-full"></div>
              </div>
              <span className="font-medium">Carousel</span>
            </button>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <InteractiveButton
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-accent-500 to-primary-500 text-white shadow-lg'
                    : 'glass-card text-text-secondary hover:text-text-primary'
                }`}
              >
                {category === 'all' 
                  ? (language === 'en' ? 'All' : 'Semua')
                  : category
                }
              </InteractiveButton>
            ))}
          </div>
        </motion.div>

        {/* Masonry View */}
        <AnimatePresence mode="wait">
          {viewMode === 'masonry' && (
            <motion.div
              key="masonry"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="columns-4 gap-6 space-y-6"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="break-inside-avoid mb-6 group cursor-pointer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ y: -8 }}
                  onClick={() => openModal(project, 0)}
                >
                  <div className="modern-card overflow-hidden relative">
                    {/* Main Image */}
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <Image
                        src={project.images[0]}
                        alt={project.titleEn}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                          <Eye className="w-6 h-6 text-white" />
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span 
                          className="glass-card px-3 py-1 text-xs font-semibold text-white"
                          style={{ backgroundColor: project.colors[0] + '40' }}
                        >
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-text-primary group-hover:text-primary-500 transition-colors duration-300">
                          {language === 'en' ? project.titleEn : project.titleId}
                        </h3>
                        <span className="text-sm text-text-tertiary">{project.year}</span>
                      </div>
                      
                      <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                        {language === 'en' ? project.descriptionEn : project.descriptionId}
                      </p>

                      {/* Color Palette */}
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          {project.colors.slice(0, 3).map((color, i) => (
                            <div 
                              key={i}
                              className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <div className="flex items-center space-x-2 text-text-tertiary">
                          <span className="text-xs">{project.images.length} images</span>
                        </div>
                      </div>

                      {/* Tools */}
                      <div className="flex flex-wrap gap-1 mt-3">
                        {project.tools.slice(0, 3).map((tool) => (
                          <span
                            key={tool}
                            className="text-xs bg-surface-secondary text-text-tertiary px-2 py-1 rounded-md"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Carousel View */}
          {viewMode === 'carousel' && (
            <motion.div
              key="carousel"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Carousel Controls */}
              <div className="flex items-center justify-center space-x-4">
                <InteractiveButton
                  onClick={() => setIsCarouselPlaying(!isCarouselPlaying)}
                  className="glass-card p-4 text-text-primary hover:text-primary-500 transition-colors"
                >
                  {isCarouselPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </InteractiveButton>
                <span className="text-sm text-text-secondary">
                  {language === 'en' ? 'Auto-play carousel' : 'Putar otomatis'}
                </span>
              </div>

              {/* Carousel Container */}
              <div 
                ref={carouselRef}
                className="flex space-x-8 overflow-x-auto scrollbar-hide py-4"
                style={{ scrollSnapType: 'x mandatory' }}
              >
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    className="flex-shrink-0 w-96 cursor-pointer group"
                    style={{ scrollSnapAlign: 'center' }}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => openModal(project, 0)}
                  >
                    <div className="modern-card overflow-hidden h-full">
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={project.images[0]}
                          alt={project.titleEn}
                          fill
                          sizes="(max-width: 1024px) 80vw, 384px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-text-primary mb-2">
                          {language === 'en' ? project.titleEn : project.titleId}
                        </h3>
                        <p className="text-text-secondary text-sm mb-4">
                          {language === 'en' ? project.descriptionEn : project.descriptionId}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-2">
                            {project.colors.slice(0, 3).map((color, i) => (
                              <div 
                                key={i}
                                className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                          <ExternalLink className="w-4 h-4 text-text-tertiary group-hover:text-primary-500 transition-colors" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Modal */}
        <StandardModal
          isOpen={!!selectedProject}
          onClose={closeModal}
          title={selectedProject ? (language === 'en' ? selectedProject.titleEn : selectedProject.titleId) : ''}
          maxWidth="2xl"
          className="overflow-hidden"
        >
          {selectedProject && (
            <>
              {/* Project Info Header */}
              <div className="mb-4">
                <div className="flex flex-wrap items-center gap-2 text-gray-600 dark:text-gray-300 text-sm">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                    {selectedProject.category}
                  </span>
                  <span>{selectedProject.year}</span>
                  <span>
                    {selectedImageIndex + 1} / {selectedProject.images.length}
                  </span>
                </div>
                
                {/* Color Palette */}
                <div className="flex space-x-1 mt-2">
                  {selectedProject.colors.slice(0, 3).map((color, i) => (
                    <div 
                      key={i}
                      className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600 shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Image Container */}
              <div className="relative bg-gray-100 dark:bg-gray-800 min-h-[300px] flex items-center justify-center rounded-lg mb-4">
                <div className="relative w-full max-h-[60vh] h-[60vh]">
                  <Image
                    key={selectedImageIndex}
                    src={selectedProject.images[selectedImageIndex]}
                    alt={`${selectedProject.titleEn} - ${selectedImageIndex + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 90vw"
                    objectFit="contain"
                    className="object-contain"
                    motion
                    motionProps={{
                      initial: { opacity: 0, x: 20 },
                      animate: { opacity: 1, x: 0 },
                      transition: { duration: 0.3 }
                    }}
                  />
                </div>

                {/* Navigation Arrows */}
                {selectedProject.images.length > 1 && (
                  <>
                    <InteractiveButton
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 dark:bg-black/20 backdrop-blur-sm text-gray-800 dark:text-white hover:bg-white/30 dark:hover:bg-black/30 transition-all rounded-full"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </InteractiveButton>
                    <InteractiveButton
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 dark:bg-black/20 backdrop-blur-sm text-gray-800 dark:text-white hover:bg-white/30 dark:hover:bg-black/30 transition-all rounded-full"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </InteractiveButton>
                  </>
                )}
              </div>

              {/* Enhanced Image Thumbnails */}
              {selectedProject.images.length > 1 && (
                <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
                    {selectedProject.images.map((image, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all relative ${
                          index === selectedImageIndex
                            ? 'border-emerald-500 shadow-lg'
                            : 'border-gray-300 dark:border-gray-600 hover:border-emerald-300'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Image
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Details Footer */}
              <div>
                <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm leading-relaxed">
                  {language === 'en' ? selectedProject.descriptionEn : selectedProject.descriptionId}
                </p>
                
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                  
                  {selectedProject.client && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      <span className="font-medium">
                        {language === 'en' ? 'Client: ' : 'Klien: '}
                      </span>
                      {selectedProject.client}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </StandardModal>
      </div>
    </section>
  );
}