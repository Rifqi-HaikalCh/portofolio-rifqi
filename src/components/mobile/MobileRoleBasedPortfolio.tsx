'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Code, Monitor } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { AnimatedSectionTitle } from '../shared/AnimatedSectionTitle';
import { developerServices, uiuxServices } from '../sections/Services';
import { ProjectCard } from '../sections/Projects';
import { ProjectDetailDialog, projectDetailLinks } from '../shared/ProjectDetailDialog';
import { AdditionalSkillsCell, AdditionalSkillsDialog } from '../shared/AdditionalSkillsDialog';
import { listedAdditionalGroups } from '../../lib/additional-skills';
import { ViewAllProjects } from './ViewAllProjects';
import {
  designSkills,
  developerSkills,
  individualProjects,
  groupProjects,
  designProjects,
} from '../../data/portfolio';
import type { Project } from '../../types';

const workspaceLink = 'https://www.figma.com/proto/tfuZv6wJ89rcjMHj62C8px/Portfolio?page-id=0%3A1&node-id=1-2&p=f&viewport=412%2C255%2C0.04&t=6zl8vTjnEZzdUhRC-1&scaling=contain&content-scaling=fixed&starting-point-node-id=1%3A2';

export const MobileRoleBasedPortfolio: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'development' | 'uiux'>('development');
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [skillsOpen, setSkillsOpen] = useState(false);

  const services = activeTab === 'uiux' ? uiuxServices : developerServices;

  if (showAllProjects) {
    return <ViewAllProjects onBack={() => setShowAllProjects(false)} projectType="all" />;
  }

  return (
    <section id="services" data-studio="draft" className="py-16 border-b border-line bg-paper text-ink">
      <div className="px-5">
        <AnimatedSectionTitle
          badge={language === 'en' ? 'Expertise' : 'Keahlian'}
          title={language === 'en' ? 'My Services' : 'Layanan Saya'}
          subtitle={language === 'en'
            ? 'Enterprise web and data systems in C# and .NET, with interface design for the same products.'
            : 'Sistem web dan data enterprise dengan C# dan .NET, serta desain antarmuka untuk produk yang sama.'}
        />

        <div data-eqbot="services-tabs" data-eqbot-at="above" className="rise-item grid grid-cols-2 border border-line mb-10" role="tablist">
          <button
            type="button"
            onClick={() => setActiveTab('development')}
            className={`flex items-center justify-center gap-2 px-3 py-3 text-sm ${
              activeTab === 'development' ? 'bg-ink text-paper' : 'bg-paper text-muted'
            }`}
          >
            <Code size={16} />
            Development
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('uiux')}
            className={`flex items-center justify-center gap-2 px-3 py-3 text-sm border-l border-line ${
              activeTab === 'uiux' ? 'bg-ink text-paper' : 'bg-paper text-muted'
            }`}
          >
            <Monitor size={16} />
            UI/UX
          </button>
        </div>

        <div className="border-t border-line">
          {services.map((service) => (
            <article key={service.id} className="rise-item read-row py-7 border-b border-line">
              <h3 className="font-serif text-2xl font-medium text-ink">
                {language === 'en' ? service.titleEn : service.titleId}
              </h3>
              <p className="mt-3 text-muted leading-relaxed">
                {language === 'en' ? service.descriptionEn : service.descriptionId}
              </p>
              <ul className="mt-5 space-y-2">
                {(language === 'en' ? service.features.en : service.features.id).map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm text-ink">
                    <span className="mt-2 h-1 w-1 shrink-0 bg-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <h3 className="rise-item mt-14 font-serif text-3xl font-medium text-ink">
          {language === 'en' ? 'Technological Stack' : 'Tumpukan Teknologi'}
        </h3>
        {activeTab === 'development' ? (
          <div className="mt-6 space-y-8">
            <div className="rise-item">
              <p className="font-jetbrains-mono text-[11px] tracking-[0.16em] uppercase text-accent mb-4">
                {language === 'en' ? 'Core · Enterprise web and data' : 'Inti · Web dan data enterprise'}
              </p>
              <ul className="grid grid-cols-3 border-t border-l border-line">
                {developerSkills.filter((skill) => skill.focus === 'core').map((skill) => (
                  <li key={skill.name} className="read-row flex flex-col items-center gap-3 p-4 border-b border-r border-line bg-paper text-center">
                    <Image src={skill.image} alt="" width={108} height={36} className="h-9 w-auto max-w-full object-contain" />
                    <span className="text-sm text-ink">{skill.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-8">
              {listedAdditionalGroups.map((group) => (
                <div key={group.labelEn} className="rise-item">
                  <p className="font-jetbrains-mono text-[11px] tracking-[0.16em] uppercase text-accent mb-4">
                    {language === 'en' ? group.labelEn : group.labelId}
                  </p>
                  <ul className="grid grid-cols-3 border-t border-l border-line">
                    {group.skills.map((skill) => (
                      <li key={skill.name} className="read-row flex flex-col items-center gap-2 p-4 border-b border-r border-line bg-paper text-center">
                        {skill.image && (
                          'imageDark' in skill && skill.imageDark ? (
                            <>
                              <Image src={skill.image} alt="" width={64} height={36} className="h-9 w-auto max-w-[4.25rem] object-contain dark:hidden" />
                              <Image src={skill.imageDark} alt="" width={64} height={36} className="hidden h-9 w-auto max-w-[4.25rem] object-contain dark:block" />
                            </>
                          ) : (
                            <Image src={skill.image} alt="" width={36} height={36} className="h-9 w-9 object-contain" />
                          )
                        )}
                        <span className="text-sm text-ink">{skill.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="rise-item">
              <p className="font-jetbrains-mono text-[11px] tracking-[0.16em] uppercase text-accent mb-4">
                {language === 'en' ? 'Nice to Have' : 'Baik untuk Dimiliki'}
              </p>
              <ul className="grid grid-cols-3 border-t border-l border-line">
                <li className="flex border-b border-r border-line bg-paper">
                  <AdditionalSkillsCell language={language} onOpen={() => setSkillsOpen(true)} />
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <ul className="rise-item mt-6 grid grid-cols-3 border-t border-l border-line">
            {designSkills.map((skill) => (
              <li key={skill.name} className="read-row flex flex-col items-center gap-3 p-4 border-b border-r border-line bg-paper text-center">
                <Image src={skill.image} alt="" width={36} height={36} className="h-9 w-9 object-contain" />
                <span className="text-sm text-ink">{skill.name}</span>
              </li>
            ))}
          </ul>
        )}

        <h3 className="rise-item mt-14 font-serif text-3xl font-medium text-ink">
          {activeTab === 'uiux'
            ? (language === 'en' ? 'Design Showcase' : 'Pameran Desain')
            : (language === 'en' ? 'Project Portfolio' : 'Portofolio Projek')}
        </h3>

        {activeTab === 'development' ? (
          <div className="mt-8 space-y-10">
            <ProjectRow
              title={language === 'en' ? 'Individual Projects' : 'Proyek Individu'}
              projects={individualProjects}
              onOpen={setSelectedProject}
            />
            <ProjectRow
              title={language === 'en' ? 'Group Projects' : 'Proyek Kelompok'}
              projects={groupProjects}
              onOpen={setSelectedProject}
            />
          </div>
        ) : (
          <div className="mt-8 space-y-10">
            <ProjectRow
              title={language === 'en' ? 'Web and mobile design' : 'Desain web dan mobile'}
              projects={designProjects}
              onOpen={setSelectedProject}
              labelFor={(project) => project.id.includes('mobile')
                ? (language === 'en' ? 'Mobile Design' : 'Desain Mobile')
                : (language === 'en' ? 'Web Design' : 'Desain Web')}
            />
            <a href={workspaceLink} target="_blank" rel="noreferrer" className="rise-item block border border-line bg-raised">
              <div className="relative aspect-[4/3] bg-line">
                <Image
                  src="/assets/my portfolio.webp"
                  alt={language === 'en' ? 'My Creative Workspace' : 'Lihat Meja Kerja Saya'}
                  fill
                  sizes="90vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h4 className="font-serif text-2xl text-ink">
                  {language === 'en' ? 'My Creative Workspace' : 'Lihat Meja Kerja Saya'}
                </h4>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {language === 'en'
                    ? 'A deeper look into my design process and tools'
                    : 'Melihat lebih dekat proses desain dan alat saya'}
                </p>
                <p className="mt-4 text-sm text-accent">Figma</p>
              </div>
            </a>
          </div>
        )}

        <div className="rise-item mt-10">
          <button type="button" onClick={() => setShowAllProjects(true)} className="btn-primary-custom w-full">
            {language === 'en' ? 'View All Projects' : 'Lihat Semua Projek'}
          </button>
        </div>
      </div>

      {selectedProject && (
        <ProjectDetailDialog
          key={selectedProject.id}
          title={selectedProject.title}
          category={selectedProject.type === 'design'
            ? (selectedProject.id.includes('mobile')
              ? (language === 'en' ? 'Mobile Design' : 'Desain Mobile')
              : (language === 'en' ? 'Web Design' : 'Desain Web'))
            : (selectedProject.category === 'group'
              ? (language === 'en' ? 'Group project' : 'Proyek kelompok')
              : (language === 'en' ? 'Individual project' : 'Proyek individu'))}
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
      {skillsOpen && (
        <AdditionalSkillsDialog language={language} onClose={() => setSkillsOpen(false)} />
      )}
    </section>
  );
};

function ProjectRow({
  title,
  projects,
  onOpen,
  labelFor,
}: {
  title: string;
  projects: Project[];
  onOpen: (project: Project) => void;
  labelFor?: (project: Project) => string;
}) {
  return (
    <div className="rise-item">
      <p className="font-jetbrains-mono text-[11px] tracking-[0.16em] uppercase text-accent mb-4">{title}</p>
      <div className="flex items-stretch gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
        {projects.map((project) => (
          <div key={project.id} className="flex w-[82%] shrink-0 snap-start">
            <ProjectCard project={project} label={labelFor?.(project)} onClick={() => onOpen(project)} />
          </div>
        ))}
      </div>
    </div>
  );
}
