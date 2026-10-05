"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { SkipForward } from 'lucide-react';
import Lottie from 'lottie-react';
import { premiumEasing } from '../../lib/optimized-animations';
import assistantAnimation from '../../../public/assets/assistant2.json';
import multitaskingAnimation from '../../../public/assets/Multitasking.json';

interface LoadingScreenProps {
  onComplete?: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isSkipping, setIsSkipping] = useState(false);
  const [canProceed, setCanProceed] = useState(true);
  const [showSkipButton, setShowSkipButton] = useState(false);
  const assistantRef = useRef(null);
  const multitaskingRef = useRef(null);


  // Create visual feedback for typing effect
  const createTypingFeedback = () => {
    const assistantElement = assistantRef.current;
    if (assistantElement && assistantElement.style) {
      // Subtle vibration effect
      try {
        assistantElement.style.transform = 'scale(1.02)';
        setTimeout(() => {
          if (assistantElement && assistantElement.style) {
            assistantElement.style.transform = 'scale(1)';
          }
        }, 100);
      } catch (error) {
        console.info('Visual feedback not available for this element');
      }
    }
  };

  // Skip button handler
  const handleSkip = () => {
    setIsSkipping(true);
    setIsExiting(true);
    setTimeout(() => {
      onComplete?.();
    }, 800);
  };

  // Show skip button after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkipButton(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const steps = [
    {
      id: 0,
      text: "Hello, welcome to this portfolio page.",
      animation: "assistant",
      duration: 3500
    },
    {
      id: 1,
      text: "I am EQbot, your guide on this page.",
      animation: "assistant",
      duration: 3500
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
      text: "Or need someone to design interface and user experience?",
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
    // Enhanced visual feedback when step changes
    if (currentStep < steps.length && canProceed) {
      // Add small delay for better synchronization
      const feedbackTimer = setTimeout(() => {
        createTypingFeedback(); // Visual feedback only
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
  }, [currentStep, onComplete, canProceed]);

  const currentStepData = steps[currentStep];

  return (
    <>
      {/* Curtain Opening Animation */}
      <AnimatePresence>
        {isSkipping && (
          <>
            {/* Top Curtain */}
            <motion.div
              className="fixed top-0 left-0 w-full h-1/2 bg-ink z-[99999]"
              initial={{ y: 0 }}
              animate={{ y: '-100%' }}
              transition={{
                duration: 0.8,
                ease: premiumEasing.expo
              }}
            />
            {/* Bottom Curtain */}
            <motion.div
              className="fixed bottom-0 left-0 w-full h-1/2 bg-ink z-[99999]"
              initial={{ y: 0 }}
              animate={{ y: '100%' }}
              transition={{
                duration: 0.8,
                ease: premiumEasing.expo
              }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Main Loading Screen */}
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-paper text-ink z-[99998] overflow-hidden"
        initial={{ opacity: 1 }}
        animate={{ 
          y: isExiting && !isSkipping ? "-100%" : 0,
          opacity: isExiting && !isSkipping ? 0 : 1,
          scale: 1
      }}
      transition={{ 
        duration: 1.5, 
        ease: [0.76, 0, 0.24, 1],
        delay: isExiting ? 0 : 0
      }}
    >
        {/* Skip Button */}
        <AnimatePresence>
          {showSkipButton && !isExiting && (
            <motion.button
              onClick={handleSkip}
              className="absolute top-8 right-8 z-10 px-4 py-2 border border-line bg-paper text-ink text-sm flex items-center gap-2"
              initial={{ opacity: 0, scale: 0.8, x: 100 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 100 }}
              whileHover={{ opacity: 0.8 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
            >
              <span>Skip</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <SkipForward size={18} />
              </motion.div>
            </motion.button>
          )}
        </AnimatePresence>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 max-w-4xl mx-auto px-6">
          {/* Animation Container */}
          <motion.div 
            className="flex-shrink-0 w-64 h-64 lg:w-80 lg:h-80 flex items-center justify-center"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ 
              scale: isExiting ? 0 : 1, 
              rotate: isExiting ? 180 : 0,
              filter: 'none'
          }}
            transition={{ 
              duration: isSkipping ? 0.3 : 0.8, 
              ease: "backOut",
              delay: isExiting && !isSkipping ? 0 : 0.5 
            }}
          >
          <AnimatePresence mode="wait">
            {currentStepData.animation === "assistant" && (
              <motion.div
                key="assistant"
                ref={assistantRef}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0, rotate: -10 }}
                transition={{ duration: 0.6, ease: "backOut" }}
                className="w-full h-full"
              >
                <Lottie
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
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight"
            >
              <TypeAnimation
                sequence={[currentStepData.text]}
                wrapper="span"
                speed={60}
                cursor={true}
                className="font-serif text-ink"
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
                className={`h-1 transition-all duration-500 ${
                  index === currentStep 
                    ? 'w-8 bg-accent'
                    : index < currentStep
                    ? 'w-6 bg-ink'
                    : 'w-2 bg-line'
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.3 }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
    </>
  );
};

export default LoadingScreen;