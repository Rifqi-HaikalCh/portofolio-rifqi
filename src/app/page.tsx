"use client";

import { useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from '../components/sections/Navbar';
import { Footer } from '../components/sections/Footer';
import LoadingScreen from '../components/shared/LoadingScreen';
import { FloatingNavigation } from '../components/shared/FloatingNavigation';
import { ResponsiveLayout } from '../components/ResponsiveLayout';
import { StudioProvider } from '../components/shared/StudioProvider';
import { StudioRail } from '../components/shared/StudioRail';
import { EqbotCompanion } from '../components/shared/EqbotCompanion';
import { useSectionRise } from '../components/shared/useLedgerRise';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const frameRef = useRef<HTMLDivElement>(null);
  useSectionRise(frameRef, loading ? 'loading' : 'ready');

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div ref={frameRef}>
      {!loading && (
        <StudioProvider>
          <Navbar />
          <StudioRail />
          <main>
            <ResponsiveLayout />
          </main>
          <Footer />
          <EqbotCompanion />
        </StudioProvider>
      )}
      </div>

      <FloatingNavigation />
    </>
  );
}
