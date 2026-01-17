"use client";

import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useState, useCallback } from "react";

type Particle = {
  id: number;
  x: number;
  y: number;
  symbol: string;
  rotation: number;
  scale: number;
  delay: number;
  color: string;
};

type MusicalParticlesProps = {
  children: React.ReactNode;
  particleCount?: number;
  variant?: "notes" | "sparkle" | "mixed";
  colors?: string[];
  className?: string;
};

const MUSICAL_NOTES = ["♪", "♫", "♬", "♩"];
const SPARKLES = ["✦", "✧", "⋆", "・"];
const MIXED = ["♪", "✦", "♫", "⋆", "♬", "✧"];

const DEFAULT_COLORS = [
  "#d4502c", // secondary
  "#e07548", // accent
  "#2d6a4f", // green
  "#40916c", // green-light
  "#8b3a1e", // dark
];

const MusicalParticles = (props: MusicalParticlesProps) => {
  const {
    children,
    particleCount = 8,
    variant = "mixed",
    colors = DEFAULT_COLORS,
    className = "",
  } = props;

  const prefersReducedMotion = useReducedMotion();
  const [particles, setParticles] = useState<Particle[]>([]);

  const symbols =
    variant === "notes" ? MUSICAL_NOTES : variant === "sparkle" ? SPARKLES : MIXED;

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const newParticles: Particle[] = Array.from(
        { length: particleCount },
        (_, i) => {
          const angle = (i / particleCount) * 360 + Math.random() * 30 - 15;
          const distance = 40 + Math.random() * 60;
          const radian = (angle * Math.PI) / 180;

          return {
            id: Date.now() + i,
            x: centerX + Math.cos(radian) * distance,
            y: centerY + Math.sin(radian) * distance - 20,
            symbol: symbols[Math.floor(Math.random() * symbols.length)],
            rotation: Math.random() * 360 - 180,
            scale: 0.6 + Math.random() * 0.6,
            delay: i * 0.03,
            color: colors[Math.floor(Math.random() * colors.length)],
          };
        }
      );

      setParticles((prev) => [...prev, ...newParticles]);

      // Clean up particles after animation
      setTimeout(() => {
        setParticles((prev) =>
          prev.filter((p) => !newParticles.find((np) => np.id === p.id))
        );
      }, 1500);
    },
    [particleCount, symbols, colors, prefersReducedMotion]
  );

  return (
    <div
      className={`relative cursor-pointer select-none outline-none focus:outline-none ${className}`}
      onClick={handleClick}
    >
      {children}

      {/* Particles Container */}
      <div className="absolute inset-0 pointer-events-none overflow-visible">
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.span
              key={particle.id}
              initial={{
                opacity: 0,
                scale: 0,
                x: "50%",
                y: "50%",
              }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0, particle.scale * 1.2, particle.scale, 0],
                x: particle.x,
                y: particle.y - 30,
                rotate: particle.rotation,
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: 1.2,
                delay: particle.delay,
                ease: [0.22, 1, 0.36, 1],
                opacity: {
                  times: [0, 0.1, 0.7, 1],
                  duration: 1.2,
                },
              }}
              className="absolute text-lg md:text-xl font-medium"
              style={{
                color: particle.color,
                textShadow: `0 0 10px ${particle.color}40`,
                left: 0,
                top: 0,
              }}
            >
              {particle.symbol}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MusicalParticles;

// Ripple effect variant for more subtle interactions
type RippleProps = {
  children: React.ReactNode;
  className?: string;
  color?: string;
};

export const ClickRipple = (props: RippleProps) => {
  const { children, className = "", color = "#d4502c" } = props;
  const prefersReducedMotion = useReducedMotion();
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>(
    []
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newRipple = { id: Date.now(), x, y };
      setRipples((prev) => [...prev, newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 1000);
    },
    [prefersReducedMotion]
  );

  return (
    <div
      className={`relative cursor-pointer overflow-hidden outline-none focus:outline-none ${className}`}
      onClick={handleClick}
    >
      {children}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 40,
              height: 40,
              marginLeft: -20,
              marginTop: -20,
              background: `radial-gradient(circle, ${color}30 0%, transparent 70%)`,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

// Bounce wrapper for playful click feedback
type BounceProps = {
  children: React.ReactNode;
  className?: string;
};

export const ClickBounce = (props: BounceProps) => {
  const { children, className = "" } = props;
  const prefersReducedMotion = useReducedMotion();
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = useCallback(() => {
    if (prefersReducedMotion) return;
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 400);
  }, [prefersReducedMotion]);

  return (
    <motion.div
      className={`cursor-pointer outline-none focus:outline-none ${className}`}
      onClick={handleClick}
      animate={
        isPressed
          ? {
              scale: [1, 0.95, 1.05, 1],
              rotate: [0, -2, 2, 0],
            }
          : {}
      }
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
};
