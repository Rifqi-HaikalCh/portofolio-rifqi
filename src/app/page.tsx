"use client";

import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AnimatePresence } from 'framer-motion';
import { TimedNotification, NotificationMessage } from '../components/shared/TimedNotification';
import { useLanguage } from '../context/LanguageContext';

// Import HOC dan sections
import { AnimatedSection } from '../components/hocs/AnimatedSection';
import Navbar from '../components/sections/Navbar';
import Hero from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Experience } from '../components/sections/Experience';
import { Certificates } from '../components/sections/Certificates';
import { Contact } from '../components/sections/Contact';
import { Footer } from '../components/sections/Footer';
import LoadingScreen from '../components/shared/LoadingScreen';
import { FloatingNavigation } from '../components/shared/FloatingNavigation';
import { Services } from '../components/sections/Services';
import MyGallery from '../components/sections/MyGallery';

// EQbot notification messages
const getEQbotMessages = (): NotificationMessage[] => [
  {
    id: 'welcome',
    titleEn: 'Welcome to Rifqi\'s Portfolio!',
    titleId: 'Selamat Datang di Portofolio Rifqi!',
    messageEn: 'You have landed on Rifqi\'s portfolio page, happy exploring!',
    messageId: 'Kamu telah mendarat di halaman portofolio Rifqi, selamat menjelajah!',
    actionType: 'none'
  },
  {
    id: 'contact',
    titleEn: 'Ready to Connect?',
    titleId: 'Siap untuk Terhubung?',
    messageEn: 'Do you think he\'s the right person? Contact him!',
    messageId: 'Kamu rasa dia orang yang tepat? Kontak dia!',
    actionType: 'contact',
    actionTextEn: 'visit',
    actionTextId: 'kunjungi'
  },
  {
    id: 'download',
    titleEn: 'Still Not Convinced?',
    titleId: 'Masih Belum Yakin?',
    messageEn: 'Still not convinced?',
    messageId: 'Masih belum yakin?',
    actionType: 'download',
    actionTextEn: 'download',
    actionTextId: 'download'
  }
];

// Random facts about Rifqi
const getRifqiFacts = (): NotificationMessage[] => [
  {
    id: 'fact1',
    titleEn: 'Fun Fact!',
    titleId: 'Fakta Menarik!',
    messageEn: 'Rifqi has completed multiple internships at leading tech companies!',
    messageId: 'Rifqi telah menyelesaikan beberapa magang di perusahaan teknologi terkemuka!',
    actionType: 'none'
  },
  {
    id: 'fact2',
    titleEn: 'Did You Know?',
    titleId: 'Tahukah Kamu?',
    messageEn: 'He\'s certified as an Industry Ready Talent through MSIB 2024!',
    messageId: 'Dia tersertifikasi sebagai Talenta Siap Kerja Industri melalui MSIB 2024!',
    actionType: 'none'
  },
  {
    id: 'fact3',
    titleEn: 'Amazing Achievement!',
    titleId: 'Pencapaian Luar Biasa!',
    messageEn: 'Rifqi has expertise in both web development and mobile app development!',
    messageId: 'Rifqi memiliki keahlian dalam pengembangan web dan aplikasi mobile!',
    actionType: 'none'
  },
  {
    id: 'fact4',
    titleEn: 'Tech Enthusiast!',
    titleId: 'Penggemar Teknologi!',
    messageEn: 'He\'s passionate about UI/UX design and creating seamless user experiences!',
    messageId: 'Dia bersemangat tentang desain UI/UX dan menciptakan pengalaman pengguna yang mulus!',
    actionType: 'none'
  },
  {
    id: 'fact5',
    titleEn: 'Educational Excellence!',
    titleId: 'Keunggulan Pendidikan!',
    messageEn: 'Currently studying Informatics at Del Institute of Technology!',
    messageId: 'Saat ini sedang belajar Informatika di Institut Teknologi Del!',
    actionType: 'none'
  }
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [currentNotification, setCurrentNotification] = useState<NotificationMessage | null>(null);
  const [notificationStep, setNotificationStep] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out',
    });
  }, []);


  const eqbotMessages = getEQbotMessages();
  const rifqiFacts = getRifqiFacts();

  const handleLoadingComplete = () => {
    setLoading(false);
    // Show welcome message immediately after loading
    setTimeout(() => {
      setCurrentNotification(eqbotMessages[0]);
      setShowNotification(true);
      setNotificationStep(1);
    }, 500);
  };

  const handleNotificationClose = () => {
    setShowNotification(false);
    setCurrentNotification(null);
  };

  const getRandomFact = () => {
    const randomIndex = Math.floor(Math.random() * rifqiFacts.length);
    return rifqiFacts[randomIndex];
  };


  // Enhanced EQbot notification timing system
  useEffect(() => {
    if (loading) return;

    // After 5 minutes - Contact suggestion
    const contactTimer = setTimeout(() => {
      if (notificationStep >= 1) {
        setCurrentNotification(eqbotMessages[1]);
        setShowNotification(true);
        setNotificationStep(2);
      }
    }, 300000); // 5 minutes

    // After 10 minutes from contact notification - Download suggestion
    const downloadTimer = setTimeout(() => {
      if (notificationStep >= 2) {
        setCurrentNotification(eqbotMessages[2]);
        setShowNotification(true);
        setNotificationStep(3);
      }
    }, 900000); // 15 minutes total (5 + 10)

    // Every 15 minutes after that - Random facts
    const factTimer = setTimeout(() => {
      if (notificationStep >= 3) {
        const factInterval = setInterval(() => {
          setCurrentNotification(getRandomFact());
          setShowNotification(true);
        }, 900000); // Every 15 minutes

        // Initial fact after the download notification
        setCurrentNotification(getRandomFact());
        setShowNotification(true);

        return () => clearInterval(factInterval);
      }
    }, 1800000); // 30 minutes total (5 + 10 + 15)

    return () => {
      clearTimeout(contactTimer);
      clearTimeout(downloadTimer);
      clearTimeout(factTimer);
    };
  }, [loading, notificationStep, eqbotMessages, rifqiFacts]);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>
      
      {!loading && (
        <>
          <Navbar />
          <main>
            <Hero />
            <AnimatedSection id="about"><About /></AnimatedSection>
            <AnimatedSection id="experience"><Experience /></AnimatedSection>
            <AnimatedSection id="services"><Services /></AnimatedSection>
            <AnimatedSection id="certificates"><Certificates /></AnimatedSection>
            <AnimatedSection id="gallery"><MyGallery /></AnimatedSection>
            <AnimatedSection id="contact"><Contact /></AnimatedSection>
          </main>
          <Footer />
        </>
      )}
      
      {/* Floating Navigation */}
      <FloatingNavigation />
      
      <AnimatePresence>
        {showNotification && currentNotification && (
          <TimedNotification 
            message={currentNotification}
            onClose={handleNotificationClose} 
          />
        )}
      </AnimatePresence>
    </>
  );
}