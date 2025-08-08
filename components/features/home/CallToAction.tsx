
import { Music, Users, Heart, Star } from "lucide-react";
import { CTAButton } from "./CallToAction/CTAButton";


const CallToAction = () => {
  const ctaInfo = {
    title: "出演者募集中！",
    subtitle: "一緒に最高の音楽を奏でよう",
    description: "龍谷大学アコギサークルOBOGの皆様、懐かしの仲間と共に素敵な演奏会を作りませんか？",
    instagramUrl: "https://www.instagram.com/"
  };

  const features = [
    { 
      icon: <Users className="w-5 h-5" />, 
      text: "誰でも歓迎",
      description: "卒業年度不問"
    },
    { 
      icon: <Music className="w-5 h-5" />, 
      text: "経験不問",
      description: "ブランクOK"
    },
    { 
      icon: <Heart className="w-5 h-5" />, 
      text: "楽しい雰囲気",
      description: "アットホーム"
    }
  ];

  const benefits = [
    "懐かしの仲間との再会",
    "新しい音楽仲間との出会い",
    "ステージでの演奏機会",
    "思い出作り"
  ];

  return (
    <section className="relative py-12 md:py-16 px-4 md:px-8 bg-gradient-to-b from-white via-primary/5 to-primary overflow-hidden">
      {/* 装飾的な背景要素 */}
      <div className="absolute inset-0 pointer-events-none">
        {/* グラデーションオーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-accent/5" />
        
        {/* 装飾的な円 */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-accent/10 to-secondary/10 rounded-full blur-3xl" />
        
        {/* パターン背景 */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, var(--secondary) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }} />
      </div>

      <div className="relative max-w-5xl mx-auto">

        {/* メインCTAカード */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden fade-in-up animation-delay-200">
          {/* ヘッダー部分 - グラデーション強化 */}
          <div className="relative bg-gradient-to-br from-secondary via-secondary/90 to-accent p-6 md:p-10 text-white text-center overflow-hidden">
            {/* 装飾的なパターン */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `linear-gradient(45deg, transparent 48%, white 49%, white 51%, transparent 52%)`,
                backgroundSize: '20px 20px'
              }} />
            </div>
            
            <div className="relative">
              {/* アイコンバッジ */}
              <div className="inline-flex p-3 bg-white/10 backdrop-blur-sm rounded-xl mb-4">
                <Music className="w-6 h-6" />
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {ctaInfo.title}
              </h2>
              <p className="text-lg md:text-xl font-light mb-4 opacity-95">
                {ctaInfo.subtitle}
              </p>
              <p className="text-sm md:text-base opacity-90 max-w-2xl mx-auto leading-relaxed">
                {ctaInfo.description}
              </p>
            </div>
          </div>
          
          {/* コンテンツ部分 */}
          <div className="p-6 md:p-8 bg-gradient-to-b from-gray-50/50 to-white">
            {/* 特徴カード - デザイン改善 */}
            <div className="grid md:grid-cols-3 gap-3 mb-6">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="group relative bg-white hover:bg-gradient-to-br hover:from-secondary/5 hover:to-accent/5 p-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-secondary/20"
                >
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="p-2 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-lg text-secondary group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800 mb-1">{item.text}</p>
                      <p className="text-[10px] text-gray-500">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ベネフィットリスト */}
            <div className="mb-6 p-4 bg-gradient-to-r from-primary/5 to-transparent rounded-xl">
              <p className="text-xs font-semibold text-gray-600 mb-3 text-center">こんな方におすすめ</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs text-gray-700">
                    <Star className="w-3 h-3 text-accent flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* CTAボタン - クライアントコンポーネント */}
            <CTAButton instagramUrl={ctaInfo.instagramUrl} />
          
          </div>
        </div>

        <div className="mt-8 text-center fade-in-up animation-delay-400">
          <div className="inline-flex items-center gap-2 text-sm text-gray-500">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-full border-2 border-white" />
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-secondary rounded-full border-2 border-white" />
              <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-full border-2 border-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;