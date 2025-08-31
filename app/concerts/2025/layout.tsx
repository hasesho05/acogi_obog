import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "龍谷大学アコースティックギターサークル OBOG演奏会 2025",
  description: "2025年10月12日(日)開催！龍谷大学アコースティックギターサークルOBOGによる特別演奏会。Second Roomsにて懐かしの楽曲をお届けします。",
  keywords: ["龍谷大学", "アコースティックギター", "OBOG演奏会", "コンサート", "音楽", "Second Rooms"],
  authors: [{ name: "龍谷大学アコースティックギターサークル" }],
  openGraph: {
    title: "龍谷大学アコースティックギターサークル OBOG演奏会 2025",
    description: "2025年10月12日(日)開催！龍谷大学アコースティックギターサークルOBOGによる特別演奏会。Second Roomsにて懐かしの楽曲をお届けします。",
    url: "/live/2025",
    siteName: "龍谷大学アコースティックギターサークル OBOG演奏会 2025",
    images: [
      {
        url: "/ogp.png",
        width: 1200,
        height: 630,
        alt: "龍谷大学アコースティックギターサークル OBOG演奏会 2025",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "龍谷大学アコースティックギターサークル OBOG演奏会 2025",
    description: "2025年10月12日(日)開催！龍谷大学アコースティックギターサークルOBOGによる特別演奏会。Second Roomsにて懐かしの楽曲をお届けします。",
    images: ["/ogp.png"],
  },
};

export default function Live2025Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}