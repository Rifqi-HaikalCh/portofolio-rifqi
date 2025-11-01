'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { ChevronDown } from 'lucide-react';

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
  // Design Tools
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
    name: 'Photoshop',
    nameId: 'Phototshop',
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
  // UX Research
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
  // Design Process
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

export const MobileUiUxSkills: React.FC = () => {
  const { language } = useLanguage();
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Design Tools']);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const skillsByCategory = designSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, DesignSkill[]>);

  const categoryGradients = {
    'Design Tools': 'from-pink-500 to-purple-500',
    'UX Research': 'from-blue-500 to-cyan-500',
    'Design Process': 'from-emerald-500 to-teal-500'
  };

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-rose-900/20">
      {/* Section Header */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-semibold mb-4">
          {language === 'en' ? 'Creative Expertise' : 'Keahlian Kreatif'}
        </span>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          {language === 'en' ? 'Design Skills' : 'Keahlian Desain'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          {language === 'en'
            ? 'Combining creative vision with technical expertise to create meaningful user experiences'
            : 'Menggabungkan visi kreatif dengan keahlian teknis untuk menciptakan pengalaman pengguna yang bermakna'}
        </p>
      </motion.div>

      {/* Categories */}
      <div className="space-y-4">
        {Object.entries(skillsByCategory).map(([category, skills], categoryIndex) => (
          <motion.div
            key={category}
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: categoryIndex * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden"
          >
            {/* Category Header */}
            <button
              onClick={() => toggleCategory(category)}
              className={`w-full bg-gradient-to-r ${categoryGradients[category as keyof typeof categoryGradients]} text-white p-5 flex items-center justify-between active:scale-95 transition-transform`}
            >
              <div className="text-left">
                <h3 className="font-bold text-lg">
                  {language === 'en'
                    ? categoryTitles[category as keyof typeof categoryTitles].en
                    : categoryTitles[category as keyof typeof categoryTitles].id}
                </h3>
                <p className="text-white/80 text-xs">
                  {language === 'en' ? `${skills.length} skills` : `${skills.length} keahlian`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: expandedCategories.includes(category) ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={20} />
                </motion.div>
              </div>
            </button>

            {/* Skills List */}
            <AnimatePresence>
              {expandedCategories.includes(category) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-5 space-y-4">
                    {skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: skillIndex * 0.05 }}
                        className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4"
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <span className="text-3xl flex-shrink-0">{skill.icon}</span>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                              {language === 'en' ? skill.name : skill.nameId}
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                              {language === 'en' ? skill.description : skill.descriptionId}
                            </p>

                            {/* Progress Bar */}
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                  {language === 'en' ? 'Proficiency' : 'Kemahiran'}
                                </span>
                                <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                                  {skill.level}%
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                                <motion.div
                                  className="h-2 rounded-full"
                                  style={{ backgroundColor: skill.color }}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${skill.level}%` }}
                                  transition={{
                                    duration: 1,
                                    delay: skillIndex * 0.1,
                                    ease: "easeOut"
                                  }}
                                />
                              </div>
                            </div>

                            {/* Badge */}
                            <div className="mt-3">
                              <span
                                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white"
                                style={{ backgroundColor: skill.color }}
                              >
                                {skill.level >= 90
                                  ? language === 'en' ? 'Expert' : 'Ahli'
                                  : skill.level >= 80
                                  ? language === 'en' ? 'Advanced' : 'Lanjutan'
                                  : language === 'en' ? 'Intermediate' : 'Menengah'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
