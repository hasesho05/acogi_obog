"use client";

import { motion, useInView } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import {
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  Check,
  Music,
} from "lucide-react";
import type { ConcertArchiveCardProps } from "@/domain/entities/concert";

const ConcertArchiveCard = (props: ConcertArchiveCardProps) => {
  const isCompleted = props.data.status === "completed";
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: props.index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative"
    >
      {/* タイムラインコネクタ */}
      <div className="flex items-start gap-6 md:gap-10">
        {/* 左側：年度マーカー */}
        <div className="hidden md:flex flex-col items-center flex-shrink-0 w-28">
          {/* 年度ドット */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{
              duration: 0.5,
              delay: props.index * 0.15 + 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`relative w-14 h-14 rounded-full flex items-center justify-center ${
              isCompleted
                ? "bg-gradient-to-br from-tertiary to-primary border-2 border-dark/10"
                : "bg-gradient-to-br from-secondary to-accent border-2 border-secondary/30"
            }`}
          >
            {isCompleted ? (
              <Check className="w-5 h-5 text-dark/40" />
            ) : (
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <Sparkles className="w-5 h-5 text-white" />
              </motion.div>
            )}

            {/* グロー（upcoming用） */}
            {!isCompleted && (
              <motion.div
                animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.3, 1] }}
                transition={{
                  duration: 2.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full bg-secondary/20 blur-md"
              />
            )}
          </motion.div>

          {/* 年度テキスト */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: props.index * 0.15 + 0.3 }}
            className={`font-display text-lg font-bold mt-3 ${
              isCompleted ? "text-dark/30" : "text-secondary"
            }`}
          >
            {props.data.year}
          </motion.span>
        </div>

        {/* 右側：カード本体 */}
        <div className="flex-1 min-w-0">
          <div
            className={`relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] transition-all duration-500 ${
              isCompleted
                ? "bg-white/35 backdrop-blur-md border border-dark/8 hover:border-dark/15 hover:bg-white/45"
                : "bg-white/55 backdrop-blur-xl border border-secondary/20 hover:border-secondary/40"
            }`}
          >
            {/* グロー効果（upcoming用） */}
            {!isCompleted && (
              <>
                <div className="absolute -inset-1 bg-gradient-to-r from-secondary/15 via-accent/20 to-green/15 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                <motion.div
                  animate={{
                    opacity: [0.2, 0.5, 0.2],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="absolute -inset-1 bg-gradient-to-r from-secondary/8 via-green/10 to-accent/8 rounded-[2rem] blur-2xl"
                />
              </>
            )}

            {/* カード内部背景 */}
            <div
              className={`absolute inset-0 ${
                isCompleted
                  ? "bg-gradient-to-br from-tertiary/20 to-primary/40"
                  : "bg-gradient-to-br from-white/50 to-tertiary/30"
              }`}
            />

            <div className="relative z-10 p-6 md:p-8 lg:p-10">
              {/* モバイル年度 + ステータス */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  {/* モバイル年度バッジ */}
                  <span
                    className={`md:hidden font-display text-3xl font-bold ${
                      isCompleted
                        ? "text-dark/20"
                        : "bg-gradient-to-r from-secondary via-accent to-green bg-clip-text text-transparent"
                    }`}
                  >
                    {props.data.year}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <Music
                      className={`w-4 h-4 ${
                        isCompleted ? "text-dark/25" : "text-secondary"
                      }`}
                    />
                    <span
                      className={`font-body text-xs tracking-wider ${
                        isCompleted ? "text-dark/35" : "text-secondary"
                      }`}
                    >
                      OBOG演奏会
                    </span>
                  </div>
                </div>

                {isCompleted ? (
                  <span className="inline-flex items-center gap-1.5 font-body text-xs tracking-wider px-3 py-1.5 rounded-full bg-dark/8 text-dark/45">
                    <Check className="w-3 h-3" />
                    終了
                  </span>
                ) : (
                  <motion.span
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    className="inline-flex items-center gap-1.5 font-body text-xs tracking-wider px-4 py-2 rounded-full bg-gradient-to-r from-secondary to-accent text-white shadow-lg shadow-secondary/20"
                  >
                    <Sparkles className="w-3 h-3" />
                    Coming Soon
                  </motion.span>
                )}
              </div>

              {/* PC年度（大きく表示） */}
              <p
                className={`hidden md:block font-display text-5xl lg:text-6xl font-bold mb-2 ${
                  isCompleted
                    ? "text-dark/12"
                    : "bg-gradient-to-r from-secondary via-accent to-green bg-clip-text text-transparent"
                }`}
              >
                {props.data.year}
              </p>

              {/* 説明文 */}
              {props.data.description && (
                <p
                  className={`font-body text-sm leading-relaxed mb-6 max-w-xl ${
                    isCompleted ? "text-dark/45" : "text-dark/60"
                  }`}
                >
                  {props.data.description}
                </p>
              )}

              {/* 詳細情報 */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isCompleted ? "bg-dark/5" : "bg-secondary/10"
                    }`}
                  >
                    <Calendar
                      className={`w-4 h-4 ${
                        isCompleted ? "text-dark/30" : "text-secondary"
                      }`}
                    />
                  </div>
                  <span
                    className={`font-body text-sm ${
                      isCompleted ? "text-dark/40" : "text-dark/65"
                    }`}
                  >
                    {props.data.date || "日程未定 — 続報をお待ちください"}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isCompleted ? "bg-dark/5" : "bg-secondary/10"
                    }`}
                  >
                    <Clock
                      className={`w-4 h-4 ${
                        isCompleted ? "text-dark/30" : "text-secondary"
                      }`}
                    />
                  </div>
                  <span
                    className={`font-body text-sm ${
                      isCompleted ? "text-dark/40" : "text-dark/65"
                    }`}
                  >
                    {props.data.time || "時間未定"}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isCompleted ? "bg-dark/5" : "bg-secondary/10"
                    }`}
                  >
                    <MapPin
                      className={`w-4 h-4 ${
                        isCompleted ? "text-dark/30" : "text-secondary"
                      }`}
                    />
                  </div>
                  <span
                    className={`font-body text-sm ${
                      isCompleted ? "text-dark/40" : "text-dark/65"
                    }`}
                  >
                    {props.data.venue || "会場未定"}
                  </span>
                </div>
              </div>

              {/* アクション */}
              {isCompleted && props.data.detailLink ? (
                <Link
                  href={props.data.detailLink}
                  className="inline-flex items-center gap-2 font-body text-sm text-dark/50 hover:text-secondary transition-colors group/link px-4 py-2.5 rounded-full hover:bg-secondary/5 border border-transparent hover:border-secondary/15"
                >
                  <span>詳細を見る</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              ) : !isCompleted ? (
                <p className="font-body text-sm text-dark/45 italic px-4 py-2">
                  続報をお待ちください
                </p>
              ) : null}
            </div>

            {/* 有機的な装飾シェイプ */}
            {!isCompleted && (
              <>
                <div className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br from-accent/12 to-secondary/8 blur-3xl" />
                <div className="absolute -top-12 -left-12 w-28 h-28 rounded-full bg-gradient-to-tr from-green/8 to-green-light/5 blur-2xl" />
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ConcertArchiveCard;
