"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface FloatingAudioControlProps {
  autoPlayAfterNotification?: boolean;
}

export const FloatingAudioControl: React.FC<FloatingAudioControlProps> = ({ 
  autoPlayAfterNotification = true 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize background music
  useEffect(() => {
    // Try to load background music, but don't fail if it doesn't exist
    try {
      audioRef.current = new Audio('/assets/backsound.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
      audioRef.current.preload = 'auto';
      
      const handleCanPlay = () => setIsLoaded(true);
      const handleEnded = () => setIsPlaying(false);
      const handleError = () => {
        console.info('Background music file not found - audio control will be hidden');
        setIsLoaded(false);
      };
      
      audioRef.current.addEventListener('canplaythrough', handleCanPlay);
      audioRef.current.addEventListener('ended', handleEnded);
      audioRef.current.addEventListener('error', handleError);
      
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('canplaythrough', handleCanPlay);
          audioRef.current.removeEventListener('ended', handleEnded);
          audioRef.current.removeEventListener('error', handleError);
          audioRef.current.pause();
          audioRef.current = null;
        }
      };
    } catch (error) {
      console.info('Background music not available');
      setIsLoaded(false);
    }
  }, []);

  // Auto-play after initial notification
  useEffect(() => {
    if (autoPlayAfterNotification && isLoaded) {
      const autoPlayTimer = setTimeout(() => {
        handlePlay();
      }, 2000); // Start 2 seconds after the welcome notification
      
      return () => clearTimeout(autoPlayTimer);
    }
  }, [autoPlayAfterNotification, isLoaded]);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handlePlay = () => {
    if (audioRef.current && isLoaded) {
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  if (!isLoaded) return null;

  return (
    <>
      {/* Main floating control */}
      <motion.div
        className="fixed bottom-6 right-6 z-[99998] flex flex-col items-end gap-3"
        initial={{ opacity: 0, scale: 0.5, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ 
          delay: 3,
          type: "spring", 
          stiffness: 300, 
          damping: 20 
        }}
      >
        {/* Volume control slider */}
        <AnimatePresence>
          {showVolumeSlider && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/20 dark:border-gray-700/30"
            >
              <div className="flex items-center gap-3">
                <motion.button
                  onClick={toggleMute}
                  className="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-emerald-500 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </motion.button>
                
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, rgb(16, 185, 129) 0%, rgb(16, 185, 129) ${volume * 100}%, rgb(229, 231, 235) ${volume * 100}%, rgb(229, 231, 235) 100%)`
                  }}
                />
                
                <span className="text-xs text-gray-500 dark:text-gray-400 w-8 text-center">
                  {Math.round(volume * 100)}%
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main play/pause button */}
        <motion.button
          onClick={togglePlay}
          onMouseEnter={() => setShowVolumeSlider(true)}
          onMouseLeave={() => setShowVolumeSlider(false)}
          className="group relative w-16 h-16 bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-600 rounded-full shadow-2xl hover:shadow-glow border-2 border-white/20 backdrop-blur-sm overflow-hidden"
          whileHover={{ 
            scale: 1.1, 
            rotate: [0, -2, 2, 0],
            boxShadow: "0 20px 40px rgba(16, 185, 129, 0.4)"
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 via-blue-400/30 to-purple-400/30"
            animate={{
              rotate: isPlaying ? [0, 360] : 0,
              scale: isPlaying ? [1, 1.1, 1] : 1
            }}
            transition={{
              rotate: { duration: 8, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          
          {/* Play/Pause Icon */}
          <div className="relative z-10 flex items-center justify-center text-white">
            <AnimatePresence mode="wait">
              {isPlaying ? (
                <motion.div
                  key="pause"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Pause size={24} fill="currentColor" />
                </motion.div>
              ) : (
                <motion.div
                  key="play"
                  initial={{ scale: 0, rotate: 90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                  style={{ marginLeft: '2px' }}
                >
                  <Play size={24} fill="currentColor" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Ripple effect */}
          <motion.div
            className="absolute inset-0 bg-white/20 rounded-full"
            animate={isPlaying ? {
              scale: [1, 1.5, 1],
              opacity: [0.3, 0, 0.3]
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 rounded-full" />
          
          {/* Status indicator */}
          <motion.div 
            className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white shadow-lg"
            animate={isPlaying ? {
              scale: [1, 1.3, 1],
              boxShadow: [
                "0 0 5px rgba(34, 197, 94, 0.5)",
                "0 0 15px rgba(34, 197, 94, 0.8)",
                "0 0 5px rgba(34, 197, 94, 0.5)"
              ]
            } : {}}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.button>
      </motion.div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgb(16, 185, 129), rgb(5, 150, 105));
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          transition: all 0.2s ease;
        }
        
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 8px rgba(16, 185, 129, 0.4);
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgb(16, 185, 129), rgb(5, 150, 105));
          cursor: pointer;
          border: none;
        }
      `}</style>
    </>
  );
};

export default FloatingAudioControl;