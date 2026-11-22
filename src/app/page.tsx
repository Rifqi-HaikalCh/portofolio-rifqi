"use client";

import { useRef } from 'react';
import Navbar from '../components/sections/Navbar';
import { Footer } from '../components/sections/Footer';
import { FloatingNavigation } from '../components/shared/FloatingNavigation';
import { ResponsiveLayout } from '../components/ResponsiveLayout';
import { StudioProvider } from '../components/shared/StudioProvider';
import { StudioRail } from '../components/shared/StudioRail';
import { EqbotCompanion } from '../components/shared/EqbotCompanion';
import { useSectionRise } from '../components/shared/useLedgerRise';

// No loading gate: navigation and hero render on first paint (DesignRules §10.2).
export default function Home() {
  const frameRef = useRef<HTMLDivElement>(null);
  useSectionRise(frameRef, 'ready');

  return (
    <>
      <div ref={frameRef}>
        <StudioProvider>
          <Navbar />
          <StudioRail />
          <main id="main">
            <ResponsiveLayout />
          </main>
          <Footer />
          <EqbotCompanion />
        </StudioProvider>
      </div>

      <FloatingNavigation />
    </>
  );
}
