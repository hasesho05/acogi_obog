import type { Metadata } from "next";
import { Noto_Sans_JP, Playfair_Display } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import AnalyticsProvider from "@/components/providers/AnalyticsProvider";
import MotionProvider from "@/components/providers/MotionProvider";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://acogi-obog.pages.dev"),
  title: "龍谷大学アコースティックギターサークル",
  description:
    "龍谷大学アコースティックギターサークルの公式サイト。演奏会情報、メンバー紹介、活動内容などをご紹介しています。",
  openGraph: {
    title: "龍谷大学アコースティックギターサークル",
    description:
      "龍谷大学アコースティックギターサークルの公式サイト。演奏会情報、メンバー紹介、活動内容などをご紹介しています。",
    // ルートURL。各ページで上書き可
    url: "/",
    siteName: "龍谷大学アコースティックギターサークル",
    images: [
      // ★先頭＝本命（横長 1200x630 を推奨）
      {
        url: "https://acogi-obog.pages.dev/ogp_wide.png?v=20250906",
        width: 1200,
        height: 630,
        alt: "龍谷大学アコースティックギターサークル",
      },
      // サブ（正方形でもOK）
      {
        url: "https://acogi-obog.pages.dev/ogp2.png?v=20250906",
        width: 600,
        height: 600,
        alt: "龍谷大学アコースティックギターサークル",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "龍谷大学アコースティックギターサークル",
    description:
      "龍谷大学アコースティックギターサークルの公式サイト。演奏会情報、メンバー紹介、活動内容などをご紹介しています。",
    images: ["https://acogi-obog.pages.dev/ogp_wide.png?v=20250906"],
  },
};

export default function RootLayout(props: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${playfairDisplay.variable} ${notoSansJp.variable} min-h-screen flex flex-col bg-primary antialiased`}>
        <AnalyticsProvider />
        <MotionProvider>
          <div className="flex-1">{props.children}</div>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
