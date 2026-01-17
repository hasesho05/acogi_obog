"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Guitar, Users, Music, Calendar } from "lucide-react";

type TimelineEvent = {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  accent: "secondary" | "green";
};

const timelineEvents: TimelineEvent[] = [
  {
    year: "2016",
    title: "はじまりの日",
    description: "Second Roomsにて、OB・OGを交えた初めての演奏会を開催。卒業しても「また弾きたいな」という想いがカタチになりました。",
    icon: <Guitar className="w-5 h-5" />,
    accent: "secondary",
  },
  {
    year: "2017-",
    title: "年イチの恒例行事に",
    description: "「あれ楽しかったね、また来年も」の声から、毎年開催が定着。ゆるく、でも確実に続いています。",
    icon: <Music className="w-5 h-5" />,
    accent: "green",
  },
  {
    year: "現在",
    title: "いつもの場所で",
    description: "Second Roomsでの演奏会は、卒業生たちの「ただいま」と「おかえり」が交わる場所になりました。",
    icon: <Users className="w-5 h-5" />,
    accent: "secondary",
  },
  {
    year: "2025",
    title: "10回目の演奏会",
    description: "気づけば10回目。特別なことはしないけど、いつも通りみんなで音を楽しむ。それがいちばん。",
    icon: <Calendar className="w-5 h-5" />,
    accent: "green",
  },
];

const TimelineItem = (props: { event: TimelineEvent; index: number; isLeft: boolean }) => {
  const { event, index, isLeft } = props;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const accentColors = {
    secondary: {
      bg: "bg-secondary/10",
      border: "border-secondary/30",
      icon: "text-secondary",
      dot: "bg-secondary",
    },
    green: {
      bg: "bg-green/10",
      border: "border-green/30",
      icon: "text-green",
      dot: "bg-green",
    },
  };

  const colors = accentColors[event.accent];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex items-center gap-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      {/* カード */}
      <div className={`flex-1 ${isLeft ? "md:text-right" : "md:text-left"}`}>
        <div className={`relative p-6 md:p-8 rounded-2xl ${colors.bg} border ${colors.border} backdrop-blur-sm`}>
          {/* 装飾シェイプ */}
          <div className={`absolute ${isLeft ? "-right-8" : "-left-8"} top-1/2 -translate-y-1/2 w-16 h-16 rounded-full ${colors.bg} blur-xl opacity-50 hidden md:block`} />

          {/* 年 */}
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${colors.bg} border ${colors.border} mb-4`}>
            <span className={`font-display text-sm font-semibold ${colors.icon}`}>
              {event.year}
            </span>
          </div>

          {/* アイコン */}
          <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${colors.bg} ${colors.icon} mb-4 ml-2`}>
            {event.icon}
          </div>

          {/* タイトル */}
          <h3 className="font-display text-xl md:text-2xl font-bold text-dark mb-3">
            {event.title}
          </h3>

          {/* 説明 */}
          <p className="font-body text-sm md:text-base text-dark/60 leading-relaxed">
            {event.description}
          </p>
        </div>
      </div>

      {/* タイムラインドット（モバイル非表示） */}
      <div className="hidden md:flex items-center justify-center w-12 flex-shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
          className={`w-4 h-4 rounded-full ${colors.dot} ring-4 ring-white shadow-lg`}
        />
      </div>

      {/* スペーサー */}
      <div className="hidden md:block flex-1" />
    </motion.div>
  );
};

const AboutStorySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* 背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-tertiary/30 to-primary" />

      {/* 装飾シェイプ */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-secondary/5 blur-3xl" />
      <div className="absolute bottom-1/4 -right-48 w-80 h-80 rounded-full bg-green/5 blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* セクションヘッダー */}
        <div className="text-center mb-16 md:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="font-body text-xs tracking-[0.3em] text-secondary/60 mb-4"
          >
            OUR STORY
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-12 h-px mx-auto mb-6 bg-gradient-to-r from-transparent via-secondary/40 to-transparent"
          />

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-dark mb-6"
          >
            これまでのこと
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-body text-base md:text-lg text-dark/50 max-w-2xl mx-auto"
          >
            2016年から始まった、ゆるくて温かい恒例行事。
          </motion.p>
        </div>

        {/* タイムライン */}
        <div className="relative">
          {/* 中央ライン（モバイル非表示） */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-secondary/20 via-green/20 to-secondary/20 origin-top"
          />

          {/* タイムラインアイテム */}
          <div className="space-y-8 md:space-y-0">
            {timelineEvents.map((event, index) => (
              <TimelineItem
                key={event.year}
                event={event}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStorySection;
