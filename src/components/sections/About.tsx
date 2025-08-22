"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import { aboutHighlights } from '../../data/portfolio';
import { Download, GraduationCap, Briefcase, Trophy, Users } from 'lucide-react';

const iconMap: { [key: string]: React.ReactNode } = {
  'graduation-cap': <GraduationCap size={24} />,
  'briefcase': <Briefcase size={24} />,
  'trophy': <Trophy size={24} />,
  'users': <Users size={24} />,
};

export const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 bg-bg-light dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-text-dark dark:text-white mb-4">
            {t("About Me", "Tentang Saya")}
          </h2>
          <p className="text-text-light dark:text-gray-400 max-w-2xl mx-auto">
            {t(
              "Get to know more about me, my background, and what drives my passion for technology.",
              "Pelajari lebih lanjut tentang saya, latar belakang, dan apa yang mendorong passion saya terhadap teknologi."
            )}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-center" data-aos="fade-up">
          {/* Image Section */}
          <div className="lg:col-span-1">
            <div className="relative">
              <Image
                src="/assets/removebg.png"
                alt="About Rifqi"
                width={350}
                height={400}
                className="rounded-3xl shadow-custom-hover"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-bold text-text-dark dark:text-white mb-4">
              {t("My Journey in Technology", "Perjalanan Saya di Teknologi")}
            </h3>
            <p className="text-text-light dark:text-gray-400 mb-6 text-lg leading-relaxed">
              {t(
                "I am a dedicated Informatics student at Del Institute of Technology with a GPA of 3.37/4.00, expected to graduate in 2025. My journey in technology has been an exciting exploration, from experimenting with code as a curious teenager to becoming a seasoned Web and Mobile Programmer with hands-on industry experience.",
                "Saya adalah mahasiswa Informatika yang berdedikasi di Institut Teknologi Del dengan IPK 3.37/4.00, diharapkan lulus pada tahun 2025. Perjalanan saya di bidang teknologi telah menjadi eksplorasi yang menarik, dari bereksperimen dengan kode sebagai remaja yang penasaran hingga menjadi Programmer Web dan Mobile yang berpengalaman dengan pengalaman industri langsung."
              )}
            </p>

            {/* Highlights Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {aboutHighlights.map((highlight, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-custom hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white flex-shrink-0">
                    {iconMap[highlight.icon]}
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-dark dark:text-white mb-1">
                      {t(highlight.title, highlight.titleId)}
                    </h4>
                    <p className="text-sm text-text-light dark:text-gray-400">
                      {t(highlight.description, highlight.descriptionId)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Download CV Button */}
            <Link
              href="/assets/CV Rifqi Haikal Chairiansyah.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary text-white rounded-full font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-custom-hover"
            >
              <Download size={20} />
              {t("Download CV", "Unduh CV")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
