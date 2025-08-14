import { MapPin, Train, Clock, Building, Coffee, Wifi, Volume2 } from "lucide-react";
import VenueInformationClient from './VenueInformationClient';
import SectionHeader from '../../ui/section-header';

const VenueInformation = () => {
  const venueInfo = {
    name: "Second Rooms",
    address: "京都府向日市寺戸町西田中瀬3-4 FORUM東向日１ 3F",
    access: "東向日駅から84m"
  };

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

  return (
    <section className="relative py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-white to-primary overflow-hidden">
      {/* セクションヘッダー */}
      <SectionHeader
        icon={<MapPin className="w-4 h-4" />}
        title="会場情報"
        subtitle="VENUE INFORMATION"
      />

      {/* メインコンテンツ */}
      <div className="space-y-12 md:space-y-16">
        {/* 会場名と画像 - 縦並びレイアウト */}
        <div className="max-w-5xl mx-auto space-y-8">
          {/* 会場情報セクション */}
          <div className="space-y-6 max-w-3xl mx-auto">
            {/* 会場名カード */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-xl">
                  <MapPin className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-dark mb-2">
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
                    <p className="text-xs font-semibold text-gray-700 mb-1">住所</p>
                    <p className="text-xs text-gray-600">{venueInfo.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Train className="w-5 h-5 text-secondary mt-1" />
                  <div>
                    <p className="text-xs font-semibold text-gray-700 mb-1">アクセス</p>
                    <p className="text-xs text-gray-600">{venueInfo.access}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-secondary mt-1" />
                  <div>
                    <p className="text-xs font-semibold text-gray-700 mb-1">営業時間</p>
                    <p className="text-xs text-gray-600">11:30〜22:00（L.O. 21:30）</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 特徴グリッド */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {venueFeatures.map((feature, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br from-white to-tertiary/30 rounded-xl p-4 border border-secondary/10 shadow-md hover:shadow-lg transition-shadow duration-300 fade-in-up animation-delay-${(index + 2) * 200}`}
                >
                  <div className="text-secondary mb-2">{feature.icon}</div>
                  <h4 className="text-xs font-bold text-dark mb-1">{feature.title}</h4>
                  <p className="text-[10px] text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* インタラクティブ要素セクション */}
          <VenueInformationClient 
            venueInfo={venueInfo}
            venueImages={venueImages}
          />
        </div>
      </div>
    </section>
  );
};

export default VenueInformation;