import { useScroll, useTransform } from "framer-motion";
import { RefObject, useEffect, useState } from "react";

export const useHeroAnimation = (containerRef: RefObject<HTMLDivElement | null>) => {
  const [isMobile, setIsMobile] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // モバイル判定
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // アニメーション値の定義
  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  
  const subtitleY = useTransform(scrollYProgress, [0.3, 0.8], [100, -50]);
  const subtitleOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.8], [0, 1, 0]);
  const subtitleScale = useTransform(scrollYProgress, [0.3, 0.5, 0.8], [0.8, 1, 0.9]);
  
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0.5, 1]);

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