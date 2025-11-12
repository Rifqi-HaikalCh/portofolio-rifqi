"use client";

import { useRef, useState, useEffect } from 'react';
import Matter, { Bodies } from 'matter-js';
import Image from 'next/image';
import ClickSpark from './ClickSpark';
import './FallingSkillCards.css';

interface Skill {
  name: string;
  image: string;
}

interface FallingSkillCardsProps {
  skills: Skill[];
  trigger?: 'auto' | 'scroll' | 'click' | 'hover';
  backgroundColor?: string;
  wireframes?: boolean;
  gravity?: number;
  mouseConstraintStiffness?: number;
  delay?: number; // Delay sebelum animasi falling dimulai (ms)
}

const FallingSkillCards: React.FC<FallingSkillCardsProps> = ({
  skills,
  trigger = 'auto',
  backgroundColor = 'transparent',
  wireframes = false,
  gravity = 0.8,
  mouseConstraintStiffness = 0.9,
  delay = 2000 // Default 2 detik setelah cards muncul
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const cardBodiesRef = useRef<Array<{ elem: HTMLElement; body: Matter.Body }>>([]);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const [effectStarted, setEffectStarted] = useState(false);
  const [cardsLoaded, setCardsLoaded] = useState(false);
  const [triggerSpark, setTriggerSpark] = useState(false);
  const sparkTriggerRef = useRef<HTMLDivElement>(null);

  
  // Set cards as loaded after initial mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setCardsLoaded(true);
    }, 500); // Cards muncul dulu
    return () => clearTimeout(timer);
  }, []);

  // Trigger falling effect after delay
  useEffect(() => {
    if (!cardsLoaded) return;

    if (trigger === 'auto') {
      const timer = setTimeout(() => {
        setEffectStarted(true);
      }, delay);
      return () => clearTimeout(timer);
    }

    if (trigger === 'scroll' && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setEffectStarted(true);
            }, delay);
            observer.disconnect();
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger, cardsLoaded, delay]);

  // Matter.js physics simulation
  useEffect(() => {
    if (!effectStarted) return;

    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } = Matter;

    if (!containerRef.current || !canvasContainerRef.current || !cardsContainerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;

    if (width <= 0 || height <= 0) {
      return;
    }

    const engine = Engine.create();
    engine.world.gravity.y = gravity;
    engineRef.current = engine;

    const render = Render.create({
      element: canvasContainerRef.current,
      engine,
      options: {
        width,
        height,
        background: backgroundColor,
        wireframes
      }
    });

    // Boundaries - walls positioned to let cards touch edges after falling
    const wallThickness = 80;
    const boundaryOptions = {
      isStatic: true,
      render: { fillStyle: 'transparent' },
      friction: 0.3,
      restitution: 0.5
    };

    // Floor - positioned at bottom to match stroke line
    const floor = Bodies.rectangle(width / 2, height + 5, width, wallThickness, boundaryOptions);

    // Left wall - positioned far left so cards can reach left edge
    const leftWall = Bodies.rectangle(-wallThickness / 2 + 2, height / 2, wallThickness, height * 2, boundaryOptions);

    // Right wall - positioned at right edge
    const rightWall = Bodies.rectangle(width + wallThickness / 2 - 2, height / 2, wallThickness, height * 2, boundaryOptions);

    // Ceiling - positioned at top
    const ceiling = Bodies.rectangle(width / 2, -wallThickness / 2 + 2, width, wallThickness, boundaryOptions);

    // Create physics bodies for each card
    const cardElements = cardsContainerRef.current.querySelectorAll<HTMLDivElement>('.falling-skill-card');
    const cardBodies = Array.from(cardElements).map(elem => {
      const rect = elem.getBoundingClientRect();

      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;

      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        render: { fillStyle: 'transparent' },
        restitution: 0.6,
        frictionAir: 0.02,
        friction: 0.3,
        density: 0.001
      });

      // Random velocity with balanced distribution (not biased to right)
      const randomDirection = Math.random() * 2 * Math.PI; // Full circle random direction
      const randomSpeed = Math.random() * 3 + 1; // Speed between 1-4

      Matter.Body.setVelocity(body, {
        x: Math.cos(randomDirection) * randomSpeed,
        y: Math.sin(randomDirection) * randomSpeed * 0.5
      });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.08);
      return { elem, body };
    });

    cardBodiesRef.current = cardBodies;

    cardBodies.forEach(({ elem, body }) => {
      elem.style.position = 'absolute';
      elem.style.left = `${body.position.x - body.bounds.max.x + body.bounds.min.x / 2}px`;
      elem.style.top = `${body.position.y - body.bounds.max.y + body.bounds.min.y / 2}px`;
      elem.style.transform = 'none';
    });

    const mouse = Mouse.create(containerRef.current);

    // Configure mouse to handle passive touch events properly
    // Use type assertion to access internal Matter.js mouse properties safely
    const mouseAny = mouse as any;

    // Remove default event listeners if they exist
    if (mouseAny.mousewheel) {
      mouse.element.removeEventListener('mousewheel', mouseAny.mousewheel);
      mouse.element.removeEventListener('DOMMouseScroll', mouseAny.mousewheel);
    }
    if (mouseAny.mousedown) {
      mouse.element.removeEventListener('touchstart', mouseAny.mousedown);
    }
    if (mouseAny.mousemove) {
      mouse.element.removeEventListener('touchmove', mouseAny.mousemove);
    }
    if (mouseAny.mouseup) {
      mouse.element.removeEventListener('touchend', mouseAny.mouseup);
    }

    // Re-add touch events with passive: true to prevent intervention warnings
    if (mouseAny.mousedown) {
      mouse.element.addEventListener('touchstart', mouseAny.mousedown, { passive: true });
    }
    if (mouseAny.mousemove) {
      mouse.element.addEventListener('touchmove', mouseAny.mousemove, { passive: true });
    }
    if (mouseAny.mouseup) {
      mouse.element.addEventListener('touchend', mouseAny.mouseup, { passive: true });
    }

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: mouseConstraintStiffness,
        render: { visible: false }
      }
    });
    render.mouse = mouse;

    World.add(engine.world, [floor, leftWall, rightWall, ceiling, mouseConstraint, ...cardBodies.map(cb => cb.body)]);

    const runner = Runner.create();
    runnerRef.current = runner;
    renderRef.current = render;

    Runner.run(runner, engine);
    Render.run(render);

    const updateLoop = () => {
      cardBodies.forEach(({ body, elem }) => {
        const { x, y } = body.position;
        elem.style.left = `${x}px`;
        elem.style.top = `${y}px`;
        elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
      });
      Matter.Engine.update(engine);
      animationFrameRef.current = requestAnimationFrame(updateLoop);
    };
    updateLoop();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas && canvasContainerRef.current && canvasContainerRef.current.contains(render.canvas)) {
        canvasContainerRef.current.removeChild(render.canvas);
      }
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [effectStarted, gravity, wireframes, backgroundColor, mouseConstraintStiffness]);


  const handleTrigger = () => {
    if (!effectStarted && (trigger === 'click' || trigger === 'hover')) {
      setEffectStarted(true);
    }
  };

  // Shuffle cards - randomize positions with smooth animation
  const handleShuffle = () => {
    if (cardBodiesRef.current && cardBodiesRef.current.length > 0) {
      cardBodiesRef.current.forEach(({ body }) => {
        // Random position within container
        const randomX = Math.random() * (containerRef.current?.clientWidth || 800);
        const randomY = Math.random() * (containerRef.current?.clientHeight || 600);

        // Set new position
        Matter.Body.setPosition(body, { x: randomX, y: randomY });

        // Add some random velocity for smooth movement
        Matter.Body.setVelocity(body, {
          x: (Math.random() - 0.5) * 5,
          y: (Math.random() - 0.5) * 5
        });

        // Random rotation
        Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.3);
      });
    }
  };

  // Float mode - anti-gravity effect
  const handleFloat = () => {
    if (engineRef.current) {
      // Toggle between normal and anti-gravity
      const currentGravity = engineRef.current.world.gravity.y;

      if (currentGravity > 0) {
        // Anti-gravity mode
        engineRef.current.world.gravity.y = -0.3;

        // Add upward force to all cards
        cardBodiesRef.current.forEach(({ body }) => {
          Matter.Body.applyForce(body, body.position, {
            x: (Math.random() - 0.5) * 0.02,
            y: -0.05
          });
        });

        // Auto return to normal after 5 seconds
        setTimeout(() => {
          if (engineRef.current) {
            engineRef.current.world.gravity.y = gravity;
          }
        }, 5000);
      } else {
        // Return to normal gravity
        engineRef.current.world.gravity.y = gravity;
      }
    }
  };

  // Rain effect - cards fall from top like rain
  const handleRain = () => {
    if (cardBodiesRef.current && cardBodiesRef.current.length > 0 && engineRef.current) {
      // CRITICAL FIX: Reset gravity to normal first (in case Float mode was active)
      engineRef.current.world.gravity.y = gravity;

      cardBodiesRef.current.forEach(({ body }, index) => {
        // Position all cards at top with random X
        const randomX = Math.random() * (containerRef.current?.clientWidth || 800);

        // FIXED: Use staggered timing instead of extreme Y positions
        // All cards start at same Y (just above viewport)
        const topY = -80;

        // Delay the drop for stagger effect
        setTimeout(() => {
          Matter.Body.setPosition(body, { x: randomX, y: topY });
          Matter.Body.setVelocity(body, { x: 0, y: 0 }); // Start with no velocity
          Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.1);
        }, index * 100); // 100ms delay between each card
      });
    }
  };

  // Explode animation - WILD explosion effect with sparks everywhere
  const handleExplode = () => {
    if (cardBodiesRef.current && cardBodiesRef.current.length > 0) {
      // Trigger sparks on each card
      setTriggerSpark(true);
      setTimeout(() => setTriggerSpark(false), 100);

      cardBodiesRef.current.forEach(({ body, elem }) => {
        // MUCH LARGER explosion force for WILD effect
        const explosionForce = 0.45; // Increased from 0.25 to 0.45!

        // Random angle with some bias for more chaotic movement
        const randomAngle = Math.random() * Math.PI * 2;
        const chaos = (Math.random() - 0.5) * 0.3; // Add chaos factor

        const forceX = Math.cos(randomAngle + chaos) * explosionForce * (0.8 + Math.random() * 0.4);

        // VERY strong upward explosion with randomness
        const forceY = -Math.abs(Math.sin(randomAngle)) * explosionForce - (0.3 + Math.random() * 0.2);

        Matter.Body.applyForce(body, body.position, {
          x: forceX,
          y: forceY
        });

        // VERY dramatic spinning - wild rotations!
        Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.8);

        // Create spark effect on card element
        if (elem && sparkTriggerRef.current) {
          const rect = elem.getBoundingClientRect();
          const containerRect = sparkTriggerRef.current.getBoundingClientRect();

          // Create multiple sparks per card
          for (let i = 0; i < 3; i++) {
            setTimeout(() => {
              const event = new MouseEvent('click', {
                clientX: rect.left + rect.width / 2 + (Math.random() - 0.5) * 50,
                clientY: rect.top + rect.height / 2 + (Math.random() - 0.5) * 50,
                bubbles: true
              });
              sparkTriggerRef.current?.dispatchEvent(event);
            }, i * 50);
          }
        }
      });
    }
  };

  return (
    <div className="relative w-full">
      {/* Background container with gray rounded background and thick stroke */}
      <div className="bg-gray-100 dark:bg-gray-800/50 rounded-3xl border-4 border-gray-300 dark:border-gray-600 mb-4 relative overflow-hidden" style={{ minHeight: '600px', padding: '0' }}>
        <ClickSpark
          sparkColor="#ff6b35"
          sparkSize={15}
          sparkRadius={50}
          sparkCount={16}
          duration={600}
          easing="ease-out"
          extraScale={2.0}
        >
          <div
            ref={sparkTriggerRef}
            style={{ width: '100%', height: '100%', position: 'relative' }}
          >
            <div
              ref={containerRef}
              className="falling-skills-container"
              onClick={trigger === 'click' ? handleTrigger : undefined}
              onMouseEnter={trigger === 'hover' ? handleTrigger : undefined}
            >
              <div
                ref={cardsContainerRef}
                className={`falling-skills-grid ${cardsLoaded ? 'loaded' : ''}`}
              >
                {skills.map((skill, index) => (
                  <div
                    key={skill.name}
                    className="falling-skill-card"
                    style={{
                      animationDelay: `${index * 0.05}s`
                    }}
                  >
                    <div className="card-inner">
                      <Image
                        src={skill.image}
                        alt={`${skill.name} logo`}
                        width={60}
                        height={60}
                        className="skill-logo"
                        loading="lazy"
                      />
                      <p className="skill-name">{skill.name}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div ref={canvasContainerRef} className="falling-skills-canvas" />
            </div>
          </div>
        </ClickSpark>
      </div>

      {/* Control buttons */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4">
        <button
          onClick={handleShuffle}
          className="group relative px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
          title="Shuffle cards randomly"
        >
          <svg
            className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-90 transition-transform duration-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
          <span className="hidden sm:inline">Shuffle</span>
          <span className="sm:hidden">🎲</span>
        </button>

        <button
          onClick={handleFloat}
          className="group relative px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-sky-400 to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
          title="Toggle float mode (anti-gravity)"
        >
          <svg
            className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-y-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          <span className="hidden sm:inline">Float</span>
          <span className="sm:hidden">🎈</span>
        </button>

        <button
          onClick={handleRain}
          className="group relative px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
          title="Rain effect from top"
        >
          <svg
            className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-y-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <span className="hidden sm:inline">Rain</span>
          <span className="sm:hidden">🌧️</span>
        </button>

        <button
          onClick={handleExplode}
          className="group relative px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
          title="Explode all cards!"
        >
          <svg
            className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="hidden sm:inline">Explode</span>
          <span className="sm:hidden">💥</span>
        </button>
      </div>
    </div>
  );
};

export default FallingSkillCards;
