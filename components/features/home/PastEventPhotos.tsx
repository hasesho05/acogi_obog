"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Camera, Users, Heart, Loader2 } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import OptimizedGallery from "@/components/ui/optimized-gallery";


const PastEventPhotos = () => {
  const title = "昨年の演奏会の様子";
  const containerRef = useRef<HTMLDivElement>(null);
  const [isGalleryInView, setIsGalleryInView] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.9]);

  // ギャラリーセクションの表示判定
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsGalleryInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px',
        threshold: 0.01
      }
    );

    const gallerySection = document.getElementById('gallery-section');
    if (gallerySection) {
      observer.observe(gallerySection);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const images = Array.from({ length: 22 }, (_, i) => `/images/image${i + 1}.jpg`);

  return (
    <section ref={containerRef} className="relative py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-primary to-white overflow-hidden">
      {/* シンプルな背景 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-tertiary/10 via-transparent to-transparent" />
      </div>

      <motion.div 
        style={{ opacity }}
        className="relative max-w-5xl mx-auto"
      >
        {/* セクションヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-3xl font-bold text-dark mb-4">
            {title}
          </h2>
          <div className="w-12 h-1 bg-secondary mx-auto rounded-full mb-6" />
          <p className="text-gray-600 max-w-2xl mx-auto">
            笑顔と音楽があふれた素敵な時間。今年も新たな思い出を一緒に作りましょう。
          </p>
        </motion.div>

        {/* フォトギャラリー */}
        <motion.div
          id="gallery-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {isGalleryInView ? (
              <OptimizedGallery images={images} />
            ) : (
              <div className="h-96 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
              </div>
            )}
          </div>
        </motion.div>

        {/* 統計情報 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-3 gap-6 max-w-xl mx-auto"
        >
          {[
            { icon: <Camera className="w-5 h-5" />, value: "100+", label: "写真" },
            { icon: <Users className="w-5 h-5" />, value: "50+", label: "参加者" },
            { icon: <Heart className="w-5 h-5" />, value: "∞", label: "思い出" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl p-6 text-center border border-gray-100 shadow-md"
            >
              <div className="inline-flex p-2 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-lg text-secondary mb-3">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-dark">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PastEventPhotos;