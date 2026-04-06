"use client";

import dynamic from "next/dynamic";
import ConcertsHeroSection from "@/components/features/concerts/ConcertsHeroSection";

const ConcertsArchiveList = dynamic(
  () => import("@/components/features/concerts/ConcertsArchiveList"),
  { ssr: false },
);

const ConcertsPage = () => {
  return (
    <main className="relative min-h-screen bg-primary">
      <ConcertsHeroSection />
      <ConcertsArchiveList />
    </main>
  );
};

export default ConcertsPage;
