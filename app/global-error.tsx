"use client";

const GlobalError = (props: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <html lang="ja">
      <body className="min-h-screen flex items-center justify-center bg-[--color-primary]">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-[--color-secondary] mb-4">
            エラーが発生しました
          </h1>
          <p className="text-[--color-secondary]/70 mb-6">
            申し訳ございません。予期しないエラーが発生しました。
          </p>
          <button
            type="button"
            onClick={() => props.reset()}
            className="px-6 py-3 bg-[--color-secondary] text-white rounded-lg hover:bg-[--color-dark] transition-colors"
          >
            もう一度試す
          </button>
        </div>
      </body>
    </html>
  );
};

export default GlobalError;
