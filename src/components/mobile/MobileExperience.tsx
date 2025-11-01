'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { workExperience, organizationExperience } from '../../data/portfolio';
import { Briefcase, Users, Calendar, MapPin, X, ChevronRight } from 'lucide-react';

export const MobileExperience: React.FC = () => {
  const { language } = useLanguage();
  const [selectedExp, setSelectedExp] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'work' | 'organization'>('work');

  const experiences = activeTab === 'work' ? workExperience : organizationExperience;
  const TabIcon = activeTab === 'work' ? Briefcase : Users;

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Section Header */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="inline-block px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full text-sm font-semibold mb-4">
          {language === 'en' ? 'Professional Journey' : 'Perjalanan Profesional'}
        </span>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          {language === 'en' ? 'Experience' : 'Pengalaman'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          {language === 'en'
            ? 'A timeline of experiences that shaped my professional growth'
            : 'Garis waktu pengalaman yang membentuk pertumbuhan profesional saya'}
        </p>
      </motion.div>

      {/* Tab Selection */}
      <div className="flex gap-3 mb-8">
        <button
          onClick={() => setActiveTab('work')}
          className={`flex-1 py-3 px-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
            activeTab === 'work'
              ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
          }`}
        >
          <Briefcase size={18} />
          <span className="text-sm">{language === 'en' ? 'Work' : 'Kerja'}</span>
        </button>
        <button
          onClick={() => setActiveTab('organization')}
          className={`flex-1 py-3 px-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
            activeTab === 'organization'
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
          }`}
        >
          <Users size={18} />
          <span className="text-sm">{language === 'en' ? 'Organization' : 'Organisasi'}</span>
        </button>
      </div>

      {/* Experience Timeline */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {experiences.map((exp, index) => (
            <motion.button
              key={exp.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedExp(exp)}
              className="w-full text-left"
            >
              <div className="relative">
                {/* Timeline Line (except for last item) */}
                {index < experiences.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 to-blue-500 opacity-30" />
                )}

                <div className="flex items-start gap-4">
                  {/* Timeline Icon */}
                  <div className="relative z-10 flex items-center justify-center bg-gradient-to-br from-emerald-500 to-blue-500 shadow-lg w-12 h-12 rounded-xl text-white flex-shrink-0">
                    <TabIcon size={20} />
                  </div>

                  {/* Experience Card */}
                  <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg active:scale-95 transition-transform">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                        {language === 'en' ? exp.title : (exp.titleId || exp.title)}
                      </h3>
                      <ChevronRight size={18} className="text-emerald-500 flex-shrink-0 mt-1" />
                    </div>

                    <h4 className="text-emerald-600 dark:text-emerald-400 font-semibold mb-3">
                      {exp.company}
                    </h4>

                    <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>{exp.period}</span>
                      </div>
                      {exp.location && (
                        <div className="flex items-center gap-2">
                          <MapPin size={14} />
                          <span>{exp.location}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 mb-3">
                      {language === 'en' ? exp.description : (exp.descriptionId || exp.description)}
                    </p>

                    {exp.techStack && (
                      <div className="flex flex-wrap gap-2">
                        {exp.techStack.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-xs rounded-lg font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {exp.techStack.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-lg font-medium">
                            +{exp.techStack.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedExp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedExp(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white dark:bg-gray-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white p-6 rounded-t-3xl relative">
                <button
                  onClick={() => setSelectedExp(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center active:scale-90 transition-transform"
                >
                  <X size={20} />
                </button>

                <h3 className="text-2xl font-bold mb-2 pr-10">{selectedExp.company}</h3>
                <p className="text-white/90">
                  {language === 'en' ? selectedExp.title : (selectedExp.titleId || selectedExp.title)}
                </p>

                <div className="flex flex-col gap-2 text-white/80 text-sm mt-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{selectedExp.period}</span>
                  </div>
                  {selectedExp.location && (
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>{selectedExp.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {selectedExp.image && (
                  <div className="mb-6 rounded-2xl overflow-hidden">
                    <Image
                      src={selectedExp.image}
                      alt={selectedExp.company}
                      width={600}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {language === 'en' ? selectedExp.description : (selectedExp.descriptionId || selectedExp.description)}
                </p>

                {selectedExp.techStack && (
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      {language === 'en' ? 'Technologies Used' : 'Teknologi yang Digunakan'}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedExp.techStack.map((tech: string) => (
                        <span
                          key={tech}
                          className="px-3 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-xl text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
