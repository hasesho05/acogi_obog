import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col bg-primary antialiased`}>
        <div className="flex-1">{props.children}</div>
        <Footer />
      </body>
    </html>
  );
}
