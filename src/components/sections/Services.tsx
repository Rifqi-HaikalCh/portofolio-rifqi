"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../../context/LanguageContext';
import { AnimatedSectionTitle } from '../shared/AnimatedSectionTitle';
import { AnimatedCard } from '../shared/AnimatedCard';
import { InteractiveButton } from '../shared/InteractiveButton';
import StandardModal from '../shared/StandardModal';
import { Code, Palette, Layers, ChevronLeft, ChevronRight, X, ArrowRight, Sparkles, Eye, ExternalLink } from 'lucide-react';
import { Projects } from './Projects';

// Create motion-wrapped Image component for animations
const MotionImage = motion(Image);

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
      '/assets/Assets Manajemen Web Design-08.png',
      '/assets/Assets Manajemen Web Design-09.png',
      '/assets/Assets Manajemen Web Design-10.png'
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
      '/assets/Campuss Website Design-3.png',
      '/assets/Campuss Website Design-4.png',
      '/assets/Campuss Website Design-5.png',
      '/assets/Campuss Website Design-6.png',
      '/assets/Campuss Website Design-7.png',
      '/assets/Campuss Website Design-8.png',
      '/assets/Campuss Website Design-9.png'
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
      '/assets/Gordenaise Website Design-04.png',
      '/assets/Gordenaise Website Design-05.png',
      '/assets/Gordenaise Website Design-06.png',
      '/assets/Gordenaise Website Design-07.png',
      '/assets/Gordenaise Website Design-08.png',
      '/assets/Gordenaise Website Design-09.png',
      '/assets/Gordenaise Website Design-10.png'
    ],
    colors: ['#a855f7', '#ec4899', '#06b6d4'],
    tools: ['Figma', 'Adobe XD', 'Photoshop'],
    year: '2024',
    category: 'E-commerce Design',
    client: 'Gordenaise Home Decor'
  }
];

// Skills data integrated from UiUxSkills
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
  // Programming Languages
  {
    name: 'HTML5',
    nameId: 'HTML5',
    icon: '🌐',
    level: 100,
    color: '#E34F26',
    description: 'Semantic markup and modern web standards',
    descriptionId: 'Markup semantik dan standar web modern',
    category: 'Programming Languages'
  },
  {
    name: 'CSS3',
    nameId: 'CSS3',
    icon: '🎨',
    level: 100,
    color: '#1572B6',
    description: 'Advanced styling and responsive design',
    descriptionId: 'Styling canggih dan desain responsif',
    category: 'Programming Languages'
  },
  {
    name: 'JavaScript',
    nameId: 'JavaScript',
    icon: '⚡',
    level: 95,
    color: '#F7DF1E',
    description: 'Modern ES6+ and dynamic programming',
    descriptionId: 'ES6+ modern dan pemrograman dinamis',
    category: 'Programming Languages'
  },
  {
    name: 'TypeScript',
    nameId: 'TypeScript',
    icon: '📘',
    level: 90,
    color: '#3178C6',
    description: 'Type-safe JavaScript development',
    descriptionId: 'Pengembangan JavaScript yang type-safe',
    category: 'Programming Languages'
  },
  {
    name: 'Java',
    nameId: 'Java',
    icon: '☕',
    level: 75,
    color: '#ED8B00',
    description: 'Enterprise application development',
    descriptionId: 'Pengembangan aplikasi enterprise',
    category: 'Programming Languages'
  },
  {
    name: 'PHP',
    nameId: 'PHP',
    icon: '🐘',
    level: 70,
    color: '#777BB4',
    description: 'Server-side web development',
    descriptionId: 'Pengembangan web server-side',
    category: 'Programming Languages'
  },
  {
    name: 'Dart',
    nameId: 'Dart',
    icon: '🎯',
    level: 80,
    color: '#0175C2',
    description: 'Flutter and cross-platform development',
    descriptionId: 'Flutter dan pengembangan cross-platform',
    category: 'Programming Languages'
  },
  // Frontend Development
  {
    name: 'React.js',
    nameId: 'React.js',
    icon: '⚛️',
    level: 90,
    color: '#61DAFB',
    description: 'Modern component-based development',
    descriptionId: 'Pengembangan berbasis komponen modern',
    category: 'Frontend Development'
  },
  {
    name: 'Angular',
    nameId: 'Angular',
    icon: '🅰️',
    level: 90,
    color: '#DD0031',
    description: 'Full-featured frontend framework',
    descriptionId: 'Framework frontend berfitur lengkap',
    category: 'Frontend Development'
  },
  {
    name: 'AngularJS',
    nameId: 'AngularJS',
    icon: '🔺',
    level: 80,
    color: '#E23237',
    description: 'Legacy Angular framework',
    descriptionId: 'Framework Angular legacy',
    category: 'Frontend Development'
  },
  {
    name: 'Vue.js',
    nameId: 'Vue.js',
    icon: '💚',
    level: 80,
    color: '#4FC08D',
    description: 'Progressive JavaScript framework',
    descriptionId: 'Framework JavaScript progresif',
    category: 'Frontend Development'
  },
  {
    name: 'State Management',
    nameId: 'State Management',
    icon: '🗄️',
    level: 80,
    color: '#764ABC',
    description: 'Redux / Vuex state management',
    descriptionId: 'Manajemen state Redux / Vuex',
    category: 'Frontend Development'
  },
  {
    name: 'Tailwind CSS',
    nameId: 'Tailwind CSS',
    icon: '🌊',
    level: 100,
    color: '#06B6D4',
    description: 'Utility-first CSS framework',
    descriptionId: 'Framework CSS utility-first',
    category: 'Frontend Development'
  },
  {
    name: 'Bootstrap',
    nameId: 'Bootstrap',
    icon: '📱',
    level: 100,
    color: '#7952B3',
    description: 'Popular CSS framework',
    descriptionId: 'Framework CSS populer',
    category: 'Frontend Development'
  },
  {
    name: 'Responsive Design',
    nameId: 'Desain Responsif',
    icon: '📱',
    level: 90,
    color: '#10B981',
    description: 'Multi-device optimization',
    descriptionId: 'Optimisasi multi-perangkat',
    category: 'Frontend Development'
  },
  // Backend Development
  {
    name: 'Node.js',
    nameId: 'Node.js',
    icon: '🟢',
    level: 80,
    color: '#339933',
    description: 'Server-side JavaScript runtime',
    descriptionId: 'Runtime JavaScript server-side',
    category: 'Backend Development'
  },
  {
    name: 'Express.js',
    nameId: 'Express.js',
    icon: '🚂',
    level: 80,
    color: '#000000',
    description: 'Minimalist web framework for Node.js',
    descriptionId: 'Framework web minimalis untuk Node.js',
    category: 'Backend Development'
  },
  {
    name: 'Spring Boot',
    nameId: 'Spring Boot',
    icon: '🍃',
    level: 70,
    color: '#6DB33F',
    description: 'Java-based enterprise framework',
    descriptionId: 'Framework enterprise berbasis Java',
    category: 'Backend Development'
  },
  {
    name: 'Laravel',
    nameId: 'Laravel',
    icon: '🎼',
    level: 75,
    color: '#FF2D20',
    description: 'PHP web application framework',
    descriptionId: 'Framework aplikasi web PHP',
    category: 'Backend Development'
  },
  {
    name: 'RESTful API',
    nameId: 'RESTful API',
    icon: '🔗',
    level: 90,
    color: '#FF6B35',
    description: 'RESTful API design and development',
    descriptionId: 'Desain dan pengembangan RESTful API',
    category: 'Backend Development'
  }
];

// UI/UX Design Skills
const designSkills: Skill[] = [
  // Software & Tools
  {
    name: 'Figma',
    nameId: 'Figma',
    icon: '🎨',
    level: 100,
    color: '#F24E1E',
    description: 'Advanced interface design and prototyping',
    descriptionId: 'Desain antarmuka lanjutan dan prototyping',
    category: 'Software & Tools'
  },
  {
    name: 'Adobe Creative Suite',
    nameId: 'Adobe Creative Suite',
    icon: '🖼️',
    level: 80,
    color: '#FF0000',
    description: 'XD, Photoshop, Illustrator mastery',
    descriptionId: 'Penguasaan XD, Photoshop, Illustrator',
    category: 'Software & Tools'
  },
  {
    name: 'Sketch',
    nameId: 'Sketch',
    icon: '💎',
    level: 80,
    color: '#FDB300',
    description: 'Digital design and prototyping',
    descriptionId: 'Desain digital dan prototyping',
    category: 'Software & Tools'
  },
  {
    name: 'InVision',
    nameId: 'InVision',
    icon: '🔗',
    level: 90,
    color: '#FF3366',
    description: 'Collaborative design and prototyping',
    descriptionId: 'Desain kolaboratif dan prototyping',
    category: 'Software & Tools'
  },
  {
    name: 'Webflow',
    nameId: 'Webflow',
    icon: '🌊',
    level: 100,
    color: '#4353FF',
    description: 'No-code web design and development',
    descriptionId: 'Desain dan pengembangan web no-code',
    category: 'Software & Tools'
  },
  {
    name: 'Balsamiq',
    nameId: 'Balsamiq',
    icon: '📝',
    level: 60,
    color: '#CC0000',
    description: 'Low-fidelity wireframing',
    descriptionId: 'Wireframing fidelitas rendah',
    category: 'Software & Tools'
  },
  {
    name: 'Miro/Mural',
    nameId: 'Miro/Mural',
    icon: '🗺️',
    level: 70,
    color: '#050038',
    description: 'Collaborative visual workspace',
    descriptionId: 'Workspace visual kolaboratif',
    category: 'Software & Tools'
  },
  // Hard Skills
  {
    name: 'Wireframing',
    nameId: 'Wireframing',
    icon: '📐',
    level: 90,
    color: '#6B7280',
    description: 'Creating low-fidelity design blueprints',
    descriptionId: 'Membuat blueprint desain fidelitas rendah',
    category: 'Hard Skills'
  },
  {
    name: 'Mockup Design',
    nameId: 'Desain Mockup',
    icon: '🖼️',
    level: 100,
    color: '#8B5CF6',
    description: 'High-fidelity visual design',
    descriptionId: 'Desain visual fidelitas tinggi',
    category: 'Hard Skills'
  },
  {
    name: 'Prototyping',
    nameId: 'Prototyping',
    icon: '⚡',
    level: 100,
    color: '#F59E0B',
    description: 'Interactive and high-fidelity prototypes',
    descriptionId: 'Prototype interaktif dan fidelitas tinggi',
    category: 'Hard Skills'
  },
  {
    name: 'User Flow',
    nameId: 'User Flow',
    icon: '🔄',
    level: 100,
    color: '#10B981',
    description: 'Mapping user journey and interactions',
    descriptionId: 'Memetakan perjalanan dan interaksi pengguna',
    category: 'Hard Skills'
  },
  {
    name: 'Journey Mapping',
    nameId: 'Journey Mapping',
    icon: '🗺️',
    level: 100,
    color: '#06B6D4',
    description: 'Visualizing end-to-end user experience',
    descriptionId: 'Memvisualisasikan pengalaman pengguna end-to-end',
    category: 'Hard Skills'
  },
  // Riset & Analisis
  {
    name: 'User Research',
    nameId: 'Riset Pengguna',
    icon: '🔍',
    level: 90,
    color: '#8B5CF6',
    description: 'Understanding user needs and behaviors',
    descriptionId: 'Memahami kebutuhan dan perilaku pengguna',
    category: 'Riset & Analisis'
  },
  {
    name: 'User Persona Creation',
    nameId: 'Pembuatan Persona Pengguna',
    icon: '👤',
    level: 100,
    color: '#EC4899',
    description: 'Creating detailed user personas',
    descriptionId: 'Membuat persona pengguna yang detail',
    category: 'Riset & Analisis'
  },
  {
    name: 'Competitor Analysis',
    nameId: 'Analisis Kompetitor',
    icon: '📊',
    level: 95,
    color: '#F97316',
    description: 'Analyzing competitive landscape',
    descriptionId: 'Menganalisis lanskap kompetitif',
    category: 'Riset & Analisis'
  },
  // Visual & Interaksi
  {
    name: 'Color Theory & Typography',
    nameId: 'Teori Warna & Tipografi',
    icon: '🎨',
    level: 100,
    color: '#EF4444',
    description: 'Visual design principles and aesthetics',
    descriptionId: 'Prinsip desain visual dan estetika',
    category: 'Visual & Interaksi'
  },
  {
    name: 'Interaction Design',
    nameId: 'Interaction Design',
    icon: '✨',
    level: 100,
    color: '#8B5CF6',
    description: 'Creating engaging user interactions',
    descriptionId: 'Membuat interaksi pengguna yang menarik',
    category: 'Visual & Interaksi'
  },
  {
    name: 'Responsive Design',
    nameId: 'Desain Responsif',
    icon: '📱',
    level: 100,
    color: '#10B981',
    description: 'Multi-device design optimization',
    descriptionId: 'Optimisasi desain multi-perangkat',
    category: 'Visual & Interaksi'
  },
  {
    name: 'UX Writing',
    nameId: 'UX Writing',
    icon: '✍️',
    level: 80,
    color: '#F59E0B',
    description: 'Microcopy and content strategy',
    descriptionId: 'Microcopy dan strategi konten',
    category: 'Visual & Interaksi'
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
      className="py-20 relative overflow-hidden"
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

        {/* Enhanced Mobile-First Tab Navigation */}
        <motion.div 
          className="mb-8 sm:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Mobile: Clean Title-Only Tab Design */}
          <div className="block sm:hidden mb-6">
            <div className="px-4">
              {/* Mobile Tab Buttons - Vertical Stack */}
              <div className="space-y-3">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  const isActive = activeTab === tab.id;
                  
                  return (
                    <motion.button
                      key={tab.id}
                      className={`relative w-full p-4 rounded-xl transition-all duration-300 text-left ${
                        isActive
                          ? `bg-gradient-to-r ${tab.gradient} text-white shadow-lg`
                          : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-50/80 dark:hover:bg-gray-700/80'
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                      whileTap={{ scale: 0.98 }}
                      whileHover={{ 
                        scale: isActive ? 1 : 1.02,
                        y: isActive ? 0 : -2 
                      }}
                    >
                      {isActive && (
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-r ${tab.gradient} rounded-xl`}
                          layoutId="activeMobileTab"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      
                      <div className="relative z-10 flex items-center space-x-4">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: isActive ? [0, -5, 5, 0] : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <IconComponent className={`w-6 h-6 ${isActive ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`} />
                        </motion.div>
                        <div className="flex-1">
                          <h3 className={`text-lg font-bold ${isActive ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                            {language === 'en' ? tab.labelEn : tab.labelId}
                          </h3>
                        </div>
                        {/* Active indicator */}
                        {isActive && (
                          <motion.div
                            className="w-2 h-2 bg-white/80 rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                          />
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Desktop: Professional Tab Navigation with Descriptions */}
          <div className="hidden sm:flex justify-center">
            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md p-2 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 inline-flex">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <motion.button
                    key={tab.id}
                    className={`relative px-5 md:px-6 lg:px-8 py-4 md:py-5 rounded-xl font-semibold text-sm md:text-base flex items-center space-x-3 md:space-x-4 transition-all duration-300 min-w-[160px] md:min-w-[200px] lg:min-w-[240px] justify-start group ${
                      isActive
                        ? `bg-gradient-to-r ${tab.gradient} text-white shadow-xl`
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50/80 dark:hover:bg-gray-700/80'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                    whileHover={{ 
                      scale: 1.02,
                      y: -2,
                      boxShadow: isActive 
                        ? "0 25px 50px rgba(139, 92, 246, 0.25), 0 0 30px rgba(139, 92, 246, 0.15)"
                        : "0 15px 30px rgba(0, 0, 0, 0.1)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Enhanced sliding indicator */}
                    {isActive && (
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${tab.gradient} rounded-xl shadow-xl`}
                        layoutId="activeDesktopTab"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.7 }}
                      />
                    )}

                    {/* Content */}
                    <div className="relative z-10 flex items-center space-x-3 md:space-x-4">
                      <motion.div
                        whileHover={{ 
                          rotate: isActive ? [0, -8, 8, 0] : [0, -4, 4, 0],
                          scale: 1.15 
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        <IconComponent className="w-6 h-6 md:w-7 md:h-7 flex-shrink-0" />
                      </motion.div>
                      <div className="text-left">
                        <div className="font-bold text-base md:text-lg leading-tight">
                          {language === 'en' ? tab.labelEn : tab.labelId}
                        </div>
                        <div className={`text-xs md:text-sm leading-tight mt-1 ${isActive ? 'text-white/85' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'}`}>
                          {language === 'en' ? tab.descriptionEn : tab.descriptionId}
                        </div>
                      </div>
                    </div>

                    {/* Premium border highlight */}
                    <div className={`absolute inset-0 rounded-xl border transition-all duration-300 ${
                      isActive 
                        ? 'border-white/20' 
                        : 'border-transparent group-hover:border-gray-200/40 dark:group-hover:border-gray-600/40'
                    }`} />
                  </motion.button>
                );
              })}
            </div>
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
              
              <motion.div 
                className="group bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-xl relative overflow-hidden transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -5,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15), 0 0 30px rgba(59, 130, 246, 0.1)"
                }}
              >
                <div className="text-center mb-8">
                  <p className="text-gray-600 dark:text-gray-300 text-base lg:text-lg max-w-3xl mx-auto px-4 lg:px-0">
                    {language === 'en' 
                      ? 'I am actively seeking new opportunities and ready to contribute to exciting projects. Whether you need a dedicated team member or a skilled freelancer, I\'m here to help bring your vision to life.'
                      : 'Saya secara aktif mencari peluang baru dan siap berkontribusi pada proyek yang menarik. Apakah Anda membutuhkan anggota tim yang berdedikasi atau freelancer yang terampil, saya di sini untuk membantu mewujudkan visi Anda.'
                    }
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8">
                  {/* Full-time */}
                  <motion.div 
                    className="group bg-transparent rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-gray-200 dark:border-gray-700 shadow-lg relative overflow-hidden transition-all duration-300 hover:shadow-2xl min-h-[200px]"
                    whileHover={{ 
                      y: -8, 
                      scale: 1.03,
                      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)"
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    {/* Background glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10 flex items-center mb-4">
                      <motion.span 
                        className="text-3xl mr-3"
                        whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        💼
                      </motion.span>
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
                  </motion.div>

                  {/* Freelance */}
                  <motion.div 
                    className="group bg-transparent rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-gray-200 dark:border-gray-700 shadow-lg relative overflow-hidden transition-all duration-300 hover:shadow-2xl min-h-[200px]"
                    whileHover={{ 
                      y: -8, 
                      scale: 1.03,
                      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)"
                    }}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    {/* Background glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10 flex items-center mb-4">
                      <motion.span 
                        className="text-3xl mr-3"
                        whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        🚀
                      </motion.span>
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
                  </motion.div>
                </div>
                
                {/* Subtle background animation */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-emerald-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </div>

            {/* Services Section */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  {language === 'en' ? 'Services' : 'Layanan'}
                </h3>
                <div className={`w-24 h-1 bg-gradient-to-r ${currentTab.gradient} mx-auto rounded-full`} />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {currentServices.map((service, index) => (
                  <AnimatedCard
                    key={service.id}
                    delay={index * 0.1}
                    className="group h-full"
                  >
                    <motion.div
                      className="relative h-full bg-transparent rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden min-h-[220px] sm:min-h-[250px] lg:min-h-[280px]"
                      whileHover={{ 
                        y: -6,
                        scale: 1.02,
                        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12), 0 5px 15px rgba(0, 0, 0, 0.08)"
                      }}
                      transition={{ 
                        duration: 0.3, 
                        ease: "easeOut",
                        type: "spring",
                        stiffness: 300,
                        damping: 25
                      }}
                    >
                      {/* Gradient Background on Hover */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                      
                      {/* Icon */}
                      <div className="relative z-10 text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-300">
                        {service.icon}
                      </div>

                      {/* Title - Proportional Hierarchy */}
                      <h3 className="relative z-10 text-xl sm:text-2xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 leading-tight">
                        {language === 'en' ? service.titleEn : service.titleId}
                      </h3>

                      {/* Description - Proportional to Title */}
                      <p className="relative z-10 text-base sm:text-lg lg:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                        {language === 'en' ? service.descriptionEn : service.descriptionId}
                      </p>

                      {/* Features - Proper Supporting Text Size */}
                      <div className="relative z-10 space-y-2 sm:space-y-3">
                        {(language === 'en' ? service.features.en : service.features.id).slice(0, 3).map((feature, idx) => (
                          <motion.div
                            key={idx}
                            className="flex items-start text-sm sm:text-base lg:text-base text-gray-500 dark:text-gray-400"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: (index * 0.1) + (idx * 0.05) }}
                          >
                            <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gradient-to-r ${service.gradient} rounded-full mr-3 sm:mr-3 mt-2 sm:mt-2 group-hover:scale-125 transition-transform duration-300 flex-shrink-0`} />
                            <span className="leading-relaxed">{feature}</span>
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
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  {language === 'en' ? 'Skills' : 'Keahlian'}
                </h3>
                <div className={`w-24 h-1 bg-gradient-to-r ${currentTab.gradient} mx-auto rounded-full`} />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                {currentTab.skills.map((skill, index) => (
                  <AnimatedCard
                    key={skill.name}
                    delay={index * 0.1}
                    className="group"
                  >
                    <motion.div
                      className="bg-transparent rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-xl border border-gray-200 dark:border-gray-700 h-full hover:shadow-2xl min-h-[180px] sm:min-h-[200px]"
                      whileHover={{ y: -4, scale: 1.02 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        {/* Skill Header */}
                        <div className="flex items-start mb-3 sm:mb-4">
                          <div 
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center text-lg sm:text-2xl mr-3 sm:mr-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0"
                            style={{ backgroundColor: `${skill.color}20` }}
                          >
                            {skill.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-lg sm:text-xl lg:text-xl leading-tight">
                              {language === 'en' ? skill.name : skill.nameId}
                            </h4>
                            <p className="text-sm sm:text-base lg:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                              {language === 'en' ? skill.description : skill.descriptionId}
                            </p>
                          </div>
                        </div>

                        {/* Skill Level - Proportional Text */}
                        <div className="space-y-2 sm:space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm sm:text-base lg:text-base font-medium text-gray-600 dark:text-gray-300">
                              {language === 'en' ? 'Proficiency' : 'Kemahiran'}
                            </span>
                            <span className="text-sm sm:text-base lg:text-base font-bold text-gray-900 dark:text-white">
                              {skill.level}%
                            </span>
                          </div>

                          {/* Progress Bar */}
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-3 overflow-hidden">
                            <motion.div
                              className="h-2 sm:h-3 rounded-full"
                              style={{ 
                                background: `linear-gradient(90deg, ${skill.color}, ${skill.color}dd)`
                              }}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              transition={{ 
                                duration: 1.2, 
                                delay: index * 0.1,
                                ease: "easeOut",
                                type: "spring",
                                stiffness: 120,
                                damping: 20
                              }}
                              viewport={{ once: true, amount: 0.3 }}
                            />
                          </div>
                        </div>
                    </motion.div>
                  </AnimatedCard>
                ))}
              </div>
            </div>

            {/* Responsive Showcase Section */}
            <div className="space-y-6 sm:space-y-8">
              {/* Only show enhanced header for UI/UX tab to avoid duplication */}
              {activeTab === 'uiux' && (
                <motion.div 
                  className="text-center mb-8 sm:mb-12 lg:mb-16 px-4 sm:px-0"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                  viewport={{ once: true }}
                >
                  {/* Responsive Badge - Proportional Sizing */}
                  <motion.div 
                    className="inline-flex items-center gap-3 sm:gap-3 px-5 sm:px-6 py-3 sm:py-3 bg-gradient-to-r from-emerald-100 via-blue-100 to-purple-100 dark:from-emerald-900/30 dark:via-blue-900/30 dark:to-purple-900/30 rounded-full mb-6 sm:mb-8 shadow-lg backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-700/50"
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Palette className="w-5 h-5 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-emerald-600 dark:text-emerald-400" />
                    </motion.div>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm sm:text-sm tracking-wider uppercase">
                      {language === 'en' ? 'Design Showcase' : 'Showcase Desain'}
                    </span>
                  </motion.div>

                  {/* Responsive Title */}
                  <motion.h2 
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-4 sm:mb-6 leading-tight relative section-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <span className="relative inline-block">
                      <span className="bg-gradient-to-r from-emerald-600 via-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-bg bg-[length:400%_400%] drop-shadow-2xl">
                        {language === 'en' ? 'Creative Design Portfolio' : 'Portofolio Desain Kreatif'}
                      </span>
                      
                      {/* Glow effect */}
                      <span 
                        className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent blur-sm opacity-50 animate-gradient-bg bg-[length:400%_400%]"
                        aria-hidden="true"
                      >
                        {language === 'en' ? 'Creative Design Portfolio' : 'Portofolio Desain Kreatif'}
                      </span>
                      
                      {/* Shimmer overlay */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0"
                        animate={{
                          x: ['-100%', '100%'],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                          delay: 1
                        }}
                      />
                    </span>
                  </motion.h2>
                  
                  {/* Responsive Description */}
                  <motion.p 
                    className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-base sm:text-lg lg:text-xl leading-relaxed px-4 sm:px-0"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    {language === 'en' 
                      ? 'Explore my creative design journey through innovative UI/UX solutions and visual design masterpieces'
                      : 'Jelajahi perjalanan desain kreatif saya melalui solusi UI/UX inovatif dan karya desain visual yang memukau'
                    }
                  </motion.p>
                </motion.div>
              )}
              
              {/* Integrated Showcase - Responsive Container */}
              <div className="px-4 sm:px-0">
                {activeTab === 'uiux' ? (
                  <DesignShowcase />
                ) : (
                  <Projects />
                )}
              </div>
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
            <div className="relative overflow-hidden rounded-2xl bg-transparent shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700">
              {/* Enhanced Image Container */}
              <div className="relative h-64 overflow-hidden">
                <MotionImage
                  src={project.image}
                  alt={project.titleEn}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  className="transition-all duration-700 group-hover:scale-110"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
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
            {/* Responsive Meta Information */}
            <div className="mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs sm:text-sm font-semibold rounded-full">
                    {selectedProject.category}
                  </span>
                  <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">{selectedProject.year}</span>
                  <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                    {selectedImageIndex + 1} / {selectedProject.images?.length || 1}
                  </span>
                </div>
                
                {selectedProject.client && (
                  <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-medium">{language === 'en' ? 'Client: ' : 'Klien: '}</span>
                    {selectedProject.client}
                  </span>
                )}
              </div>
              
              {selectedProject.colors && (
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                    {language === 'en' ? 'Color Palette:' : 'Palet Warna:'}
                  </span>
                  <div className="flex space-x-1.5 sm:space-x-2">
                    {selectedProject.colors.slice(0, 5).map((color: string, i: number) => (
                      <motion.div 
                        key={i}
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white dark:border-gray-600 shadow-md cursor-pointer"
                        style={{ backgroundColor: color }}
                        whileHover={{ scale: 1.2, y: -2 }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Responsive Image Gallery */}
            <div className="relative bg-gray-50 dark:bg-gray-800 rounded-lg sm:rounded-xl mb-4 sm:mb-6 overflow-hidden">
              <div className="relative h-64 sm:h-80 lg:h-96 flex items-center justify-center">
                <MotionImage
                  key={selectedImageIndex}
                  src={selectedProject.images?.[selectedImageIndex] || selectedProject.image}
                  alt={`${selectedProject.titleEn} - ${selectedImageIndex + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 900px"
                  style={{ objectFit: 'contain' }}
                  className="rounded-lg"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                />

                {selectedProject.images && selectedProject.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-800 dark:text-white hover:bg-white dark:hover:bg-gray-700 transition-all rounded-full shadow-lg border border-gray-200 dark:border-gray-600"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-800 dark:text-white hover:bg-white dark:hover:bg-gray-700 transition-all rounded-full shadow-lg border border-gray-200 dark:border-gray-600"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Responsive Thumbnail Gallery */}
              {selectedProject.images && selectedProject.images.length > 1 && (
                <div className="p-2 sm:p-4 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm">
                  <div className="flex space-x-1.5 sm:space-x-2 overflow-x-auto scrollbar-hide pb-2">
                    {selectedProject.images.map((image: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`relative flex-shrink-0 w-12 h-9 sm:w-16 sm:h-12 rounded-md sm:rounded-lg overflow-hidden border-2 transition-all ${
                          index === selectedImageIndex
                            ? 'border-purple-500 shadow-lg scale-105'
                            : 'border-gray-300 dark:border-gray-600 hover:border-purple-300 hover:scale-105'
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          sizes="64px"
                          style={{ objectFit: 'cover' }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Responsive Description Section */}
            <div className="space-y-3 sm:space-y-4">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                {language === 'en' ? selectedProject.descriptionEn : selectedProject.descriptionId}
              </p>
              
              {/* Responsive Tools Section */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 flex-shrink-0">
                  {language === 'en' ? 'Tools:' : 'Tools:'}
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {selectedProject.tools.map((tool: string) => (
                    <span
                      key={tool}
                      className="px-2 sm:px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 text-xs sm:text-sm rounded-full border border-purple-200 dark:border-purple-700"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </StandardModal>
    </>
  );
};