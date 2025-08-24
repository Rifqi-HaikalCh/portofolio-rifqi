"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import Lottie from 'lottie-react';
import { useLanguage } from '../../context/LanguageContext';
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
  // Enhanced notification with visual feedback
  useEffect(() => {
    const playNotificationFeedback = () => {
      // Visual feedback
      document.body.style.filter = 'brightness(1.1)';
      setTimeout(() => {
        document.body.style.filter = 'brightness(1)';
      }, 100);
    };

    // Perfect timing sync with animation entrance
    const feedbackTimer = setTimeout(playNotificationFeedback, 300);
    return () => clearTimeout(feedbackTimer);
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

  return (
    <motion.div
      className="fixed bottom-5 right-5 z-[99990] w-96 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl shadow-2xl rounded-3xl p-6 border border-emerald-500/30 flex items-start gap-4 hover:shadow-glow transition-all duration-500"
      initial={{ opacity: 0, y: 50, scale: 0.8, rotate: -5 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, y: 50, scale: 0.8, rotate: 5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      layout
    >
      {/* Enhanced Lottie Animation */}
      <motion.div 
        className="w-14 h-14 flex-shrink-0 bg-gradient-to-br from-emerald-100 to-blue-100 dark:from-emerald-900/50 dark:to-blue-900/50 rounded-2xl flex items-center justify-center overflow-hidden shadow-lg"
        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
        transition={{ duration: 0.3 }}
      >
        <Lottie 
          animationData={assistantAnimation} 
          loop={true}
          className="w-10 h-10"
        />
        {/* Floating indicator */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full animate-pulse shadow-lg"></div>
      </motion.div>
      
      <div className="flex-1">
        {/* EQbot Header with gradient */}
        <motion.div 
          className="flex items-center gap-2 mb-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h4 className="font-extrabold text-lg bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
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
        </motion.div>
        
        {/* Message Content */}
        <motion.h5 
          className="font-bold text-gray-800 dark:text-white mb-2 text-base"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {t(message.titleEn, message.titleId)}
        </motion.h5>
        
        <motion.p 
          className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3"
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
            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl text-sm font-semibold shadow-lg hover:shadow-glow transition-all duration-300 hover:scale-105"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {t(message.actionTextEn || '', message.actionTextId || '')}
          </motion.button>
        )}
      </div>
      
      {/* Enhanced Close Button */}
      <motion.button 
        onClick={onClose} 
        className="absolute top-4 right-4 w-8 h-8 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-white transition-all duration-200 group"
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
      >
        <X size={16} className="group-hover:rotate-90 transition-transform duration-200" />
      </motion.button>
      
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-blue-500/5 to-purple-500/5 rounded-3xl pointer-events-none"></div>
    </motion.div>
  );
};