'use client';
import React, { useEffect, useState } from 'react';
import { useIsMobile } from '../hooks/useMediaQuery';
import { AnimatedSection } from './hocs/AnimatedSection';

// Mobile Components
import { MobileHero } from './mobile/MobileHero';
import { MobileAbout } from './mobile/MobileAbout';
import { MobileRoleBasedPortfolio } from './mobile/MobileRoleBasedPortfolio';
import { MobileExperience } from './mobile/MobileExperience';
import { MobileGallery } from './mobile/MobileGallery';
import { MobileCertificates } from './mobile/MobileCertificates';
import { MobileContact } from './mobile/MobileContact';

// Desktop Components
import Hero from './sections/Hero';
import { About } from './sections/About';
import { Services } from './sections/Services';
import { Experience } from './sections/Experience';
import MyGallery from './sections/MyGallery';
import { Certificates } from './sections/Certificates';
import { Contact } from './sections/Contact';

export const ResponsiveLayout: React.FC = () => {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Show loading placeholder during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <>
      {isMobile ? (
        // Mobile Layout - Optimized for touch and vertical scrolling
        <div className="mobile-layout">
          <MobileHero />
          <MobileAbout />
          <MobileExperience />
          <MobileRoleBasedPortfolio />
          <MobileGallery />
          <MobileCertificates />
          <MobileContact />
        </div>
      ) : (
        // Desktop Layout - Optimized for hover and horizontal layouts
        <div className="desktop-layout">
          <Hero />
          <AnimatedSection id="about">
            <About />
          </AnimatedSection>
          <AnimatedSection id="experience">
            <Experience />
          </AnimatedSection>
          <AnimatedSection id="services">
            <Services />
          </AnimatedSection>
          <AnimatedSection id="gallery">
            <MyGallery />
          </AnimatedSection>
          <AnimatedSection id="certificates">
            <Certificates />
          </AnimatedSection>
          <AnimatedSection id="contact">
            <Contact />
          </AnimatedSection>
        </div>
      )}
    </>
  );
};
