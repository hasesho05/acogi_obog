"use client";

import type { CallToActionProps } from "@/domain/entities/home";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

const CallToAction = (props: CallToActionProps) => {
  return (
    <section className="py-6 px-4 md:px-8 bg-gradient-to-br from-primary to-tertiary relative overflow-hidden">
      {/* 装飾的背景 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-[1000px] mx-auto">
        {/* セクションヘッダー */}
        <div
          className="text-center mb-4"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
            {props.title}
          </h2>
        </div>

        {/* CTAカード */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl py-12 px-8 shadow-2xl border border-white/20 text-center"
        >
          <p className="text-lg md:text-xl text-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
            {props.description}
          </p>
          
          <a
            href={props.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-accent to-secondary text-white rounded-2xl hover:from-accent/90 hover:to-secondary/90 transition-all duration-300 font-bold shadow-lg"
          >
            <Instagram className="w-6 h-6 mr-3" />
            Instagramで詳細を見る
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;