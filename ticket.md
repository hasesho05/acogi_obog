タイトル

セクション外枠固定＋中身のみCSSスクロールフェード化（Framer撤去）

背景 / 課題

各セクションを <ScrollTransition> で包み、y/scale/opacity を外枠ごと当てているため、「まるごと迫り上がる」印象が強くノイジー。

JS依存（framer-motion）を避け、CSSのみで穏やかな出現にしたい。

目的

セクションレイアウト（背景グラデ/余白/境界）は固定のまま、中身コンテンツのみを穏やかにフェードイン。

JSレス（CSSのみ）。対応ブラウザはスクロール連動、未対応は静的表示。

変更概要

Framer撤去（このページ限定）

app/concerts/2025/page.tsx から ScrollTransition の import とラップを削除。

CSSユーティリティ追加（app/globals.css）

.sr-section：セクションごとの view-timeline 宣言

.sr-reveal：単体要素のフェード＆ごく小さな上方向移動

.sr-stagger：子要素に段階的（stagger）フェードを適用

いずれも 外枠はtransformさせない 設計

各セクションへ適用

EventInformation.tsx / VenueInformation.tsx / CallToAction.tsx の <section> に .sr-section 付与

直下の大ブロック群やカード/グリッドへ .sr-stagger / .sr-reveal を付与

既存の fade-in-up は削除または置換

変更差分（抜粋）
1) app/concerts/2025/page.tsx
-import { ScrollTransition } from "@/components/features/home/ScrollTransition";

 const Live2025Page = () => {
   return (
     <main className="min-h-screen bg-primary">
       <HeroSection />
-      
-      <ScrollTransition>
-        <EventInformation />
-      </ScrollTransition>
-      
-      <ScrollTransition>
-        <VenueInformation />
-      </ScrollTransition>
-      
-      <ScrollTransition>
-        <PastEventPhotos />
-      </ScrollTransition>
-      
-      <ScrollTransition>
-        <CallToAction />
-      </ScrollTransition>
+      <EventInformation />
+      <VenueInformation />
+      <PastEventPhotos />
+      <CallToAction />
     </main>
   );
 };


（ScrollTransition.tsx 自体は他で未使用なら削除可）

2) app/globals.css（末尾あたりに追記）
/* ===== Section reveal (CSS-only) ===== */
@keyframes sr-reveal-up {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

@layer utilities {
  /* セクションの外枠は固定。view-timeline だけ宣言 */
  .sr-section {
    /* no transform here! */
  }

  /* スクロール連動が使える場合のみタイムラインを付与 */
}

/* Scroll-driven (progressive enhancement) */
@supports (animation-timeline: scroll()) {
  @layer utilities {
    .sr-section {
      view-timeline-name: --section;
      view-timeline-axis: block;
    }

    /* 単体要素の穏やかな出現 */
    .sr-reveal {
      opacity: 0;
      transform: translateY(8px);
      animation: sr-reveal-up 700ms var(--ease-fluid) both;
      animation-timeline: --section;
      animation-range: entry 10% cover 30%;
      will-change: opacity, transform;
    }

    /* 子要素を段階的に出す（直下の子のみ） */
    .sr-stagger > * {
      opacity: 0;
      transform: translateY(8px);
      animation: sr-reveal-up 700ms var(--ease-fluid) both;
      animation-timeline: --section;
      animation-range: entry 10% cover 30%;
      will-change: opacity, transform;
    }
    .sr-stagger > *:nth-child(2) { animation-delay: 80ms; }
    .sr-stagger > *:nth-child(3) { animation-delay: 160ms; }
    .sr-stagger > *:nth-child(4) { animation-delay: 240ms; }
    .sr-stagger > *:nth-child(5) { animation-delay: 320ms; }
  }
}

/* 未対応ブラウザ = 静的表示（違和感なし） */
@supports not (animation-timeline: scroll()) {
  @layer utilities {
    .sr-reveal,
    .sr-stagger > * { opacity: 1; transform: none; }
  }
}


既存の prefers-reduced-motion ブロックはこのままでOK（アニメ無効化）。

3) components/features/home/EventInformation.tsx
-  return (
-    <section id="event-info" className="relative py-16 md:py-24 px-4 md:px-8 overflow-hidden bg-gradient-to-b from-primary via-white to-white">
+  return (
+    <section
+      id="event-info"
+      className="relative py-16 md:py-24 px-4 md:px-8 overflow-hidden bg-gradient-to-b from-primary via-white to-white sr-section"
+    >
       <div className="relative max-w-5xl mx-auto">
         <div className="text-center mb-12">
           <SectionHeader ... />
         </div>

-        <div className="space-y-8">
+        <div className="space-y-8 sr-stagger">
           {/* 参加者向け重要情報カード */}
-          <div className="max-w-3xl mx-auto">
+          <div className="max-w-3xl mx-auto sr-reveal">
             <div className="bg-gradient-to-br from-secondary/5 to-accent/5 rounded-3xl p-8 md:p-10 border border-secondary/20">
               ...
-              <div className="grid md:grid-cols-2 gap-6 mb-8">
+              <div className="grid md:grid-cols-2 gap-6 mb-8 sr-stagger">
                 <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-sm">...</div>
                 <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-sm">...</div>
               </div>
               ...
             </div>
           </div>

           {/* 当日の流れ */}
-          <div className="max-w-3xl mx-auto">
+          <div className="max-w-3xl mx-auto sr-reveal">
             <div className="bg-white rounded-3xl shadow-lg p-8 md:p-10 border border-gray-100">
               ...
-              <div className="space-y-4">
+              <div className="space-y-4 sr-stagger">
                 <div className="flex gap-4 items-start">...</div>
                 <div className="flex gap-4 items-start">...</div>
                 <div className="flex gap-4 items-start">...</div>
                 <div className="flex gap-4 items-start">...</div>
                 <div className="flex gap-4 items-start">...</div>
               </div>
             </div>
           </div>

           {/* その他の情報 */}
-          <div className="max-w-3xl mx-auto">
+          <div className="max-w-3xl mx-auto sr-reveal">
             <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
               ...
             </div>
           </div>
         </div>
       </div>
     </section>

4) components/features/home/VenueInformation.tsx
-  return (
-    <section id="venue" className="relative py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-white to-primary overflow-hidden">
+  return (
+    <section
+      id="venue"
+      className="relative py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-white to-primary overflow-hidden sr-section"
+    >
      <SectionHeader ... />

-     <div className="space-y-12 md:space-y-16">
+     <div className="space-y-12 md:space-y-16 sr-stagger">
        <div className="max-w-5xl mx-auto space-y-8">
-         <div className="space-y-6 max-w-3xl mx-auto">
+         <div className="space-y-6 max-w-3xl mx-auto sr-reveal">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">...</div>

-           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
+           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sr-stagger">
              {venueFeatures.map(...)}
            </div>
          </div>

          <VenueInformationClient ... /> {/* 内部はそのままでもOK */}
        </div>
      </div>
    </section>

5) components/features/home/CallToAction.tsx
-  return (
-    <section id="cta" className="relative py-12 md:py-16 px-4 md:px-8 max-w-3xl mx-auto bg-gradient-to-b from-white via-primary/5 to-primary overflow-hidden">
+  return (
+    <section
+      id="cta"
+      className="relative py-12 md:py-16 px-4 md:px-8 max-w-3xl mx-auto bg-gradient-to-b from-white via-primary/5 to-primary overflow-hidden sr-section"
+    >
       <div className="relative max-w-5xl mx-auto">

-        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden fade-in-up animation-delay-200">
+        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden sr-reveal animation-delay-200">
          ...
         </div>

-        <div className="mt-8 text-center fade-in-up animation-delay-400">
+        <div className="mt-8 text-center sr-reveal animation-delay-400">
           ...
         </div>
       </div>
     </section>


既存の fade-in-up を sr-reveal に置換。animation-delay-XXX はそのまま活かして段階出現を調整できます。

受け入れ条件

 セクションの外枠（背景/余白/境界）は一切移動/拡大縮小しないこと（DevToolsで <section> 直下に transform が入らない）。

 コンテンツ（カード/行/グリッド要素）はスクロールイン時に0→1のフェード＋最大8pxの上方向移動で穏やかに出現する。

 @supports (animation-timeline: scroll()) 未対応ブラウザでは静的に即時表示され、レイアウトシフトが発生しない。

 prefers-reduced-motion ではアニメーションが無効。

 既存の ScrollTransition を削除/未使用にしたことでランタイムエラーがない。

 CLS/ラグが改善され、ページ全体が「迫り上がる」印象が消えている。

動作確認（手動）

最新Chrome/Edgeでスクロール → 各セクションの中身のみが順に出現する。

Safariで確認 → 未対応の場合でも静的表示で破綻なし。

OSのアクセシビリティで動きを減らすを有効 → アニメーション無効。

DevToolsの Performance/Rendering でレイアウトスラッシングがないことを確認。

影響範囲 / リスク

当該ページ内のアニメ表現が変更。Heroなど他箇所の framer-motion は未触。

ScrollTransition を他ページで使っていないかは念のため確認。

備考

ステップをさらに落ち着かせたい場合は、.sr-reveal の translateY(8px) を 4px に、700ms を 500–600ms に調整。

グリッドの1要素ずつをさらに細かく遅延したい場合は、既存の animation-delay-XXX ユーティリティを併用可。