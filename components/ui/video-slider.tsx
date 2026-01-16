"use client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import React, { useEffect, useState } from "react";

export const VideoSlider = ({
  videos,
  children,
  overlay = true,
  overlayClassName,
  className,
  autoplay = true,
}: {
  videos: string[];
  children: React.ReactNode;
  overlay?: boolean;
  overlayClassName?: string;
  className?: string;
  autoplay?: boolean;

}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === videos.length ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoplay) {
      interval = setInterval(() => {
        handleNext();
      }, 5000); // 5秒ごとに切り替え
    }

    return () => {
      clearInterval(interval);
    };
  }, [autoplay, videos.length]);

  return (
    <div
      className={cn(
        "overflow-hidden h-full w-full relative flex items-center justify-center",
        className
      )}
    >
      <AnimatePresence mode="wait">
        <motion.video
          key={currentIndex}
          src={videos[currentIndex]}
          initial="initial"
          animate="visible"
          exit="exit"
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
        />
      </AnimatePresence>
      
      {overlay && (
        <div
          className={cn("absolute inset-0 bg-black/60 z-10", overlayClassName)}
        />
      )}
      
      <div className="relative z-20 w-full h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};