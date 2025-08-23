"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TypeAnimation } from 'react-type-animation';
import { useLanguage } from '../../context/LanguageContext';
import { typingTexts, contactInfo } from '../../data/portfolio';
import { Mail, Linkedin, Github, MessageCircle } from 'lucide-react';

const Hero: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <section id="home" className="min-h-screen flex items-center pt-24 lg:pt-0 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Text Content - Order 2 on mobile, 1 on desktop */}
          <div className="lg:order-1 order-2 text-center lg:text-left" data-aos="fade-right">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight animate-floating bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
              {t("Hi, I'm Rifqi Haikal", "Halo, Saya Rifqi Haikal")}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6">
              {t("I'm a", "Saya seorang")}{" "}
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
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
              {t(
                "Passionate Full-Stack Developer and Mobile App Developer from Indonesia, currently studying Informatics at Del Institute of Technology. I love creating innovative solutions through code.",
                "Pengembang Full-Stack dan Aplikasi Mobile yang passionate dari Indonesia, saat ini sedang menempuh studi Informatika di Institut Teknologi Del. Saya suka menciptakan solusi inovatif melalui kode."
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
              <a href="#contact" className="btn-primary-custom text-center">
                {t("Get In Touch", "Hubungi Saya")}
              </a>
              <a href="#projects" className="btn-outline-custom text-center">
                {t("View Projects", "Lihat Projek")}
              </a>
            </div>
            <div className="flex gap-4 justify-center lg:justify-start">
              <a href={`mailto:${contactInfo.email}`} className="social-icon" title="Email">
                <Mail size={20} />
              </a>
              <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon" title="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" className="social-icon" title="GitHub">
                <Github size={20} />
              </a>
              <a href={contactInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="social-icon" title="WhatsApp">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
          
          {/* Profile Image - Order 1 on mobile, 2 on desktop */}
          <div className="lg:order-2 order-1" data-aos="fade-left">
            <div className="relative w-full max-w-sm mx-auto lg:max-w-md">
              {/* Decorative circles */}
              <div className="profile-decoration"></div>
              <div className="profile-decoration"></div>
              
              <Image
                src="/assets/Profile.png"
                alt="Rifqi Haikal Profile"
                width={400}
                height={400}
                className="rounded-[15%] w-full h-auto transition-transform duration-300 hover:scale-105 hover:rotate-2"
                style={{border:'none', boxShadow:'none'}}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;