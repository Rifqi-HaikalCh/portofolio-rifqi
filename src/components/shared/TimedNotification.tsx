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
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] max-w-sm w-[calc(100vw-2rem)] sm:w-full"
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
      <div className="bg-raised border border-line p-5 shadow-[0_16px_40px_rgba(27,25,22,0.12)]">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 flex-shrink-0 border border-line bg-paper flex items-center justify-center overflow-hidden">
            <Lottie
              animationData={assistantAnimation}
              loop
              className="w-10 h-10"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-3 mb-2">
              <h4 className="font-serif text-lg text-ink">EQbot</h4>
              <button
                onClick={onClose}
                aria-label="Close"
                className="w-8 h-8 border border-line flex items-center justify-center text-muted hover:text-ink"
              >
                <X size={16} />
              </button>
            </div>
            <h5 className="text-sm font-medium text-ink">
              {t(message.titleEn, message.titleId)}
            </h5>
          </div>
        </div>

        <p className="text-sm text-muted leading-relaxed">
          {t(message.messageEn, message.messageId)}
        </p>

        {message.actionType && message.actionType !== 'none' && (
          <button
            onClick={handleActionClick}
            className="btn-primary-custom w-full mt-4"
          >
            {t(message.actionTextEn || '', message.actionTextId || '')}
          </button>
        )}

        <div className="mt-4 w-full h-px bg-line overflow-hidden">
          <motion.div
            className="h-full bg-accent"
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: 8, ease: 'linear' }}
          />
        </div>
      </div>
    </motion.div>
  );
};