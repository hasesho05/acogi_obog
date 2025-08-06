"use client";

import { motion, useScroll, useTransform, LazyMotion, domAnimation, m } from "framer-motion";
import { Calendar, Clock, MapPin, Users, Music, ChevronRight, DoorOpen, Coffee, Camera, PartyPopper, CheckCircle } from "lucide-react";
import { useState, useEffect, useRef, useMemo, useCallback, memo, ReactNode } from "react";

// 型定義
interface ScheduleDetail {
  time: string;
  title: string;
  description: string;
  icon: ReactNode;
  details: string[];
}

interface EventStat {
  icon: ReactNode;
  value: string;
  label: string;
}

interface InfoSection {
  title: string;
  icon: ReactNode;
  items: string[];
}

interface ScheduleItemProps {
  item: ScheduleDetail;
  index: number;
  isActive: number;
  onMouseEnter: (index: number) => void;
  isMobile: boolean;
}

// 静的データを外部定義
const scheduleData: ScheduleDetail[] = [
  {
    time: "13:30",
    title: "開場",
    description: "受付開始",
    icon: <DoorOpen className="w-5 h-5" />,
    details: ["受付・名札配布", "ウェルカムドリンク", "BGM演奏"]
  },
  {
    time: "14:00",
    title: "第1部",
    description: "OBOG演奏",
    icon: <Music className="w-5 h-5" />,
    details: ["ソロ演奏", "デュエット", "バンド演奏"]
  },
  {
    time: "15:00",
    title: "休憩",
    description: "歓談タイム",
    icon: <Coffee className="w-5 h-5" />,
    details: ["フリートーク", "記念撮影", "軽食"]
  },
  {
    time: "15:30",
    title: "第2部",
    description: "特別企画",
    icon: <PartyPopper className="w-5 h-5" />,
    details: ["全員合奏", "サプライズ", "ゲスト演奏"]
  },
  {
    time: "17:00",
    title: "終演",
    description: "フィナーレ",
    icon: <Camera className="w-5 h-5" />,
    details: ["全体写真", "アンコール", "次回予告"]
  }
];

const eventStats: EventStat[] = [
  { icon: <Users className="w-5 h-5" />, value: "15+", label: "演奏者" },
  { icon: <Music className="w-5 h-5" />, value: "20+", label: "楽曲" },
  { icon: <Clock className="w-5 h-5" />, value: "4h", label: "時間" },
  { icon: <MapPin className="w-5 h-5" />, value: "駅近", label: "アクセス" }
];

const infoSections: InfoSection[] = [
  {
    title: "演奏予定",
    icon: <Music className="w-5 h-5" />,
    items: ["J-POP名曲集", "ロックナンバー", "オリジナル楽曲", "特別合奏曲"]
  },
  {
    title: "ご案内",
    icon: <CheckCircle className="w-5 h-5" />,
    items: ["開場15分前より受付開始", "飲食物の持ち込み不可", "駐車場はございません", "写真撮影OK"]
  }
];

// メモ化されたスケジュールアイテム
const ScheduleItem = memo<ScheduleItemProps>(({ item, index, isActive, onMouseEnter, isMobile }) => {
  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
      >
        <div className="flex">
          <div className="bg-gradient-to-b from-secondary to-accent text-white px-4 py-4 flex flex-col items-center justify-center">
            <div className="text-sm font-bold">{item.time}</div>
          </div>
          <div className="flex-1 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-secondary">{item.icon}</span>
              <h4 className="font-bold text-dark">{item.title}</h4>
            </div>
            <p className="text-sm text-gray-600 mb-2">{item.description}</p>
            <div className="space-y-1">
              {item.details.map((detail, i) => (
                <div key={i} className="text-xs text-gray-500 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-accent" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="relative" onMouseEnter={() => onMouseEnter(index)}>
      <div
        className={`w-6 h-6 mx-auto mb-8 rounded-full border-2 transition-all duration-300 ${
          index <= isActive 
            ? 'bg-gradient-to-r from-secondary to-accent border-transparent' 
            : 'bg-white border-gray-300'
        } shadow-sm`}
        style={{
          transform: isActive === index ? 'scale(1.3)' : 'scale(1)',
        }}
      />
      
      <div
        className={`bg-white rounded-xl p-4 shadow-lg border transition-all duration-300 ${
          isActive === index 
            ? 'border-secondary shadow-xl transform -translate-y-1' 
            : 'border-gray-100'
        }`}
      >
        <div className="text-center mb-3">
          <div className="text-secondary mb-2">{item.icon}</div>
          <div className="text-sm font-bold text-secondary">{item.time}</div>
        </div>
        <h4 className="font-bold text-dark text-center mb-2">{item.title}</h4>
        <p className="text-xs text-gray-600 text-center mb-3">{item.description}</p>
        
        {isActive === index && (
          <div className="pt-3 border-t border-gray-100 space-y-1 animate-fadeIn">
            {item.details.map((detail, i) => (
              <div key={i} className="text-xs text-gray-500 flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-accent" />
                <span>{detail}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

ScheduleItem.displayName = 'ScheduleItem';

const EventInformation = () => {
  const date = "2025年10月12日(日)";
  const [daysUntilEvent, setDaysUntilEvent] = useState<number>(0);
  const [activeSchedule, setActiveSchedule] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // スクロール設定を簡素化
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // transformをメモ化
  const backgroundY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.9]);

  // モバイル判定
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 開催日までの日数を計算（1日1回のみ更新）
  useEffect(() => {
    const calculateDaysUntilEvent = () => {
      const now = new Date();
      const eventDate = new Date(2025, 9, 12);
      now.setHours(0, 0, 0, 0);
      eventDate.setHours(0, 0, 0, 0);
      const timeDifference = eventDate.getTime() - now.getTime();
      const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
      setDaysUntilEvent(Math.max(0, daysDifference));
    };

    calculateDaysUntilEvent();
    const interval = setInterval(calculateDaysUntilEvent, 1000 * 3600 * 24); // 1日ごとに更新
    return () => clearInterval(interval);
  }, []);

  // 自動スケジュール切り替え（デスクトップのみ、インターバルを長く）
  useEffect(() => {
    if (isMobile) return;
    
    const interval = setInterval(() => {
      setActiveSchedule((prev) => (prev + 1) % scheduleData.length);
    }, 7000); // 5秒から7秒に変更
    return () => clearInterval(interval);
  }, [isMobile]);

  const getCountdownMessage = useCallback(() => {
    if (daysUntilEvent === 0) return "本日開催";
    if (daysUntilEvent < 0) return "開催終了";
    if (daysUntilEvent === 1) return "明日開催";
    if (daysUntilEvent <= 7) return `${daysUntilEvent}日後`;
    return `${daysUntilEvent}日後`;
  }, [daysUntilEvent]);

  const handleScheduleHover = useCallback((index: number) => {
    setActiveSchedule(index);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <section ref={containerRef} className="relative py-16 md:py-24 px-4 md:px-8 overflow-hidden bg-gradient-to-b from-primary to-white">
        {/* シンプルな背景 */}
        <div className="absolute inset-0 pointer-events-none">
          <m.div
            className="absolute inset-0 opacity-[0.03] will-change-transform"
            style={{ y: backgroundY }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-secondary via-transparent to-transparent" />
          </m.div>
        </div>

        <m.div style={{ opacity }} className="relative max-w-5xl mx-auto">
          {/* セクションヘッダー */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-3xl font-bold text-dark mb-4">
              開催情報
            </h2>
            <div className="w-12 h-1 bg-secondary mx-auto rounded-full" />
          </motion.div>

          {/* メインコンテンツ */}
          <div className="space-y-12 md:space-y-16">
            {/* 日付とカウントダウン */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-secondary to-accent p-6 md:p-8 text-white text-center">
                  <Calendar className="w-10 md:w-12 h-10 md:h-12 mx-auto mb-4 opacity-90" />
                  <div className="text-2xl md:text-3xl font-bold mb-2">
                    {date}
                  </div>
                  <div className="text-lg md:text-xl opacity-90">
                    開催まで{getCountdownMessage()}
                  </div>
                </div>
                
                {/* ステータスバー */}
                <div className="bg-gray-50 px-6 py-4">
                  <div className="grid grid-cols-4 gap-4">
                    {eventStats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-secondary mb-1">{stat.icon}</div>
                        <div className="text-sm font-bold text-dark">{stat.value}</div>
                        <div className="text-xs text-gray-500">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* スケジュール */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-center text-dark mb-8 md:mb-10">
                タイムスケジュール
              </h3>

              {isMobile ? (
                /* モバイル版 */
                <div className="max-w-md mx-auto space-y-4">
                  {scheduleData.map((item, index) => (
                    <ScheduleItem
                      key={index}
                      item={item}
                      index={index}
                      isActive={activeSchedule}
                      onMouseEnter={handleScheduleHover}
                      isMobile={true}
                    />
                  ))}
                </div>
              ) : (
                /* デスクトップ版 */
                <div className="relative max-w-5xl mx-auto">
                  {/* プログレスライン */}
                  <div className="absolute left-0 right-0 top-12 h-[2px] bg-gray-200">
                    <div 
                      className="h-full bg-gradient-to-r from-secondary to-accent transition-all duration-500"
                      style={{
                        width: `${(activeSchedule / (scheduleData.length - 1)) * 100}%`
                      }}
                    />
                  </div>
                  
                  <div className="grid grid-cols-5 gap-4">
                    {scheduleData.map((item, index) => (
                      <ScheduleItem
                        key={index}
                        item={item}
                        index={index}
                        isActive={activeSchedule}
                        onMouseEnter={handleScheduleHover}
                        isMobile={false}
                      />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* 追加情報 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
            >
              {infoSections.map((section, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gradient-to-r from-secondary/10 to-accent/10 rounded-lg text-secondary">
                      {section.icon}
                    </div>
                    <h4 className="text-lg font-bold text-dark">{section.title}</h4>
                  </div>
                  <ul className="space-y-3">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          </div>
        </m.div>
      </section>
    </LazyMotion>
  );
};

export default EventInformation;