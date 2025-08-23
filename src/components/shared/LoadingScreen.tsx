"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

const LoadingScreen: React.FC = () => {
  const [typingCompleted, setTypingCompleted] = useState(false);
  const name = "R H C";

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 z-[99999]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.5 } }}
    >
      <div className="text-2xl md:text-4xl font-semibold text-gray-600 dark:text-gray-400 mb-8">
        <TypeAnimation
          sequence={[
            'Hello there...',
            1500,
            'Welcome to my space.',
            1500,
            'Just a moment...',
            2000,
            () => setTypingCompleted(true)
          ]}
          wrapper="span"
          speed={50}
          cursor={true}
        />
      </div>
      <AnimatePresence>
        {typingCompleted && (
          <motion.div
            className="flex text-4xl md:text-6xl font-bold font-jetbrains-mono"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {name.split('').map((char, index) => (
              <motion.span
                key={index}
                className="bg-gradient-to-r from-emerald-500 to-blue-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                {char === ' ' ? <span>&nbsp;</span> : char}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LoadingScreen;