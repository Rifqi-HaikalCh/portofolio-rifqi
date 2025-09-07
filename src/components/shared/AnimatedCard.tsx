'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { premiumHover, subtleHover, premiumEasing } from '../../lib/optimized-animations';

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
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.7, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 120,
        damping: 15
      }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={hoverScale > 1.02 ? premiumHover : subtleHover}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        willChange: 'transform, opacity',
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden'
      }}
    >
      {/* Removed hover gradient overlay to prevent background highlight */}
      
      {/* Removed animated border glow to prevent background highlight */}
      
      {/* Removed corner accent to prevent background highlight */}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};