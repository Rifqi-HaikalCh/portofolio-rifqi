"use client";
import { useState, useEffect, useRef } from 'react';
import { useAudio } from '../../hooks/useAudio';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Lottie from 'lottie-react';
import assistantAnimation from '../../../public/assets/assistant2.json';
import multitaskingAnimation from '../../../public/assets/Multitasking.json';

interface LoadingScreenProps {
  onComplete?: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const assistantRef = useRef(null);
  const multitaskingRef = useRef(null);
  
  // Use custom audio hook for text sound effects
  const {
    play: playTextSound,
    isLoaded: isAudioLoaded,
    error: audioError
  } = useAudio('/assets/text.wav', {
    volume: 0.4,
    preload: true,
    onError: () => {
      console.info('Text audio not available - using silent mode');
    }
  });
  
  const audioAvailable = isAudioLoaded && !audioError;


  // Enhanced audio feedback with visual synchronization
  const playTextSoundWithFallback = async () => {
    if (audioAvailable) {
      try {
        await playTextSound();
      } catch (error) {
        console.info('Audio play prevented by browser policy');
        createTypingFeedback(); // Fallback to visual feedback
      }
    } else {
      createTypingFeedback(); // Visual feedback when audio unavailable
    }
  };

  // Create typing sound effect even without audio file
  const createTypingFeedback = () => {
    if (!audioAvailable) {
      // Visual feedback when audio is not available
      const assistantElement = assistantRef.current;
      if (assistantElement) {
        // Subtle vibration effect
        (assistantElement as any).style.transform = 'scale(1.02)';
        setTimeout(() => {
          (assistantElement as any).style.transform = 'scale(1)';
        }, 100);
      }
    }
  };

  const steps = [
    {
      id: 0,
      text: "Hello, welcome to this portfolio page.",
      animation: "assistant",
      duration: 4000
    },
    {
      id: 1,
      text: "I am EQbot, your guide on this page.",
      animation: "assistant",
      duration: 4000
    },
    {
      id: 2,
      text: "Are you looking for someone to create a website?",
      animation: "assistant",
      duration: 5000
    },
    {
      id: 3,
      text: "Or looking for someone to create a mobile app?",
      animation: "assistant",
      duration: 5000
    },
    {
      id: 4,
      text: "Or need someone to design interface and user experience of your app?",
      animation: "assistant",
      duration: 6000
    },
    {
      id: 5,
      text: "Here he is, the right person for the job!",
      animation: "multitasking",
      duration: 4000
    }
  ];

  useEffect(() => {
    // Enhanced audio-visual feedback when step changes
    if (currentStep < steps.length && isAudioLoaded) {
      // Add small delay for better synchronization
      const feedbackTimer = setTimeout(() => {
        playTextSoundWithFallback();
      }, 200);

      const timer = setTimeout(() => {
        if (currentStep < steps.length - 1) {
          setCurrentStep(prev => prev + 1);
        } else {
          // Start exit animation
          setIsExiting(true);
          setTimeout(() => {
            onComplete?.();
          }, 1500);
        }
      }, steps[currentStep].duration);

      return () => {
        clearTimeout(feedbackTimer);
        clearTimeout(timer);
      };
    }
  }, [currentStep, onComplete, isAudioLoaded]);

  const currentStepData = steps[currentStep];

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 z-[99999] overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ 
        y: isExiting ? "-100%" : 0,
        opacity: isExiting ? 0 : 1 
      }}
      transition={{ 
        duration: 1.5, 
        ease: [0.76, 0, 0.24, 1],
        delay: isExiting ? 0 : 0
      }}
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 max-w-4xl mx-auto px-6">
        {/* Animation Container */}
        <motion.div 
          className="flex-shrink-0 w-64 h-64 lg:w-80 lg:h-80 flex items-center justify-center"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ 
            scale: isExiting ? 0 : 1, 
            rotate: isExiting ? 180 : 0 
          }}
          transition={{ 
            duration: 0.8, 
            ease: "backOut",
            delay: isExiting ? 0 : 0.5 
          }}
        >
          <AnimatePresence mode="wait">
            {currentStepData.animation === "assistant" && (
              <motion.div
                key="assistant"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0, rotate: -10 }}
                transition={{ duration: 0.6, ease: "backOut" }}
                className="w-full h-full"
              >
                <Lottie
                  lottieRef={assistantRef}
                  animationData={require('../../../public/assets/assistant2.json')}
                  loop={true}
                  className="w-full h-full"
                />
              </motion.div>
            )}
            
            {currentStepData.animation === "multitasking" && (
              <motion.div
                key="multitasking"
                initial={{ scale: 0, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ 
                  duration: 1,
                  ease: "backOut",
                  delay: 0.3
                }}
                className="w-full h-full"
              >
                <Lottie
                  lottieRef={multitaskingRef}
                  animationData={require('../../../public/assets/Multitasking.json')}
                  loop={true}
                  className="w-full h-full"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Text Container */}
        <motion.div 
          className="flex-1 max-w-2xl text-center lg:text-left"
          initial={{ opacity: 0, x: 50 }}
          animate={{ 
            opacity: isExiting ? 0 : 1, 
            x: isExiting ? -50 : 0 
          }}
          transition={{ 
            duration: 0.8, 
            delay: isExiting ? 0 : 0.8 
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight"
            >
              <TypeAnimation
                sequence={[currentStepData.text]}
                wrapper="span"
                speed={60}
                cursor={true}
                className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl"
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Progress Indicator */}
          <motion.div 
            className="flex gap-2 justify-center lg:justify-start mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: isExiting ? 0 : 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            {steps.map((_, index) => (
              <motion.div
                key={index}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index === currentStep 
                    ? 'w-8 bg-gradient-to-r from-emerald-500 to-blue-500' 
                    : index < currentStep 
                    ? 'w-6 bg-emerald-400' 
                    : 'w-2 bg-gray-300 dark:bg-gray-600'
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.3 }}
              />
            ))}
          </motion.div>
          
          {/* Elegant Floating Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full opacity-20"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 2) * 40}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.6, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Premium Gradient Overlay for Depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/10 dark:to-black/10 pointer-events-none" />
    </motion.div>
  );
};

export default LoadingScreen;