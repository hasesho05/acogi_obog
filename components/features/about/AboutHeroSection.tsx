"use client";

import { Guitar, Music } from "lucide-react";
import PageHero from "@/components/features/shared/PageHero";

const AboutHeroSection = () => {
  return <PageHero label="龍谷大学アコースティックギターサークル" title="ABOUT US" subtitle="卒業しても、また弾きたくなったら" description="年に一度、みんなで集まってギターを弾く。それだけの、でも特別な時間。" icon={Music} subIcon={Guitar} />;
};

export default AboutHeroSection;
