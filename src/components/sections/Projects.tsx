"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '../../context/LanguageContext';
import { individualProjects, groupProjects } from '../../data/portfolio';
import type { Project } from '../../types';
import { ExternalLink } from 'lucide-react';
import { ProjectDetailDialog, projectDetailLinks } from '../shared/ProjectDetailDialog';
import { stackLogo } from '../../lib/additional-skills';

export function Projects({ onShowAll }: { onShowAll: () => void }) {
  const { language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openModal = (project: Project) => setSelectedProject(project);
  const closeModal = () => setSelectedProject(null);

  return (
    <div id="projects-container" className="bg-transparent">
      {/* INDIVIDUAL PROJECTS */}
      <div className="mb-16">
        <p className="font-jetbrains-mono text-[11px] tracking-[0.16em] uppercase text-accent mb-4">
          {language === 'en' ? 'Individual Projects' : 'Proyek Individu'}
        </p>
        
        <div className="relative w-full overflow-x-auto pb-2">
          <div className="flex items-stretch gap-6 lg:gap-8 px-4 sm:px-0">
            {individualProjects.map((project) => (
              <div key={project.id} className="flex w-80 shrink-0 md:w-96">
                <ProjectCard project={project} onClick={() => openModal(project)} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GROUP PROJECTS */}
      <div>
        <p className="font-jetbrains-mono text-[11px] tracking-[0.16em] uppercase text-accent mb-4">
          {language === 'en' ? 'Group Projects' : 'Proyek Kelompok'}
        </p>
        
        <div className="relative w-full overflow-x-auto pb-2">
          <div className="flex items-stretch gap-6 lg:gap-8 px-4 sm:px-0">
            {groupProjects.map((project) => (
              <div key={project.id} className="flex w-80 shrink-0 md:w-96">
                <ProjectCard project={project} onClick={() => openModal(project)} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <button type="button" onClick={onShowAll} className="btn-primary-custom">
          {language === 'en' ? 'View All Projects' : 'Lihat Semua Projek'}
        </button>
      </div>

      <ProjectModal selectedProject={selectedProject} closeModal={closeModal} />
    </div>
  );
}

export const ProjectCard = ({ project, onClick, label }: { project: Project, onClick: () => void, label?: string }) => {
  const { language } = useLanguage();
  const description = language === 'en' ? project.description : (project.descriptionId || project.description);

  return (
    <article
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick();
        }
      }}
      className="card-hover flex h-full w-full cursor-pointer flex-col overflow-hidden border border-line bg-raised text-left"
    >
      <div className="card-hover-media relative h-52 w-full shrink-0 overflow-hidden">
        <Image src={project.image} alt={project.title} fill className="object-cover" />
        <span className="absolute top-4 left-4 z-10 border border-line bg-paper px-2 py-1 text-[11px] uppercase tracking-[0.14em] text-ink">
          {label || project.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h4 className="card-hover-title min-h-[3.5rem] font-serif text-xl leading-snug text-ink line-clamp-2">
          {project.title}
        </h4>
        <p className="mt-2 min-h-[4.5rem] text-sm leading-relaxed text-muted line-clamp-3">
          {description}
        </p>
        <ul className="mt-4 flex min-h-16 flex-wrap content-start gap-1.5">
          {project.techStack.slice(0, 3).map((tech) => {
            const logo = stackLogo(tech);
            return (
              <li key={tech} className="inline-flex items-center gap-1.5 border border-line px-2 py-1 text-xs text-ink">
                {logo && (
                  <Image src={logo} alt="" width={14} height={14} className="h-3.5 w-3.5 object-contain" />
                )}
                {tech}
              </li>
            );
          })}
        </ul>
        <div className="mt-auto flex items-center justify-between border-t border-line pt-4 text-sm text-accent">
          <span>{language === 'en' ? 'Explore details' : 'Lihat detail'}</span>
          <ExternalLink size={14} />
        </div>
      </div>
    </article>
  );
};

const ProjectModal = ({ selectedProject, closeModal }: { selectedProject: Project | null, closeModal: () => void }) => {
  const { language } = useLanguage();
  if (!selectedProject) return null;

  const category = selectedProject.category === 'group'
    ? (language === 'en' ? 'Group project' : 'Proyek kelompok')
    : (language === 'en' ? 'Individual project' : 'Proyek individu');

  return (
    <ProjectDetailDialog
      key={selectedProject.id}
      title={selectedProject.title}
      category={category}
      description={language === 'en' ? selectedProject.description : (selectedProject.descriptionId || selectedProject.description)}
      images={selectedProject.slides?.length ? selectedProject.slides : [selectedProject.image]}
      tools={selectedProject.techStack}
      links={projectDetailLinks(language, selectedProject.links)}
      overviewLabel={language === 'en' ? 'Overview' : 'Ringkasan'}
      toolsLabel={language === 'en' ? 'Stack' : 'Teknologi'}
      closeLabel={language === 'en' ? 'Close' : 'Tutup'}
      onClose={closeModal}
    />
  );
};
