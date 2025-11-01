'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { individualProjects } from '../../data/portfolio';
import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import Carousel from '../shared/Carousel';
import { ViewAllProjects } from './ViewAllProjects';

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
    colors: ['#2563eb', '#06b6d4', '#10b981']
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
    colors: ['#1e40af', '#059669', '#d97706']
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
    colors: ['#a855f7', '#ec4899', '#06b6d4']
  }
];

export const MobileImmersivePortfolioGallery: React.FC = () => {
  const { language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<DesignProject | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [carouselWidth, setCarouselWidth] = useState(340);
  const [showAllProjects, setShowAllProjects] = useState(false);

  // Set carousel width based on window size
  React.useEffect(() => {
    const updateWidth = () => {
      setCarouselWidth(Math.min(340, window.innerWidth - 48));
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Filter UI/UX design projects from individualProjects
  const uiuxProjects = individualProjects.filter(project => project.type === 'design');

  const openModal = (project: DesignProject, imageIndex: number = 0) => {
    setSelectedProject(project);
    setSelectedImageIndex(imageIndex);
  };

  const closeModal = () => {
    setSelectedProject(null);
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

  // Show ViewAllProjects component if toggled (with 'design' filter for UI/UX Designer role)
  if (showAllProjects) {
    return <ViewAllProjects onBack={() => setShowAllProjects(false)} projectType="design" />;
  }

  return (
    <section className="py-8 px-6 bg-white dark:bg-gray-800">
      {/* Section Header */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {language === 'en' ? 'Design Portfolio' : 'Portofolio Desain'}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {language === 'en'
            ? 'UI/UX design projects focusing on user experience'
            : 'Proyek desain UI/UX dengan fokus pada pengalaman pengguna'}
        </p>
      </motion.div>

      {/* UI/UX Carousel */}
      {uiuxProjects.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {language === 'en' ? '🎨 Featured Design Projects' : '🎨 Proyek Desain Unggulan'}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {language === 'en'
                ? 'Swipe through my design portfolio'
                : 'Geser untuk melihat portofolio desain saya'}
            </p>
          </motion.div>
          <div className="flex justify-center overflow-x-auto pb-2">
            <Carousel
              items={uiuxProjects}
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
        className="w-full py-4 px-6 border-2 border-purple-500 text-purple-500 rounded-full font-semibold active:scale-95 transition-transform hover:bg-purple-50 dark:hover:bg-purple-900/20"
      >
        {language === 'en' ? 'View All Design Projects' : 'Lihat Semua Proyek Desain'}
      </motion.button>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-b from-black/90 to-transparent p-4 flex items-center justify-between">
              <div className="text-white">
                <p className="text-sm font-semibold">
                  {language === 'en' ? selectedProject.titleEn : selectedProject.titleId}
                </p>
                <p className="text-xs text-white/60">
                  {selectedImageIndex + 1} / {selectedProject.images.length}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white active:scale-90 transition-transform"
              >
                <X size={20} />
              </button>
            </div>

            {/* Image Container */}
            <div className="flex-1 relative flex items-center justify-center p-4">
              <motion.div
                key={selectedImageIndex}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative w-full h-full"
              >
                <Image
                  src={selectedProject.images[selectedImageIndex]}
                  alt={`${selectedProject.titleEn} - ${selectedImageIndex + 1}`}
                  fill
                  className="object-contain"
                  priority
                  sizes="100vw"
                />
              </motion.div>
            </div>

            {/* Navigation */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white active:scale-90 transition-transform shadow-lg"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white active:scale-90 transition-transform shadow-lg"
            >
              <ChevronRight size={24} />
            </button>

            {/* Bottom Info */}
            <div className="bg-gradient-to-t from-black/90 to-transparent p-4">
              {/* Thumbnail Gallery */}
              {selectedProject.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto mb-4 scrollbar-hide">
                  {selectedProject.images.map((image, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                        index === selectedImageIndex
                          ? 'border-purple-500 scale-110'
                          : 'border-white/30'
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Image
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Project Details */}
              <div className="text-white">
                <p className="text-sm text-white/80 mb-2">
                  {language === 'en' ? selectedProject.descriptionEn : selectedProject.descriptionId}
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-xs bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-md"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
