'use client';

import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { individualProjects, groupProjects, designProjects } from '../../data/portfolio';
import { ProjectCard } from '../sections/Projects';
import { ProjectDetailDialog, projectDetailLinks } from '../shared/ProjectDetailDialog';
import type { Project } from '../../types';

interface ViewAllProjectsProps {
  onBack: () => void;
  projectType?: 'design' | 'web' | 'all';
}

export const ViewAllProjects: React.FC<ViewAllProjectsProps> = ({ onBack, projectType = 'all' }) => {
  const { language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'design' | 'web'>(projectType);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const allProjects = [...individualProjects, ...groupProjects, ...designProjects];
  const filteredProjects = allProjects.filter((project) => {
    if (activeFilter === 'all') return true;
    return project.type === activeFilter;
  });

  const labelFor = (project: Project) => {
    if (project.type === 'design') {
      return project.id.includes('mobile')
        ? (language === 'en' ? 'Mobile Design' : 'Desain Mobile')
        : (language === 'en' ? 'Web Design' : 'Desain Web');
    }
    if (project.category === 'group') {
      return language === 'en' ? 'Group' : 'Kelompok';
    }
    return language === 'en' ? 'Individual' : 'Individu';
  };

  const filters: { id: 'all' | 'design' | 'web'; en: string; idLabel: string }[] = [
    { id: 'all', en: 'All', idLabel: 'Semua' },
    { id: 'design', en: 'Design', idLabel: 'Desain' },
    { id: 'web', en: 'Web', idLabel: 'Web' },
  ];

  return (
    <>
      <div id="projects" data-studio="sheet" className="fixed inset-0 z-[1100] overflow-y-auto bg-paper text-ink">
        <div className="sticky top-0 z-10 border-b border-line bg-paper">
          <div className="flex items-center gap-3 px-5 h-16">
            <button
              type="button"
              onClick={onBack}
              aria-label={language === 'en' ? 'Back' : 'Kembali'}
              className="inline-flex h-10 w-10 items-center justify-center border border-line text-ink hover:border-ink hover:bg-ink hover:text-paper"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 data-eqbot="projects-title" data-eqbot-at="end" className="font-serif text-xl leading-none text-ink">
                {language === 'en' ? 'All Projects' : 'Semua Projek'}
              </h1>
              <p className="mt-1 text-sm text-muted">
                {filteredProjects.length} {language === 'en' ? 'projects' : 'projek'}
              </p>
            </div>
          </div>
          <div data-eqbot="projects-filters" data-eqbot-at="above" className="grid grid-cols-3 border-t border-line" role="tablist">
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`py-3 text-sm border-l border-line first:border-l-0 ${
                  activeFilter === filter.id ? 'bg-ink text-paper' : 'bg-paper text-muted'
                }`}
              >
                {language === 'en' ? filter.en : filter.idLabel}
              </button>
            ))}
          </div>
        </div>

        <div className="px-5 py-6 flex flex-col gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              label={labelFor(project)}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="px-5 py-24 text-center">
            <h2 className="font-serif text-2xl text-ink">
              {language === 'en' ? 'No Projects Found' : 'Tidak Ada Projek'}
            </h2>
            <p className="mt-2 text-muted">
              {language === 'en'
                ? 'Try changing the filter to see more projects'
                : 'Coba ubah filter untuk melihat projek lainnya'}
            </p>
          </div>
        )}
      </div>

      {selectedProject && (
        <ProjectDetailDialog
          key={selectedProject.id}
          title={selectedProject.title}
          category={labelFor(selectedProject)}
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
    </>
  );
};
