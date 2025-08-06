import { motion, MotionValue, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";

export const VideoBackground = (props: {
  videos: string[];
  videoScale: MotionValue<number>;
  onVideoChange: (index: number) => void;
  shouldLoadVideo: boolean;
  videoLoadingStage: 'loading' | 'ready';
  onVideoReady: () => void;
  preloadStrategy: {
    loadFirstOnly: boolean;
    lazyLoadRest: boolean;
  };
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedVideos, setLoadedVideos] = useState<Set<number>>(new Set());
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 動画の事前読み込み（最適化版）
  const preloadVideo = useCallback((index: number) => {
    if (!props.videos[index] || loadedVideos.has(index)) return;
    
    const video = document.createElement('video');
    video.src = props.videos[index];
    video.preload = 'auto';
    video.muted = true;
    
    video.addEventListener('canplaythrough', () => {
      setLoadedVideos(prev => {
        const newSet = new Set(prev).add(index);
        
        // 最初の動画がロードされたら非同期で親に通知
        if (index === 0) {
          setTimeout(() => {
            props.onVideoReady();
          }, 0);
        }
        
        return newSet;
      });
    }, { once: true });
    
    // メモリ効率のため非表示の動画要素として保持
    videoRefs.current[index] = video;
  }, [props.videos, loadedVideos, props.onVideoReady]);

  // 段階的な動画読み込み
  useEffect(() => {
    if (!props.shouldLoadVideo) return;
    
    // 最初の動画のみロード
    if (props.preloadStrategy.loadFirstOnly) {
      preloadVideo(0);
      
      // 残りの動画は遅延ロード
      if (props.preloadStrategy.lazyLoadRest && props.videos.length > 1) {
        const timer = setTimeout(() => {
          for (let i = 1; i < props.videos.length; i++) {
            preloadVideo(i);
          }
        }, 5000); // 5秒後に残りをロード
        
        return () => clearTimeout(timer);
      }
    } else {
      // すべて同時にロード（非推奨）
      props.videos.forEach((_, index) => preloadVideo(index));
    }
  }, [props.shouldLoadVideo, preloadVideo, props.videos, props.preloadStrategy]);

  // 動画の自動切り替え（動画数が少ないので間隔を長く）
  useEffect(() => {
    if (props.videoLoadingStage !== 'ready' || props.videos.length <= 1) return;
    
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(prev => {
          const next = (prev + 1) % props.videos.length;
          props.onVideoChange(next);
          return next;
        });
        setIsTransitioning(false);
      }, 300);
    }, 5000); // 5秒ごとに切り替え
    
    return () => clearInterval(interval);
  }, [props.videoLoadingStage, props.videos.length, props.onVideoChange]);

  return (
    <motion.div 
      style={{ scale: props.videoScale }}
      className="absolute inset-0"
    >
      <AnimatePresence mode="wait">
        {props.videoLoadingStage === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          </motion.div>
        )}

        {props.videoLoadingStage === 'ready' && props.videos[currentIndex] && (
          <motion.div
            key={`video-${currentIndex}`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: isTransitioning ? 0.8 : 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <video
              src={props.videos[currentIndex]}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
            {/* ビデオエフェクト */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent mix-blend-overlay" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};