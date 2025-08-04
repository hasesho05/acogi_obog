# メインページ作成チケット
## 龍谷大学アコースティックギターサークルOBOG演奏会 2025

### 📋 チケット概要
龍谷大学アコースティックギターサークルOBOG演奏会 2025年のメインページ（トップページ）を作成する。モダンなデザインとアニメーション効果を活用し、来訪者に印象的な体験を提供する。

---

## 🎫 チケット #2: メインページの実装
**優先度: 最高 | 見積時間: 3-4時間**

### 📝 作業内容
Aceternity UIコンポーネントを活用したインタラクティブなメインページの実装

### ✅ 受け入れ条件
- [ ] レスポンシブデザインに対応している（モバイル・タブレット・デスクトップ）
- [ ] 全セクションが正常に表示される
- [ ] アニメーション効果が適切に動作する
- [ ] 動画ファイルが正常に再生される
- [ ] GoogleMapが正しく表示される

---

## 🎨 デザイン要件

### カラーパレット（既存設定を使用）
- **Primary**: #f2ece7（背景・ベース）
- **Secondary**: #9f8f7c（テキスト・枠線）
- **Tertiary**: #ede5d8（セクション背景）
- **Accent**: #6a8359（差し色・強調）

### レスポンシブブレークポイント
- Mobile: ~768px
- Tablet: 768px~1024px
- Desktop: 1024px~

---

## 📱 セクション構成

### 1. Hero Section（メインビジュアル）
#### 使用コンポーネント
- **Images Slider**: https://ui.aceternity.com/components/images-slider
- **Typewriter Effect**: https://ui.aceternity.com/components/typewriter-effect

#### 要件
- [ ] 動画ファイルを背景として使用
  - `/movies/hero1.webm`
  - `/movies/hero2.webm`
  - 順番にスライド表示（自動切り替え）
- [ ] Typewriter Effectで以下のテキストを表示
  - "龍谷大学"
  - "アコースティックギターサークル"
  - "OBOG演奏会 2025"
- [ ] フルスクリーン表示（viewport height 100%）
- [ ] 動画の音声はミュート
- [ ] 動画は自動再生・ループ
- [ ] モバイルでも動画が適切に表示される

#### デザイン仕様
- 動画上にオーバーレイ（半透明の暗いフィルター）
- テキストは中央配置
- Typewriter Effectの色: 白文字（視認性確保）
- スライドの切り替え時間: 5-7秒

### 2. Event Information Section（開催情報）
#### 要件
- [ ] 開催日時の表示
  - **日付**: 2025年10月12日（日）
  - 大きく目立つフォント
  - カウントダウンタイマー（オプション）
- [ ] 視覚的に魅力的なカード形式で表示
- [ ] アニメーション：スクロール時にフェードイン

#### デザイン仕様
- カード背景: tertiary色
- テキスト色: secondary色
- アクセント色で日付を強調

### 3. Venue Information Section（会場情報）
#### 要件
- [ ] 店舗画像の表示（後で追加予定）
- [ ] 店舗情報
  - **店名**: Second Rooms
  - **住所**: 京都府向日市寺戸町西田中瀬3-4 FORUM東向日1 3F
  - **交通手段**: 東向日駅から84m
- [ ] Google Map埋め込み
  - インタラクティブマップ
  - マーカーで位置表示
  - 住所クリックでGoogleマップアプリ起動
- [ ] アクセス情報を見やすく整理

#### デザイン仕様
- 2カラムレイアウト（デスクトップ）
- 左側: 店舗情報・画像
- 右側: Google Map
- モバイル: 縦積みレイアウト

### 4. Past Event Photos Section（昨年の様子）
#### 使用コンポーネント
- **Parallax Scroll**: https://ui.aceternity.com/components/parallax-scroll

#### 要件
- [ ] 昨年の写真を使用: `/images/image1-12.png`
- [ ] Parallax Scrollエフェクトで表示
- [ ] セクションタイトル: "昨年の演奏会の様子"
- [ ] 写真をグリッド形式で配置
- [ ] ホバー効果でズーム

#### デザイン仕様
- 写真は適切なアスペクト比でトリミング
- グリッドレイアウト（3カラム → 2カラム → 1カラム）
- パララックス効果でスクロールに応じて動く

### 5. Call to Action Section（出演者募集）
#### 要件
- [ ] 出演者募集の案内文
  - "出演者募集中！"のキャッチコピー
  - 参加条件や詳細（簡潔に）
- [ ] Instagramアカウントへのリンク
  - Instagram アイコン付きボタン
  - 外部リンクとして開く
- [ ] コンタクト情報
- [ ] 目立つCTAボタン

#### デザイン仕様
- 背景: accent色でアクセント
- テキスト: 白文字で視認性確保
- ボタン: ホバー時のアニメーション効果

---

## 🛠️ 技術要件

### 必要なファイル
#### 動画ファイル
- [ ] `/public/movies/hero1.webm` を配置
- [ ] `/public/movies/hero2.webm` を配置
- [ ] 動画の最適化（ファイルサイズ・品質）

#### 画像ファイル
- [ ] `/public/images/image1-12.png` を配置（昨年の写真）
- [ ] 店舗画像（後で追加予定、placeholder対応）



### 依存関係
- [ ] `framer-motion` （既にインストール済み）
- [ ] `lucide-react` （アイコン用、既にインストール済み）
- [ ] Google Maps API（必要に応じて）

---

## 📋 実装タスク詳細

### Phase 1: 基本構造とHero Section
1. [ ] `app/page.tsx` でメインページの基本構造を作成
2. [ ] Images Slider コンポーネントを設置
3. [ ] 動画ファイルの配置と表示確認
4. [ ] Typewriter Effect コンポーネントの実装
5. [ ] レスポンシブ対応の確認

### Phase 2: Event・Venue Information
1. [ ] 開催情報セクションの実装
2. [ ] 会場情報セクションの作成
3. [ ] Google Map の埋め込み
4. [ ] レスポンシブレイアウトの調整

### Phase 3: Photo Gallery・CTA
1. [ ] Parallax Scroll コンポーネントの実装
2. [ ] 昨年の写真表示
3. [ ] 出演者募集セクションの作成
4. [ ] Instagram リンクの実装

### Phase 4: 最適化・調整
1. [ ] パフォーマンス最適化
2. [ ] アニメーション調整
3. [ ] クロスブラウザ確認
4. [ ] モバイル表示の最終調整

---

## 🎯 Google Map埋め込み仕様

### 住所情報
- **店名**: Second Rooms
- **住所**: 京都府向日市寺戸町西田中瀬3-4 FORUM東向日1 3F
- **最寄り駅**: 東向日駅から84m

### Map要件
- [ ] インタラクティブマップ
- [ ] 店舗位置にマーカー表示
- [ ] ズーム機能
- [ ] 住所クリックでGoogleマップアプリ起動
- [ ] レスポンシブサイズ調整

### 実装オプション
1. **Google Maps Embed API** (推奨)
   - 無料枠内で利用
   - シンプルな埋め込み
2. **react-google-maps** ライブラリ
   - より高度なカスタマイズ可能

---

## 📱 レスポンシブ要件

### Mobile (〜768px)
- [ ] Hero動画を適切なアスペクト比で表示
- [ ] Typewriter Effectのフォントサイズ調整
- [ ] 各セクションの縦積みレイアウト
- [ ] タッチ操作に対応したインタラクション

### Tablet (768px〜1024px)
- [ ] 2カラムレイアウトの調整
- [ ] 動画とテキストのバランス
- [ ] 適切な余白・パディング

### Desktop (1024px〜)
- [ ] フルワイドレイアウト
- [ ] パララックス効果の最適化
- [ ] ホバー効果の実装

---

---

## 🚀 デプロイ前チェックリスト

- [ ] 全ての動画・画像ファイルが正しく配置されている
- [ ] レスポンシブデザインが全デバイスで正常
- [ ] パフォーマンスが良好（Core Web Vitals）
- [ ] SEO要素が適切に設定されている
- [ ] アクセシビリティが考慮されている
- [ ] 全リンクが正常に動作する

---

## 💡 今後の拡張予定

- 店舗画像の追加
- 出演者情報の詳細ページ
- チケット予約機能
- SNS連携強化
- 多言語対応（日本語・英語）

---

## 📞 連絡先・参考資料

### 参考サイト
- Aceternity UI Components: https://ui.aceternity.com/components
- Images Slider: https://ui.aceternity.com/components/images-slider
- Typewriter Effect: https://ui.aceternity.com/components/typewriter-effect
- Parallax Scroll: https://ui.aceternity.com/components/parallax-scroll

### 会場情報
- Second Rooms 公式情報
- 東向日駅周辺マップ
- アクセス情報の詳細