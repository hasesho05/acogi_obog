'use client';

import { motion, useInView } from 'motion/react';
import Image from 'next/image';
import { useRef } from 'react';
import { live2026Venue } from '@/infrastructure/repositories/live2026Repository';

const Live2026Access = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section ref={sectionRef} className="content-visibility-auto px-6 py-16 sm:px-10 md:py-20">
      <div className="mx-auto max-w-6xl border-t border-dark/25 pt-6">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-4 md:grid-cols-[13rem_1fr] md:gap-16"
        >
          <div>
            <p className="font-body text-[0.6rem] tracking-[0.2em] text-secondary">[ 03 ]</p>
            <h2 className="mt-3 font-display text-2xl text-dark md:text-3xl">会場案内</h2>
          </div>
          <p className="max-w-md self-end font-body text-xs leading-6 text-dark/55">
            阪急東向日駅のすぐそば。前回と同じSECOND ROOMSで開催します。
          </p>
        </motion.header>

        <div className="mt-9 grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-stretch">
          <motion.figure
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="border border-dark/15 bg-white p-1.5">
              <Image
                src="/images/live2025/live2025-01.jpg"
                alt="SECOND ROOMSの店頭に置かれた看板"
                width={1108}
                height={1477}
                loading="lazy"
                quality={75}
                className="h-[260px] w-full object-cover object-[center_58%] md:h-[330px]"
              />
            </div>
            <figcaption className="mt-2 font-body text-[0.625rem] text-dark/50">
              SECOND ROOMS — 2025年開催時の記録
            </figcaption>
          </motion.figure>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="flex min-h-full flex-col justify-between border-y border-dark/20 py-5 md:py-7"
          >
            {live2026Venue ? (
              <>
                <div>
                  <p className="font-body text-[0.6rem] uppercase tracking-[0.18em] text-secondary">
                    Music &amp; Dining Space
                  </p>
                  <p className="mt-3 font-display text-2xl tracking-[0.03em] text-dark md:text-3xl">
                    {live2026Venue.name}
                  </p>
                  <p className="mt-5 max-w-md font-body text-xs leading-6 text-dark/65">
                    {live2026Venue.address}
                  </p>
                  {live2026Venue.access ? (
                    <p className="mt-1 max-w-md font-body text-xs leading-6 text-dark/65">
                      {live2026Venue.access}
                    </p>
                  ) : null}
                </div>
                <a
                  href={live2026Venue.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex min-h-11 w-fit items-center border-b border-secondary/50 font-body text-xs text-secondary transition-colors hover:border-secondary"
                >
                  Googleマップで開く ↗
                </a>
              </>
            ) : (
              <p className="font-display text-xl text-dark">決まり次第お知らせします</p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Live2026Access;
