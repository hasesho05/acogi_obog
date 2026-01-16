"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  const titleChars = "OBOG演奏会".split("");
  const subtitleLines = ["また、あの音を", "奏でよう。"];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* 背景画像 */}
      <div className="absolute inset-0">
        <Image
          src="/images/second_rooms.jpg"
          alt="ライブハウスの雰囲気"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* オーロラグラデーションオーバーレイ */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/80" />
      <div className="absolute inset-0 aurora-animated opacity-60" />

      {/* 有機的なシェイプ装飾 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-secondary/30 to-accent/20 blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.12, scale: 1 }}
        transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
        className="absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-light/20 to-secondary/15 blur-3xl"
      />

      {/* メインコンテンツ */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        {/* サークル名 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-body text-sm md:text-base tracking-[0.3em] text-dark/80 mb-6"
        >
          龍谷大学アコースティックギターサークル
        </motion.p>

        {/* メインタイトル */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-dark mb-8 overflow-hidden">
          {titleChars.map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.5 + index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </h1>

        {/* キャッチコピー */}
        <div className="font-display text-2xl md:text-3xl lg:text-4xl text-dark/90 italic leading-relaxed">
          {subtitleLines.map((line, lineIndex) => (
            <motion.p
              key={lineIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 1.2 + lineIndex * 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* 装飾ライン */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-24 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent mt-10 origin-center"
        />
      </div>

      {/* スクロールインジケーター */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-body text-xs tracking-widest text-dark/60">
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-dark/60" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
