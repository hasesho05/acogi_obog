import type { Metadata } from "next";

export const metadata: Metadata = {
  // ページ単位でも明示しておくと堅い
  metadataBase: new URL("https://acogi-obog.pages.dev"),

  title: "龍谷大学アコースティックギターサークル OBOG演奏会 2025",
  description:
    "2025年10月12日(日)開催！龍谷大学アコースティックギターサークルOBOG演奏会",
  keywords: ["龍谷大学", "アコースティックギター", "OBOG演奏会"],
  authors: [{ name: "龍谷大学アコースティックギターサークル" }],

  openGraph: {
    title: "龍谷大学アコースティックギターサークル OBOG演奏会 2025",
    description:
      "2025年10月12日(日)開催！龍谷大学アコースティックギターサークルOBOG演奏会",
    // 実ルートに合わせて絶対URL
    url: "https://acogi-obog.pages.dev/concerts/2025/",
    siteName: "龍谷大学アコースティックギターサークル",
    images: [
      // 本命：横長（summary_large_image向け）
      {
        url: "https://acogi-obog.pages.dev/ogp_wide.png?v=20250906",
        width: 1200,
        height: 630,
        alt: "龍谷大学アコースティックギターサークル OBOG演奏会 2025",
      },
      // サブ：正方形
      {
        url: "https://acogi-obog.pages.dev/ogp2.png?v=20250906",
        width: 600,
        height: 600,
        alt: "龍谷大学アコースティックギターサークル OBOG演奏会 2025",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "龍谷大学アコースティックギターサークル OBOG演奏会 2025",
    description:
      "2025年10月12日(日)開催！龍谷大学アコースティックギターサークルOBOG演奏会",
    // 絶対URLを明示
    images: ["https://acogi-obog.pages.dev/ogp_wide.png?v=20250906"],
  },
};

export default function Live2025Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}