"use client";
import { motion } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const name = "R H C"; // Inisial dari Rifqi Haikal Chairiansyah

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900 z-[9999]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="flex text-4xl md:text-6xl font-bold font-jetbrains-mono">
        {name.split('').map((char, index) => (
          <motion.span
            key={index}
            variants={itemVariants}
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent"
          >
            {char === ' ' ? <span>&nbsp;</span> : char}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;