import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { MotionValue } from "framer-motion";

export const VideoBackground = (props: {
  videoScale: MotionValue<number>;
  isVideoReady: boolean;
  onVideoReady: () => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // 動画のロードと準備完了の通知
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      props.onVideoReady();
    };

    // canplaythroughイベントを使用
    video.addEventListener('canplaythrough', handleCanPlay);

    // フォールバック: 3秒後に強制的に準備完了とする
    const fallbackTimer = setTimeout(() => {
      props.onVideoReady();
    }, 3000);

    return () => {
      video.removeEventListener('canplaythrough', handleCanPlay);
      clearTimeout(fallbackTimer);
    };
  }, [props.onVideoReady]);

  return (
    <motion.div 
      style={{ scale: props.videoScale }}
      className="absolute inset-0"
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