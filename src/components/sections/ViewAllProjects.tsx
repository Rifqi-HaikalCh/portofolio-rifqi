'use client';

import React, { useMemo, useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { individualProjects, groupProjects, designProjects } from '../../data/portfolio';
import type { Project } from '../../types';
import { ProjectCard } from './Projects';
import { ProjectDetailDialog, projectDetailLinks } from '../shared/ProjectDetailDialog';

interface ViewAllProjectsProps {
  onBack: () => void;
  projectType?: 'individual' | 'group' | 'design' | 'all';
}

export function ViewAllProjects({ onBack, projectType = 'all' }: ViewAllProjectsProps) {
  const { language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const initialFilter: 'all' | 'design' | 'web' = projectType === 'design' ? 'design' : projectType === 'all' ? 'all' : 'web';
  const [activeFilter, setActiveFilter] = useState<'all' | 'design' | 'web'>(initialFilter);

  const allProjects = useMemo(
    () => [...individualProjects, ...groupProjects, ...designProjects],
    []
  );

  const filteredProjects = allProjects.filter((project) => {
    const matchesFilter = activeFilter === 'all' || project.type === activeFilter;
    const query = searchTerm.trim().toLowerCase();
    const matchesSearch = query.length === 0
      || project.title.toLowerCase().includes(query)
      || project.techStack.some((tech) => tech.toLowerCase().includes(query));
    return matchesFilter && matchesSearch;
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
    { id: 'web', en: 'Web', idLabel: 'Web' },
    { id: 'design', en: 'Design', idLabel: 'Desain' },
  ];

  return (
    <section id="projects" data-studio="sheet" className="bg-paper text-ink pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        <div className="rise-item flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <button
              type="button"
              onClick={onBack}
              className="link-mark inline-flex items-center gap-2 text-sm text-ink"
            >
              <ArrowLeft size={16} />
              {language === 'en' ? 'Back' : 'Kembali'}
            </button>
            <h1 data-eqbot="projects-title" data-eqbot-at="end" className="mt-4 font-serif text-4xl md:text-5xl font-medium tracking-tight text-ink">
              {language === 'en' ? 'All Projects' : 'Semua Projek'}
            </h1>
            <p className="mt-3 text-muted">
              {filteredProjects.length} {language === 'en' ? 'projects' : 'projek'}
            </p>
          </div>
          <label className="relative block w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder={language === 'en' ? 'Search projects' : 'Cari projek'}
              className="field w-full border border-line bg-paper py-3 pl-10 pr-3 text-sm text-ink placeholder:text-muted focus:outline-none"
            />
          </label>
        </div>

        <div data-eqbot="projects-filters" data-eqbot-at="above" className="rise-item mt-8 inline-flex border border-line" role="tablist">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              className={`px-5 py-3 text-sm border-l border-line first:border-l-0 ${
                activeFilter === filter.id ? 'bg-ink text-paper' : 'bg-paper text-muted hover:text-ink'
              }`}
            >
              {language === 'en' ? filter.en : filter.idLabel}
            </button>
          ))}
        </div>

        {filteredProjects.length === 0 ? (
          <div className="rise-item mt-16 border border-line bg-raised px-6 py-16 text-center">
            <h2 className="font-serif text-2xl text-ink">
              {language === 'en' ? 'No projects found' : 'Projek tidak ditemukan'}
            </h2>
            <p className="mt-2 text-muted">
              {language === 'en'
                ? 'Try another word or switch the filter.'
                : 'Coba kata lain, atau ganti filter.'}
            </p>
          </div>
        ) : (
          <div className="rise-item mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                label={labelFor(project)}
                onClick={() => setSelectedProject(project)}
              />
            ))}
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
          links={projectDetailLinks(language, selectedProject.links || {})}
          overviewLabel={language === 'en' ? 'Overview' : 'Ringkasan'}
          toolsLabel={language === 'en' ? 'Stack' : 'Teknologi'}
          closeLabel={language === 'en' ? 'Close' : 'Tutup'}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
