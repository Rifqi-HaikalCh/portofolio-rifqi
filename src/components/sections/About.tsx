"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { aboutHighlights } from '../../data/portfolio';
import { 
  premiumStagger, 
  optimizedFadeIn, 
  sectionEntrance, 
  cardReveal,
  premiumHover,
  glowPulse 
} from '../../lib/optimized-animations';
import { 
  Download, 
  GraduationCap, 
  Briefcase, 
  Trophy, 
  Users, 
  Code, 
  Sparkles,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { AnimatedSectionTitle } from '../shared/AnimatedSectionTitle';
import { AboutText } from '../shared/HighlightedText';

const iconMap: { [key: string]: React.ReactNode } = {
  'graduation-cap': <GraduationCap size={20} />,
  'briefcase': <Briefcase size={20} />,
  'trophy': <Trophy size={20} />,
  'users': <Users size={20} />,
};

export const About: React.FC = () => {
  const { t, language } = useLanguage();
  const highlightedTextData = AboutText();
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const stats = [
    { 
      number: "50+", 
      label: t("Projects Completed", "Proyek Diselesaikan"),
      description: t("From web apps to mobile solutions", "Dari aplikasi web hingga solusi mobile")
    },
    { 
      number: "3+", 
      label: t("Years Experience", "Tahun Pengalaman"),
      description: t("Building digital experiences", "Membangun pengalaman digital")
    },
    { 
      number: "15+", 
      label: t("Technologies Mastered", "Teknologi Dikuasai"),
      description: t("Modern tech stack expertise", "Keahlian teknologi modern")
    }
  ];

  return (
    <section 
      id="about" 
      className="py-20 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden"
    >
      {/* Sophisticated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/8 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/6 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1.1, 1, 1.1]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {/* Geometric accent */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-emerald-500/20 via-emerald-500/40 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSectionTitle
          badge={t("Get to Know Me", "Mengenal Saya") as string}
          badgeIcon={<Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
          title={t("About Me", "Tentang Saya") as string}
          subtitle={t(
            "Passionate developer crafting digital experiences with precision and creativity",
            "Developer passionate yang menciptakan pengalaman digital dengan presisi dan kreativitas"
          ) as string}
        />

        <motion.div 
          className="mt-20 space-y-32"
          variants={premiumStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Hero Section - Profile + Stats */}
          <motion.div 
            className="grid lg:grid-cols-12 gap-12 items-center"
            variants={sectionEntrance}
          >
            {/* Profile Image */}
            <div className="lg:col-span-5 flex justify-center">
              <motion.div 
                className="relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Modern Frame */}
                <div className="relative w-80 h-96 bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-1 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  {/* Clean image container */}
                  <div className="relative w-full h-full bg-white dark:bg-gray-800 rounded-[1.4rem] overflow-hidden">
                    <Image
                      src="/assets/removebg.png"
                      alt="Rifqi Haikal - Developer"
                      fill
                      className="object-cover object-center"
                      style={{ objectPosition: 'center top' }}
                      priority
                    />
                    
                    {/* Subtle overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  {/* Floating badges */}
                  <motion.div
                    className="absolute -top-4 -right-4 bg-emerald-500 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    Available
                  </motion.div>
                  
                  <motion.div
                    className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-2xl text-sm font-semibold shadow-xl border border-gray-200 dark:border-gray-600"
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                  >
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                      Active
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Profile Content */}
            <div className="lg:col-span-7 space-y-8">
              <motion.div
                variants={optimizedFadeIn}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <motion.h2 
                    className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    Hi, I'm{' '}
                    <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Rifqi Haikal
                    </span>
                  </motion.h2>
                  
                  <motion.div 
                    className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    {language === 'en' ? highlightedTextData.en : highlightedTextData.id}
                  </motion.div>
                </div>

                {/* CTA Buttons */}
                <motion.div 
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <motion.a
                    href="/assets/CV Rifqi Haikal Chairiansyah.pdf"
                    download
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={premiumHover}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download size={18} />
                    {t("Download CV", "Unduh CV")}
                  </motion.a>
                  
                  <motion.button
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-600 rounded-2xl font-semibold hover:border-emerald-500 dark:hover:border-emerald-400 transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t("Get in Touch", "Hubungi Saya")}
                    <ChevronRight size={18} />
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Stats Grid */}
              <motion.div 
                className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200 dark:border-gray-700"
                variants={premiumStagger}
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={cardReveal}
                    className="text-center space-y-2"
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <motion.h3 
                      className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent"
                      animate={glowPulse}
                    >
                      {stat.number}
                    </motion.h3>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm lg:text-base">
                      {stat.label}
                    </p>
                    <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                      {stat.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Expertise Cards */}
          <motion.div 
            className="space-y-8"
            variants={sectionEntrance}
          >
            <motion.h3 
              className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {t("My Expertise", "Keahlian Saya")}
            </motion.h3>

            <div className="grid md:grid-cols-2 gap-6">
              {aboutHighlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  variants={cardReveal}
                  className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 cursor-pointer"
                  onHoverStart={() => setActiveCard(index)}
                  onHoverEnd={() => setActiveCard(null)}
                  whileHover={{ scale: 1.02, y: -8 }}
                  style={{ 
                    willChange: 'transform', 
                    backfaceVisibility: 'hidden' 
                  }}
                >
                  {/* Background gradient on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-blue-500/5 to-purple-500/5 rounded-3xl transition-opacity duration-500 ${activeCard === index ? 'opacity-100' : 'opacity-0'}`} />
                  
                  <div className="relative z-10 flex items-start gap-6">
                    {/* Icon */}
                    <motion.div 
                      className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    >
                      {iconMap[highlight.icon]}
                    </motion.div>
                    
                    <div className="flex-1 space-y-3">
                      <h4 className="font-bold text-xl text-gray-900 dark:text-white">
                        {t(highlight.title, highlight.titleId)}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {t(highlight.description, highlight.descriptionId)}
                      </p>
                      
                      {/* Progress bar */}
                      <div className="pt-2">
                        <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-emerald-500 to-blue-500"
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            transition={{ 
                              duration: 1.5, 
                              delay: index * 0.2 + 0.5,
                              ease: "easeOut"
                            }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    </div>

                    <motion.div
                      className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      animate={{ x: activeCard === index ? [0, 5, 0] : 0 }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <ExternalLink size={16} />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};