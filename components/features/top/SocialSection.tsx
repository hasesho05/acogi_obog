"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Instagram, ExternalLink, Play, Heart } from "lucide-react";
import { IconBrandYoutube } from "@tabler/icons-react";

type SocialLinkData = {
  platform: "youtube" | "instagram";
  title: string;
  description: string;
  href: string;
  accentColor: string;
  iconBg: string;
};

const socialLinks: SocialLinkData[] = [
  {
    platform: "youtube",
    title: "YouTube",
    description: "過去の演奏動画を公開しています。ソロやアンサンブルなど、様々な演奏スタイルをお楽しみください。",
    href: "https://www.youtube.com/@acoustic_concert_obog",
    accentColor: "#FF0000",
    iconBg: "from-red-500/20 to-red-600/10",
  },
  {
    platform: "instagram",
    title: "Instagram",
    description: "演奏会の写真や舞台裏の様子を投稿しています。フォローして最新情報をチェック！",
    href: "https://www.instagram.com/acoustic_concert_obog",
    accentColor: "#E4405F",
    iconBg: "from-pink-500/20 via-purple-500/15 to-orange-500/10",
  },
];

type SocialCardProps = {
  data: SocialLinkData;
  index: number;
};

const SocialCard = (props: SocialCardProps) => {
  const isYoutube = props.data.platform === "youtube";
  const cardRef = useRef<HTMLAnchorElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.a
      ref={cardRef}
      href={props.data.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: props.index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="group relative block"
    >
      {/* カード */}
      <div className="relative overflow-hidden rounded-[2rem] p-8 md:p-10 bg-white/40 backdrop-blur-xl border border-white/30 hover:border-secondary/20 transition-all duration-500">
        {/* ホバーグロー */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 100%, ${props.data.accentColor}10, transparent 60%)`,
          }}
        />

        {/* アイコン */}
        <div
          className={`relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${props.data.iconBg} mb-6 transition-transform duration-500 group-hover:scale-110`}
        >
          {isYoutube ? (
            <div className="relative">
              <IconBrandYoutube className="w-8 h-8 text-red-500" />
              <motion.div
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Play className="w-4 h-4 text-red-500 fill-red-500" />
              </motion.div>
            </div>
          ) : (
            <div className="relative">
              <Instagram className="w-7 h-7 text-pink-500" />
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute -top-1 -right-1"
              >
                <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
              </motion.div>
            </div>
          )}
        </div>

        {/* タイトル */}
        <h3 className="relative z-10 font-display text-2xl md:text-3xl text-dark mb-4 flex items-center gap-3">
          {props.data.title}
          <ExternalLink className="w-5 h-5 text-dark/20 group-hover:text-secondary transition-colors" />
        </h3>

        {/* 説明 */}
        <p className="relative z-10 font-body text-sm text-dark/60 leading-relaxed mb-6">
          {props.data.description}
        </p>

        {/* CTAテキスト */}
        <div className="relative z-10 flex items-center gap-2 font-body text-sm text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>フォローする</span>
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </div>

        {/* ボトムライン */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 left-0 w-full h-1 origin-left"
          style={{
            background: `linear-gradient(90deg, ${props.data.accentColor}60, ${props.data.accentColor}20)`,
          }}
        />

        {/* 有機的装飾 */}
        <div
          className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
          style={{ backgroundColor: props.data.accentColor }}
        />
      </div>
    </motion.a>
  );
};

const SocialSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* 装飾ライン */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green/20 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
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
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green/10 to-secondary/10 mb-6"
          >
            <Heart className="w-7 h-7 text-green" />
          </motion.div>

          <p className="font-body text-xs tracking-[0.4em] text-green mb-4 uppercase">
            Follow Us
          </p>

          <h2 className="font-display text-4xl md:text-5xl text-dark mb-4">
            SNSでつながる
          </h2>

          <p className="font-body text-sm text-dark/60 max-w-md mx-auto mb-6">
            最新情報や演奏動画をお届けしています
          </p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-20 h-0.5 mx-auto bg-gradient-to-r from-transparent via-green/40 to-transparent"
          />
        </motion.div>

        {/* SNSカードグリッド */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {socialLinks.map((link, index) => (
            <SocialCard key={link.platform} data={link} index={index} />
          ))}
        </div>
      </div>

      {/* 背景装飾 */}
      <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-gradient-to-t from-green/5 to-transparent blur-3xl" />
      <div className="absolute top-1/4 right-0 w-48 h-48 rounded-full bg-gradient-to-l from-secondary/5 to-transparent blur-3xl" />
    </section>
  );
};

export default SocialSection;
