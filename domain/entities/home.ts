// UI component types
export interface LazyImageProps {
  src: string;
  alt: string;
  index: number;
  onLoad?: () => void;
}

export interface OptimizedGalleryProps {
  images: string[];
}