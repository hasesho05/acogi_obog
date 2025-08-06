"use client";

import type { OptimizedGalleryProps } from "@/domain/entities/home";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { useRef, useState, useEffect, useCallback, useTransition } from "react";
import LazyImage from "./lazy-image";

const OptimizedGallery = (props: OptimizedGalleryProps) => {
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [displayCount, setDisplayCount] = useState<number>(8);
  const [isPending, startTransition] = useTransition();
  const galleryRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const handleImageLoad = useCallback(() => {
    startTransition(() => {
      setLoadedCount(prev => prev + 1);
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && displayCount < props.images.length) {
          startTransition(() => {
            setDisplayCount(prev => Math.min(prev + 4, props.images.length));
          });
        }
      },
      {
        rootMargin: '100px',
        threshold: 0.1
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [displayCount, props.images.length]);

  const displayImages = props.images.slice(0, displayCount);

  return (
    <div ref={galleryRef} className="relative">
      {(loadedCount < displayCount || isPending) && (
        <div className="absolute top-4 left-4 right-4 z-20">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-secondary to-accent"
                initial={{ width: 0 }}
                animate={{ width: `${(loadedCount / displayCount) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-xs text-center text-gray-600 mt-1">
              {loadedCount} / {displayCount} 枚読み込み完了
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {displayImages.map((image, index) => (
          <LazyImage
            key={`${image}-${index}`}
            src={image}
            alt={`イベント写真 ${index + 1}`}
            index={index}
            onLoad={handleImageLoad}
          />
        ))}
      </div>

      {displayCount < props.images.length && (
        <div ref={loadMoreRef} className="flex justify-center py-8">
          <motion.button
            onClick={() => startTransition(() => {
              setDisplayCount(prev => Math.min(prev + 4, props.images.length));
            })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-6 py-3 bg-white rounded-xl shadow-md border border-gray-200 text-gray-700 hover:shadow-lg transition-shadow ${isPending ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={isPending}
          >
            <Camera className="w-4 h-4" />
            <span className="font-semibold">さらに表示（残り {props.images.length - displayCount} 枚）</span>
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default OptimizedGallery;