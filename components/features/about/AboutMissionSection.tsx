"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Coffee, Music2, MessageCircle, Smile } from "lucide-react";

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  accent: "secondary" | "green" | "accent";
};

const accentStyles = {
  secondary: {
    iconBg: "bg-secondary/10",
    iconColor: "text-secondary",
    borderHover: "hover:border-secondary/30",
    glow: "group-hover:shadow-secondary/10",
  },
  green: {
    iconBg: "bg-green/10",
    iconColor: "text-green",
    borderHover: "hover:border-green/30",
    glow: "group-hover:shadow-green/10",
  },
  accent: {
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
    borderHover: "hover:border-accent/30",
    glow: "group-hover:shadow-accent/10",
  },
};

const FeatureCard = (props: FeatureCardProps) => {
  const { icon, title, description, index, accent } = props;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const styles = accentStyles[accent];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div
        className={`relative h-full p-8 md:p-10 rounded-3xl bg-white/60 backdrop-blur-sm border border-white/50 transition-all duration-500 ${styles.borderHover} hover:bg-white/80 hover:shadow-2xl ${styles.glow}`}
      >
        {/* 装飾シェイプ */}
        <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full ${styles.iconBg} blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />

        {/* アイコン */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
          className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${styles.iconBg} ${styles.iconColor} mb-6`}
        >
          {icon}
        </motion.div>

        {/* タイトル */}
        <h3 className="font-display text-xl md:text-2xl font-bold text-dark mb-4">
          {title}
        </h3>

        {/* 説明 */}
        <p className="font-body text-sm md:text-base text-dark/60 leading-relaxed">
          {description}
        </p>

        {/* 装飾ライン */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent ${accent === "secondary" ? "via-secondary/20" : accent === "green" ? "via-green/20" : "via-accent/20"} to-transparent rounded-full`}
        />
      </div>
    </motion.div>
  );
};

const featureItems = [
  {
    icon: <Coffee className="w-7 h-7" />,
    title: "ゆるく、気軽に",
    description: "練習ノルマなし、参加も自由。「久しぶりにギター触りたいな」くらいの気持ちで大丈夫です。",
    accent: "secondary" as const,
  },
  {
    icon: <MessageCircle className="w-7 h-7" />,
    title: "懐かしい顔ぶれ",
    description: "卒業してバラバラになっても、年に一度ここで会える。近況報告も楽しみのひとつ。",
    accent: "green" as const,
  },
  {
    icon: <Music2 className="w-7 h-7" />,
    title: "弾きたい曲を弾く",
    description: "ソロでも、バンドでも、昔やった曲でも、新しい曲でも。やりたいことをやる場所です。",
    accent: "accent" as const,
  },
  {
    icon: <Smile className="w-7 h-7" />,
    title: "上手くなくても大丈夫",
    description: "ブランクあっても全然OK。楽しむことがいちばん大事。完璧じゃなくていい。",
    accent: "secondary" as const,
  },
];

const AboutMissionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* 背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-tertiary/20 to-primary" />

      {/* 装飾メッシュグラデーション */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-radial from-secondary/10 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-radial from-green/10 to-transparent blur-3xl" />
      </div>

      {/* 波形パターン背景 */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <pattern id="wave-pattern" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M0 10 Q 25 0, 50 10 T 100 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-secondary"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#wave-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* セクションヘッダー */}
        <div className="text-center mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="font-body text-xs tracking-[0.3em] text-green/70 mb-4"
          >
            HOW WE DO
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-12 h-px mx-auto mb-6 bg-gradient-to-r from-transparent via-green/40 to-transparent"
          />

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-dark mb-6"
          >
            こんな感じでやってます
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-body text-base md:text-lg text-dark/50 max-w-2xl mx-auto"
          >
            堅苦しいことは抜きで、楽しむのがモットーです
          </motion.p>
        </div>

        {/* カードグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {featureItems.map((item, index) => (
            <FeatureCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
              accent={item.accent}
              index={index}
            />
          ))}
        </div>

        {/* 装飾引用 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 md:mt-24 text-center"
        >
          <div className="relative inline-block">
            <div className="absolute -top-4 -left-6 text-6xl text-secondary/10 font-display">"</div>
            <p className="font-display text-xl md:text-2xl text-dark/70 italic max-w-3xl mx-auto leading-relaxed px-8">
              また、みんなでギター弾きたいな
            </p>
            <div className="absolute -bottom-8 -right-6 text-6xl text-green/10 font-display rotate-180">"</div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-6 font-body text-sm text-dark/40"
          >
            そんな気持ちを叶える場所です
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMissionSection;
