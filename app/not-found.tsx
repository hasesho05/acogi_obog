export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f2ece7]">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#9f8f7c] mb-4">404</h1>
        <p className="text-lg text-[#9f8f7c] mb-8">ページが見つかりません</p>
        <a 
          href="/" 
          className="inline-block px-6 py-3 bg-[#6a8359] text-white rounded-lg hover:bg-[#5a7249] transition-colors"
        >
          ホームに戻る
        </a>
      </div>
    </div>
  );
}