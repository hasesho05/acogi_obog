# パッケージアップデート報告書

**日付**: 2026年1月17日
**作業内容**: 全パッケージのメジャーアップデート（Next.js 16 / React 19 対応）

---

## 概要

Next.js 16 および React 19 のリリースに伴い、プロジェクトの全パッケージを最新バージョンにアップデートした。

---

## 更新パッケージ一覧

### Dependencies

| パッケージ | 旧バージョン | 新バージョン | 備考 |
|------------|-------------|-------------|------|
| next | 15.4.5 | **16.1.2** | メジャーアップデート |
| react | 18.3.1 | **19.2.3** | メジャーアップデート |
| react-dom | 18.3.1 | **19.2.3** | メジャーアップデート |
| motion | 12.23.12 | 12.26.2 | framer-motionから移行 |
| lucide-react | 0.536.0 | 0.562.0 | |
| @tabler/icons-react | 3.34.1 | 3.36.1 | |
| tailwind-merge | 3.3.1 | 3.4.0 | |

### DevDependencies

| パッケージ | 旧バージョン | 新バージョン |
|------------|-------------|-------------|
| @types/node | 20 | 25 |
| @types/react | 19.1.9 | 19.2.8 |
| @playwright/test | 1.55.0 | 1.57.0 |
| tw-animate-css | 1.3.6 | 1.4.0 |

### 削除パッケージ

| パッケージ | 理由 |
|------------|------|
| framer-motion | `motion`パッケージに統合（軽量版） |

---

## 主な変更点

### 1. framer-motion → motion への移行

`framer-motion`パッケージは`motion`パッケージの旧名称。新しい軽量版の`motion`に統一した。

**インポート文の変更**:
```typescript
// 旧
import { motion } from "framer-motion";

// 新
import { motion } from "motion/react";
```

**対象ファイル**:
- `components/ui/optimized-gallery.tsx`
- `components/ui/typewriter-effect-lines.tsx`
- `components/ui/video-slider.tsx`
- `components/ui/lazy-image.tsx`
- `components/ui/schedule-timeline.tsx`
- `components/ui/images-slider.tsx`
- `components/ui/timeline.tsx`
- `components/ui/parallax-scroll.tsx`
- `components/ui/typewriter-effect.tsx`
- `components/features/home/HeroSection/VideoBackground.tsx`
- `components/features/home/HeroSection/HeroContent.tsx`
- `components/features/home/HeroSection/useHeroAnimation.ts`
- `components/features/home/HeroSection/HeroOverlay.tsx`
- `components/features/home/HeroSection/LoadingScreen.tsx`
- `components/features/home/HeroSection/HeroUI.tsx`

### 2. ビルド時の注意事項

Next.js 16 では、ビルド時に`NODE_ENV`が正しく設定されていないとエラーが発生する。

**解決策**:
```bash
# ビルドコマンド
NODE_ENV=production pnpm build

# または NODE_ENV をunset
unset NODE_ENV && pnpm build
```

Cloudflare Pages等のCI環境では、環境変数に`NODE_ENV=production`を設定することを推奨。

---

## Static Export について

### 現在の設定

`next.config.ts`で`output: 'export'`を使用し、静的HTMLを生成している。

```typescript
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  distDir: 'out',
};
```

### Static Export の制限

| 機能 | 利用可否 |
|------|----------|
| API Routes (`/api/*`) | ❌ |
| Server Actions | ❌ |
| サーバーサイドでのfetch | ❌ |
| Middleware | ❌ |
| 動的ルート（事前生成不可） | ❌ |

### 動的機能が必要になった場合

1. `next.config.ts`から`output: 'export'`を削除
2. `@cloudflare/next-on-pages`を導入

```bash
pnpm add -D @cloudflare/next-on-pages
```

---

## デプロイ設定

### Cloudflare Pages

現在の設定で引き続き動作する。

| 項目 | 値 |
|------|-----|
| ビルドコマンド | `NODE_ENV=production pnpm build` |
| 出力ディレクトリ | `out` |
| Node.jsバージョン | 20以上推奨 |

### 環境変数（推奨）

```
NODE_ENV=production
```

---

## 参考リンク

- [Next.js 16 global-error issue #85668](https://github.com/vercel/next.js/issues/85668)
- [Motion (framer-motion) Documentation](https://motion.dev/)
- [Next.js Static Exports](https://nextjs.org/docs/app/guides/static-exports)
- [@cloudflare/next-on-pages](https://github.com/cloudflare/next-on-pages)

---

## 検証結果

- [x] `pnpm install` - 成功
- [x] `pnpm build` - 成功（NODE_ENV=production）
- [x] `pnpm dev` - 成功
- [x] Static Export (`out/`ディレクトリ生成) - 成功
