import Link from "next/link";
import { Instagram, Mail } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-neutral-900 text-white mt-16" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2">
          {/* Brand */}
          <div>
            <Link href="/" className="flex flex-col border-none [&.active]:border-none">
              <h2 className="text-lg font-semibold tracking-wide">龍谷大学アコギサークル</h2>
              <p className="mt-3 text-sm text-neutral-300">
                OBOG演奏会の情報を発信しています。
              </p>
            </Link>
          </div>

          {/* Quick Nav */}
          <nav aria-label="フッターナビ" className="grid grid-cols-2 gap-6">

            <div>
              <h3 className="text-sm font-semibold text-neutral-200">リンク</h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link href="/about" className="hover:text-secondary/90 underline-offset-2 hover:underline">このサイトについて</Link>
                </li>
                <li>
                  <Link href="/concerts/2025" className="hover:text-secondary/90 underline-offset-2 hover:underline">2025年演奏会</Link>
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
};

export default Footer;