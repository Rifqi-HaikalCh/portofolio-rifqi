'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { individualProjects } from '../../data/portfolio';
import { Code, Palette, Briefcase, Sparkles } from 'lucide-react';
import Carousel from '../shared/Carousel';
import { ViewAllProjects } from './ViewAllProjects';

export type ProjectRole = 'developer' | 'uiux';

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
  { name: 'TypeScript', nameId: 'TypeScript', icon: '📘', level: 90, color: '#3178C6' },
  { name: 'Tailwind CSS', nameId: 'Tailwind CSS', icon: '🌊', level: 100, color: '#06B6D4' },
  { name: 'Node.js', nameId: 'Node.js', icon: '🟢', level: 80, color: '#339933' }
];

export const MobileRoleBasedPortfolio: React.FC = () => {
  const { language } = useLanguage();
  const [activeRole, setActiveRole] = useState<ProjectRole>('developer');
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [carouselWidth, setCarouselWidth] = useState(340);

  // Set carousel width based on window size
  React.useEffect(() => {
    const updateWidth = () => {
      setCarouselWidth(Math.min(340, window.innerWidth - 48));
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Filter projects by type
  const webDevProjects = individualProjects.filter(project => project.type === 'web');
  const uiuxProjects = individualProjects.filter(project => project.type === 'design');

  // Get current role data
  const currentServices = activeRole === 'developer' ? developerServices : uiuxServices;
  const currentSkills = activeRole === 'developer' ? developerSkills : designSkills;
  const currentProjects = activeRole === 'developer' ? webDevProjects : uiuxProjects;
  const currentGradient = activeRole === 'developer' ? 'from-emerald-500 to-blue-500' : 'from-pink-500 to-purple-500';

  const roleOptions = [
    {
      id: 'developer' as const,
      titleEn: 'Developer',
      titleId: 'Developer',
      icon: <Code size={20} />,
      descriptionEn: 'Web Development',
      descriptionId: 'Pengembangan Web',
      gradient: 'from-emerald-500 to-blue-500'
    },
    {
      id: 'uiux' as const,
      titleEn: 'UI/UX Designer',
      titleId: 'Desainer UI/UX',
      icon: <Palette size={20} />,
      descriptionEn: 'Design Portfolio',
      descriptionId: 'Portofolio Desain',
      gradient: 'from-pink-500 to-purple-500'
    }
  ];

  // Show ViewAllProjects if toggled
  if (showAllProjects) {
    const projectType = activeRole === 'developer' ? 'web' : 'design';
    return <ViewAllProjects onBack={() => setShowAllProjects(false)} projectType={projectType} />;
  }

  return (
    <div className="space-y-0 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, ${activeRole === 'developer' ? '#10b981' : '#ec4899'} 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Hero Section with Gradient */}
      <div className={`relative bg-gradient-to-br ${activeRole === 'developer' ? 'from-emerald-50 via-blue-50 to-white dark:from-gray-900 dark:via-emerald-900/10 dark:to-gray-800' : 'from-pink-50 via-purple-50 to-white dark:from-gray-900 dark:via-pink-900/10 dark:to-gray-800'} px-6 py-12 transition-all duration-500`}>
        {/* Decorative Elements */}
        <motion.div
          className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${currentGradient} opacity-10 rounded-full blur-3xl`}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className={`absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr ${currentGradient} opacity-10 rounded-full blur-3xl`}
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <div className="relative z-10">
          {/* Badge with Animation */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="flex justify-center mb-6"
          >
            <span className={`inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-2 ${activeRole === 'developer' ? 'border-emerald-200 dark:border-emerald-800' : 'border-pink-200 dark:border-pink-800'} rounded-full shadow-lg`}>
              <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${currentGradient} animate-pulse`} />
              <span className={`text-sm font-bold bg-gradient-to-r ${currentGradient} bg-clip-text text-transparent`}>
                {language === 'en' ? 'Services & Portfolio' : 'Layanan & Portofolio'}
              </span>
            </span>
          </motion.div>

          {/* Title with Gradient */}
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-black text-center mb-3 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent"
          >
            {language === 'en' ? 'Choose Your View' : 'Pilih Tampilan'}
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto"
          >
            {language === 'en'
              ? 'Explore my expertise through interactive showcase'
              : 'Jelajahi keahlian saya melalui showcase interaktif'}
          </motion.p>

          {/* Enhanced Role Selector */}
          <div className="flex gap-4">
            {roleOptions.map((role, index) => (
              <motion.button
                key={role.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1, type: "spring" }}
                onClick={() => setActiveRole(role.id)}
                className={`relative flex-1 group ${
                  activeRole === role.id ? 'z-10' : 'z-0'
                }`}
              >
                {/* Animated Background */}
                <div className={`absolute inset-0 rounded-3xl transition-all duration-500 ${
                  activeRole === role.id
                    ? `bg-gradient-to-br ${role.gradient} shadow-2xl scale-105`
                    : 'bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 scale-100'
                }`} />

                {/* Glow Effect */}
                {activeRole === role.id && (
                  <motion.div
                    className={`absolute -inset-1 bg-gradient-to-r ${role.gradient} rounded-3xl blur-lg opacity-30`}
                    animate={{
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                )}

                {/* Content */}
                <div className="relative py-6 px-4">
                  {/* Icon with Background */}
                  <motion.div
                    className={`w-14 h-14 mx-auto mb-3 rounded-2xl flex items-center justify-center ${
                      activeRole === role.id
                        ? 'bg-white/20 backdrop-blur-sm'
                        : 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800'
                    }`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div className={`${activeRole === role.id ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                      {role.icon}
                    </div>
                  </motion.div>

                  {/* Text */}
                  <div className={`font-bold text-sm mb-1 ${
                    activeRole === role.id ? 'text-white' : 'text-gray-900 dark:text-white'
                  }`}>
                    {language === 'en' ? role.titleEn : role.titleId}
                  </div>
                  <div className={`text-xs ${
                    activeRole === role.id ? 'text-white/90' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {language === 'en' ? role.descriptionEn : role.descriptionId}
                  </div>

                  {/* Active Indicator */}
                  {activeRole === role.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-full"
                      transition={{ type: "spring", duration: 0.6 }}
                    />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeRole}
          initial={{ opacity: 0, x: activeRole === 'developer' ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: activeRole === 'developer' ? 20 : -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          {/* Open for Opportunities - Glassmorphism Design */}
          <div className="px-6 -mt-8 relative z-20">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", duration: 0.8 }}
              className="relative overflow-hidden rounded-3xl"
            >
              {/* Glassmorphism Background */}
              <div className="absolute inset-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/50" />

              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${currentGradient} opacity-5`} />

              <div className="relative p-6">
                {/* Header with Icon */}
                <div className="flex items-center justify-center mb-4">
                  <motion.div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${currentGradient} flex items-center justify-center shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <span className="text-2xl">✨</span>
                  </motion.div>
                </div>

                <h3 className={`text-2xl font-black text-center mb-2 bg-gradient-to-r ${currentGradient} bg-clip-text text-transparent`}>
                  {language === 'en' ? 'Open for Opportunities' : 'Terbuka untuk Peluang'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 text-center">
                  {language === 'en'
                    ? 'Available for full-time and freelance projects'
                    : 'Tersedia untuk proyek full-time dan freelance'}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: '💼', title: language === 'en' ? 'Full-Time' : 'Full-Time', items: [
                      language === 'en' ? 'Long-term' : 'Jangka panjang',
                      language === 'en' ? 'Team collab' : 'Kolaborasi',
                      language === 'en' ? 'Relocation' : 'Relokasi'
                    ]},
                    { icon: '🚀', title: language === 'en' ? 'Freelance' : 'Freelance', items: [
                      language === 'en' ? 'Project-based' : 'Berbasis proyek',
                      language === 'en' ? 'Flexible' : 'Fleksibel',
                      language === 'en' ? 'Remote' : 'Remote'
                    ]}
                  ].map((opportunity, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, type: "spring" }}
                      whileHover={{ y: -4 }}
                      className="bg-white/80 dark:bg-gray-700/50 backdrop-blur-sm rounded-2xl p-4 border border-white/50 dark:border-gray-600/50 shadow-lg"
                    >
                      <div className="text-3xl mb-2 text-center">{opportunity.icon}</div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-center text-sm mb-3">
                        {opportunity.title}
                      </h4>
                      <ul className="space-y-1.5">
                        {opportunity.items.map((item, i) => (
                          <li key={i} className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${currentGradient} mr-2`} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Services Section - Enhanced Cards */}
          <div className="space-y-6 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12">
            {/* Section Header */}
            <div className="px-6 text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
              >
                <span className={`inline-flex items-center justify-center gap-2 px-4 py-2 ${activeRole === 'developer' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400'} rounded-full text-sm font-semibold mb-4 w-fit mx-auto`}>
                  <Briefcase size={16} />
                  {language === 'en' ? 'What I Offer' : 'Yang Saya Tawarkan'}
                </span>
              </motion.div>
              <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
                {language === 'en' ? 'Professional Services' : 'Layanan Profesional'}
              </h3>
              <div className={`w-20 h-1.5 bg-gradient-to-r ${currentGradient} mx-auto rounded-full`} />
            </div>

            <div className="px-6 space-y-5">
              {currentServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ x: -40, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, type: "spring" }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="relative group"
                >
                  {/* Card Background with Gradient Border */}
                  <div className="absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-3xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />

                  <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border-2 border-transparent hover:border-white dark:hover:border-gray-700 transition-all duration-300">
                    {/* Icon with Animated Background */}
                    <div className="flex items-start gap-4 mb-5">
                      <motion.div
                        className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-3xl flex-shrink-0 shadow-lg`}
                        whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {/* Glow effect */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-2xl blur-xl opacity-50`} />
                        <span className="relative z-10">{service.icon}</span>
                      </motion.div>

                      <div className="flex-1">
                        <h4 className="text-lg font-black text-gray-900 dark:text-white mb-2">
                          {language === 'en' ? service.titleEn : service.titleId}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          {language === 'en' ? service.descriptionEn : service.descriptionId}
                        </p>
                      </div>
                    </div>

                    {/* Features with Better Visual */}
                    <div className={`grid grid-cols-1 gap-2.5 pt-4 border-t-2 border-dashed ${activeRole === 'developer' ? 'border-emerald-100 dark:border-emerald-900/30' : 'border-pink-100 dark:border-pink-900/30'}`}>
                      {(language === 'en' ? service.features.en : service.features.id).map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ x: -10, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 + idx * 0.05 }}
                          className="flex items-center text-sm text-gray-700 dark:text-gray-300 group/item"
                        >
                          <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${service.gradient} flex items-center justify-center mr-3 shadow-sm group-hover/item:scale-110 transition-transform`}>
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="font-medium">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Skills Section - Enhanced with Glassmorphism */}
          <div className="relative py-16 overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-800" />
            <motion.div
              className={`absolute top-20 left-0 w-72 h-72 bg-gradient-to-br ${currentGradient} opacity-10 rounded-full blur-3xl`}
              animate={{ x: [-50, 50, -50], y: [-30, 30, -30] }}
              transition={{ duration: 20, repeat: Infinity }}
            />

            <div className="relative space-y-6">
              {/* Section Header */}
              <div className="px-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  className={`inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-2 ${activeRole === 'developer' ? 'border-emerald-200 dark:border-emerald-800' : 'border-pink-200 dark:border-pink-800'} rounded-full mb-4 shadow-lg`}
                >
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${currentGradient} animate-pulse`} />
                  <span className={`text-sm font-bold bg-gradient-to-r ${currentGradient} bg-clip-text text-transparent`}>
                    {language === 'en' ? 'Technical Skills' : 'Keahlian Teknis'}
                  </span>
                </motion.div>
                <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
                  {language === 'en' ? 'Tools & Expertise' : 'Alat & Keahlian'}
                </h3>
                <div className={`w-20 h-1.5 bg-gradient-to-r ${currentGradient} mx-auto rounded-full`} />
              </div>

              {/* Skills Grid */}
              <div className="px-6 grid grid-cols-2 gap-4">
                {currentSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ scale: 0, opacity: 0, rotateY: -90 }}
                    whileInView={{ scale: 1, opacity: 1, rotateY: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, type: "spring", duration: 0.8 }}
                    whileHover={{ y: -6, scale: 1.05 }}
                    className="relative group"
                  >
                    {/* Glassmorphism Card */}
                    <div className="absolute inset-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-gray-700/50 shadow-xl" />

                    {/* Gradient Glow on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${currentGradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`} />

                    <div className="relative p-5">
                      {/* Icon with Animated Background */}
                      <motion.div
                        className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-3 shadow-lg relative"
                        style={{
                          background: `linear-gradient(135deg, ${skill.color}30, ${skill.color}10)`
                        }}
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {/* Glow Effect */}
                        <div
                          className="absolute inset-0 rounded-xl blur-lg opacity-30"
                          style={{ backgroundColor: skill.color }}
                        />
                        <span className="relative z-10">{skill.icon}</span>
                      </motion.div>

                      {/* Skill Name */}
                      <h4 className="font-black text-gray-900 dark:text-white text-sm leading-tight mb-3">
                        {language === 'en' ? skill.name : skill.nameId}
                      </h4>

                      {/* Progress Section */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                            {language === 'en' ? 'Proficiency' : 'Kemahiran'}
                          </span>
                          <span className={`text-xs font-black bg-gradient-to-r ${currentGradient} bg-clip-text text-transparent`}>
                            {skill.level}%
                          </span>
                        </div>

                        {/* Enhanced Progress Bar */}
                        <div className="relative w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
                          <motion.div
                            className="h-full rounded-full relative overflow-hidden"
                            style={{
                              background: `linear-gradient(90deg, ${skill.color}, ${skill.color}dd)`
                            }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1.2, delay: index * 0.08, ease: "easeOut" }}
                            viewport={{ once: true }}
                          >
                            {/* Shimmer Effect */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                              animate={{ x: ['-100%', '200%'] }}
                              transition={{ duration: 2, delay: index * 0.08 + 1.2, ease: "linear" }}
                            />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Portfolio Projects Carousel - Enhanced */}
          <div className="relative py-16 overflow-hidden">
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-b ${activeRole === 'developer' ? 'from-emerald-50/50 via-blue-50/50 to-white dark:from-gray-900 dark:via-emerald-950/20 dark:to-gray-800' : 'from-pink-50/50 via-purple-50/50 to-white dark:from-gray-900 dark:via-pink-950/20 dark:to-gray-800'}`} />

            {/* Decorative Elements */}
            <motion.div
              className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl ${currentGradient} opacity-5 rounded-full blur-3xl`}
              animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 0] }}
              transition={{ duration: 25, repeat: Infinity }}
            />

            <div className="relative px-6">
              {/* Enhanced Header */}
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", duration: 0.8 }}
                className="text-center mb-12"
              >
                {/* Animated Badge */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", duration: 0.8, delay: 0.2 }}
                  className="inline-block mb-4"
                >
                  <span className={`inline-flex items-center justify-center gap-2 px-4 py-2 ${activeRole === 'developer' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'} rounded-full text-sm font-semibold w-fit`}>
                    <Sparkles size={16} />
                    {language === 'en' ? 'Featured Works' : 'Karya Unggulan'}
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl font-black text-gray-900 dark:text-white mb-3"
                >
                  {activeRole === 'developer'
                    ? (language === 'en' ? 'Development Projects' : 'Proyek Pengembangan')
                    : (language === 'en' ? 'Design Projects' : 'Proyek Desain')
                  }
                </motion.h2>

                {/* Animated Underline */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 80 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className={`h-1.5 bg-gradient-to-r ${currentGradient} mx-auto rounded-full mb-4`}
                />

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-600 dark:text-gray-400 max-w-md mx-auto"
                >
                  {language === 'en'
                    ? 'Swipe through my latest work and creative solutions'
                    : 'Geser untuk melihat karya terbaru dan solusi kreatif saya'}
                </motion.p>
              </motion.div>

              {/* Carousel */}
              {currentProjects.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mb-10"
                >
                  <div className="flex justify-center overflow-x-auto pb-2">
                    <Carousel
                      items={currentProjects}
                      baseWidth={carouselWidth}
                      autoplay={true}
                      autoplayDelay={4000}
                      pauseOnHover={true}
                      loop={true}
                      language={language}
                    />
                  </div>
                </motion.div>
              )}

              {/* Enhanced View All Button */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="relative group"
              >
                {/* Button Glow */}
                <div className={`absolute inset-0 bg-gradient-to-r ${currentGradient} rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity`} />

                <button
                  onClick={() => setShowAllProjects(true)}
                  className={`relative w-full py-4 px-8 bg-gradient-to-r ${currentGradient} text-white rounded-full font-bold shadow-2xl active:scale-95 transition-all duration-300 group-hover:shadow-3xl overflow-hidden`}
                >
                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />

                  <span className="relative flex items-center justify-center gap-2">
                    {language === 'en' ? 'View All Projects' : 'Lihat Semua Projek'}
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                </button>
              </motion.div>
            </div>
          </div>

          {/* Call to Action - Enhanced with Glassmorphism */}
          <div className="relative px-6 py-16 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-800" />

            {/* Decorative Circles */}
            <motion.div
              className={`absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-br ${currentGradient} opacity-10 rounded-full blur-3xl`}
              animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
              transition={{ duration: 15, repeat: Infinity }}
            />
            <motion.div
              className={`absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-tl ${currentGradient} opacity-10 rounded-full blur-3xl`}
              animate={{ scale: [1, 1.3, 1], x: [0, -30, 0] }}
              transition={{ duration: 18, repeat: Infinity }}
            />

            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.9 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", duration: 0.8 }}
              className="relative"
            >
              {/* Glassmorphism Container */}
              <div className="relative overflow-hidden rounded-3xl">
                {/* Main Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${currentGradient} opacity-95`} />

                {/* Glassmorphic Overlay */}
                <div className="absolute inset-0 backdrop-blur-sm bg-white/10 dark:bg-black/10" />

                {/* Pattern Overlay */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '24px 24px'
                  }} />
                </div>

                {/* Content */}
                <div className="relative p-8">
                  {/* Icon with Animation */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", duration: 1, delay: 0.2 }}
                    className="flex justify-center mb-6"
                  >
                    <div className="relative">
                      <motion.div
                        className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl shadow-2xl"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <span>🚀</span>
                      </motion.div>
                      {/* Pulsing Ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-white/40"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                  </motion.div>

                  {/* Title with Animation */}
                  <motion.h3
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl font-black mb-3 text-center text-white"
                  >
                    {language === 'en' ? "Let's Work Together!" : 'Mari Bekerja Sama!'}
                  </motion.h3>

                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-white/95 text-sm mb-8 text-center max-w-sm mx-auto leading-relaxed"
                  >
                    {language === 'en'
                      ? "Ready to bring your ideas to life? Let's create something amazing together!"
                      : 'Siap mewujudkan ide Anda? Mari ciptakan sesuatu yang luar biasa bersama!'}
                  </motion.p>

                  {/* Enhanced Button */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="relative group"
                  >
                    {/* Button Glow */}
                    <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />

                    <button
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                      className="relative w-full py-4 px-8 bg-white text-gray-900 rounded-full font-bold shadow-2xl active:scale-95 transition-all duration-300 overflow-hidden group"
                    >
                      {/* Shimmer Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200 to-transparent"
                        animate={{ x: ['-200%', '200%'] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      />

                      <span className={`relative flex items-center justify-center gap-2 bg-gradient-to-r ${currentGradient} bg-clip-text text-transparent font-black`}>
                        {language === 'en' ? 'Get in Touch' : 'Hubungi Saya'}
                        <motion.span
                          className="text-xl"
                          animate={{ x: [0, 5, 0], rotate: [0, 15, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          ✉️
                        </motion.span>
                      </span>
                    </button>
                  </motion.div>

                  {/* Bottom Stats/Info */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="mt-8 pt-6 border-t border-white/20 grid grid-cols-3 gap-4"
                  >
                    {[
                      { icon: '⚡', label: language === 'en' ? 'Fast Reply' : 'Respon Cepat' },
                      { icon: '🎯', label: language === 'en' ? 'Quality Work' : 'Kerja Berkualitas' },
                      { icon: '🤝', label: language === 'en' ? 'Reliable' : 'Terpercaya' }
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 + idx * 0.1, type: "spring" }}
                        className="text-center"
                      >
                        <div className="text-2xl mb-1">{item.icon}</div>
                        <div className="text-xs text-white/80 font-medium">{item.label}</div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
