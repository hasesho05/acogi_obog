# Next.js 15 コーディング規約
## アコースティックギターサークル演奏会サイト

このドキュメントは、アコースティックギターサークルの演奏会ページを開発するためのコーディング規約を定めたものです。

## 🎯 プロジェクト概要

- **目的**: アコースティックギターサークルの演奏会情報を提供するWebサイト
- **認証**: ユーザー登録・ログイン機能は実装しない
- **アーキテクチャ**: ドメイン駆動設計（DDD）を採用
- **フレームワーク**: Next.js 15 (App Router)
- **パッケージマネージャー**: pnpm

## 📁 ディレクトリ構成（DDD準拠）

```
├── app/                    # App Router
│   ├── page.tsx           # トップページ
│   ├── concerts/          # 演奏会関連ページ
│   │   ├── page.tsx
│   │   └── [id]/
│   │       └── page.tsx
│   ├── about/             # サークル紹介
│   │   └── page.tsx
│   └── layout.tsx
├── components/            # UIコンポーネント
│   ├── ui/               # 汎用UIコンポーネント
│   ├── features/         # 機能別コンポーネント
│   │   ├── concert/      # 演奏会関連
│   │   ├── member/       # メンバー関連
│   │   └── performance/  # 演奏関連
│   └── layout/           # レイアウト関連
├── domain/               # ドメイン層
│   ├── entities/         # エンティティ・型定義
│   │   ├── concert.ts    # 演奏会関連の型
│   │   ├── member.ts     # メンバー関連の型
│   │   ├── performance.ts # 演奏関連の型
│   │   └── component.ts  # コンポーネント用の型
│   ├── repositories/     # リポジトリインターフェース
│   └── services/         # ドメインサービス
├── infrastructure/       # インフラ層
│   ├── repositories/     # リポジトリ実装
│   └── external/         # 外部API等
├── application/          # アプリケーション層
│   ├── usecases/         # ユースケース
│   └── services/         # アプリケーションサービス
└── lib/                  # ユーティリティ・設定
    ├── utils.ts
    ├── dal.ts            # Data Access Layer
    └── constants.ts
```

## 🎨 デザインシステム

### カラーパレット
```css
:root {
  --color-primary: #f2ece7;     /* メインカラー1（背景・ベース） */
  --color-secondary: #9f8f7c;   /* メインカラー2（テキスト・枠線） */
  --color-tertiary: #ede5d8;    /* メインカラー3（セクション背景） */
  --color-accent: #6a8359;      /* アクセントカラー（差し色程度） */
}
```

## 🧩 コンポーネント設計規約

### 1. 関数宣言ルール
```typescript
// ❌ 禁止: function宣言
function MyComponent() {
  return <div>Hello</div>;
}

// ✅ 推奨: アロー関数のみ
const MyComponent = () => {
  return <div>Hello</div>;
};
```

### 2. 引数の受け取り方
```typescript
// ❌ 禁止: 引数の展開
const MyComponent = ({ title, description, isVisible }: {
  title: string;
  description: string;
  isVisible: boolean;
}) => {
  // ...
};

// ✅ 推奨: インライン型定義
const MyComponent = (props: {
  title: string;
  description: string;
  isVisible: boolean;
}) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </div>
  );
};


// components/MyComponent.tsx
import type { ComponentProps } from '@/domain/entities/component';

const MyComponent = (props: ComponentProps) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </div>
  );
};
```

### 3. 返り値の型宣言
```typescript
// ❌ 不要: 返り値の型宣言
const MyComponent = (): JSX.Element => {
  return <div>Hello</div>;
};

// ✅ 推奨: 返り値の型宣言なし
const MyComponent = () => {
  return <div>Hello</div>;
};
```

### 4. Server Component vs Client Component

#### Server Component（デフォルト）
```typescript
// domain/entities/concert.ts
export type Concert = {
  id: string;
  title: string;
  date: string;
  venue: string;
  description: string;
};

// app/concerts/page.tsx
import { getConcerts } from '@/lib/dal';
import type { Concert } from '@/domain/entities/concert';

type ConcertsPageProps = {
  concerts: Concert[];
};

const ConcertsPage = async () => {
  const concerts = await getConcerts();
  
  return (
    <div>
      {concerts.map((concert) => (
        <ConcertCard key={concert.id} concert={concert} />
      ))}
    </div>
  );
};

export default ConcertsPage;
```

#### Client Component
```typescript
'use client';

import { useState } from 'react';

// domain/entities/component.ts
export type InteractiveButtonProps = {
  label: string;
};

// components/ui/InteractiveButton.tsx
import type { InteractiveButtonProps } from '@/domain/entities/component';

const InteractiveButton = (props: InteractiveButtonProps) => {
  const [isClicked, setIsClicked] = useState(false);
  
  return (
    <button onClick={() => setIsClicked(!isClicked)}>
      {props.label} {isClicked ? '✓' : ''}
    </button>
  );
};

export default InteractiveButton;
```

## 🚀 Next.js 15 ベストプラクティス

### 1. ルートグループの正しい使用
```
❌ 間違い: /(admin)/page.tsx  # トップページと競合してエラー

✅ 正しい: 
├── app/
│   ├── page.tsx              # トップページ
│   ├── (dashboard)/          # ルートグループ
│   │   ├── concerts/
│   │   │   └── page.tsx      # /concerts
│   │   └── members/
│   │       └── page.tsx      # /members
│   └── (public)/
│       └── about/
│           └── page.tsx      # /about
```

### 2. データフェッチングはServer Componentで
```typescript
// ❌ 非推奨: useEffectでのデータフェッチ
'use client';
const BadComponent = () => {
  const [concerts, setConcerts] = useState([]);
  
  useEffect(() => {
    fetchConcerts().then(setConcerts);
  }, []);
  
  return <div>...</div>;
};

// ✅ 推奨: Server ComponentでのData Access Layer使用
// lib/dal.ts
export const getConcerts = async () => {
  // データベースからの取得処理
  const concerts = await db.concerts.findMany();
  return concerts;
};

// app/concerts/page.tsx
import { getConcerts } from '@/lib/dal';

const ConcertsPage = async () => {
  const concerts = await getConcerts();
  return <ConcertList concerts={concerts} />;
};
```

### 3. ストリーミングデータフェッチング
```typescript
// app/concerts/page.tsx
import { Suspense } from 'react';
import { ConcertList } from '@/components/features/concert/ConcertList';
import { ConcertListSkeleton } from '@/components/ui/skeletons';

const ConcertsPage = () => {
  return (
    <div>
      <h1>演奏会一覧</h1>
      <Suspense fallback={<ConcertListSkeleton />}>
        <ConcertList />
      </Suspense>
    </div>
  );
};

// components/features/concert/ConcertList.tsx
import { getConcerts } from '@/lib/dal';

const ConcertList = async () => {
  const concerts = await getConcerts();
  
  return (
    <div>
      {concerts.map((concert) => (
        <ConcertCard key={concert.id} concert={concert} />
      ))}
    </div>
  );
};
```

### 4. Server Actions の活用
```typescript
// app/contact/actions.ts
'use server';

export const submitContactForm = async (props: {
  name: string;
  email: string;
  message: string;
}) => {
  // サーバーサイドでの処理
  console.log('Contact form submitted:', props);
  // データベースへの保存など
};

// components/features/contact/ContactForm.tsx
import { submitContactForm } from '@/app/contact/actions';

const ContactForm = () => {
  return (
    <form action={submitContactForm}>
      <input name="name" placeholder="お名前" required />
      <input name="email" type="email" placeholder="メールアドレス" required />
      <textarea name="message" placeholder="メッセージ" required />
      <button type="submit">送信</button>
    </form>
  );
};
```

### 5. 動的ルーティングとSearchParamsの非同期処理
```typescript
// app/concerts/[id]/page.tsx
const ConcertDetailPage = async (props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
}) => {
  const params = await props.params;
  const searchParams = await props.searchParams;
  
  const concert = await getConcertById(params.id);
  const activeTab = searchParams.tab || 'overview';
  
  return (
    <div>
      <h1>{concert.title}</h1>
      <ConcertTabs activeTab={activeTab} />
    </div>
  );
};

// components/features/concert/ConcertTabs.tsx
'use client';

import { useSearchParams } from 'next/navigation';

const ConcertTabs = (props: { activeTab: string }) => {
  // Client Componentでも非同期で取得
  const searchParams = useSearchParams();
  
  return (
    <div>
      {/* タブ実装 */}
    </div>
  );
};
```

## 🎭 Aceternity UI の使用

Aceternity UIはShadcn UIと併用可能なアニメーション効果に特化したコンポーネントライブラリです。

### インストール方法

#### 1. Shadcn CLIを使用（推奨）
```bash
# 個別コンポーネントの追加
npx shadcn@latest add https://ui.aceternity.com/registry/hero-parallax.json
npx shadcn@latest add https://ui.aceternity.com/registry/bento-grid.json
npx shadcn@latest add https://ui.aceternity.com/registry/floating-navbar.json
```

### 使用例
```typescript
// domain/entities/concert.ts
export type Concert = {
  id: string;
  title: string;
  thumbnail: string;
  link: string;
};

export type ConcertGridItem = {
  id: string;
  title: string;
  description: string;
  header: React.ReactNode;
};

// components/ui/hero-section.tsx
import { HeroParallax } from '@/components/ui/hero-parallax';
import type { Concert } from '@/domain/entities/concert';

type HeroSectionProps = {
  concerts: Concert[];
};

const HeroSection = (props: HeroSectionProps) => {
  return (
    <HeroParallax products={props.concerts} />
  );
};

// components/ui/concert-grid.tsx
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import type { ConcertGridItem } from '@/domain/entities/concert';

type ConcertGridProps = {
  concerts: ConcertGridItem[];
};

const ConcertGrid = (props: ConcertGridProps) => {
  return (
    <BentoGrid className="max-w-4xl mx-auto">
      {props.concerts.map((concert) => (
        <BentoGridItem
          key={concert.id}
          title={concert.title}
          description={concert.description}
          header={concert.header}
        />
      ))}
    </BentoGrid>
  );
};
```

## 🌊 Scroll-driven Animations

```typescript
// components/ui/scroll-animation.tsx
'use client';

import { useEffect, useRef } from 'react';

const ScrollAnimationWrapper = (props: {
  children: React.ReactNode;
  className?: string;
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    // Scroll-driven Animation
    element.animate(
      [
        { transform: 'translateY(100px)', opacity: 0 },
        { transform: 'translateY(0px)', opacity: 1 }
      ],
      {
        timeline: new ScrollTimeline({
          source: document.documentElement,
          orientation: 'block',
          scrollOffsets: [
            { target: element, edge: 'end', threshold: 0 },
            { target: element, edge: 'end', threshold: 1 }
          ]
        })
      }
    );
  }, []);
  
  return (
    <div ref={elementRef} className={props.className}>
      {props.children}
    </div>
  );
};

export default ScrollAnimationWrapper;
```

## 📝 ファイル命名規約

- **ページファイル**: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`
- **コンポーネント**: PascalCase (`ConcertCard.tsx`, `MemberList.tsx`)
- **型定義ファイル**: camelCase (`concert.ts`, `member.ts`, `component.ts`)
- **ユーティリティ**: camelCase (`dateUtils.ts`, `formatUtils.ts`)
- **定数**: SCREAMING_SNAKE_CASE (`API_ENDPOINTS.ts`)

## 🏗️ 型定義の例

```typescript
// domain/entities/concert.ts
export type Concert = {
  id: string;
  title: string;
  date: string;
  venue: string;
  description: string;
  thumbnail: string;
  ticketPrice: number;
  availableSeats: number;
};

export type ConcertStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

export type ConcertWithStatus = Concert & {
  status: ConcertStatus;
};

// domain/entities/member.ts
export type Member = {
  id: string;
  name: string;
  instrument: string;
  joinDate: string;
  profileImage: string;
  bio: string;
};

export type MemberRole = 'leader' | 'member' | 'newbie';

// domain/entities/performance.ts
export type Performance = {
  id: string;
  concertId: string;
  title: string;
  composer: string;
  performers: Member[];
  duration: number; // 分
  order: number;
};

// domain/entities/component.ts
export type PageProps = {
  children: React.ReactNode;
  className?: string;
};

export type ButtonProps = {
  variant: 'primary' | 'secondary' | 'outline';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};
```

## 🧪 推奨するディレクトリ例

```
src/components/features/concert/
├── ConcertCard.tsx           # 演奏会カード
├── ConcertList.tsx           # 演奏会一覧
├── ConcertDetail.tsx         # 演奏会詳細
├── ConcertSchedule.tsx       # 演奏スケジュール
└── ConcertReservation.tsx    # 予約機能（必要に応じて）
```

## ⚡ パフォーマンス最適化

1. **画像最適化**: Next.js の `Image` コンポーネントを使用
2. **Code Splitting**: 動的インポートを活用
3. **Streaming**: Suspense を積極的に使用
4. **Static Generation**: 可能な限り静的生成を利用

## 🔧 開発コマンド

```bash
# 開発サーバー起動
pnpm dev

# ビルド
pnpm build

# 本番サーバー起動
pnpm start

# リント
pnpm lint

# 型チェック
pnpm type-check

# Shadcn UIコンポーネント追加（pnpmプロジェクトでもOK）
npx shadcn@latest add button card

# Aceternity UIコンポーネント追加
npx shadcn@latest add https://ui.aceternity.com/registry/[component-name].json

# 新しい依存関係があれば pnpm でインストール
pnpm install
```



### UI関連
- **Shadcn UI**: 基本コンポーネント（Button, Card, Form等）
- **Aceternity UI**: アニメーション効果コンポーネント（HeroParallax, BentoGrid等）
- **Tailwind CSS**: スタイリング
- **Framer Motion**: アニメーション

