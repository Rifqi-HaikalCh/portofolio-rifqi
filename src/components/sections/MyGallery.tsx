'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { AnimatedSectionTitle } from '../shared/AnimatedSectionTitle';
import CircularGallery from '../shared/CircularGallery';

const MyGallery: React.FC = () => {
  const { language } = useLanguage();

  // Gallery data with WebP images
  const galleryItems = [
    { image: '/assets/view-1.webp', text: 'Moment 1' },
    { image: '/assets/view-2.webp', text: 'Moment 2' },
    { image: '/assets/view-3.webp', text: 'Moment 3' },
    { image: '/assets/view-4.webp', text: 'Moment 4' },
    { image: '/assets/view-5.webp', text: 'Moment 5' },
    { image: '/assets/view-6.webp', text: 'Moment 6' },
    { image: '/assets/view-7.webp', text: 'Moment 7' },
    { image: '/assets/view-8.webp', text: 'Moment 8' },
    { image: '/assets/view-9.webp', text: 'Moment 9' },
    { image: '/assets/view-10.webp', text: 'Moment 10' },
    { image: '/assets/view-11.webp', text: 'Moment 11' },
    { image: '/assets/view-12.webp', text: 'Moment 12' },
    { image: '/assets/view-13.webp', text: 'Moment 13' },
    { image: '/assets/view-14.webp', text: 'Moment 14' },
    { image: '/assets/view-15.webp', text: 'Moment 15' },
    { image: '/assets/view-16.webp', text: 'Moment 16' },
    { image: '/assets/view-17.webp', text: 'Moment 17' },
    { image: '/assets/view-18.webp', text: 'Moment 18' },
    { image: '/assets/view-19.webp', text: 'Moment 19' },
    { image: '/assets/view-20.webp', text: 'Moment 20' },
    { image: '/assets/view-21.webp', text: 'Moment 21' },
    { image: '/assets/view-22.webp', text: 'Moment 22' },
    { image: '/assets/view-23.webp', text: 'Moment 23' },
    { image: '/assets/view-24.webp', text: 'Moment 24' },
    { image: '/assets/view-25.webp', text: 'Moment 25' },
  ];

  return (
    <section
      id="gallery"
      className="py-20 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <AnimatedSectionTitle
          badge={language === 'en' ? 'My Gallery' : 'Galeri Saya'}
          badgeIcon={<Camera className="w-4 h-4" />}
          title={language === 'en' ? 'Visual Stories' : 'Cerita Visual'}
          subtitle={
            language === 'en'
              ? 'Capturing moments and perspectives through my lens. A collection of photography and personal moments that tell stories beyond words.'
              : 'Menangkap momen dan perspektif melalui lensa saya. Koleksi fotografi dan momen pribadi yang menceritakan kisah di balik kata-kata.'
          }
          center={true}
        />

        {/* Gallery Description */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-emerald-500" />
              <span>{language === 'en' ? '25 Photos' : '25 Foto'}</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-gray-400" />
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-emerald-500" />
              <span>{language === 'en' ? 'Personal Collection' : 'Koleksi Pribadi'}</span>
            </div>
          </div>
        </motion.div>

        {/* Interactive Instructions */}
        <motion.div
          className="max-w-2xl mx-auto text-center mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full px-6 py-2 inline-block border border-gray-200 dark:border-gray-700">
            {language === 'en'
              ? '🖱️ Scroll or drag to explore the gallery'
              : '🖱️ Scroll atau geser untuk menjelajahi galeri'}
          </p>
        </motion.div>

        {/* Circular Gallery Container */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Gallery Wrapper with proper height */}
          <div
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-black dark:from-black dark:via-gray-900 dark:to-gray-800 shadow-2xl"
            style={{ height: '600px' }}
          >
            <CircularGallery
              items={galleryItems}
              bend={3}
              textColor="#10B981"
              borderRadius={0.05}
              scrollEase={0.02}
              scrollSpeed={2}
              font="bold 24px 'Poppins', sans-serif"
            />
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
        </motion.div>

        {/* Gallery Footer Info */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {language === 'en'
              ? 'Each photo represents a unique moment in time, capturing the beauty of everyday life and special occasions. Feel free to explore and enjoy the journey through these visual stories.'
              : 'Setiap foto merepresentasikan momen unik dalam waktu, menangkap keindahan kehidupan sehari-hari dan acara spesial. Jelajahi dan nikmati perjalanan melalui cerita visual ini.'}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default MyGallery;
