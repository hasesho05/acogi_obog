"use client";

import type { LazyImageProps } from "@/domain/entities/home";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useRef, useState, useEffect, useTransition } from "react";
import Image from "next/image";

const LazyImage = (props: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isInView, setIsInView] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.01
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <motion.div
      ref={imgRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ 
        opacity: isLoaded && !isPending ? 1 : 0,
        scale: isLoaded && !isPending ? 1 : 0.95
      }}
      transition={{ duration: 0.5, delay: props.index * 0.05 }}
      className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden"
    >
      {(!isLoaded || isPending) && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
          <Loader2 className={`w-6 h-6 text-gray-400 animate-spin ${isPending ? 'opacity-70' : ''}`} />
        </div>
      )}
      
      {isInView && (
        <Image
          src={props.src}
          alt={props.alt}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover"
          loading="lazy"
          quality={85}
          onLoad={() => {
            startTransition(() => {
              setIsLoaded(true);
              props.onLoad?.();
            });
          }}
        />
      )}
    </motion.div>
  );
};

export default LazyImage;