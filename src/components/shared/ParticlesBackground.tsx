"use client";
import { useCallback } from 'react';
import { loadSlim } from 'tsparticles-slim';
import Particles from 'react-tsparticles';
import type { Container, Engine } from 'tsparticles-engine';

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // Particles loaded
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        // Optimasi Performa: Batasi FPS ke 60 (Standar layar)
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            push: {
              // Mengurangi jumlah regenerasi saat klik
              quantity: 2,
            },
            repulse: {
              distance: 150,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#10B981",
          },
          links: {
            color: "#10B981",
            distance: 150,
            enable: true,
            opacity: 0.2,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 0.8, // Gerakan lebih tenang
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 1000, // Area lebih luas agar partikel lebih tersebar
            },
            value: 30, // Jumlah partikel optimal
          },
          opacity: {
            value: 0.3, // Lebih halus agar tidak mengganggu fokus
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 }, // Ukuran lebih kecil untuk performa
          },
        },
        // Menonaktifkan deteksi retina untuk menghemat GPU
        detectRetina: false,
      }}
    />
  );
};

export default ParticlesBackground;