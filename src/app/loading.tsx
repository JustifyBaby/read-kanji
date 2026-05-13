"use client";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950">
      <div className="relative flex items-center justify-center w-64 h-64">
        {/* 背景の装飾的な円（ぼかし） */}
        <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl animate-pulse" />

        {/* 3つの回転する枠線 */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 border-2 border-slate-700/50 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] animate-spin-slow"
            style={{
              animationDuration: `${3 + i * 0.5}s`,
              animationDirection: i % 2 === 0 ? "normal" : "reverse",
              borderColor:
                i === 0 ? "#f8fafc" : i === 1 ? "#94a3b8" : "#475569",
            }}
          />
        ))}

        {/* 中央のテキスト */}
        <div className="relative flex flex-col items-center gap-2">
          <h2 className="text-white text-xl font-serif tracking-[0.2em] font-light">
            読込中・・・
          </h2>
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></span>
          </div>
        </div>
      </div>

      {/* 漢字アプリらしい一言メッセージ（ランダムにしても面白いですね） */}
      <p className="mt-8 text-slate-500 text-sm font-serif tracking-widest animate-pulse">
        漢字を準備しています...
      </p>
    </div>
  );
};

export default Loading;
