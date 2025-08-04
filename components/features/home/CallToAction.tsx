"use client";

import type { CallToActionProps } from "@/domain/entities/home";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

const CallToAction = (props: CallToActionProps) => {
  return (
    <section className="py-20 px-4 md:px-8 bg-[#6a8359]">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
          {props.title}
        </h2>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          {props.description}
        </p>
        
        <motion.a
          href={props.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-8 py-4 bg-white text-[#6a8359] rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Instagram className="w-6 h-6 mr-3" />
          Instagramで詳細を見る
        </motion.a>
      </motion.div>
    </section>
  );
};

export default CallToAction;