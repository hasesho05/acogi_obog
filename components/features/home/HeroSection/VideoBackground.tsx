import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { MotionValue } from "framer-motion";

export const VideoBackground = (props: {
  videoScale: MotionValue<number>;
  isVideoReady: boolean;
  onVideoReady: () => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // 動画のロードと準備完了の通知（最適化）
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isLoaded = false;
    
    const handleCanPlay = () => {
      if (!isLoaded) {
        isLoaded = true;
        props.onVideoReady();
      }
    };

    // 複数のイベントをリッスンして確実性を向上
    video.addEventListener('canplaythrough', handleCanPlay);
    video.addEventListener('loadeddata', handleCanPlay);

    // 既に再生可能な状態の場合は即座に実行
    if (video.readyState >= 3) {
      handleCanPlay();
    }

    // フォールバック: 2秒に短縮
    const fallbackTimer = setTimeout(() => {
      if (!isLoaded) {
        isLoaded = true;
        props.onVideoReady();
      }
    }, 2000);

    return () => {
      video.removeEventListener('canplaythrough', handleCanPlay);
      video.removeEventListener('loadeddata', handleCanPlay);
      clearTimeout(fallbackTimer);
    };
  }, [props.onVideoReady]);

  return (
    <motion.div 
      style={{ scale: props.videoScale }}
      className="absolute inset-0 will-change-transform"
    >
      <video
        ref={videoRef}
        src={'/movies/hero.mp4'}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />

      {/* グラデーションオーバーレイ */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent mix-blend-overlay" />
    </motion.div>
  );
};