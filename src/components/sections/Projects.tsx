'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { individualProjects, groupProjects } from '../../data/portfolio';
import { staggerContainer, fadeInUp } from '../../lib/animations';
import { ExternalLink, Github, FolderOpen } from 'lucide-react';
import { AnimatedSectionTitle } from '../shared/AnimatedSectionTitle';
import { AnimatedCard } from '../shared/AnimatedCard';
import { InteractiveButton } from '../shared/InteractiveButton';

export const Projects: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'individual' | 'group'>('individual');

  const currentProjects = activeTab === 'individual' ? individualProjects : groupProjects;

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Clean Background */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <AnimatedSectionTitle
          badge="Portfolio Showcase"
          badgeIcon={<FolderOpen className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />}
          title={t("Featured Projects", "Projek Unggulan") as string}
          subtitle={t(
            "Discover the projects that showcase my technical expertise and creative problem-solving abilities",
            "Temukan proyek-proyek yang menunjukkan keahlian teknis dan kemampuan pemecahan masalah kreatif saya"
          ) as string}
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
            <span className="relative">{t("Individual", "Individu")}</span>
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
            <span className="relative">{t("Group", "Kelompok")}</span>
          </motion.button>
        </div>
        {/* Enhanced Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {currentProjects.map((project, index) => (
              <AnimatedCard
                key={project.id}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50"
                delay={index * 0.1}
                hoverY={-12}
                hoverScale={1.05}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <motion.img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-60 object-cover transition-all duration-700 group-hover:scale-110"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
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
                      >
                        <ExternalLink size={16} />
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
                      >
                        <Github size={16} />
                      </motion.a>
                    )}
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-emerald-500/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                      {activeTab === 'individual' ? t('Individual', 'Individu') : t('Group', 'Kelompok')}
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
                    {t(project.description, project.descriptionId || project.description)}
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
                    className="flex gap-3 pt-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    {project.links.demo && (
                      <InteractiveButton
                        href={project.links.demo}
                        size="sm"
                        variant="primary"
                        className="flex-1"
                        icon={<ExternalLink size={16} />}
                      >
                        {t('Live Demo', 'Demo')}
                      </InteractiveButton>
                    )}
                    {project.links.github && (
                      <InteractiveButton
                        href={project.links.github}
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        icon={<Github size={16} />}
                      >
                        {t('Code', 'Kode')}
                      </InteractiveButton>
                    )}
                  </motion.div>
                </div>
              </AnimatedCard>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
