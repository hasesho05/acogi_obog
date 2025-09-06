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
  title: "龍谷大学アコースティックギターサークル",
  description: "龍谷大学アコースティックギターサークルの公式サイト。演奏会情報、メンバー紹介、活動内容などをご紹介しています。",
  keywords: ["龍谷大学", "アコースティックギター", "サークル", "音楽", "学生"],
  authors: [{ name: "龍谷大学アコースティックギターサークル" }],
  openGraph: {
    title: "龍谷大学アコースティックギターサークル",
    description: "龍谷大学アコースティックギターサークルの公式サイト。演奏会情報、メンバー紹介、活動内容などをご紹介しています。",
    url: "/",
    siteName: "龍谷大学アコースティックギターサークル",
    images: [
      {
        url: "/ogp2.png",
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
    description: "龍谷大学アコースティックギターサークルの公式サイト。演奏会情報、メンバー紹介、活動内容などをご紹介しています。",
    images: ["/ogp2.png"],
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
