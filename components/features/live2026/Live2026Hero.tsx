'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

const Live2026Hero = () => {
  return (
    <section className="relative border-b border-dark/15">
      <div className="mx-auto grid min-h-[min(820px,100vh)] max-w-[1440px] lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex flex-col justify-between px-6 py-8 sm:px-10 sm:py-12 lg:px-16 lg:py-16"
        >
          <div className="flex items-center justify-between gap-6 font-body text-[0.65rem] uppercase tracking-[0.22em] text-dark/65">
            <span>Ryukoku University</span>
            <span className="hidden sm:inline">Acoustic Guitar Circle</span>
          </div>

          <div className="max-w-xl py-16 lg:py-0">
            <p className="mb-8 font-body text-xs font-medium tracking-[0.32em] text-secondary">
              OBOG演奏会 2026
            </p>
            <div className="relative -ml-1 w-fit">
              <svg
                aria-hidden="true"
                viewBox="0 0 320 250"
                className="pointer-events-none absolute -right-16 -top-10 h-[clamp(11rem,22vw,17rem)] w-[clamp(14rem,28vw,22rem)] text-secondary/20"
                fill="none"
              >
                <circle cx="184" cy="124" r="104" stroke="currentColor" strokeWidth="1" />
                <circle
                  cx="184"
                  cy="124"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="2 8"
                />
                <path
                  d="M82 150c15-36 26 36 40 0s25-36 39 0 26 36 41 0 26-36 41 0 25 36 40 0"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M184 12v224M72 124h224"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity=".45"
                />
              </svg>
              <h1 className="relative z-10 font-display font-semibold leading-none tracking-[-0.06em] text-dark">
                <span className="block text-[clamp(5.5rem,14vw,12rem)]">11.14</span>
                <span className="mt-3 block pl-1 font-body text-[clamp(0.8rem,1.6vw,1.1rem)] font-medium tracking-[0.34em] text-secondary">
                  SAT, 2026
                </span>
              </h1>
            </div>
            <div className="mt-10 flex max-w-md items-start gap-5 border-t border-dark/20 pt-5">
              <span className="shrink-0 font-body text-xs font-medium tracking-[0.2em] text-secondary">
                11:30
              </span>
              <p className="font-body text-sm leading-7 text-dark/70">
                11:30 開演、14:45 ごろ終演予定。 会場・開場時間は決まり次第お知らせします。
              </p>
            </div>
          </div>

          <div className="flex items-end justify-between gap-8 border-t border-dark/15 pt-5 font-body text-xs text-dark/60">
            <div>
              <p className="mb-2 uppercase tracking-[0.22em]">Previous</p>
              <p className="font-display text-xl text-dark">OBOG LIVE 2025 — Second Rooms</p>
            </div>
            <div className="hidden text-right sm:block">
              <p>OBOG演奏会</p>
              <p>2026</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.1,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative min-h-[54vh] overflow-hidden lg:min-h-0"
        >
          <Image
            src="/images/live2025/live2025-10.jpg"
            alt="OBOG LIVE 2025でギターを弾き語る出演者"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1023px) 100vw, 48vw"
            quality={75}
          />
          <div className="absolute inset-0 bg-dark/20" />
          <div className="absolute bottom-6 left-6 border-b border-l border-primary/70 px-5 py-4 text-primary sm:bottom-10 sm:left-10">
            <p className="font-body text-[0.65rem] uppercase tracking-[0.28em]">
              2025.10.12 — Second Rooms
            </p>
            <p className="mt-2 font-display text-2xl">前回の記録より</p>
          </div>
          <div className="absolute right-6 top-6 font-display text-5xl text-primary/80 sm:right-10 sm:top-10 sm:text-7xl">
            &rsquo;26
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Live2026Hero;
