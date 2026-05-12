"use client";
import { useActionState, useEffect, useState, useTransition } from "react";
import { Button } from "../ui/button";
import { choice, HEADER_HEIGHT } from "@/utils/global";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { postAction } from "@/actions/postAction";
import kanjiList from "./kanji-lists.json";
import KanjiSetting from "./KanjiSetting";

import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import { ReadGuessSchema } from "@/utils/formSchema";

// RHF関連のインポート
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@clerk/nextjs";

type FormValues = z.infer<typeof ReadGuessSchema>;

const Create = () => {
  const [len, setLen] = useState(2);
  const [char, setChar] = useState("");
  const router = useRouter();
  const [isPendingTransition, startTransition] = useTransition();
  const { userId: session } = useAuth();

  // 1. RHFの初期化
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(ReadGuessSchema),
    defaultValues: {
      author: "",
      kanji: "",
      read: "",
    },
  });

  const genPhrase = () => {
    let txt = "";
    for (let i = 0; i < len; i++) txt += choice(kanjiList);
    return txt;
  };

  useEffect(() => {
    const newChar = genPhrase();
    setChar(newChar);
    setValue("kanji", newChar); // RHFのコンテキストにも値を反映
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2. Action State の設定
  const [state, action, isPendingAction] = useActionState(postAction, {
    status: "init",
  });

  // ローディング状態の統合
  const isPending = isPendingAction || isPendingTransition;

  useEffect(() => {
    if (state.status === "success" && state.redirectTo) {
      router.push(state.redirectTo);
    }
  }, [state, router]);

  // 3. 送信ハンドラー
  const onSubmit = (data: FormValues) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    startTransition(() => {
      action(formData);
    });
  };

  return (
    <div
      className={`flex flex-col items-center justify-center w-screen h-[calc(100vh-${HEADER_HEIGHT}px)] overflow-hidden`}
    >
      <KanjiSetting lenState={{ len, setLen }} />
      {isPending ? (
        <Loading />
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center"
        >
          <div className="flex justify-center items-center">
            <Label>お名前</Label>
            <Input type="text" {...register("author")} />
          </div>
          {errors.author && (
            <p className="text-red-500 text-xs">{errors.author.message}</p>
          )}

          <div className="flex flex-col justify-center items-center">
            <input
              type="text"
              {...register("kanji")}
              value={char}
              readOnly
              className="text-center text-2xl font-bold p-3 m-1 mt-3 outline-none"
            />
            <Button
              type="button"
              onClick={() => {
                const newChar = genPhrase();
                setChar(newChar);
                setValue("kanji", newChar);
              }}
              className="mb-4"
              variant={"outline"}
            >
              変える
            </Button>
          </div>

          <div className="flex justify-center items-center">
            <Label>読み</Label>
            <Input type="text" {...register("read")} />
          </div>
          {errors.read && (
            <p className="text-red-500 text-xs">{errors.read.message}</p>
          )}

          <div className="flex flex-col justify-center items-center">
            <Button
              type="submit"
              className="px-6 py-2 m-5 bg-slate-600"
              disabled={isPending || !session}
            >
              送信
            </Button>
            {!session && (
              <p className="text-red-600">まだ認証が済んでいないようです。</p>
            )}
          </div>

          {/* サーバーサイド・クライアントサイド両方のエラー表示 */}
          <ul>
            {state.messages?.map((msg, key) => (
              <li key={key} className="text-red-600">
                {msg}
              </li>
            ))}
          </ul>
        </form>
      )}
    </div>
  );
};

export default Create;
