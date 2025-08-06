import { useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { RefObject, useEffect, useState } from "react";

export const useHeroAnimation = (containerRef: RefObject<HTMLDivElement | null>) => {
  const [isMobile, setIsMobile] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // スクロールベースのアニメーション値
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -150]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  
  const subtitleY = useTransform(scrollYProgress, [0.15, 0.45], [100, 0]);
  const subtitleOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);
  const subtitleScale = useTransform(scrollYProgress, [0.15, 0.45], [0.9, 1]);
  
  const detailsY = useTransform(scrollYProgress, [0.35, 0.65], [100, 0]);
  const detailsOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
  
  const ctaY = useTransform(scrollYProgress, [0.55, 0.75], [50, 0]);
  const ctaOpacity = useTransform(scrollYProgress, [0.55, 0.7], [0, 1]);
  
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0.5, 0.85]);
  const videoScale = useTransform(scrollYProgress, [0, 0.8], [1, 1.1]);

  // マウス追従エフェクト
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  const springXHalf = useTransform(springX, x => x * 0.5);

  // モバイル判定
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // マウス追従（デスクトップのみ）
  useEffect(() => {
    if (isMobile) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        mouseX.set((e.clientX - rect.left - rect.width / 2) / rect.width * 20);
        mouseY.set((e.clientY - rect.top - rect.height / 2) / rect.height * 20);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, isMobile, containerRef]);

  return {
    // スクロールアニメーション
    titleY,
    titleOpacity,
    titleScale,
    subtitleY,
    subtitleOpacity,
    subtitleScale,
    detailsY,
    detailsOpacity,
    ctaY,
    ctaOpacity,
    overlayOpacity,
    videoScale,
    
    // マウス追従
    springX,
    springY,
    springXHalf,
    
    // 状態
    isMobile,
    scrollYProgress
  };
};