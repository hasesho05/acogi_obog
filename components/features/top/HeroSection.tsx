'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="relative border-b border-dark/15">
      <div className="mx-auto grid min-h-[min(860px,100vh)] max-w-[1440px] lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex flex-col justify-between px-6 py-8 sm:px-10 sm:py-12 lg:px-16 lg:py-16"
        >
          <div className="flex items-center justify-between gap-6 text-[0.65rem] font-body uppercase tracking-[0.22em] text-dark/65">
            <span>Ryukoku University</span>
            <span className="hidden sm:inline">Acoustic Guitar Circle</span>
          </div>

          <div className="max-w-xl py-20 lg:py-0">
            <p className="mb-8 font-body text-xs font-medium tracking-[0.32em] text-secondary">
              第10回 OBOG演奏会
            </p>
            <div className="relative -ml-2 w-fit">
              <svg
                aria-hidden="true"
                viewBox="0 0 320 250"
                className="pointer-events-none absolute -right-20 -top-10 h-[clamp(12rem,24vw,19rem)] w-[clamp(15rem,30vw,24rem)] text-secondary/20"
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
              <h1 className="relative z-10 font-display font-semibold leading-none tracking-[-0.08em] text-dark">
                <span className="block text-[clamp(7rem,17vw,15rem)]">10</span>
                <span className="mt-2 block pl-2 font-body text-[clamp(0.85rem,1.8vw,1.25rem)] font-medium tracking-[0.34em] text-secondary">
                  TH ANNIVERSARY
                </span>
              </h1>
            </div>
            <div className="mt-10 flex max-w-md items-start gap-5 border-t border-dark/20 pt-5">
              <span className="font-body text-xs font-medium tracking-[0.2em] text-secondary">
                2026
              </span>
              <p className="font-body text-sm leading-7 text-dark/70">
                卒業生と現役生が、アコースティックギターを囲んで再び集う演奏会。
                次回は2026年11月14日（土）に開催します。
              </p>
            </div>
          </div>

          <div className="flex items-end justify-between gap-8 border-t border-dark/15 pt-5 font-body text-xs text-dark/60">
            <div>
              <p className="mb-2 uppercase tracking-[0.22em]">Next performance</p>
              <Link
                href="/concerts/2026"
                className="font-display text-xl text-dark transition-colors hover:text-secondary"
              >
                2026.11.14 SAT →
              </Link>
            </div>
            <div className="hidden text-right sm:block">
              <p>OBOG演奏会</p>
              <p>since 2025</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[54vh] overflow-hidden lg:min-h-0"
        >
          <Image
            src="/images/second_rooms.jpg"
            alt="ライブハウスで演奏するアコースティックギター"
            fill
            priority
            className="object-cover grayscale-[18%]"
            sizes="100vw"
            quality={75}
          />
          <div className="absolute inset-0 bg-dark/20" />
          <div className="absolute bottom-6 left-6 border-l border-b border-primary/70 px-5 py-4 text-primary sm:bottom-10 sm:left-10">
            <p className="font-body text-[0.65rem] uppercase tracking-[0.28em]">
              Live at SECOND ROOMS
            </p>
            <p className="mt-2 font-display text-2xl">Acoustic guitar, together.</p>
          </div>
          <div className="absolute right-6 top-6 font-display text-5xl text-primary/80 sm:right-10 sm:top-10 sm:text-7xl">
            01
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
