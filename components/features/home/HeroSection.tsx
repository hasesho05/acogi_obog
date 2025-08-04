"use client";

import type { HeroSectionProps } from "@/domain/entities/home";
import { VideoSlider } from "@/components/ui/video-slider";
import { TypewriterEffectLines } from "@/components/ui/typewriter-effect-lines";
import { motion } from "framer-motion";

const HeroSection = (props: HeroSectionProps) => {
  return (
    <VideoSlider
      className="h-screen"
      overlay={true}
      overlayClassName="bg-black/50"
      videos={props.videos}
      autoplay={true}
      direction="up"
    >
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <TypewriterEffectLines
          lines={props.typewriterTexts}
          className="text-[#9f8f7c]"
          lineClassName="text-2xl md:text-2xl lg:text-3xl font-bold"
          cursorClassName="!bg-white"
        />
      </motion.div>
    </VideoSlider>
  );
};

export default HeroSection;