'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { Camera, X, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import Stack from '../shared/Stack';

export const MobileGallery: React.FC = () => {
  const { language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showStack, setShowStack] = useState(true);

  // Gallery data with WebP images
  const galleryItems = [
    '/assets/view-1.webp',
    '/assets/view-2.webp',
    '/assets/view-3.webp',
    '/assets/view-4.webp',
    '/assets/view-5.webp',
    '/assets/view-6.webp',
    '/assets/view-7.webp',
    '/assets/view-8.webp',
    '/assets/view-9.webp',
    '/assets/view-10.webp',
    '/assets/view-11.webp',
    '/assets/view-12.webp',
    '/assets/view-13.webp',
    '/assets/view-14.webp',
    '/assets/view-15.webp',
    '/assets/view-16.webp',
    '/assets/view-17.webp',
    '/assets/view-18.webp',
    '/assets/view-19.webp',
    '/assets/view-20.webp',
    '/assets/view-21.webp',
    '/assets/view-22.webp',
    '/assets/view-23.webp',
    '/assets/view-24.webp',
    '/assets/view-25.webp',
  ];

  // Convert gallery items to Stack format (show 10 random images)
  const stackData = galleryItems
    .sort(() => Math.random() - 0.5)
    .slice(0, 10)
    .map((img, index) => ({
      id: index + 1,
      img,
      alt: `Gallery ${index + 1}`
    }));

  const nextImage = () => {
    setSelectedImage((prev) => (prev !== null ? (prev + 1) % galleryItems.length : 0));
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev !== null ? (prev - 1 + galleryItems.length) % galleryItems.length : 0));
  };

  return (
    <section id="gallery" className="py-16 px-6 bg-white dark:bg-gray-800">
      {/* Section Header */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="inline-block px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full text-sm font-semibold mb-4 flex items-center justify-center gap-2 w-fit mx-auto">
          <Camera size={16} />
          {language === 'en' ? 'My Gallery' : 'Galeri Saya'}
        </span>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          {language === 'en' ? 'Visual Stories' : 'Cerita Visual'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-4">
          {language === 'en'
            ? 'Capturing moments and perspectives through my lens'
            : 'Menangkap momen dan perspektif melalui lensa saya'}
        </p>

        {/* View Toggle */}
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => setShowStack(true)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              showStack
                ? 'bg-emerald-500 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
            }`}
          >
            {language === 'en' ? 'Stack View' : 'Tampilan Stack'}
          </button>
          <button
            onClick={() => setShowStack(false)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              !showStack
                ? 'bg-emerald-500 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
            }`}
          >
            {language === 'en' ? 'Grid View' : 'Tampilan Grid'}
          </button>
        </div>
      </motion.div>

      {showStack ? (
        /* Stack Gallery */
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-6"
          >
            {/* Instructions */}
            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-4 max-w-xs text-center">
              <p className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">
                {language === 'en'
                  ? '👆 Drag or swipe cards to explore gallery'
                  : '👆 Geser atau swipe kartu untuk jelajahi galeri'}
              </p>
            </div>

            {/* Stack Component */}
            <div className="py-8">
              <Stack
                randomRotation={true}
                sensitivity={150}
                sendToBackOnClick={false}
                cardDimensions={{ width: 280, height: 350 }}
                cardsData={stackData}
                animationConfig={{ stiffness: 260, damping: 20 }}
              />
            </div>

            {/* Refresh Button */}
            <button
              onClick={() => {
                setShowStack(false);
                setTimeout(() => setShowStack(true), 50);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-full font-semibold shadow-lg active:scale-95 transition-transform"
            >
              <RefreshCw size={18} />
              {language === 'en' ? 'Shuffle Stack' : 'Acak Stack'}
            </button>

            {/* Photo count */}
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {language === 'en' ? `Showing 10 of ${galleryItems.length} photos` : `Menampilkan 10 dari ${galleryItems.length} foto`}
            </p>
          </motion.div>
        </div>
      ) : (
        /* Grid Gallery */
        <div>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {galleryItems.map((image, index) => (
              <motion.button
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.02 }}
                onClick={() => setSelectedImage(index)}
                className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-700 active:scale-95 transition-transform"
              >
                <Image
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 active:opacity-100 transition-opacity" />
              </motion.button>
            ))}
          </div>

          {/* Photo count */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {language === 'en' ? `${galleryItems.length} Photos` : `${galleryItems.length} Foto`}
            </p>
          </motion.div>
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-4 z-10 flex items-center justify-between">
              <span className="text-white font-semibold">
                {selectedImage + 1} / {galleryItems.length}
              </span>
              <button
                onClick={() => setSelectedImage(null)}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white active:scale-90 transition-transform"
              >
                <X size={20} />
              </button>
            </div>

            {/* Image */}
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <motion.div
                key={selectedImage}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative w-full h-full max-w-4xl max-h-full"
              >
                <Image
                  src={galleryItems[selectedImage]}
                  alt={`Gallery ${selectedImage + 1}`}
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </div>

            {/* Navigation */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white active:scale-90 transition-transform shadow-lg"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white active:scale-90 transition-transform shadow-lg"
            >
              <ChevronRight size={24} />
            </button>

            {/* Swipe hint */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
              <p className="text-white/60 text-sm">
                {language === 'en' ? 'Swipe or tap arrows to navigate' : 'Geser atau tap panah untuk navigasi'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
