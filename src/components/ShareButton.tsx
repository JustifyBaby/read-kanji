"use client";
import { Button } from "./ui/button";
import { Send, MessageCircle } from "lucide-react";

interface ShareProps {
  kanji: string;
  read: string;
  authorName: string;
}

export default function ShareButtons({ kanji, read, authorName }: ShareProps) {
  // 共通の共有テキスト
  const text = `【変な熟語が生まれました】\n\n「${kanji}」\n（よみ：${read}）\n\n作：${authorName}氏\n\n#変な熟語ゲーム `;
  const url = typeof window !== "undefined" ? window.location.href : "";

  // X (Twitter) シェア
  const shareX = () => {
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;

    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  const shareLine = () => {
    const lineText = `${text}\n${url}`;

    const shareUrl = `https://line.me/R/msg/text/?${encodeURIComponent(lineText)}`;

    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex items-center gap-2">
      {/* X ボタン */}
      <Button
        type="button"
        variant="outline"
        onClick={shareX}
        className="flex items-center justify-center p-0 w-9 h-9 rounded-full border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-slate-300 transition-all"
        title="Xにシェア"
      >
        <Send className="w-4 h-4" />
      </Button>

      {/* LINE ボタン */}
      <Button
        type="button"
        variant="outline"
        onClick={shareLine}
        className="flex items-center justify-center p-0 w-9 h-9 rounded-full border-slate-200 text-[#06C755] hover:bg-[#06C755]/5 hover:border-[#06C755]/30 transition-all"
        title="LINEで送る"
      >
        <MessageCircle className="w-4 h-4 fill-current" />
      </Button>
    </div>
  );
}
