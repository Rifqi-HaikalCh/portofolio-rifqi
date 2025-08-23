"use client";

import { motion } from 'framer-motion';
import { X, Coffee } from 'lucide-react';

interface TimedNotificationProps {
  onClose: () => void;
}

export const TimedNotification: React.FC<TimedNotificationProps> = ({ onClose }) => {
  return (
    <motion.div
      className="fixed bottom-5 right-5 z-[99990] w-80 bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-5 border border-emerald-500/20 flex items-start gap-4"
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      layout
    >
      <div className="w-10 h-10 flex-shrink-0 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center">
        <Coffee className="w-6 h-6 text-emerald-500" />
      </div>
      <div>
        <h4 className="font-bold text-gray-800 dark:text-white">A Quick Break?</h4>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          You've been exploring for a while. Don't forget to stretch and maybe grab a coffee! ☕
        </p>
      </div>
      <button 
        onClick={onClose} 
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors duration-200"
      >
        <X size={18} />
      </button>
    </motion.div>
  );
};