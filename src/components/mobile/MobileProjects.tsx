'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { individualProjects } from '../../data/portfolio';
import type { Project } from '../../types';
import { ProjectDetailDialog, projectDetailLinks } from '../shared/ProjectDetailDialog';
import { ViewAllProjects } from './ViewAllProjects';
import Carousel from '../shared/Carousel';

export const MobileProjects: React.FC = () => {
  const { language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
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

      {selectedProject && (
        <ProjectDetailDialog
          key={selectedProject.id}
          title={selectedProject.title}
          category={selectedProject.type === 'design'
            ? (language === 'en' ? 'Design' : 'Desain')
            : (language === 'en' ? 'Project' : 'Proyek')}
          description={language === 'en' ? selectedProject.description : (selectedProject.descriptionId || selectedProject.description)}
          images={selectedProject.slides?.length ? selectedProject.slides : [selectedProject.image]}
          tools={selectedProject.techStack}
          links={projectDetailLinks(language, selectedProject.links)}
          overviewLabel={language === 'en' ? 'Overview' : 'Ringkasan'}
          toolsLabel={language === 'en' ? 'Stack' : 'Teknologi'}
          closeLabel={language === 'en' ? 'Close' : 'Tutup'}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
