"use client";

import { Camera, Users, Heart, Loader2, LucideIcon } from "lucide-react";
import { useState, useEffect } from "react";
import OptimizedGallery from "@/components/ui/optimized-gallery";
import SectionHeader from "../../ui/section-header";

interface Stat {
  icon: React.ReactElement<LucideIcon>;
  value: string;
  label: string;
}

interface PastEventPhotosClientProps {
  title: string;
  images: string[];
  stats: Stat[];
}

const PastEventPhotosClient = ({ title, images, stats }: PastEventPhotosClientProps) => {
  const [isGalleryInView, setIsGalleryInView] = useState(false);

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

  return (
    <section id="photos" className="max-w-3xl mx-auto relative mt-8 px-4 md:px-8 bg-gradient-to-b from-primary to-white overflow-hidden">
      {/* シンプルな背景 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-tertiary/10 via-transparent to-transparent" />
      </div>

      <div className="relative max-w-5xl mx-auto">
          <SectionHeader
            icon={<Camera className="w-4 h-4" />}
            title={title}
            subtitle="PAST EVENT PHOTOS"
          />
          
        {/* フォトギャラリー */}
        <div
          id="gallery-section"
          className="relative fade-in-up animation-delay-200"
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
        </div>

        {/* 統計情報 */}
        <div className="mt-12 grid grid-cols-3 gap-6 max-w-xl mx-auto fade-in-up animation-delay-400">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 text-center border border-gray-100 shadow-md transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="inline-flex p-2 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-lg text-secondary mb-3">
                {stat.icon}
              </div>
              <div className="text-lg md:text-xl font-bold text-dark">{stat.value}</div>
              <div className="text-[10px] md:text-xs text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PastEventPhotosClient;