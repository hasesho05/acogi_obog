"use client";

// パフォーマンス最適化: Motionを削除してCSS animationのみ使用
const AuroraBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* ベースグラデーション */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-tertiary to-primary" />

      {/* オーロラレイヤー1 - オレンジ系 */}
      <div className="absolute inset-0 animate-fade-in" style={{ animationDelay: "0s" }}>
        <div
          className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full opacity-30 blur-[120px]"
          style={{
            background: "radial-gradient(circle, var(--color-secondary) 0%, transparent 70%)",
            animation: "aurora-drift-1 25s ease-in-out infinite",
          }}
        />
      </div>

      {/* オーロラレイヤー2 - アクセントオレンジ */}
      <div className="absolute inset-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <div
          className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full opacity-25 blur-[100px]"
          style={{
            background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
            animation: "aurora-drift-2 20s ease-in-out infinite",
          }}
        />
      </div>

      {/* オーロラレイヤー3 - グリーン差し色 */}
      <div className="absolute inset-0 animate-fade-in" style={{ animationDelay: "0.6s" }}>
        <div
          className="absolute bottom-0 left-1/3 w-[700px] h-[700px] rounded-full opacity-20 blur-[130px]"
          style={{
            background: "radial-gradient(circle, var(--color-green) 0%, transparent 70%)",
            animation: "aurora-drift-3 30s ease-in-out infinite",
          }}
        />
      </div>

      {/* オーロラレイヤー4 - ライトオレンジ */}
      <div className="absolute inset-0 animate-fade-in" style={{ animationDelay: "0.9s" }}>
        <div
          className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full opacity-20 blur-[80px]"
          style={{
            background: "radial-gradient(circle, var(--color-light) 0%, transparent 70%)",
            animation: "aurora-drift-4 22s ease-in-out infinite",
          }}
        />
      </div>

      {/* オーロラレイヤー5 - グリーンライト */}
      <div className="absolute inset-0 animate-fade-in" style={{ animationDelay: "1.2s" }}>
        <div
          className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] rounded-full opacity-15 blur-[100px]"
          style={{
            background: "radial-gradient(circle, var(--color-green-light) 0%, transparent 70%)",
            animation: "aurora-drift-5 28s ease-in-out infinite",
          }}
        />
      </div>

      {/* メッシュグラデーションオーバーレイ */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 20% 30%, rgba(212, 80, 44, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(45, 106, 79, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 40% 80%, rgba(224, 117, 72, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 60%, rgba(64, 145, 108, 0.08) 0%, transparent 50%)
          `,
        }}
      />

      {/* ノイズテクスチャオーバーレイ */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* アニメーション定義 */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 2s ease-out forwards;
          opacity: 0;
        }

        @keyframes aurora-drift-1 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(100px, 50px) scale(1.1);
          }
          50% {
            transform: translate(50px, 100px) scale(0.95);
          }
          75% {
            transform: translate(-50px, 50px) scale(1.05);
          }
        }

        @keyframes aurora-drift-2 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(-80px, 60px) scale(1.15);
          }
          66% {
            transform: translate(-40px, -40px) scale(0.9);
          }
        }

        @keyframes aurora-drift-3 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          20% {
            transform: translate(60px, -80px) scale(1.1);
          }
          40% {
            transform: translate(120px, -40px) scale(0.95);
          }
          60% {
            transform: translate(80px, 40px) scale(1.05);
          }
          80% {
            transform: translate(20px, 20px) scale(1);
          }
        }

        @keyframes aurora-drift-4 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(100px, -60px) scale(1.2);
          }
        }

        @keyframes aurora-drift-5 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(-60px, -40px) scale(1.1);
          }
          75% {
            transform: translate(40px, 60px) scale(0.95);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          @keyframes aurora-drift-1,
          @keyframes aurora-drift-2,
          @keyframes aurora-drift-3,
          @keyframes aurora-drift-4,
          @keyframes aurora-drift-5 {
            0%, 100% {
              transform: none;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default AuroraBackground;
