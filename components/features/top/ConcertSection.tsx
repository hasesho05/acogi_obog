'use client';

import { ArrowRight, Calendar, Check, Clock, MapPin } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import Link from 'next/link';
import { useRef } from 'react';
import type { ConcertCardProps } from '@/domain/entities/concert';
import { concerts } from '@/infrastructure/repositories/concertRepository';
import { MusicNoteIcon } from './icons';

const ConcertCard = (props: ConcertCardProps) => {
  const isCompleted = props.data.status === 'completed';
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: props.index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative group"
    >
      {/* カードコンテナ */}
      <div
        className={`relative overflow-hidden border-t border-b p-7 md:p-10 transition-colors duration-300 ${
          isCompleted
            ? 'border-dark/15 bg-white/55'
            : 'border-secondary/70 bg-white/80 hover:bg-white'
        }`}
      >
        {/* ステータスバッジ */}
        <div className="relative z-10 mb-10 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <MusicNoteIcon
              className={`h-5 w-5 ${isCompleted ? 'text-dark/30' : 'text-secondary'}`}
            />
            <span
              className={`font-body text-[0.65rem] uppercase tracking-[0.24em] ${
                isCompleted ? 'text-dark/40' : 'text-secondary'
              }`}
            >
              {isCompleted ? 'Archive' : 'Next concert'}
            </span>
          </div>

          {isCompleted ? (
            <span className="inline-flex items-center gap-1.5 font-body text-xs tracking-wider px-3 py-1.5 rounded-full bg-dark/10 text-dark/50">
              <Check className="w-3 h-3" />
              終了しました
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 border border-secondary/50 px-3 py-1.5 font-body text-[0.65rem] uppercase tracking-[0.14em] text-secondary">
              Coming in 2026
            </span>
          )}
        </div>

        {/* 年度 */}
        <motion.p
          className={`relative z-10 mb-2 font-display text-7xl font-semibold leading-none tracking-[-0.08em] md:text-8xl ${
            isCompleted ? 'text-dark/25' : 'text-secondary'
          }`}
        >
          {props.data.year}
        </motion.p>

        {/* タイトル */}
        <h3
          className={`relative z-10 mb-8 font-display text-2xl md:text-3xl ${
            isCompleted ? 'text-dark/40' : 'text-dark'
          }`}
        >
          OBOG演奏会
        </h3>

        {/* 詳細情報 */}
        <div className="relative z-10 space-y-4 mb-8">
          <div className="flex items-center gap-4">
            <div
              className={`flex h-9 w-9 items-center justify-center border ${
                isCompleted ? 'bg-dark/5' : 'bg-secondary/10'
              }`}
            >
              <Calendar className={`w-5 h-5 ${isCompleted ? 'text-dark/30' : 'text-secondary'}`} />
            </div>
            <span className={`font-body text-sm ${isCompleted ? 'text-dark/40' : 'text-dark/70'}`}>
              {props.data.date || '日程未定 - 続報をお待ちください'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div
              className={`flex h-9 w-9 items-center justify-center border ${
                isCompleted ? 'bg-dark/5' : 'bg-secondary/10'
              }`}
            >
              <Clock className={`w-5 h-5 ${isCompleted ? 'text-dark/30' : 'text-secondary'}`} />
            </div>
            <span className={`font-body text-sm ${isCompleted ? 'text-dark/40' : 'text-dark/70'}`}>
              {props.data.time || '時間未定'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div
              className={`flex h-9 w-9 items-center justify-center border ${
                isCompleted ? 'bg-dark/5' : 'bg-secondary/10'
              }`}
            >
              <MapPin className={`w-5 h-5 ${isCompleted ? 'text-dark/30' : 'text-secondary'}`} />
            </div>
            <span className={`font-body text-sm ${isCompleted ? 'text-dark/40' : 'text-dark/70'}`}>
              {props.data.venue || '会場未定'}
            </span>
          </div>
        </div>

        {/* アクションボタン */}
        {props.data.detailLink ? (
          <Link
            href={props.data.detailLink}
            className="relative z-10 inline-flex items-center gap-2 font-body text-sm text-dark/50 hover:text-secondary transition-colors group/link px-4 py-2 rounded-full hover:bg-secondary/5"
          >
            <span>{isCompleted ? '詳細を見る' : '特設ページを見る'}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        ) : !isCompleted ? (
          <p className="relative z-10 font-body text-sm text-dark/50 italic px-4 py-2">
            続報をお待ちください
          </p>
        ) : null}
      </div>
    </motion.div>
  );
};

const ConcertSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32 content-visibility-auto"
    >
      <div className="relative z-10 mx-auto max-w-5xl px-6 sm:px-10">
        {/* セクションヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 flex items-end justify-between gap-8 border-b border-dark/20 pb-7 text-left md:mb-16"
        >
          <div>
            <p className="mb-3 font-body text-[0.65rem] uppercase tracking-[0.24em] text-secondary">
              01 / Program
            </p>
            <h2 className="font-display text-4xl text-dark md:text-5xl">演奏会情報</h2>
          </div>
          <p className="hidden max-w-xs text-right font-body text-sm leading-6 text-dark/60 md:block">
            これまでの音色と、これからの一日。
            <br />
            演奏会の記録をご案内します。
          </p>
        </motion.div>

        {/* カードグリッド */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {concerts.map((concert, index) => (
            <ConcertCard key={concert.year} data={concert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConcertSection;
