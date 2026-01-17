"use client";

import { motion } from "motion/react";
import { useMemo } from "react";

type OrbConfig = {
  id: number;
  size: number;
  x: string;
  y: string;
  color: string;
  duration: number;
  delay: number;
  blur: number;
  opacity: number;
};

const FloatingOrbs = () => {
  const orbs = useMemo<OrbConfig[]>(
    () => [
      {
        id: 1,
        size: 180,
        x: "10%",
        y: "20%",
        color: "var(--color-secondary)",
        duration: 20,
        delay: 0,
        blur: 60,
        opacity: 0.15,
      },
      {
        id: 2,
        size: 120,
        x: "75%",
        y: "15%",
        color: "var(--color-green)",
        duration: 25,
        delay: 2,
        blur: 50,
        opacity: 0.12,
      },
      {
        id: 3,
        size: 200,
        x: "60%",
        y: "60%",
        color: "var(--color-accent)",
        duration: 22,
        delay: 1,
        blur: 70,
        opacity: 0.1,
      },
      {
        id: 4,
        size: 100,
        x: "20%",
        y: "70%",
        color: "var(--color-green-light)",
        duration: 18,
        delay: 3,
        blur: 40,
        opacity: 0.15,
      },
      {
        id: 5,
        size: 150,
        x: "85%",
        y: "45%",
        color: "var(--color-light)",
        duration: 24,
        delay: 1.5,
        blur: 55,
        opacity: 0.12,
      },
      {
        id: 6,
        size: 80,
        x: "40%",
        y: "85%",
        color: "var(--color-secondary)",
        duration: 19,
        delay: 2.5,
        blur: 35,
        opacity: 0.1,
      },
      {
        id: 7,
        size: 140,
        x: "5%",
        y: "50%",
        color: "var(--color-green)",
        duration: 26,
        delay: 0.5,
        blur: 50,
        opacity: 0.08,
      },
    ],
    []
  );

  return (
    <div className="fixed inset-0 -z-5 overflow-hidden pointer-events-none">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          initial={{
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            opacity: orb.opacity,
            scale: 1,
            x: [0, 30, -20, 15, 0],
            y: [0, -25, 20, -15, 0],
          }}
          transition={{
            opacity: { duration: 2, delay: orb.delay },
            scale: { duration: 2, delay: orb.delay },
            x: {
              duration: orb.duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: orb.delay,
            },
            y: {
              duration: orb.duration * 0.8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: orb.delay,
            },
          }}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle at 30% 30%, ${orb.color}, transparent 70%)`,
            filter: `blur(${orb.blur}px)`,
          }}
        />
      ))}

      {/* 有機的なバイオモーフィックシェイプ */}
      <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.06 }}
        transition={{ duration: 3, delay: 1 }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px]"
        viewBox="0 0 200 200"
      >
        <defs>
          <linearGradient id="biomorph-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-secondary)" />
            <stop offset="100%" stopColor="var(--color-green)" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 100 20 C 140 20, 180 60, 180 100 C 180 140, 140 180, 100 180 C 60 180, 20 140, 20 100 C 20 60, 60 20, 100 20"
          fill="none"
          stroke="url(#biomorph-gradient-1)"
          strokeWidth="0.5"
          animate={{
            d: [
              "M 100 20 C 140 20, 180 60, 180 100 C 180 140, 140 180, 100 180 C 60 180, 20 140, 20 100 C 20 60, 60 20, 100 20",
              "M 100 30 C 150 25, 175 70, 170 100 C 165 135, 135 175, 100 170 C 65 165, 30 135, 35 100 C 40 65, 70 35, 100 30",
              "M 100 25 C 145 30, 170 65, 175 100 C 180 140, 145 170, 100 175 C 55 180, 25 145, 30 100 C 35 55, 65 25, 100 25",
              "M 100 20 C 140 20, 180 60, 180 100 C 180 140, 140 180, 100 180 C 60 180, 20 140, 20 100 C 20 60, 60 20, 100 20",
            ],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </motion.svg>

      <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 3, delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px]"
        viewBox="0 0 200 200"
      >
        <defs>
          <linearGradient id="biomorph-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-accent)" />
            <stop offset="100%" stopColor="var(--color-green-light)" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 50 100 Q 50 50, 100 50 Q 150 50, 150 100 Q 150 150, 100 150 Q 50 150, 50 100"
          fill="none"
          stroke="url(#biomorph-gradient-2)"
          strokeWidth="0.5"
          animate={{
            d: [
              "M 50 100 Q 50 50, 100 50 Q 150 50, 150 100 Q 150 150, 100 150 Q 50 150, 50 100",
              "M 55 100 Q 40 55, 100 45 Q 155 40, 145 100 Q 155 155, 100 155 Q 45 160, 55 100",
              "M 45 100 Q 55 45, 100 55 Q 145 55, 155 100 Q 145 155, 100 145 Q 55 145, 45 100",
              "M 50 100 Q 50 50, 100 50 Q 150 50, 150 100 Q 150 150, 100 150 Q 50 150, 50 100",
            ],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </motion.svg>
    </div>
  );
};

export default FloatingOrbs;
