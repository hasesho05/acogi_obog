
"use client";

import { Instagram, ArrowRight } from "lucide-react";
import { useState } from "react";

interface CTAButtonProps {
  instagramUrl: string;
}

export const CTAButton = ({ instagramUrl }: CTAButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <>
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        className={`
          relative flex items-center justify-center gap-2 w-full px-6 py-3 
          bg-gradient-to-r from-secondary to-accent text-white 
          rounded-xl font-bold text-sm shadow-lg whitespace-nowrap 
          transition-all duration-300 overflow-hidden
          ${isHovered ? 'shadow-2xl transform -translate-y-0.5' : 'shadow-lg'}
          ${isPressed ? 'transform translate-y-0 shadow-md' : ''}
        `}
      >
        {/* ホバー時の光沢エフェクト */}
        <div className={`
          absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
          transition-transform duration-500 -skew-x-12
          ${isHovered ? 'translate-x-full' : '-translate-x-full'}
        `} />
        
        {/* ボタンコンテンツ */}
        <Instagram className="w-4 h-4 relative z-10" />
        <span className="relative z-10">Instagramで詳細を見る</span>
        <ArrowRight className={`
          w-4 h-4 relative z-10 transition-transform duration-300
          ${isHovered ? 'translate-x-1' : ''}
        `} />
      </a>

      {/* パルスアニメーション */}
      <div className="relative mt-2">
        <div className="absolute inset-0 flex justify-center">
          <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-ping" />
        </div>
      </div>
    </>
  );
};