'use client';

import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Mail, Linkedin, Github } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';
import { typingTexts, contactInfo } from '../../data/portfolio';
import { staggerContainer, fadeInUp } from '../../lib/animations';

// Lazy load ParticlesBackground for better initial performance
const ParticlesBackground = dynamic(() => import('../shared/ParticlesBackground'), {
  ssr: false,
  loading: () => null,
});

interface HeroProps {
  onViewProjects?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onViewProjects }) => {
  const { language, t } = useLanguage();

  const socialIcons = [
    { href: `mailto:${contactInfo.email}`, icon: Mail, label: 'Email' },
    { href: contactInfo.linkedin, icon: Linkedin, label: 'LinkedIn' },
    { href: contactInfo.github, icon: Github, label: 'GitHub' },
    { href: contactInfo.whatsapp, icon: FaWhatsapp, label: 'WhatsApp' },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 z-content"
      style={{ isolation: 'isolate' }}
    >
      <motion.div
        className="relative z-content w-full"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
      <ParticlesBackground />
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
            speed={55} // Slightly faster for better perceived performance
            className="text-primary-green font-semibold"
            repeat={Infinity}
            cursor={true}
            preRenderFirstString={true} // Prevent layout shift
          />
        </motion.div>
        <motion.div variants={fadeInUp} className="flex justify-center gap-4 mb-12">
          {socialIcons.map((social, i) => {
            const IconComponent = social.icon;
            return (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-14 h-14 rounded-full flex items-center justify-center bg-white dark:bg-gray-800 border-2 border-emerald-500/20 text-gray-700 dark:text-gray-300 shadow-lg transition-all duration-300 hover:bg-primary-green hover:border-primary-green hover:text-white hover:scale-110"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconComponent size={20} />
              </motion.a>
            );
          })}
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
          <motion.button
            onClick={onViewProjects}
            className="btn-outline-custom"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t("View Projects", "Lihat Projek")}
          </motion.button>
        </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;