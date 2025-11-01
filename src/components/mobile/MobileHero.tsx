'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { Github, Linkedin, Mail, Download, ChevronDown } from 'lucide-react';
import { RotatingText } from '../shared/RotatingText';

export const MobileHero: React.FC = () => {
  const { language } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />

      {/* Floating Shapes */}
      <motion.div
        className="absolute top-20 right-10 w-20 h-20 bg-emerald-400/20 rounded-full blur-xl"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-40 left-10 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl"
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-6">
        {/* Profile Picture */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="relative"
        >
          <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-emerald-500/50 shadow-2xl">
            <Image
              src="/assets/Profile.webp"
              alt="Rifqi Haikal"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Status Indicator */}
          <motion.div
            className="absolute bottom-2 right-2 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white dark:border-gray-900"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.8, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          />
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Rifqi Haikal
          </h1>
          <div className="text-lg font-medium min-h-[28px] flex items-center justify-center">
            <RotatingText
              texts={
                language === 'en'
                  ? ['UI/UX Designer', 'Web Developer', 'Mobile Developer']
                  : ['Desainer UI/UX', 'Pengembang Web', 'Pengembang Mobile']
              }
              interval={2500}
              className="text-lg"
            />
          </div>
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 dark:text-gray-400 max-w-md leading-relaxed"
        >
          {language === 'en'
            ? 'Passionate about creating beautiful, functional, and user-friendly digital experiences.'
            : 'Bersemangat menciptakan pengalaman digital yang indah, fungsional, dan ramah pengguna.'
          }
        </motion.p>

        {/* Social Links */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex gap-4"
        >
          <a
            href="https://github.com/Rifqi-HaikalCh"
            target="_blank"
            className="w-12 h-12 rounded-full bg-gray-800 dark:bg-gray-700 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-lg"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/rifqihaikal/"
            target="_blank"
            className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-lg"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:rifqihaikal2004@gmail.com"
            className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-lg"
          >
            <Mail size={20} />
          </a>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col w-full max-w-sm gap-3 pt-4"
        >
          <button
            onClick={() => scrollToSection('contact')}
            className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl active:scale-95 transition-all"
          >
            {language === 'en' ? 'Get In Touch' : 'Hubungi Saya'}
          </button>
          <a
            href="/assets/CV-Rifqi-Haikal.pdf"
            download
            className="w-full py-4 px-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-full font-semibold shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-700"
          >
            <Download size={18} />
            {language === 'en' ? 'Download CV' : 'Unduh CV'}
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8"
        >
          <motion.button
            onClick={() => scrollToSection('about')}
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-gray-400 dark:text-gray-500"
          >
            <ChevronDown size={32} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
