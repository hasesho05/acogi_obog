/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 静的エクスポートを有効
  distDir: 'out',    // 出力ディレクトリを指定
  images: {
    unoptimized: true, // 画像最適化を無効（静的サイト用）
  },
  trailingSlash: true,
};

module.exports = nextConfig;