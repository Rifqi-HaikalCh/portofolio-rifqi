"use client";

import React, { useEffect, useState } from 'react';
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

  // Auto-dismiss after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 8000);

    return () => clearTimeout(timer);
  }, [onClose]);

  // Handle action clicks
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
    onClose();
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-[9999] max-w-sm w-full"
      initial={{ opacity: 0, scale: 0.8, y: 100 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 100 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 25,
        duration: 0.5
      }}
    >
      <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl rounded-3xl p-6 border border-emerald-500/20">
        {/* Header with EQbot */}
        <div className="flex items-start gap-4 mb-4">
          {/* Lottie Animation */}
          <div className="w-16 h-16 flex-shrink-0 bg-gradient-to-br from-emerald-100 to-blue-100 dark:from-emerald-900/50 dark:to-blue-900/50 rounded-2xl flex items-center justify-center overflow-hidden shadow-lg">
            <Lottie 
              animationData={assistantAnimation} 
              loop={true}
              className="w-12 h-12"
            />
            {/* Status indicator */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full animate-pulse shadow-lg"></div>
          </div>
          
          <div className="flex-1">
            {/* EQbot Header */}
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-extrabold text-lg bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                EQbot
              </h4>
              
              {/* Close Button */}
              <button 
                onClick={onClose} 
                className="w-8 h-8 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-white transition-all duration-200"
              >
                <X size={16} />
              </button>
            </div>
            
            {/* Status dots */}
            <div className="flex gap-1 mb-3">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
            </div>
          </div>
        </div>
        
        {/* Message Content */}
        <div className="space-y-3">
          <h5 className="font-bold text-gray-800 dark:text-white text-base">
            {t(message.titleEn, message.titleId)}
          </h5>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {t(message.messageEn, message.messageId)}
          </p>
          
          {/* Action Button */}
          {message.actionType && message.actionType !== 'none' && (
            <button
              onClick={handleActionClick}
              className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {t(message.actionTextEn || '', message.actionTextId || '')}
            </button>
          )}
        </div>
        
        {/* Progress bar */}
        <div className="mt-4 w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 to-blue-500"
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 8, ease: "linear" }}
          />
        </div>
      </div>
    </motion.div>
  );
};