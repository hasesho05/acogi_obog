"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Calendar, MapPin, Clock, ArrowRight, Sparkles } from "lucide-react";

type ConcertCardProps = {
  year: number;
  status: "completed" | "upcoming";
  date?: string;
  time?: string;
  venue?: string;
  detailLink?: string;
};

const ConcertCard = (props: ConcertCardProps) => {
  const isCompleted = props.status === "completed";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`relative group ${isCompleted ? "opacity-70" : ""}`}
    >
      {/* グロー効果（Coming Soon用） */}
      {!isCompleted && (
        <div className="absolute -inset-1 bg-gradient-to-r from-secondary/30 via-accent/40 to-light/30 rounded-3xl blur-xl glow-pulse opacity-60" />
      )}

      <div
        className={`relative overflow-hidden rounded-3xl p-8 md:p-10 transition-all duration-500 ${
          isCompleted
            ? "bg-tertiary/50 border border-dark/10"
            : "glassmorphism border border-secondary/20 hover:border-secondary/40"
        }`}
      >
        {/* ステータスバッジ */}
        <div className="absolute top-6 right-6">
          {isCompleted ? (
            <span className="font-body text-xs tracking-wider px-3 py-1.5 rounded-full bg-dark/10 text-dark/60">
              終了しました
            </span>
          ) : (
            <motion.span
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center gap-1.5 font-body text-xs tracking-wider px-3 py-1.5 rounded-full bg-secondary text-white"
            >
              <Sparkles className="w-3 h-3" />
              Coming Soon
            </motion.span>
          )}
        </div>

        {/* 年度 */}
        <motion.p
          className={`font-display text-6xl md:text-7xl font-bold mb-4 ${
            isCompleted ? "text-dark/30" : "text-gradient"
          }`}
        >
          {props.year}
        </motion.p>

        {/* タイトル */}
        <h3
          className={`font-display text-xl md:text-2xl mb-6 ${
            isCompleted ? "text-dark/50" : "text-dark"
          }`}
        >
          OBOG演奏会
        </h3>

        {/* 詳細情報 */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-3">
            <Calendar
              className={`w-4 h-4 ${isCompleted ? "text-dark/30" : "text-secondary"}`}
            />
            <span
              className={`font-body text-sm ${isCompleted ? "text-dark/40" : "text-dark/70"}`}
            >
              {props.date || "日程未定"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Clock
              className={`w-4 h-4 ${isCompleted ? "text-dark/30" : "text-secondary"}`}
            />
            <span
              className={`font-body text-sm ${isCompleted ? "text-dark/40" : "text-dark/70"}`}
            >
              {props.time || "時間未定"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin
              className={`w-4 h-4 ${isCompleted ? "text-dark/30" : "text-secondary"}`}
            />
            <span
              className={`font-body text-sm ${isCompleted ? "text-dark/40" : "text-dark/70"}`}
            >
              {props.venue || "会場未定"}
            </span>
          </div>
        </div>

        {/* アクションボタン */}
        {isCompleted && props.detailLink ? (
          <Link
            href={props.detailLink}
            className="inline-flex items-center gap-2 font-body text-sm text-dark/50 hover:text-secondary transition-colors group/link"
          >
            <span>詳細を見る</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        ) : !isCompleted ? (
          <p className="font-body text-sm text-dark/60 italic">
            続報をお待ちください
          </p>
        ) : null}

        {/* 装飾：有機的なシェイプ */}
        {!isCompleted && (
          <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-accent/10 to-secondary/5 blur-2xl" />
        )}
      </div>
    </motion.div>
  );
};

const ConcertInfoSection = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* 背景 */}
      <div className="absolute inset-0 aurora-bg" />

      {/* 装飾 */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* セクションヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-body text-xs tracking-[0.3em] text-secondary mb-4">
            CONCERT INFORMATION
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-dark">
            演奏会情報
          </h2>
        </motion.div>

        {/* カードグリッド */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <ConcertCard
            year={2025}
            status="completed"
            date="2025年1月26日（日）"
            time="13:00 開場 / 13:30 開演"
            venue="SECOND ROOMS"
            detailLink="/concerts/2025"
          />
          <ConcertCard
            year={2026}
            status="upcoming"
            date={undefined}
            time={undefined}
            venue={undefined}
          />
        </div>
      </div>
    </section>
  );
};

export default ConcertInfoSection;
