"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { AcousticGuitarIcon } from "./icons";
import AnniversaryBadge from "./AnniversaryBadge";
import MusicalParticles from "@/components/ui/musical-particles";

// rendering-hoist-jsx: 静的データをコンポーネント外に巻き上げ
const TITLE_LINE_1 = "OB・OG";
const TITLE_LINE_2 = "CONCERT";
const TITLE_LINE_1_CHARS = TITLE_LINE_1.split("");
const TITLE_LINE_2_CHARS = TITLE_LINE_2.split("");
const CATCH_COPY = "A Decade of Harmony";

const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // コンテンツのフェードアウト効果のみ（背景パララックスは削除済み）
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* 背景画像レイヤー - 静的（パララックス削除でパフォーマンス向上） */}
      <div className="absolute inset-0">
        <Image
          src="/images/second_rooms.jpg"
          alt="ライブハウスの雰囲気"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
        {/* イメージオーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 via-transparent to-green/10" />
      </div>

      {/* Glassmorphismフレーム - スクロールでフェードアウト */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 mx-4 max-w-4xl w-full"
      >
        <div className="relative p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] overflow-hidden">
          {/* Glassmorphism背景 */}
          <div className="absolute inset-0 bg-white/40 backdrop-blur-xl border border-white/30 rounded-[2rem] md:rounded-[3rem]" />

          {/* 有機的な装飾シェイプ */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-secondary/20 to-accent/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-gradient-to-tr from-green/15 to-green-light/10 blur-3xl" />

          {/* コンテンツ */}
          <div className="relative z-10 text-center">
            {/* ギターアイコン */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex justify-center mb-6"
            >
              <AcousticGuitarIcon className="w-12 h-12 md:w-16 md:h-16 text-secondary/60" />
            </motion.div>

            {/* サークル名 - レスポンシブ改行対応 */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="font-body text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] text-dark/60 mb-4 md:mb-6"
            >
              <span className="block sm:inline">龍谷大学</span>
              <span className="hidden sm:inline">&nbsp;</span>
              <span className="block sm:inline">アコースティックギターサークル</span>
            </motion.p>

            {/* 装飾ライン */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="w-16 h-px mx-auto mb-6 md:mb-8 bg-gradient-to-r from-transparent via-secondary/50 to-transparent"
            />

            {/* メインタイトル - クリックで音符が飛び出す */}
            <MusicalParticles
              variant="notes"
              particleCount={12}
              className="inline-block"
            >
              <h1
                className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 overflow-visible leading-tight transition-transform hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background:
                    "linear-gradient(135deg, #8b3a1e 0%, #d4502c 40%, #8b3a1e 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {/* 1行目: OB・OG */}
                <span className="block sm:inline">
                  {TITLE_LINE_1_CHARS.map((char, index) => (
                    <motion.span
                      key={`line1-${index}`}
                      initial={{ opacity: 0, y: 50, rotateX: -60 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{
                        duration: 0.7,
                        delay: 1.0 + index * 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
                {/* sm以上でスペース表示 */}
                <span className="hidden sm:inline-block w-4 md:w-6" />
                {/* 2行目: CONCERT */}
                <span className="block sm:inline">
                  {TITLE_LINE_2_CHARS.map((char, index) => (
                    <motion.span
                      key={`line2-${index}`}
                      initial={{ opacity: 0, y: 50, rotateX: -60 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{
                        duration: 0.7,
                        delay: 1.0 + (TITLE_LINE_1_CHARS.length + 1 + index) * 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              </h1>
            </MusicalParticles>

            {/* キャッチコピー - 詩的で上品 */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.0, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-base sm:text-lg md:text-xl text-dark/60 tracking-widest"
            >
              {CATCH_COPY}
            </motion.p>

            {/* 10周年バッジ - SVGアニメーション */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
              className="mt-6 md:mt-10 flex justify-center"
            >
              <AnniversaryBadge />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* スクロールインジケーター */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-dark/30 flex justify-center pt-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-secondary/60"
          />
        </motion.div>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-dark/40" />
        </motion.div>
      </motion.div>

      {/* 角の装飾 */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-secondary/20 rounded-tl-3xl" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-green/20 rounded-tr-3xl" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-green/20 rounded-bl-3xl hidden md:block" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-secondary/20 rounded-br-3xl hidden md:block" />
    </section>
  );
};

export default HeroSection;
