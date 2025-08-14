
import { Calendar, Clock, MapPin, Ticket, CalendarCheck, AlertCircle, CheckCircle2 } from "lucide-react";
import SectionHeader from '../../ui/section-header';

const EventInformation = () => {
  return (
    <section className="relative py-16 md:py-24 px-4 md:px-8 overflow-hidden bg-gradient-to-b from-primary via-white to-white">
      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <SectionHeader
            icon={<Calendar className="w-5 h-5" />}
            title="演奏会情報"
            subtitle="EVENT INFORMATION"
          />
        </div>

        <div className="space-y-8">
          {/* 参加者向け重要情報カード */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-secondary/5 to-accent/5 rounded-3xl p-8 md:p-10 border border-secondary/20">
              <h3 className="text-2xl font-bold text-dark mb-6 text-center">参加をご検討の方へ</h3>
              
              {/* 基本情報グリッド */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-secondary/10 rounded-xl">
                      <CalendarCheck className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <p className="font-bold text-dark mb-1">開催日時</p>
                      <p className="text-lg font-semibold text-secondary mb-2">2025年10月12日(日)</p>
                      <p className="text-sm text-gray-600">11:00 開場 / 11:30 開演</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-secondary/10 rounded-xl">
                      <Ticket className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <p className="font-bold text-dark mb-1">参加費</p>
                      <p className="text-lg font-semibold text-secondary mb-2">¥1,700 + 1ドリンク</p>
                      <p className="text-sm text-gray-600">ドリンク代 ¥500</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 重要ポイント */}
              <div className="bg-white rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-secondary" />
                  <p className="font-bold text-dark">どなたでも参加できます！</p>
                </div>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span>ギター好きなら誰でも大歓迎！初めての方もお気軽にどうぞ</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span>演奏を聴くだけでもOK！素敵な音楽をお楽しみください</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span>アットホームな雰囲気で、音楽好きの仲間と交流できます</span>
                  </li>
                </ul>
              </div>

              {/* 申込締切 */}
              <div className="bg-accent/10 rounded-2xl p-6 border border-accent/30">
                <div className="flex items-center gap-3 mb-3">
                  <AlertCircle className="w-5 h-5 text-accent" />
                  <p className="font-bold text-dark">参加申込締切</p>
                </div>
                <p className="text-lg font-semibold text-accent mb-2">9月9日まで</p>
                <p className="text-sm text-gray-700">
                  迷っている方はInstagramのDMでお気軽にご相談ください！<br />
                  どんな質問でもお答えします。
                </p>
              </div>
            </div>
          </div>

          {/* 当日の流れ */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl shadow-lg p-8 md:p-10 border border-gray-100">
              <h3 className="text-xl font-bold text-dark mb-6 flex items-center gap-3">
                <Clock className="w-6 h-6 text-secondary" />
                当日のプログラム
              </h3>
              
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-20 text-right">
                    <span className="text-sm font-semibold text-secondary">11:00</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-dark">開場・受付開始</p>
                    <p className="text-sm text-gray-600 mt-1">ウェルカムドリンクでお出迎え</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-20 text-right">
                    <span className="text-sm font-semibold text-secondary">11:30</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-dark">第1部 演奏会</p>
                    <p className="text-sm text-gray-600 mt-1">ソロ・デュエット・バンド演奏など</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-20 text-right">
                    <span className="text-sm font-semibold text-secondary">12:30</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-dark">休憩・交流タイム</p>
                    <p className="text-sm text-gray-600 mt-1">軽食を楽しみながら音楽談義</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-20 text-right">
                    <span className="text-sm font-semibold text-secondary">13:00</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-dark">第2部 演奏会</p>
                    <p className="text-sm text-gray-600 mt-1">様々なジャンルの演奏をお楽しみください</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-20 text-right">
                    <span className="text-sm font-semibold text-secondary">15:00</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-dark">終演</p>
                    <p className="text-sm text-gray-600 mt-1">全体写真撮影・次回のお知らせ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* その他の情報 */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
              <h4 className="font-bold text-dark mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-secondary" />
                会場について
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• 駐車場はございません（公共交通機関をご利用ください）</li>
                <li>• 飲食物の持ち込みはご遠慮ください</li>
                <li>• 写真撮影OK！思い出を残しましょう</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventInformation;