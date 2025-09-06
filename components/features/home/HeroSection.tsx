"use client";

import { VideoBackground } from "./HeroSection/VideoBackground";
import { HeroContent } from "./HeroSection/HeroContent";
import { HeroOverlay } from "./HeroSection/HeroOverlay";
import { HeroUI } from "./HeroSection/HeroUI";
import { useHeroAnimation } from "./HeroSection/useHeroAnimation";
import { useRef, useState, useEffect, useCallback, memo } from "react";
import { LoadingScreen } from "./HeroSection/LoadingScreen";

const HeroSection = memo(() => {
  console.log("Rendering HeroSection");
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  // カスタムフックでアニメーション管理
  const animations = useHeroAnimation(containerRef);

  // 初期ロード
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // 動画準備完了のハンドラー
  const handleVideoReady = useCallback(() => {
    setIsVideoReady(true);
  }, []);

  return (
    <div ref={containerRef} className="relative h-[300vh] hero-scroll-container">
      {/* ローディング画面 */}
      <LoadingScreen isLoaded={isLoaded} />

      {/* メインコンテンツ */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* 背景動画 */}
        <VideoBackground
          videoScale={animations.videoScale}
          isVideoReady={isVideoReady}
          onVideoReady={handleVideoReady}
        />

        {/* オーバーレイエフェクト */}
        <HeroOverlay 
          overlayOpacity={animations.overlayOpacity}
          isMobile={animations.isMobile}
        />

        {/* メインコンテンツ - 最適化版 */}
        <HeroContent
          animations={animations}
          isLoaded={isLoaded}
        />

        {/* UI要素 */}
        <HeroUI
          isVideoReady={isVideoReady}
        />
      </div>
    </div>
  );
});


export default HeroSection;