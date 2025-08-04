"use client";

import type { VenueInformationProps } from "@/domain/entities/home";
import { motion } from "framer-motion";
import { MapPin, Train, Clock, Phone, Star, Utensils } from "lucide-react";
import { ImagesSlider } from "@/components/ui/images-slider";

import Image from "next/image";

const VenueInformation = (props: VenueInformationProps) => {
  // 会場画像のスライダー用データ（ImagesSliderには文字列配列が必要）
  const venueImages = [
    "/images/venue.jpeg",
    "/images/venue2.jpeg", 
    "/images/curry.jpeg"
  ];

  // 会場の特徴データ
  const venueFeatures = [
    {
      icon: <Utensils className="w-6 h-6" />,
      title: "名物カレー",
      description: "Second Roomsといえば絶品カレー！演奏会の後にぜひお楽しみください。",
      image: "/images/curry.jpeg"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "音響設備",
      description: "アコースティックギターの美しい音色を最高の環境でお届けします。",
      image: "/images/venue.jpeg"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "アクセス良好",
      description: "東向日駅から徒歩1分の好立地。電車でのアクセスが便利です。",
      image: "/images/venue2.jpeg"
    }
  ];

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-[#f2ece7] to-[#ede5d8] relative overflow-hidden">
      {/* 装飾的背景 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6a8359]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#9f8f7c]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* セクションヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#6a8359] to-[#9f8f7c] bg-clip-text text-transparent">
            会場情報
          </h2>
        </motion.div>

        {/* メインコンテンツエリア */}
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          
          {/* 左側: 会場画像スライダー */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <ImagesSlider 
                images={venueImages}
                className="h-full"
                autoplay={true}
                direction="up"
              >
                <motion.div
                  initial={{ opacity: 0, y: -80 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="z-50 flex flex-col justify-center items-center"
                >
                  <motion.p  className="font-bold text-md md:text-lg text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
                    Second Rooms <br />
                    音楽と食が楽しめる素敵な空間で、特別な時間をお過ごしください
                  </motion.p>
                </motion.div>
              </ImagesSlider>
            </div>
          </motion.div>

          {/* 右側: 基本情報カード */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl py-10 px-8 shadow-2xl border border-white/20 h-fit">
              <h3 className="text-xl md:text-2xl font-bold mb-6 text-[#6a8359]">
                {props.name}
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-[#6a8359] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-[#9f8f7c] font-bold mb-2">住所</p>
                    <p className="text-[#9f8f7c] leading-relaxed">{props.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Train className="w-6 h-6 text-[#6a8359] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-[#9f8f7c] font-bold mb-2">アクセス</p>
                    <p className="text-[#9f8f7c] leading-relaxed">{props.access}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-[#6a8359] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-[#9f8f7c] font-bold mb-2">営業時間</p>
                    <p className="text-[#9f8f7c] leading-relaxed">
                      11:30〜22:00<br />
                      （ラストオーダー 21:30）
                    </p>
                  </div>
                </div>
              </div>
              
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(props.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full mt-8 px-6 py-4 bg-gradient-to-r from-[#6a8359] to-[#9f8f7c] text-white rounded-2xl hover:from-[#5a7349] hover:to-[#8f7f6c] transition-all duration-300 text-center font-bold shadow-lg"
              >
                Google Mapで開く
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Google Map */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[#6a8359]">
            アクセスマップ
          </h3>
          <div className="h-[450px] rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(props.address)}&zoom=16`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          
          {/* 交通案内 */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="bg-[#f2ece7] rounded-2xl p-6">
              <h4 className="font-bold text-[#6a8359] mb-3 flex items-center">
                <Train className="w-5 h-5 mr-2" />
                電車でお越しの方
              </h4>
              <ul className="text-sm text-[#9f8f7c] space-y-2">
                <li>• 東向日駅下車 徒歩1分</li>
                <li>• 阪急京都線をご利用ください</li>
                <li>• 駅から非常に近く便利です</li>
              </ul>
            </div>
            
            <div className="bg-[#f2ece7] rounded-2xl p-6">
              <h4 className="font-bold text-[#6a8359] mb-3 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                お車でお越しの方
              </h4>
              <ul className="text-sm text-[#9f8f7c] space-y-2">
                <li>• 駐車場はございません</li>
                <li>• 近隣のコインパーキングをご利用ください</li>
                <li>• 公共交通機関でのお越しを推奨</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VenueInformation;