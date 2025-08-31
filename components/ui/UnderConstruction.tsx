import Link from "next/link";
import { Construction, ArrowRight } from "lucide-react";

const UnderConstruction = () => {

  return (
    <main className="relative flex min-h-[70vh] items-center justify-center px-6 py-24">
      <div className="max-w-2xl text-center">
        <div className="inline-flex items-center gap-3 rounded-full border border-secondary/20 bg-tertiary/50 px-4 py-2 text-secondary">
          <Construction className="h-4 w-4" />
          <span className="text-xs font-semibold tracking-wide">Under Construction</span>
        </div>

        <h1 className="mt-6 text-3xl md:text-5xl font-extrabold text-dark tracking-tight">
          このページは現在<strong className="text-secondary">工事中</strong>です
        </h1>
        <p className="mt-4 text-sm md:text-base text-neutral-600">
          準備が整い次第、公開します。<br className="hidden sm:block" />
          2025年OBOG演奏会の最新情報は下記よりご覧ください。
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/concerts/2025"
            className="inline-flex items-center gap-2 rounded-xl bg-secondary px-5 py-3 text-white shadow-md transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40"
          >
            2025年演奏会へ <ArrowRight className="h-4 w-4" />
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
};

export default UnderConstruction;