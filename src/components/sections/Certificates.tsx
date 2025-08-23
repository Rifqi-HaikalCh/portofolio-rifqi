'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { certificateCategories } from '../../data/portfolio';
import { ChevronDown, Award, FileText, Trophy, Code, Users, Briefcase } from 'lucide-react';
import { AnimatedSectionTitle } from '../shared/AnimatedSectionTitle';
import { staggerContainer, fadeInUp } from '../../lib/animations';

const categoryIcons: { [key: string]: React.ReactNode } = {
  'code': <Code size={24} />,
  'trophy': <Trophy size={24} />,
  'users': <Users size={24} />,
  'briefcase': <Briefcase size={24} />,
};

export const Certificates: React.FC = () => {
  const { t } = useLanguage();
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <section id="certificates" className="py-20 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Clean Background */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSectionTitle
          badge="Professional Growth"
          badgeIcon={<Award className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />}
          title={t("Certificates & Achievements", "Sertifikat & Prestasi") as string}
          subtitle={t(
            "Click on each category to explore my professional certifications and achievements organized by type",
            "Klik pada setiap kategori untuk menjelajahi sertifikasi profesional dan pencapaian saya yang diorganisir berdasarkan jenis"
          ) as string}
        />

        <motion.div 
          className="max-w-5xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {certificateCategories.map((category, index) => (
            <motion.div
              key={category.id}
              variants={fadeInUp}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-glow transition-all duration-500 mb-6 overflow-hidden border border-gray-200/50 dark:border-gray-700/50"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Enhanced Category Header */}
              <motion.div
                onClick={() => toggleCategory(category.id)}
                className="bg-gradient-to-r from-emerald-500 via-blue-500 to-emerald-600 text-white p-8 cursor-pointer relative overflow-hidden"
                whileHover={{ 
                  background: "linear-gradient(90deg, #059669 0%, #3B82F6 50%, #059669 100%)",
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.995 }}
              >
                {/* Animated background shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                
                <div className="relative z-10 flex justify-between items-center">
                  <div className="flex items-center gap-6">
                    <motion.div
                      className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {categoryIcons[category.icon]}
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold mb-1">
                        {t(category.title, category.titleId)}
                      </h3>
                      <p className="text-white/80 text-sm">
                        {t("Click to explore certificates", "Klik untuk lihat sertifikat")}
                      </p>
                    </div>
                    <motion.span 
                      className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-lg font-bold border border-white/30"
                      whileHover={{ scale: 1.05 }}
                    >
                      {category.count}
                    </motion.span>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedCategories.includes(category.id) ? 180 : 0 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                  >
                    <ChevronDown size={28} className="text-white/80" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Enhanced Certificates Grid */}
              <AnimatePresence>
                {expandedCategories.includes(category.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-8">
                      <motion.div 
                        className="grid md:grid-cols-2 gap-6"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="show"
                      >
                        {category.certificates.map((cert, certIndex) => (
                          <motion.div
                            key={cert.id}
                            variants={fadeInUp}
                            className="group bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-600/50 hover:border-emerald-500/50 transition-all duration-300 relative overflow-hidden"
                            whileHover={{ 
                              scale: 1.03, 
                              y: -8,
                              transition: { type: "spring", stiffness: 300, damping: 20 }
                            }}
                          >
                            {/* Card glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            {/* Certificate icon */}
                            <div className="absolute top-4 right-4 w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">
                              <Award size={20} className="text-emerald-600 dark:text-emerald-400" />
                            </div>
                            
                            <div className="relative z-10">
                              <h4 className="text-emerald-600 dark:text-emerald-400 font-bold text-lg mb-3 group-hover:text-emerald-500 transition-colors">
                                {t(cert.title, cert.titleId || cert.title)}
                              </h4>
                              <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 leading-relaxed">
                                {t(cert.description, cert.descriptionId || cert.description)}
                              </p>
                              
                              <motion.a
                                href={cert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-full text-sm font-semibold hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-glow"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <FileText size={16} />
                                {t("View Certificate", "Lihat Sertifikat")}
                              </motion.a>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};