import { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Settings2 } from "lucide-react"; // アイコンを追加

interface KanjiProps {
  lenState: {
    len: number;
    setLen: Dispatch<SetStateAction<number>>;
  };
}

const KanjiSetting = ({ lenState: { len, setLen } }: KanjiProps) => {
  const count = (amount: number) => {
    const nextValue = len + amount;
    if (nextValue <= 4 && nextValue >= 2) {
      setLen(nextValue);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3 mb-4">
      {/* ラベル部分 */}
      <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
        <Settings2 className="w-4 h-4" />
        <span>熟語の長さを設定</span>
      </div>

      {/* カウンターUI */}
      <div className="flex items-center bg-white border border-slate-200 rounded-full p-1 shadow-sm">
        <Button
          type="button"
          onClick={() => count(-1)}
          variant="ghost"
          size="icon"
          disabled={len <= 2}
          className="rounded-full hover:bg-slate-100 disabled:opacity-30 h-10 w-10 transition-colors"
        >
          <Minus className="w-4 h-4" />
        </Button>

        <div className="px-6 text-lg font-bold text-slate-700 min-w-[100px] text-center select-none">
          {len} 文字
        </div>

        <Button
          type="button"
          onClick={() => count(1)}
          variant="ghost"
          size="icon"
          disabled={len >= 4}
          className="rounded-full hover:bg-slate-100 disabled:opacity-30 h-10 w-10 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default KanjiSetting;
