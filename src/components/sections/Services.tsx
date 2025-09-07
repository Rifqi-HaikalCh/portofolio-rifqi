"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../../context/LanguageContext';
import { AnimatedSectionTitle } from '../shared/AnimatedSectionTitle';
import { AnimatedCard } from '../shared/AnimatedCard';
import { InteractiveButton } from '../shared/InteractiveButton';
import { StandardModal } from '../shared/StandardModal';
import { Code, Palette, Layers, ChevronLeft, ChevronRight, X, ArrowRight, Sparkles, Eye, ExternalLink } from 'lucide-react';
import { Projects } from './Projects';

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
  tools?: {
    en: string;
    id: string;
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
      en: [
        'Complete UI design systems',
        'Mobile-first responsive design',
        'Desktop optimization',
        'Design handoff documentation',
        'Style guide creation'
      ],
      id: [
        'Sistem desain UI yang lengkap',
        'Desain responsif mobile-first',
        'Optimisasi desktop',
        'Dokumentasi handoff desain',
        'Pembuatan panduan style'
      ]
    },
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 'wireframes',
    titleEn: 'Wireframes & Mockups',
    titleId: 'Wireframes & Mockups',
    icon: '📐',
    descriptionEn: 'Quickly mapping out your app\'s structure and flow.',
    descriptionId: 'Memetakan struktur dan alur aplikasi Anda dengan cepat.',
    features: {
      en: [
        'Low-fidelity wireframes',
        'Information architecture',
        'User flow diagrams',
        'Content mapping',
        'Navigation structure'
      ],
      id: [
        'Wireframes fidelitas rendah',
        'Arsitektur informasi',
        'Diagram alur pengguna',
        'Pemetaan konten',
        'Struktur navigasi'
      ]
    },
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'prototypes',
    titleEn: 'High-Fidelity Prototypes',
    titleId: 'Prototype Fidelitas Tinggi',
    icon: '⚡',
    descriptionEn: 'Building clickable, interactive demos you can test and feel.',
    descriptionId: 'Membangun demo interaktif yang dapat diuji dan dirasakan.',
    features: {
      en: [
        'Interactive prototypes',
        'Animation and micro-interactions',
        'User testing ready',
        'Stakeholder presentations',
        'Design validation'
      ],
      id: [
        'Prototype interaktif',
        'Animasi dan micro-interactions',
        'Siap untuk user testing',
        'Presentasi stakeholder',
        'Validasi desain'
      ]
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
      en: [
        'Brand identity design',
        'Color palette creation',
        'Typography selection',
        'Logo and iconography',
        'Visual brand guidelines'
      ],
      id: [
        'Desain identitas brand',
        'Pembuatan palet warna',
        'Pemilihan tipografi',
        'Logo dan ikonografi',
        'Panduan visual brand'
      ]
    },
    gradient: 'from-orange-500 to-red-500'
  },
  {
    id: 'user-flow',
    titleEn: 'User Flow Mapping',
    titleId: 'Pemetaan Alur Pengguna',
    icon: '🗺️',
    descriptionEn: 'Designing intuitive and logical navigation for your users.',
    descriptionId: 'Merancang navigasi yang intuitif dan logis untuk pengguna Anda.',
    features: {
      en: [
        'User journey mapping',
        'Task flow analysis',
        'Navigation optimization',
        'Conversion funnel design',
        'User experience strategy'
      ],
      id: [
        'Pemetaan perjalanan pengguna',
        'Analisis alur tugas',
        'Optimisasi navigasi',
        'Desain funnel konversi',
        'Strategi pengalaman pengguna'
      ]
    },
    gradient: 'from-indigo-500 to-purple-500'
  }
];

const developerServices: Service[] = [
  {
    id: 'design-to-code',
    titleEn: 'Design to Live Code',
    titleId: 'Desain ke Kode Live',
    icon: '💻',
    descriptionEn: 'Converting your Figma (or other) designs into a real, working interface.',
    descriptionId: 'Mengonversi desain Figma (atau lainnya) Anda menjadi antarmuka yang berfungsi.',
    features: {
      en: [
        'Pixel-perfect implementation',
        'Cross-browser compatibility',
        'Clean, maintainable code',
        'Component-based architecture',
        'Performance optimization'
      ],
      id: [
        'Implementasi pixel-perfect',
        'Kompatibilitas cross-browser',
        'Kode yang bersih dan maintainable',
        'Arsitektur berbasis komponen',
        'Optimisasi performa'
      ]
    },
    gradient: 'from-blue-500 to-indigo-500'
  },
  {
    id: 'responsive-builds',
    titleEn: 'Fully Responsive Builds',
    titleId: 'Build yang Sepenuhnya Responsif',
    icon: '📱',
    descriptionEn: 'Ensuring your site looks and works perfectly on any device.',
    descriptionId: 'Memastikan situs Anda terlihat dan berfungsi sempurna di perangkat apa pun.',
    features: {
      en: [
        'Mobile-first approach',
        'Tablet optimization',
        'Desktop enhancement',
        'Touch-friendly interactions',
        'Adaptive layouts'
      ],
      id: [
        'Pendekatan mobile-first',
        'Optimisasi tablet',
        'Peningkatan desktop',
        'Interaksi ramah sentuhan',
        'Tata letak adaptif'
      ]
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
      en: [
        'RESTful API consumption',
        'Data state management',
        'Error handling',
        'Caching strategies',
        'Real-time updates'
      ],
      id: [
        'Konsumsi RESTful API',
        'Manajemen state data',
        'Penanganan error',
        'Strategi caching',
        'Update real-time'
      ]
    },
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    id: 'modern-tech',
    titleEn: 'Modern Tech Stacks',
    titleId: 'Tech Stack Modern',
    icon: '⚛️',
    descriptionEn: 'Working with your preferred tools, including Angular, React, and Vue.js.',
    descriptionId: 'Bekerja dengan alat pilihan Anda, termasuk Angular, React, dan Vue.js.',
    features: {
      en: [
        'Angular development',
        'React.js applications',
        'Vue.js projects',
        'TypeScript implementation',
        'Modern build tools'
      ],
      id: [
        'Pengembangan Angular',
        'Aplikasi React.js',
        'Proyek Vue.js',
        'Implementasi TypeScript',
        'Tool build modern'
      ]
    },
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 'interactive-features',
    titleEn: 'Interactive Features',
    titleId: 'Fitur Interaktif',
    icon: '✨',
    descriptionEn: 'Building smooth animations and engaging user-facing features.',
    descriptionId: 'Membangun animasi yang halus dan fitur yang menarik bagi pengguna.',
    features: {
      en: [
        'Smooth animations',
        'Micro-interactions',
        'Loading states',
        'Form validations',
        'User feedback systems'
      ],
      id: [
        'Animasi yang halus',
        'Micro-interactions',
        'Status loading',
        'Validasi form',
        'Sistem feedback pengguna'
      ]
    },
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'clean-code',
    titleEn: 'Clean Code Delivery',
    titleId: 'Pengiriman Kode Bersih',
    icon: '🧹',
    descriptionEn: 'You get well-organized code, shared via Git or a simple .zip file.',
    descriptionId: 'Anda mendapatkan kode yang terorganisir dengan baik, dibagikan melalui Git atau file .zip sederhana.',
    features: {
      en: [
        'Clean code practices',
        'Proper documentation',
        'Git version control',
        'Code review ready',
        'Maintenance friendly'
      ],
      id: [
        'Praktik kode bersih',
        'Dokumentasi yang tepat',
        'Kontrol versi Git',
        'Siap untuk code review',
        'Ramah maintenance'
      ]
    },
    gradient: 'from-teal-500 to-green-500'
  }
];

const fullstackServices: Service[] = [
  {
    id: 'all-in-one',
    titleEn: 'All-in-One Solution',
    titleId: 'Solusi All-in-One',
    icon: '🚀',
    descriptionEn: 'Taking care of the entire process: UI/UX Design, Frontend, and Backend.',
    descriptionId: 'Menangani seluruh proses: Desain UI/UX, Frontend, dan Backend.',
    features: {
      en: [
        'Complete project management',
        'End-to-end development',
        'Design to deployment',
        'Unified workflow',
        'Single point of contact'
      ],
      id: [
        'Manajemen proyek lengkap',
        'Pengembangan end-to-end',
        'Desain hingga deployment',
        'Alur kerja terpadu',
        'Satu titik kontak'
      ]
    },
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'backend-apis',
    titleEn: 'Custom Backend APIs',
    titleId: 'API Backend Kustom',
    icon: '⚙️',
    descriptionEn: 'Building a powerful and secure backend using Java (Spring Boot) or JavaScript (Express.js).',
    descriptionId: 'Membangun backend yang kuat dan aman menggunakan Java (Spring Boot) atau JavaScript (Express.js).',
    features: {
      en: [
        'RESTful API development',
        'Database design',
        'Authentication & authorization',
        'Security implementation',
        'Performance optimization'
      ],
      id: [
        'Pengembangan RESTful API',
        'Desain database',
        'Autentikasi & otorisasi',
        'Implementasi keamanan',
        'Optimisasi performa'
      ]
    },
    gradient: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'seamless-integration',
    titleEn: 'Seamless Integration',
    titleId: 'Integrasi yang Mulus',
    icon: '🔗',
    descriptionEn: 'Ensuring your frontend and backend work together perfectly.',
    descriptionId: 'Memastikan frontend dan backend Anda bekerja sama dengan sempurna.',
    features: {
      en: [
        'Frontend-backend sync',
        'Data flow optimization',
        'Error handling',
        'Real-time communication',
        'State management'
      ],
      id: [
        'Sinkronisasi frontend-backend',
        'Optimisasi alur data',
        'Penanganan error',
        'Komunikasi real-time',
        'Manajemen state'
      ]
    },
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'database-setup',
    titleEn: 'Database Setup',
    titleId: 'Pengaturan Database',
    icon: '🗄️',
    descriptionEn: 'Integrating the right database to power your application.',
    descriptionId: 'Mengintegrasikan database yang tepat untuk mendukung aplikasi Anda.',
    features: {
      en: [
        'Database architecture',
        'Schema design',
        'Query optimization',
        'Data migration',
        'Backup strategies'
      ],
      id: [
        'Arsitektur database',
        'Desain skema',
        'Optimisasi query',
        'Migrasi data',
        'Strategi backup'
      ]
    },
    gradient: 'from-orange-500 to-red-500'
  },
  {
    id: 'end-to-end',
    titleEn: 'End-to-End Development',
    titleId: 'Pengembangan End-to-End',
    icon: '🎯',
    descriptionEn: 'Managing your project from the first idea to the final product (excluding hosting).',
    descriptionId: 'Mengelola proyek Anda dari ide pertama hingga produk akhir (tidak termasuk hosting).',
    features: {
      en: [
        'Project planning',
        'Timeline management',
        'Quality assurance',
        'Testing & debugging',
        'Documentation delivery'
      ],
      id: [
        'Perencanaan proyek',
        'Manajemen timeline',
        'Jaminan kualitas',
        'Testing & debugging',
        'Pengiriman dokumentasi'
      ]
    },
    gradient: 'from-pink-500 to-rose-500'
  }
];

// Design Projects Data
interface DesignProject {
  id: string;
  titleEn: string;
  titleId: string;
  descriptionEn: string;
  descriptionId: string;
  image: string; // Main preview image
  images: string[]; // Gallery images for modal
  colors?: string[]; // Color palette
  tools: string[];
  year: string;
  category: string;
  client?: string;
  links?: {
    demo?: string;
    figma?: string;
  };
}

const designProjects: DesignProject[] = [
  {
    id: 'assets-management',
    titleEn: 'Assets Management System',
    titleId: 'Sistem Manajemen Aset',
    descriptionEn: 'A comprehensive web design system for asset management platform with focus on user experience and data visualization.',
    descriptionId: 'Sistem desain web komprehensif untuk platform manajemen aset dengan fokus pada pengalaman pengguna dan visualisasi data.',
    image: '/assets/Assets Manajemen Web Design-01.png',
    images: [
      '/assets/Assets Manajemen Web Design-01.png',
      '/assets/Assets Manajemen Web Design-02.png',
      '/assets/Assets Manajemen Web Design-03.png',
      '/assets/Assets Manajemen Web Design-04.png',
      '/assets/Assets Manajemen Web Design-05.png',
      '/assets/Assets Manajemen Web Design-06.png',
      '/assets/Assets Manajemen Web Design-07.png',
      '/assets/Assets Manajemen Web Design-08.png'
    ],
    colors: ['#2563eb', '#06b6d4', '#10b981', '#f59e0b'],
    tools: ['Figma', 'Adobe Photoshop', 'Principle'],
    year: '2024',
    category: 'Web Design',
    client: 'Tech Solutions Inc'
  },
  {
    id: 'campus-website',
    titleEn: 'Campus Portal Design',
    titleId: 'Desain Portal Kampus',
    descriptionEn: 'Modern and accessible campus website design focusing on student experience and information architecture.',
    descriptionId: 'Desain website kampus modern dan accessible yang berfokus pada pengalaman mahasiswa dan arsitektur informasi.',
    image: '/assets/Campuss Website Design-1.png',
    images: [
      '/assets/Campuss Website Design-1.png',
      '/assets/Campuss Website Design-2.png',
      '/assets/Campuss Website Design-3.png'
    ],
    colors: ['#1e40af', '#059669', '#d97706'],
    tools: ['Figma', 'Sketch', 'InVision'],
    year: '2024',
    category: 'Web Design',
    client: 'Del Institute'
  },
  {
    id: 'gordenaise',
    titleEn: 'Gordenaise E-commerce',
    titleId: 'E-commerce Gordenaise',
    descriptionEn: 'Luxury home decor e-commerce platform with emphasis on visual appeal and conversion optimization.',
    descriptionId: 'Platform e-commerce dekorasi rumah mewah dengan penekanan pada daya tarik visual dan optimasi konversi.',
    image: '/assets/Gordenaise Website Design-01.png',
    images: [
      '/assets/Gordenaise Website Design-01.png',
      '/assets/Gordenaise Website Design-02.png',
      '/assets/Gordenaise Website Design-03.png',
      '/assets/Gordenaise Website Design-04.png'
    ],
    colors: ['#a855f7', '#ec4899', '#06b6d4'],
    tools: ['Figma', 'Adobe XD', 'Photoshop'],
    year: '2024',
    category: 'E-commerce Design',
    client: 'Gordenaise Home Decor'
  }
];

// Skills data integrated from UnifiedSkills
interface Skill {
  name: string;
  nameId: string;
  icon: string;
  level: number;
  color: string;
  description: string;
  descriptionId: string;
  category: string;
}

// Developer Skills
const developerSkills: Skill[] = [
  {
    name: 'HTML5',
    nameId: 'HTML5',
    icon: '🌐',
    level: 95,
    color: '#E34F26',
    description: 'Semantic markup and modern web standards',
    descriptionId: 'Markup semantik dan standar web modern',
    category: 'Web Fundamentals'
  },
  {
    name: 'CSS3',
    nameId: 'CSS3',
    icon: '🎨',
    level: 90,
    color: '#1572B6',
    description: 'Advanced styling and responsive design',
    descriptionId: 'Styling canggih dan desain responsif',
    category: 'Web Fundamentals'
  },
  {
    name: 'JavaScript',
    nameId: 'JavaScript',
    icon: '⚡',
    level: 92,
    color: '#F7DF1E',
    description: 'Modern ES6+ and dynamic programming',
    descriptionId: 'ES6+ modern dan pemrograman dinamis',
    category: 'Programming Language'
  },
  {
    name: 'TypeScript',
    nameId: 'TypeScript',
    icon: '📘',
    level: 88,
    color: '#3178C6',
    description: 'Type-safe JavaScript development',
    descriptionId: 'Pengembangan JavaScript yang type-safe',
    category: 'Programming Language'
  },
  {
    name: 'Angular',
    nameId: 'Angular',
    icon: '🅰️',
    level: 95,
    color: '#DD0031',
    description: 'Expert in building scalable applications',
    descriptionId: 'Ahli dalam membangun aplikasi yang skalabel',
    category: 'Frontend Framework'
  },
  {
    name: 'React.js',
    nameId: 'React.js',
    icon: '⚛️',
    level: 90,
    color: '#61DAFB',
    description: 'Modern component-based development',
    descriptionId: 'Pengembangan berbasis komponen modern',
    category: 'Frontend Framework'
  }
];

// UI/UX Design Skills
const designSkills: Skill[] = [
  {
    name: 'Figma',
    nameId: 'Figma',
    icon: '🎨',
    level: 95,
    color: '#F24E1E',
    description: 'Advanced interface design and prototyping',
    descriptionId: 'Desain antarmuka lanjutan dan prototyping',
    category: 'Design Tools'
  },
  {
    name: 'Adobe Creative Suite',
    nameId: 'Adobe Creative Suite',
    icon: '🖼️',
    level: 90,
    color: '#FF0000',
    description: 'Complete creative workflow mastery',
    descriptionId: 'Penguasaan alur kerja kreatif lengkap',
    category: 'Design Tools'
  },
  {
    name: 'User Research',
    nameId: 'Riset Pengguna',
    icon: '🔍',
    level: 88,
    color: '#8B5CF6',
    description: 'Understanding user needs and behaviors',
    descriptionId: 'Memahami kebutuhan dan perilaku pengguna',
    category: 'UX Research'
  },
  {
    name: 'Prototyping',
    nameId: 'Prototyping',
    icon: '⚡',
    level: 92,
    color: '#F59E0B',
    description: 'Interactive and high-fidelity prototypes',
    descriptionId: 'Prototype interaktif dan fidelitas tinggi',
    category: 'Design Process'
  }
];

export function Services() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'uiux' | 'development'>('uiux');
  
  // Intersection Observer and Smart Notification
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });
  const [showNotification, setShowNotification] = useState(false);
  const [notificationShown, setNotificationShown] = useState(false);
  const [pointingTab, setPointingTab] = useState<'uiux' | 'development'>('uiux');

  const tabs = [
    {
      id: 'uiux' as const,
      icon: Palette,
      labelEn: 'UI/UX Design',
      labelId: 'Desain UI/UX',
      descriptionEn: 'Creative design and user experience',
      descriptionId: 'Desain kreatif dan pengalaman pengguna',
      gradient: 'from-purple-500 to-pink-500',
      skills: designSkills,
      services: uiuxServices
    },
    {
      id: 'development' as const,
      icon: Code,
      labelEn: 'Web Development',
      labelId: 'Pengembangan Web',
      descriptionEn: 'Technical development expertise',
      descriptionId: 'Keahlian pengembangan teknis',
      gradient: 'from-blue-500 to-cyan-500',
      skills: developerSkills,
      services: developerServices
    }
  ];

  const currentTab = tabs.find(tab => tab.id === activeTab) || tabs[0];
  const currentServices = currentTab.services.slice(0, 6);

  const tabVariants = {
    inactive: {
      scale: 1,
      opacity: 0.7
    },
    active: {
      scale: 1,
      opacity: 1
    }
  };

  const contentVariants = {
    hidden: { 
      opacity: 0, 
      x: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  // Smart Notification Effect
  useEffect(() => {
    if (inView && !notificationShown) {
      const timer = setTimeout(() => {
        setShowNotification(true);
        setNotificationShown(true);
        
        // Alternating pointing animation
        const pointingInterval = setInterval(() => {
          setPointingTab(prev => prev === 'uiux' ? 'development' : 'uiux');
        }, 2000);
        
        // Auto-hide after 8 seconds
        const hideTimer = setTimeout(() => {
          setShowNotification(false);
          clearInterval(pointingInterval);
        }, 8000);
        
        return () => {
          clearTimeout(hideTimer);
          clearInterval(pointingInterval);
        };
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [inView, notificationShown]);

  return (
    <section 
      ref={sectionRef}
      id="services" 
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSectionTitle
          badge={language === 'en' ? 'Services' : 'Layanan'}
          title={language === 'en' ? 'Professional Services' : 'Layanan Profesional'}
          subtitle={language === 'en' 
            ? 'Comprehensive digital solutions combining design creativity with technical expertise'
            : 'Solusi digital komprehensif yang menggabungkan kreativitas desain dengan keahlian teknis'
          }
        />

        {/* Tab Navigation */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-white dark:bg-gray-800 p-1.5 lg:p-2 rounded-xl lg:rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 inline-flex flex-col sm:flex-row w-full sm:w-auto">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <motion.button
                  key={tab.id}
                  className={`relative px-4 lg:px-8 py-3 lg:py-4 rounded-lg lg:rounded-xl font-semibold text-sm flex items-center space-x-2 lg:space-x-3 transition-all duration-300 min-w-0 sm:min-w-[220px] justify-center ${
                    isActive
                      ? `bg-gradient-to-r ${tab.gradient} text-white shadow-lg`
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                  variants={tabVariants}
                  animate={isActive ? 'active' : 'inactive'}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: isActive 
                      ? "0 20px 40px rgba(139, 92, 246, 0.3), 0 0 20px rgba(139, 92, 246, 0.2)"
                      : "0 10px 25px rgba(0, 0, 0, 0.1)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Sliding indicator background */}
                  {isActive && (
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${tab.gradient} rounded-lg lg:rounded-xl`}
                      layoutId="activeServiceTab"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}

                  {/* Content */}
                  <div className="relative z-10 flex items-center space-x-2 lg:space-x-3">
                    <motion.div
                      whileHover={{ 
                        rotate: isActive ? [0, -5, 5, 0] : 0,
                        scale: 1.1 
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <IconComponent className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                    </motion.div>
                    <div className="text-left min-w-0">
                      <div className="font-semibold text-xs lg:text-sm">
                        {language === 'en' ? tab.labelEn : tab.labelId}
                      </div>
                      <div className={`text-xs hidden sm:block ${isActive ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                        {language === 'en' ? tab.descriptionEn : tab.descriptionId}
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Smart Interactive Notification */}
        <AnimatePresence>
          {showNotification && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white rounded-2xl p-4 shadow-2xl border border-white/20 backdrop-blur-lg max-w-md mx-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                  <span className="font-bold text-sm">
                    {language === 'en' ? 'I have two worlds!' : 'Saya punya dua dunia!'}
                  </span>
                </div>
                <button
                  onClick={() => setShowNotification(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-white/90 text-xs mb-3">
                {language === 'en' 
                  ? 'Explore my expertise in both fields!' 
                  : 'Jelajahi keahlian saya di kedua bidang!'
                }
              </p>
              <div className="flex items-center justify-center space-x-4">
                <motion.div
                  animate={{ 
                    scale: pointingTab === 'uiux' ? [1, 1.2, 1] : 1,
                    rotate: pointingTab === 'uiux' ? [0, -10, 0] : 0
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="flex items-center space-x-1 text-xs"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>UI/UX</span>
                </motion.div>
                <motion.div
                  animate={{ 
                    scale: pointingTab === 'development' ? [1, 1.2, 1] : 1,
                    rotate: pointingTab === 'development' ? [0, 10, 0] : 0
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="flex items-center space-x-1 text-xs"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>Development</span>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="space-y-16"
          >
            {/* Open for Opportunities Section */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {language === 'en' ? 'Open for Opportunities' : 'Terbuka untuk Peluang'}
                </h3>
                <div className={`w-24 h-1 bg-gradient-to-r ${currentTab.gradient} mx-auto rounded-full`} />
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-gray-200 dark:border-gray-700">
                <div className="text-center mb-8">
                  <p className="text-gray-600 dark:text-gray-300 text-base lg:text-lg max-w-3xl mx-auto px-4 lg:px-0">
                    {language === 'en' 
                      ? 'I am actively seeking new opportunities and ready to contribute to exciting projects. Whether you need a dedicated team member or a skilled freelancer, I\'m here to help bring your vision to life.'
                      : 'Saya secara aktif mencari peluang baru dan siap berkontribusi pada proyek yang menarik. Apakah Anda membutuhkan anggota tim yang berdedikasi atau freelancer yang terampil, saya di sini untuk membantu mewujudkan visi Anda.'
                    }
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
                  {/* Full-time */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
                    <div className="flex items-center mb-4">
                      <span className="text-3xl mr-3">💼</span>
                      <h4 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">
                        {language === 'en' ? 'Full-Time Position' : 'Posisi Full-Time'}
                      </h4>
                    </div>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300 mb-4">
                      <li>• {language === 'en' ? 'Long-term commitment' : 'Komitmen jangka panjang'}</li>
                      <li>• {language === 'en' ? 'Team collaboration' : 'Kolaborasi tim'}</li>
                      <li>• {language === 'en' ? 'Growth-oriented mindset' : 'Mindset berorientasi pertumbuhan'}</li>
                      <li>• {language === 'en' ? 'Available for relocation' : 'Tersedia untuk relokasi'}</li>
                    </ul>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {language === 'en' 
                        ? 'Ready to join innovative companies and contribute to meaningful projects with dedicated focus and professional growth.'
                        : 'Siap bergabung dengan perusahaan inovatif dan berkontribusi pada proyek yang bermakna dengan fokus yang berdedikasi dan pertumbuhan profesional.'
                      }
                    </p>
                  </div>

                  {/* Freelance */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
                    <div className="flex items-center mb-4">
                      <span className="text-3xl mr-3">🚀</span>
                      <h4 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">
                        {language === 'en' ? 'Freelance Projects' : 'Proyek Freelance'}
                      </h4>
                    </div>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300 mb-4">
                      <li>• {language === 'en' ? 'Project-based engagement' : 'Keterlibatan berbasis proyek'}</li>
                      <li>• {language === 'en' ? 'Flexible timeline' : 'Timeline fleksibel'}</li>
                      <li>• {language === 'en' ? 'Remote-friendly' : 'Ramah remote'}</li>
                      <li>• {language === 'en' ? 'Quick turnaround' : 'Turnaround cepat'}</li>
                    </ul>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {language === 'en' 
                        ? 'Perfect for startups, agencies, and businesses looking for expert assistance on specific projects or ongoing support.'
                        : 'Sempurna untuk startup, agensi, dan bisnis yang mencari bantuan ahli untuk proyek spesifik atau dukungan berkelanjutan.'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Section */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {language === 'en' ? 'Services' : 'Layanan'}
                </h3>
                <div className={`w-24 h-1 bg-gradient-to-r ${currentTab.gradient} mx-auto rounded-full`} />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
                {currentServices.map((service, index) => (
                  <AnimatedCard
                    key={service.id}
                    delay={index * 0.1}
                    className="group h-full"
                  >
                    <motion.div
                      className="relative h-full bg-white dark:bg-gray-800 rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                      whileHover={{ 
                        y: -8,
                        rotateX: 5,
                        rotateY: 5,
                        scale: 1.02,
                        boxShadow: "0 25px 60px rgba(0, 0, 0, 0.15), 0 5px 20px rgba(0, 0, 0, 0.1)"
                      }}
                      transition={{ 
                        duration: 0.4, 
                        ease: "easeOut",
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                      }}
                    >
                      {/* Gradient Background on Hover */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                      
                      {/* Icon */}
                      <div className="relative z-10 text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                        {service.icon}
                      </div>

                      {/* Title */}
                      <h3 className="relative z-10 text-xl font-bold text-gray-900 dark:text-white mb-4">
                        {language === 'en' ? service.titleEn : service.titleId}
                      </h3>

                      {/* Description */}
                      <p className="relative z-10 text-gray-600 dark:text-gray-300 mb-6">
                        {language === 'en' ? service.descriptionEn : service.descriptionId}
                      </p>

                      {/* Features */}
                      <div className="relative z-10 space-y-3">
                        {(language === 'en' ? service.features.en : service.features.id).slice(0, 3).map((feature, idx) => (
                          <motion.div
                            key={idx}
                            className="flex items-center text-sm text-gray-500 dark:text-gray-400"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: (index * 0.1) + (idx * 0.05) }}
                          >
                            <div className={`w-2 h-2 bg-gradient-to-r ${service.gradient} rounded-full mr-3 group-hover:scale-125 transition-transform duration-300`} />
                            {feature}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatedCard>
                ))}
              </div>
            </div>

            {/* Skills Section */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {language === 'en' ? 'Skills' : 'Keahlian'}
                </h3>
                <div className={`w-24 h-1 bg-gradient-to-r ${currentTab.gradient} mx-auto rounded-full`} />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {currentTab.skills.map((skill, index) => (
                  <AnimatedCard
                    key={skill.name}
                    delay={index * 0.1}
                    className="group"
                  >
                    <motion.div
                      className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-xl border border-gray-200 dark:border-gray-700 h-full hover:shadow-2xl"
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Skill Header */}
                      <div className="flex items-center mb-4">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mr-4 group-hover:scale-110 transition-transform duration-300"
                          style={{ backgroundColor: `${skill.color}20` }}
                        >
                          {skill.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                            {language === 'en' ? skill.name : skill.nameId}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {language === 'en' ? skill.description : skill.descriptionId}
                          </p>
                        </div>
                      </div>

                      {/* Skill Level */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            {language === 'en' ? 'Proficiency' : 'Kemahiran'}
                          </span>
                          <span className="text-sm font-bold text-gray-900 dark:text-white">
                            {skill.level}%
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                          <motion.div
                            className="h-3 rounded-full"
                            style={{ 
                              background: `linear-gradient(90deg, ${skill.color}, ${skill.color}dd)`
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ 
                              duration: 1.5, 
                              delay: index * 0.15,
                              ease: "anticipate",
                              type: "spring",
                              stiffness: 100,
                              damping: 15
                            }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  </AnimatedCard>
                ))}
              </div>
            </div>

            {/* Showcase Section with Carousel */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {activeTab === 'uiux' 
                    ? (language === 'en' ? 'Design Showcase' : 'Showcase Desain')
                    : (language === 'en' ? 'Portfolio Showcase' : 'Showcase Portofolio')
                  }
                </h3>
                <div className={`w-24 h-1 bg-gradient-to-r ${currentTab.gradient} mx-auto rounded-full`} />
              </div>
              
              {/* Integrated Showcase */}
              {activeTab === 'uiux' ? (
                <DesignShowcase />
              ) : (
                <Projects />
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// Enhanced DesignShowcase Component with Modal Gallery
const DesignShowcase: React.FC = () => {
  const { language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openModal = (project: any) => {
    setSelectedProject(project);
    setSelectedImageIndex(0);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setSelectedImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject && selectedProject.images) {
      setSelectedImageIndex((prev) => 
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject && selectedProject.images) {
      setSelectedImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <>
      {/* Enhanced Grid Layout with Better Visual Hierarchy */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {designProjects.map((project, index) => (
          <motion.div
            key={project.id}
            className="group cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -8 }}
            onClick={() => openModal(project)}
          >
            {/* Modern Card Design with Improved UX */}
            <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700">
              {/* Enhanced Image Container */}
              <div className="relative h-64 overflow-hidden">
                <motion.img 
                  src={project.image} 
                  alt={project.titleEn}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/assets/placeholder-design.svg';
                  }}
                />
                
                {/* Improved Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                
                {/* Enhanced Hover Actions */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="bg-white/20 backdrop-blur-md rounded-full p-3 border border-white/30"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Eye className="w-5 h-5 text-white" />
                    </motion.div>
                    <motion.span
                      className="text-white font-medium text-sm bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {language === 'en' ? 'View Gallery' : 'Lihat Galeri'}
                    </motion.span>
                  </div>
                </div>
                
                {/* Modern Category Badge */}
                <div className="absolute top-4 left-4">
                  <motion.span
                    className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold rounded-full backdrop-blur-sm shadow-lg border border-white/20"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                    {project.category}
                  </motion.span>
                </div>
                
                {/* Quality Indicator */}
                <div className="absolute top-4 right-4">
                  <motion.div
                    className="bg-white/20 backdrop-blur-md rounded-full p-2 border border-white/30"
                    whileHover={{ scale: 1.1, rotate: 180 }}
                  >
                    <ExternalLink className="w-4 h-4 text-white" />
                  </motion.div>
                </div>
              </div>
              
              {/* Enhanced Project Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <motion.h3 
                    className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300 line-clamp-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {language === 'en' ? project.titleEn : project.titleId}
                  </motion.h3>
                  
                  <motion.div
                    className="flex items-center text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {project.year}
                  </motion.div>
                </div>
                
                <motion.p 
                  className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {language === 'en' ? project.descriptionEn : project.descriptionId}
                </motion.p>
                
                {/* Enhanced Tools Section */}
                <motion.div 
                  className="flex flex-wrap gap-2 mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {project.tools.slice(0, 2).map((tool: string, toolIndex: number) => (
                    <motion.span
                      key={tool}
                      className="inline-flex items-center px-2.5 py-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium border border-purple-200 dark:border-purple-700"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6 + toolIndex * 0.1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2" />
                      {tool}
                    </motion.span>
                  ))}
                  {project.tools.length > 2 && (
                    <motion.span
                      className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium border border-gray-200 dark:border-gray-600"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      +{project.tools.length - 2}
                    </motion.span>
                  )}
                </motion.div>
                
                {/* Interactive Bottom Section */}
                <motion.div
                  className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {language === 'en' ? 'Click to view gallery' : 'Klik untuk melihat galeri'}
                  </span>
                  <motion.div
                    className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center opacity-70 group-hover:opacity-100"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Eye className="w-3 h-3 text-white" />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Enhanced Modal for Design Showcase */}
      <StandardModal
        isOpen={!!selectedProject}
        onClose={closeModal}
        title={selectedProject ? (language === 'en' ? selectedProject.titleEn : selectedProject.titleId) : ''}
        maxWidth="2xl"
        className="overflow-hidden"
      >
        {selectedProject && (
          <>
            <div className="mb-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-full">
                    {selectedProject.category}
                  </span>
                  <span className="text-gray-600 dark:text-gray-300 text-sm">{selectedProject.year}</span>
                  <span className="text-gray-600 dark:text-gray-300 text-sm">
                    {selectedImageIndex + 1} / {selectedProject.images?.length || 1}
                  </span>
                </div>
                
                {selectedProject.client && (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-medium">{language === 'en' ? 'Client: ' : 'Klien: '}</span>
                    {selectedProject.client}
                  </span>
                )}
              </div>
              
              {selectedProject.colors && (
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {language === 'en' ? 'Color Palette:' : 'Palet Warna:'}
                  </span>
                  <div className="flex space-x-2">
                    {selectedProject.colors.slice(0, 5).map((color: string, i: number) => (
                      <motion.div 
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-600 shadow-md cursor-pointer"
                        style={{ backgroundColor: color }}
                        whileHover={{ scale: 1.2, y: -2 }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative bg-gray-50 dark:bg-gray-800 rounded-xl mb-6 overflow-hidden">
              <div className="relative h-96 flex items-center justify-center">
                <motion.img
                  key={selectedImageIndex}
                  src={selectedProject.images?.[selectedImageIndex] || selectedProject.image}
                  alt={`${selectedProject.titleEn} - ${selectedImageIndex + 1}`}
                  className="max-w-full max-h-full object-contain"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                />

                {selectedProject.images && selectedProject.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-800 dark:text-white hover:bg-white dark:hover:bg-gray-700 transition-all rounded-full shadow-lg border border-gray-200 dark:border-gray-600"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-800 dark:text-white hover:bg-white dark:hover:bg-gray-700 transition-all rounded-full shadow-lg border border-gray-200 dark:border-gray-600"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {selectedProject.images && selectedProject.images.length > 1 && (
                <div className="p-4 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm">
                  <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
                    {selectedProject.images.map((image: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                          index === selectedImageIndex
                            ? 'border-purple-500 shadow-lg scale-105'
                            : 'border-gray-300 dark:border-gray-600 hover:border-purple-300 hover:scale-105'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {language === 'en' ? selectedProject.descriptionEn : selectedProject.descriptionId}
              </p>
              
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
                  {language === 'en' ? 'Tools:' : 'Tools:'}
                </span>
                {selectedProject.tools.map((tool: string) => (
                  <span
                    key={tool}
                    className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 text-sm rounded-full border border-purple-200 dark:border-purple-700"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
      </StandardModal>
    </>
  );
};