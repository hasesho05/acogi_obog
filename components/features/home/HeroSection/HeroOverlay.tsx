import { motion, MotionValue } from "framer-motion";

export const HeroOverlay = (props: {
  overlayOpacity: MotionValue<number>;
  isMobile: boolean;
  isLowPerformance?: boolean;
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* グラデーションオーバーレイ */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80"
        style={{ opacity: props.overlayOpacity }}
      />
      
      {/* 装飾的なグラデーション（低パフォーマンスモードでは簡略化） */}
      {!props.isLowPerformance && (
        <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 via-transparent to-accent/20 mix-blend-overlay" />
      )}
      
      {/* パーティクル効果（デスクトップ＆高パフォーマンスのみ） */}
      {!props.isMobile && !props.isLowPerformance && <OptimizedParticleEffect />}
      
      {/* 装飾的な角フレーム（デスクトップのみ） */}
      {!props.isMobile && <CornerFrames />}
    </div>
  );
};

// 最適化されたパーティクルエフェクト（数を減らし、GPUアニメーション使用）
const OptimizedParticleEffect = () => (
  <div className="absolute inset-0">
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-white/20 rounded-full will-change-transform"
        animate={{
          y: [-100, typeof window !== 'undefined' ? window.innerHeight + 100 : 800],
        }}
        transition={{
          duration: 15 + i * 5,
          repeat: Infinity,
          ease: "linear",
          delay: i * 3,
        }}
        style={{
          left: `${20 + i * 30}%`,
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