"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

const AboutMembersSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* 背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-tertiary/40 via-primary to-tertiary/30" />

      {/* 装飾 */}
      <div className="absolute top-1/3 left-0 w-72 h-72 rounded-full bg-secondary/5 blur-3xl" />
      <div className="absolute bottom-1/3 right-0 w-64 h-64 rounded-full bg-green/5 blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        {/* メインカード */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative"
        >
          <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white/70 to-white/50 backdrop-blur-xl border border-white/40 shadow-2xl shadow-secondary/5 overflow-hidden">
            {/* 装飾シェイプ */}
            <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-to-br from-secondary/10 to-accent/5 blur-2xl" />
            <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-gradient-to-tr from-green/10 to-green-light/5 blur-2xl" />

            <div className="relative z-10 text-center">
              {/* セクションヘッダー */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="font-body text-xs tracking-[0.3em] text-secondary/60 mb-4"
              >
                COME JOIN US
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-dark mb-6"
              >
                興味があれば、
                <br className="sm:hidden" />
                ぜひ来てみてください
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="font-body text-sm md:text-base text-dark/60 leading-relaxed max-w-xl mx-auto mb-8"
              >
                龍谷大学アコギサークルの卒業生なら誰でも参加OK。
                <br className="hidden md:block" />
                久しぶりに顔を出すだけでも、がっつり弾きたい人も、
                <br className="hidden md:block" />
                それぞれのペースで楽しめます。
              </motion.p>

              {/* イベント情報 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-8"
              >
                <div className="flex items-center gap-2 text-dark/50">
                  <Calendar className="w-4 h-4 text-secondary" />
                  <span className="font-body text-sm">年1回開催</span>
                </div>
                <div className="flex items-center gap-2 text-dark/50">
                  <MapPin className="w-4 h-4 text-green" />
                  <span className="font-body text-sm">Second Rooms（京都）</span>
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-secondary to-accent text-white font-body text-sm font-medium hover:shadow-lg hover:shadow-secondary/30 transition-all duration-300 group"
                >
                  <span>今年の演奏会を見る</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              {/* 補足 */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 1 }}
                className="mt-6 font-body text-xs text-dark/40"
              >
                見学だけでも大歓迎です
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* 10回目の装飾 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/50 backdrop-blur-sm border border-white/30">
            <span className="font-display text-3xl font-bold text-gradient">10</span>
            <span className="font-body text-sm text-dark/50">回目の演奏会</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMembersSection;
