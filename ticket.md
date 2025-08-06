HeroSection LCP最適化ガイド
🎯 目標

LCP: 2.5秒以下（現在: 4.84秒）
初期表示: 1秒以内

📊 実装した最適化
1. 動画の削減と最適化
javascript// Before: 4つの動画
videos: [hero1, hero2, hero3, hero4]

// After: 3つの動画
videos: [hero1, hero2, hero3]


1. 段階的な読み込み戦略
javascript// ステージ1: 静止画（即座に表示）
posterImage: "/movies/hero-poster.jpg"

// ステージ2: 最初の動画のみロード（1秒後）
preloadStrategy.loadFirstOnly: true

// ステージ3: 残りの動画を遅延ロード（5秒後）
preloadStrategy.lazyLoadRest: true
1. 静止画の活用

動画の最初のフレームを静止画として用意
Next.js Imageコンポーネントで最適化
priority属性で優先読み込み

4. パフォーマンスモード

パーティクル数を5→3に削減
アニメーション速度を遅く設定
will-change-transformでGPU最適化


// HeroSection/HeroUI.tsx

import { motion } from "framer-motion";
import { ChevronDown, Loader2 } from "lucide-react";

interface HeroUIProps {
  videos: string[];
  currentVideoIndex: number;
  videoLoadingStage: 'poster' | 'loading' | 'ready';
}

export const HeroUI = ({ 
  videos, 
  currentVideoIndex,
  videoLoadingStage 
}: HeroUIProps) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* ビデオプログレスインジケーター（動画準備完了後のみ表示） */}
      {videoLoadingStage === 'ready' && videos.length > 1 && (
        <VideoProgressIndicator 
          videos={videos}
          currentIndex={currentVideoIndex}
        />
      )}

      {/* 動画ロード状態の表示 */}
      {videoLoadingStage === 'loading' && (
        <LoadingIndicator />
      )}

      {/* スクロールインジケーター */}
      <ScrollIndicator />
    </div>
  );
};

// ビデオプログレスインジケーター（シンプル版）
const VideoProgressIndicator = ({ 
  videos, 
  currentIndex 
}: { 
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
      {videos.map((_, index) => (
        <div
          key={index}
          className={`h-1 flex-1 rounded-full transition-all duration-500 ${
            currentIndex === index 
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


// HeroSection/HeroOverlay.tsx

import { motion, MotionValue } from "framer-motion";

interface HeroOverlayProps {
  overlayOpacity: MotionValue<number>;
  isMobile: boolean;
  isLowPerformance?: boolean;
}

export const HeroOverlay = ({ 
  overlayOpacity, 
  isMobile,
  isLowPerformance = false 
}: HeroOverlayProps) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* グラデーションオーバーレイ */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80"
        style={{ opacity: overlayOpacity }}
      />
      
      {/* 装飾的なグラデーション（低パフォーマンスモードでは簡略化） */}
      {!isLowPerformance && (
        <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 via-transparent to-accent/20 mix-blend-overlay" />
      )}
      
      {/* パーティクル効果（デスクトップ＆高パフォーマンスのみ） */}
      {!isMobile && !isLowPerformance && <OptimizedParticleEffect />}
      
      {/* 装飾的な角フレーム（デスクトップのみ） */}
      {!isMobile && <CornerFrames />}
    </div>
  );
};

// 最適化されたパーティクルエフェクト（数を減らし、GPUアニメーション使用）
const OptimizedParticleEffect = () => (
  <div className="absolute inset-0">
    {[...Array(3)].map((_, i) => ( // 5個から3個に削減
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-white/20 rounded-full will-change-transform" // will-change追加
        animate={{
          y: [-100, window.innerHeight + 100],
        }}
        transition={{
          duration: 15 + i * 5, // 速度を遅く
          repeat: Infinity,
          ease: "linear",
          delay: i * 3,
        }}
        style={{
          left: `${20 + i * 30}%`, // 固定位置
        }}
      />
    ))}
  </div>
);

// 角フレームコンポーネント
const CornerFrames = () => (
  <>
    <div className="absolute top-12 left-12 w-20 h-20 border-t-2 border-l-2 border-white/20 rounded-tl-2xl" />
    <div className="absolute top-12 right-12 w-20 h-20 border-t-2 border-r-2 border-white/20 rounded-tr-2xl" />
    <div className="absolute bottom-12 left-12 w-20 h-20 border-b-2 border-l-2 border-white/20 rounded-bl-2xl" />
    <div className="absolute bottom-12 right-12 w-20 h-20 border-b-2 border-r-2 border-white/20 rounded-br-2xl" />
  </>
);


// HeroSection/VideoBackground.tsx

import { motion, MotionValue, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";

interface VideoBackgroundProps {
  posterImage: string;
  videos: string[];
  videoScale: MotionValue<number>;
  onVideoChange: (index: number) => void;
  shouldLoadVideo: boolean;
  videoLoadingStage: 'poster' | 'loading' | 'ready';
  onVideoReady: () => void;
  preloadStrategy: {
    initialDelay: number;
    loadFirstOnly: boolean;
    lazyLoadRest: boolean;
  };
}

export const VideoBackground = ({ 
  posterImage,
  videos, 
  videoScale, 
  onVideoChange,
  shouldLoadVideo,
  videoLoadingStage,
  onVideoReady,
  preloadStrategy
}: VideoBackgroundProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedVideos, setLoadedVideos] = useState<Set<number>>(new Set());
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 動画の事前読み込み（最適化版）
  const preloadVideo = useCallback((index: number) => {
    if (!videos[index] || loadedVideos.has(index)) return;
    
    const video = document.createElement('video');
    video.src = videos[index];
    video.preload = 'auto';
    video.muted = true;
    
    video.addEventListener('canplaythrough', () => {
      setLoadedVideos(prev => new Set(prev).add(index));
      if (index === 0) {
        onVideoReady();
      }
    }, { once: true });
    
    // メモリ効率のため非表示の動画要素として保持
    videoRefs.current[index] = video;
  }, [videos, loadedVideos, onVideoReady]);

  // 段階的な動画読み込み
  useEffect(() => {
    if (!shouldLoadVideo) return;
    
    // 最初の動画のみロード
    if (preloadStrategy.loadFirstOnly) {
      preloadVideo(0);
      
      // 残りの動画は遅延ロード
      if (preloadStrategy.lazyLoadRest && videos.length > 1) {
        const timer = setTimeout(() => {
          for (let i = 1; i < videos.length; i++) {
            preloadVideo(i);
          }
        }, 5000); // 5秒後に残りをロード
        
        return () => clearTimeout(timer);
      }
    } else {
      // すべて同時にロード（非推奨）
      videos.forEach((_, index) => preloadVideo(index));
    }
  }, [shouldLoadVideo, preloadVideo, videos, preloadStrategy]);

  // 動画の自動切り替え（動画数が少ないので間隔を長く）
  useEffect(() => {
    if (videoLoadingStage !== 'ready' || videos.length <= 1) return;
    
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(prev => {
          const next = (prev + 1) % videos.length;
          onVideoChange(next);
          return next;
        });
        setIsTransitioning(false);
      }, 300);
    }, 8000); // 8秒ごとに切り替え（長めに設定）
    
    return () => clearInterval(interval);
  }, [videoLoadingStage, videos.length, onVideoChange]);

  return (
    <motion.div 
      style={{ scale: videoScale }}
      className="absolute inset-0"
    >
      <AnimatePresence mode="wait">
        {/* ステージ1: 静止画（最速表示） */}
        {videoLoadingStage === 'poster' && (
          <motion.div
            key="poster"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={posterImage}
              alt="Hero background"
              fill
              priority
              quality={90}
              className="object-cover"
              sizes="100vw"
            />
            {/* 軽量なアニメーション効果 */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/50" />
          </motion.div>
        )}

        {/* ステージ2: ローディング表示 */}
        {videoLoadingStage === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <Image
              src={posterImage}
              alt="Hero background"
              fill
              priority
              quality={90}
              className="object-cover filter blur-sm"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          </motion.div>
        )}

        {/* ステージ3: 動画再生 */}
        {videoLoadingStage === 'ready' && videos[currentIndex] && (
          <motion.div
            key={`video-${currentIndex}`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: isTransitioning ? 0.8 : 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <video
              src={videos[currentIndex]}
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

"use client";

import { VideoBackground } from "./HeroSection/VideoBackground";
import { HeroContent } from "./HeroSection/HeroContent";
import { HeroOverlay } from "./HeroSection/HeroOverlay";
import { HeroUI } from "./HeroSection/HeroUI";
import { useHeroAnimation } from "./HeroSection/useHeroAnimation";
import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Music } from "lucide-react";

// パフォーマンス最適化：動画3つに削減、初期は静止画
const HERO_DATA = {
  // 初期表示用の静止画（動画の最初のフレーム）
  posterImage: "/movies/hero-poster.jpg",
  
  // 動画は3つに削減（ファイルサイズも要最適化）
  videos: [
    "/movies/hero1.webm",
    "/movies/hero2.webm"
    "/movies/hero3.webm"
  ],
  
  // プリロード設定
  preloadStrategy: {
    initialDelay: 1000,     // 1秒後に動画ロード開始
    loadFirstOnly: true,    // 最初は1つだけロード
    lazyLoadRest: true      // 残りは遅延ロード
  },
  
  typewriterTexts: [
    "龍谷大学",
    "アコギサークル",
    "OBOG演奏会 2025"
  ],
  
  eventDetails: {
    date: "2025年10月12日(日)",
    venue: "Second Rooms",
    time: "14:00開演"
  },
  
  messages: {
    main: "「久しぶり」から始まる",
    sub: "音楽会",
    description: [
      "あの頃の思い出を語りながら、",
      "一緒に音を紡ぎましょう。"
    ]
  }
};

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [videoLoadingStage, setVideoLoadingStage] = useState<'poster' | 'loading' | 'ready'>('poster');

  // カスタムフックでアニメーション管理
  const animations = useHeroAnimation(containerRef);

  // パフォーマンス最適化：段階的な動画ロード
  useEffect(() => {
    // ステップ1: 初期表示（静止画のみ）
    setIsLoaded(true);
    
    // ステップ2: 少し遅延して最初の動画をロード
    const timer = setTimeout(() => {
      setShouldLoadVideo(true);
      setVideoLoadingStage('loading');
    }, HERO_DATA.preloadStrategy.initialDelay);
    
    return () => clearTimeout(timer);
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
          posterImage={HERO_DATA.posterImage}
          videos={HERO_DATA.videos}
          videoScale={animations.videoScale}
          onVideoChange={setCurrentVideoIndex}
          shouldLoadVideo={shouldLoadVideo}
          videoLoadingStage={videoLoadingStage}
          onVideoReady={handleVideoReady}
          preloadStrategy={HERO_DATA.preloadStrategy}
        />

        {/* オーバーレイエフェクト */}
        <HeroOverlay 
          overlayOpacity={animations.overlayOpacity}
          isMobile={animations.isMobile}
          isLowPerformance={videoLoadingStage === 'poster'}
        />

        {/* メインコンテンツ */}
        <HeroContent
          data={HERO_DATA}
          animations={animations}
          isLoaded={isLoaded}
        />

        {/* UI要素（動画数に応じて調整） */}
        <HeroUI
          videos={HERO_DATA.videos}
          currentVideoIndex={currentVideoIndex}
          videoLoadingStage={videoLoadingStage}
        />
      </div>
    </div>
  );
};

// 軽量なローディング画面
const LoadingScreen = ({ isLoaded }: { isLoaded: boolean }) => (
  <AnimatePresence>
    {!isLoaded && (
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