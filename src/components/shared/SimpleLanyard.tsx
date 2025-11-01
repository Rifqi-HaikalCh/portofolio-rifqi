'use client';
import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import './SimpleLanyard.css';

interface SimpleLanyardProps {
  imageUrl: string;
  alt?: string;
}

interface RopeSegment {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export const SimpleLanyard: React.FC<SimpleLanyardProps> = ({ imageUrl, alt = "Profile" }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });
  const [ropeSegments, setRopeSegments] = useState<RopeSegment[]>([]);
  const animationRef = useRef<number>();
  const mouseOffset = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);

  // Initialize rope segments
  useEffect(() => {
    const segments: RopeSegment[] = [];
    const numSegments = 8;
    for (let i = 0; i < numSegments; i++) {
      segments.push({
        x: 0,
        y: (i / numSegments) * 180,
        vx: 0,
        vy: 0
      });
    }
    setRopeSegments(segments);
  }, []);

  const handleStart = (clientX: number, clientY: number) => {
    if (!cardRef.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const cardRect = cardRef.current.getBoundingClientRect();

    mouseOffset.current = {
      x: clientX - cardRect.left - cardRect.width / 2,
      y: clientY - cardRect.top - cardRect.height / 2
    };

    setIsDragging(true);
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newX = clientX - containerRect.left - containerRect.width / 2 - mouseOffset.current.x;
    const newY = clientY - containerRect.top - 200 - mouseOffset.current.y;

    // Limit dragging range
    const maxX = 100;
    const maxY = 150;
    const clampedX = Math.max(-maxX, Math.min(maxX, newX));
    const clampedY = Math.max(-50, Math.min(maxY, newY));

    setCardPosition({ x: clampedX, y: clampedY });
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX, e.clientY);
    }
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    }
  };

  // Advanced physics simulation with rope segments
  useEffect(() => {
    let lastTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.016); // Cap at 60fps
      lastTime = currentTime;

      timeRef.current += deltaTime;

      if (!isDragging) {
        // Add pendulum swing when idle
        const swingAmount = Math.sin(timeRef.current * 1.5) * 8;

        setCardPosition(prev => {
          const targetX = swingAmount;
          const targetY = 0;

          const springStrength = 0.05;
          const damping = 0.92;

          const dx = targetX - prev.x;
          const dy = targetY - prev.y;

          const newVx = (prev.x - targetX) * springStrength;
          const newVy = (prev.y - targetY) * springStrength;

          const newX = prev.x + (dx * springStrength);
          const newY = prev.y + (dy * springStrength);

          return {
            x: newX * damping,
            y: newY * damping
          };
        });
      }

      // Update rope segments with realistic physics
      setRopeSegments(prevSegments => {
        if (prevSegments.length === 0) return prevSegments;

        const newSegments = [...prevSegments];
        const numSegments = newSegments.length;

        // Set top anchor point (fixed)
        newSegments[0] = { x: 0, y: 0, vx: 0, vy: 0 };

        // Set bottom anchor point (card position)
        newSegments[numSegments - 1] = {
          x: cardPosition.x,
          y: 180 + cardPosition.y,
          vx: 0,
          vy: 0
        };

        // Update middle segments with verlet integration
        for (let i = 1; i < numSegments - 1; i++) {
          const segment = newSegments[i];

          // Apply gravity
          const gravity = 0.3;
          segment.vy += gravity;

          // Apply velocity
          segment.x += segment.vx;
          segment.y += segment.vy;

          // Apply damping
          segment.vx *= 0.98;
          segment.vy *= 0.98;
        }

        // Constraint iterations for rope stiffness
        const iterations = 3;
        const segmentLength = 180 / (numSegments - 1);

        for (let iter = 0; iter < iterations; iter++) {
          for (let i = 0; i < numSegments - 1; i++) {
            const seg1 = newSegments[i];
            const seg2 = newSegments[i + 1];

            const dx = seg2.x - seg1.x;
            const dy = seg2.y - seg1.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > 0) {
              const difference = (segmentLength - distance) / distance;
              const offsetX = dx * difference * 0.5;
              const offsetY = dy * difference * 0.5;

              if (i > 0) {
                seg1.x -= offsetX;
                seg1.y -= offsetY;
              }
              if (i < numSegments - 2) {
                seg2.x += offsetX;
                seg2.y += offsetY;
              }
            }
          }
        }

        return newSegments;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDragging, cardPosition.x, cardPosition.y]);

  // Calculate smooth curve path through rope segments
  const getRopePath = () => {
    if (ropeSegments.length < 2) return '';

    let path = `M ${ropeSegments[0].x + 100} ${ropeSegments[0].y + 20}`;

    // Create smooth curve using quadratic bezier
    for (let i = 0; i < ropeSegments.length - 1; i++) {
      const current = ropeSegments[i];
      const next = ropeSegments[i + 1];

      const cpx = (current.x + next.x) / 2 + 100;
      const cpy = (current.y + next.y) / 2 + 20;

      path += ` Q ${current.x + 100} ${current.y + 20}, ${cpx} ${cpy}`;
    }

    const last = ropeSegments[ropeSegments.length - 1];
    path += ` L ${last.x + 100} ${last.y + 20}`;

    return path;
  };

  // Calculate rotation based on position and velocity
  const rotation = isDragging
    ? Math.atan2(cardPosition.x, 100) * (180 / Math.PI) * 0.5
    : Math.atan2(cardPosition.x, 100) * (180 / Math.PI) * 0.8;

  return (
    <div
      ref={containerRef}
      className="simple-lanyard-container"
      onMouseMove={handleMouseMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleEnd}
    >
      {/* Enhanced Lanyard String */}
      <svg className="lanyard-string" viewBox="0 0 200 250" preserveAspectRatio="xMidYMid meet">
        <defs>
          {/* Realistic lanyard pattern */}
          <pattern id="lanyardPattern" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
            <rect width="8" height="8" fill="#10B981" />
            <rect width="4" height="8" fill="#059669" />
            <line x1="0" y1="4" x2="8" y2="4" stroke="#047857" strokeWidth="0.5" />
          </pattern>

          {/* Gradient for depth */}
          <linearGradient id="ropeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#059669" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#10B981" stopOpacity="1" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.8" />
          </linearGradient>

          {/* Shadow */}
          <filter id="ropeShadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1" />
            <feOffset dx="1" dy="1" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Rope path with pattern */}
        <path
          d={getRopePath()}
          stroke="url(#ropeGradient)"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#ropeShadow)"
        />

        {/* Rope edge highlights */}
        <path
          d={getRopePath()}
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Card with Image */}
      <div
        ref={cardRef}
        className={`lanyard-card ${isDragging ? 'dragging' : ''}`}
        style={{
          transform: `translate(${cardPosition.x}px, ${cardPosition.y}px) rotate(${rotation}deg)`,
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Enhanced Clip/Hole */}
        <div className="lanyard-clip">
          <div className="clip-inner" />
        </div>

        {/* Card Border */}
        <div className="card-border">
          {/* Profile Image */}
          <div className="card-image-wrapper">
            <Image
              src={imageUrl}
              alt={alt}
              fill
              sizes="300px"
              className="card-image"
              draggable={false}
            />
          </div>

          {/* Enhanced Shine Effect */}
          <div className="card-shine" />
          <div className="card-gloss" />
        </div>
      </div>

      {/* Instructions */}
      <div className="lanyard-instructions">
        <p>👆 {isDragging ? 'Release me!' : 'Drag me!'}</p>
      </div>
    </div>
  );
};
