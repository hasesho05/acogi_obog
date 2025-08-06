"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Train, Clock, Navigation, Building, Coffee, Wifi, Volume2, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const VenueInformation = () => {
  const venueInfo = {
    name: "Second Rooms",
    address: "京都府向日市寺戸町西田中瀬3-4 FORUM東向日１ 3F",
    access: "東向日駅から84m"
  };
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [selectedTab, setSelectedTab] = useState<'access' | 'map'>('access');
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const venueImages = [
    { src: "/images/venue.jpeg", title: "ステージエリア" },
    { src: "/images/venue2.jpeg", title: "メインフロア" },
    { src: "/images/curry.jpeg", title: "名物カレー" }
  ];

  const venueFeatures = [
    {
      icon: <Building className="w-5 h-5" />,
      title: "開放的な空間",
      description: "音楽と食が融合する特別な空間"
    },
    {
      icon: <Volume2 className="w-5 h-5" />,
      title: "音響設備完備",
      description: "プロ仕様の音響で最高の演奏を"
    },
    {
      icon: <Coffee className="w-5 h-5" />,
      title: "カフェ併設",
      description: "名物カレーと豊富なドリンク"
    },
    {
      icon: <Wifi className="w-5 h-5" />,
      title: "設備充実",
      description: "Wi-Fi・バリアフリー対応"
    }
  ];

  // 画像の自動切り替え
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % venueImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [venueImages.length]);

  return (
    <section ref={containerRef} className="relative py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-white to-primary overflow-hidden">
      {/* シンプルな背景 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-tertiary/20 to-transparent opacity-50" />
      </div>

      <motion.div 
        style={{ scale, opacity }}
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
            会場情報
          </h2>
          <div className="w-12 h-1 bg-secondary mx-auto rounded-full" />
        </motion.div>

        {/* メインコンテンツ */}
        <div className="space-y-12 md:space-y-16">
          {/* 会場名と画像 */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* 左側：会場情報 */}
            <div
              className="space-y-6"
            >
              {/* 会場名カード */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-xl">
                    <MapPin className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-dark mb-2">
                      {venueInfo.name}
                    </h3>
                    <p className="text-gray-600">Music & Dining Space</p>
                  </div>
                </div>
                
                {/* 基本情報 */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-secondary mt-1" />
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">住所</p>
                      <p className="text-sm text-gray-600">{venueInfo.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Train className="w-5 h-5 text-secondary mt-1" />
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">アクセス</p>
                      <p className="text-sm text-gray-600">{venueInfo.access}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-secondary mt-1" />
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">営業時間</p>
                      <p className="text-sm text-gray-600">11:30〜22:00（L.O. 21:30）</p>
                    </div>
                  </div>
                </div>
                
                {/* アクションボタン */}
                <motion.a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueInfo.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-secondary to-accent text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Navigation className="w-4 h-4" />
                  Google Mapで開く
                </motion.a>
              </div>

              {/* 特徴グリッド */}
              <div className="grid grid-cols-2 gap-4">
                {venueFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl p-4 border border-gray-100 shadow-md"
                  >
                    <div className="text-secondary mb-2">{feature.icon}</div>
                    <h4 className="text-sm font-bold text-dark mb-1">{feature.title}</h4>
                    <p className="text-xs text-gray-600">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 右側：画像スライダー */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative h-[400px] md:h-[500px]"
            >
              <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl">
                {/* 画像 */}
                {venueImages.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={image.src}
                      alt={image.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
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
            </motion.div>
          </div>

          {/* マップセクション */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* タブ */}
            <div className="flex justify-center gap-2 mb-8">
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
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="max-w-3xl mx-auto"
              >
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
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl overflow-hidden shadow-xl h-[500px]"
              >
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(venueInfo.address)}&zoom=16`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default VenueInformation;