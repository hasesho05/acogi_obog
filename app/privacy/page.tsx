import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー | 龍谷大学アコースティックギターサークル",
  description:
    "アクセス解析、広告効果測定、Cookie等の利用についてのご案内です。",
};

const PrivacyPage = () => {
  return (
    <main className="bg-primary px-4 py-20">
      <article className="mx-auto max-w-3xl">
        <p className="font-body text-xs uppercase tracking-[0.35em] text-secondary">
          Privacy Policy
        </p>
        <h1 className="mt-4 font-display text-4xl text-dark">
          プライバシーポリシー
        </h1>

        <div className="mt-10 space-y-8 font-body text-sm leading-7 text-dark/75">
          <section>
            <h2 className="font-display text-2xl text-dark">アクセス解析</h2>
            <p className="mt-3">
              当サイトでは、利用状況の把握とサイト改善のため、Google Analytics
              を利用する場合があります。
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-dark">広告効果測定</h2>
            <p className="mt-3">
              当サイトでは、Google広告およびMeta広告の計測タグを利用し、広告からの
              アクセスや問い合わせ等の成果を測定する場合があります。
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-dark">Cookie等の利用</h2>
            <p className="mt-3">
              当サイトでは、Cookie、ローカルストレージ、その他類似技術を利用して、
              アクセス解析、広告効果測定、流入元情報の保存を行う場合があります。
              ブラウザの設定によりCookieを無効化できますが、一部機能が利用できない
              場合があります。
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-dark">お問い合わせ先</h2>
            <p className="mt-3">
              個人情報の取り扱いに関するお問い合わせは、
              <a
                href="https://www.instagram.com/acoustic_concert_obog"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary underline-offset-2 hover:underline"
              >
                Instagram
              </a>
              からご連絡ください。
            </p>
          </section>
        </div>
      </article>
    </main>
  );
};

export default PrivacyPage;
