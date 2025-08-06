"use client";

import { VideoBackground } from "./HeroSection/VideoBackground";
import { HeroContent } from "./HeroSection/HeroContent";
import { HeroOverlay } from "./HeroSection/HeroOverlay";
import { HeroUI } from "./HeroSection/HeroUI";
import { useHeroAnimation } from "./HeroSection/useHeroAnimation";
import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const videos = [
  "/movies/hero1.webm",
  "/movies/hero2.webm",
  "/movies/hero3.webm"
];

const preloadStrategy = {
  loadFirstOnly: true,
  lazyLoadRest: true
};

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [videoLoadingStage, setVideoLoadingStage] = useState<'loading' | 'ready'>('loading');

  // カスタムフックでアニメーション管理
  const animations = useHeroAnimation(containerRef);

  // 動画ロードを開始
  useEffect(() => {
    setIsLoaded(true);
    setShouldLoadVideo(true);
  }, []);

  // 動画準備完了のハンドラー
  const handleVideoReady = () => {
    setVideoLoadingStage('ready');
  };

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      {/* ローディング画面（軽量版） */}
      <LoadingScreen isLoaded={isLoaded} />

      {/* メインコンテンツ */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* 背景（初期は静止画、その後動画） */}
        <VideoBackground
          videos={videos}
          videoScale={animations.videoScale}
          onVideoChange={setCurrentVideoIndex}
          shouldLoadVideo={shouldLoadVideo}
          videoLoadingStage={videoLoadingStage}
          onVideoReady={handleVideoReady}
          preloadStrategy={preloadStrategy}
        />

        {/* オーバーレイエフェクト */}
        <HeroOverlay 
          overlayOpacity={animations.overlayOpacity}
          isMobile={animations.isMobile}
          isLowPerformance={videoLoadingStage === 'loading'}
        />

        {/* メインコンテンツ */}
        <HeroContent
          animations={animations}
          isLoaded={isLoaded}
        />

        {/* UI要素（動画数に応じて調整） */}
        <HeroUI
          videos={videos}
          currentVideoIndex={currentVideoIndex}
          videoLoadingStage={videoLoadingStage}
        />
      </div>
    </div>
  );
};

// 軽量なローディング画面
const LoadingScreen = (props: { isLoaded: boolean }) => (
  <AnimatePresence>
    {!props.isLoaded && (
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] bg-dark flex items-center justify-center"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-secondary/20 border-t-secondary rounded-full animate-spin" />
          <span className="text-secondary/60 text-sm">Loading...</span>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default HeroSection;