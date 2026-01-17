import AuroraBackground from "@/components/features/top/AuroraBackground";
import FallingLeaves from "@/components/features/top/FallingLeaves";
import FloatingOrbs from "@/components/features/top/FloatingOrbs";
import HeroSection from "@/components/features/top/HeroSection";
import ConcertSection from "@/components/features/top/ConcertSection";
import SocialSection from "@/components/features/top/SocialSection";

const HomePage = () => {
  return (
    <main className="relative min-h-screen">
      {/* 初回ロード時の木の葉アニメーション */}
      <FallingLeaves leafCount={30} playOnce />

      {/* 動く背景レイヤー */}
      <AuroraBackground />
      <FloatingOrbs />

      {/* メインコンテンツ */}
      <HeroSection />
      <ConcertSection />
      <SocialSection />
    </main>
  );
};

export default HomePage;
