'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  velocity: {
    x: number;
    y: number;
  };
}

interface ParticleEffectProps {
  x: number;
  y: number;
  color: string;
  onComplete?: () => void;
}

export const ParticleEffect: React.FC<ParticleEffectProps> = ({ x, y, color, onComplete }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles
    const newParticles: Particle[] = [];
    const particleCount = 8;

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const speed = 50 + Math.random() * 100;

      newParticles.push({
        id: i,
        x: x,
        y: y,
        color: color,
        size: 4 + Math.random() * 6,
        velocity: {
          x: Math.cos(angle) * speed,
          y: Math.sin(angle) * speed - 50 // Bias upward
        }
      });
    }

    setParticles(newParticles);

    // Auto cleanup
    const timer = setTimeout(() => {
      setParticles([]);
      if (onComplete) onComplete();
    }, 1000);

    return () => clearTimeout(timer);
  }, [x, y, color, onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              backgroundColor: particle.color,
              width: particle.size,
              height: particle.size,
              left: particle.x,
              top: particle.y,
              boxShadow: `0 0 10px ${particle.color}`,
            }}
            initial={{
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1,
            }}
            animate={{
              x: particle.velocity.x,
              y: particle.velocity.y,
              opacity: 0,
              scale: 0,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ParticleEffect;
