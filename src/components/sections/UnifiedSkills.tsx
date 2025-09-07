"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { AnimatedSectionTitle } from '../shared/AnimatedSectionTitle';
import { AnimatedCard } from '../shared/AnimatedCard';
import { InteractiveButton } from '../shared/InteractiveButton';
import { Code, Palette, Layers } from 'lucide-react';
import { SelectedRole } from '../sections/RoleSelectionModal';

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

interface UnifiedSkillsProps {
  selectedRole: SelectedRole;
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
    name: 'Java',
    nameId: 'Java',
    icon: '☕',
    level: 85,
    color: '#007396',
    description: 'Object-oriented programming',
    descriptionId: 'Pemrograman berorientasi objek',
    category: 'Programming Language'
  },
  {
    name: 'PHP',
    nameId: 'PHP',
    icon: '🐘',
    level: 80,
    color: '#777BB4',
    description: 'Server-side web development',
    descriptionId: 'Pengembangan web server-side',
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
  },
  {
    name: 'Vue.js',
    nameId: 'Vue.js',
    icon: '💚',
    level: 88,
    color: '#4FC08D',
    description: 'Progressive framework expertise',
    descriptionId: 'Keahlian framework progresif',
    category: 'Frontend Framework'
  },
  {
    name: 'Spring Boot',
    nameId: 'Spring Boot',
    icon: '🍃',
    level: 87,
    color: '#6DB33F',
    description: 'Enterprise Java applications',
    descriptionId: 'Aplikasi Java enterprise',
    category: 'Backend Framework'
  },
  {
    name: 'Laravel',
    nameId: 'Laravel',
    icon: '🎭',
    level: 82,
    color: '#FF2D20',
    description: 'Elegant PHP framework',
    descriptionId: 'Framework PHP yang elegan',
    category: 'Backend Framework'
  },
  {
    name: 'Node.js',
    nameId: 'Node.js',
    icon: '🟢',
    level: 85,
    color: '#339933',
    description: 'Server-side JavaScript runtime',
    descriptionId: 'Runtime JavaScript server-side',
    category: 'Backend Runtime'
  },
  {
    name: 'Git',
    nameId: 'Git',
    icon: '🌿',
    level: 90,
    color: '#F05032',
    description: 'Version control and collaboration',
    descriptionId: 'Kontrol versi dan kolaborasi',
    category: 'Development Tools'
  },
  {
    name: 'MySQL',
    nameId: 'MySQL',
    icon: '🐬',
    level: 85,
    color: '#4479A1',
    description: 'Relational database management',
    descriptionId: 'Manajemen basis data relasional',
    category: 'Database'
  },
  {
    name: 'MongoDB',
    nameId: 'MongoDB',
    icon: '🍃',
    level: 78,
    color: '#47A248',
    description: 'NoSQL document database',
    descriptionId: 'Basis data dokumen NoSQL',
    category: 'Database'
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
  },
  {
    name: 'Visual Design',
    nameId: 'Desain Visual',
    icon: '🎭',
    level: 87,
    color: '#10B981',
    description: 'Creating compelling visual communications',
    descriptionId: 'Membuat komunikasi visual yang menarik',
    category: 'Visual Design'
  },
  {
    name: 'Design Systems',
    nameId: 'Sistem Desain',
    icon: '🧩',
    level: 85,
    color: '#6366F1',
    description: 'Scalable and consistent design frameworks',
    descriptionId: 'Framework desain yang skalabel dan konsisten',
    category: 'Design Process'
  }
];

export function UnifiedSkills({ selectedRole }: UnifiedSkillsProps) {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'developer' | 'uiux'>(() => {
    if (selectedRole === 'uiux') return 'uiux';
    if (selectedRole === 'developer') return 'developer';
    return 'developer'; // default
  });

  React.useEffect(() => {
    if (selectedRole === 'uiux') setActiveTab('uiux');
    else if (selectedRole === 'developer') setActiveTab('developer');
  }, [selectedRole]);

  const tabs = [
    {
      id: 'developer' as const,
      icon: Code,
      labelEn: 'Web Development',
      labelId: 'Pengembangan Web',
      descriptionEn: 'Technical skills and programming expertise',
      descriptionId: 'Keahlian teknis dan keahlian programming',
      gradient: 'from-blue-500 to-cyan-500',
      skills: developerSkills
    },
    {
      id: 'uiux' as const,
      icon: Palette,
      labelEn: 'UI/UX Design',
      labelId: 'Desain UI/UX',
      descriptionEn: 'Creative design and user experience skills',
      descriptionId: 'Keahlian desain kreatif dan pengalaman pengguna',
      gradient: 'from-purple-500 to-pink-500',
      skills: designSkills
    }
  ];

  const currentTab = tabs.find(tab => tab.id === activeTab) || tabs[0];
  const currentSkills = currentTab.skills;

  // Group skills by category
  const skillsByCategory = currentSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

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

  const skillCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-bg-secondary to-bg-tertiary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSectionTitle
          badge={language === 'en' ? 'Skills & Technologies' : 'Keahlian & Teknologi'}
          title={language === 'en' ? 'Technical Expertise & Creative Skills' : 'Keahlian Teknis & Keahlian Kreatif'}
          subtitle={language === 'en' 
            ? 'Comprehensive skill set spanning both technical development and creative design'
            : 'Set keahlian komprehensif yang mencakup pengembangan teknis dan desain kreatif'
          }
        />

        {/* Modern Toggle Tabs */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="glass-card p-2 inline-flex rounded-2xl">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <motion.button
                  key={tab.id}
                  className={`relative px-8 py-4 rounded-xl font-semibold text-sm flex items-center space-x-3 transition-all duration-300 min-w-[200px] justify-center ${
                    isActive
                      ? `bg-gradient-to-r ${tab.gradient} text-white shadow-lg`
                      : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                  variants={tabVariants}
                  animate={isActive ? 'active' : 'inactive'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Sliding indicator background */}
                  {isActive && (
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${tab.gradient} rounded-xl`}
                      layoutId="activeTab"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}

                  {/* Content */}
                  <div className="relative z-10 flex items-center space-x-3">
                    <IconComponent className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-semibold">
                        {language === 'en' ? tab.labelEn : tab.labelId}
                      </div>
                      <div className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                        {language === 'en' ? tab.descriptionEn : tab.descriptionId}
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Skills Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="space-y-12"
          >
            {Object.entries(skillsByCategory).map(([category, skills], categoryIndex) => (
              <motion.div
                key={category}
                variants={skillCardVariants}
                className="space-y-6"
              >
                {/* Category Title */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-text-primary mb-2">
                    {category}
                  </h3>
                  <div className={`w-24 h-1 bg-gradient-to-r ${currentTab.gradient} mx-auto rounded-full`} />
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {skills.map((skill, index) => (
                    <AnimatedCard
                      key={skill.name}
                      delay={categoryIndex * 0.1 + index * 0.05}
                      className="group"
                    >
                      <motion.div
                        className="modern-card p-6 h-full hover:shadow-2xl"
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
                            <h4 className="font-bold text-text-primary mb-1">
                              {language === 'en' ? skill.name : skill.nameId}
                            </h4>
                            <p className="text-sm text-text-secondary">
                              {language === 'en' ? skill.description : skill.descriptionId}
                            </p>
                          </div>
                        </div>

                        {/* Skill Level */}
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-text-secondary">
                              {language === 'en' ? 'Proficiency' : 'Kemahiran'}
                            </span>
                            <span className="text-sm font-bold text-text-primary">
                              {skill.level}%
                            </span>
                          </div>

                          {/* Progress Bar */}
                          <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-3 overflow-hidden">
                            <motion.div
                              className="h-3 rounded-full"
                              style={{ 
                                background: `linear-gradient(90deg, ${skill.color}, ${skill.color}dd)`
                              }}
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ 
                                duration: 1.2, 
                                delay: categoryIndex * 0.1 + index * 0.1,
                                ease: "easeOut" 
                              }}
                            />
                          </div>

                          {/* Level Badge */}
                          <div className="flex justify-end">
                            <span 
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white"
                              style={{ backgroundColor: skill.color }}
                            >
                              {skill.level >= 90 ? (
                                language === 'en' ? 'Expert' : 'Ahli'
                              ) : skill.level >= 80 ? (
                                language === 'en' ? 'Advanced' : 'Lanjutan'
                              ) : (
                                language === 'en' ? 'Proficient' : 'Terampil'
                              )}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatedCard>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* CTA Section */}
            <motion.div
              className="text-center mt-16"
              variants={skillCardVariants}
            >
              <div className={`glass-card-strong p-8 bg-gradient-to-r ${currentTab.gradient} text-white rounded-3xl`}>
                <Layers className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">
                  {language === 'en' 
                    ? 'Ready to Bring Your Ideas to Life' 
                    : 'Siap Mewujudkan Ide Anda'
                  }
                </h3>
                <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                  {language === 'en'
                    ? 'With expertise in both design and development, I can take your project from concept to completion.'
                    : 'Dengan keahlian dalam desain dan pengembangan, saya dapat mengantarkan proyek Anda dari konsep hingga selesai.'
                  }
                </p>
                <InteractiveButton
                  onClick={() => {
                    const contactSection = document.querySelector('#contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-white text-gray-800 font-semibold py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
                >
                  {language === 'en' ? 'Start a Project' : 'Mulai Proyek'}
                </InteractiveButton>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}