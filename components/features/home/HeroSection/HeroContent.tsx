import { motion, MotionValue } from "motion/react";
import { Sparkles } from "lucide-react";
import { memo } from "react";
import { useHeroAnimation } from "./useHeroAnimation";

export const HeroContent = memo(({
  animations,
  isLoaded
}: {
  animations: ReturnType<typeof useHeroAnimation>;
  isLoaded: boolean;
}) => {
  return (
    <div className="relative z-50 flex flex-col justify-center items-center h-full w-full px-4 md:px-8 lg:px-12">
      {/* タイトルセクション - Framer Motionが自動でGPU最適化 */}
      <motion.div
        style={{
          y: animations.titleY,
          opacity: animations.titleOpacity,
          scale: animations.titleScale,
        }}
        className="absolute"
      >
        <div className="text-center">
          <div className="my-4">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold block mt-2 text-orange-500">
              アコースティック
            </h2>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold block mt-2 text-orange-500">
              ギターサークル
            </h2>
            <div className="w-38 lg:w-68 h-1 bg-orange-500 mx-auto mt-2 rounded-full" />
          </div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white/90 mt-2">
            OBOG LIVE 2025
          </h1>
        </div>
      </motion.div>

      {/* サブタイトルセクション - Framer Motionが自動でGPU最適化 */}
      <motion.div
        style={{
          y: animations.subtitleY,
          opacity: animations.subtitleOpacity,
          scale: animations.subtitleScale,
        }}
        className="absolute text-center px-4"
      >
        <div className="mb-6">
          {/* 1) Sparkles（1個） */}
          <Sparkles
            className="w-8 h-8 text-orange-400 mx-auto mb-3"
            aria-hidden
          />

          {/* 2) おひるにゆるっと一緒に（左右に短いラインを常時表示） */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-1">
            <span
              className="h-px w-6 sm:w-8 md:w-16 bg-white/25 rounded-full"
              aria-hidden
            />
            <h2
              className="whitespace-nowrap text-lg md:text-2xl lg:text-3xl font-bold text-white
                        tracking-[0.06em] sm:tracking-[0.12em] md:tracking-[0.24em]"
              aria-label="おひるにゆるっと一緒に"
            >
              おひるにゆるっと一緒に
            </h2>
            <span
              className="h-px w-6 sm:w-8 md:w-16 bg-white/25 rounded-full"
              aria-hidden
            />
          </div>

          {/* 3) 「久しぶり」から始まる */}
          <div className="mt-6 text-sm md:text-base text-white/90 mb-1">
            「久しぶり」から始まる
          </div>

          {/* 4) 音楽会（オレンジ＋下線） */}
          <div className="text-sm md:text-base font-extrabold text-orange-500">
            音楽会
          </div>
          {/* Tailwindに w-18 はないので w-20 に修正 */}
          <div className="w-20 h-0.5 bg-orange-500 mx-auto rounded-full mt-2" />
        </div>

        {/* 既存の2行テキストは削除 */}
      </motion.div>




    </div>
  );
});