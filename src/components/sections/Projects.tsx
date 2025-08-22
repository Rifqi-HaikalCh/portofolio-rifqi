import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { individualProjects, groupProjects } from '../../data/portfolio';
import { ExternalLink, Github } from 'lucide-react';

export const Projects: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'individual' | 'group'>('individual');

  const currentProjects = activeTab === 'individual' ? individualProjects : groupProjects;

  return (
    <section id="projects" className="py-16 sm:py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t("Featured Projects", "Projek Unggulan")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            {t(
              "Explore my individual and group projects that showcase my skills and creativity.",
              "Jelajahi projek individu dan kelompok saya yang menunjukkan keahlian dan kreativitas saya."
            )}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 sm:mb-12" data-aos="fade-up">
          <button
            onClick={() => setActiveTab('individual')}
            className={`px-4 py-2.5 sm:px-6 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 ${
              activeTab === 'individual'
                ? 'bg-emerald-500 text-white transform -translate-y-1 shadow-lg'
                : 'border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white'
            }`}
          >
            {t("Individual Projects", "Projek Individu")}
          </button>
          <button
            onClick={() => setActiveTab('group')}
            className={`px-4 py-2.5 sm:px-6 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 ${
              activeTab === 'group'
                ? 'bg-emerald-500 text-white transform -translate-y-1 shadow-lg'
                : 'border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white'
            }`}
          >
            {t("Group Projects", "Projek Kelompok")}
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {currentProjects.map((project, index) => (
            <div
              key={project.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="bg-white dark:bg-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="h-40 sm:h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm sm:text-base line-clamp-3">
                  {t(project.description, project.descriptionId || project.description)}
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="px-2 py-1 sm:px-3 sm:py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 rounded-full text-xs font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-emerald-500 text-white rounded-full text-xs sm:text-sm font-medium hover:bg-emerald-600 transition-all hover:-translate-y-1 flex-1 sm:flex-none"
                    >
                      <ExternalLink size={14} /> Live Demo
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-emerald-500 text-white rounded-full text-xs sm:text-sm font-medium hover:bg-emerald-600 transition-all hover:-translate-y-1 flex-1 sm:flex-none"
                    >
                      <Github size={14} /> Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
