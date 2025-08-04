"use client";

import type { EventInformationProps } from "@/domain/entities/home";
import { motion } from "framer-motion";
import { ScheduleTimeline } from "@/components/ui/schedule-timeline";
import { Calendar, Clock, MapPin, Users, Music } from "lucide-react";
import { useState, useEffect } from "react";

const EventInformation = (props: EventInformationProps) => {
  const [daysUntilEvent, setDaysUntilEvent] = useState<number>(0);

  // 開催日までの日数を計算
  useEffect(() => {
    const calculateDaysUntilEvent = () => {
      const now = new Date();
      const eventDate = new Date(2025, 9, 12); // 2025年10月12日 (月は0から始まるので9)
      
      // 時間を0時0分0秒に設定して日付のみで比較
      now.setHours(0, 0, 0, 0);
      eventDate.setHours(0, 0, 0, 0);
      
      const timeDifference = eventDate.getTime() - now.getTime();
      const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
      
      setDaysUntilEvent(Math.max(0, daysDifference)); // 負の値を防ぐ
    };

    calculateDaysUntilEvent();
    
    // 毎日0時に更新するため、1時間ごとに再計算（より正確に）
    const interval = setInterval(calculateDaysUntilEvent, 1000 * 3600);
    
    return () => clearInterval(interval);
  }, []);

  const getCountdownMessage = () => {
    if (daysUntilEvent === 0) {
      return "本日開催！";
    } else if (daysUntilEvent < 0) {
      return "開催終了";
    } else if (daysUntilEvent === 1) {
      return "明日開催！";
    } else if (daysUntilEvent <= 7) {
      return `あと${daysUntilEvent}日！`;
    } else {
      return `あと${daysUntilEvent}日`;
    }
  };

  const getCountdownColor = () => {
    if (daysUntilEvent <= 1) {
      return "text-yellow-300"; // 当日・明日は黄色
    } else if (daysUntilEvent <= 7) {
      return "text-orange-300"; // 1週間以内はオレンジ
    } else {
      return "text-white"; // それ以外は白
    }
  };
  const scheduleData = [
    {
      time: "13:30",
      title: "開場", 
      description: "受付開始・会場準備完了",
      icon: "🚪",
      color: "#9f8f7c"
    },
    {
      time: "14:00",
      title: "開演・第1部",
      description: "OBOG演奏者による懐かしの楽曲をお届け",
      icon: "🎸",
      color: "#6a8359"
    },
    {
      time: "15:00",
      title: "休憩",
      description: "歓談タイム・写真撮影・軽食タイム",
      icon: "☕",
      color: "#9f8f7c"
    },
    {
      time: "15:30", 
      title: "第2部",
      description: "合奏・特別企画・サプライズ演奏",
      icon: "🎵",
      color: "#6a8359"
    },
    {
      time: "17:00",
      title: "終演予定", 
      description: "お疲れ様でした！記念撮影タイム",
      icon: "👏",
      color: "#9f8f7c"
    }
  ];

  const eventStats = [
    {
      icon: <Users className="w-6 h-6" />,
      value: "15+名",
      description: "演奏者"
    },
    {
      icon: <Music className="w-6 h-6" />,
      value: "20+曲",
      description: "懐かしの楽曲"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      value: "4時間ぐらい",
      description: "休憩込み"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      value: "Second Rooms",
      description: "東向日駅徒歩1分"
    }
  ];

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* セクションヘッダー */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <motion.h2 
          className="text-2xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-[#6a8359] to-[#9f8f7c] bg-clip-text text-transparent"
        >
          開催情報
        </motion.h2>
      </motion.div>

      {/* メインコンテンツエリア */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* 左側: 日付・基本情報カード */}
        <motion.div
          initial={{ opacity: 0}}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="lg:col-span-1"
        >
          {/* 日付カード */}
          <div className="bg-gradient-to-br from-[#6a8359] to-[#9f8f7c] rounded-3xl p-8 text-white shadow-2xl mb-6 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center mb-4">
              <Calendar className="w-8 h-8 mr-3" />
              <span className="text-lg font-medium">開催日</span>
            </div>
            <div className="text-xl md:text-2xl font-bold mb-2">
              {props.date}
            </div>
            
            {/* カウントダウン要素 */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-6 pt-6 border-t border-white/20"
            >
              <div className="text-sm opacity-80 mb-1">開催まで</div>
              <div className={`text-2xl font-bold ${getCountdownColor()}`}>
                {getCountdownMessage()}
              </div>
            </motion.div>
          </div>

          {/* 統計情報カード */}
          <div className="grid grid-cols-2 gap-4">
            {eventStats.map((stat, index) => (
              <motion.div
                key={stat.description}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#ede5d8]"
              >
                <div className="flex items-center mb-2 text-[#6a8359]">
                  {stat.icon}
                </div>
                <div className="text-lg font-bold text-[#9f8f7c] mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-[#9f8f7c]/50 mt-1">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 右側: タイムライン */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="lg:col-span-2"
        >
          <div className="bg-gradient-to-br from-[#f2ece7] to-[#ede5d8] rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm border border-white/20">
            <div
              className="mb-4"
            >
              <h3 className="text-xl md:text-2xl font-bold text-center mb-4 bg-gradient-to-r from-[#6a8359] to-[#9f8f7c] bg-clip-text text-transparent">
                当日のスケジュール
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-[#6a8359] to-[#9f8f7c] mx-auto rounded-full"></div>
            </div>

            <ScheduleTimeline data={scheduleData} />

            {/* 追加情報 */}
            <div
              className="mt-8 pt-8 border-t border-[#9f8f7c]/20"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/50 rounded-2xl p-6 backdrop-blur-sm">
                  <h4 className="font-bold text-[#6a8359] mb-3 flex items-center">
                    <Music className="w-5 h-5 mr-2" />
                    演奏予定楽曲
                  </h4>
                  <ul className="text-sm text-[#9f8f7c] space-y-1">
                    <li>• J-POP名曲集</li>
                    <li>• ロックミュージック</li>
                    <li>• オリジナル楽曲</li>
                    <li>• 特別合奏曲</li>
                  </ul>
                </div>
                
                <div className="bg-white/50 rounded-2xl p-6 backdrop-blur-sm">
                  <h4 className="font-bold text-[#6a8359] mb-3 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    注意事項
                  </h4>
                  <ul className="text-sm text-[#9f8f7c] space-y-1">
                    <li>• 開場15分前より受付開始</li>
                    <li>• 飲食物の持ち込み不可</li>
                    <li>• 駐車場はございません</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 装飾的要素 */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#6a8359]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#9f8f7c]/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default EventInformation;