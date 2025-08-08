import { useScroll, useTransform } from "framer-motion";
import { RefObject, useEffect, useState } from "react";

export const useHeroAnimation = (containerRef: React.RefObject<HTMLDivElement | null>) => {
  const [isMobile, setIsMobile] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    
    // デバウンス処理で最適化
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 150);
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // タイミング調整: サブタイトルが表示された後、しばらく維持
  // タイトルセクション: 0-30%でフェードアウト
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -100], { clamp: true });
  const titleOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0], { clamp: true });
  const titleScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8], { clamp: true });
  
  // サブタイトルセクション: 25-60%で表示、60-85%で維持、85-95%でフェードアウト
  const subtitleY = useTransform(scrollYProgress, [0.25, 0.6, 0.85, 0.95], [100, 0, 0, -50], { clamp: true });
  const subtitleOpacity = useTransform(scrollYProgress, [0.25, 0.6, 0.90, 0.98], [0, 1, 1, 0], { clamp: true });
  const subtitleScale = useTransform(scrollYProgress, [0.25, 0.6, 0.90, 0.98], [0.8, 1, 1, 0.9], { clamp: true });
  
  // ビデオは最後までゆっくりズーム
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15], { clamp: true });
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.95], [0.3, 0.8], { clamp: true });

  return {
    isMobile,
    titleY,
    titleOpacity,
    titleScale,
    subtitleY,
    subtitleOpacity,
    subtitleScale,
    videoScale,
    overlayOpacity,
  };
};
