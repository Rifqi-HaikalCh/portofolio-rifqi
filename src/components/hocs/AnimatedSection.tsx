"use client";
import { motion, useInView, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className, id }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1, margin: "-100px" });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <section id={id} ref={ref} className={`relative py-20 ${className}`}>
      <motion.div
        variants={{
          hidden: { 
            opacity: 0, 
            y: 60,
            scale: 0.95,
            filter: "blur(10px)"
          },
          visible: { 
            opacity: 1, 
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            transition: {
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier for smooth easing
              delay: 0.1,
              staggerChildren: 0.1
            }
          },
        }}
        initial="hidden"
        animate={mainControls}
        style={{
          willChange: 'transform, opacity, filter',
          transform: 'translate3d(0, 0, 0)' // Enable GPU acceleration
        }}
      >
        {children}
      </motion.div>
    </section>
  );
};