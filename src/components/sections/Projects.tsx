'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { individualProjects, groupProjects } from '../../data/portfolio';
import { staggerContainer, fadeInUp } from '../../lib/animations';
import { ExternalLink, Github } from 'lucide-react';

export const Projects: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'individual' | 'group'>('individual');

  const currentProjects = activeTab === 'individual' ? individualProjects : groupProjects;

  return (
    <section id="projects" className="py-20 bg-bg-light dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-text-dark dark:text-white mb-4">
            {t("Featured Projects", "Projek Unggulan")}
          </h2>
        </div>
        <div className="flex justify-center gap-4 mb-12">
          <button onClick={() => setActiveTab('individual')} className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${activeTab === 'individual' ? 'bg-primary-green text-white shadow-lg' : 'bg-white dark:bg-gray-800'}`}>
            {t("Individual", "Individu")}
          </button>
          <button onClick={() => setActiveTab('group')} className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${activeTab === 'group' ? 'bg-primary-green text-white shadow-lg' : 'bg-white dark:bg-gray-800'}`}>
            {t("Group", "Kelompok")}
          </button>
        </div>
        <motion.div 
          key={activeTab}
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {currentProjects.map((project) => (
            <motion.div variants={fadeInUp} key={project.id} className="group relative overflow-hidden rounded-2xl shadow-lg bg-white dark:bg-gray-800">
              <img src={project.image} alt={project.title} className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-2xl font-bold text-white mb-2 transition-transform duration-300 group-hover:-translate-y-16">{project.title}</h3>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-gray-300 mb-4 line-clamp-2">{t(project.description, project.descriptionId || project.description)}</p>
                  <div className="flex gap-4">
                    {project.links.demo && (
                      <a href={project.links.demo} target="_blank" className="flex items-center gap-2 text-white hover:text-primary-green transition-colors">
                        <ExternalLink size={18} /> Live
                      </a>
                    )}
                    {project.links.github && (
                      <a href={project.links.github} target="_blank" className="flex items-center gap-2 text-white hover:text-primary-green transition-colors">
                        <Github size={18} /> Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
