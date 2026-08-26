"use client";

import dynamic from "next/dynamic";
import HeroSection from "@/components/features/top/HeroSection";
import ConcertSection from "@/components/features/top/ConcertSection";
import SocialSection from "@/components/features/top/SocialSection";

// bundle-dynamic-imports: 重いアニメーションコンポーネントは遅延ロード
// SSR無効化でハイドレーション後に描画（初期ロード高速化）
const AuroraBackground = dynamic(
  () => import("@/components/features/top/AuroraBackground"),
  { ssr: false }
);

const HomePage = () => {
  return (
    <main className="relative min-h-screen">
      {/* 動く背景レイヤー */}
      <AuroraBackground />

      {/* メインコンテンツ */}
      <HeroSection />
      <ConcertSection />
      <SocialSection />
    </main>
  );
};

export default HomePage;
