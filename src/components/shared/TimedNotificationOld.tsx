"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2 } from 'lucide-react';
import Lottie from 'lottie-react';
import { useLanguage } from '../../context/LanguageContext';
import { premiumEasing, modalContent, glowPulse } from '../../lib/optimized-animations';
import assistantAnimation from '../../../public/assets/assistant.json';

export interface NotificationMessage {
  id: string;
  titleEn: string;
  titleId: string;
  messageEn: string;
  messageId: string;
  actionType?: 'contact' | 'download' | 'none';
  actionTextEn?: string;
  actionTextId?: string;
}

interface TimedNotificationProps {
  message: NotificationMessage;
  onClose: () => void;
  onAction?: () => void;
}

export const TimedNotification: React.FC<TimedNotificationProps> = ({ 
  message, 
  onClose, 
  onAction 
}) => {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [shouldFloat, setShouldFloat] = useState(false);
  // Enhanced notification with visual feedback and auto-float
  useEffect(() => {
    const playNotificationFeedback = () => {
      // Visual feedback
      document.body.style.filter = 'brightness(1.1)';
      setTimeout(() => {
        document.body.style.filter = 'brightness(1)';
      }, 100);
    };

    // Auto-float detection based on scroll position
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShouldFloat(scrollY > 200);
    };

    // Perfect timing sync with animation entrance
    const feedbackTimer = setTimeout(playNotificationFeedback, 300);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(feedbackTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleActionClick = () => {
    if (message.actionType === 'contact') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } else if (message.actionType === 'download') {
      const link = document.createElement('a');
      link.href = '/assets/CV Rifqi Haikal Chairiansyah.pdf';
      link.download = 'CV Rifqi Haikal Chairiansyah.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    if (onAction) onAction();
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300);
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Floating Notification */}
      <motion.div
        className={`fixed z-[99999] transition-all duration-700 ${
          shouldFloat 
            ? 'bottom-6 right-6 w-80' 
            : 'bottom-8 right-8 w-96'
        }`}
        variants={modalContent}
        initial="hidden"
        animate="visible"
        exit="hidden"
        style={{
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)'
        }}
      >
        <motion.div
          className={`bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl shadow-2xl rounded-3xl border border-emerald-500/20 overflow-hidden transition-all duration-500 ${
            isExpanded ? 'p-8' : 'p-6'
          }`}
          animate={glowPulse}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 25px 50px rgba(16, 185, 129, 0.2)",
            transition: { type: "spring", stiffness: 300, damping: 20 }
          }}
          layout
        >
          <div className="flex items-start gap-4">
            {/* Enhanced Lottie Animation */}
            <motion.div 
              className={`flex-shrink-0 bg-gradient-to-br from-emerald-100 to-blue-100 dark:from-emerald-900/50 dark:to-blue-900/50 rounded-2xl flex items-center justify-center overflow-hidden shadow-lg transition-all duration-300 ${
                isExpanded ? 'w-20 h-20' : 'w-16 h-16'
              }`}
              whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.3 }}
            >
              <Lottie 
                animationData={assistantAnimation} 
                loop={true}
                className={`transition-all duration-300 ${
                  isExpanded ? 'w-14 h-14' : 'w-12 h-12'
                }`}
              />
              {/* Floating indicator */}
              <motion.div 
                className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full shadow-lg"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
            <div className="flex-1">
              {/* EQbot Header with gradient */}
              <motion.div 
                className="flex items-center justify-between mb-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-3">
                  <h4 className={`font-extrabold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent transition-all duration-300 ${
                    isExpanded ? 'text-xl' : 'text-lg'
                  }`}>
                    EQbot
                  </h4>
                  <div className="flex gap-1">
                    <motion.div 
                      className="w-2 h-2 bg-emerald-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div 
                      className="w-2 h-2 bg-blue-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                    />
                    <motion.div 
                      className="w-2 h-2 bg-purple-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                    />
                  </div>
                </div>
                
                {/* Expand/Collapse Button */}
                <motion.button
                  onClick={handleExpand}
                  className="w-8 h-8 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-white transition-all duration-200"
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Maximize2 size={14} />
                </motion.button>
              </motion.div>
              
              {/* Message Content */}
              <motion.h5 
                className={`font-bold text-gray-800 dark:text-white mb-3 transition-all duration-300 ${
                  isExpanded ? 'text-xl' : 'text-base'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {t(message.titleEn, message.titleId)}
              </motion.h5>
              
              <motion.p 
                className={`text-gray-600 dark:text-gray-300 leading-relaxed mb-4 transition-all duration-300 ${
                  isExpanded ? 'text-base' : 'text-sm'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {t(message.messageEn, message.messageId)}
              </motion.p>
              
              {/* Action Button */}
              {message.actionType && message.actionType !== 'none' && (
                <motion.button
                  onClick={handleActionClick}
                  className={`bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-glow transition-all duration-300 hover:scale-105 ${
                    isExpanded ? 'px-6 py-3 text-base' : 'px-4 py-2 text-sm'
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t(message.actionTextEn || '', message.actionTextId || '')}
                </motion.button>
              )}
      
              
              {/* Enhanced Close Button */}
              <motion.button 
                onClick={handleClose} 
                className="absolute top-4 right-4 w-8 h-8 bg-red-100 dark:bg-red-900/50 hover:bg-red-200 dark:hover:bg-red-800/50 rounded-full flex items-center justify-center text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-all duration-200 group"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={14} className="group-hover:rotate-90 transition-transform duration-200" />
              </motion.button>
            </div>
          </div>
          
          {/* Decorative gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-blue-500/5 to-purple-500/5 rounded-3xl pointer-events-none"></div>
        </motion.div>
      </motion.div>
    </>
  );
};
