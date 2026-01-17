# トップページリデザイン報告書

**日付**: 2026年1月17日
**作業内容**: OBOG演奏会トップページの新デザイン実装

---

## 概要

ticket.mdの要件に基づき、アコースティックギターサークルOBOG演奏会のトップページを完全に新しいデザインで実装した。

**コンセプト**: 「懐かしさと新しさが交差する、大人の音楽空間」

---

## デザイン方針

### 採用したデザイン手法

| 手法 | 説明 |
|------|------|
| Glassmorphism | 半透明のガラス効果を持つカード・フレーム |
| Aurora Gradient | オレンジ〜緑の動くオーロラ風グラデーション背景 |
| Organic / Biomorphic | 有機的な曲線を持つ浮遊するシェイプ |
| Mesh Gradient | 複数のグラデーションを重ねた深みのある背景 |

### カラーパレット

**既存（オレンジ系）**:
- Primary: `#fff5f0` - ウォームホワイト（背景）
- Secondary: `#d4502c` - バーントオレンジ（メイン）
- Tertiary: `#fae8e0` - ライトピーチ（セクション背景）
- Accent: `#e07548` - サーモンオレンジ（アクセント）
- Dark: `#8b3a1e` - ダークオレンジ（テキスト用）
- Light: `#ff9671` - ライトオレンジ（ハイライト）

**新規追加（緑系・差し色）**:
- Green: `#2d6a4f` - フォレストグリーン
- Green Light: `#40916c` - ライトグリーン
- Green Pale: `#b7e4c7` - ペールグリーン
- Green Dark: `#1b4332` - ダークグリーン

---

## 作成したコンポーネント

### 1. AuroraBackground.tsx
**パス**: `components/features/top/AuroraBackground.tsx`

動くオーロラ風グラデーション背景。5つのオーロラレイヤーが独立して動き、メッシュグラデーションとノイズテクスチャでリッチな質感を実現。

**特徴**:
- CSS keyframesによる滑らかなアニメーション
- オレンジ〜緑のグラデーション
- prefers-reduced-motion対応

### 2. FloatingOrbs.tsx
**パス**: `components/features/top/FloatingOrbs.tsx`

浮遊する光の球とバイオモーフィックSVGシェイプ。Motionによる自然な浮遊アニメーション。

**特徴**:
- 7つの異なるサイズ・色・速度のOrbs
- 有機的な形状のSVGパスアニメーション
- パフォーマンスを考慮した実装

### 3. icons.tsx
**パス**: `components/features/top/icons.tsx`

カスタムSVGアイコン集。

**含まれるアイコン**:
- `AcousticGuitarIcon` - アコースティックギター
- `MusicNoteIcon` - 音符
- `WaveformIcon` - 波形
- `VinylIcon` - レコード

### 4. HeroSection.tsx
**パス**: `components/features/top/HeroSection.tsx`

メインヒーローセクション。Glassmorphismフレーム内に印象的なエントランスアニメーション。

**コンテンツ**:
- サークル名（龍谷大学アコースティックギターサークル）
- メインタイトル（OBOG演奏会）- 1文字ずつアニメーション
- キャッチコピー（また、あの音を奏でよう。）
- 10周年表示（10TH ANNIVERSARY / 2016 — 2026）
- スクロールインジケーター
- 背景画像（second_rooms.jpg）のパララックス効果

### 5. ConcertSection.tsx
**パス**: `components/features/top/ConcertSection.tsx`

演奏会情報セクション。2カラムのカードレイアウト。

**内容**:
- 2025年: 終了済み（薄いスタイル、詳細リンクあり）
- 2026年: Coming Soon（グロー効果、華やかなスタイル）

### 6. SocialSection.tsx
**パス**: `components/features/top/SocialSection.tsx`

SNSリンクセクション。

**内容**:
- YouTube - 演奏動画
- Instagram - 写真・最新情報

---

## ページ構成

```tsx
// app/page.tsx
<main>
  <AuroraBackground />  {/* 固定背景 */}
  <FloatingOrbs />       {/* 浮遊オブジェクト */}
  <HeroSection />        {/* ヒーロー */}
  <ConcertSection />     {/* 演奏会情報 */}
  <SocialSection />      {/* SNSリンク */}
</main>
```

---

## アニメーション

### エントランスアニメーション（HeroSection）

| 要素 | delay | 効果 |
|------|-------|------|
| Glassmorphismフレーム | 0.3s | フェードイン + スケール |
| ギターアイコン | 0.5s | フェードイン + 上昇 |
| サークル名 | 0.7s | フェードイン + 上昇 |
| 装飾ライン | 0.9s | 横方向スケール |
| タイトル各文字 | 1.0s〜 | 1文字ずつ上昇 + 回転 |
| キャッチコピー | 1.8s | フェードイン + 上昇 |
| 10周年表示 | 2.2s〜 | フェードイン + スケール |
| スクロールインジケーター | 2.5s | フェードイン |

### スクロールアニメーション

- HeroSection: パララックス効果（背景画像の移動・拡大）
- ConcertSection: カードのフェードイン + 上昇
- SocialSection: カードのフェードイン + 上昇 + ホバーで浮上

### 常時アニメーション

- Aurora背景: 25〜30秒周期のドリフト
- FloatingOrbs: 18〜26秒周期の浮遊
- Coming Soonバッジ: パルスアニメーション
- スクロールインジケーター: 上下バウンス

---

## レスポンシブ対応

| ブレークポイント | 対応内容 |
|-----------------|---------|
| sm (640px) | タイトルサイズ調整 |
| md (768px) | 2カラムレイアウト、パディング調整 |
| lg (1024px) | タイトル最大サイズ |

---

## アクセシビリティ

- `prefers-reduced-motion: reduce` 対応
  - すべてのアニメーションを無効化
  - 静的表示に切り替え
- セマンティックHTML使用
- 適切なalt属性

---

## 技術スタック

| 技術 | 用途 |
|------|------|
| Next.js 16 | フレームワーク |
| React 19 | UIライブラリ |
| TypeScript | 型安全性 |
| Tailwind CSS v4 | スタイリング |
| Motion (framer-motion) | アニメーション |
| Lucide React | 標準アイコン |
| @tabler/icons-react | 追加アイコン |

---

## ファイル変更一覧

### 新規作成

| ファイル | 行数 |
|---------|------|
| `components/features/top/AuroraBackground.tsx` | ~160行 |
| `components/features/top/FloatingOrbs.tsx` | ~170行 |
| `components/features/top/icons.tsx` | ~90行 |
| `components/features/top/HeroSection.tsx` | ~190行 |
| `components/features/top/ConcertSection.tsx` | ~230行 |
| `components/features/top/SocialSection.tsx` | ~180行 |

### 変更

| ファイル | 変更内容 |
|---------|---------|
| `app/globals.css` | 緑系カラーパレット追加（4色） |
| `app/page.tsx` | 新コンポーネントで再構築 |

---

## 検証結果

- [x] `pnpm build` (NODE_ENV=production) - 成功
- [x] `pnpm dev` - 成功
- [x] TypeScript型チェック - エラーなし
- [x] Biomeリント - エラーなし
- [x] ブラウザ表示確認 - 正常
- [x] アニメーション動作確認 - 正常
- [x] レスポンシブ確認 - 正常

---

## 参考

- [Motion Documentation](https://motion.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Glassmorphism CSS Generator](https://glassmorphism.com/)
