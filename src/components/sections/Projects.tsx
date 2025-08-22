import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { individualProjects, groupProjects } from '../../data/portfolio';
import { ExternalLink, Github } from 'lucide-react';

export const Projects: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'individual' | 'group'>('individual');

  const currentProjects = activeTab === 'individual' ? individualProjects : groupProjects;

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-text-dark dark:text-white mb-4">
            {t("Featured Projects", "Projek Unggulan")}
          </h2>
          <p className="text-text-light dark:text-gray-400 max-w-2xl mx-auto">
            {t(
              "Explore my individual and group projects that showcase my skills and creativity.",
              "Jelajahi projek individu dan kelompok saya yang menunjukkan keahlian dan kreativitas saya."
            )}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12" data-aos="fade-up">
          <button
            onClick={() => setActiveTab('individual')}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeTab === 'individual'
                ? 'bg-primary-green text-white transform -translate-y-1 shadow-custom'
                : 'border-2 border-primary-green text-primary-green hover:bg-primary-green hover:text-white'
            }`}
          >
            {t("Individual Projects", "Projek Individu")}
          </button>
          <button
            onClick={() => setActiveTab('group')}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeTab === 'group'
                ? 'bg-primary-green text-white transform -translate-y-1 shadow-custom'
                : 'border-2 border-primary-green text-primary-green hover:bg-primary-green hover:text-white'
            }`}
          >
            {t("Group Projects", "Projek Kelompok")}
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProjects.map((project, index) => (
            <div
              key={project.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="bg-white dark:bg-gray-700 rounded-2xl overflow-hidden shadow-custom hover:shadow-custom-hover hover:-translate-y-2 transition-all duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-text-dark dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-text-light dark:text-gray-400 mb-4">
                  {t(project.description, project.descriptionId || project.description)}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-light-green text-dark-green rounded-full text-xs font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-primary-green text-white rounded-full text-sm font-medium hover:bg-secondary-green transition-all hover:-translate-y-1"
                    >
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-primary-green text-white rounded-full text-sm font-medium hover:bg-secondary-green transition-all hover:-translate-y-1"
                    >
                      <Github size={16} /> Code
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
