"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Instagram, ArrowRight, Music, Users, CheckCircle } from "lucide-react";
import { useRef } from "react";

const CallToAction = () => {
  const ctaInfo = {
    title: "出演者募集中！",
    description: "龍谷大学アコギサークルの皆様、一緒に最高の奏会を作りましょう！詳細はInstagramでご確認ください。",
    instagramUrl: "https://www.instagram.com/"
  };
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });
  
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

  return (
    <section ref={containerRef} className="relative py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-white to-primary overflow-hidden">
      {/* シンプルな背景 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-tertiary/10 to-tertiary/20" />
      </div>

      <motion.div 
        style={{ scale }}
        className="relative max-w-5xl mx-auto"
      >
        {/* メインCTAカード */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
        >
          {/* ヘッダー部分 */}
          <div className="bg-gradient-to-r from-secondary to-accent p-8 md:p-12 text-white text-center">
            <Music className="w-12 h-12 mx-auto mb-4 opacity-90" />
            <h2 className="text-3xl md:text-3xl font-bold mb-4">
              {ctaInfo.title}
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              {ctaInfo.description}
            </p>
          </div>
          
          {/* コンテンツ部分 */}
          <div className="p-8 md:p-12">
            {/* 特徴リスト */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {[
                { icon: <Users className="w-4 h-4" />, text: "OBOG歓迎" },
                { icon: <Music className="w-4 h-4" />, text: "経験不問" },
                { icon: <CheckCircle className="w-4 h-4" />, text: "楽しい雰囲気" }
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-secondary">{item.icon}</span>
                  <span className="text-sm font-semibold text-gray-700">{item.text}</span>
                </div>
              ))}
            </div>
            
            {/* CTAボタン */}
            <motion.a
              href={ctaInfo.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-3 w-full px-8 py-4 bg-gradient-to-r from-secondary to-accent text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <Instagram className="w-5 h-5" />
              <span>Instagramで詳細を見る</span>
              <ArrowRight className="w-5 h-5" />
            </motion.a>
            
            {/* 補足テキスト */}
            <p className="text-center text-sm text-gray-500 mt-6">
              お気軽にDMでお問い合わせください
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CallToAction;