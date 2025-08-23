"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { aboutHighlights } from '../../data/portfolio';
import { staggerContainer, fadeInUp } from '../../lib/animations';
import { Download, GraduationCap, Briefcase, Trophy, Users, Code, Sparkles } from 'lucide-react';

const iconMap: { [key: string]: React.ReactNode } = {
  'graduation-cap': <GraduationCap size={24} />,
  'briefcase': <Briefcase size={24} />,
  'trophy': <Trophy size={24} />,
  'users': <Users size={24} />,
};

export const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
              {t("Get to Know Me", "Mengenal Saya")}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t("About Me", "Tentang Saya")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            {t(
              "Passionate developer crafting digital experiences with precision and creativity",
              "Developer passionate yang menciptakan pengalaman digital dengan presisi dan kreativitas"
            )}
          </p>
        </motion.div>

        <motion.div 
          className="grid lg:grid-cols-2 gap-16 items-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {/* Enhanced Image Section */}
          <motion.div variants={fadeInUp} className="relative">
            <div className="relative group">
              {/* Animated border */}
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 via-blue-500 to-emerald-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000 animate-pulse"></div>
              
              {/* Image container */}
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-2xl">
                <Image
                  src="/assets/removebg.png"
                  alt="About Rifqi"
                  width={400}
                  height={450}
                  className="rounded-xl w-full object-cover"
                />
                
                {/* Floating elements */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg animate-bounce">
                  <Code size={20} />
                </div>
                <div className="absolute bottom-4 left-4 px-3 py-2 bg-white dark:bg-gray-800 rounded-full shadow-lg">
                  <span className="text-emerald-500 font-bold text-sm">3.37 GPA</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Content Section */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"></span>
                {t("My Journey in Technology", "Perjalanan Saya di Teknologi")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                {t(
                  "I am a dedicated Informatics student at Del Institute of Technology with a GPA of 3.37/4.00, expected to graduate in 2025. My journey in technology has been an exciting exploration, from experimenting with code as a curious teenager to becoming a seasoned Web and Mobile Programmer with hands-on industry experience.",
                  "Saya adalah mahasiswa Informatika yang berdedikasi di Institut Teknologi Del dengan IPK 3.37/4.00, diharapkan lulus pada tahun 2025. Perjalanan saya di bidang teknologi telah menjadi eksplorasi yang menarik, dari bereksperimen dengan kode sebagai remaja yang penasaran hingga menjadi Programmer Web dan Mobile yang berpengalaman dengan pengalaman industri langsung."
                )}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 py-6">
              <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
                <div className="text-3xl font-bold text-emerald-600 mb-1">2+</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  {t("Years Experience", "Tahun Pengalaman")}
                </div>
              </div>
              <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
                <div className="text-3xl font-bold text-blue-600 mb-1">15+</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  {t("Projects Completed", "Projek Diselesaikan")}
                </div>
              </div>
            </div>

            {/* Highlights Grid with improved design */}
            <div className="grid sm:grid-cols-2 gap-4">
              {aboutHighlights.map((highlight, index) => (
                <motion.div 
                  key={index}
                  variants={fadeInUp}
                  className="group flex items-start gap-4 p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-glow hover:-translate-y-2 transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    {iconMap[highlight.icon]}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                      {t(highlight.title, highlight.titleId)}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {t(highlight.description, highlight.descriptionId)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Enhanced Download CV Button */}
            <motion.div className="pt-4">
              <Link
                href="/assets/CV Rifqi Haikal Chairiansyah.pdf"
                download
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-full font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-glow shadow-lg overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <Download size={20} className="group-hover:animate-bounce" />
                <span>{t("Download CV", "Unduh CV")}</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
