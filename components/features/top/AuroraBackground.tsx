"use client";

import { useEffect, useState } from "react";

// モバイル判定フック（タッチデバイス検出）
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // タッチデバイスかつ画面幅768px以下をモバイルとみなす
    const checkMobile = () => {
      const hasTouchScreen =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(hasTouchScreen && isSmallScreen);
    };

    checkMobile();
    // リサイズ時は再チェックしない（初期判定のみでパフォーマンス維持）
  }, []);

  return isMobile;
};

// パフォーマンス最適化: モバイルでは静的背景、デスクトップのみアニメーション
const AuroraBackground = () => {
  const isMobile = useIsMobile();

  // モバイル向け: 軽量な静的グラデーション背景
  if (isMobile) {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* ベースグラデーション */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-tertiary to-primary" />

        {/* 静的なオーロラ風グラデーション（blur無し、アニメーション無し） */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 80% 60% at 20% 30%, rgba(212, 80, 44, 0.2) 0%, transparent 60%),
              radial-gradient(ellipse 70% 50% at 80% 20%, rgba(45, 106, 79, 0.15) 0%, transparent 55%),
              radial-gradient(ellipse 60% 70% at 40% 80%, rgba(224, 117, 72, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse 50% 50% at 70% 60%, rgba(64, 145, 108, 0.12) 0%, transparent 50%)
            `,
          }}
        />
      </div>
    );
  }

  // デスクトップ向け: フルアニメーション
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* ベースグラデーション */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-tertiary to-primary" />

      {/* オーロラレイヤー - デスクトップのみ3つに削減（5→3） */}
      <div className="absolute inset-0 animate-fade-in" style={{ animationDelay: "0s" }}>
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-25 blur-[80px]"
          style={{
            background: "radial-gradient(circle, var(--color-secondary) 0%, transparent 70%)",
            animation: "aurora-drift-1 30s ease-in-out infinite",
          }}
        />
      </div>

      <div className="absolute inset-0 animate-fade-in" style={{ animationDelay: "0.5s" }}>
        <div
          className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full opacity-20 blur-[70px]"
          style={{
            background: "radial-gradient(circle, var(--color-green) 0%, transparent 70%)",
            animation: "aurora-drift-2 35s ease-in-out infinite",
          }}
        />
      </div>

      <div className="absolute inset-0 animate-fade-in" style={{ animationDelay: "1s" }}>
        <div
          className="absolute top-1/2 right-1/4 w-[450px] h-[450px] rounded-full opacity-15 blur-[60px]"
          style={{
            background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
            animation: "aurora-drift-3 25s ease-in-out infinite",
          }}
        />
      </div>

      {/* メッシュグラデーションオーバーレイ */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 20% 30%, rgba(212, 80, 44, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(45, 106, 79, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 40% 80%, rgba(224, 117, 72, 0.12) 0%, transparent 50%)
          `,
        }}
      />

      {/* アニメーション定義 - 簡略化 */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-fade-in {
          animation: fade-in 2s ease-out forwards;
          opacity: 0;
        }

        @keyframes aurora-drift-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(50px, 30px) scale(1.05); }
        }

        @keyframes aurora-drift-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, -30px) scale(1.03); }
        }

        @keyframes aurora-drift-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -20px) scale(1.02); }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in > div {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AuroraBackground;
