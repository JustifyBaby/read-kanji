"use client";
import { useActionState, useEffect, useState, useTransition } from "react";
import { Button } from "../ui/button";
import { choice, HEADER_HEIGHT } from "@/utils/global";
import { Label } from "../ui/label"; // LabelコンポーネントをUIからに変更
import { Input } from "../ui/input";
import { postAction } from "@/actions/postAction";
import kanjiList from "./kanji-lists.json";
import KanjiSetting from "./KanjiSetting";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import { ReadGuessSchema } from "@/utils/formSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@clerk/nextjs";
import { RefreshCw, Send, User, BookOpen } from "lucide-react"; // アイコン追加
import { Card, CardContent } from "../ui/card";

type FormValues = z.infer<typeof ReadGuessSchema>;

const Create = () => {
  const [len, setLen] = useState(2);
  const [char, setChar] = useState("");
  const router = useRouter();
  const [isPendingTransition, startTransition] = useTransition();
  const { userId: session } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(ReadGuessSchema),
    defaultValues: { author: "", kanji: "", read: "" },
  });

  const genPhrase = () => {
    let txt = "";
    for (let i = 0; i < len; i++) txt += choice(kanjiList);
    return txt;
  };

  useEffect(() => {
    const newChar = genPhrase();
    setChar(newChar);
    setValue("kanji", newChar);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [state, action, isPendingAction] = useActionState(postAction, {
    status: "init",
  });
  const isPending = isPendingAction || isPendingTransition;

  useEffect(() => {
    if (state.status === "success" && state.redirectTo) {
      router.push(state.redirectTo);
    }
  }, [state, router]);

  const onSubmit = (data: FormValues) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    startTransition(() => action(formData));
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-full min-h-screen bg-slate-50/50 px-4"
      style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px)` }}
    >
      <div className="w-full max-w-md space-y-6">
        <KanjiSetting lenState={{ len, setLen }} />

        {isPending ? (
          <div className="flex flex-col items-center gap-4">
            <Loading />
            <p className="text-sm text-muted-foreground animate-pulse">
              送信中...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Card className="shadow-xl border-none bg-white/80 backdrop-blur-md">
              <CardContent className="pt-8 space-y-8">
                {/* 1. お名前入力 */}
                <div className="space-y-2 text-center">
                  <div className="flex items-center justify-center gap-2 text-slate-500 mb-1">
                    <User className="w-4 h-4" />
                    <Label htmlFor="author" className="text-sm font-medium">
                      出題者名
                    </Label>
                  </div>
                  <Input
                    {...register("author")}
                    placeholder="名前を入力"
                    className="text-center bg-slate-100/50 border-none focus-visible:ring-slate-300"
                  />
                  {errors.author && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.author.message}
                    </p>
                  )}
                </div>

                {/* 2. 漢字メイン表示 */}
                <div className="flex flex-col items-center gap-4 py-4">
                  <div className="relative group">
                    <input
                      type="text"
                      {...register("kanji")}
                      value={char}
                      readOnly
                      className="text-center text-6xl font-serif font-bold p-4 bg-transparent border-b-2 border-slate-200 outline-none tracking-widest text-slate-800"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const newChar = genPhrase();
                      setChar(newChar);
                      setValue("kanji", newChar);
                    }}
                    className="text-slate-400 hover:text-slate-600 gap-2 transition-all"
                  >
                    <RefreshCw className="w-4 h-4" /> 漢字を変える
                  </Button>
                </div>

                {/* 3. 読み入力 */}
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-slate-500 mb-1">
                    <BookOpen className="w-4 h-4" />
                    <Label htmlFor="read" className="text-sm font-medium">
                      正しい読み
                    </Label>
                  </div>
                  <Input
                    {...register("read")}
                    placeholder="読み方を入力"
                    className="text-center text-xl h-14 border-slate-200 focus-visible:ring-slate-400"
                  />
                  {errors.read && (
                    <p className="text-red-500 text-xs text-center">
                      {errors.read.message}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* 4. アクションエリア */}
            <div className="flex flex-col items-center gap-3">
              <Button
                type="submit"
                className="w-full h-14 text-lg font-bold bg-slate-800 hover:bg-slate-700 shadow-lg transition-transform active:scale-95 gap-2"
                disabled={isPending || !session}
              >
                <Send className="w-5 h-5" />
                {session ? "この漢字を登録する" : "ログインしてください"}
              </Button>

              {!session && (
                <p className="text-amber-600 text-sm font-medium bg-amber-50 px-4 py-2 rounded-full">
                  ⚠️ 投稿するにはログインが必要です
                </p>
              )}

              {/* サーバーエラーメッセージ */}
              {state.messages && (
                <ul className="w-full bg-red-50 p-3 rounded-lg border border-red-100">
                  {state.messages.map((msg, key) => (
                    <li
                      key={key}
                      className="text-red-600 text-xs text-center font-medium"
                    >
                      {msg}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Create;
