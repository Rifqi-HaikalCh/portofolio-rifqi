import Navbar from '../components/sections/Navbar';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Experience } from '../components/sections/Experience';
import { Projects, Services } from '../components/sections/Services';
import { Certificates } from '../components/sections/Certificates';
import { Contact } from '../components/sections/Contact';
import { Footer } from '../components/sections/Footer';
import { StudioProvider } from '../components/shared/StudioProvider';
import { StudioRail } from '../components/shared/StudioRail';
import { ChapterBar } from '../components/shared/ChapterBar';
import { EqbotLoader } from '../components/shared/EqbotLoader';
import { FigureGaze } from '../components/shared/FigureGaze';
import { SectionHints } from '../components/shared/SectionHints';
import { StagePoke } from '../components/shared/StagePoke';
import { WelcomeTour } from '../components/shared/WelcomeTour';
import { PaperDefs } from '../lib/paper-kit';

/*
  One page, one section order (DesignRules.md §4, src/data/sections.ts).
  A Server Component: sections render to HTML and ship only their client
  leaves. Total experience and the footer year refresh once a day.
*/
export const revalidate = 86400;

export default function Home() {
  return (
    <StudioProvider>
      <Navbar />
      <StudioRail />
      <ChapterBar />
      <main id="main">
        <PaperDefs />
        <Hero />
        <About />
        <Experience />
        <Services />
        <Projects />
        <Certificates />
        <Contact />
      </main>
      <Footer />
      <EqbotLoader />
      <FigureGaze />
      <SectionHints />
      <StagePoke />
      <WelcomeTour />
    </StudioProvider>
  );
}
