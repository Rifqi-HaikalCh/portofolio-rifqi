"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../../context/LanguageContext';
import { AnimatedSectionTitle } from '../shared/AnimatedSectionTitle';
import PortfolioFigmaCard from '../shared/PortfolioFigmaCard';
import { Code, Monitor } from 'lucide-react';
import { Projects, ProjectCard } from './Projects';
import { 
  designSkills as designSkillsData, 
  developerSkills as developerSkillsData, 
  designProjects as portfolioDesignProjects 
} from '../../data/portfolio';
import { ProjectDetailDialog, projectDetailLinks } from '../shared/ProjectDetailDialog';
import { AdditionalSkillsCell, AdditionalSkillsDialog } from '../shared/AdditionalSkillsDialog';
import { listedAdditionalGroups } from '../../lib/additional-skills';
import { staggerContainer, fadeInUp } from '../../lib/animations';
import { ViewAllProjects } from './ViewAllProjects';

interface Service {
  id: string;
  titleEn: string;
  titleId: string;
  descriptionEn: string;
  descriptionId: string;
  features: {
    en: string[];
    id: string[];
  };
  gradient: string;
}

export const uiuxServices: Service[] = [
  {
    id: 'ui-design',
    titleEn: 'Full App & Website Design',
    titleId: 'Desain Aplikasi & Website Lengkap',
    descriptionEn: 'Crafting complete, ready-to-code designs for mobile and desktop.',
    descriptionId: 'Merancang desain lengkap yang siap di-coding untuk mobile dan desktop.',
    features: {
      en: ['Complete UI design systems', 'Mobile-first responsive design', 'Design handoff documentation'],
      id: ['Sistem desain UI yang lengkap', 'Desain responsif mobile-first', 'Dokumentasi handoff desain']
    },
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 'prototypes',
    titleEn: 'High-Fidelity Prototypes',
    titleId: 'Prototype Fidelitas Tinggi',
    descriptionEn: 'Building clickable, interactive demos you can test and feel.',
    descriptionId: 'Membangun demo interaktif yang dapat diuji dan dirasakan.',
    features: {
      en: ['Interactive prototypes', 'Animation & micro-interactions', 'User testing ready'],
      id: ['Prototype interaktif', 'Animasi & micro-interactions', 'Siap untuk user testing']
    },
    gradient: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'branding',
    titleEn: 'Branding & Identity',
    titleId: 'Branding & Identitas',
    descriptionEn: 'Helping you define the look and feel of your application.',
    descriptionId: 'Membantu Anda mendefinisikan tampilan dan nuansa aplikasi Anda.',
    features: {
      en: ['Brand identity design', 'Color palette creation', 'Logo and iconography'],
      id: ['Desain identitas brand', 'Pembuatan palet warna', 'Logo dan ikonografi']
    },
    gradient: 'from-orange-500 to-red-500'
  }
];

export const developerServices: Service[] = [
  {
    id: 'design-to-code',
    titleEn: '.NET Application Development',
    titleId: 'Pengembangan Aplikasi .NET',
    descriptionEn: 'Building enterprise web applications with C#, ASP.NET MVC, and .NET Core.',
    descriptionId: 'Membangun aplikasi web enterprise dengan C#, ASP.NET MVC, dan .NET Core.',
    features: {
      en: ['C# application logic', 'ASP.NET MVC and .NET Core', 'Telerik interfaces'],
      id: ['Logika aplikasi C#', 'ASP.NET MVC dan .NET Core', 'Antarmuka Telerik']
    },
    gradient: 'from-blue-500 to-indigo-500'
  },
  {
    id: 'api-integration',
    titleEn: 'SQL Server and Data',
    titleId: 'SQL Server dan Data',
    descriptionEn: 'Shaping operational data with SQL Server, stored procedures, and Entity Framework.',
    descriptionId: 'Menata data operasional dengan SQL Server, stored procedure, dan Entity Framework.',
    features: {
      en: ['Stored procedures and indexing', 'Entity Framework', 'Transactional processing'],
      id: ['Stored procedure dan indexing', 'Entity Framework', 'Pemrosesan transaksional']
    },
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    id: 'fullstack-dev',
    titleEn: 'Operational Dashboards',
    titleId: 'Dashboard Operasional',
    descriptionEn: 'Delivering internal dashboards and modular applications that operations teams use every day.',
    descriptionId: 'Menghadirkan dashboard internal dan aplikasi modular yang dipakai tim operasional setiap hari.',
    features: {
      en: ['Monitoring dashboards', 'Modular application structure', 'Deployment on IIS'],
      id: ['Dashboard pemantauan', 'Struktur aplikasi modular', 'Deployment di IIS']
    },
    gradient: 'from-green-500 to-emerald-500'
  }
];

export function Services() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'uiux' | 'development'>('development');
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [skillsOpen, setSkillsOpen] = useState(false);
  const { ref: sectionRef } = useInView({ threshold: 0.1, triggerOnce: true });

  const currentServices = activeTab === 'uiux' ? uiuxServices : developerServices;

  if (showAllProjects) {
    return <ViewAllProjects onBack={() => setShowAllProjects(false)} projectType="all" />;
  }

  return (
    <section ref={sectionRef} id="services" data-studio="draft" className="py-12 md:py-16 border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSectionTitle
          badge={language === 'en' ? 'Expertise' : 'Keahlian'}
          title={language === 'en' ? 'My Services' : 'Layanan Saya'}
          subtitle={language === 'en' 
            ? 'Enterprise web and data systems in C# and .NET, with interface design for the same products.'
            : 'Sistem web dan data enterprise dengan C# dan .NET, serta desain antarmuka untuk produk yang sama.'
          }
        />

        <div className="flex justify-center mb-16">
          <div data-eqbot="services-tabs" data-eqbot-at="above" className="inline-flex border border-line" role="tablist">
            <button
              onClick={() => setActiveTab('development')}
              className={`flex items-center gap-2 px-5 py-3 text-sm ${
                activeTab === 'development'
                  ? 'bg-ink text-paper'
                  : 'bg-paper text-muted hover:text-ink'
              }`}
            >
              <Code size={16} />
              Development
            </button>
            <button
              onClick={() => setActiveTab('uiux')}
              className={`flex items-center gap-2 px-5 py-3 text-sm border-l border-line ${
                activeTab === 'uiux'
                  ? 'bg-ink text-paper'
                  : 'bg-paper text-muted hover:text-ink'
              }`}
            >
              <Monitor size={16} />
              UI/UX Design
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="space-y-24"
          >
            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-line">
              {currentServices.map((service) => (
                <motion.article key={`${activeTab}-${service.id}`} variants={fadeInUp} className="read-row p-7 md:p-8 border-b border-r border-line flex flex-col bg-paper">
                  <h3 className="font-serif text-2xl font-medium text-ink mb-3">
                    {language === 'en' ? service.titleEn : service.titleId}
                  </h3>
                  <p className="text-muted leading-relaxed mb-6 flex-grow">
                    {language === 'en' ? service.descriptionEn : service.descriptionId}
                  </p>
                  <ul className="space-y-2">
                    {(language === 'en' ? service.features.en : service.features.id).map((feature) => (
                      <li key={feature} className="flex gap-3 text-sm text-ink">
                        <span className="mt-2 h-1 w-1 shrink-0 bg-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>

            {/* Skills Animation */}
            <div className="space-y-8">
              <h3 className="font-serif text-3xl font-medium text-ink">
                {language === 'en' ? 'Technological Stack' : 'Tumpukan Teknologi'}
              </h3>
              {activeTab === 'development' ? (
                <div className="space-y-10">
                  <div>
                    <p className="font-jetbrains-mono text-[11px] tracking-[0.16em] uppercase text-accent mb-4">
                      {language === 'en' ? 'Core · Enterprise web and data' : 'Inti · Web dan data enterprise'}
                    </p>
                    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 border-t border-l border-line">
                      {developerSkillsData.filter((skill) => skill.focus === 'core').map((skill) => (
                        <li key={skill.name} className="read-row flex flex-col items-center gap-3 p-5 border-b border-r border-line bg-paper text-center">
                          <Image src={skill.image} alt="" width={120} height={40} className="h-10 w-auto max-w-full object-contain" />
                          <span className="text-sm text-ink">{skill.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-8">
                    {listedAdditionalGroups.map((group) => (
                      <div key={group.labelEn}>
                        <p className="font-jetbrains-mono text-[11px] tracking-[0.16em] uppercase text-accent mb-4">
                          {language === 'en' ? group.labelEn : group.labelId}
                        </p>
                        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 border-t border-l border-line">
                          {group.skills.map((skill) => (
                            <li key={skill.name} className="read-row flex flex-col items-center gap-2 p-5 border-b border-r border-line bg-paper text-center">
                              {skill.image && (
                                'imageDark' in skill && skill.imageDark ? (
                                  <>
                                    <Image src={skill.image} alt="" width={72} height={40} className="h-10 w-auto max-w-[4.5rem] object-contain dark:hidden" />
                                    <Image src={skill.imageDark} alt="" width={72} height={40} className="hidden h-10 w-auto max-w-[4.5rem] object-contain dark:block" />
                                  </>
                                ) : (
                                  <Image src={skill.image} alt="" width={40} height={40} className="h-10 w-10 object-contain" />
                                )
                              )}
                              <span className="text-sm text-ink">{skill.name}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="font-jetbrains-mono text-[11px] tracking-[0.16em] uppercase text-accent mb-4">
                      {language === 'en' ? 'Nice to Have' : 'Baik untuk Dimiliki'}
                    </p>
                    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 border-t border-l border-line">
                      <li className="flex border-b border-r border-line bg-paper">
                        <AdditionalSkillsCell language={language} onOpen={() => setSkillsOpen(true)} />
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 border-t border-l border-line">
                  {designSkillsData.map((skill) => (
                    <li key={skill.name} className="read-row flex flex-col items-center gap-3 p-5 border-b border-r border-line bg-paper text-center">
                      <Image src={skill.image} alt="" width={40} height={40} className="h-10 w-10 object-contain" />
                      <span className="text-sm text-ink">{skill.name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Showcase */}
            <div className="space-y-8">
              <h3 className="font-serif text-3xl font-medium text-ink">
                {activeTab === 'uiux'
                  ? (language === 'en' ? 'Design Showcase' : 'Pameran Desain')
                  : (language === 'en' ? 'Project Portfolio' : 'Portofolio Projek')}
              </h3>
              {activeTab === 'uiux' ? (
                <>
                  <DesignShowcase onShowAll={() => setShowAllProjects(true)} />
                  <div className="pt-16 border-t border-line">
                    <div className="mb-8">
                      <h3 className="font-serif text-3xl font-medium text-ink">
                        {language === 'en' ? 'My Creative Workspace' : 'Lihat Meja Kerja Saya'}
                      </h3>
                      <p className="text-muted mt-3 max-w-xl">
                        {language === 'en' ? 'A deeper look into my design process and tools' : 'Melihat lebih dekat proses desain dan alat saya'}
                      </p>
                    </div>
                    <div className="relative max-w-4xl mx-auto">
                      <PortfolioFigmaCard />
                    </div>
                  </div>
                </>
              ) : (
                <Projects onShowAll={() => setShowAllProjects(true)} />
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      {skillsOpen && (
        <AdditionalSkillsDialog language={language} onClose={() => setSkillsOpen(false)} />
      )}
    </section>
  );
}

const DesignShowcase = ({ onShowAll }: { onShowAll: () => void }) => {
  const { language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <>
      <div className="flex items-stretch gap-6 overflow-x-auto pb-8 scrollbar-hide px-4 sm:px-0">
        {portfolioDesignProjects.map((project) => (
          <div key={project.id} className="flex w-80 shrink-0 md:w-96">
            <ProjectCard
              project={project}
              label={project.id.includes('mobile')
                ? (language === 'en' ? 'Mobile Design' : 'Desain Mobile')
                : (language === 'en' ? 'Web Design' : 'Desain Web')}
              onClick={() => setSelectedProject({
                id: project.id,
                title: project.title,
                description: language === 'en' ? project.description : (project.descriptionId || project.description),
                images: project.slides?.length ? project.slides : [project.image],
                tools: project.techStack,
                category: project.id.includes('mobile')
                  ? (language === 'en' ? 'Mobile Design' : 'Desain Mobile')
                  : (language === 'en' ? 'Web Design' : 'Desain Web'),
                links: project.links
              })}
            />
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button
          type="button"
          onClick={onShowAll}
          className="btn-primary-custom"
        >
          {language === 'en' ? 'View All Projects' : 'Lihat Semua Projek'}
        </button>
      </div>

      {selectedProject && (
        <ProjectDetailDialog
          key={selectedProject.id}
          title={selectedProject.title}
          category={selectedProject.category}
          description={selectedProject.description}
          images={selectedProject.images}
          tools={selectedProject.tools}
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
