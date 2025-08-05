"use client";

import type { HeroSectionProps } from "@/domain/entities/home";
import { VideoSlider } from "@/components/ui/video-slider";
import { TypewriterEffectLines } from "@/components/ui/typewriter-effect-lines";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const HeroSection = (props: HeroSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Transform values for different scroll stages
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  const subtitleY = useTransform(scrollYProgress, [0.2, 0.5], [100, 0]);
  const subtitleOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  
  const detailsY = useTransform(scrollYProgress, [0.4, 0.7], [100, 0]);
  const detailsOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  
  const overlayOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0.5, 0.8]);

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      {/* Fixed video background */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <VideoSlider
          className="h-full"
          overlay={true}
          overlayClassName="bg-black/50"
          videos={props.videos}
          autoplay={true}
        >
          {/* Overlay with dynamic opacity */}
          <motion.div 
            className="absolute inset-0 bg-black pointer-events-none"
            style={{ opacity: overlayOpacity }}
          />
          
          {/* Content container */}
          <div className="relative z-50 flex flex-col justify-center items-center h-full w-full px-4 md:px-8 lg:px-12">
            {/* Initial title with typewriter effect */}
            <motion.div
              style={{
                y: titleY,
                opacity: titleOpacity,
              }}
              className="absolute"
            >
              <TypewriterEffectLines
                lines={props.typewriterTexts}
                className="text-white/90"
                lineClassName="text-3xl md:text-4xl lg:text-5xl font-bold"
                cursorClassName="!bg-white/90"
              />
            </motion.div>

            {/* Subtitle appearing on scroll */}
            <motion.div
              style={{
                y: subtitleY,
                opacity: subtitleOpacity,
              }}
              className="absolute text-center left-0 right-0 px-4"
            >
              <h2 className="text-white/80 text-2xl md:text-3xl lg:text-4xl font-bold mb-4 whitespace-nowrap">
                「久しぶり」から始まる音楽会
              </h2>
              <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto">
                あの頃の思い出を語りながら、
              </p>
              <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto">
                一緒に音を紡ぎましょう。
              </p>
            </motion.div>


          </div>
        </VideoSlider>
      </div>
    </div>
  );
};

export default HeroSection;