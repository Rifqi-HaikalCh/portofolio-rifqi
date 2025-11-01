"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { aboutHighlights } from '../../data/portfolio';
import ProfileCard from '../shared/ProfileCard';
import PortfolioFigmaCard from '../shared/PortfolioFigmaCard';
import VariableProximity from '../shared/VariableProximity';
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

const iconMap: { [key: string]: React.ReactNode } = {
  'graduation-cap': <GraduationCap size={20} />,
  'briefcase': <Briefcase size={20} />,
  'trophy': <Trophy size={20} />,
  'users': <Users size={20} />,
};

export const About: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const totalImages = 11;
  const descriptionContainerRef = useRef<HTMLDivElement>(null);

  // Auto-slide carousel every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % totalImages);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { 
      number: "10+", 
      label: t("Projects Completed", "Proyek Diselesaikan"),
      description: t("From concept to technology solutions", "Dari konsep hingga solusi teknologi")
    },
    { 
      number: "2+", 
      label: t("Years Experience", "Tahun Pengalaman"),
      description: t("Development and Design", "Pengembangan dan Desain")
    },
    { 
      number: "10+", 
      label: t("Technologies Mastered", "Teknologi Dikuasai"),
      description: t("Modern tech stack expertise", "Keahlian teknologi modern")
    }
  ];

  return (
    <section 
      id="about" 
      className="py-20 bg-gradient-to-b from-bg-primary to-bg-tertiary relative overflow-hidden"
    >
      {/* Sophisticated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-accent-500/8 rounded-full blur-3xl"
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
          className="absolute bottom-20 right-10 w-96 h-96 bg-primary-500/6 rounded-full blur-3xl"
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
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-accent-500/20 via-accent-500/40 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSectionTitle
          badge={t("Get to Know Me", "Mengenal Saya") as string}
          badgeIcon={<Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
          title={t("About Me", "Tentang Saya") as string}
          subtitle={t(
            "A creative developer who translates complex logic into beautiful and intuitive digital experiences",
            "Seorang developer kreatif yang mengubah logika kompleks menjadi pengalaman digital yang indah dan intuitif."
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
            className="grid grid-cols-12 gap-12 items-center"
            variants={sectionEntrance}
          >
            {/* Profile Card - React Bits Animated Card */}
            <div className="col-span-5 flex justify-center">
              <ProfileCard
                avatarUrl="/assets/removebg.webp"
                miniAvatarUrl="/assets/removebg.webp"
                name="Rifqi Haikal"
                title={t("Software Engineer & UI/UX Designer", "Software Engineer & UI/UX Designer") as string}
                handle="rifqihaikal"
                status={t("Available for Work", "Tersedia untuk Bekerja") as string}
                contactText={t("Contact Me", "Hubungi Saya") as string}
                showUserInfo={true}
                enableTilt={true}
                showBehindGradient={true}
                behindGradient="radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y),hsla(160,100%,90%,var(--card-opacity)) 4%,hsla(160,50%,80%,calc(var(--card-opacity)*0.75)) 10%,hsla(160,25%,70%,calc(var(--card-opacity)*0.5)) 50%,hsla(160,0%,60%,0) 100%),radial-gradient(35% 52% at 55% 20%,#10b981c4 0%,#073aff00 100%),radial-gradient(100% 100% at 50% 50%,#3b82f6ff 1%,#073aff00 76%),conic-gradient(from 124deg at 50% 50%,#8b5cf6ff 0%,#06b6d4ff 40%,#06b6d4ff 60%,#8b5cf6ff 100%)"
                innerGradient="linear-gradient(145deg,#1f2937cc 0%,#059669aa 100%)"
                onContactClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              />
            </div>

            {/* Profile Content */}
            <div className="col-span-7 space-y-8">
              <motion.div
                variants={optimizedFadeIn}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <motion.h2
                    className="text-5xl font-bold text-gray-900 dark:text-white leading-tight"
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
                    ref={descriptionContainerRef}
                    className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    style={{ position: 'relative' }}
                  >
                    <VariableProximity
                      label={
                        language === 'en'
                          ? "A creative UI/UX Designer and Web Developer passionate about building engaging digital experiences. With two years of hands-on experience, I have developed technical and creative solutions as a Freelancer and in professional roles at a leading IT consultant and a Multi-finance company. As a Bachelor of Informatics from Institut Teknologi Del, I am constantly exploring new technologies and am eager to apply my skills at the intersection of design and development in a dynamic team."
                          : "Seorang UI/UX Designer dan Web Developer kreatif yang passionate dalam membangun pengalaman digital yang menarik. Dengan dua tahun pengalaman hands-on, saya telah mengembangkan solusi teknis dan kreatif sebagai Freelancer dan dalam peran profesional di konsultan IT terkemuka dan perusahaan Multi-finance. Sebagai Sarjana Informatika dari Institut Teknologi Del, saya terus mengeksplorasi teknologi baru dan bersemangat untuk menerapkan keterampilan saya di persimpangan desain dan pengembangan dalam tim yang dinamis."
                      }
                      fromFontVariationSettings="'wght' 400, 'opsz' 9"
                      toFontVariationSettings="'wght' 800, 'opsz' 36"
                      containerRef={descriptionContainerRef}
                      radius={120}
                      falloff="exponential"
                      className="variable-proximity-about"
                      style={{ fontSize: '1.25rem', lineHeight: '1.8' }}
                    />
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
                      className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent"
                      animate={glowPulse}
                    >
                      {stat.number}
                    </motion.h3>
                    <p className="font-semibold text-gray-900 dark:text-white text-base">
                      {stat.label}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Portfolio Carousel */}
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
              {t("My Portfolio", "Portofolio Saya")}
            </motion.h3>

            {/* Portfolio Figma Card */}
            <motion.div
              className="relative max-w-4xl mx-auto mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <PortfolioFigmaCard />
            </motion.div>
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

            <div className="grid grid-cols-2 gap-6">
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