import { motion } from "motion/react";
import { ChevronDown, Loader2 } from "lucide-react";
import { memo } from "react";

export const HeroUI = memo((props: {
  isVideoReady: boolean;
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* 動画ロード状態の表示 */}
      {!props.isVideoReady && (
        <LoadingIndicator />
      )}

      {/* スクロールインジケーター */}
      <ScrollIndicator />
    </div>
  );
});

// ローディングインジケーター（backdrop-blur削除でGPU負荷軽減）
const LoadingIndicator = memo(() => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute top-8 right-8"
  >
    <div className="flex items-center gap-2 px-3 py-2 bg-black/30 rounded-full">
      <Loader2 className="w-4 h-4 text-white/60 animate-spin" />
      <span className="text-xs text-white/60">動画を読み込み中...</span>
    </div>
  </motion.div>
));

// スクロールインジケーター（ネストしたmotion.divを統合）
const ScrollIndicator = memo(() => (
  <motion.div
    data-testid="hero-scroll-indicator"
    initial={{ opacity: 0, y: 20 }}
    animate={{
      opacity: 1,
      y: [0, 10, 0],
    }}
    transition={{
      opacity: { delay: 2, duration: 1 },
      y: { delay: 2, duration: 2, repeat: Infinity },
    }}
    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60"
  >
    <span className="text-xs uppercase tracking-wider">Scroll</span>
    <ChevronDown className="w-5 h-5" />
  </motion.div>
));