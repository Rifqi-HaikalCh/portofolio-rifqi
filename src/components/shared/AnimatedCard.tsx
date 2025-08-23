'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  hoverScale?: number;
  hoverY?: number;
  glowEffect?: boolean;
  onClick?: () => void;
  delay?: number;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className = '',
  hoverScale = 1.03,
  hoverY = -8,
  glowEffect = true,
  onClick,
  delay = 0
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative overflow-hidden cursor-pointer transition-all duration-500 ${glowEffect ? 'hover:shadow-glow' : 'hover:shadow-xl'} ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: "spring",
        stiffness: 100
      }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: hoverScale, 
        y: hoverY,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Hover gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300"
        animate={{ opacity: isHovered ? 1 : 0 }}
      />
      
      {/* Animated border glow */}
      {glowEffect && (
        <motion.div
          className="absolute inset-0 rounded-inherit"
          animate={{
            background: isHovered 
              ? 'linear-gradient(45deg, rgba(16, 185, 129, 0.3), rgba(59, 130, 246, 0.3), rgba(168, 85, 247, 0.3))'
              : 'transparent'
          }}
          transition={{ duration: 0.3 }}
          style={{ padding: '1px' }}
        >
          <div className="w-full h-full bg-white dark:bg-gray-800 rounded-inherit" />
        </motion.div>
      )}
      
      {/* Corner accent */}
      <motion.div
        className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-bl-2xl opacity-0"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};