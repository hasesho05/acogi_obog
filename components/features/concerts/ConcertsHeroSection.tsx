"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Library, Music } from "lucide-react";

const ConcertsHeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85vh] w-full overflow-hidden flex items-center justify-center"
    >
      {/* 背景グラデーション */}
      <motion.div
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-tertiary to-primary" />

        {/* 有機的なシェイプ装飾 */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-secondary/8 to-accent/5 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-gradient-to-tl from-green/8 to-green-light/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-secondary/3 to-transparent blur-2xl" />
      </motion.div>

      {/* 波形アニメーション背景 */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <svg
          className="absolute bottom-0 left-0 w-full h-48"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,192L60,186.7C120,181,240,171,360,186.7C480,203,600,245,720,250.7C840,256,960,224,1080,208C1200,192,1320,192,1380,192L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            fill="url(#concerts-wave-gradient)"
            animate={{
              d: [
                "M0,192L60,186.7C120,181,240,171,360,186.7C480,203,600,245,720,250.7C840,256,960,224,1080,208C1200,192,1320,192,1380,192L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z",
                "M0,224L60,213.3C120,203,240,181,360,176C480,171,600,181,720,197.3C840,213,960,235,1080,229.3C1200,224,1320,192,1380,176L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
          <defs>
            <linearGradient id="concerts-wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d4502c" />
              <stop offset="50%" stopColor="#e07548" />
              <stop offset="100%" stopColor="#2d6a4f" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ギターの弦をイメージしたライン装飾 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.08 }}
            transition={{ duration: 1.5, delay: 0.8 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute h-px bg-gradient-to-r from-transparent via-secondary to-transparent"
            style={{
              top: `${20 + i * 12}%`,
              left: "10%",
              right: "10%",
              transformOrigin: "left",
            }}
          />
        ))}
      </div>

      {/* メインコンテンツ */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 mx-4 max-w-4xl w-full"
      >
        <div className="relative p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] overflow-hidden">
          {/* Glassmorphism背景 */}
          <div className="absolute inset-0 bg-white/50 backdrop-blur-xl border border-white/40 rounded-[2rem] md:rounded-[3rem] shadow-2xl shadow-secondary/5" />

          {/* 装飾シェイプ */}
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-br from-secondary/15 to-accent/8 blur-2xl" />
          <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-gradient-to-tr from-green/12 to-green-light/8 blur-2xl" />

          {/* コンテンツ */}
          <div className="relative z-10 text-center">
            {/* アイコン */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center mb-6"
            >
              <div className="relative">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-secondary/10 to-accent/10 flex items-center justify-center">
                  <Library className="w-8 h-8 md:w-10 md:h-10 text-secondary/70" />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green/20 flex items-center justify-center"
                >
                  <Music className="w-3 h-3 text-green" />
                </motion.div>
              </div>
            </motion.div>

            {/* 小見出し */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="font-body text-xs md:text-sm tracking-[0.3em] text-dark/50 mb-4"
            >
              龍谷大学アコースティックギターサークル
            </motion.p>

            {/* 装飾ライン */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="w-20 h-px mx-auto mb-8 bg-gradient-to-r from-transparent via-secondary/40 to-transparent"
            />

            {/* メインタイトル */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              style={{
                background: "linear-gradient(135deg, #8b3a1e 0%, #d4502c 50%, #2d6a4f 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              CONCERTS
            </motion.h1>

            {/* サブタイトル */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-lg sm:text-xl md:text-2xl text-dark/60 tracking-wide mb-4"
            >
              音が紡いできた、10年のものがたり
            </motion.p>

            {/* 説明文 */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-body text-sm md:text-base text-dark/50 max-w-lg mx-auto leading-relaxed"
            >
              これまでの演奏会の記録と、これからの予定をまとめたアーカイブです。
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* 角の装飾 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-secondary/15 rounded-tl-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute top-8 right-8 w-20 h-20 border-r-2 border-t-2 border-green/15 rounded-tr-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.7 }}
        className="absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 border-green/15 rounded-bl-3xl hidden md:block"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-secondary/15 rounded-br-3xl hidden md:block"
      />
    </section>
  );
};

export default ConcertsHeroSection;
