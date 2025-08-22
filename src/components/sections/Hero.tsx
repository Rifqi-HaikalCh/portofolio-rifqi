"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TypeAnimation } from 'react-type-animation';
// Update the import path below if your LanguageContext is in src/context/LanguageContext
import { useLanguage } from '../../context/LanguageContext';
import { typingTexts, contactInfo } from '../../data/portfolio';
import { Mail, Linkedin, Github, MessageCircle } from 'lucide-react';

const Hero: React.FC = () => {
  const { language, t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const socialLinks = [
    { icon: <Mail size={20} />, href: `mailto:${contactInfo.email}`, title: 'Email' },
    { icon: <Linkedin size={20} />, href: contactInfo.linkedin, title: 'LinkedIn' },
    { icon: <Github size={20} />, href: contactInfo.github, title: 'GitHub' },
    { icon: <MessageCircle size={20} />, href: contactInfo.whatsapp, title: 'WhatsApp' },
  ];

  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!mounted) return null;

  return (
    <section id="home" className="min-h-screen flex items-center bg-gray-50 dark:bg-gray-900 pt-16 sm:pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div data-aos="fade-right" className="order-2 lg:order-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight animate-floating">
              <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
                {t("Hi, I'm Rifqi Haikal", "Halo, Saya Rifqi Haikal")}
              </span>
            </h1>
            
            <div className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-6 min-h-[60px] sm:min-h-[70px]">
              <span>{t("I'm a", "Saya seorang")} </span>
              <TypeAnimation
                sequence={language === 'en' 
                  ? typingTexts.en.flatMap(text => [text, 2000])
                  : typingTexts.id.flatMap(text => [text, 2000])
                }
                wrapper="span"
                speed={50}
                className="text-emerald-500 font-semibold"
                repeat={Infinity}
              />
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-8 text-base sm:text-lg max-w-xl leading-relaxed">
              {t(
                "Passionate Full-Stack Developer and Mobile App Developer from Indonesia, currently studying Informatics at Del Institute of Technology. I love creating innovative solutions through code.",
                "Pengembang Full-Stack dan Aplikasi Mobile yang passionate dari Indonesia, saat ini sedang menempuh studi Informatika di Institut Teknologi Del. Saya suka menciptakan solusi inovatif melalui kode."
              )}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8">
              <button
                onClick={() => handleScrollTo('#contact')}
                className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full font-semibold text-sm sm:text-base uppercase tracking-wider transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {t("Get In Touch", "Hubungi Saya")}
              </button>
              <button
                onClick={() => handleScrollTo('#projects')}
                className="px-6 py-3 sm:px-8 sm:py-4 border-2 border-emerald-500 text-emerald-500 rounded-full font-semibold text-sm sm:text-base uppercase tracking-wider transition-all duration-300 hover:bg-emerald-500 hover:text-white hover:-translate-y-1"
              >
                {t("View Projects", "Lihat Projek")}
              </button>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 sm:gap-4 justify-center sm:justify-start">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-gray-800 text-emerald-500 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-emerald-500 hover:text-white hover:-translate-y-1 hover:scale-110"
                  title={social.title}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Profile Image */}
          <div data-aos="fade-left" className="order-1 lg:order-2 flex justify-center relative">
            <div className="relative">
              <div className="absolute -top-3 -right-3 sm:-top-5 sm:-right-5 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-2 border-emerald-500 rounded-full opacity-30 animate-spin-slow"></div>
              <div className="absolute -bottom-3 -left-3 sm:-bottom-5 sm:-left-5 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 border-2 border-emerald-500 rounded-full opacity-30 animate-spin-slow animation-delay-2000"></div>
              
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
                <Image
                  src="/assets/Profile.png"
                  alt="Rifqi Haikal Profile"
                  fill
                  className="object-contain rounded-[15%] border-3 sm:border-4 border-emerald-500 transition-all duration-300 hover:scale-105 hover:rotate-2"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;