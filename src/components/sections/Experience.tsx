'use client';

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext'; //
import { workExperience, organizationExperience } from '../../data/portfolio';
import { Briefcase, Users, Calendar, MapPin, X, Star, ArrowRight } from 'lucide-react';
import { staggerContainer, fadeInUp } from '../../lib/animations';
import { AnimatedSectionTitle } from '../shared/AnimatedSectionTitle';

// Desktop Timeline Card Component
const DesktopTimelineCard = ({ exp, side, icon, onClick }: { 
  exp: any, 
  side: 'left' | 'right', 
  icon: React.ReactNode,
  onClick: () => void 
}) => {
  const { language } = useLanguage(); // UBAH INI
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
              {language === 'en' ? exp.title : (exp.titleId || exp.title)} {/* UBAH INI */}
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
            {language === 'en' ? exp.description : (exp.descriptionId || exp.description)} {/* UBAH INI */}
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
            <span>{language === 'en' ? "View Details" : "Lihat Detail"}</span> {/* UBAH INI */}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Mobile Timeline Card Component
const MobileTimelineCard = ({ exp, icon, onClick, index }: { 
  exp: any, 
  icon: React.ReactNode,
  onClick: () => void,
  index: number
}) => {
  const { language } = useLanguage(); // UBAH INI
  
  return (
    <motion.div 
      variants={fadeInUp}
      className="relative mb-8 group cursor-pointer"
      onClick={onClick}
    >
      {/* Mobile Timeline Connection */}
      <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 to-blue-500 opacity-30"></div>
      
      <div className="flex items-start gap-6">
        {/* Mobile Timeline Icon */}
        <motion.div 
          className="relative z-10 flex items-center justify-center bg-gradient-to-br from-emerald-500 to-blue-500 shadow-xl w-16 h-16 rounded-2xl text-white border-4 border-white dark:border-gray-800 flex-shrink-0 group-hover:scale-110 transition-all duration-300"
          whileHover={{ 
            scale: 1.15, 
            rotate: [0, -5, 5, 0],
            transition: { duration: 0.3 }
          }}
        >
          <div className="relative">
            {icon}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
        </motion.div>
        
        {/* Mobile Experience Card */}
        <motion.div 
          className="flex-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-gray-200/50 dark:border-gray-700/50 group-hover:shadow-glow transition-all duration-500 relative overflow-hidden"
          whileHover={{ 
            scale: 1.02,
            y: -5,
            transition: { type: "spring", stiffness: 300, damping: 20 }
          }}
        >
          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-1 rounded-full">
                  #{index + 1}
                </span>
              </div>
            </div>
            
            <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
              {language === 'en' ? exp.title : (exp.titleId || exp.title)} {/* UBAH INI */}
            </h4>
            
            <h5 className="text-emerald-600 dark:text-emerald-400 font-semibold mb-3 text-base">
              {exp.company}
            </h5>
            
            <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{exp.period}</span>
              </div>
              {exp.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{exp.location}</span>
                </div>
              )}
            </div>
            
            <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
              {language === 'en' ? exp.description : (exp.descriptionId || exp.description)} {/* UBAH INI */}
            </p>

            {exp.techStack && (
              <div className="flex flex-wrap gap-2 mb-4">
                {exp.techStack.slice(0, 4).map((tech: string) => (
                  <span 
                    key={tech} 
                    className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
                {exp.techStack.length > 4 && (
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium">
                    +{exp.techStack.length - 4}
                  </span>
                )}
              </div>
            )}
            
            {/* Click indicator */}
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-medium group-hover:gap-3 transition-all duration-300">
              <span>{language === 'en' ? "Tap for Details" : "Ketuk untuk Detail"}</span> {/* UBAH INI */}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Enhanced Modal Component with Portal
const ExperienceModal = ({ selectedExp, onClose }: { selectedExp: any, onClose: () => void }) => {
  const { language } = useLanguage(); // UBAH INI
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    if (selectedExp) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedExp]);

  if (!selectedExp || !isBrowser) return null;

  const modalContent = (
    <motion.div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
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
              <p className="text-white/90 text-lg">{language === 'en' ? selectedExp.title : (selectedExp.titleId || selectedExp.title)}</p> {/* UBAH INI */}
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
              onClick={onClose}
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
              className="mb-6 rounded-2xl overflow-hidden shadow-lg relative h-48"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Image
                src={selectedExp.image}
                alt={selectedExp.company}
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
                priority
              />
            </motion.div>
          )}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-6">
              {language === 'en' ? selectedExp.description : (selectedExp.descriptionId || selectedExp.description)} {/* UBAH INI */}
            </p>

            {selectedExp.techStack && (
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  {language === 'en' ? "Technologies Used" : "Teknologi yang Digunakan"} {/* UBAH INI */}
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
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export const Experience: React.FC = () => {
  const { language } = useLanguage(); // UBAH INI
  const [selectedExp, setSelectedExp] = useState<any>(null);

  const allExperiences = [
    ...workExperience.map(exp => ({ ...exp, type: 'work' })),
    ...organizationExperience.map(exp => ({ ...exp, type: 'organization' }))
  ];

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      {/* Clean Background */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <AnimatedSectionTitle
          badge={language === 'en' ? "Professional Journey" : "Perjalanan Profesional"} // UBAH INI
          badgeIcon={<Star className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />}
          title={language === 'en' ? "My Journey" : "Perjalanan Saya"} // UBAH INI
          subtitle={language === 'en' // UBAH INI
            ? "A timeline of experiences that shaped my professional growth and expertise"
            : "Garis waktu pengalaman yang membentuk pertumbuhan profesional dan keahlian saya"
          }
        />

        {/* Responsive Timeline */}
        <motion.div 
          variants={staggerContainer} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Desktop Timeline */}
          <div className="block relative wrap overflow-hidden p-10 h-full">
            {/* Enhanced Timeline Line */}
            <div 
              className="absolute border-4 border-gradient-to-b from-emerald-500 via-blue-500 to-emerald-500 h-full opacity-20 rounded-full"
              style={{ left: '50%', transform: 'translateX(-50%)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-500 via-blue-500 to-emerald-500 opacity-50 animate-pulse rounded-full"></div>
            </div>

            {/* Work Experience */}
            {workExperience.map((exp, i) => (
              <DesktopTimelineCard 
                key={exp.id} 
                exp={exp} 
                side={i % 2 === 0 ? 'left' : 'right'} 
                icon={<Briefcase size={20} />}
                onClick={() => setSelectedExp(exp)}
              />
            ))}

            {/* Organization Experience */}
            {organizationExperience.map((exp, i) => (
              <DesktopTimelineCard 
                key={exp.id} 
                exp={exp} 
                side={i % 2 !== 0 ? 'left' : 'right'} 
                icon={<Users size={20} />}
                onClick={() => setSelectedExp(exp)}
              />
            ))}
          </div>
          
          {/* Mobile Timeline */}
          <div className="hidden px-4">
            {/* Mobile Section Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Briefcase size={16} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {language === 'en' ? "Work Experience" : "Pengalaman Kerja"} {/* UBAH INI */}
                </h3>
              </div>
              
              {/* Work Experience Cards */}
              <div className="space-y-6">
                {workExperience.map((exp, i) => (
                  <MobileTimelineCard 
                    key={exp.id} 
                    exp={exp} 
                    icon={<Briefcase size={18} />}
                    onClick={() => setSelectedExp(exp)}
                    index={i}
                  />
                ))}
              </div>
            </div>
            
            {/* Organization Experience Section */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Users size={16} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {language === 'en' ? "Organization Experience" : "Pengalaman Organisasi"} {/* UBAH INI */}
                </h3>
              </div>
              
              {/* Organization Experience Cards */}
              <div className="space-y-6">
                {organizationExperience.map((exp, i) => (
                  <MobileTimelineCard 
                    key={exp.id} 
                    exp={exp} 
                    icon={<Users size={18} />}
                    onClick={() => setSelectedExp(exp)}
                    index={i}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Portal-Based Modal */}
        <AnimatePresence>
          {selectedExp && (
            <ExperienceModal
              selectedExp={selectedExp}
              onClose={() => setSelectedExp(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};