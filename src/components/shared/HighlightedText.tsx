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
        I am a dedicated <HighlightedWord variant="primary">Informatics</HighlightedWord> student at{' '}
        <HighlightedWord variant="secondary">Del Institute of Technology</HighlightedWord> with a GPA of 3.37/4.00, expected to graduate in 2025. 
        My journey in <HighlightedWord variant="accent">technology</HighlightedWord> has been an exciting exploration, 
        from experimenting with <HighlightedWord variant="primary">code</HighlightedWord> as a curious teenager 
        to becoming a seasoned <HighlightedWord variant="secondary">Web</HighlightedWord> and{' '}
        <HighlightedWord variant="accent">Mobile Programmer</HighlightedWord> with hands-on industry experience.
      </>
    ),
    id: (
      <>
        Saya adalah mahasiswa <HighlightedWord variant="primary">Informatika</HighlightedWord> yang berdedikasi di{' '}
        <HighlightedWord variant="secondary">Institut Teknologi Del</HighlightedWord> dengan IPK 3.37/4.00, diharapkan lulus pada tahun 2025. 
        Perjalanan saya di bidang <HighlightedWord variant="accent">teknologi</HighlightedWord> telah menjadi eksplorasi yang menarik, 
        dari bereksperimen dengan <HighlightedWord variant="primary">kode</HighlightedWord> sebagai remaja yang penasaran 
        hingga menjadi <HighlightedWord variant="secondary">Programmer Web</HighlightedWord> dan{' '}
        <HighlightedWord variant="accent">Mobile</HighlightedWord> yang berpengalaman dengan pengalaman industri langsung.
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