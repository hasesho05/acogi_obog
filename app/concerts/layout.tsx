import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "演奏会アーカイブ | 龍谷大学アコースティックギターサークル",
  description:
    "龍谷大学アコースティックギターサークルOBOG演奏会のアーカイブ。過去の演奏会の記録とこれからの予定をご覧いただけます。",
  keywords: ["龍谷大学", "アコースティックギター", "OBOG演奏会", "アーカイブ"],
  authors: [{ name: "龍谷大学アコースティックギターサークル" }],

  openGraph: {
    title: "演奏会アーカイブ | 龍谷大学アコースティックギターサークル",
    description:
      "龍谷大学アコースティックギターサークルOBOG演奏会のアーカイブ。過去の演奏会の記録とこれからの予定。",
    url: "https://acogi-obog.pages.dev/concerts/",
    siteName: "龍谷大学アコースティックギターサークル",
    locale: "ja_JP",
    type: "website",
  },
};

const ConcertsLayout = (props: Readonly<{ children: React.ReactNode }>) => {
  return <>{props.children}</>;
};

export default ConcertsLayout;
