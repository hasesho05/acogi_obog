'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

const easeOut = [0.22, 1, 0.36, 1] as const;
const ticketContainerVariants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.55, staggerChildren: 0.075 },
  },
};
const ticketItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
};

const Live2026Hero = () => {
  return (
    <section className="bg-dark px-4 py-5 text-primary sm:px-6 sm:py-7 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: easeOut }}
          className="flex items-center justify-between border-b border-primary/25 pb-4 font-body text-[0.6rem] uppercase tracking-[0.2em] text-primary/65"
        >
          <span>Ryukoku Acoustic Guitar Circle</span>
          <span>Concert guide / 2026</span>
        </motion.header>

        <div className="grid gap-5 py-6 md:grid-cols-[1fr_auto] md:items-end md:gap-12 md:py-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: easeOut }}
          >
            <p className="mb-2 font-body text-[0.625rem] tracking-[0.22em] text-accent">
              OBOG CONCERT
            </p>
            <h1 className="font-display text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1.15] tracking-[-0.035em] text-primary">
              OBOG演奏会
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.17, ease: easeOut }}
            className="font-display text-xl tabular-nums text-primary/75 md:pb-1 md:text-2xl"
          >
            2026
          </motion.p>
        </div>

        <motion.figure
          initial={{ opacity: 0, scale: 0.992 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.2, ease: easeOut }}
          className="relative aspect-[4/3] overflow-hidden border border-primary/20 sm:aspect-[16/8] lg:aspect-[16/7]"
        >
          <motion.div
            initial={{ scale: 1.035 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.05, delay: 0.2, ease: easeOut }}
            className="absolute inset-0"
          >
            <Image
              src="/images/live2025/live2025-12.jpg"
              alt="OBOG LIVE 2025終盤のトリオ演奏"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 767px) 100vw, 1152px"
              quality={75}
            />
          </motion.div>
          <div className="absolute inset-0 bg-dark/15" />
          <motion.div
            aria-hidden="true"
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.28, ease: easeOut }}
            className="absolute inset-0 origin-right bg-dark"
          />
          <motion.figcaption
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.78, ease: easeOut }}
            className="absolute bottom-3 right-3 bg-dark px-3 py-2 font-body text-[0.6rem] tracking-[0.16em] text-primary sm:bottom-4 sm:right-4"
          >
            OBOG LIVE 2025 / SECOND ROOMS
          </motion.figcaption>
        </motion.figure>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={ticketContainerVariants}
          className="mt-5 grid border-y border-primary/25 sm:grid-cols-2 lg:grid-cols-[1.05fr_1fr_1.35fr_0.8fr]"
        >
          <motion.div
            variants={ticketItemVariants}
            className="border-b border-primary/20 py-4 sm:border-r sm:pr-5 lg:border-b-0"
          >
            <p className="font-body text-[0.6rem] uppercase tracking-[0.18em] text-primary/50">
              Date
            </p>
            <p className="mt-1.5 font-display text-2xl tabular-nums text-primary md:text-3xl">
              11.14 <span className="font-body text-xs tracking-[0.14em]">SAT</span>
            </p>
          </motion.div>
          <motion.div
            variants={ticketItemVariants}
            className="border-b border-primary/20 py-4 sm:pl-5 lg:border-b-0 lg:border-r lg:pr-5"
          >
            <p className="font-body text-[0.6rem] uppercase tracking-[0.18em] text-primary/50">
              Time
            </p>
            <p className="mt-2 font-body text-sm text-primary">11:30 開演</p>
            <p className="mt-1 font-body text-xs text-primary/60">14:45 ごろ終演</p>
          </motion.div>
          <motion.div
            variants={ticketItemVariants}
            className="border-b border-primary/20 py-4 sm:border-b-0 sm:border-r sm:pr-5 lg:pl-5"
          >
            <p className="font-body text-[0.6rem] uppercase tracking-[0.18em] text-primary/50">
              Venue
            </p>
            <p className="mt-2 font-display text-lg tracking-[0.04em] text-primary">SECOND ROOMS</p>
            <p className="mt-1 font-body text-xs text-primary/60">京都・向日市</p>
          </motion.div>
          <motion.div variants={ticketItemVariants} className="py-4 sm:pl-5">
            <p className="font-body text-[0.6rem] uppercase tracking-[0.18em] text-primary/50">
              Admission
            </p>
            <p className="mt-2 font-body text-xs leading-5 text-primary/75">
              料金は決まり次第
              <br />
              お知らせします
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Live2026Hero;
