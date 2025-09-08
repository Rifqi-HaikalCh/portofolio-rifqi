'use client';

import React from 'react';
import { HighlightedWord } from './HighlightedWord';

interface HighlightedTextProps {
  children: React.ReactNode;
}

export const HighlightedText: React.FC<HighlightedTextProps> = ({ children }) => {
  return <>{children}</>;
};

// Helper component for About section
export const AboutText = () => {
  return {
    en: (
      <>
        I am a <HighlightedWord variant="secondary">Bachelors of Informatics</HighlightedWord> from the{' '}
        <HighlightedWord variant="primary">Institut Teknologi Del</HighlightedWord>, passionate about bridging the gap between robust engineering and intuitive design.
        My skills were honed during internships at <HighlightedWord variant="accent">PT. Javan Cipta Solusi</HighlightedWord> and{' '}
        <HighlightedWord variant="accent">PT. Federal International Finance</HighlightedWord>, where I engineered full-stack applications and modern front-end frameworks.
        My services range from <HighlightedWord variant="primary">end-to-end Web and Mobile Development</HighlightedWord> to user-centric{' '}
        <HighlightedWord variant="accent">UI/UX Design</HighlightedWord>, ensuring every product I build is a seamless digital experience.
      </>
    ),
    id: (
      <>
        Saya adalah <HighlightedWord variant="secondary">Sarjana Informatika</HighlightedWord> dari{' '}
        <HighlightedWord variant="primary">Institut Teknologi Del</HighlightedWord> yang bersemangat menjembatani antara rekayasa teknis yang kokoh dan desain yang intuitif.
        Keahlian saya terasah melalui magang di <HighlightedWord variant="accent">PT. Javan Cipta Solusi</HighlightedWord> dan{' '}
        <HighlightedWord variant="accent">PT. Federal International Finance</HighlightedWord>, tempat saya membangun aplikasi full-stack dan framework front-end modern.
        Layanan yang saya tawarkan mencakup <HighlightedWord variant="primary">Pengembangan Web dan Mobile</HighlightedWord> secara menyeluruh hingga{' '}
        <HighlightedWord variant="accent">Desain UI/UX</HighlightedWord> yang berpusat pada pengguna, memastikan setiap produk yang saya buat adalah pengalaman digital yang mulus.
      </>
    )
  };
};

// Helper component for Hero section
export const HeroText = () => {
  return {
    en: (
      <>
        I'm a <HighlightedWord variant="primary" intensity="strong">Full Stack Developer</HighlightedWord>,{' '}
        <HighlightedWord variant="secondary" intensity="strong">Mobile App Developer</HighlightedWord>, and{' '}
        <HighlightedWord variant="accent" intensity="strong">UI/UX Enthusiast</HighlightedWord>
      </>
    ),
    id: (
      <>
        Saya seorang <HighlightedWord variant="primary" intensity="strong">Full Stack Developer</HighlightedWord>,{' '}
        <HighlightedWord variant="secondary" intensity="strong">Mobile App Developer</HighlightedWord>, dan{' '}
        <HighlightedWord variant="accent" intensity="strong">UI/UX Enthusiast</HighlightedWord>
      </>
    )
  };
};

// Helper component for Skills section
export const SkillsText = () => {
  return {
    en: (
      <>
        Comprehensive <HighlightedWord variant="primary">technical</HighlightedWord> and{' '}
        <HighlightedWord variant="secondary">soft skills</HighlightedWord> that drive{' '}
        <HighlightedWord variant="accent">exceptional results</HighlightedWord> in every project
      </>
    ),
    id: (
      <>
        Keahlian <HighlightedWord variant="primary">teknis</HighlightedWord> dan{' '}
        <HighlightedWord variant="secondary">lunak</HighlightedWord> yang komprehensif untuk{' '}
        <HighlightedWord variant="accent">hasil yang luar biasa</HighlightedWord> di setiap proyek
      </>
    )
  };
};

// Helper component for Projects section
export const ProjectsText = () => {
  return {
    en: (
      <>
        Discover my <HighlightedWord variant="primary">portfolio</HighlightedWord> of{' '}
        <HighlightedWord variant="secondary">innovative projects</HighlightedWord> showcasing{' '}
        <HighlightedWord variant="accent">cutting-edge technologies</HighlightedWord> and creative solutions
      </>
    ),
    id: (
      <>
        Jelajahi <HighlightedWord variant="primary">portofolio</HighlightedWord> saya berisi{' '}
        <HighlightedWord variant="secondary">proyek inovatif</HighlightedWord> yang menampilkan{' '}
        <HighlightedWord variant="accent">teknologi terdepan</HighlightedWord> dan solusi kreatif
      </>
    )
  };
};

// Helper component for Experience section
export const ExperienceText = () => {
  return {
    en: (
      <>
        My professional journey through <HighlightedWord variant="primary">technology</HighlightedWord>,{' '}
        <HighlightedWord variant="secondary">leadership</HighlightedWord>, and{' '}
        <HighlightedWord variant="accent">innovation</HighlightedWord>
      </>
    ),
    id: (
      <>
        Perjalanan profesional saya melalui <HighlightedWord variant="primary">teknologi</HighlightedWord>,{' '}
        <HighlightedWord variant="secondary">kepemimpinan</HighlightedWord>, dan{' '}
        <HighlightedWord variant="accent">inovasi</HighlightedWord>
      </>
    )
  };
};