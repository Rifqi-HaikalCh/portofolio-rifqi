"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useRole } from '../../context/RoleContext';
import { AnimatedSectionTitle } from '../shared/AnimatedSectionTitle';
import { AnimatedCard } from '../shared/AnimatedCard';

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

export function Services() {
  const { language } = useLanguage();

  // Show all services by default since we removed role selection
  const getServices = (): Service[] => {
    return [...uiuxServices.slice(0, 3), ...developerServices.slice(0, 3), ...fullstackServices.slice(0, 3)];
  };

  const services = getServices();

  const getRoleTitle = () => {
    return language === 'en' ? 'My Professional Services' : 'Layanan Profesional Saya';
  };

  const getRoleDescription = () => {
    return language === 'en'
      ? 'I offer comprehensive digital solutions combining design creativity with technical expertise. Available for both full-time positions and freelance projects.'
      : 'Saya menawarkan solusi digital komprehensif yang menggabungkan kreativitas desain dengan keahlian teknis. Tersedia untuk posisi full-time dan proyek freelance.';
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSectionTitle
          badge={language === 'en' ? 'Services' : 'Layanan'}
          title={getRoleTitle()}
          subtitle={getRoleDescription()}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <AnimatedCard
              key={service.id}
              delay={index * 0.1}
              className="group h-full"
            >
              <motion.div
                className="relative h-full bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
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
                  {(language === 'en' ? service.features.en : service.features.id).map((feature, idx) => (
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

        {/* Availability Section */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl p-8 text-white">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">
                {language === 'en' ? 'Open for Opportunities' : 'Terbuka untuk Peluang'}
              </h3>
              <p className="text-blue-100 text-lg max-w-3xl mx-auto">
                {language === 'en' 
                  ? 'I am actively seeking new opportunities and ready to contribute to exciting projects. Whether you need a dedicated team member or a skilled freelancer, I\'m here to help bring your vision to life.'
                  : 'Saya secara aktif mencari peluang baru dan siap berkontribusi pada proyek yang menarik. Apakah Anda membutuhkan anggota tim yang berdedikasi atau freelancer yang terampil, saya di sini untuk membantu mewujudkan visi Anda.'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Full-time */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">💼</span>
                  <h4 className="text-xl font-bold">
                    {language === 'en' ? 'Full-Time Position' : 'Posisi Full-Time'}
                  </h4>
                </div>
                <ul className="space-y-2 text-blue-100 mb-4">
                  <li>• {language === 'en' ? 'Long-term commitment' : 'Komitmen jangka panjang'}</li>
                  <li>• {language === 'en' ? 'Team collaboration' : 'Kolaborasi tim'}</li>
                  <li>• {language === 'en' ? 'Growth-oriented mindset' : 'Mindset berorientasi pertumbuhan'}</li>
                  <li>• {language === 'en' ? 'Available for relocation' : 'Tersedia untuk relokasi'}</li>
                </ul>
                <p className="text-sm text-blue-200">
                  {language === 'en' 
                    ? 'Ready to join innovative companies and contribute to meaningful projects with dedicated focus and professional growth.'
                    : 'Siap bergabung dengan perusahaan inovatif dan berkontribusi pada proyek yang bermakna dengan fokus yang berdedikasi dan pertumbuhan profesional.'
                  }
                </p>
              </div>

              {/* Freelance */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">🚀</span>
                  <h4 className="text-xl font-bold">
                    {language === 'en' ? 'Freelance Projects' : 'Proyek Freelance'}
                  </h4>
                </div>
                <ul className="space-y-2 text-blue-100 mb-4">
                  <li>• {language === 'en' ? 'Project-based engagement' : 'Keterlibatan berbasis proyek'}</li>
                  <li>• {language === 'en' ? 'Flexible timeline' : 'Timeline fleksibel'}</li>
                  <li>• {language === 'en' ? 'Remote-friendly' : 'Ramah remote'}</li>
                  <li>• {language === 'en' ? 'Quick turnaround' : 'Turnaround cepat'}</li>
                </ul>
                <p className="text-sm text-blue-200">
                  {language === 'en' 
                    ? 'Perfect for startups, agencies, and businesses looking for expert assistance on specific projects or ongoing support.'
                    : 'Sempurna untuk startup, agensi, dan bisnis yang mencari bantuan ahli untuk proyek spesifik atau dukungan berkelanjutan.'
                  }
                </p>
              </div>
            </div>

            {/* Tech Stack Info */}
            <div className="text-center">
              <h4 className="text-lg font-semibold mb-4">
                {language === 'en' ? 'My Technology Arsenal' : 'Arsenal Teknologi Saya'}
              </h4>
              <div className="flex flex-wrap justify-center gap-3">
                {['Figma', 'Adobe Creative Suite', 'Angular', 'React.js', 'Vue.js', 'TypeScript', 'Java Spring Boot', 'Node.js', 'Python', 'MySQL', 'Git'].map((tech) => (
                  <span key={tech} className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}