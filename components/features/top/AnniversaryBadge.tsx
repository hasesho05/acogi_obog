"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
};

const AnniversaryBadge = () => {
  const prefersReducedMotion = useReducedMotion();
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate floating particles
    const newParticles: Particle[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 4 + 6,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  const strokeAnimation = prefersReducedMotion
    ? {}
    : {
        pathLength: [0, 1],
        opacity: [0, 1],
      };

  const strokeTransition = {
    duration: 2,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  return (
    <div className="relative w-40 h-40 md:w-48 md:h-48">
      {/* Floating Particles */}
      {!prefersReducedMotion &&
        particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              background: `radial-gradient(circle, rgba(212, 80, 44, 0.6) 0%, rgba(45, 106, 79, 0.3) 100%)`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 10 - 5, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}

      {/* Main SVG */}
      <svg
        viewBox="0 0 300 300"
        className="w-full h-full"
        style={{ overflow: "visible" }}
      >
        {/* Definitions */}
        <defs>
          {/* Main Gradient - Orange to Green */}
          <linearGradient
            id="anniversary-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#d4502c" />
            <stop offset="50%" stopColor="#e07548" />
            <stop offset="100%" stopColor="#2d6a4f" />
          </linearGradient>

          {/* Reverse Gradient */}
          <linearGradient
            id="anniversary-gradient-reverse"
            x1="100%"
            y1="100%"
            x2="0%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#2d6a4f" />
            <stop offset="50%" stopColor="#40916c" />
            <stop offset="100%" stopColor="#d4502c" />
          </linearGradient>

          {/* Radial Glow */}
          <radialGradient id="center-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d4502c" stopOpacity="0.15" />
            <stop offset="70%" stopColor="#2d6a4f" stopOpacity="0.05" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>

          {/* Glow Filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Soft Glow Filter */}
          <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background Glow */}
        <motion.circle
          cx="150"
          cy="150"
          r="120"
          fill="url(#center-glow)"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />

        {/* Outer Ring - Dashed */}
        <motion.circle
          cx="150"
          cy="150"
          r="140"
          fill="none"
          stroke="url(#anniversary-gradient)"
          strokeWidth="1"
          strokeDasharray="4 8"
          initial={{ opacity: 0, rotate: 0 }}
          animate={{
            opacity: 0.4,
            rotate: prefersReducedMotion ? 0 : 360,
          }}
          transition={{
            opacity: { duration: 1, delay: 1.5 },
            rotate: {
              duration: 60,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
          }}
          style={{ transformOrigin: "150px 150px" }}
        />

        {/* Main Circle Ring */}
        <motion.circle
          cx="150"
          cy="150"
          r="125"
          fill="none"
          stroke="url(#anniversary-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={strokeAnimation}
          transition={{ ...strokeTransition, delay: 0.3 }}
          filter="url(#glow)"
        />

        {/* Inner Ring */}
        <motion.circle
          cx="150"
          cy="150"
          r="110"
          fill="none"
          stroke="url(#anniversary-gradient-reverse)"
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={strokeAnimation}
          transition={{ ...strokeTransition, delay: 0.6 }}
        />

        {/* Sound Wave Arc - Top */}
        <motion.path
          d="M 80 150 Q 90 130, 100 150 Q 110 170, 120 150 Q 130 130, 140 150"
          fill="none"
          stroke="url(#anniversary-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={strokeAnimation}
          transition={{ ...strokeTransition, delay: 1.2 }}
          filter="url(#glow)"
        />

        {/* Sound Wave Arc - Bottom */}
        <motion.path
          d="M 160 150 Q 170 130, 180 150 Q 190 170, 200 150 Q 210 130, 220 150"
          fill="none"
          stroke="url(#anniversary-gradient-reverse)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={strokeAnimation}
          transition={{ ...strokeTransition, delay: 1.4 }}
          filter="url(#glow)"
        />

        {/* Decorative Dots - coordinates pre-calculated to avoid hydration mismatch */}
        {[
          { x: 275, y: 150 },      // 0°
          { x: 212.5, y: 258.25 }, // 60°
          { x: 87.5, y: 258.25 },  // 120°
          { x: 25, y: 150 },       // 180°
          { x: 87.5, y: 41.75 },   // 240°
          { x: 212.5, y: 41.75 },  // 300°
        ].map((pos, i) => (
          <motion.circle
            key={i}
            cx={pos.x}
            cy={pos.y}
            r="3"
            fill="url(#anniversary-gradient)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 2 + i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            filter="url(#glow)"
          />
        ))}

        {/* "10" - Main Number */}
        <motion.text
          x="150"
          y="155"
          textAnchor="middle"
          dominantBaseline="middle"
          className="font-display"
          style={{
            fontSize: "72px",
            fontWeight: 700,
            fill: "url(#anniversary-gradient)",
            letterSpacing: "-0.02em",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            delay: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          filter="url(#soft-glow)"
        >
          10
        </motion.text>

        {/* "TH" - Superscript */}
        <motion.text
          x="195"
          y="125"
          textAnchor="start"
          className="font-display"
          style={{
            fontSize: "14px",
            fontWeight: 600,
            fill: "url(#anniversary-gradient)",
            letterSpacing: "0.1em",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          TH
        </motion.text>

        {/* "ANNIVERSARY" - Arc Text (simplified as straight for better readability) */}
        <motion.text
          x="150"
          y="195"
          textAnchor="middle"
          className="font-body"
          style={{
            fontSize: "11px",
            fontWeight: 500,
            fill: "#8b3a1e",
            letterSpacing: "0.35em",
            opacity: 0.8,
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1.4,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          ANNIVERSARY
        </motion.text>

        {/* Decorative Line Left */}
        <motion.line
          x1="70"
          y1="220"
          x2="120"
          y2="220"
          stroke="url(#anniversary-gradient)"
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        />

        {/* Decorative Line Right */}
        <motion.line
          x1="180"
          y1="220"
          x2="230"
          y2="220"
          stroke="url(#anniversary-gradient-reverse)"
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        />

        {/* Years */}
        <motion.text
          x="95"
          y="245"
          textAnchor="middle"
          className="font-body"
          style={{
            fontSize: "12px",
            fontWeight: 400,
            fill: "#8b3a1e",
            letterSpacing: "0.15em",
            opacity: 0.5,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          2016
        </motion.text>

        {/* Dash */}
        <motion.text
          x="150"
          y="245"
          textAnchor="middle"
          className="font-display"
          style={{
            fontSize: "16px",
            fontWeight: 700,
            fill: "url(#anniversary-gradient)",
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 2.1 }}
        >
          —
        </motion.text>

        {/* Year 2026 */}
        <motion.text
          x="205"
          y="245"
          textAnchor="middle"
          className="font-display"
          style={{
            fontSize: "18px",
            fontWeight: 700,
            fill: "url(#anniversary-gradient)",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          filter="url(#glow)"
        >
          2026
        </motion.text>
      </svg>

      {/* Ambient Rotating Glow */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "conic-gradient(from 0deg, transparent, rgba(212, 80, 44, 0.1), transparent, rgba(45, 106, 79, 0.1), transparent)",
            borderRadius: "50%",
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      )}
    </div>
  );
};

export default AnniversaryBadge;
