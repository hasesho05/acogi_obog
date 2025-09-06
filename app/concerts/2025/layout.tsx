import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "龍谷大学アコースティックギターサークル OBOG演奏会 2025",
  description: "2025年10月12日(日)開催！龍谷大学アコースティックギターサークルOBOG演奏会",
  keywords: ["龍谷大学", "アコースティックギター", "OBOG演奏会"],
  authors: [{ name: "龍谷大学アコースティックギターサークル" }],
  openGraph: {
    title: "龍谷大学アコースティックギターサークル OBOG演奏会 2025",
    description: "2025年10月12日(日)開催！龍谷大学アコースティックギターサークルOBOG演奏会",
    url: "/live/2025",
    siteName: "龍谷大学アコースティックギターサークル OBOG演奏会 2025",
    images: [
      {
        url: "/ogp2.png",
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
    description: "2025年10月12日(日)開催！龍谷大学アコースティックギターサークルOBOG演奏会",
    images: ["/ogp2.png"],
  },
};

export default function Live2025Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}