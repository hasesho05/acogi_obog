
import { Calendar, Clock, MapPin, Users, Music, ChevronRight, CheckCircle } from "lucide-react";
import { ScheduleTimeline } from "./EventInfomation/ScheduleTimeline";
import { MobileSchedule } from "./EventInfomation/MobileSchedule";
import SectionHeader from '../../ui/section-header';

interface EventStat {
  icon: React.ReactNode;
  value: string;
  label: string;
}

interface InfoSection {
  title: string;
  icon: React.ReactNode;
  items: string[];
}

// 静的データ
const scheduleData = [
  {
    time: "11:00",
    title: "開場",
    description: "受付開始",
    icon: "door",
    details: ["受付・名札配布", "ウェルカムドリンク", "BGM演奏"]
  },
  {
    time: "11:30",
    title: "第1部",
    description: "演奏会",
    icon: "music",
    details: ["ソロ演奏", "デュエット", "バンド演奏"]
  },
  {
    time: "12:30",
    title: "休憩",
    description: "歓談タイム",
    icon: "coffee",
    details: ["フリートーク", "記念撮影", "軽食"]
  },
  {
    time: "13:00",
    title: "第2部",
    description: "演奏会",
    icon: "party",
    details: ["ソロ演奏", "デュエット", "バンド演奏"]
  },
  {
    time: "15:00",
    title: "終演",
    description: "フィナーレ",
    icon: "camera",
    details: ["全体写真", "アンコール", "次回予告"]
  }
];

const eventStats: EventStat[] = [
  { icon: <Users className="w-5 h-5" />, value: "15+", label: "演奏者" },
  { icon: <Music className="w-5 h-5" />, value: "20+", label: "楽曲" },
  { icon: <Clock className="w-5 h-5" />, value: "3.5h", label: "時間" },
  { icon: <MapPin className="w-5 h-5" />, value: "¥1,700", label: "料金" }
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
    items: ["料金: ¥1,700 + 1ドリンク(¥500)", "飲食物の持ち込み不可", "駐車場はございません", "写真撮影OK"]
  }
];

const EventInformation = () => {
  const date = "2025年10月12日(日)";
  return (
    <section className="relative py-16 md:py-24 px-4 md:px-8 overflow-hidden bg-gradient-to-b from-primary to-white">
      {/* シンプルな背景 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-gradient-to-b from-secondary via-transparent to-transparent" />
        </div>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* メインコンテンツ */}
        <div className="space-y-12 md:space-y-16">
          {/* 日付とカウントダウン */}
          <div className="max-w-xl mx-auto fade-in-up animation-delay-200">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-secondary to-accent p-6 md:p-8 text-white text-center">
                <Calendar className="w-10 md:w-12 h-10 md:h-12 mx-auto mb-4 opacity-90" />
                <div className="text-xl md:text-2xl font-bold mb-2">
                  {date}
                </div>
              </div>
              
              {/* ステータスバー */}
              <div className="bg-gray-50 px-6 py-4">
                <div className="grid grid-cols-4 gap-4">
                  {eventStats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-secondary mb-1">{stat.icon}</div>
                      <div className="text-xs font-bold text-dark">{stat.value}</div>
                      <div className="text-[10px] text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* スケジュール */}
          <div className="fade-in-up animation-delay-400">
            <div className="text-center mb-8 md:mb-10">
              <SectionHeader
                icon={<Clock className="w-4 h-4" />}
                title="タイムスケジュール"
                subtitle="TIME SCHEDULE"
              />
            </div>

            {/* デスクトップ版：クライアントコンポーネント */}
            <div className="hidden md:block">
              <ScheduleTimeline scheduleData={scheduleData} />
            </div>

            {/* モバイル版：静的表示 */}
            <div className="md:hidden">
              <MobileSchedule scheduleData={scheduleData} />
            </div>
          </div>

          {/* 追加情報（静的） */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {infoSections.map((section, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 fade-in-up animation-delay-${600 + index * 100}`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-secondary/10 to-accent/10 rounded-lg text-secondary">
                    {section.icon}
                  </div>
                  <h4 className="text-base font-bold text-dark">{section.title}</h4>
                </div>
                <ul className="space-y-3">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventInformation;