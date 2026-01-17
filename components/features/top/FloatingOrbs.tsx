"use client";

import { useEffect, useState } from "react";

// モバイル判定フック
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const hasTouchScreen =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768;
    setIsMobile(hasTouchScreen && isSmallScreen);
  }, []);

  return isMobile;
};

// パフォーマンス最適化: モバイルでは非表示、デスクトップでもCSS animationに変更
const FloatingOrbs = () => {
  const isMobile = useIsMobile();

  // モバイル: 完全に非表示（GPU負荷を完全カット）
  if (isMobile) {
    return null;
  }

  // デスクトップ: CSSアニメーションベースで軽量化（7→3オーブ、SVGパスアニメ削除）
  return (
    <div className="fixed inset-0 -z-5 overflow-hidden pointer-events-none">
      {/* オーブ1 */}
      <div
        className="absolute rounded-full animate-orb-float-1"
        style={{
          width: 150,
          height: 150,
          left: "15%",
          top: "25%",
          background: "radial-gradient(circle at 30% 30%, var(--color-secondary), transparent 70%)",
          filter: "blur(50px)",
          opacity: 0.12,
        }}
      />

      {/* オーブ2 */}
      <div
        className="absolute rounded-full animate-orb-float-2"
        style={{
          width: 120,
          height: 120,
          left: "70%",
          top: "60%",
          background: "radial-gradient(circle at 30% 30%, var(--color-green), transparent 70%)",
          filter: "blur(45px)",
          opacity: 0.1,
        }}
      />

      {/* オーブ3 */}
      <div
        className="absolute rounded-full animate-orb-float-3"
        style={{
          width: 100,
          height: 100,
          left: "45%",
          top: "75%",
          background: "radial-gradient(circle at 30% 30%, var(--color-accent), transparent 70%)",
          filter: "blur(40px)",
          opacity: 0.08,
        }}
      />

      <style jsx>{`
        @keyframes orb-float-1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -15px); }
        }

        @keyframes orb-float-2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-15px, 10px); }
        }

        @keyframes orb-float-3 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(10px, -10px); }
        }

        .animate-orb-float-1 {
          animation: orb-float-1 25s ease-in-out infinite;
        }

        .animate-orb-float-2 {
          animation: orb-float-2 30s ease-in-out infinite;
        }

        .animate-orb-float-3 {
          animation: orb-float-3 20s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-orb-float-1,
          .animate-orb-float-2,
          .animate-orb-float-3 {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingOrbs;
