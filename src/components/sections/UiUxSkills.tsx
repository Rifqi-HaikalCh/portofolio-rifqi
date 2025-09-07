"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { AnimatedCard } from '../shared/AnimatedCard';

interface DesignSkill {
  name: string;
  nameId: string;
  icon: string;
  level: number;
  color: string;
  description: string;
  descriptionId: string;
  category: 'design-tools' | 'design-skills' | 'research' | 'prototyping';
}

const designSkills: DesignSkill[] = [
  // Design Tools
  {
    name: 'Figma',
    nameId: 'Figma',
    icon: '🎨',
    level: 95,
    color: '#F24E1E',
    description: 'Advanced interface design and prototyping',
    descriptionId: 'Desain antarmuka lanjutan dan prototyping',
    category: 'design-tools'
  },
  {
    name: 'Adobe Photoshop',
    nameId: 'Adobe Photoshop',
    icon: '🖼️',
    level: 90,
    color: '#31A8FF',
    description: 'Photo editing and digital graphics creation',
    descriptionId: 'Editing foto dan pembuatan grafis digital',
    category: 'design-tools'
  },
  {
    name: 'Adobe Illustrator',
    nameId: 'Adobe Illustrator',
    icon: '✨',
    level: 85,
    color: '#FF9A00',
    description: 'Vector graphics and logo design',
    descriptionId: 'Grafis vektor dan desain logo',
    category: 'design-tools'
  },
  {
    name: 'Canva',
    nameId: 'Canva',
    icon: '🎯',
    level: 88,
    color: '#00C4CC',
    description: 'Quick design and social media graphics',
    descriptionId: 'Desain cepat dan grafis media sosial',
    category: 'design-tools'
  },
  {
    name: 'SketchUp',
    nameId: 'SketchUp',
    icon: '🏗️',
    level: 80,
    color: '#1E90FF',
    description: '3D modeling and architectural visualization',
    descriptionId: 'Modeling 3D dan visualisasi arsitektur',
    category: 'design-tools'
  },

  // Design Skills
  {
    name: 'UI Design',
    nameId: 'Desain UI',
    icon: '📱',
    level: 92,
    color: '#8B5CF6',
    description: 'Creating intuitive and beautiful user interfaces',
    descriptionId: 'Membuat antarmuka pengguna yang intuitif dan indah',
    category: 'design-skills'
  },
  {
    name: 'UX Design',
    nameId: 'Desain UX',
    icon: '🧠',
    level: 88,
    color: '#EC4899',
    description: 'User experience research and optimization',
    descriptionId: 'Riset dan optimisasi pengalaman pengguna',
    category: 'design-skills'
  },
  {
    name: 'Visual Design',
    nameId: 'Desain Visual',
    icon: '🎭',
    level: 90,
    color: '#10B981',
    description: 'Creating compelling visual communications',
    descriptionId: 'Membuat komunikasi visual yang menarik',
    category: 'design-skills'
  },
  {
    name: 'Brand Identity',
    nameId: 'Identitas Brand',
    icon: '🏷️',
    level: 85,
    color: '#F59E0B',
    description: 'Developing consistent brand experiences',
    descriptionId: 'Mengembangkan pengalaman brand yang konsisten',
    category: 'design-skills'
  },

  // Research & Strategy
  {
    name: 'User Research',
    nameId: 'Riset Pengguna',
    icon: '🔍',
    level: 83,
    color: '#EF4444',
    description: 'Understanding user needs and behaviors',
    descriptionId: 'Memahami kebutuhan dan perilaku pengguna',
    category: 'research'
  },
  {
    name: 'Usability Testing',
    nameId: 'Testing Usabilitas',
    icon: '🧪',
    level: 80,
    color: '#06B6D4',
    description: 'Testing and validating design solutions',
    descriptionId: 'Testing dan memvalidasi solusi desain',
    category: 'research'
  },
  {
    name: 'Information Architecture',
    nameId: 'Arsitektur Informasi',
    icon: '🏛️',
    level: 87,
    color: '#8B5CF6',
    description: 'Organizing and structuring content effectively',
    descriptionId: 'Mengorganisir dan menyusun konten secara efektif',
    category: 'research'
  },

  // Prototyping
  {
    name: 'Interactive Prototyping',
    nameId: 'Prototyping Interaktif',
    icon: '⚡',
    level: 90,
    color: '#F97316',
    description: 'Building clickable, testable prototypes',
    descriptionId: 'Membangun prototype yang dapat diklik dan diuji',
    category: 'prototyping'
  },
  {
    name: 'Wireframing',
    nameId: 'Wireframing',
    icon: '📐',
    level: 93,
    color: '#6B7280',
    description: 'Creating low-fidelity design blueprints',
    descriptionId: 'Membuat blueprint desain fidelitas rendah',
    category: 'prototyping'
  },
  {
    name: 'Design Systems',
    nameId: 'Sistem Desain',
    icon: '🧩',
    level: 88,
    color: '#7C3AED',
    description: 'Building scalable and consistent design systems',
    descriptionId: 'Membangun sistem desain yang skalabel dan konsisten',
    category: 'prototyping'
  }
];

const categoryTitles = {
  'design-tools': {
    en: 'Design Tools',
    id: 'Tools Desain'
  },
  'design-skills': {
    en: 'Design Skills',
    id: 'Keahlian Desain'
  },
  'research': {
    en: 'Research & Strategy',
    id: 'Riset & Strategi'
  },
  'prototyping': {
    en: 'Prototyping',
    id: 'Prototyping'
  }
};

export function UiUxSkills() {
  const { language } = useLanguage();

  const skillsByCategory = designSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, DesignSkill[]>);

  return (
    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-rose-900/20 rounded-3xl p-8 shadow-lg border border-purple-200 dark:border-purple-700">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {language === 'en' ? 'Design Skills & Creative Expertise' : 'Keahlian Desain & Keahlian Kreatif'}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          {language === 'en' 
            ? 'I combine creative vision with technical expertise to create meaningful and impactful user experiences. My approach focuses on user-centered design and data-driven decisions.'
            : 'Saya menggabungkan visi kreatif dengan keahlian teknis untuk menciptakan pengalaman pengguna yang bermakna dan berdampak. Pendekatan saya berfokus pada desain yang berpusat pada pengguna dan keputusan berbasis data.'
          }
        </p>
      </div>

      {Object.entries(skillsByCategory).map(([category, skills], categoryIndex) => (
        <div key={category} className="mb-12 last:mb-0">
          <motion.h4 
            className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
          >
            {language === 'en' 
              ? categoryTitles[category as keyof typeof categoryTitles].en
              : categoryTitles[category as keyof typeof categoryTitles].id
            }
          </motion.h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <AnimatedCard key={skill.name} delay={categoryIndex * 0.1 + index * 0.05}>
                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 h-full"
                  whileHover={{ 
                    scale: 1.02, 
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' 
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Skill Header */}
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-4">{skill.icon}</span>
                    <div className="flex-1">
                      <h5 className="font-bold text-gray-900 dark:text-white">
                        {language === 'en' ? skill.name : skill.nameId}
                      </h5>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {language === 'en' ? skill.description : skill.descriptionId}
                      </p>
                    </div>
                  </div>

                  {/* Skill Level */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {language === 'en' ? 'Proficiency' : 'Kemahiran'}
                      </span>
                      <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="h-2 rounded-full"
                        style={{ backgroundColor: skill.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ 
                          duration: 1, 
                          delay: categoryIndex * 0.1 + index * 0.1,
                          ease: "easeOut" 
                        }}
                      />
                    </div>
                  </div>

                  {/* Skill Badge */}
                  <div 
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: skill.color }}
                  >
                    {skill.level >= 90 ? (
                      language === 'en' ? 'Expert' : 'Ahli'
                    ) : skill.level >= 80 ? (
                      language === 'en' ? 'Advanced' : 'Lanjutan'
                    ) : (
                      language === 'en' ? 'Intermediate' : 'Menengah'
                    )}
                  </div>
                </motion.div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}