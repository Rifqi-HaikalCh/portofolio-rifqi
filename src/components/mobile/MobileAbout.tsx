'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { aboutHighlights } from '../../data/portfolio';
import { Download, ChevronRight, GraduationCap, Briefcase, Trophy, Users } from 'lucide-react';
import { SimpleLanyard } from '../shared/SimpleLanyard';
import PortfolioFigmaCard from '../shared/PortfolioFigmaCard';
import { RotatingText } from '../shared/RotatingText';

const iconMap: { [key: string]: React.ReactNode } = {
  'graduation-cap': <GraduationCap size={20} />,
  'briefcase': <Briefcase size={20} />,
  'trophy': <Trophy size={20} />,
  'users': <Users size={20} />,
};

export const MobileAbout: React.FC = () => {
  const { language } = useLanguage();

  const stats = [
    {
      number: "10+",
      label: language === 'en' ? "Projects Completed" : "Proyek Diselesaikan",
    },
    {
      number: "2+",
      label: language === 'en' ? "Years Experience" : "Tahun Pengalaman",
    },
    {
      number: "10+",
      label: language === 'en' ? "Technologies Mastered" : "Teknologi Dikuasai",
    }
  ];

  return (
    <section id="about" className="py-16 px-6 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Section Header */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4">
          {language === 'en' ? 'Get to Know Me' : 'Mengenal Saya'}
        </span>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          {language === 'en' ? 'About Me' : 'Tentang Saya'}
        </h2>
      </motion.div>

      {/* Lanyard Animation with Profile Image */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <SimpleLanyard
          imageUrl="/assets/removebg.webp"
          alt="Rifqi Haikal"
        />
      </motion.div>

      {/* Name and Title */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-6"
      >
        <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Rifqi Haikal
        </h3>
        <div className="font-medium min-h-[24px] flex items-center justify-center">
          <RotatingText
            texts={
              language === 'en'
                ? ['UI/UX Designer', 'Web Developer', 'Mobile Developer']
                : ['Desainer UI/UX', 'Pengembang Web', 'Pengembang Mobile']
            }
            interval={2500}
            className="text-base"
          />
        </div>
      </motion.div>

      {/* Bio */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 text-center"
      >
        {language === 'en'
          ? "A creative UI/UX Designer and Web Developer passionate about building engaging digital experiences. With two years of hands-on experience, I have developed technical and creative solutions as a Freelancer and in professional roles."
          : "Seorang UI/UX Designer dan Web Developer kreatif yang passionate dalam membangun pengalaman digital yang menarik. Dengan dua tahun pengalaman hands-on, saya telah mengembangkan solusi teknis dan kreatif sebagai Freelancer dan dalam peran profesional."}
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-col gap-3 mb-12"
      >
        <a
          href="/assets/CV Rifqi Haikal Chairiansyah.pdf"
          download
          className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-full font-semibold shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          <Download size={18} />
          {language === 'en' ? 'Download CV' : 'Unduh CV'}
        </a>
        <button
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="w-full py-4 px-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-full font-semibold shadow-lg border border-gray-200 dark:border-gray-700 active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          {language === 'en' ? 'Get in Touch' : 'Hubungi Saya'}
          <ChevronRight size={18} />
        </button>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="grid grid-cols-3 gap-4 mb-12"
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center shadow-lg"
          >
            <h4 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-1">
              {stat.number}
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Portfolio Figma Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          {language === 'en' ? 'My Portfolio' : 'Portofolio Saya'}
        </h3>

        <PortfolioFigmaCard />
      </motion.div>

      {/* Expertise Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          {language === 'en' ? 'My Expertise' : 'Keahlian Saya'}
        </h3>

        <div className="space-y-4">
          {aboutHighlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                  {iconMap[highlight.icon]}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                    {language === 'en' ? highlight.title : highlight.titleId}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {language === 'en' ? highlight.description : highlight.descriptionId}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
