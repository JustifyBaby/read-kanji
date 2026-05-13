import { Button } from "./ui/button";
import { highRated } from "@/actions/userAction";
import { Suspense } from "react";
import { ActionParamSchema } from "@/utils/types";
import DeleteModal from "./DeleteModal";
import { Heart } from "lucide-react"; // アイコン使用
import { cn } from "@/lib/utils"; // shadcnのユーティリティ関数（あれば）

interface Props {
  id: string;
  authorId: string;
  good: string[];
  session: string | null;
}

const UserAction = ({ session, id, authorId, good }: Props) => {
  const isLiked = session ? good.includes(session) : false;

  const rateValid = () => {
    const jsonData = ActionParamSchema.safeParse({ id, raterId: session });
    if (jsonData.success) return JSON.stringify(jsonData.data);
    return "";
  };

  return (
    <div className="flex items-center gap-4">
      {session === authorId ? (
        <DeleteModal id={id} />
      ) : (
        <form action={highRated} className="flex items-center">
          {session ? (
            <div className="flex items-center bg-slate-50 rounded-full pl-1 pr-3 py-1 border border-slate-100 group">
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                disabled={isLiked}
                name="eval"
                value={rateValid()}
                className={cn(
                  "h-8 w-8 rounded-full transition-all",
                  isLiked
                    ? "text-red-500 bg-red-50"
                    : "text-slate-400 hover:text-red-500 hover:bg-red-50",
                )}
              >
                <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
              </Button>
              <span
                className={cn(
                  "text-sm font-bold ml-1",
                  isLiked ? "text-red-600" : "text-slate-600",
                )}
              >
                {good.length}
              </span>
            </div>
          ) : (
            // 未ログイン時：数値のみ表示
            <div className="flex items-center gap-1.5 text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
              <Heart className="w-4 h-4" />
              <span className="text-sm font-medium">{good.length}</span>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default UserAction;
