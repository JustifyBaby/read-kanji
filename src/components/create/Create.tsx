"use client";
import { useActionState, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { choice, HEADER_HEIGHT } from "@/utils/global";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { postAction } from "@/actions/postAction";
import kanjiList from "./kanji-lists.json";
import KanjiSetting from "./KanjiSetting";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

// 作成画面
const Create = () => {
  const [len, setLen] = useState(2);
  // 漢字(kanjiだと、かぶってみずらいのでこうした)
  const [char, setChar] = useState("");
  const genPhrase = () => {
    let txt = "";
    for (let i = 0; i < len; i++) txt += choice(kanjiList);
    return txt;
  };

  useEffect(() => {
    setChar(genPhrase);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [state, action, isPending] = useActionState(postAction, {
    status: "init",
  });

  const router = useRouter();

  useEffect(() => {
    if (state.status === "success" && state.redirectTo) {
      router.push(state.redirectTo);
    }
  }, [state, router]);

  return (
    <div
      className={`flex flex-col items-center justify-center w-screen h-[calc(100vh-${HEADER_HEIGHT}px)] overflow-hidden`}>
      <KanjiSetting lenState={{ len, setLen }} />
      {isPending ? (
        <Loading />
      ) : (
        <form
          action={action}
          className='flex flex-col justify-center items-center'>
          <div className='flex justify-center items-center'>
            <Label>お名前</Label>
            <Input type='text' name='author' />
          </div>

          <div className='flex flex-col justify-center items-center'>
            <input
              type='text'
              name='kanji'
              value={char}
              readOnly
              className='text-center text-2xl font-bold p-3 m-1 mt-3 outline-none'
            />
            <Button
              type='button'
              onClick={() => setChar(genPhrase)}
              className='mb-4'
              variant={"outline"}>
              変える
            </Button>
          </div>

          <div className='flex justify-center items-center'>
            <Label>読み</Label>
            <Input type='text' name='read' />
          </div>

          <Button type='submit' className='px-6 py-2 m-5 bg-slate-600'>
            送信
          </Button>
          <ul>
            {state.messages?.map((msg, key) => (
              <li key={key} className='text-red-600'>
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
