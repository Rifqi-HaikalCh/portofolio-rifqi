'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { useLanguage } from '../../context/LanguageContext';
import { typingTexts, contactInfo } from '../../data/portfolio';
import { staggerContainer, fadeInUp } from '../../lib/animations';
import ParticlesBackground from '../shared/ParticlesBackground';

const Hero: React.FC = () => {
  const { language, t } = useLanguage();

  const socialIcons = [
    { href: `mailto:${contactInfo.email}`, icon: 'fas fa-envelope' },
    { href: contactInfo.linkedin, icon: 'fab fa-linkedin-in' },
    { href: contactInfo.github, icon: 'fab fa-github' },
    { href: contactInfo.whatsapp, icon: 'fab fa-whatsapp' },
  ];

  return (
    <motion.section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      <ParticlesBackground />
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10 dark:from-emerald-500/5 dark:via-transparent dark:to-blue-500/5"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.h1 variants={fadeInUp} className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-8 leading-tight text-gray-900 dark:text-white">
          {t("Hi, I'm ", "Halo, Saya ")}
          <span className="bg-gradient-to-r from-emerald-500 to-blue-600 bg-clip-text text-transparent">
            Rifqi Haikal
          </span>
        </motion.h1>
        <motion.div variants={fadeInUp} className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12">
          <span>{t("I'm a", "Saya seorang")} </span>
          <TypeAnimation
            sequence={language === 'en' 
              ? typingTexts.en.flatMap(text => [text, 2000])
              : typingTexts.id.flatMap(text => [text, 2000])
            }
            wrapper="span"
            speed={50}
            className="text-primary-green font-semibold"
            repeat={Infinity}
          />
        </motion.div>
        <motion.div variants={fadeInUp} className="flex justify-center gap-4 mb-12">
          {socialIcons.map((social, i) => (
            <motion.a
              key={i}
              href={social.href}
              target="_blank"
              className="w-14 h-14 rounded-full flex items-center justify-center bg-white dark:bg-gray-800 border-2 border-emerald-500/20 text-gray-700 dark:text-gray-300 shadow-lg transition-all duration-300 hover:bg-primary-green hover:border-primary-green hover:text-white hover:scale-110"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className={social.icon}></i>
            </motion.a>
          ))}
        </motion.div>
        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.a 
            href="#contact" 
            className="btn-primary-custom"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t("Get In Touch", "Hubungi Saya")}
          </motion.a>
          <motion.a 
            href="#projects" 
            className="btn-outline-custom"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t("View Projects", "Lihat Projek")}
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;