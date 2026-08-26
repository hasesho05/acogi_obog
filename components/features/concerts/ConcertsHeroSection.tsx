"use client";

import { Library, Music } from "lucide-react";
import PageHero from "@/components/features/shared/PageHero";

const ConcertsHeroSection = () => {
  return <PageHero label="龍谷大学アコースティックギターサークル" title="CONCERTS" subtitle="音が紡いできた、10年のものがたり" description="これまでの演奏会の記録と、これからの予定をまとめたアーカイブです。" icon={Library} subIcon={Music} />;
};

export default ConcertsHeroSection;
