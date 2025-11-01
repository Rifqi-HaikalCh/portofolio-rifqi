'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { certificateCategories } from '../../data/portfolio';
import { ChevronDown, Award, FileText, Code, Trophy, Users, Briefcase } from 'lucide-react';

const categoryIcons: { [key: string]: React.ReactNode } = {
  'code': <Code size={20} />,
  'trophy': <Trophy size={20} />,
  'users': <Users size={20} />,
  'briefcase': <Briefcase size={20} />,
};

export const MobileCertificates: React.FC = () => {
  const { language } = useLanguage();
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <section id="certificates" className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
      {/* Section Header */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-semibold mb-4 flex items-center justify-center gap-2 w-fit mx-auto">
          <Award size={16} />
          {language === 'en' ? 'Professional Growth' : 'Pertumbuhan Profesional'}
        </span>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          {language === 'en' ? 'Certificates' : 'Sertifikat'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          {language === 'en'
            ? 'Tap on each category to explore my certifications'
            : 'Ketuk setiap kategori untuk menjelajahi sertifikat saya'}
        </p>
      </motion.div>

      {/* Categories */}
      <div className="space-y-4">
        {certificateCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden"
          >
            {/* Category Header */}
            <button
              onClick={() => toggleCategory(category.id)}
              className="w-full bg-gradient-to-r from-emerald-500 via-blue-500 to-emerald-600 text-white p-5 flex items-center justify-between active:scale-95 transition-transform"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                  {categoryIcons[category.icon]}
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-lg">
                    {language === 'en' ? category.title : category.titleId}
                  </h3>
                  <p className="text-white/80 text-xs">
                    {language === 'en' ? 'Tap to expand' : 'Ketuk untuk buka'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold">
                  {category.count}
                </span>
                <motion.div
                  animate={{ rotate: expandedCategories.includes(category.id) ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={20} />
                </motion.div>
              </div>
            </button>

            {/* Certificates List */}
            <AnimatePresence>
              {expandedCategories.includes(category.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-5 space-y-4">
                    {category.certificates.map((cert, certIndex) => (
                      <motion.div
                        key={cert.id}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: certIndex * 0.1 }}
                        className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4"
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Award size={18} className="text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                              {language === 'en' ? cert.title : (cert.titleId || cert.title)}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                              {language === 'en' ? cert.description : (cert.descriptionId || cert.description)}
                            </p>
                          </div>
                        </div>
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-full text-sm font-semibold shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
                        >
                          <FileText size={16} />
                          {language === 'en' ? 'View Certificate' : 'Lihat Sertifikat'}
                        </a>
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
