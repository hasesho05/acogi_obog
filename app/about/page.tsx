"use client";

import dynamic from "next/dynamic";
import AboutHeroSection from "@/components/features/about/AboutHeroSection";

// 重いコンポーネントは遅延ロード
const AboutStorySection = dynamic(
  () => import("@/components/features/about/AboutStorySection"),
  { ssr: false }
);

const AboutMissionSection = dynamic(
  () => import("@/components/features/about/AboutMissionSection"),
  { ssr: false }
);

const AboutMembersSection = dynamic(
  () => import("@/components/features/about/AboutMembersSection"),
  { ssr: false }
);

const AboutPage = () => {
  return (
    <main className="relative min-h-screen bg-primary">
      <AboutHeroSection />
      <AboutStorySection />
      <AboutMissionSection />
      <AboutMembersSection />
    </main>
  );
};

export default AboutPage;
