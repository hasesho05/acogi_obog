# React パフォーマンス最適化ガイド

このドキュメントは、今回のトップページ最適化で何をしたのかを初心者向けに解説します。

---

## 目次

1. [そもそもなぜ重かったのか？](#1-そもそもなぜ重かったのか)
2. [解決策1: Dynamic Import（遅延読み込み）](#2-解決策1-dynamic-import遅延読み込み)
3. [解決策2: Lazy State Init（遅延初期化）](#3-解決策2-lazy-state-init遅延初期化)
4. [解決策3: memo化（再レンダリング防止）](#4-解決策3-memo化再レンダリング防止)
5. [解決策4: CSSアニメーションへの置き換え](#5-解決策4-cssアニメーションへの置き換え)
6. [解決策5: content-visibility](#6-解決策5-content-visibility)
7. [まとめ](#7-まとめ)

---

## 1. そもそもなぜ重かったのか？

### 問題の本質

トップページには以下のような「重い」コンポーネントがありました：

```
FallingLeaves     → 30枚の葉っぱが同時にアニメーション
AuroraBackground  → 5つのオーロラが動き続ける
FloatingOrbs      → 7つの光の球が浮遊
AnniversaryBadge  → 12個のパーティクル + 複雑なSVGアニメーション
```

### なぜこれが問題なのか？

```
ページを開く
    ↓
すべてのJSファイルをダウンロード（時間かかる）
    ↓
すべてのコンポーネントを一度に計算（CPUに負荷）
    ↓
すべてのアニメーションを同時に開始（GPUに負荷）
    ↓
ページが重く感じる
```

要するに「最初に全部やろうとしすぎ」が問題でした。

---

## 2. 解決策1: Dynamic Import（遅延読み込み）

### 問題

```tsx
// 悪い例：すべてを最初に読み込む
import FallingLeaves from "./FallingLeaves";
import AuroraBackground from "./AuroraBackground";
import FloatingOrbs from "./FloatingOrbs";
```

この書き方だと、ページを開いた瞬間に**すべてのコンポーネントのコード**をダウンロードします。

### 解決策

```tsx
// 良い例：必要になったら読み込む
import dynamic from "next/dynamic";

const FallingLeaves = dynamic(
  () => import("./FallingLeaves"),
  { ssr: false }  // サーバーでは読み込まない
);
```

### イメージで理解

```
【普通のimport】
┌─────────────────────────────────────────┐
│ ページ読み込み開始                        │
│ ├── HeroSection をダウンロード           │
│ ├── FallingLeaves をダウンロード ← 重い！ │
│ ├── AuroraBackground をダウンロード       │
│ └── FloatingOrbs をダウンロード           │
│                                          │
│ ※全部揃ってから画面表示 = 遅い           │
└─────────────────────────────────────────┘

【dynamic import】
┌─────────────────────────────────────────┐
│ ページ読み込み開始                        │
│ └── HeroSection をダウンロード           │
│                                          │
│ ※まず画面表示 = 速い！                   │
│                                          │
│ 画面表示後...                            │
│ ├── FallingLeaves をダウンロード         │
│ ├── AuroraBackground をダウンロード       │
│ └── FloatingOrbs をダウンロード           │
└─────────────────────────────────────────┘
```

### ポイント

- `ssr: false` = サーバー側では読み込まない（クライアントのみ）
- 見た目には影響なし、でも体感速度が上がる

---

## 3. 解決策2: Lazy State Init（遅延初期化）

### 問題

```tsx
// 悪い例
const [leaves, setLeaves] = useState<LeafData[]>([]);

useEffect(() => {
  setLeaves(generateLeaves(30)); // 30枚の葉を計算
}, []);
```

この書き方の問題点：
1. 最初に空の配列 `[]` を作成
2. コンポーネントが表示された後で `generateLeaves` を実行
3. 新しい配列をセットして**再レンダリング**が発生

### 解決策

```tsx
// 良い例
const [leaves] = useState(() => generateLeaves(15));
//                        ↑ 関数を渡す！
```

### イメージで理解

```
【悪い例：useEffect パターン】
1回目レンダリング: leaves = []        ← 空で描画
2回目レンダリング: leaves = [葉1, 葉2, ...] ← また描画し直し

【良い例：関数を渡すパターン】
1回目レンダリング: leaves = [葉1, 葉2, ...] ← 最初から完成形
```

### ポイント

- `useState(値)` → 毎回その値で初期化しようとする
- `useState(() => 値)` → 最初の1回だけ関数を実行して初期化
- 計算が重い場合は必ず関数パターンを使う

---

## 4. 解決策3: memo化（再レンダリング防止）

### 問題

```tsx
// 悪い例
const Leaf = (props: { leaf: LeafData }) => {
  return <motion.div>...</motion.div>;
};
```

親コンポーネントが再レンダリングされると、**すべての子コンポーネントも再レンダリング**されます。
15枚の葉があれば、15回無駄な計算が走ります。

### 解決策

```tsx
// 良い例
import { memo } from "react";

const Leaf = memo((props: { leaf: LeafData }) => {
  return <motion.div>...</motion.div>;
});
```

### イメージで理解

```
【memoなし】
親が更新される
  ├── 葉1 を再計算 ← 無駄！
  ├── 葉2 を再計算 ← 無駄！
  ├── 葉3 を再計算 ← 無駄！
  └── ... 15回繰り返し

【memoあり】
親が更新される
  ├── 葉1: propsが同じなのでスキップ ← 高速
  ├── 葉2: propsが同じなのでスキップ
  ├── 葉3: propsが同じなのでスキップ
  └── ... 何もしない
```

### ポイント

- `memo` = 「propsが変わってなければ再描画しない」
- 同じコンポーネントがたくさんある場合に特に効果的
- 使いすぎても害はないが、効果があるのは「重い」コンポーネント

---

## 5. 解決策4: CSSアニメーションへの置き換え

### 問題

```tsx
// 悪い例：JavaScript（Motionライブラリ）でアニメーション
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 2 }}
>
```

Motion（Framer Motion）は高機能だが、その分：
- JavaScriptの計算が必要
- バンドルサイズが増える（ライブラリを読み込む）

### 解決策

```tsx
// 良い例：CSSでアニメーション
<div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
```

```css
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fade-in 2s ease-out forwards;
}
```

### イメージで理解

```
【Motion（JavaScript）】
CPU: アニメーションの計算を毎フレーム実行
メモリ: ライブラリのコードを保持
結果: 複雑なアニメーションは得意だが重い

【CSSアニメーション】
GPU: ブラウザが最適化して実行
メモリ: 追加のJSコード不要
結果: シンプルなアニメーションなら圧倒的に軽い
```

### 使い分けの目安

| アニメーション種類 | おすすめ |
|------------------|---------|
| フェードイン/アウト | CSS |
| 単純な移動・回転 | CSS |
| ホバーエフェクト | CSS |
| スクロール連動 | Motion |
| 複雑なシーケンス | Motion |
| ジェスチャー対応 | Motion |

---

## 6. 解決策5: content-visibility

### 問題

画面に見えていないセクション（スクロールしないと見えない部分）も、
最初からすべて計算・描画されている。

### 解決策

```css
.content-visibility-auto {
  content-visibility: auto;
  contain-intrinsic-size: auto 500px;
}
```

```tsx
<section className="content-visibility-auto">
  {/* このセクションは画面外なら描画をスキップ */}
</section>
```

### イメージで理解

```
【content-visibility なし】
┌──────────────────┐
│ Hero（見える）    │ ← 描画する
│                  │
├──────────────────┤
│ Concert（見える） │ ← 描画する
│                  │
├─ ─ ─ ─ ─ ─ ─ ─ ─│ ← 画面の端
│ Social（見えない）│ ← でも描画する（無駄！）
│                  │
└──────────────────┘

【content-visibility: auto】
┌──────────────────┐
│ Hero（見える）    │ ← 描画する
│                  │
├──────────────────┤
│ Concert（見える） │ ← 描画する
│                  │
├─ ─ ─ ─ ─ ─ ─ ─ ─│ ← 画面の端
│ Social（見えない）│ ← スキップ！（高速）
│                  │
└──────────────────┘
          ↓
     スクロールすると...
          ↓
│ Social（見える）  │ ← このとき初めて描画
```

### ポイント

- `contain-intrinsic-size: auto 500px` = スキップ中の仮の高さ
- スクロールすると自動的に描画される
- ユーザーには違いがわからない

---

## 7. まとめ

### 今回やったこと一覧

| 問題 | 解決策 | 効果 |
|-----|-------|-----|
| 全部一度に読み込む | Dynamic Import | 初期ロード高速化 |
| 無駄な計算が走る | Lazy State Init | 初期化コスト削減 |
| 子が全部再描画 | memo化 | CPU負荷削減 |
| JSでアニメーション | CSS化 | バンドル削減 |
| 見えない部分も描画 | content-visibility | レンダリング高速化 |

### 覚えておくべき原則

```
1. 必要になるまで読み込まない（Dynamic Import）
2. 必要になるまで計算しない（Lazy Init）
3. 変わってないものは再計算しない（memo）
4. ブラウザに任せられるものは任せる（CSS）
5. 見えないものは描画しない（content-visibility）
```

### 参考リンク

- [Vercel React Best Practices](https://vercel.com/blog/how-we-optimized-package-imports-in-next-js)
- [Next.js Dynamic Import](https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading)
- [React memo](https://react.dev/reference/react/memo)
- [content-visibility (MDN)](https://developer.mozilla.org/ja/docs/Web/CSS/content-visibility)
