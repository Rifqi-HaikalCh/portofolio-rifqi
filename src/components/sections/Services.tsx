"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../../context/LanguageContext';
import { AnimatedSectionTitle } from '../shared/AnimatedSectionTitle';
import ElectricBorder from '../shared/ElectricBorder';
import TiltedCard from '../shared/TiltedCard';
import GlassSkillCard from '../shared/GlassSkillCard';
import FallingSkillCards from '../shared/FallingSkillCards';
import PortfolioFigmaCard from '../shared/PortfolioFigmaCard';
import { 
  Code, 
  Palette, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  ArrowRight, 
  Sparkles, 
  Eye, 
  ExternalLink,
  Monitor,
  Layout,
  BadgeCheck,
  Figma,
  FileText
} from 'lucide-react';
import { Projects } from './Projects';
import { 
  designSkills as designSkillsData, 
  developerSkills as developerSkillsData, 
  designProjects as portfolioDesignProjects 
} from '../../data/portfolio';
import { Portal } from '../shared/Portal';
import { staggerContainer, fadeInUp } from '../../lib/animations';
import { ViewAllProjects } from './ViewAllProjects';

const MotionImage = motion.create(Image);

interface Service {
  id: string;
  titleEn: string;
  titleId: string;
  icon: string;
  descriptionEn: string;
  descriptionId: string;
  features: {
    en: string[];
    id: string[];
  };
  gradient: string;
}

const uiuxServices: Service[] = [
  {
    id: 'ui-design',
    titleEn: 'Full App & Website Design',
    titleId: 'Desain Aplikasi & Website Lengkap',
    icon: '🎨',
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
    icon: '⚡',
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
    icon: '🎯',
    descriptionEn: 'Helping you define the look and feel of your application.',
    descriptionId: 'Membantu Anda mendefinisikan tampilan dan nuansa aplikasi Anda.',
    features: {
      en: ['Brand identity design', 'Color palette creation', 'Logo and iconography'],
      id: ['Desain identitas brand', 'Pembuatan palet warna', 'Logo dan ikonografi']
    },
    gradient: 'from-orange-500 to-red-500'
  }
];

const developerServices: Service[] = [
  {
    id: 'design-to-code',
    titleEn: 'Design to Live Code',
    titleId: 'Desain ke Kode Live',
    icon: '💻',
    descriptionEn: 'Converting your Figma designs into a real, working interface.',
    descriptionId: 'Mengonversi desain Figma Anda menjadi antarmuka yang berfungsi.',
    features: {
      en: ['Pixel-perfect implementation', 'Clean, maintainable code', 'Performance optimization'],
      id: ['Implementasi pixel-perfect', 'Kode yang bersih dan maintainable', 'Optimisasi performa']
    },
    gradient: 'from-blue-500 to-indigo-500'
  },
  {
    id: 'api-integration',
    titleEn: 'REST API Integration',
    titleId: 'Integrasi REST API',
    icon: '🔌',
    descriptionEn: 'Connecting your app to backend services for dynamic data.',
    descriptionId: 'Menghubungkan aplikasi Anda ke layanan backend untuk data dinamis.',
    features: {
      en: ['RESTful API consumption', 'Data state management', 'Error handling'],
      id: ['Konsumsi RESTful API', 'Manajemen state data', 'Penanganan error']
    },
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    id: 'fullstack-dev',
    titleEn: 'Full-Stack Engineering',
    titleId: 'Rekayasa Full-Stack',
    icon: '🚀',
    descriptionEn: 'End-to-end development using modern frameworks like Spring Boot.',
    descriptionId: 'Pengembangan end-to-end menggunakan framework modern seperti Spring Boot.',
    features: {
      en: ['Scalable Architecture', 'Secure Auth Integration', 'Database Design'],
      id: ['Arsitektur Terukur', 'Integrasi Auth Aman', 'Desain Database']
    },
    gradient: 'from-green-500 to-emerald-500'
  }
];

export function Services() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'uiux' | 'development'>('development');
  const [showAllProjects, setShowAllProjects] = useState(false);
  const { ref: sectionRef } = useInView({ threshold: 0.1, triggerOnce: true });

  const currentServices = activeTab === 'uiux' ? uiuxServices : developerServices;

  if (showAllProjects) {
    return <ViewAllProjects onBack={() => setShowAllProjects(false)} projectType="all" />;
  }

  return (
    <section ref={sectionRef} id="services" className="py-24 bg-white dark:bg-[#0B1120] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSectionTitle
          badge={language === 'en' ? 'Expertise' : 'Keahlian'}
          badgeIcon={<Sparkles className="w-5 h-5 text-emerald-500" />}
          title={language === 'en' ? 'My Services' : 'Layanan Saya'}
          subtitle={language === 'en' 
            ? 'Specialized digital solutions combining design creativity with technical expertise'
            : 'Solusi digital khusus yang menggabungkan kreativitas desain dengan keahlian teknis'
          }
        />

        <div className="flex justify-center mb-20">
          <div className="bg-gray-50/50 dark:bg-gray-800/30 backdrop-blur-2xl p-1.5 rounded-[1.5rem] border border-gray-200/50 dark:border-gray-700/50 shadow-xl flex gap-2">
            <button
              onClick={() => setActiveTab('development')}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-700 ${
                activeTab === 'development'
                  ? 'bg-white dark:bg-gray-700 text-emerald-500 shadow-lg'
                  : 'text-gray-400 hover:text-emerald-500'
              }`}
            >
              <Code size={16} />
              Development
            </button>
            <button
              onClick={() => setActiveTab('uiux')}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-700 ${
                activeTab === 'uiux'
                  ? 'bg-white dark:bg-gray-700 text-emerald-500 shadow-lg'
                  : 'text-gray-400 hover:text-emerald-500'
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentServices.map((service) => (
                <motion.div key={`${activeTab}-${service.id}`} variants={fadeInUp}>
                  <TiltedCard scaleOnHover={1.05} rotateAmplitude={10} containerHeight="100%" containerWidth="100%">
                    <ElectricBorder color="#10b981" speed={1} thickness={2} className="h-full rounded-3xl">
                      <div className="group relative h-full bg-white dark:bg-gray-800 p-8 rounded-3xl border border-white/10 flex flex-col">
                        <div className="text-4xl mb-6">{service.icon}</div>
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4">
                          {language === 'en' ? service.titleEn : service.titleId}
                        </h3>
                        <p className="text-base text-gray-600 dark:text-gray-400 mb-6 leading-relaxed flex-grow">
                          {language === 'en' ? service.descriptionEn : service.descriptionId}
                        </p>
                        <div className="space-y-3">
                          {(language === 'en' ? service.features.en : service.features.id).map((f, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs font-bold text-gray-600 dark:text-gray-300">
                              <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                              {f}
                            </div>
                          ))}
                        </div>
                      </div>
                    </ElectricBorder>
                  </TiltedCard>
                </motion.div>
              ))}
            </div>

            {/* Skills Animation */}
            <div className="space-y-12">
              <div className="text-center">
                <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-widest">Technological Stack</h3>
                <div className="w-12 h-1 bg-emerald-500 mx-auto mt-4 rounded-full" />
              </div>
              <div className="hidden md:block">
                <FallingSkillCards
                  skills={activeTab === 'development' ? developerSkillsData : designSkillsData}
                  trigger="scroll"
                  gravity={0.8}
                />
              </div>
              <div className="md:hidden grid grid-cols-3 gap-4 px-4">
                {(activeTab === 'development' ? developerSkillsData : designSkillsData).map((skill) => (
                  <GlassSkillCard key={skill.name} name={skill.name} image={skill.image} />
                ))}
              </div>
            </div>

            {/* Showcase */}
            <div className="space-y-12">
              <div className="text-center">
                <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-widest">
                  {activeTab === 'uiux' ? 'Design Showcase' : 'Project Portfolio'}
                </h3>
                <div className="w-12 h-1 bg-emerald-500 mx-auto mt-4 rounded-full" />
              </div>
              {activeTab === 'uiux' ? (
                <>
                  <DesignShowcase onShowAll={() => setShowAllProjects(true)} />
                  <div className="pt-24 border-t border-gray-100 dark:border-gray-800/50">
                    <div className="text-center mb-16">
                      <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter uppercase">
                        {language === 'en' ? 'My Creative Workspace' : 'Lihat Meja Kerja Saya'}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 mt-4 text-sm font-bold uppercase tracking-widest italic">
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
    </section>
  );
}

const DesignShowcase = ({ onShowAll }: { onShowAll: () => void }) => {
  const { language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [imgIndex, setImgIndex] = useState(0);

  const designProjectsTransformed = portfolioDesignProjects.map(project => ({
    id: project.id,
    title: project.title,
    description: project.description,
    image: project.image,
    images: project.slides || [project.image],
    tools: project.techStack,
    category: project.id.includes('mobile') ? 'Mobile Design' : 'Web Design',
    links: { figma: project.links.prototype, demo: project.links.demo, needToKnow: project.links.needToKnow }
  }));

  return (
    <>
      <div className="flex space-x-6 overflow-x-auto pb-8 scrollbar-hide px-4 sm:px-0">
        {designProjectsTransformed.map((project) => (
          <div key={project.id} className="w-80 md:w-96 flex-shrink-0">
            <TiltedCard scaleOnHover={1.05} rotateAmplitude={5}>
              <div 
                onClick={() => setSelectedProject(project)}
                className="group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700 cursor-pointer"
              >
                <div className="relative h-56">
                  <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30 text-white">
                      <Eye size={24} />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">{project.title}</h4>
                  <p className="text-xs text-gray-500 line-clamp-2">{project.category}</p>
                </div>
              </div>
            </TiltedCard>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <motion.button
          onClick={onShowAll}
          className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 uppercase text-xs tracking-widest"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {language === 'en' ? 'View All Projects' : 'Lihat Semua Projek'}
        </motion.button>
      </div>

      <Portal>
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[999999] flex items-center justify-center p-4 sm:p-8"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                className="bg-white dark:bg-gray-900 rounded-[2.5rem] max-w-5xl w-full max-h-[95vh] overflow-hidden shadow-2xl relative border border-gray-100 dark:border-gray-800 flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute top-6 right-6 z-50">
                  <button 
                    onClick={() => setSelectedProject(null)} 
                    className="w-12 h-12 rounded-full bg-white/40 dark:bg-black/40 backdrop-blur-md border border-white/30 text-white hover:bg-emerald-500 transition-all flex items-center justify-center shadow-xl"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="overflow-y-auto custom-scrollbar flex-1">
                  <div className="relative w-full aspect-video sm:aspect-[21/9] overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <Image src={selectedProject.images[imgIndex]} alt="Project Large Preview" fill className="object-contain" priority />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 flex justify-center">
                      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {selectedProject.images.map((img: string, i: number) => (
                          <button key={i} onClick={() => setImgIndex(i)} className={`relative w-20 h-14 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${imgIndex === i ? 'border-emerald-500' : 'border-white/30'}`}>
                            <Image src={img} alt="Thumb" fill className="object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-8 sm:p-12">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 border-b border-gray-100 dark:border-gray-800 pb-12">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="px-4 py-1.5 bg-emerald-500/10 text-emerald-500 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                            {selectedProject.category}
                          </span>
                        </div>
                        <h3 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tighter uppercase leading-none">
                          {selectedProject.title}
                        </h3>
                      </div>

                      <div className="flex flex-wrap gap-4 shrink-0">
                        {selectedProject.links?.figma && (
                          <a href={selectedProject.links.figma} target="_blank" className="flex items-center gap-3 px-8 py-4 bg-emerald-500 text-white rounded-2xl font-black text-xs shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 hover:-translate-y-1 transition-all uppercase tracking-widest">
                            <Figma size={18} /> FIGMA
                          </a>
                        )}
                        {selectedProject.links?.demo && (
                          <a href={selectedProject.links.demo} target="_blank" className="flex items-center gap-3 px-8 py-4 bg-blue-500 text-white rounded-2xl font-black text-xs shadow-xl shadow-blue-500/20 hover:bg-blue-600 hover:-translate-y-1 transition-all uppercase tracking-widest">
                            <ExternalLink size={18} /> PREVIEW
                          </a>
                        )}
                        {selectedProject.links?.needToKnow && (
                          <a href={selectedProject.links.needToKnow} target="_blank" className="flex items-center gap-3 px-8 py-4 bg-orange-500 text-white rounded-2xl font-black text-xs shadow-xl shadow-orange-500/20 hover:bg-orange-600 hover:-translate-y-1 transition-all uppercase tracking-widest">
                            <FileText size={18} /> DOCUMENTATION
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                      <div className="lg:col-span-2">
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500 mb-6 flex items-center gap-4">
                          Project Overview
                          <span className="flex-1 h-px bg-emerald-500/10"></span>
                        </h4>
                        <p className="text-xl text-gray-600 dark:text-gray-300 leading-[1.8] font-medium">
                          {selectedProject.description}
                        </p>
                      </div>

                      <div className="space-y-10">
                        <div>
                          <h4 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500 mb-6 flex items-center gap-4">
                            Stack & Tools
                          </h4>
                          <div className="flex flex-wrap gap-3">
                            {selectedProject.tools.map((t: string) => (
                              <span key={t} className="px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-[10px] font-black rounded-xl border border-gray-100 dark:border-gray-700">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
};
