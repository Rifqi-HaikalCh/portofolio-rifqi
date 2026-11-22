'use client';
import React, { useState } from 'react';
import { useHydrated } from '../hooks/useHydrated';
import { useIsMobile } from '../hooks/useMediaQuery';
import { AnimatedSection } from './hocs/AnimatedSection';

// Mobile Components (merged into the responsive sections in Phase 4, DesignRules §8)
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

  // Decided at click time, so the hero needs no device check to render.
  const viewProjects = () => {
    if (window.matchMedia('(max-width: 768px)').matches) {
      document.getElementById('services')?.scrollIntoView();
    } else {
      setShowAllProjects(true);
    }
  };

  if (showAllProjects && !isMobile) {
    return <ViewAllProjects onBack={() => setShowAllProjects(false)} projectType="all" />;
  }

  return (
    <div>
      {/* The hero is one responsive component and is in the server HTML: it is the LCP. */}
      <Hero onViewProjects={viewProjects} />

      {/* The remaining sections still switch trees after mount until Phase 4. */}
      {mounted &&
        (isMobile ? (
          <div className="mobile-layout">
            <MobileAbout />
            <MobileExperience />
            <MobileRoleBasedPortfolio />
            <MobileCertificates />
            <MobileContact />
          </div>
        ) : (
          <div className="desktop-layout">
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
        ))}
    </div>
  );
};
