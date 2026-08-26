'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { live2026Facts } from '@/infrastructure/repositories/live2026Repository';

const Live2026Overview = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="content-visibility-auto py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex items-end justify-between gap-8 border-b border-dark/20 pb-7 md:mb-16"
        >
          <div>
            <p className="mb-3 font-body text-[0.65rem] uppercase tracking-[0.24em] text-secondary">
              01 / Information
            </p>
            <h2 className="font-display text-4xl text-dark md:text-5xl">開催概要</h2>
          </div>
          <p className="hidden max-w-xs text-right font-body text-sm leading-6 text-dark/60 md:block">
            会場・開場時間などの詳細は
            <br />
            決まり次第更新します。
          </p>
        </motion.div>

        <dl>
          {live2026Facts.map((fact, index) => (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="grid grid-cols-[6rem_1fr] gap-6 border-b border-dark/15 py-6 md:grid-cols-[10rem_1fr] md:py-8"
            >
              <dt className="pt-2 font-body text-[0.65rem] uppercase tracking-[0.24em] text-secondary">
                {fact.label}
              </dt>
              <dd>
                <p className="font-display text-2xl leading-snug text-dark md:text-3xl">
                  {fact.value}
                </p>
                {fact.note ? (
                  <p className="mt-2 font-body text-sm text-dark/60">{fact.note}</p>
                ) : null}
              </dd>
            </motion.div>
          ))}
        </dl>

        <p className="mt-8 max-w-2xl font-body text-sm leading-7 text-dark/60">
          料金・出演者などの詳細は、決まり次第このページとSNSでお知らせします。
        </p>
      </div>
    </section>
  );
};

export default Live2026Overview;
