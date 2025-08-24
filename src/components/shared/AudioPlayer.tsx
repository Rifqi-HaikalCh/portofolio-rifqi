"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Shuffle, Repeat, Music } from 'lucide-react';
import { useAudio } from '../../hooks/useAudio';

interface Track {
  id: string;
  title: string;
  artist: string;
  src: string;
}

interface AudioPlayerProps {
  autoPlay?: boolean;
  startDelay?: number;
  notificationVisible?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ 
  autoPlay = true, 
  startDelay = 2000,
  notificationVisible = false 
}) => {
  // Playlist configuration
  const playlist: Track[] = [
    {
      id: 'cinnamon-girl',
      title: 'Cinnamon Girl',
      artist: 'Lana Del Rey',
      src: '/assets/Cinnamon Girl · Lana Del Rey.mp3'
    },
    {
      id: 'i-think-they-call-this-love',
      title: 'I Think They Call This Love',
      artist: 'Elliot James Reay',
      src: '/assets/I Think They Call This Love.mp3'
    },
    {
      id: 'mean-it',
      title: 'Mean It',
      artist: 'Lauv & LANY',
      src: '/assets/Lauv LANY - Mean It.mp3'
    },
    {
      id: 'no-where',
      title: 'No Where',
      artist: 'Loco feat. Feby Putri',
      src: '/assets/Loco - No where with Feby Putri.mp3'
    },
    {
      id: 'deja-vu',
      title: 'deja vu',
      artist: 'Olivia Rodrigo',
      src: '/assets/Olivia Rodrigo - deja vu.mp3'
    }
  ];

  // Player state
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [positionShifted, setPositionShifted] = useState(false);

  const currentTrack = playlist[currentTrackIndex];
  
  // Use our custom useAudio hook
  const {
    play,
    pause,
    stop,
    setVolume,
    setMuted,
    isLoaded,
    isPlaying,
    isMuted,
    volume,
    duration,
    currentTime,
    error
  } = useAudio(currentTrack.src, {
    volume: 0.3,
    loop: false,
    preload: true,
    onEnded: () => {
      if (repeat) {
        play();
      } else {
        handleNext();
      }
    },
    onError: () => {
      console.warn(`Failed to load track: ${currentTrack.title}`);
    }
  });

  // Handle notification visibility for smart positioning
  useEffect(() => {
    setPositionShifted(notificationVisible);
  }, [notificationVisible]);

  // Initialize player visibility
  useEffect(() => {
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, startDelay);

    return () => {
      clearTimeout(showTimer);
    };
  }, [startDelay]);

  // Auto-play after loading
  useEffect(() => {
    if (autoPlay && isLoaded && isVisible) {
      const autoPlayTimer = setTimeout(() => {
        play();
      }, 1000);
      return () => clearTimeout(autoPlayTimer);
    }
  }, [autoPlay, isLoaded, isVisible, play]);




  const handleNext = useCallback(() => {
    if (shuffle) {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * playlist.length);
      } while (nextIndex === currentTrackIndex && playlist.length > 1);
      setCurrentTrackIndex(nextIndex);
    } else {
      setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
    }
  }, [shuffle, currentTrackIndex, playlist.length]);

  const handlePrevious = () => {
    if (currentTime > 3) {
      // If more than 3 seconds played, restart current track
      stop();
      play();
    } else {
      // Go to previous track
      setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setMuted(false);
    }
  };

  const toggleMute = () => {
    setMuted(!isMuted);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className={`fixed z-[40] transition-all duration-500 ease-out ${
        positionShifted 
          ? 'bottom-6 right-6 md:bottom-28 md:right-6' 
          : 'bottom-6 right-6'
      }`}
      initial={{ opacity: 0, scale: 0.5, y: 100 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: 0,
        x: positionShifted && window.innerWidth >= 768 ? -20 : 0
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 25,
        delay: 0.5
      }}
    >
      <motion.div
        className={`bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/30 overflow-hidden transition-all duration-500 ${
          isExpanded ? 'w-80' : 'w-16'
        }`}
        animate={{ 
          width: isExpanded ? 320 : 64,
          height: isExpanded ? 280 : 64
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Collapsed State - Mini Player */}
        {!isExpanded && (
          <motion.div
            className="w-16 h-16 flex items-center justify-center cursor-pointer group"
            onClick={() => setIsExpanded(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              {/* Spinning record effect */}
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-600 rounded-full flex items-center justify-center"
                animate={isPlaying ? { rotate: [0, 360] } : {}}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <Music size={20} className="text-white" />
              </motion.div>
              
              {/* Play/Pause indicator */}
              <motion.div
                className="absolute -bottom-1 -right-1 w-5 h-5 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1 }}
              >
                {isPlaying ? (
                  <Pause size={12} className="text-emerald-500" />
                ) : (
                  <Play size={12} className="text-emerald-500 ml-0.5" />
                )}
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Expanded State - Full Player */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <motion.h3 
                  className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  Now Playing
                </motion.h3>
                <motion.button
                  onClick={() => setIsExpanded(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="w-4 h-0.5 bg-gray-600 dark:bg-gray-400 rounded rotate-45 absolute" />
                  <div className="w-4 h-0.5 bg-gray-600 dark:bg-gray-400 rounded -rotate-45 absolute" />
                </motion.button>
              </div>

              {/* Track Info */}
              <motion.div 
                className="mb-6 text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="relative mb-4">
                  <motion.div
                    className="w-20 h-20 bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl"
                    animate={isPlaying ? { 
                      rotate: [0, 360],
                      scale: [1, 1.05, 1]
                    } : {}}
                    transition={{
                      rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                  >
                    <Music size={32} className="text-white" />
                  </motion.div>
                  
                  {!isLoaded && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-black/20 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </motion.div>
                  )}
                  
                  {error && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-red-500/20 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="text-red-400 text-xs">!</div>
                    </motion.div>
                  )}
                </div>
                
                <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-1 truncate">
                  {currentTrack.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm truncate">
                  {currentTrack.artist}
                </p>
              </motion.div>

              {/* Progress Bar */}
              <motion.div 
                className="mb-4"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-500 to-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>

              {/* Controls */}
              <motion.div 
                className="flex items-center justify-center gap-4 mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.button
                  onClick={handlePrevious}
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                  disabled={!isLoaded}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <SkipBack size={18} />
                </motion.button>

                <motion.button
                  onClick={isPlaying ? pause : play}
                  className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50"
                  disabled={!isLoaded}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AnimatePresence mode="wait">
                    {!isLoaded ? (
                      <motion.div
                        key="loading"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                      />
                    ) : error ? (
                      <motion.div
                        key="error"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="text-red-200 font-bold"
                      >
                        !
                      </motion.div>
                    ) : isPlaying ? (
                      <motion.div
                        key="pause"
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 90 }}
                      >
                        <Pause size={20} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="play"
                        initial={{ scale: 0, rotate: 90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: -90 }}
                        style={{ marginLeft: '2px' }}
                      >
                        <Play size={20} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

                <motion.button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                  disabled={!isLoaded}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <SkipForward size={18} />
                </motion.button>
              </motion.div>

              {/* Additional Controls */}
              <motion.div 
                className="flex items-center justify-between"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={() => setShuffle(!shuffle)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      shuffle 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Shuffle size={14} />
                  </motion.button>

                  <motion.button
                    onClick={() => setRepeat(!repeat)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      repeat 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Repeat size={14} />
                  </motion.button>
                </div>

                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={toggleMute}
                    className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  </motion.button>

                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="w-16 h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, rgb(16, 185, 129) 0%, rgb(16, 185, 129) ${volume * 100}%, rgb(229, 231, 235) ${volume * 100}%, rgb(229, 231, 235) 100%)`
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Visualizer Effect */}
        {isPlaying && (
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500"
            initial={{ scaleX: 0 }}
            animate={{ 
              scaleX: [0, 1, 0.8, 1],
              opacity: [0.5, 1, 0.7, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default AudioPlayer;