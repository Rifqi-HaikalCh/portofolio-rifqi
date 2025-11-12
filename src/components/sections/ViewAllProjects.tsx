'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { individualProjects, designProjects, groupProjects } from '../../data/portfolio';
import { ExternalLink, Github, Figma, FileText, X, ArrowLeft } from 'lucide-react';
import type { Project } from '../../types';

interface ViewAllProjectsProps {
  onBack: () => void;
  projectType?: 'design' | 'web' | 'all';
}

export const ViewAllProjects: React.FC<ViewAllProjectsProps> = ({ onBack, projectType = 'all' }) => {
  const { language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'design' | 'web'>(projectType);

  // Filter projects based on type - include all project sources
  const allProjects = [...individualProjects, ...groupProjects, ...designProjects];
  const filteredProjects = allProjects.filter(project => {
    if (activeFilter === 'all') return true;
    // Web filter includes both 'web' and 'mobile' types
    if (activeFilter === 'web') return project.type === 'web' || project.type === 'mobile';
    return project.type === activeFilter;
  });

  const getProjectTypeLabel = (type: string = 'web') => {
    const labels: Record<string, { en: string; id: string }> = {
      web: { en: 'Web Dev', id: 'Web Dev' },
      design: { en: 'UI/UX Design', id: 'Desain UI/UX' },
      mobile: { en: 'Mobile', id: 'Mobile' }
    };
    return labels[type]?.[language] || type;
  };

  return (
    <>
      <div className="fixed inset-0 bg-white dark:bg-gray-900 z-[1100] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 z-10 shadow-sm mt-0">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={onBack}
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {language === 'en' ? 'All Projects' : 'Semua Projek'}
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {filteredProjects.length} {language === 'en' ? 'projects' : 'projek'}
                  </p>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    activeFilter === 'all'
                      ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {language === 'en' ? 'All' : 'Semua'}
                </button>
                <button
                  onClick={() => setActiveFilter('design')}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    activeFilter === 'design'
                      ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  🎨 {language === 'en' ? 'UI/UX Design' : 'Desain UI/UX'}
                </button>
                <button
                  onClick={() => setActiveFilter('web')}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    activeFilter === 'web'
                      ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  💻 {language === 'en' ? 'Web Dev' : 'Web Dev'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.button
                key={project.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedProject(project)}
                className="w-full text-left group"
              >
                <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 h-full flex flex-col">
                  {/* Project Image */}
                  <div className="relative h-64 overflow-hidden flex-shrink-0">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Type Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-emerald-500 text-white text-xs font-bold rounded-full backdrop-blur-sm shadow-lg">
                        {getProjectTypeLabel(project.type)}
                      </span>
                    </div>

                    {/* Quick Actions */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      {project.links.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-9 h-9 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                        >
                          <ExternalLink size={16} className="text-emerald-600" />
                        </a>
                      )}
                      {project.links.prototype && (
                        <a
                          href={project.links.prototype}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-9 h-9 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                        >
                          <Figma size={16} className="text-purple-600" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-5 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-grow">
                      {language === 'en' ? project.description : (project.descriptionId || project.description)}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium rounded-lg"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium rounded-lg">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
              <div className="text-8xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {language === 'en' ? 'No Projects Found' : 'Tidak Ada Projek'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {language === 'en'
                  ? 'Try changing the filter to see more projects'
                  : 'Coba ubah filter untuk melihat projek lainnya'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Full Screen Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1200] flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 z-10 px-6 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {language === 'en' ? 'Project Details' : 'Detail Projek'}
                  </span>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Project Image */}
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-xl">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 90vw"
                    className="object-cover"
                  />
                </div>

                {/* Project Info */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1.5 bg-emerald-500 text-white text-xs font-bold rounded-full">
                      {getProjectTypeLabel(selectedProject.type)}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                    {selectedProject.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                    {language === 'en' ? selectedProject.description : (selectedProject.descriptionId || selectedProject.description)}
                  </p>
                </div>

                {/* Tech Stack */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">
                    {language === 'en' ? 'Technologies Used' : 'Teknologi yang Digunakan'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium rounded-lg border border-emerald-200 dark:border-emerald-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                  {selectedProject.links.demo && (
                    <a
                      href={selectedProject.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-4 px-6 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                      <ExternalLink size={18} />
                      {language === 'en' ? 'View Live Demo' : 'Lihat Demo Langsung'}
                    </a>
                  )}
                  {selectedProject.links.prototype && (
                    <a
                      href={selectedProject.links.prototype}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-4 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                      <Figma size={18} />
                      {language === 'en' ? 'View Prototype' : 'Lihat Prototipe'}
                    </a>
                  )}
                  {selectedProject.links.github && (
                    <a
                      href={selectedProject.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-4 px-6 bg-gray-800 dark:bg-gray-700 text-white rounded-2xl font-semibold hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Github size={18} />
                      {language === 'en' ? 'View Code' : 'Lihat Kode'}
                    </a>
                  )}
                  {selectedProject.links.needToKnow && (
                    <a
                      href={selectedProject.links.needToKnow}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-4 px-6 bg-blue-500 text-white rounded-2xl font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 shadow-lg"
                    >
                      <FileText size={18} />
                      {language === 'en' ? 'Documentation' : 'Dokumentasi'}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
