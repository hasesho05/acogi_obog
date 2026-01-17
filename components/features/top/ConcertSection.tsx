"use client";

import { motion, useInView } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { Calendar, MapPin, Clock, ArrowRight, Sparkles, Check } from "lucide-react";
import { MusicNoteIcon } from "./icons";

type ConcertData = {
  year: number;
  status: "completed" | "upcoming";
  date?: string;
  time?: string;
  venue?: string;
  detailLink?: string;
};

const concerts: ConcertData[] = [
  {
    year: 2025,
    status: "completed",
    date: "2025年1月26日（日）",
    time: "13:00 開場 / 13:30 開演",
    venue: "SECOND ROOMS",
    detailLink: "/concerts/2025",
  },
  {
    year: 2026,
    status: "upcoming",
  },
];

type ConcertCardProps = {
  data: ConcertData;
  index: number;
};

const ConcertCard = (props: ConcertCardProps) => {
  const isCompleted = props.data.status === "completed";
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: props.index * 0.2,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative group"
    >
      {/* カードコンテナ */}
      <div
        className={`relative overflow-hidden rounded-[2rem] p-8 md:p-10 transition-all duration-500 ${
          isCompleted
            ? "bg-white/30 backdrop-blur-md border border-dark/10"
            : "bg-white/50 backdrop-blur-xl border border-secondary/20 hover:border-secondary/40"
        }`}
      >
        {/* グロー効果（Coming Soon用） */}
        {!isCompleted && (
          <>
            <div className="absolute -inset-1 bg-gradient-to-r from-secondary/20 via-accent/30 to-green/20 rounded-[2rem] blur-xl opacity-60 group-hover:opacity-80 transition-opacity" />
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute -inset-1 bg-gradient-to-r from-secondary/10 via-green/15 to-accent/10 rounded-[2rem] blur-2xl"
            />
          </>
        )}

        {/* カード内部背景 */}
        <div
          className={`absolute inset-0 rounded-[2rem] ${
            isCompleted
              ? "bg-gradient-to-br from-tertiary/30 to-primary/50"
              : "bg-gradient-to-br from-white/60 to-tertiary/40"
          }`}
        />

        {/* ステータスバッジ */}
        <div className="relative z-10 flex justify-between items-start mb-6">
          <div className="flex items-center gap-2">
            <MusicNoteIcon
              className={`w-5 h-5 ${isCompleted ? "text-dark/30" : "text-secondary"}`}
            />
            <span
              className={`font-body text-xs tracking-wider ${
                isCompleted ? "text-dark/40" : "text-secondary"
              }`}
            >
              CONCERT
            </span>
          </div>

          {isCompleted ? (
            <span className="inline-flex items-center gap-1.5 font-body text-xs tracking-wider px-3 py-1.5 rounded-full bg-dark/10 text-dark/50">
              <Check className="w-3 h-3" />
              終了しました
            </span>
          ) : (
            <motion.span
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="inline-flex items-center gap-1.5 font-body text-xs tracking-wider px-4 py-2 rounded-full bg-gradient-to-r from-secondary to-accent text-white shadow-lg shadow-secondary/20"
            >
              <Sparkles className="w-3 h-3" />
              Coming Soon
            </motion.span>
          )}
        </div>

        {/* 年度 */}
        <motion.p
          className={`relative z-10 font-display text-7xl md:text-8xl font-bold mb-4 ${
            isCompleted ? "text-dark/20" : "bg-gradient-to-r from-secondary via-accent to-green bg-clip-text text-transparent"
          }`}
        >
          {props.data.year}
        </motion.p>

        {/* タイトル */}
        <h3
          className={`relative z-10 font-display text-2xl md:text-3xl mb-8 ${
            isCompleted ? "text-dark/40" : "text-dark"
          }`}
        >
          OBOG演奏会
        </h3>

        {/* 詳細情報 */}
        <div className="relative z-10 space-y-4 mb-8">
          <div className="flex items-center gap-4">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isCompleted ? "bg-dark/5" : "bg-secondary/10"
              }`}
            >
              <Calendar
                className={`w-5 h-5 ${isCompleted ? "text-dark/30" : "text-secondary"}`}
              />
            </div>
            <span
              className={`font-body text-sm ${
                isCompleted ? "text-dark/40" : "text-dark/70"
              }`}
            >
              {props.data.date || "日程未定 - 続報をお待ちください"}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isCompleted ? "bg-dark/5" : "bg-secondary/10"
              }`}
            >
              <Clock
                className={`w-5 h-5 ${isCompleted ? "text-dark/30" : "text-secondary"}`}
              />
            </div>
            <span
              className={`font-body text-sm ${
                isCompleted ? "text-dark/40" : "text-dark/70"
              }`}
            >
              {props.data.time || "時間未定"}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isCompleted ? "bg-dark/5" : "bg-secondary/10"
              }`}
            >
              <MapPin
                className={`w-5 h-5 ${isCompleted ? "text-dark/30" : "text-secondary"}`}
              />
            </div>
            <span
              className={`font-body text-sm ${
                isCompleted ? "text-dark/40" : "text-dark/70"
              }`}
            >
              {props.data.venue || "会場未定"}
            </span>
          </div>
        </div>

        {/* アクションボタン */}
        {isCompleted && props.data.detailLink ? (
          <Link
            href={props.data.detailLink}
            className="relative z-10 inline-flex items-center gap-2 font-body text-sm text-dark/50 hover:text-secondary transition-colors group/link px-4 py-2 rounded-full hover:bg-secondary/5"
          >
            <span>詳細を見る</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        ) : !isCompleted ? (
          <p className="relative z-10 font-body text-sm text-dark/50 italic px-4 py-2">
            続報をお待ちください
          </p>
        ) : null}

        {/* 有機的な装飾シェイプ */}
        {!isCompleted && (
          <>
            <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-br from-accent/15 to-secondary/10 blur-3xl" />
            <div className="absolute -top-16 -left-16 w-32 h-32 rounded-full bg-gradient-to-tr from-green/10 to-green-light/5 blur-2xl" />
          </>
        )}
      </div>
    </motion.div>
  );
};

const ConcertSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* 装飾ライン */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* セクションヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          {/* 装飾アイコン */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary/10 to-green/10 mb-6"
          >
            <Calendar className="w-7 h-7 text-secondary" />
          </motion.div>

          <p className="font-body text-xs tracking-[0.4em] text-secondary mb-4 uppercase">
            Concert Information
          </p>

          <h2 className="font-display text-4xl md:text-5xl text-dark mb-4">
            演奏会情報
          </h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-20 h-0.5 mx-auto bg-gradient-to-r from-transparent via-secondary/40 to-transparent"
          />
        </motion.div>

        {/* カードグリッド */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {concerts.map((concert, index) => (
            <ConcertCard key={concert.year} data={concert} index={index} />
          ))}
        </div>
      </div>

      {/* 背景装飾 */}
      <div className="absolute top-1/2 left-0 w-64 h-64 rounded-full bg-gradient-to-r from-secondary/5 to-transparent blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/3 right-0 w-48 h-48 rounded-full bg-gradient-to-l from-green/5 to-transparent blur-3xl" />
    </section>
  );
};

export default ConcertSection;
