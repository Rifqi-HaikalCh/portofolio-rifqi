'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { Code, Palette } from 'lucide-react';

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

interface Skill {
  name: string;
  nameId: string;
  icon: string;
  level: number;
  color: string;
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
      en: ['Complete UI design systems', 'Mobile-first design', 'Style guide creation'],
      id: ['Sistem desain UI lengkap', 'Desain mobile-first', 'Pembuatan panduan style']
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
      en: ['Interactive prototypes', 'Animation design', 'User testing ready'],
      id: ['Prototype interaktif', 'Desain animasi', 'Siap user testing']
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
      en: ['Brand identity', 'Color palette', 'Logo design'],
      id: ['Identitas brand', 'Palet warna', 'Desain logo']
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
      en: ['Pixel-perfect code', 'Cross-browser support', 'Clean code'],
      id: ['Kode pixel-perfect', 'Dukungan cross-browser', 'Kode bersih']
    },
    gradient: 'from-blue-500 to-indigo-500'
  },
  {
    id: 'responsive-builds',
    titleEn: 'Fully Responsive Builds',
    titleId: 'Build yang Sepenuhnya Responsif',
    icon: '📱',
    descriptionEn: 'Ensuring your site looks perfect on any device.',
    descriptionId: 'Memastikan situs Anda terlihat sempurna di perangkat apa pun.',
    features: {
      en: ['Mobile-first approach', 'Tablet optimization', 'Touch-friendly'],
      id: ['Pendekatan mobile-first', 'Optimisasi tablet', 'Ramah sentuhan']
    },
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    id: 'api-integration',
    titleEn: 'REST API Integration',
    titleId: 'Integrasi REST API',
    icon: '🔌',
    descriptionEn: 'Connecting your app to backend services for dynamic data.',
    descriptionId: 'Menghubungkan aplikasi Anda ke layanan backend untuk data dinamis.',
    features: {
      en: ['RESTful API', 'State management', 'Error handling'],
      id: ['RESTful API', 'Manajemen state', 'Penanganan error']
    },
    gradient: 'from-cyan-500 to-blue-500'
  }
];

const designSkills: Skill[] = [
  { name: 'Figma', nameId: 'Figma', icon: '🎨', level: 100, color: '#F24E1E' },
  { name: 'Photoshop', nameId: 'Photoshop', icon: '🖼️', level: 80, color: '#FF0000' },
  { name: 'Sketch', nameId: 'Sketch', icon: '💎', level: 70, color: '#FDB300' },
  { name: 'Wireframing', nameId: 'Wireframing', icon: '📐', level: 90, color: '#6B7280' },
  { name: 'Mockup Design', nameId: 'Desain Mockup', icon: '🖼️', level: 100, color: '#8B5CF6' },
  { name: 'Prototyping', nameId: 'Prototyping', icon: '⚡', level: 100, color: '#F59E0B' }
];

const developerSkills: Skill[] = [
  { name: 'React.js', nameId: 'React.js', icon: '⚛️', level: 90, color: '#61DAFB' },
  { name: 'Angular', nameId: 'Angular', icon: '🅰️', level: 90, color: '#DD0031' },
  { name: 'Vue.js', nameId: 'Vue.js', icon: '💚', level: 80, color: '#4FC08D' },
  { name: 'Next.js', nameId: 'Next.js', icon: '📘', level: 90, color: '#3178C6' },
  { name: 'Tailwind CSS', nameId: 'Tailwind CSS', icon: '🌊', level: 100, color: '#06B6D4' },
  { name: 'Node.js', nameId: 'Node.js', icon: '🟢', level: 80, color: '#339933' }
];

export const MobileServices: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'uiux' | 'development'>('uiux');

  const tabs = [
    {
      id: 'uiux' as const,
      icon: <Palette size={20} />,
      labelEn: 'UI/UX Design',
      labelId: 'Desain UI/UX',
      services: uiuxServices,
      skills: designSkills,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 'development' as const,
      icon: <Code size={20} />,
      labelEn: 'Web Development',
      labelId: 'Pengembangan Web',
      services: developerServices,
      skills: developerSkills,
      gradient: 'from-blue-500 to-cyan-500'
    }
  ];

  const currentTab = tabs.find(tab => tab.id === activeTab) || tabs[0];

  return (
    <section id="services" className="py-16 bg-white dark:bg-gray-800">
      {/* Section Header */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-8 px-6"
      >
        <span className="inline-block px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full text-sm font-semibold mb-4">
          {language === 'en' ? 'Services' : 'Layanan'}
        </span>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          {language === 'en' ? 'Professional Services' : 'Layanan Profesional'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {language === 'en'
            ? 'Digital solutions combining creativity with expertise'
            : 'Solusi digital menggabungkan kreativitas dengan keahlian'}
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <div className="px-6 mb-8">
        <div className="flex gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-4 px-4 rounded-2xl font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? `bg-gradient-to-r ${tab.gradient} text-white shadow-lg scale-105`
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <div className={`${activeTab === tab.id ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                  {tab.icon}
                </div>
                <div className="text-sm font-bold">
                  {language === 'en' ? tab.labelEn : tab.labelId}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          {/* Open for Opportunities */}
          <div className="px-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                {language === 'en' ? 'Open for Opportunities' : 'Terbuka untuk Peluang'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 text-center">
                {language === 'en'
                  ? 'Available for full-time and freelance projects'
                  : 'Tersedia untuk proyek full-time dan freelance'}
              </p>

              {/* Opportunities Grid */}
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-2">💼</span>
                    <h4 className="font-bold text-gray-900 dark:text-white">
                      {language === 'en' ? 'Full-Time' : 'Full-Time'}
                    </h4>
                  </div>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li>• {language === 'en' ? 'Long-term commitment' : 'Komitmen jangka panjang'}</li>
                    <li>• {language === 'en' ? 'Team collaboration' : 'Kolaborasi tim'}</li>
                    <li>• {language === 'en' ? 'Available for relocation' : 'Tersedia untuk relokasi'}</li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-2">🚀</span>
                    <h4 className="font-bold text-gray-900 dark:text-white">
                      {language === 'en' ? 'Freelance' : 'Freelance'}
                    </h4>
                  </div>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li>• {language === 'en' ? 'Project-based' : 'Berbasis proyek'}</li>
                    <li>• {language === 'en' ? 'Flexible timeline' : 'Timeline fleksibel'}</li>
                    <li>• {language === 'en' ? 'Remote-friendly' : 'Ramah remote'}</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Services Section */}
          <div className="space-y-6">
            <div className="px-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 text-center">
                {language === 'en' ? 'Services' : 'Layanan'}
              </h3>
              <div className={`w-16 h-1 bg-gradient-to-r ${currentTab.gradient} mx-auto rounded-full`} />
            </div>

            <div className="px-6 space-y-4">
              {currentTab.services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-2xl flex-shrink-0`}>
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                        {language === 'en' ? service.titleEn : service.titleId}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'en' ? service.descriptionEn : service.descriptionId}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {(language === 'en' ? service.features.en : service.features.id).map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient} mr-3`} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Skills Section */}
          <div className="space-y-6">
            <div className="px-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 text-center">
                {language === 'en' ? 'Skills' : 'Keahlian'}
              </h3>
              <div className={`w-16 h-1 bg-gradient-to-r ${currentTab.gradient} mx-auto rounded-full`} />
            </div>

            <div className="px-6 grid grid-cols-2 gap-4">
              {currentTab.skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white dark:bg-gray-700 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex items-center mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mr-3"
                      style={{ backgroundColor: `${skill.color}20` }}
                    >
                      {skill.icon}
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm leading-tight">
                      {language === 'en' ? skill.name : skill.nameId}
                    </h4>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        {language === 'en' ? 'Level' : 'Level'}
                      </span>
                      <span className="text-xs font-bold text-gray-900 dark:text-white">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="h-2 rounded-full"
                        style={{ backgroundColor: skill.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.05 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
