import Link from "next/link";
import ThanksLeadTracker from "./ThanksLeadTracker";

const ThanksPage = () => {
  return (
    <main className="min-h-[70vh] bg-primary px-4 py-24">
      <ThanksLeadTracker />
      <section className="mx-auto max-w-3xl text-center">
        <p className="font-body text-xs uppercase tracking-[0.35em] text-secondary">
          Thank You
        </p>
        <h1 className="mt-4 font-display text-4xl text-dark md:text-5xl">
          送信ありがとうございました
        </h1>
        <p className="mx-auto mt-6 max-w-xl font-body text-sm leading-7 text-dark/70">
          内容を確認し、必要に応じて担当者よりご連絡します。
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex rounded-full bg-secondary px-6 py-3 font-body text-sm font-semibold text-white transition-colors hover:bg-secondary/90"
        >
          トップへ戻る
        </Link>
      </section>
    </main>
  );
};

export default ThanksPage;
