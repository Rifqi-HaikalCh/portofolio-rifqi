"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { aboutHighlights } from '../../data/portfolio';
import { staggerContainer, fadeInUp } from '../../lib/animations';
import { Download, GraduationCap, Briefcase, Trophy, Users, Code, Sparkles } from 'lucide-react';
import { AnimatedSectionTitle } from '../shared/AnimatedSectionTitle';
import { AboutText } from '../shared/HighlightedText';

const iconMap: { [key: string]: React.ReactNode } = {
  'graduation-cap': <GraduationCap size={24} />,
  'briefcase': <Briefcase size={24} />,
  'trophy': <Trophy size={24} />,
  'users': <Users size={24} />,
};

export const About: React.FC = () => {
  const { t, language } = useLanguage();
  const highlightedText = AboutText();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const totalImages = 11;

  // Auto-slide carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % totalImages);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Clean Background */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSectionTitle
          badge={t("Get to Know Me", "Mengenal Saya") as string}
          badgeIcon={<Sparkles className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />}
          title={t("About Me", "Tentang Saya") as string}
          subtitle={t(
            "Passionate developer crafting digital experiences with precision and creativity",
            "Developer passionate yang menciptakan pengalaman digital dengan presisi dan kreativitas"
          ) as string}
        />

        <motion.div 
          className="space-y-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {/* First Row: Image and Journey Text */}
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Expert Image Section */}
            <motion.div variants={fadeInUp} className="relative lg:order-1">
              <div className="relative group perspective-1000">
                {/* Multiple animated borders with different effects */}
                <div className="absolute -inset-6 bg-gradient-to-r from-emerald-500 via-blue-500 via-purple-500 to-emerald-500 rounded-[2rem] blur-lg opacity-30 group-hover:opacity-50 transition duration-1000 animate-gradient-bg"></div>
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-emerald-500 to-blue-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 animate-pulse"></div>
                
                {/* Enhanced Image container with 3D effect */}
                <motion.div 
                  className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-2 shadow-2xl backdrop-blur-sm border border-white/20 dark:border-gray-600/20 max-w-sm mx-auto"
                  whileHover={{ 
                    rotateY: 5,
                    rotateX: 5,
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                  }}
                  style={{
                    transformStyle: "preserve-3d"
                  }}
                >
                  {/* Glassmorphism overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5 rounded-3xl"></div>
                  
                  <Image
                    src="/assets/removebg.png"
                    alt="About Rifqi"
                    width={180}
                    height={220}
                    className="rounded-2xl w-full object-cover shadow-lg"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Expert Content Section */}
            <motion.div variants={fadeInUp} className="space-y-8 lg:order-2">
              <div className="relative">
                {/* Animated accent line */}
                <motion.div 
                  className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 via-blue-500 to-purple-500 rounded-full"
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  viewport={{ once: true }}
                ></motion.div>
                
                <motion.h3 
                  className="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {t("My Journey in Technology", "Perjalanan Saya di Teknologi")}
                  </span>
                </motion.h3>
                
                <motion.p 
                  className="text-gray-600 dark:text-gray-300 text-xl leading-relaxed mb-8"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  {language === 'en' ? highlightedText.en : highlightedText.id}
                </motion.p>
              </div>
            </motion.div>
          </div>

          {/* Second Row: Stats and Highlights */}
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            {/* Enhanced Stats Grid with animations */}
            <motion.div variants={fadeInUp} className="space-y-8">
              <div className="grid grid-cols-2 gap-8 py-8">
                <motion.div 
                  className="group text-center p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30 rounded-3xl backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-700/50 shadow-lg hover:shadow-glow transition-all duration-500"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div 
                    className="text-4xl lg:text-5xl font-extrabold text-emerald-600 mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.8 }}
                    viewport={{ once: true }}
                  >
                    2+
                  </motion.div>
                  <div className="text-gray-600 dark:text-gray-300 font-semibold">
                    {t("Years Experience", "Tahun Pengalaman")}
                  </div>
                  <div className="mt-2 w-full h-1 bg-emerald-200 dark:bg-emerald-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1.5, delay: 1 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
                
                <motion.div 
                  className="group text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-3xl backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50 shadow-lg hover:shadow-glow transition-all duration-500"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div 
                    className="text-4xl lg:text-5xl font-extrabold text-blue-600 mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, delay: 1 }}
                    viewport={{ once: true }}
                  >
                    15+
                  </motion.div>
                  <div className="text-gray-600 dark:text-gray-300 font-semibold">
                    {t("Projects Completed", "Projek Diselesaikan")}
                  </div>
                  <div className="mt-2 w-full h-1 bg-blue-200 dark:bg-blue-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1.5, delay: 1.2 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Expert Highlights Grid */}
            <motion.div 
              className="grid sm:grid-cols-2 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {aboutHighlights.map((highlight, index) => (
                <motion.div 
                  key={index}
                  variants={fadeInUp}
                  className="group relative flex items-start gap-5 p-8 bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-800/90 dark:to-gray-800/70 backdrop-blur-md rounded-3xl shadow-xl hover:shadow-glow border border-gray-200/30 dark:border-gray-700/30 overflow-hidden transition-all duration-500"
                  whileHover={{ 
                    scale: 1.03, 
                    y: -8,
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Enhanced icon with multiple effects */}
                  <motion.div 
                    className="relative w-16 h-16 bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-xl"
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.3 }
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/50 to-blue-400/50 rounded-2xl blur-sm"></div>
                    <div className="relative z-10">
                      {iconMap[highlight.icon]}
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
                  </motion.div>
                  
                  <div className="relative z-10 flex-1">
                    <motion.h4 
                      className="font-bold text-xl text-gray-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {t(highlight.title, highlight.titleId)}
                    </motion.h4>
                    <motion.p 
                      className="text-gray-600 dark:text-gray-400 leading-relaxed"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                      viewport={{ once: true }}
                    >
                      {t(highlight.description, highlight.descriptionId)}
                    </motion.p>
                    
                    {/* Progress indicator */}
                    <div className="mt-4 w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 1.5, delay: index * 0.2 + 0.8 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Interactive Image Carousel */}
          <motion.div 
            className="relative max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-2">
              {/* Enhanced carousel container */}
              <motion.div 
                className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                {/* Image carousel with Ken Burns effect */}
                {Array.from({ length: 11 }, (_, i) => i + 1).map((num, index) => (
                  <motion.div
                    key={num}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: index === currentImageIndex ? 1 : 0,
                      scale: index === currentImageIndex ? [1, 1.1, 1] : 1,
                      x: index === currentImageIndex ? [0, -10, 10, 0] : 0
                    }}
                    transition={{
                      opacity: { duration: 1.5, ease: "easeInOut" },
                      scale: { 
                        duration: 5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      },
                      x: {
                        duration: 5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }
                    }}
                    style={{
                      backgroundImage: `url(/assets/${num}.png)`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  >
                    {/* Gradient overlays for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-blue-500/10"></div>
                    
                    {/* Shimmer effect on active image */}
                    {index === currentImageIndex && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    )}
                  </motion.div>
                ))}

                {/* Interactive Floating indicators */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
                  {Array.from({ length: 11 }, (_, i) => (
                    <motion.div
                      key={i}
                      className="cursor-pointer"
                      onClick={() => setCurrentImageIndex(i)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <motion.div
                        className="w-3 h-3 rounded-full backdrop-blur-sm shadow-lg border border-white/30"
                        animate={{
                          scale: i === currentImageIndex ? [1, 1.4, 1] : 1,
                          backgroundColor: i === currentImageIndex ? "rgba(16, 185, 129, 0.9)" : "rgba(255, 255, 255, 0.6)",
                          boxShadow: i === currentImageIndex 
                            ? [
                                "0 0 10px rgba(16, 185, 129, 0.6)",
                                "0 0 20px rgba(16, 185, 129, 0.8)",
                                "0 0 10px rgba(16, 185, 129, 0.6)"
                              ] 
                            : "0 4px 8px rgba(0, 0, 0, 0.1)"
                        }}
                        transition={{
                          duration: 0.3,
                          boxShadow: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }
                        }}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Decorative elements */}
                <motion.div 
                  className="absolute top-6 right-6 w-16 h-16 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full backdrop-blur-sm border border-white/30 flex items-center justify-center z-20"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full opacity-70"></div>
                </motion.div>

                {/* Auto-slide animation logic */}
                <motion.div
                  className="absolute inset-0 pointer-events-none z-10"
                  animate={{
                    background: [
                      "linear-gradient(45deg, transparent, rgba(16, 185, 129, 0.1), transparent)",
                      "linear-gradient(225deg, transparent, rgba(59, 130, 246, 0.1), transparent)",
                      "linear-gradient(45deg, transparent, rgba(16, 185, 129, 0.1), transparent)"
                    ]
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>

              {/* Carousel caption */}
              <motion.div 
                className="absolute bottom-8 left-8 right-8 text-center z-20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                viewport={{ once: true }}
              >
                <motion.p 
                  className="text-white/90 text-lg font-semibold tracking-wide drop-shadow-lg backdrop-blur-sm bg-black/20 rounded-full px-6 py-2 inline-block"
                  animate={{
                    textShadow: [
                      "0 0 10px rgba(16, 185, 129, 0.5)",
                      "0 0 20px rgba(59, 130, 246, 0.5)",
                      "0 0 10px rgba(16, 185, 129, 0.5)"
                    ]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {t("Project Journey & Achievements", "Perjalanan Projek & Pencapaian")}
                </motion.p>
              </motion.div>
            </div>
          </motion.div>

          {/* Third Row: Download Buttons */}
          <div className="flex justify-center">
            <motion.div 
              className="pt-8 flex flex-col sm:flex-row gap-6 items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            >
              {/* CV Download Button */}
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Link
                  href="/assets/CV Rifqi Haikal Chairiansyah.pdf"
                  download
                  className="group relative inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 text-white rounded-full font-bold text-lg transition-all duration-500 hover:shadow-glow shadow-2xl overflow-hidden"
                >
                  {/* Multiple shimmer effects */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Enhanced icon with animation */}
                  <motion.div
                    animate={{
                      y: [0, -2, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="relative z-10"
                  >
                    <Download size={24} className="group-hover:rotate-12 transition-transform duration-300" />
                  </motion.div>
                  
                  <span className="relative z-10 tracking-wider">
                    {t("Download CV", "Unduh CV")}
                  </span>
                  
                  {/* Floating particles effect */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/60 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                </Link>
              </motion.div>

              {/* Portfolio Design Download Button */}
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20,
                  duration: 0.8, 
                  delay: 1 
                }}
              >
                <Link
                  href="/assets/Portfolio Design.pdf"
                  download
                  className="group relative inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-600 text-white rounded-full font-bold text-lg transition-all duration-500 hover:shadow-glow shadow-2xl overflow-hidden border-2 border-white/20 hover:border-white/40"
                >
                  {/* Multiple shimmer effects with different colors */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-rose-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Enhanced icon with different animation */}
                  <motion.div
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="relative z-10"
                  >
                    <Code size={24} className="group-hover:rotate-45 transition-transform duration-300" />
                  </motion.div>
                  
                  <span className="relative z-10 tracking-wider">
                    {t("Portfolio Design", "Desain Portofolio")}
                  </span>
                  
                  {/* Different floating particles effect */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <motion.div 
                      className="w-2 h-2 bg-pink-300/60 rounded-full opacity-0 group-hover:opacity-100"
                      animate={{
                        scale: [0, 1.5, 0],
                        rotate: [0, 180, 360]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeOut"
                      }}
                    />
                  </div>
                  
                  {/* Additional decorative elements */}
                  <div className="absolute -top-1 -left-1 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 animate-bounce transition-opacity duration-300"></div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full opacity-0 group-hover:opacity-100 animate-bounce transition-opacity duration-300 delay-100"></div>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};