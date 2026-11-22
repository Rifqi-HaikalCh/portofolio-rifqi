'use client';
import React, { useState } from 'react';
import { useHydrated } from '../hooks/useHydrated';
import { useIsMobile } from '../hooks/useMediaQuery';
import { AnimatedSection } from './hocs/AnimatedSection';

// Mobile Components
import { MobileHero } from './mobile/MobileHero';
import { MobileAbout } from './mobile/MobileAbout';
import { MobileRoleBasedPortfolio } from './mobile/MobileRoleBasedPortfolio';
import { MobileExperience } from './mobile/MobileExperience';
import { MobileCertificates } from './mobile/MobileCertificates';
import { MobileContact } from './mobile/MobileContact';

// Desktop Components
import Hero from './sections/Hero';
import { About } from './sections/About';
import { Services } from './sections/Services';
import { Experience } from './sections/Experience';
import { Certificates } from './sections/Certificates';
import { Contact } from './sections/Contact';
import { ViewAllProjects } from './sections/ViewAllProjects';

export const ResponsiveLayout: React.FC = () => {
  const isMobile = useIsMobile();
  const mounted = useHydrated();
  const [showAllProjects, setShowAllProjects] = useState(false);

  // Show loading placeholder during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <>
        {showAllProjects && !isMobile ? (
          <ViewAllProjects
            onBack={() => setShowAllProjects(false)}
            projectType="all"
          />
        ) : (
          <>
            {isMobile ? (
              // Mobile Layout - Optimized for touch and vertical scrolling
              <div className="mobile-layout">
                <MobileHero />
                <MobileAbout />
                <MobileExperience />
                <MobileRoleBasedPortfolio />
                <MobileCertificates />
                <MobileContact />
              </div>
            ) : (
              // Desktop Layout - Optimized for hover and horizontal layouts
              <div className="desktop-layout">
                <Hero onViewProjects={() => setShowAllProjects(true)} />
                <AnimatedSection>
                  <About />
                </AnimatedSection>
                <AnimatedSection>
                  <Experience />
                </AnimatedSection>
                <AnimatedSection>
                  <Services />
                </AnimatedSection>
                <AnimatedSection>
                  <Certificates />
                </AnimatedSection>
                <AnimatedSection>
                  <Contact />
                </AnimatedSection>
              </div>
            )}
          </>
        )}
      </>
    </div>
  );
};
