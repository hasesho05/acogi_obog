"use client";

import type { PastEventPhotosProps } from "@/domain/entities/home";
import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import { motion } from "framer-motion";

const PastEventPhotos = (props: PastEventPhotosProps) => {
  return (
    <section className="py-6 px-4 md:px-8 bg-gradient-to-br from-primary to-tertiary relative overflow-hidden">
      {/* 装飾的背景 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-[1000px] mx-auto">
        {/* セクションヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
            {props.title}
          </h2>
        </motion.div>
        
        {/* 写真ギャラリー */}
        <div
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-2 shadow-2xl border border-white/20"
        >
          <ParallaxScroll images={props.images} className="mt-4" />
        </div>
      </div>
    </section>
  );
};

export default PastEventPhotos;