"use client";

import { motion } from "motion/react";
import { Instagram, ExternalLink } from "lucide-react";
import { IconBrandYoutube } from "@tabler/icons-react";

type SNSCardProps = {
  platform: "youtube" | "instagram";
  title: string;
  description: string;
  href: string;
  index: number;
};

const SNSCard = (props: SNSCardProps) => {
  const isYoutube = props.platform === "youtube";

  return (
    <motion.a
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: props.index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      className="group relative block"
    >
      <div className="relative overflow-hidden rounded-3xl p-8 md:p-10 glassmorphism border border-dark/5 hover:border-secondary/20 transition-all duration-500">
        {/* アイコン */}
        <div
          className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 transition-all duration-500 ${
            isYoutube
              ? "bg-red-500/10 group-hover:bg-red-500/20"
              : "bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 group-hover:from-purple-500/20 group-hover:via-pink-500/20 group-hover:to-orange-500/20"
          }`}
        >
          {isYoutube ? (
            <IconBrandYoutube className="w-7 h-7 text-red-500" />
          ) : (
            <Instagram className="w-6 h-6 text-pink-500" />
          )}
        </div>

        {/* タイトル */}
        <h3 className="font-display text-xl md:text-2xl text-dark mb-3 flex items-center gap-2">
          {props.title}
          <ExternalLink className="w-4 h-4 text-dark/30 group-hover:text-secondary transition-colors" />
        </h3>

        {/* 説明 */}
        <p className="font-body text-sm text-dark/60 leading-relaxed">
          {props.description}
        </p>

        {/* ホバーライン */}
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-secondary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />

        {/* 背景装飾 */}
        <div
          className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100 ${
            isYoutube ? "bg-red-500/10" : "bg-pink-500/10"
          }`}
        />
      </div>
    </motion.a>
  );
};

const SNSSection = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* 背景 */}
      <div className="absolute inset-0 aurora-bg" />

      {/* 装飾ライン */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        {/* セクションヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-body text-xs tracking-[0.3em] text-secondary mb-4">
            FOLLOW US
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-dark mb-4">
            SNSでつながる
          </h2>
          <p className="font-body text-sm text-dark/60 max-w-md mx-auto">
            最新情報や演奏動画をお届けしています
          </p>
        </motion.div>

        {/* SNSカードグリッド */}
        <div className="grid md:grid-cols-2 gap-6">
          <SNSCard
            platform="youtube"
            title="YouTube"
            description="過去の演奏動画を公開しています。ソロやアンサンブルなど、様々な演奏スタイルをお楽しみください。"
            href="https://www.youtube.com/@obog4633"
            index={0}
          />
          <SNSCard
            platform="instagram"
            title="Instagram"
            description="演奏会の写真や舞台裏の様子を投稿しています。フォローして最新情報をチェック！"
            href="https://www.instagram.com/acoustic_concert_obog"
            index={1}
          />
        </div>
      </div>
    </section>
  );
};

export default SNSSection;
