"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Library } from "lucide-react";
import { getConcerts } from "@/infrastructure/repositories/concertRepository";
import ConcertArchiveCard from "./ConcertArchiveCard";

const ConcertsArchiveList = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const concerts = getConcerts();

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden content-visibility-auto"
    >
      {/* 装飾ライン */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        {/* セクションヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14 md:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary/10 to-green/10 mb-5"
          >
            <Library className="w-6 h-6 text-secondary" />
          </motion.div>

          <p className="font-body text-xs tracking-[0.4em] text-secondary mb-3 uppercase">
            Archive
          </p>

          <h2 className="font-display text-3xl md:text-4xl text-dark mb-4">
            演奏会アーカイブ
          </h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{
              duration: 1,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-16 h-0.5 mx-auto bg-gradient-to-r from-transparent via-secondary/40 to-transparent"
          />
        </motion.div>

        {/* タイムライン */}
        <div className="relative">
          {/* タイムラインの縦線（PC） */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{
              duration: 1.2,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="hidden md:block absolute left-14 top-0 bottom-0 w-px bg-gradient-to-b from-secondary/20 via-dark/10 to-transparent origin-top"
          />

          {/* コンサートカード一覧 */}
          <div className="space-y-8 md:space-y-12">
            {concerts.map((concert, index) => (
              <ConcertArchiveCard
                key={concert.year}
                data={concert}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 背景装飾 */}
      <div className="absolute top-1/2 left-0 w-64 h-64 rounded-full bg-gradient-to-r from-secondary/4 to-transparent blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/3 right-0 w-48 h-48 rounded-full bg-gradient-to-l from-green/4 to-transparent blur-3xl" />
    </section>
  );
};

export default ConcertsArchiveList;
