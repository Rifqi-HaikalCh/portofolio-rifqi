'use client';

import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { Mail, Linkedin, Github } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';
import { typingTexts, contactInfo, heroHighlights } from '../../data/portfolio';

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
    <section id="home" data-studio="folio" className="bg-paper border-b border-line">
      <div className="rise-item w-full max-w-6xl mx-auto px-5 lg:px-8 pt-28 pb-12">
          <p className="font-jetbrains-mono text-[11px] tracking-[0.22em] uppercase text-accent mb-6">
            {t("Web · Mobile · Interface", "Web · Mobile · Antarmuka")}
          </p>
          <p className="text-sm text-muted mb-3">
            {t("Hi, I'm", "Halo, Saya")}
          </p>
          <h1 className="font-serif text-6xl sm:text-7xl lg:text-8xl font-medium tracking-tight leading-[0.9] text-ink max-w-4xl">
            Rifqi
            <span className="block">
              Haikal
              <span data-eqbot="home-name" data-eqbot-at="end" className="inline-block w-px h-px" aria-hidden="true" />
            </span>
          </h1>

          <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p data-eqbot="home-role" data-eqbot-at="end" className="text-lg md:text-xl text-muted max-w-md">
              <span>{t("I'm", "Saya")} </span>
              <TypeAnimation
                sequence={
                  language === 'en'
                    ? typingTexts.en.flatMap((text) => [text, 2000])
                    : typingTexts.id.flatMap((text) => [text, 2000])
                }
                wrapper="span"
                speed={55}
                className="text-ink font-serif italic"
                repeat={Infinity}
                cursor
                preRenderFirstString
              />
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#contact" className="btn-primary-custom">
                {t("Get In Touch", "Hubungi Saya")}
              </a>
              <button type="button" onClick={onViewProjects} className="btn-outline-custom">
                {t("View Projects", "Lihat Projek")}
              </button>
            </div>
          </div>
      </div>

      <div className="rise-item max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 border-t border-l border-line">
        {heroHighlights.map((item) => (
          <div key={item.label} className="border-b border-r border-line px-5 lg:px-8 py-5">
            <p className="font-serif text-3xl leading-none text-ink">{item.value}</p>
            <p className="mt-2 font-jetbrains-mono text-[11px] tracking-[0.12em] uppercase text-muted">
              {t(item.label, item.labelId)}
            </p>
          </div>
        ))}
      </div>

      <div className="rise-item border-t border-line">
        <div className="max-w-6xl mx-auto px-5 lg:px-8 py-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p data-eqbot="home-available" data-eqbot-at="end" className="font-jetbrains-mono text-[11px] tracking-[0.16em] uppercase">
            <span className="inline-flex items-center text-accent">
              <span className="presence" aria-hidden="true" />
              {t("Available for work", "Tersedia untuk bekerja")}
            </span>
            <span className="text-muted"> · {contactInfo.location}</span>
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {socialIcons.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="link-mark inline-flex items-center gap-2 text-sm text-muted"
                >
                  <IconComponent size={16} />
                  {social.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
