'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { workExperience, organizationExperience } from '../../data/portfolio';
import { Briefcase, Users, Calendar, MapPin, X, Star, ArrowRight } from 'lucide-react';
import { staggerContainer, fadeInUp } from '../../lib/animations';

const TimelineCard = ({ exp, side, icon, onClick }: { 
  exp: any, 
  side: 'left' | 'right', 
  icon: React.ReactNode,
  onClick: () => void 
}) => {
  const { t } = useLanguage();
  const alignment = side === 'left' ? 'flex-row-reverse' : 'flex-row';
  const textAlignment = side === 'left' ? 'text-right' : 'text-left';
  
  return (
    <motion.div 
      variants={fadeInUp} 
      className={`mb-12 flex justify-between items-center w-full ${alignment} group cursor-pointer`}
      onClick={onClick}
    >
      <div className="order-1 w-5/12"></div>
      
      {/* Enhanced Timeline Icon */}
      <motion.div 
        className="z-20 flex items-center justify-center order-1 bg-gradient-to-br from-emerald-500 to-blue-500 shadow-2xl w-16 h-16 rounded-2xl text-white border-4 border-white dark:border-gray-800 group-hover:scale-110 transition-all duration-300"
        whileHover={{ 
          scale: 1.2, 
          rotate: [0, -5, 5, 0],
          transition: { duration: 0.3 }
        }}
      >
        <div className="relative">
          {icon}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
        </div>
      </motion.div>
      
      {/* Enhanced Experience Card */}
      <motion.div 
        className={`order-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl w-5/12 p-6 ${textAlignment} border border-gray-200/50 dark:border-gray-700/50 group-hover:shadow-glow transition-all duration-500 relative overflow-hidden`}
        whileHover={{ 
          scale: 1.02,
          y: -5,
          transition: { type: "spring", stiffness: 300, damping: 20 }
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <h4 className="font-bold text-gray-900 dark:text-white text-lg group-hover:text-emerald-600 transition-colors duration-300">
              {t(exp.title, exp.titleId || exp.title)}
            </h4>
          </div>
          
          <h5 className="text-emerald-600 dark:text-emerald-400 font-semibold mb-3 text-lg">
            {exp.company}
          </h5>
          
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{exp.period}</span>
            </div>
            {exp.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{exp.location}</span>
              </div>
            )}
          </div>
          
          <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
            {t(exp.description, exp.descriptionId || exp.description)}
          </p>

          {exp.techStack && (
            <div className="flex flex-wrap gap-2 mb-4">
              {exp.techStack.slice(0, 3).map((tech: string) => (
                <span 
                  key={tech} 
                  className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
              {exp.techStack.length > 3 && (
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium">
                  +{exp.techStack.length - 3}
                </span>
              )}
            </div>
          )}
          
          {/* Click indicator */}
          <div className={`flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-medium group-hover:gap-3 transition-all duration-300 ${side === 'left' ? 'justify-end' : 'justify-start'}`}>
            <span>{t("View Details", "Lihat Detail")}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Experience: React.FC = () => {
  const { t } = useLanguage();
  const [selectedExp, setSelectedExp] = useState<any>(null);

  const allExperiences = [
    ...workExperience.map(exp => ({ ...exp, type: 'work' })),
    ...organizationExperience.map(exp => ({ ...exp, type: 'organization' }))
  ];

  return (
    <section id="experience" className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-6">
            <Star className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
              {t("Professional Journey", "Perjalanan Profesional")}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t("My Journey", "Perjalanan Saya")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            {t(
              "A timeline of experiences that shaped my professional growth and expertise",
              "Garis waktu pengalaman yang membentuk pertumbuhan profesional dan keahlian saya"
            )}
          </p>
        </motion.div>

        {/* Enhanced Timeline */}
        <motion.div 
          variants={staggerContainer} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="relative wrap overflow-hidden p-10 h-full">
            {/* Enhanced Timeline Line */}
            <div 
              className="absolute border-4 border-gradient-to-b from-emerald-500 via-blue-500 to-emerald-500 h-full opacity-20 rounded-full"
              style={{ left: '50%', transform: 'translateX(-50%)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-500 via-blue-500 to-emerald-500 opacity-50 animate-pulse rounded-full"></div>
            </div>

            {/* Work Experience */}
            {workExperience.map((exp, i) => (
              <TimelineCard 
                key={exp.id} 
                exp={exp} 
                side={i % 2 === 0 ? 'left' : 'right'} 
                icon={<Briefcase size={20} />}
                onClick={() => setSelectedExp(exp)}
              />
            ))}

            {/* Organization Experience */}
            {organizationExperience.map((exp, i) => (
              <TimelineCard 
                key={exp.id} 
                exp={exp} 
                side={i % 2 !== 0 ? 'left' : 'right'} 
                icon={<Users size={20} />}
                onClick={() => setSelectedExp(exp)}
              />
            ))}
          </div>
        </motion.div>

        {/* Enhanced Modal */}
        <AnimatePresence>
          {selectedExp && (
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExp(null)}
            >
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl border border-gray-200 dark:border-gray-700"
                initial={{ scale: 0.7, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.7, opacity: 0, y: 50 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white p-8 rounded-t-3xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
                  <div className="relative z-10 flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{selectedExp.company}</h3>
                      <p className="text-white/90 text-lg">{t(selectedExp.title, selectedExp.titleId || selectedExp.title)}</p>
                      <div className="flex items-center gap-4 text-white/80 text-sm mt-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{selectedExp.period}</span>
                        </div>
                        {selectedExp.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{selectedExp.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <motion.button
                      onClick={() => setSelectedExp(null)}
                      className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X size={20} />
                    </motion.button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-8">
                  {selectedExp.image && (
                    <motion.div
                      className="mb-6 rounded-2xl overflow-hidden shadow-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Image 
                        src={selectedExp.image} 
                        alt={selectedExp.company} 
                        width={600} 
                        height={300} 
                        className="w-full h-48 object-cover"
                      />
                    </motion.div>
                  )}
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-6">
                      {t(selectedExp.description, selectedExp.descriptionId || selectedExp.description)}
                    </p>

                    {selectedExp.techStack && (
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                          {t("Technologies Used", "Teknologi yang Digunakan")}
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {selectedExp.techStack.map((tech: string, index: number) => (
                            <motion.span
                              key={tech}
                              className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.4 + index * 0.1 }}
                              whileHover={{ scale: 1.05 }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};