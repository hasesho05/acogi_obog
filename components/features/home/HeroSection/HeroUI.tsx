import { motion } from "framer-motion";
import { ChevronDown, Loader2 } from "lucide-react";

export const HeroUI = (props: {
  videos: string[];
  currentVideoIndex: number;
  videoLoadingStage: 'poster' | 'loading' | 'ready';
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* ビデオプログレスインジケーター（動画準備完了後のみ表示） */}
      {props.videoLoadingStage === 'ready' && props.videos.length > 1 && (
        <VideoProgressIndicator 
          videos={props.videos}
          currentIndex={props.currentVideoIndex}
        />
      )}

      {/* 動画ロード状態の表示 */}
      {props.videoLoadingStage === 'loading' && (
        <LoadingIndicator />
      )}

      {/* スクロールインジケーター */}
      <ScrollIndicator />
    </div>
  );
};

// ビデオプログレスインジケーター（シンプル版）
const VideoProgressIndicator = (props: {
  videos: string[];
  currentIndex: number;
}) => (
  <motion.div 
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 }}
    className="absolute top-8 left-8 right-8"
  >
    <div className="flex gap-2 max-w-xs mx-auto">
      {props.videos.map((_, index) => (
        <div
          key={index}
          className={`h-1 flex-1 rounded-full transition-all duration-500 ${
            props.currentIndex === index 
              ? 'bg-white/60' 
              : 'bg-white/20'
          }`}
        />
      ))}
    </div>
  </motion.div>
);

// ローディングインジケーター
const LoadingIndicator = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute top-8 right-8"
  >
    <div className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-full">
      <Loader2 className="w-4 h-4 text-white/60 animate-spin" />
      <span className="text-xs text-white/60">動画を読み込み中...</span>
    </div>
  </motion.div>
);

// スクロールインジケーター
const ScrollIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 2, duration: 1 }}
    className="absolute bottom-8 left-1/2 -translate-x-1/2"
  >
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="flex flex-col items-center gap-2 text-white/60"
    >
      <span className="text-xs uppercase tracking-wider">Scroll</span>
      <ChevronDown className="w-5 h-5" />
    </motion.div>
  </motion.div>
);