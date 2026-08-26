import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const title = '龍谷大学アコースティックギターサークル OBOG演奏会 2026';
const description =
  '2026年11月14日(土) 11:30開演。龍谷大学アコースティックギターサークル OBOG演奏会 2026 特設ページ。会場などの詳細は決まり次第お知らせします。';
const ogImage = 'https://acogi-obog.pages.dev/images/ogp_live2026.jpg';

export const metadata: Metadata = {
  metadataBase: new URL('https://acogi-obog.pages.dev'),
  title,
  description,
  keywords: ['龍谷大学', 'アコースティックギター', 'OBOG演奏会'],
  authors: [{ name: '龍谷大学アコースティックギターサークル' }],
  openGraph: {
    title,
    description,
    url: 'https://acogi-obog.pages.dev/concerts/2026/',
    siteName: '龍谷大学アコースティックギターサークル',
    images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [ogImage],
  },
};

const Live2026Layout = (props: { children: ReactNode }) => {
  return <>{props.children}</>;
};

export default Live2026Layout;
