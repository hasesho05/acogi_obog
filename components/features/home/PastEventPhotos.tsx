"use client";

import type { PastEventPhotosProps } from "@/domain/entities/home";
import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import { motion } from "framer-motion";

const PastEventPhotos = (props: PastEventPhotosProps) => {
  return (
    <section className="py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-12 text-center text-[#9f8f7c]"
        >
          {props.title}
        </motion.h2>
        
        <ParallaxScroll images={props.images} className="mt-12" />
      </div>
    </section>
  );
};

export default PastEventPhotos;