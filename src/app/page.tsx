"use client";

import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AnimatePresence } from 'framer-motion';

// Import HOC dan sections
import { AnimatedSection } from '../components/hocs/AnimatedSection';
import Navbar from '../components/sections/Navbar';
import Hero from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Skills } from '../components/sections/Skills';
import { Experience } from '../components/sections/Experience';
import { Projects } from '../components/sections/Projects';
import { Certificates } from '../components/sections/Certificates';
import { Contact } from '../components/sections/Contact';
import { Footer } from '../components/sections/Footer';
import LoadingScreen from '../components/shared/LoadingScreen';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out',
    });
    
    // Non-aktifkan loading setelah animasi selesai
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Sesuaikan durasi dengan animasi loading

  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>
      
      {!loading && (
        <>
          <Navbar />
          <main>
            <Hero />
            <AnimatedSection id="about"><About /></AnimatedSection>
            <AnimatedSection id="skills"><Skills /></AnimatedSection>
            <AnimatedSection id="experience"><Experience /></AnimatedSection>
            <AnimatedSection id="projects"><Projects /></AnimatedSection>
            <AnimatedSection id="certificates"><Certificates /></AnimatedSection>
            <AnimatedSection id="contact"><Contact /></AnimatedSection>
          </main>
          <Footer />
        </>
      )}
    </>
  );
}