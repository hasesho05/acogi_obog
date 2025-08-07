"use client";

import { ChevronLeft, ChevronRight, Train, Navigation } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface VenueImage {
  src: string;
  title: string;
}

interface VenueInfo {
  name: string;
  address: string;
  access: string;
}

interface VenueInformationClientProps {
  venueInfo: VenueInfo;
  venueImages: VenueImage[];
}

const VenueInformationClient = (props: VenueInformationClientProps) => {
  const { venueInfo, venueImages } = props;
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [selectedTab, setSelectedTab] = useState<'access' | 'map'>('access');

  // 画像の自動切り替え
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % venueImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [venueImages.length]);

  return (
    <div>
      {/* 右側：画像スライダー */}
      <div className="relative h-[400px] md:h-[500px] fade-in-up animation-delay-200">
          <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl">
            {/* 画像 */}
            {venueImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
            
            {/* オーバーレイ */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            
            {/* 画像タイトル */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3">
                <p className="text-sm font-bold text-dark">
                  {venueImages[currentImageIndex].title}
                </p>
              </div>
            </div>
            
            {/* ナビゲーションボタン */}
            <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 flex justify-between">
              <button
                onClick={() => setCurrentImageIndex((prev) => (prev - 1 + venueImages.length) % venueImages.length)}
                className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-dark" />
              </button>
              <button
                onClick={() => setCurrentImageIndex((prev) => (prev + 1) % venueImages.length)}
                className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-dark" />
              </button>
            </div>
            
            {/* インジケーター */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
              {venueImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentImageIndex 
                      ? 'w-8 bg-white' 
                      : 'w-2 bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* マップセクション */}
        <div className="fade-in-up animation-delay-400">
          <div className="flex justify-center gap-2 my-4">
            <button
              onClick={() => setSelectedTab('access')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                selectedTab === 'access'
                  ? 'bg-secondary text-white shadow-lg'
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              アクセス方法
            </button>
            <button
              onClick={() => setSelectedTab('map')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                selectedTab === 'map'
                  ? 'bg-secondary text-white shadow-lg'
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              地図
            </button>
          </div>


          {/* コンテンツ */}
          {selectedTab === 'access' ? (
            <div className="max-w-3xl mx-auto animate-fadeIn">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-xl">
                    <Train className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold text-dark">電車でお越しの方</h3>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="text-sm text-gray-600 mb-1">路線</p>
                    <p className="font-bold text-dark">阪急京都線</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="text-sm text-gray-600 mb-1">最寄駅</p>
                    <p className="font-bold text-dark">東向日駅</p>
                  </div>
                  <div className="bg-gradient-to-r from-secondary/10 to-accent/10 rounded-xl p-4 text-center">
                    <p className="text-sm text-gray-600 mb-1">所要時間</p>
                    <p className="font-bold text-secondary">徒歩1分</p>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <p className="text-sm text-amber-800">
                    <span className="font-semibold">ご注意：</span>
                    駐車場はございません。公共交通機関をご利用ください。
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl overflow-hidden shadow-xl h-[500px] animate-fadeIn">
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(venueInfo.address)}&zoom=16`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          )}

        <Link
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueInfo.address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-secondary to-accent text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        >
          <Navigation className="w-4 h-4" />
          Google Mapで開く
        </Link>
        </div>
    </div>
  );
};

export default VenueInformationClient;