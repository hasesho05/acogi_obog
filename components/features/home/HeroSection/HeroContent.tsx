import { motion, MotionValue } from "framer-motion";
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
      {/* タイトルセクション - transform3dとwill-changeで最適化 */}
      <motion.div
        style={{
          y: animations.titleY,
          opacity: animations.titleOpacity,
          scale: animations.titleScale,
        }}
        className="absolute will-change-transform"
      >
        <div className="text-center">
          <div className="my-4">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold block mt-2 text-orange-500">
              アコースティック
            </h2>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold block mt-2 text-orange-500">
              ギターサークル
            </h2>
            <div className="w-32 h-1 bg-orange-500 mx-auto mt-2 rounded-full" />
          </div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white/90 mt-2">
            OBOG LIVE 2025
          </h1>
        </div>
      </motion.div>

      {/* サブタイトルセクション - transform3dとwill-changeで最適化 */}
      <motion.div
        style={{
          y: animations.subtitleY,
          opacity: animations.subtitleOpacity,
          scale: animations.subtitleScale,
        }}
        className="absolute text-center px-4 will-change-transform"
      >
        <div className="mb-6">
          <Sparkles className="w-8 h-8 text-orange-400 mx-auto mb-4" />
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">
            「久しぶり」から始まる
            <span className="block mt-2 text-orange-500">
              音楽会
            </span>
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full" />
        </div>
        
        <div className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
          <span className="text-sm md:text-base">
            あの頃の思い出を語りながら、
          </span>
          <span className="block mt-2 text-sm md:text-base">
            一緒に音を紡ぎましょう。
          </span>
        </div>
      </motion.div>
    </div>
  );
});