'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { live2026Facts } from '@/infrastructure/repositories/live2026Repository';

const Live2026Overview = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section ref={sectionRef} className="content-visibility-auto px-6 py-16 sm:px-10 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 border-t border-dark/25 pt-6 md:grid-cols-[13rem_1fr] md:gap-16">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-body text-[0.6rem] tracking-[0.2em] text-secondary">[ 01 ]</p>
          <h2 className="mt-3 font-display text-2xl leading-tight text-dark md:text-3xl">
            開催概要
          </h2>
          <p className="mt-4 max-w-[16rem] font-body text-xs leading-6 text-dark/55">
            今回の演奏会について、現在決まっている情報です。
          </p>
        </motion.header>

        <dl className="border-t border-dark/15">
          {live2026Facts.map((fact, index) => (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="grid gap-2 border-b border-dark/15 py-4 sm:grid-cols-[7rem_1fr] sm:gap-5 sm:py-5"
            >
              <dt className="font-body text-[0.6rem] uppercase tracking-[0.18em] text-secondary">
                {fact.label}
              </dt>
              <dd>
                <p className="font-display text-lg leading-snug text-dark md:text-xl">
                  {fact.value}
                </p>
                {fact.note ? (
                  <p className="mt-1.5 font-body text-xs leading-5 text-dark/55">{fact.note}</p>
                ) : null}
              </dd>
            </motion.div>
          ))}
          <p className="pt-5 font-body text-xs leading-6 text-dark/55">
            開場時間・料金・出演者などの詳細は、決まり次第このページとSNSでお知らせします。
          </p>
        </dl>
      </div>
    </section>
  );
};

export default Live2026Overview;
