"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import { useLanguage } from '../../context/LanguageContext';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay';

interface Skill {
  name: string;
  level: number;
}

interface SoftSkillCategory {
  [key: string]: string[];
}

interface UiUxSkillsData {
  "Software & Tools": Skill[];
  "Hard Skills": Skill[];
  "Riset & Analisis": Skill[];
  "Visual & Interaksi": Skill[];
  "Soft Skills": SoftSkillCategory;
}

const uiUxSkillsData: UiUxSkillsData = {
  "Software & Tools": [
    { name: "Figma", level: 100 },
    { name: "Adobe Creative Suite (XD, Photoshop, Illustrator)", level: 80 },
    { name: "Sketch", level: 80 },
    { name: "InVision", level: 90 },
    { name: "Webflow", level: 100 },
    { name: "Balsamiq", level: 60 },
    { name: "Miro/Mural", level: 70 }
  ],
  "Hard Skills": [
    { name: "Wireframing", level: 90 },
    { name: "Mockup Design", level: 100 },
    { name: "Prototyping", level: 100 },
    { name: "User Flow", level: 100 },
    { name: "Journey Mapping", level: 100 }
  ],
  "Riset & Analisis": [
    { name: "User Research", level: 90 },
    { name: "Pembuatan Persona Pengguna", level: 100 },
    { name: "Analisis Kompetitor", level: 95 }
  ],
  "Visual & Interaksi": [
    { name: "Teori Warna & Tipografi", level: 100 },
    { name: "Interaction Design", level: 100 },
    { name: "Desain Responsif", level: 100 },
    { name: "UX Writing (Microcopy)", level: 80 }
  ],
  "Soft Skills": {
    "Komunikasi & Kolaborasi": [
      "Komunikasi yang efektif dengan tim (developer, product manager, dll.)",
      "Presentasi desain kepada klien dan stakeholder",
      "Kemampuan kolaborasi dalam tim"
    ],
    "Pemecahan Masalah & Berpikir Kritis": [
      "Kemampuan berpikir kritis untuk menganalisis masalah pengguna",
      "Problem-solving untuk menemukan solusi desain yang efektif",
      "Rasa empati yang tinggi terhadap pengguna"
    ],
    "Manajemen Diri": [
      "Manajemen waktu untuk menangani beberapa proyek sekaligus",
      "Kemauan untuk terus belajar dan beradaptasi dengan tren baru"
    ]
  }
};

const categoryTitles = {
  "Software & Tools": {
    en: "Software & Tools",
    id: "Software & Tools"
  },
  "Hard Skills": {
    en: "Hard Skills",
    id: "Hard Skills"
  },
  "Riset & Analisis": {
    en: "Research & Analysis",
    id: "Riset & Analisis"
  },
  "Visual & Interaksi": {
    en: "Visual & Interaction",
    id: "Visual & Interaksi"
  },
  "Soft Skills": {
    en: "Soft Skills",
    id: "Soft Skills"
  }
};

interface SkillCardProps {
  skill: Skill;
  index: number;
  inView: boolean;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, index, inView }) => {
  const [animatedLevel, setAnimatedLevel] = useState(0);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setAnimatedLevel(skill.level);
      }, index * 100);
      return () => clearTimeout(timer);
    }
  }, [inView, skill.level, index]);

  const getProgressColor = (level: number) => {
    if (level >= 90) return 'from-green-400 to-green-600';
    if (level >= 80) return 'from-blue-400 to-blue-600';
    if (level >= 70) return 'from-yellow-400 to-yellow-600';
    return 'from-red-400 to-red-600';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 min-h-[140px] flex flex-col justify-between">
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm leading-tight">
          {skill.name}
        </h4>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600 dark:text-gray-400">Proficiency</span>
          <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
            {skill.level}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${getProgressColor(skill.level)} rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: inView ? `${animatedLevel}%` : 0 }}
            transition={{ 
              duration: 1.5, 
              delay: index * 0.1,
              ease: "easeOut" 
            }}
          />
        </div>
      </div>
    </div>
  );
};

export function UiUxSkills() {
  const { language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const carouselCategories = ["Software & Tools", "Hard Skills", "Riset & Analisis", "Visual & Interaksi"] as const;

  return (
    <div ref={ref} className="bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-rose-900/20 rounded-3xl p-8 shadow-lg border border-purple-200 dark:border-purple-700">
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {language === 'en' ? 'UI/UX Design Skills & Creative Expertise' : 'Keahlian Desain UI/UX & Keahlian Kreatif'}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          {language === 'en' 
            ? 'I combine creative vision with technical expertise to create meaningful and impactful user experiences. My approach focuses on user-centered design and data-driven decisions.'
            : 'Saya menggabungkan visi kreatif dengan keahlian teknis untuk menciptakan pengalaman pengguna yang bermakna dan berdampak. Pendekatan saya berfokus pada desain yang berpusat pada pengguna dan keputusan berbasis data.'
          }
        </p>
      </motion.div>

      {/* Carousel Sections */}
      <div className="space-y-12">
        {carouselCategories.map((category, categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
          >
            <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
              {language === 'en' 
                ? categoryTitles[category].en
                : categoryTitles[category].id
              }
            </h4>

            <div className="relative">
              <Swiper
                modules={[Autoplay, FreeMode]}
                spaceBetween={20}
                slidesPerView="auto"
                freeMode={true}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: false,
                  reverseDirection: categoryIndex % 2 === 1
                }}
                speed={3000 + categoryIndex * 500}
                loop={true}
                allowTouchMove={false}
                className="!overflow-visible"
                breakpoints={{
                  320: {
                    slidesPerView: 1.2,
                    spaceBetween: 16
                  },
                  640: {
                    slidesPerView: 2.5,
                    spaceBetween: 20
                  },
                  768: {
                    slidesPerView: 3.2,
                    spaceBetween: 20
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 24
                  }
                }}
              >
                {/* Duplicate skills for infinite loop */}
                {[...uiUxSkillsData[category], ...uiUxSkillsData[category]].map((skill, index) => (
                  <SwiperSlide key={`${skill.name}-${index}`} className="!w-auto">
                    <div className="w-72">
                      <SkillCard 
                        skill={skill} 
                        index={index} 
                        inView={isInView}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Soft Skills Section */}
      <motion.div
        className="mt-16"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
          {language === 'en' ? categoryTitles["Soft Skills"].en : categoryTitles["Soft Skills"].id}
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(uiUxSkillsData["Soft Skills"]).map(([subCategory, skills], index) => (
            <motion.div
              key={subCategory}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <h5 className="font-semibold text-gray-900 dark:text-white mb-4 text-center border-b border-gray-200 dark:border-gray-700 pb-2">
                {subCategory}
              </h5>
              <ul className="space-y-3">
                {skills.map((skill, skillIndex) => (
                  <motion.li
                    key={skillIndex}
                    className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-300"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ duration: 0.3, delay: 1.2 + index * 0.1 + skillIndex * 0.05 }}
                  >
                    <span className="text-purple-500 dark:text-purple-400 mt-1 flex-shrink-0">•</span>
                    <span className="leading-relaxed">{skill}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}