/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  // 静的エクスポート用の画像設定
  images: {
    unoptimized: true,
  },

  // トレイリングスラッシュ
  trailingSlash: true,

  // 出力ディレクトリ指定
  distDir: 'out',
};

export default nextConfig;
