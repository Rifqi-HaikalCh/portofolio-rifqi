"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import TiltedCard from '../shared/TiltedCard';

interface DesignSkill {
  name: string;
  nameId: string;
  icon: string;
  level: number;
  color: string;
  description: string;
  descriptionId: string;
  category: 'Design Tools' | 'UX Research' | 'Design Process';
}

const designSkills: DesignSkill[] = [
  // Software & Tools
  {
    name: 'Figma',
    nameId: 'Figma',
    icon: '🎨',
    level: 100,
    color: '#F24E1E',
    description: 'UI/UX Design Platform',
    descriptionId: 'Platform Desain UI/UX',
    category: 'Design Tools'
  },
  {
    name: 'Adobe Creative Suite',
    nameId: 'Adobe Creative Suite',
    icon: '🎭',
    level: 80,
    color: '#FF0000',
    description: 'Complete Design Suite',
    descriptionId: 'Suite Desain Lengkap',
    category: 'Design Tools'
  },
  {
    name: 'Sketch',
    nameId: 'Sketch',
    icon: '💎',
    level: 80,
    color: '#F7B500',
    description: 'Vector Graphics Editor',
    descriptionId: 'Editor Grafis Vektor',
    category: 'Design Tools'
  },
  {
    name: 'InVision',
    nameId: 'InVision',
    icon: '🔗',
    level: 90,
    color: '#FF3366',
    description: 'Digital Product Design Platform',
    descriptionId: 'Platform Desain Produk Digital',
    category: 'Design Tools'
  },
  {
    name: 'Webflow',
    nameId: 'Webflow',
    icon: '🌐',
    level: 100,
    color: '#4353FF',
    description: 'Visual Web Development',
    descriptionId: 'Pengembangan Web Visual',
    category: 'Design Tools'
  },
  {
    name: 'Balsamiq',
    nameId: 'Balsamiq',
    icon: '📝',
    level: 60,
    color: '#CC0000',
    description: 'Rapid Wireframing Tool',
    descriptionId: 'Tool Wireframing Cepat',
    category: 'Design Tools'
  },
  {
    name: 'Miro/Mural',
    nameId: 'Miro/Mural',
    icon: '🗂️',
    level: 70,
    color: '#050038',
    description: 'Collaborative Design Thinking',
    descriptionId: 'Design Thinking Kolaboratif',
    category: 'Design Tools'
  },
  // Hard Skills
  {
    name: 'Wireframing',
    nameId: 'Wireframing',
    icon: '📐',
    level: 90,
    color: '#8B5CF6',
    description: 'Low-fidelity Design Planning',
    descriptionId: 'Perencanaan Desain Fidelitas Rendah',
    category: 'UX Research'
  },
  {
    name: 'Mockup Design',
    nameId: 'Desain Mockup',
    icon: '🖼️',
    level: 100,
    color: '#10B981',
    description: 'High-fidelity Visual Design',
    descriptionId: 'Desain Visual Fidelitas Tinggi',
    category: 'Design Process'
  },
  {
    name: 'Prototyping',
    nameId: 'Prototyping',
    icon: '⚡',
    level: 100,
    color: '#F59E0B',
    description: 'Interactive Design Simulation',
    descriptionId: 'Simulasi Desain Interaktif',
    category: 'Design Process'
  },
  {
    name: 'User Flow',
    nameId: 'Alur Pengguna',
    icon: '🔄',
    level: 100,
    color: '#EF4444',
    description: 'User Journey Mapping',
    descriptionId: 'Pemetaan Perjalanan Pengguna',
    category: 'UX Research'
  },
  {
    name: 'Journey Mapping',
    nameId: 'Pemetaan Perjalanan',
    icon: '🗺️',
    level: 100,
    color: '#06B6D4',
    description: 'User Experience Visualization',
    descriptionId: 'Visualisasi Pengalaman Pengguna',
    category: 'UX Research'
  },
  // Riset & Analisis
  {
    name: 'User Research',
    nameId: 'Riset Pengguna',
    icon: '🔍',
    level: 90,
    color: '#8B5CF6',
    description: 'User Behavior Analysis',
    descriptionId: 'Analisis Perilaku Pengguna',
    category: 'UX Research'
  },
  {
    name: 'User Persona Creation',
    nameId: 'Pembuatan Persona Pengguna',
    icon: '👤',
    level: 100,
    color: '#F97316',
    description: 'Target User Profiling',
    descriptionId: 'Profiling Pengguna Target',
    category: 'UX Research'
  },
  {
    name: 'Competitor Analysis',
    nameId: 'Analisis Kompetitor',
    icon: '📊',
    level: 95,
    color: '#84CC16',
    description: 'Market Research & Benchmarking',
    descriptionId: 'Riset Pasar & Benchmarking',
    category: 'UX Research'
  },
  // Visual & Interaksi
  {
    name: 'Color Theory & Typography',
    nameId: 'Teori Warna & Tipografi',
    icon: '🎨',
    level: 100,
    color: '#EC4899',
    description: 'Visual Design Fundamentals',
    descriptionId: 'Fundamental Desain Visual',
    category: 'Design Process'
  },
  {
    name: 'Interaction Design',
    nameId: 'Desain Interaksi',
    icon: '👆',
    level: 100,
    color: '#3B82F6',
    description: 'User Interface Interactions',
    descriptionId: 'Interaksi Antarmuka Pengguna',
    category: 'Design Process'
  },
  {
    name: 'Responsive Design',
    nameId: 'Desain Responsif',
    icon: '📱',
    level: 100,
    color: '#059669',
    description: 'Multi-device Compatibility',
    descriptionId: 'Kompatibilitas Multi-perangkat',
    category: 'Design Process'
  },
  {
    name: 'UX Writing',
    nameId: 'UX Writing',
    icon: '✍️',
    level: 80,
    color: '#DC2626',
    description: 'User-focused Content Creation',
    descriptionId: 'Pembuatan Konten Fokus Pengguna',
    category: 'Design Process'
  }
];

const categoryTitles = {
  'Design Tools': {
    en: 'Design Tools',
    id: 'Tools Desain'
  },
  'UX Research': {
    en: 'UX Research',
    id: 'Riset UX'
  },
  'Design Process': {
    en: 'Design Process',
    id: 'Proses Desain'
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
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 + index * 0.05, duration: 0.4 }}
                className="w-full"
              >
                <TiltedCard
                  scaleOnHover={1.05}
                  rotateAmplitude={8}
                  containerHeight="100%"
                  containerWidth="100%"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 h-full transition-all duration-300 hover:shadow-2xl">
                    {/* Skill Header */}
                    <div className="flex items-center mb-4">
                      <span className="text-3xl mr-4">{skill.icon}</span>
                      <div className="flex-1">
                        <h5 className="font-bold text-gray-900 dark:text-white">
                          {language === 'en' ? skill.name : skill.nameId}
                        </h5>
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
                  </div>
                </TiltedCard>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}