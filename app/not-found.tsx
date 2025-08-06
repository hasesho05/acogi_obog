export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[--color-primary]">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[--color-secondary] mb-4">404</h1>
        <p className="text-lg text-[--color-secondary] mb-8">ページが見つかりません</p>
        <a 
          href="/" 
          className="inline-block px-6 py-3 bg-[--color-secondary] text-white rounded-lg hover:bg-[--color-dark] transition-colors"
        >
          ホームに戻る
        </a>
      </div>
    </div>
  );
}