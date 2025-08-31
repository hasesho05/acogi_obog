# チケット: 共通Footerの実装 & ルート`app/page.tsx`の工事中ページ作成

## 概要

2025年演奏会LPの世界観に合わせ、サイト全体で共通利用する**暗い灰色×白文字**のFooterを新規実装する。あわせて、未完成のトップページ(`/`)に、LPと調和する**おしゃれな「工事中」表示**を実装する。

---

## 目的 / ゴール

* **ブランディング統一**: LPの暖色トーン（primary/secondary）に馴染む、落ち着いたダークフッターを全ページで共通化。
* **情報動線の確保**: 最低限のナビ・問い合わせ導線（Instagram等）をFooterに常設。
* **暫定トップの体裁**: ルート`/`で工事中を明示し、2025年LPへの遷移導線を配置。

---

## スコープ

* 新規: `components/layout/Footer.tsx`
* 既存改修: `app/layout.tsx`（共通Footerの読み込み）
* 新規: `app/page.tsx`（工事中ページ）
* オプション: `app/concerts/2025/layout.tsx`からは触らず、グローバルFooterでカバー

---

## 非スコープ（今回やらない）

* サイトマップ自動生成
* ダークモード切替（Footerは常にダークグレー）
* 国際化／多言語
* 詳細なSNS OG調整（既にLPで設定済の範囲外）

---

## デザイン要件

* 背景: **ダークグレー**（`bg-neutral-900` を基準）
* 文字色: **白**（`text-white`）
* アクセント: 既存テーマ`--color-secondary`をリンクホバーに薄く反映
* レイアウト: コンテナ中央寄せ（`max-w-6xl`, `mx-auto`, `px-4`）
* 余白: `py-10`以上、モバイル→デスクトップで段組（1→2/3カラム）
* アクセシビリティ: コントラスト比確保、`aria-label`、`sr-only`の利用

---

## 情報設計（Footer）

1. **ブランド/コピー**: サイト名 + サブコピー（短文）
2. **クイックナビ**（LP内アンカー想定）

   * 演奏会情報（`#event-info`）
   * 会場情報（`#venue`）
   * 写真（`#photos`）
   * 参加案内（`#cta`）
3. **SNS/問い合わせ**

   * Instagram（外部リンク）
   * メール（`mailto:`）
4. **リーガル**

   * コピーライト（年は自動）

> ルートではアンカーが未定のため、`/concerts/2025` へのリンクを優先し、LP内ではアンカーに自然遷移する設計にします。（相対リンクでOK）

---

## 実装詳細

### 1) 新規: `components/layout/Footer.tsx`

```tsx
// components/layout/Footer.tsx
import Link from "next/link";
import { Instagram, Mail } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-neutral-900 text-white mt-16" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <h2 className="text-lg font-semibold tracking-wide">龍谷大学アコースティックギターサークル</h2>
            <p className="mt-3 text-sm text-neutral-300">
              OBOG演奏会 2025 — あたたかなアコースティックの響きを、もう一度。
            </p>
          </div>

          {/* Quick Nav */}
          <nav aria-label="フッターナビ" className="grid grid-cols-2 gap-6 lg:col-span-2 lg:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-neutral-200">コンサート</h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link href="/concerts/2025#event-info" className="hover:text-secondary/90 underline-offset-2 hover:underline">
                    演奏会情報
                  </Link>
                </li>
                <li>
                  <Link href="/concerts/2025#venue" className="hover:text-secondary/90 underline-offset-2 hover:underline">
                    会場情報
                  </Link>
                </li>
                <li>
                  <Link href="/concerts/2025#photos" className="hover:text-secondary/90 underline-offset-2 hover:underline">
                    写真
                  </Link>
                </li>
                <li>
                  <Link href="/concerts/2025#cta" className="hover:text-secondary/90 underline-offset-2 hover:underline">
                    参加案内
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-neutral-200">リンク</h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link href="/about" className="hover:text-secondary/90 underline-offset-2 hover:underline">このサイトについて</Link>
                </li>
                <li>
                  <Link href="/concerts/2025" className="hover:text-secondary/90 underline-offset-2 hover:underline">2025年LP</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-neutral-200">お問い合わせ</h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-secondary/90 underline-offset-2 hover:underline"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-4 w-4" /> Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:contact@example.com"
                    className="inline-flex items-center gap-2 hover:text-secondary/90 underline-offset-2 hover:underline"
                  >
                    <Mail className="h-4 w-4" /> contact@example.com
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-neutral-400">
          <p>© {year} Ryukoku Acoustic Guitar Circle. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
```

> **注**: Instagramリンクと`mailto:`は後で実アカウントに差し替え。

---

### 2) 改修: `app/layout.tsx` に共通Footerを組み込み

```tsx
// app/layout.tsx（一部）
import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "龍谷大学アコースティックギターサークル",
  description: "Official site",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen flex flex-col bg-primary">
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
```

---

### 3) 新規: ルート`app/page.tsx`（工事中ページ）

* LPの暖色テーマと調和（やや控えめなモーション）
* 主要導線: **「2025年LPへ」ボタン**

```tsx
// app/page.tsx
import Link from "next/link";
import { Construction, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <main className="relative flex min-h-[70vh] items-center justify-center px-6 py-24">
      <div className="max-w-2xl text-center">
        <div className="inline-flex items-center gap-3 rounded-full border border-secondary/20 bg-tertiary/50 px-4 py-2 text-secondary">
          <Construction className="h-4 w-4" />
          <span className="text-xs font-semibold tracking-wide">Under Construction</span>
        </div>

        <h1 className="mt-6 text-3xl md:text-5xl font-extrabold text-dark tracking-tight">
          サイトは現在<strong className="text-secondary"> 工事中</strong>です
        </h1>
        <p className="mt-4 text-sm md:text-base text-neutral-600">
          準備が整い次第、トップページを公開します。<br className="hidden sm:block" />
          2025年OBOG演奏会の最新情報は下記よりご覧ください。
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/concerts/2025"
            className="inline-flex items-center gap-2 rounded-xl bg-secondary px-5 py-3 text-white shadow-md transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40"
          >
            2025年LPへ <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-xl border border-secondary/30 bg-white px-5 py-3 text-secondary shadow-sm transition hover:bg-tertiary/60"
          >
            このサイトについて
          </Link>
        </div>
      </div>

      {/* 背景の控えめな装飾 */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-40">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl" style={{ background: "radial-gradient(closest-side, rgba(224,117,72,.25), transparent)" }} />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl" style={{ background: "radial-gradient(closest-side, rgba(212,80,44,.25), transparent)" }} />
      </div>
    </main>
  );
}
```

---

## アンカーIDの補足（任意）

LP側セクションのルート要素に下記IDを付与すると、Footerのリンクがスムーズに動作します。

* `EventInformation`ルート要素: `id="event-info"`
* `VenueInformation`ルート要素: `id="venue"`
* `PastEventPhotos`ルート要素: `id="photos"`
* `CallToAction`ルート要素: `id="cta"`

※ 既存の`<section>`に`id`を追加するだけでOK。

---

## テスト観点（受け入れ条件）

* [ ] すべてのページ下部に共通Footerが表示される（`/`, `/concerts/2025`, `/about`）。
* [ ] Footerの背景は`#171717`（Tailwind `neutral-900`）、文字は白、リンクホバーでアクセント色が視認できる。
* [ ] タブキー操作でリンクにフォーカスリングが表示される。
* [ ] モバイル（375px）、タブレット（768px）、デスクトップ（1280px）で崩れない。
* [ ] ルート`/`に「工事中」表示があり、`/concerts/2025`へ遷移できる。
* [ ] 年号が自動で当年に更新される。
* [ ] Lighthouse アクセシビリティ≧ 95（ローカル測定目安）。

---

## リスク / 留意点

* ルート`/`のOGは未定：現状はメタ最小限。公開前にOG画像・文言の確定が必要。
* Instagram/メールの本番値差し替えを忘れないよう、環境変数化 or 定数ファイル化を検討。
* LP側アンカー未付与の場合、リンクは`/concerts/2025`トップに遷移（致命ではない）。

---

## 作業手順（チェックリスト）

1. `components/layout/Footer.tsx` を追加
2. `app/layout.tsx` に`<Footer/>`を組み込み
3. `app/page.tsx` を作成（工事中UI）
4. LP側セクションに`id`付与（任意）
5. 動作確認・Lighthouseチェック



## 完了の定義 (DoD)

* 受け入れ条件を満たし、`main`へマージ
* プレビュー環境でデザイン/動作を目視確認
* 連絡先リンクが有効（ダミーでない）

---

## 追加の改善余地（今後）

* フッターにミニスケジュール/開催日カウントダウンを設置
* SNSアイコンの明示（X/YouTubeの有無確認）
* 連絡先を`/contact`に一本化し、フォーム→メール送付に変更
