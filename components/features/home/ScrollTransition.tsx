"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { ReactNode } from "react";

type ScrollTransitionProps = {
  children: ReactNode;
  className?: string;
};

export const ScrollTransition = (props: ScrollTransitionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  return (
    <motion.div
      ref={containerRef}
      style={{
        y,
        opacity,
        scale,
      }}
      className={props.className}
    >
      {props.children}
    </motion.div>
  );
};