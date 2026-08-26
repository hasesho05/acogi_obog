# サイト全体デザインブラッシュアップ Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** ウォームオレンジ×グラスモーフィズム路線を維持したまま、フォント読み込み修正・装飾の引き算・Footer/ページ間の一貫性向上でサイト全体の視覚品質を引き上げる。

**Architecture:** 変更はクライアントコンポーネントとCSSのみ（`app/layout.tsx`、`app/globals.css`、`components/` 配下）。新規共通コンポーネントは `PageHero` の1つで、`ConcertsHeroSection` / `AboutHeroSection` はそれを使う薄いラッパーに置き換える（外部からの import パスは不変）。トップページからは FallingLeaves / FloatingOrbs / MusicalParticles を削除する。

**Tech Stack:** Next.js 16 (App Router, static export), React 19, Tailwind CSS v4 (`@theme`), Motion (`motion/react`), next/font, Biome, Vitest, pnpm

**Spec:** `docs/superpowers/specs/2026-08-26-design-brushup-design.md`

## Global Constraints

- パッケージマネージャーは **pnpm**。ビルドは必ず `NODE_ENV=production pnpm build`（Next.js 16 の既知問題のため）。
- Lint/Format は **Biome のみ**: `npx biome check --write`（ESLintは使わない）。
- コンポーネントは**アロー関数**、props は**単一オブジェクト引数（分割代入しない）**、戻り値型は書かない。共通コンポーネントの props 型は `domain/entities/component.ts` に定義する。
- Motion のインポートは `motion/react` から（`framer-motion` は使わない）。
- カラーは Tailwind ユーティリティ（`bg-primary`, `text-dark` 等）を使う。カラーパレット自体は変更しない。
- フォントサイズトークン（`--font-size-*`）は**変更しない**（スコープ外）。
- ブラウザでの見た目確認はユーザーに依頼する（**Playwright MCP は使用しない**規約）。
- **作業ブランチ**: `feature/design-brushup` を現在の状態から作成する。
- **⚠️ 事前確認（Task 1 開始前に必ずユーザーに確認）**: 作業ツリーに未コミットの変更（analytics 関連: `app/layout.tsx`, `components/layout/Footer.tsx`, `components/features/top/SocialSection.tsx`, `components/features/top/AnniversaryBadge.tsx` 等）が存在する。本計画はこれらのファイルも編集するため、コミットすると未コミット分が混入する。**先にユーザーに現状の変更をコミットしてもらうか、混入を許容するかを確認してから着手すること。**
- コミットは各タスクで指定したファイルのみ `git add <path>` する。`git add -A` / `git add .` は禁止（無関係な未コミット変更・未追跡ファイルがあるため）。

---

### Task 1: フォントの読み込みと接続（Playfair Display + Noto Sans JP）

**Files:**
- Modify: `app/layout.tsx:1-16, 63`
- Modify: `app/globals.css:22-24, 44-49`

**Interfaces:**
- Consumes: なし
- Produces: CSS 変数 `--font-playfair` / `--font-noto-sans-jp`（next/font が生成）、Tailwind ユーティリティ `font-display` / `font-body`（`@theme` の `--font-display` / `--font-body` から生成）。以降の全タスクはこのフォント表示を前提とする。

**背景（実装者向け）:** 現状 `globals.css` は `Playfair Display` / `Noto Sans JP` を前提にしているが、`app/layout.tsx` は Geist / Geist Mono しかロードしておらず、`--font-geist-*` 変数はどこからも参照されていない。さらに Tailwind v4 のフォントファミリー用テーマ名前空間は `--font-*` であり、現状の `--font-family-*` では `font-display` / `font-body` ユーティリティが生成されていない可能性が高い。本タスクで両方を正す。

- [ ] **Step 1: `app/layout.tsx` のフォントを差し替える**

先頭の import とフォント定義（1〜16行目）を以下に変更する:

```tsx
import type { Metadata } from "next";
import { Noto_Sans_JP, Playfair_Display } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import AnalyticsProvider from "@/components/providers/AnalyticsProvider";
import MotionProvider from "@/components/providers/MotionProvider";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  display: "swap",
});
```

body の className（63行目付近）を変更する:

```tsx
      <body className={`${playfairDisplay.variable} ${notoSansJp.variable} min-h-screen flex flex-col bg-primary antialiased`}>
```

`Geist` / `Geist_Mono` の import・定義は削除する（`--font-geist-*` は参照ゼロを確認済み）。

- [ ] **Step 2: `app/globals.css` のテーマ変数を Tailwind v4 の正規名前空間に変更する**

`@theme` 内の以下2行（22〜24行目付近）:

```css
  --font-family-display: "Playfair Display", "Georgia", serif;
  --font-family-body: "Noto Sans JP", "Hiragino Sans", "sans-serif";
```

を次に置き換える（`"sans-serif"` が引用符付きになっているバグも同時に修正）:

```css
  --font-display: var(--font-playfair), "Georgia", serif;
  --font-body: var(--font-noto-sans-jp), "Hiragino Sans", sans-serif;
```

`@layer base` の body（44〜49行目付近）を、本文フォント（Noto Sans JP）基準に変更する:

```css
  body {
    font-family: var(--font-body);
    background-color: var(--color-primary);
    overflow-x: hidden;
  }
```

- [ ] **Step 3: `--font-family-*` の参照が残っていないことを確認する**

Run: `grep -rn "font-family-display\|font-family-body" app components`
Expected: ヒットなし（あれば `--font-display` / `--font-body` に置換する）

- [ ] **Step 4: ビルドとフォーマットを検証する**

Run: `npx biome check --write app/layout.tsx app/globals.css && NODE_ENV=production pnpm build`
Expected: エラーなしでビルド成功

- [ ] **Step 5: 生成CSSにフォントユーティリティが含まれることを確認する**

Run: `grep -rlo "font-playfair" out/_next/static/css/ | head -1 && grep -rlo "\.font-display" out/_next/static/css/ | head -1`
Expected: 両方で CSS ファイルパスが1件出力される（`font-display` ユーティリティが実際に生成されている証拠）

- [ ] **Step 6: Commit**

```bash
git add app/layout.tsx app/globals.css
git commit -m "fix: Playfair DisplayとNoto Sans JPをnext/fontで読み込みTailwind v4のフォントテーマに接続"
```

---

### Task 2: globals.css の危険な全域指定の修正と未使用ユーティリティ削除

**Files:**
- Modify: `app/globals.css:137-142, 145-171, 206-216`

**Interfaces:**
- Consumes: なし
- Produces: `:focus-visible` ベースのフォーカスリング。全要素 transition の削除（以降のタスクで transition が必要な箇所は Tailwind の `transition-*` クラスを明示する）。

- [ ] **Step 1: フォーカススタイルを `:focus-visible` に変更する**

以下のブロック（206〜210行目付近）:

```css
  /* フォーカスアウトライン - より控えめに */
  *:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(212, 80, 44, 0.2);
  }
```

を次に置き換える（キーボード操作時のみ可視リングを出す。マウスクリックでは出ない）:

```css
  /* フォーカスリング - キーボード操作時のみ表示 */
  :focus-visible {
    outline: 2px solid var(--color-secondary);
    outline-offset: 2px;
  }
```

- [ ] **Step 2: 全要素 transition を削除する**

以下のブロック(212〜216行目付近)を**丸ごと削除**する:

```css
  /* トランジション設定 - より自然に */
  * {
    transition-timing-function: var(--ease-fluid);
    transition-duration: 200ms;
  }
```

補足: コードベース内の hover 系スタイルはほぼすべて Tailwind の `transition-colors` / `transition-transform` / `transition-all` 等を明示しているため影響は軽微。ただし Step 4 の grep で `hover:` を持つのに `transition` クラスが無い要素が見つかったら、その要素に `transition-colors`（色変化）または `transition-transform`（変形）を追加する。

- [ ] **Step 3: 未使用ユーティリティを確認して削除する**

Run: `for c in neumorphism glassmorphism glow text-gradient animate-gradient animate-pulse-slow animate-float animation-delay-100 animation-delay-600 animation-delay-700 animation-delay-800 animation-delay-2000; do echo "== $c =="; grep -rn "$c" app components --include="*.tsx" | grep -v "globals.css" | head -3; done`

Expected: ヒットが0件のクラスのみ、`app/globals.css` から定義を削除する（`animation-delay-200` / `animation-delay-400` は使用中のため**残す**。調査時点では上記リストは全て未使用と思われるが、必ず grep 結果に従うこと）

- [ ] **Step 4: transition 欠落の目視確認用 grep**

Run: `grep -rn "hover:" components --include="*.tsx" | grep -v "transition" | head -20`
Expected: 出力された行を確認し、色や transform が変化するのに transition クラスが無い要素があれば `transition-colors` 等を追加（Footer は Task 3 で作り直すため対象外）

- [ ] **Step 5: 検証**

Run: `npx biome check --write app components && NODE_ENV=production pnpm build`
Expected: ビルド成功

- [ ] **Step 6: Commit**

```bash
git add app/globals.css
git add -u components
git commit -m "fix: focus-visibleベースのフォーカスリング導入と全要素transition・未使用ユーティリティの削除"
```

---

### Task 3: Footer をウォームトーンに再デザイン（メール項目削除）

**Files:**
- Modify: `components/layout/Footer.tsx`（全面書き換え）
- Test: `components/layout/Footer.stories.tsx`（既存 Story がそのまま動くことを確認）

**Interfaces:**
- Consumes: Tailwind カラートークン（`dark`, `primary`, `accent`, `light`）
- Produces: default export `Footer`（props なし、Server Component のまま）。import パス `@/components/layout/Footer` は不変。

- [ ] **Step 1: Footer.tsx を以下の内容に全面書き換えする**

デザイン意図: `bg-neutral-900`（無関係な真っ黒）をやめ、サイトのダークトークン `#8b3a1e` を基調とした深いウォームブラウンのグラデーションに。テキストはウォームホワイト系、ホバーは `light`（`#ff9671`）。お問い合わせはユーザー確認済みの通り **Instagram のみ**（メールアドレスは存在しないため削除）。

```tsx
import Link from "next/link";
import { Instagram } from "lucide-react";

const footerLinks = [
  { href: "/about", label: "このサイトについて" },
  { href: "/concerts", label: "演奏会アーカイブ" },
  { href: "/concerts/2025", label: "2025年演奏会" },
  { href: "/privacy", label: "プライバシーポリシー" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative mt-16 bg-gradient-to-b from-dark to-[#5f2715] text-primary"
      role="contentinfo"
    >
      {/* 上端の装飾ライン - 本文セクションと同じ言語 */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <h2 className="font-display text-lg font-semibold tracking-wide">
                龍谷大学アコギサークル
              </h2>
            </Link>
            <p className="mt-3 font-body text-sm text-primary/70 leading-relaxed">
              OBOG演奏会の情報を発信しています。
            </p>
          </div>

          {/* Quick Nav */}
          <nav aria-label="フッターナビ" className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-body text-sm font-semibold text-primary/90">リンク</h3>
              <ul className="mt-3 space-y-2 font-body text-sm">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-primary/70 transition-colors hover:text-light underline-offset-2 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-body text-sm font-semibold text-primary/90">お問い合わせ</h3>
              <ul className="mt-3 space-y-2 font-body text-sm">
                <li>
                  <a
                    href="https://www.instagram.com/acoustic_concert_obog"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary/70 transition-colors hover:text-light underline-offset-2 hover:underline"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-4 w-4" /> Instagram
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-12 border-t border-primary/15 pt-6 font-body text-xs text-primary/50">
          <p>© {year} Ryukoku Acoustic Guitar Circle. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

- [ ] **Step 2: メール参照が消えたことを確認する**

Run: `grep -rn "mailto\|acogi.circle\|contact@example" components app`
Expected: ヒットなし

- [ ] **Step 3: 検証**

Run: `npx biome check --write components/layout/Footer.tsx && NODE_ENV=production pnpm build`
Expected: ビルド成功

- [ ] **Step 4: Storybook で Footer が壊れていないことを確認する**

Run: `pnpm build-storybook`
Expected: ビルド成功（`Footer.stories.tsx` は default export をそのまま描画しているため変更不要のはず。失敗した場合のみ Story を修正する）

- [ ] **Step 5: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "feat: Footerをウォームダークトーンに再デザインしメール項目を削除"
```

---

### Task 4: PageHero 共通コンポーネント作成と concerts / about への適用

**Files:**
- Create: `domain/entities/component.ts`
- Create: `components/features/shared/PageHero.tsx`
- Modify: `components/features/concerts/ConcertsHeroSection.tsx`（薄いラッパー化）
- Modify: `components/features/about/AboutHeroSection.tsx`（薄いラッパー化）
- Test: `components/features/concerts/ConcertsHeroSection.stories.tsx`（既存 Story がそのまま動くことを確認）

**Interfaces:**
- Consumes: Task 1 のフォントユーティリティ
- Produces: `PageHero`（default export）と型 `PageHeroProps`:

```ts
export type PageHeroProps = {
  label: string;         // 小見出し（例: 龍谷大学アコースティックギターサークル）
  title: string;         // 英字メインタイトル（例: CONCERTS）
  subtitle: string;      // 日本語サブタイトル
  description: string;   // 説明文
  icon: LucideIcon;      // メインアイコン
  subIcon: LucideIcon;   // 右上のミニアイコン
};
```

- [ ] **Step 1: `domain/entities/component.ts` を作成する**

```ts
import type { LucideIcon } from "lucide-react";

/** 下層ページ共通ヒーローの props */
export type PageHeroProps = {
  label: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  subIcon: LucideIcon;
};
```

- [ ] **Step 2: `components/features/shared/PageHero.tsx` を作成する**

`ConcertsHeroSection` / `AboutHeroSection` の共通部分を集約する。変更点は次の3つで、それ以外の構造・クラス・タイミングは元のコードをそのまま踏襲する: (1) 波形SVGのグラデーション ID を `useId` で一意化、(2) ミニアイコンの無限 scale パルスを静的表示に変更（装飾の引き算）、(3) テキスト類を props 化。

```tsx
"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useId, useRef } from "react";
import type { PageHeroProps } from "@/domain/entities/component";

const WAVE_PATH_A =
  "M0,192L60,186.7C120,181,240,171,360,186.7C480,203,600,245,720,250.7C840,256,960,224,1080,208C1200,192,1320,192,1380,192L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z";
const WAVE_PATH_B =
  "M0,224L60,213.3C120,203,240,181,360,176C480,171,600,181,720,197.3C840,213,960,235,1080,229.3C1200,224,1320,192,1380,176L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z";

const CORNER_DECORATIONS = [
  { className: "top-8 left-8 border-l-2 border-t-2 border-secondary/15 rounded-tl-3xl", delay: 1.5 },
  { className: "top-8 right-8 border-r-2 border-t-2 border-green/15 rounded-tr-3xl", delay: 1.6 },
  { className: "bottom-8 left-8 border-l-2 border-b-2 border-green/15 rounded-bl-3xl hidden md:block", delay: 1.7 },
  { className: "bottom-8 right-8 border-r-2 border-b-2 border-secondary/15 rounded-br-3xl hidden md:block", delay: 1.8 },
];

const PageHero = (props: PageHeroProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const gradientId = useId();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);

  const Icon = props.icon;
  const SubIcon = props.subIcon;

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85vh] w-full overflow-hidden flex items-center justify-center"
    >
      {/* 背景グラデーション */}
      <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-tertiary to-primary" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-secondary/8 to-accent/5 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-gradient-to-tl from-green/8 to-green-light/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-secondary/3 to-transparent blur-2xl" />
      </motion.div>

      {/* 波形アニメーション背景 */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <svg
          className="absolute bottom-0 left-0 w-full h-48"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <motion.path
            d={WAVE_PATH_A}
            fill={`url(#${gradientId})`}
            animate={{ d: [WAVE_PATH_A, WAVE_PATH_B] }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d4502c" />
              <stop offset="50%" stopColor="#e07548" />
              <stop offset="100%" stopColor="#2d6a4f" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ギターの弦をイメージしたライン装飾 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`string-${i}`}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.08 }}
            transition={{ duration: 1.5, delay: 0.8 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute h-px bg-gradient-to-r from-transparent via-secondary to-transparent"
            style={{
              top: `${20 + i * 12}%`,
              left: "10%",
              right: "10%",
              transformOrigin: "left",
            }}
          />
        ))}
      </div>

      {/* メインコンテンツ */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 mx-4 max-w-4xl w-full"
      >
        <div className="relative p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] overflow-hidden">
          {/* Glassmorphism背景 */}
          <div className="absolute inset-0 bg-white/50 backdrop-blur-xl border border-white/40 rounded-[2rem] md:rounded-[3rem] shadow-2xl shadow-secondary/5" />

          {/* 装飾シェイプ */}
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-br from-secondary/15 to-accent/8 blur-2xl" />
          <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-gradient-to-tr from-green/12 to-green-light/8 blur-2xl" />

          {/* コンテンツ */}
          <div className="relative z-10 text-center">
            {/* アイコン */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center mb-6"
            >
              <div className="relative">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-secondary/10 to-accent/10 flex items-center justify-center">
                  <Icon className="w-8 h-8 md:w-10 md:h-10 text-secondary/70" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green/20 flex items-center justify-center">
                  <SubIcon className="w-3 h-3 text-green" />
                </div>
              </div>
            </motion.div>

            {/* 小見出し */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="font-body text-xs md:text-sm tracking-[0.3em] text-dark/50 mb-4"
            >
              {props.label}
            </motion.p>

            {/* 装飾ライン */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="w-20 h-px mx-auto mb-8 bg-gradient-to-r from-transparent via-secondary/40 to-transparent"
            />

            {/* メインタイトル */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              style={{
                background: "linear-gradient(135deg, #8b3a1e 0%, #d4502c 50%, #2d6a4f 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {props.title}
            </motion.h1>

            {/* サブタイトル */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-lg sm:text-xl md:text-2xl text-dark/60 tracking-wide mb-4"
            >
              {props.subtitle}
            </motion.p>

            {/* 説明文 */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-body text-sm md:text-base text-dark/50 max-w-lg mx-auto leading-relaxed"
            >
              {props.description}
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* 角の装飾 */}
      {CORNER_DECORATIONS.map((corner) => (
        <motion.div
          key={corner.className}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: corner.delay }}
          className={`absolute w-20 h-20 ${corner.className}`}
        />
      ))}
    </section>
  );
};

export default PageHero;
```

- [ ] **Step 3: `ConcertsHeroSection.tsx` を薄いラッパーに置き換える**

ファイル全体を以下に置き換える:

```tsx
"use client";

import { Library, Music } from "lucide-react";
import PageHero from "@/components/features/shared/PageHero";

const ConcertsHeroSection = () => {
  return (
    <PageHero
      label="龍谷大学アコースティックギターサークル"
      title="CONCERTS"
      subtitle="音が紡いできた、10年のものがたり"
      description="これまでの演奏会の記録と、これからの予定をまとめたアーカイブです。"
      icon={Library}
      subIcon={Music}
    />
  );
};

export default ConcertsHeroSection;
```

- [ ] **Step 4: `AboutHeroSection.tsx` を薄いラッパーに置き換える**

ファイル全体を以下に置き換える:

```tsx
"use client";

import { Guitar, Music } from "lucide-react";
import PageHero from "@/components/features/shared/PageHero";

const AboutHeroSection = () => {
  return (
    <PageHero
      label="龍谷大学アコースティックギターサークル"
      title="ABOUT US"
      subtitle="卒業しても、また弾きたくなったら"
      description="年に一度、みんなで集まってギターを弾く。それだけの、でも特別な時間。"
      icon={Music}
      subIcon={Guitar}
    />
  );
};

export default AboutHeroSection;
```

- [ ] **Step 5: 検証（ビルド + Storybook）**

Run: `npx biome check --write domain components && NODE_ENV=production pnpm build && pnpm build-storybook`
Expected: 両方成功（`ConcertsHeroSection.stories.tsx` は import パス不変のためそのまま動く）

- [ ] **Step 6: Commit**

```bash
git add domain/entities/component.ts components/features/shared/PageHero.tsx components/features/concerts/ConcertsHeroSection.tsx components/features/about/AboutHeroSection.tsx
git commit -m "refactor: concerts/aboutの重複ヒーローをPageHero共通コンポーネントに集約"
```

---

### Task 5: トップページの装飾レイヤー削減（落ち葉・Orbs 削除、オーロラ調整）

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/features/top/AuroraBackground.tsx:38, 61, 71, 81, 91`
- Delete: `components/features/top/FallingLeaves.tsx`
- Delete: `components/features/top/FloatingOrbs.tsx`

**Interfaces:**
- Consumes: なし
- Produces: `app/page.tsx` は `HeroSection` / `ConcertSection` / `SocialSection` / `AuroraBackground` のみで構成される。

- [ ] **Step 1: `app/page.tsx` を以下に置き換える**

```tsx
"use client";

import dynamic from "next/dynamic";
import ConcertSection from "@/components/features/top/ConcertSection";
import HeroSection from "@/components/features/top/HeroSection";
import SocialSection from "@/components/features/top/SocialSection";

// bundle-dynamic-imports: 背景アニメーションは遅延ロード
// SSR無効化でハイドレーション後に描画（初期ロード高速化）
const AuroraBackground = dynamic(
  () => import("@/components/features/top/AuroraBackground"),
  { ssr: false }
);

const HomePage = () => {
  return (
    <main className="relative min-h-screen">
      {/* 動く背景レイヤー */}
      <AuroraBackground />

      {/* メインコンテンツ */}
      <HeroSection />
      <ConcertSection />
      <SocialSection />
    </main>
  );
};

export default HomePage;
```

- [ ] **Step 2: 削除対象コンポーネントの参照が他にないことを確認して削除する**

Run: `grep -rn "FallingLeaves\|FloatingOrbs" app components tests --include="*.tsx" --include="*.ts"`
Expected: ヒットは各コンポーネント自身のファイルのみ。確認後:

```bash
git rm components/features/top/FallingLeaves.tsx components/features/top/FloatingOrbs.tsx
```

（もし他から参照があれば削除せず、参照元の扱いをユーザーに確認する）

- [ ] **Step 3: AuroraBackground の透明度を下げてより繊細にする**

`components/features/top/AuroraBackground.tsx` で以下の数値だけ変更する（構造は変えない）:

- 38行目付近（モバイル静的グラデーション）: `opacity-60` → `opacity-50`
- 61行目付近（オーロラレイヤー1）: `opacity-25` → `opacity-20`
- 71行目付近（オーロラレイヤー2）: `opacity-20` → `opacity-15`
- 81行目付近（オーロラレイヤー3）: `opacity-15` → `opacity-10`
- 91行目付近（メッシュオーバーレイ）: `opacity-40` → `opacity-30`

- [ ] **Step 4: 検証**

Run: `npx biome check --write app/page.tsx components/features/top/AuroraBackground.tsx && NODE_ENV=production pnpm build`
Expected: ビルド成功（削除ファイルへの参照エラーが無いこと）

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx components/features/top/AuroraBackground.tsx
git commit -m "feat: トップページの落ち葉・Orbs装飾を削除しオーロラ背景を繊細に調整"
```

（`git rm` 済みの削除は自動でステージされている）

---

### Task 6: トップ Hero の演出を静かなフェードに変更（音符パーティクル削除）

**Files:**
- Modify: `components/features/top/HeroSection.tsx`
- Delete: `components/ui/musical-particles.tsx`

**Interfaces:**
- Consumes: なし
- Produces: `HeroSection`（default export、変更なし）。`MusicalParticles` はコードベースから消滅する。

- [ ] **Step 1: HeroSection のタイトル演出を置き換える**

`components/features/top/HeroSection.tsx` で以下を行う:

1. import から `MusicalParticles` を削除（9行目: `import MusicalParticles from "@/components/ui/musical-particles";`）
2. 巻き上げ定数（12〜16行目）を次に置き換える:

```tsx
// rendering-hoist-jsx: 静的データをコンポーネント外に巻き上げ
const TITLE_LINE_1 = "OB・OG";
const TITLE_LINE_2 = "CONCERT";
const CATCH_COPY = "A Decade of Harmony";
```

3. `<MusicalParticles ...>` 〜 `</MusicalParticles>`（99〜153行目）のブロック全体を、以下の h1 に置き換える（1文字ずつの 3D 回転＋クリックパーティクル＋hover scale を廃止し、行単位のフェード＋ブラー解除に変更）:

```tsx
            <h1
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 leading-tight"
              style={{
                background:
                  "linear-gradient(135deg, #8b3a1e 0%, #d4502c 40%, #8b3a1e 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              <motion.span
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.0, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
              >
                <span className="block sm:inline">{TITLE_LINE_1}</span>
                <span className="hidden sm:inline-block w-4 md:w-6" />
                <span className="block sm:inline">{TITLE_LINE_2}</span>
              </motion.span>
            </h1>
```

4. キャッチコピーの `delay: 2.0` を `delay: 1.6` に、10周年バッジの `delay: 2` を `delay: 1.8` に、スクロールインジケーターの `delay: 2.5` を `delay: 2.2` に短縮する（文字送りが無くなった分、後続の演出を前倒しして間延びを防ぐ）。

- [ ] **Step 2: musical-particles の参照が他にないことを確認して削除する**

Run: `grep -rn "musical-particles\|MusicalParticles" app components tests --include="*.tsx" --include="*.ts"`
Expected: ヒットなし（HeroSection の修正後）。確認後:

```bash
git rm components/ui/musical-particles.tsx
```

- [ ] **Step 3: 検証**

Run: `npx biome check --write components/features/top/HeroSection.tsx && NODE_ENV=production pnpm build`
Expected: ビルド成功

- [ ] **Step 4: Commit**

```bash
git add components/features/top/HeroSection.tsx
git commit -m "feat: トップHeroの文字送り演出を静かなフェード＋ブラー解除に変更し音符パーティクルを削除"
```

---

### Task 7: ConcertSection / SocialSection の常時アニメーションを削減

**Files:**
- Modify: `components/features/top/ConcertSection.tsx:36-53, 85-93`
- Modify: `components/features/top/SocialSection.tsx:123-131`

**Interfaces:**
- Consumes: なし
- Produces: 変更なし（両コンポーネントの export は不変）

- [ ] **Step 1: ConcertSection の Coming Soon グローを静的1枚にする**

`ConcertSection.tsx` の 36〜53行目付近、二重グロー（静的 div ＋無限パルスの `motion.div`）:

```tsx
        {!isCompleted && (
          <>
            <div className="absolute -inset-1 bg-gradient-to-r from-secondary/20 via-accent/30 to-green/20 rounded-[2rem] blur-xl opacity-60 group-hover:opacity-80 transition-opacity" />
            <motion.div
              animate={{ ... }}
              transition={{ ... }}
              className="absolute -inset-1 bg-gradient-to-r from-secondary/10 via-green/15 to-accent/10 rounded-[2rem] blur-2xl"
            />
          </>
        )}
```

を、静的グロー1枚に置き換える:

```tsx
        {!isCompleted && (
          <div className="absolute -inset-1 bg-gradient-to-r from-secondary/20 via-accent/25 to-green/15 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
        )}
```

- [ ] **Step 2: Coming Soon バッジの無限パルスを止める**

85〜93行目付近の `motion.span`（`animate={{ scale: [1, 1.03, 1] }}` 付き）を通常の `span` に変更する:

```tsx
            <span className="inline-flex items-center gap-1.5 font-body text-xs tracking-wider px-4 py-2 rounded-full bg-gradient-to-r from-secondary to-accent text-white shadow-lg shadow-secondary/20">
              <Sparkles className="w-3 h-3" />
              Coming Soon
            </span>
```

- [ ] **Step 3: SocialSection の矢印の無限バウンスを hover 連動にする**

`SocialSection.tsx` の 123〜131行目付近、CTA テキスト内の `motion.span`（`animate={{ x: [0, 4, 0] }}` の無限アニメーション）:

```tsx
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            →
          </motion.span>
```

を CSS の hover 連動に置き換える:

```tsx
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
```

- [ ] **Step 4: 未使用 import の掃除と検証**

`ConcertSection.tsx` で `motion` がまだ使われていることを確認（カード本体の `motion.div` 等で使用中のため import は残る）。

Run: `npx biome check --write components/features/top/ConcertSection.tsx components/features/top/SocialSection.tsx && NODE_ENV=production pnpm build`
Expected: ビルド成功、未使用 import 警告なし

- [ ] **Step 5: Commit**

```bash
git add components/features/top/ConcertSection.tsx components/features/top/SocialSection.tsx
git commit -m "feat: ConcertSection/SocialSectionの常時再生アニメーションを削減し静的・hover連動に変更"
```

---

### Task 8: 下層ページの残作業と最終検証

**Files:**
- Modify: `app/concerts/2025/page.tsx:9`
- Test: 全体検証（build / biome / vitest / storybook）

**Interfaces:**
- Consumes: Task 1〜7 のすべての変更
- Produces: 完成状態のブランチ

- [ ] **Step 1: `app/concerts/2025/page.tsx` のデバッグログを削除する**

9行目の `console.log("Rendering Live2025Page");` を削除する。

- [ ] **Step 2: 全体検証を実行する**

Run: `npx biome check --write . && NODE_ENV=production pnpm build && pnpm test && pnpm build-storybook`
Expected: すべて成功（`pnpm test` は既存の `tests/unit/{infrastructure,lib}` のみで、今回の変更対象外のため通るはず。落ちた場合は原因を調査し、テストのスキップや無効化はしない）

- [ ] **Step 3: 残存参照の最終確認**

Run: `grep -rn "FallingLeaves\|FloatingOrbs\|MusicalParticles\|font-geist\|neutral-900\|mailto" app components domain`
Expected: ヒットなし

- [ ] **Step 4: Commit**

```bash
git add app/concerts/2025/page.tsx
git commit -m "chore: 2025年演奏会ページのデバッグログを削除"
```

- [ ] **Step 5: ユーザーにブラウザ確認を依頼する**

`pnpm dev` を起動し、以下の観点でユーザーに目視確認を依頼する（Playwright MCP は使用しない）:

- トップ: フォント（英字がセリフの Playfair Display、日本語が Noto Sans JP）、Hero の新エントランス、装飾が減って落ち着いたか
- `/concerts` と `/about`: PageHero 化後も見た目が以前と同等か（ミニアイコンのパルス停止以外は同一のはず）
- `/concerts/2025`: フォント変更の影響でレイアウト崩れがないか
- Footer: ウォームダークトーンの見え方、Instagram リンクのみになっているか
- キーボード（Tab）操作でフォーカスリングが見えるか
