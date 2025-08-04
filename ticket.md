EventInformation - Timeline形式の改善案
🎯 改善コンセプト
現在のシンプルなカード形式から、Timeline形式で当日スケジュールを表示することで、より情報豊富で視覚的に魅力的なセクションに変更する。

🛠️ 必要な作業
1. Aceternity UI Timeline コンポーネントの追加
bashnpx shadcn@latest add https://ui.aceternity.com/registry/timeline.json
2. 改善されたコンポーネント構成
タイトル部分

{props.date} と {props.dayOfWeek} をセクションのメインタイトルとして表示
より目立つデザインに変更

🎨 デザイン仕様
レイアウト構成
+----------------------------------+
|           開催情報               |
|    2025年10月12日（日）          |
+----------------------------------+
|                                  |
|  13:30 ●━━━ 開場                |
|         受付開始・会場準備完了    |
|                                  |
|  14:00 ●━━━ 開演・第1部          |
|         OBOG演奏者による...      |
|                                  |
|  15:00 ●━━━ 休憩                |
|         歓談タイム・写真撮影      |
|                                  |
|  15:30 ●━━━ 第2部              |
|         合奏・特別企画           |
|                                  |
|  17:00 ●━━━ 終演予定            |
|         お疲れ様でした！         |
+----------------------------------+
カラーパレット

Timeline線: #6a8359 (accent色)
時間表示: #9f8f7c (secondary色)
タイトル: #6a8359 (accent色)
説明文: #9f8f7c (secondary色)
背景: #ede5d8 (tertiary色)

アニメーション効果

スクロール時に各タイムラインアイテムが順次フェードイン
ホバー時にタイムラインドットが拡大
プログレッシブアニメーション（上から下へ順番に表示）


📱 レスポンシブ対応
Desktop (1024px~)

Timeline を中央配置
左側に時間、右側に内容
余白を十分に確保

Tablet (768px~1024px)

Timeline の幅を調整
フォントサイズを適切に縮小
アイコンサイズの調整

Mobile (~768px)

Timeline を縦方向にコンパクトに
時間と内容を縦積み
タッチ操作に配慮したサイズ


🔧 実装サンプルコード
typescript"use client";

import type { EventInformationProps } from "@/domain/entities/home";
import { motion } from "framer-motion";
import { Timeline } from "@/components/ui/timeline";

const EventInformation = (props: EventInformationProps) => {
  const scheduleData = [
    {
      time: "13:00",
      title: "開場", 
      description: "受付開始・会場準備完了",
      icon: "🚪"
    },
    {
      time: "14:00",
      title: "開演・第1部",
      description: "演奏者による懐かしの楽曲をお届け",
      icon: "🎸" 
    },
    {
      time: "15:00",
      title: "休憩",
      description: "歓談・カレータイム",
      icon: "☕"
    },
    {
      time: "15:30", 
      title: "第2部",
      description: "特別企画・サプライズ演奏",
      icon: "🎵"
    },
    {
      time: "17:00",
      title: "終演予定", 
      description: "お疲れ様でした！アフターパーティーもあります",
      icon: "👏"
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-20 px-4 md:px-8 max-w-7xl mx-auto"
    >
      {/* タイトル部分 */}
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl md:text-5xl font-bold mb-4 text-[#9f8f7c]"
        >
          開催情報
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="inline-block bg-[#6a8359] text-white px-8 py-4 rounded-2xl shadow-lg"
        >
          <p className="text-2xl md:text-3xl font-bold">
            {props.date}
          </p>
          <p className="text-lg md:text-xl mt-1">
            {props.dayOfWeek}
          </p>
        </motion.div>
      </div>

      {/* Timeline部分 */}
      <div className="bg-[#ede5d8] rounded-3xl p-8 md:p-12 shadow-xl">
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-[#6a8359]">
          当日のスケジュール
        </h3>
        <Timeline data={scheduleData} />
      </div>
    </motion.section>
  );
};

export default EventInformation;
