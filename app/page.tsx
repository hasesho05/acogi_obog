"use client";

import HeroSection from "@/components/features/top/HeroSection";
import ConcertSection from "@/components/features/top/ConcertSection";
import SocialSection from "@/components/features/top/SocialSection";

const HomePage = () => {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <HeroSection />
      <ConcertSection />
      <SocialSection />
    </main>
  );
};

export default HomePage;
