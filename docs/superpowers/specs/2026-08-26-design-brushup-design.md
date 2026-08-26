# サイト全体デザインブラッシュアップ 設計書

日付: 2026-08-26
ステータス: 承認済み（実装は未着手）

## 目的

OBOG演奏会サイト全体のビジュアル品質を引き上げる。方向性は「現在のウォームオレンジ×グラスモーフィズム路線を磨き込む」。コンセプト「懐かしさと新しさが交差する、大人の音楽空間」に対して装飾過多になっている要素を引き算し、フォント・共通部品・ページ間の一貫性を整える。

## 決定事項（ユーザー承認済み）

- 方向性: 既存路線の磨き込み（リデザインはしない）
- 対象範囲: 全ページ（トップ、/concerts、/concerts/2025、/about、Footer）
- 装飾: 引き算して上質に（落ち葉・Orbs・音符パーティクルを削除、オーロラは控えめに維持）
- Footer連絡先: メールアドレスは存在しないため削除し、Instagram のみとする
- フォントサイズの縮小カスタム（base 14px）は今回維持（全ページレイアウトへの影響が大きいため）

## 現状の問題点（調査で確認済みの事実）

1. **フォント未ロード**: `globals.css` は `Playfair Display` / `Noto Sans JP` を前提とするが、`app/layout.tsx` は Geist / Geist Mono のみロード。`--font-geist-*` 変数は body の className に付与されるだけで参照箇所なし。実際の表示は Georgia / Hiragino Sans へのフォールバック。
2. **Footer のトーン断絶**: サイトはウォームホワイト基調なのに `bg-neutral-900`。`mailto:contact@example.com`（プレースホルダー href）に表示テキスト `acogi.circle@gmail.com` という不整合もある。
3. **装飾レイヤー過多**: トップページで FallingLeaves + AuroraBackground + FloatingOrbs + MusicalParticles + グラスモーフィズムが同時に重なる。
4. **Hero のコピペ重複**: `ConcertsHeroSection` と `AboutHeroSection` はほぼ同一（波形SVG・シェイプ背景・スクロール連動）。
5. **危険なCSS全域指定**: `*:focus { outline: none }`（a11y問題）、`* { transition-duration: 200ms }`（全要素トランジション）。
6. **その他の負債**: 未使用ユーティリティ（neumorphism 等）、`app/concerts/2025/page.tsx` の `console.log` 残存。

## 設計

### 1. 土台（全ページに効く）

**フォント** — `app/layout.tsx` で `next/font/google` から以下をロードし、CSS変数で `globals.css` に接続する:

- `Playfair_Display`（`--font-display`、英字見出し用、`display: "swap"`）
- `Noto_Sans_JP`（`--font-body`、本文用、`display: "swap"`）

Geist / Geist Mono のロードは削除。`globals.css` の `--font-family-display` / `--font-family-body` を next/font の変数参照に変更（フォールバックは現状の Georgia / Hiragino Sans を維持）。body の font-family は本文用（Noto Sans JP）に変更する。現状 body に serif（display）が当たっているのは不自然なため。既存の `font-display` / `font-body` ユーティリティ使用箇所は挙動が変わらないことを確認する。

**CSS修正** — `app/globals.css`:

- `*:focus { outline: none; box-shadow: ... }` を削除し、`:focus-visible` に対してフォーカスリング（`outline: 2px solid var(--color-secondary); outline-offset: 2px` 相当）を定義。
- `* { transition-timing-function / transition-duration }` の全域指定を削除。これに依存していた無指定トランジションが動かなくなるため、目視で気づいた箇所には個別に `transition-*` クラスを付与（Tailwind の `transition-colors` 等）。
- 未使用ユーティリティ（`neumorphism`、未参照の `animation-delay-*` 等）を grep で使用箇所確認のうえ削除。

### 2. 共通部品

**Footer**（`components/layout/Footer.tsx`）:

- 背景をウォームダーク（`--color-dark: #8b3a1e` を基調とした深いブラウン系グラデーション）に変更し、サイトの世界観と接続する。
- テキスト・ホバー色をウォームトーンに統一（neutral-* 系を排除）。
- メール項目（`mailto:contact@example.com` / `acogi.circle@gmail.com`）を削除し、お問い合わせは Instagram のみとする。
- 上端に既存セクションと同じ装飾ライン（グラデーションの水平線）を入れ、本文からの繋がりを作る。

**PageHero 共通化**（新規 `components/features/shared/PageHero.tsx`）:

- `ConcertsHeroSection` / `AboutHeroSection` の重複（背景グラデーション、有機シェイプ、波形SVG、スクロール連動フェード）を1コンポーネントに集約。
- Props: タイトル、英字ラベル、サブテキスト、アイコン。型は `domain/entities/component.ts` に定義（プロジェクト規約）。
- 両ページはこのコンポーネントを使う薄いラッパーに置き換える。

### 3. トップページの引き算

- **削除**: `FallingLeaves`、`FloatingOrbs`、`MusicalParticles`（トップページからの使用を外し、コンポーネントファイル自体も他で未使用のため削除）。dynamic import も削除しバンドルを軽量化。
- **AuroraBackground**: 維持するが透明度・彩度を下げ、より繊細な背景にする。
- **HeroSection**（`components/features/top/HeroSection.tsx`）:
  - 1文字ずつの 3D 回転（rotateX）エントランスをやめ、行単位の静かなフェード＋ブラー解除（`filter: blur → 0`）に変更。
  - MusicalParticles ラッパーを外し、タイトルの hover scale ギミックも削除。
  - ガラスフレームは維持。内部の装飾シェイプは整理（最大2個まで）。
  - AnniversaryBadge・スクロールインジケーター・角の装飾は維持。
- **ConcertSection**: Coming Soon カードの二重グロー＋無限パルスを、静的な控えめグロー1枚に変更。バッジの無限 scale パルスも削除。
- **SocialSection**: ホバーグローを維持しつつ、エフェクトの重なりを確認して過剰なら1層に整理。

### 4. 下層ページの統一

- `/concerts` と `/about`: PageHero 共通化の適用と、新フォント反映後の見た目確認・微調整。
- `/concerts/2025`: 新フォント・CSS修正の影響確認と微調整。`console.log("Rendering Live2025Page")` を削除。

## エラーハンドリング / 互換性

- `prefers-reduced-motion` 対応は現状の仕組みを維持（削除する装飾はそもそも消えるため対応が簡素化される）。
- Static export（`output: 'export'`）の制約に抵触する変更はなし（クライアントコンポーネントとCSSのみ）。
- next/font は static export で動作する（ビルド時にセルフホスト）。

## テスト / 検証

- `NODE_ENV=production pnpm build` が通ること。
- `npx biome check --write` がクリーンであること。
- 既存の Vitest テスト（`pnpm test` 相当）が通ること。削除コンポーネントを参照するテスト・Storybook ストーリーがあれば併せて削除・更新する。
- 見た目の最終確認はユーザーがブラウザで実施（本プロジェクトでは Playwright MCP を使用しない規約）。

## スコープ外

- フォントサイズトークン（base 14px）の変更
- カラーパレットの変更
- 新規ページ・新規コンテンツの追加
- `/privacy` `/thanks` のデザイン変更（フォント・Footer の共通変更の影響のみ受ける）
