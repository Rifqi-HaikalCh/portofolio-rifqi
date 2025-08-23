"use client";

import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Import sections
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
    // Initialize AOS with the same settings as in index.html
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out',
    });

    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </>
  );
}