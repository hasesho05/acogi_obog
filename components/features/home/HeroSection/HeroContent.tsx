import { motion, MotionValue } from "framer-motion";
import { Sparkles } from "lucide-react";

const typewriterTexts = [
  { text: "龍谷大学" },
  { text: "アコギサークル" },
  { text: "OBOG演奏会 2025" },
];

const messages = {
  main: "「久しぶり」から始まる",
  sub: "音楽会",
  description: [
    "あの頃の思い出を語りながら、",
    "一緒に音を紡ぎましょう。"
  ]
};

// インライン型定義
export const HeroContent = (props: {
  animations: {
    titleY: MotionValue<number>;
    titleOpacity: MotionValue<number>;
    titleScale: MotionValue<number>;
    subtitleY: MotionValue<number>;
    subtitleOpacity: MotionValue<number>;
    subtitleScale: MotionValue<number>;
  };
  isLoaded: boolean;
}) => {
  return (
    <div className="relative z-50 flex flex-col justify-center items-center h-full w-full px-4 md:px-8 lg:px-12">
      {/* タイトルセクション */}
      <TitleSection 
        animations={props.animations}
        isLoaded={props.isLoaded}
      />

      {/* サブタイトルセクション */}
      <SubtitleSection
        animations={props.animations}
      />
    </div>
  );
};

// タイトルセクション - インライン型定義
const TitleSection = (props: {
  animations: {
    titleY: MotionValue<number>;
    titleOpacity: MotionValue<number>;
    titleScale: MotionValue<number>;
  };
  isLoaded: boolean;
}) => (
  <motion.div
    style={{
      y: props.animations.titleY,
      opacity: props.animations.titleOpacity,
      scale: props.animations.titleScale,
    }}
    className="absolute"
  >
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={props.isLoaded ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      className="text-center"
    >
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white/90 mb-2">
        {typewriterTexts[0].text}
      </h1>
      <div className="my-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold block mt-2 bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
          {typewriterTexts[1].text}
        </h2>
        <div className="w-32 h-1 bg-gradient-to-r from-orange-500/50 to-orange-500 mx-auto mt-2 rounded-full" />
      </div>
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white/90 mt-2">
        {typewriterTexts[2].text}
      </h1>
    </motion.div>
  </motion.div>
);

// サブタイトルセクション - インライン型定義
const SubtitleSection = (props: {
  animations: {
    subtitleY: MotionValue<number>;
    subtitleOpacity: MotionValue<number>;
    subtitleScale: MotionValue<number>;
  };
}) => (
  <motion.div
    style={{
      y: props.animations.subtitleY,
      opacity: props.animations.subtitleOpacity,
      scale: props.animations.subtitleScale,
    }}
    className="absolute text-center px-4"
  >
    <motion.div className="mb-6">
      <Sparkles className="w-8 h-8 text-accent mx-auto mb-4 animate-pulse" />
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">
        {messages.main}
        <span className="block mt-2 bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
          {messages.sub}
        </span>
      </h2>
      <div className="w-24 h-1 bg-gradient-to-r from-accent to-secondary mx-auto rounded-full" />
    </motion.div>
    
    <motion.div 
      className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      {messages.description.map((text: string, index: number) => (
        <span key={index} className={index > 0 ? "block mt-2 text-sm md:text-base" : "text-sm md:text-base"}>
          {text}
        </span>
      ))}
    </motion.div>
  </motion.div>
);
