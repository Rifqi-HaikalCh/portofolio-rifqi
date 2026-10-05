"use client";

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from '../components/sections/Navbar';
import { Footer } from '../components/sections/Footer';
import LoadingScreen from '../components/shared/LoadingScreen';
import { FloatingNavigation } from '../components/shared/FloatingNavigation';
import { ResponsiveLayout } from '../components/ResponsiveLayout';
import { StudioProvider } from '../components/shared/StudioProvider';
import { StudioRail } from '../components/shared/StudioRail';
import { EqbotCompanion } from '../components/shared/EqbotCompanion';

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

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

      <FloatingNavigation />
    </>
  );
}
