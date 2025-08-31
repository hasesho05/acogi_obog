import { motion } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import { MotionValue } from "framer-motion";

export const VideoBackground = (props: {
  videoScale: MotionValue<number>;
  isVideoReady: boolean;
  onVideoReady: () => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [needsFallback, setNeedsFallback] = useState(false);

  // 自動再生を試行する関数
  const tryAutoPlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;
    
    try {
      // 自動再生判定を有利にするため、muted を src 設定前に true に設定
      video.muted = true;
      await video.play();
      setNeedsFallback(false);
    } catch (error) {
      // NotAllowedError など自動再生失敗時はフォールバック UI 表示
      setNeedsFallback(true);
    }
  }, []);

  // ユーザージェスチャによる再生
  const handleUserPlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;
    
    try {
      await video.play();
      setNeedsFallback(false);
    } catch (error) {
      // ユーザー操作でも失敗した場合はフォールバック表示を維持
      setNeedsFallback(true);
    }
  }, []);

  // 動画のロードと準備完了の通知（最適化）
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isNotified = false;
    
    const handleReady = () => {
      if (!isNotified) {
        isNotified = true;
        props.onVideoReady();
      }
    };

    // 複数のイベントをリッスンして確実性を向上
    video.addEventListener('canplaythrough', handleReady);
    video.addEventListener('loadeddata', handleReady);
    
    // 再生状態変更時のハンドリング
    const handlePlayStateChange = () => {
      if (video.paused && !video.ended) {
        setNeedsFallback(true);
      }
    };

    // 再生開始時のハンドリング
    const handlePlayStart = () => {
      setNeedsFallback(false);
    };
    
    video.addEventListener('play', handlePlayStart);
    video.addEventListener('playing', handlePlayStart);
    video.addEventListener('pause', handlePlayStateChange);
    video.addEventListener('suspend', handlePlayStateChange);
    video.addEventListener('error', handlePlayStateChange);

    // 既に再生可能な状態の場合は即座に実行
    if (video.readyState >= 3) {
      handleReady();
    }

    // 初回自動再生を試行
    tryAutoPlay();

    // フォールバック: 2秒に短縮
    const fallbackTimer = setTimeout(() => {
      if (!isNotified) {
        isNotified = true;
        props.onVideoReady();
      }
    }, 2000);

    return () => {
      video.removeEventListener('canplaythrough', handleReady);
      video.removeEventListener('loadeddata', handleReady);
      video.removeEventListener('play', handlePlayStart);
      video.removeEventListener('playing', handlePlayStart);
      video.removeEventListener('pause', handlePlayStateChange);
      video.removeEventListener('suspend', handlePlayStateChange);
      video.removeEventListener('error', handlePlayStateChange);
      clearTimeout(fallbackTimer);
    };
  }, [props.onVideoReady, tryAutoPlay]);

  return (
    <motion.div 
      style={{ scale: props.videoScale }}
      className="absolute inset-0 will-change-transform"
    >
      <video
        data-testid="hero-video"
        ref={videoRef}
        src={'/movies/hero.mp4'}
        className="absolute inset-0 w-full h-full object-cover"
        poster="/images/hero_poster.jpg"
        preload="none"
        muted
        playsInline
        loop
        autoPlay
        disablePictureInPicture
        // @ts-ignore - iOS Safari 対策
        webkit-playsinline="true"
      />

      {/* 合成コスト低い半透明オーバーレイ（mix-blend-overlay 撤去） */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      
      {/* フォールバック再生ボタン */}
      {needsFallback && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            data-testid="hero-play-btn"
            onClick={handleUserPlay}
            className="pointer-events-auto h-16 w-16 rounded-full bg-white/90 hover:bg-white/95 transition-all duration-200 flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105"
            aria-label="動画を再生"
          >
            <svg className="w-6 h-6 text-black/80 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
        </div>
      )}
    </motion.div>
  );
};