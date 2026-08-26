import Link from "next/link";
import { Instagram } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-16 bg-gradient-to-b from-dark to-[#5f2715] text-primary" role="contentinfo">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <h2 className="font-display text-lg font-semibold tracking-wide">龍谷大学アコギサークル</h2>
              <p className="mt-3 font-body text-sm text-primary/70 leading-relaxed">
                OBOG演奏会の情報を発信しています。
              </p>
            </Link>
          </div>

          {/* Quick Nav */}
          <nav aria-label="フッターナビ" className="grid grid-cols-2 gap-6">

            <div>
            <h3 className="font-body text-sm font-semibold text-primary/90">リンク</h3>
              <ul className="mt-3 space-y-2 font-body text-sm">
                <li>
                  <Link href="/about" className="text-primary/70 transition-colors hover:text-light underline-offset-2 hover:underline">このサイトについて</Link>
                </li>
                <li>
                  <Link href="/concerts" className="text-primary/70 transition-colors hover:text-light underline-offset-2 hover:underline">演奏会アーカイブ</Link>
                </li>
                <li>
                  <Link href="/concerts/2025" className="text-primary/70 transition-colors hover:text-light underline-offset-2 hover:underline">2025年演奏会</Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-primary/70 transition-colors hover:text-light underline-offset-2 hover:underline">プライバシーポリシー</Link>
                </li>
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
