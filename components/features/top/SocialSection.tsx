"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Instagram, ExternalLink, Play, Heart } from "lucide-react";
import { IconBrandYoutube } from "@tabler/icons-react";
import { trackTrialCtaClick } from "@/lib/analytics/events";

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
    href: "https://www.youtube.com/@obog4633",
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
      whileHover={{ x: 6, transition: { duration: 0.25 } }}
      onClick={() =>
        trackTrialCtaClick({
          location: "footer",
          destination: props.data.platform,
        })
      }
      className="group relative block border-b border-dark/20 py-7 first:border-t"
    >
      <div className="relative grid gap-6 md:grid-cols-[5rem_1fr_auto] md:items-center md:gap-8">
        <div className="relative flex h-14 w-14 items-center justify-center border border-dark/20 transition-colors duration-300 group-hover:border-secondary">
          {isYoutube ? (
            <IconBrandYoutube className="h-7 w-7 text-dark" />
          ) : (
            <Instagram className="h-7 w-7 text-dark" />
          )}
        </div>

        <div>
          <h3 className="mb-2 flex items-center gap-3 font-display text-2xl text-dark md:text-3xl">
            {props.data.title}
            <ExternalLink className="h-4 w-4 text-dark/35 transition-colors group-hover:text-secondary" />
          </h3>
          <p className="max-w-xl font-body text-sm leading-7 text-dark/60">{props.data.description}</p>
        </div>
        <span className="font-body text-xs uppercase tracking-[0.18em] text-secondary">Follow ↗</span>
      </div>
    </motion.a>
  );
};

const SocialSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24 md:py-32 content-visibility-auto">
      <div className="relative z-10 mx-auto max-w-5xl px-6 sm:px-10">
        {/* セクションヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 flex items-end justify-between gap-8 md:mb-16"
        >
          <div>
            <p className="mb-3 font-body text-[0.65rem] uppercase tracking-[0.24em] text-green">02 / Connect</p>
            <h2 className="font-display text-4xl text-dark md:text-5xl">SNSでつながる</h2>
          </div>
          <Heart className="hidden h-7 w-7 text-green md:block" strokeWidth={1.5} />
        </motion.div>

        {/* SNSカードグリッド */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {socialLinks.map((link, index) => (
            <SocialCard key={link.platform} data={link} index={index} />
          ))}
        </div>
      </div>

    </section>
  );
};

export default SocialSection;
