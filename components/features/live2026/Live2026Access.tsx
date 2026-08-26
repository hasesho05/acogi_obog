'use client';

import { motion, useInView } from 'motion/react';
import Image from 'next/image';
import { useRef } from 'react';
import { live2026Venue } from '@/infrastructure/repositories/live2026Repository';

const Live2026Access = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="content-visibility-auto py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 border-b border-dark/20 pb-7 md:mb-16"
        >
          <p className="mb-3 font-body text-[0.65rem] uppercase tracking-[0.24em] text-secondary">
            03 / Access
          </p>
          <h2 className="font-display text-4xl text-dark md:text-5xl">会場のご案内</h2>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {live2026Venue ? (
              <>
                <p className="font-display text-3xl text-dark md:text-4xl">{live2026Venue.name}</p>
                <p className="mt-4 max-w-md font-body text-sm leading-7 text-dark/70">
                  {live2026Venue.address}
                </p>
                {live2026Venue.access ? (
                  <p className="mt-2 max-w-md font-body text-sm leading-7 text-dark/70">
                    {live2026Venue.access}
                  </p>
                ) : null}
                <a
                  href={live2026Venue.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-block border-b border-secondary/50 pb-1 font-body text-sm text-secondary transition-colors hover:border-secondary"
                >
                  Googleマップで開く ↗
                </a>
              </>
            ) : (
              <>
                <p className="font-display text-3xl text-dark md:text-4xl">
                  決まり次第お知らせします
                </p>
                <p className="mt-4 max-w-md font-body text-sm leading-7 text-dark/70">
                  会場が決定し次第、このページとSNSでご案内します。 前回はSECOND
                  ROOMS（京都・向日市）で開催しました。
                </p>
              </>
            )}
          </motion.div>

          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: 0.18,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            <div className="border border-dark/15 bg-white p-1.5">
              <Image
                src="/images/live2025/live2025-01.jpg"
                alt="前回会場SECOND ROOMSの店頭に置かれた看板"
                width={1108}
                height={1477}
                loading="lazy"
                quality={75}
                className="h-[340px] w-full object-cover md:h-[420px]"
              />
            </div>
            <figcaption className="mt-3 font-body text-xs text-dark/55">
              前回の会場 — SECOND ROOMS（京都・向日市）
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
};

export default Live2026Access;
