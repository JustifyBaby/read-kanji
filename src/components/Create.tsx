"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { choice } from "@/utils/global";
import kanjiList from "./kanji-lists.json";
import { Label } from "@radix-ui/react-label";
import { auth } from "@/lib/firebase";
import { postAction } from "@/actions/postAction";
import { Input } from "./ui/input";

const Create = () => {
  const [len, setLen] = useState(2);

  const count = (amount: number) => {
    const nextValue = len + amount;
    if (nextValue <= 4 && nextValue >= 2) {
      setLen(nextValue);
    }
    return;
  };

  const fn = () => {
    let txt = "";
    for (let i = 0; i < len; i++) txt += choice(kanjiList);
    return txt;
  };

  const [char, setChar] = useState("");

  useEffect(() => {
    setChar(fn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen overflow-hidden'>
      <div className='flex flex-col items-center justify-center'>
        <div className='flex items-center'>
          <Button
            type='button'
            onClick={() => count(1)}
            variant='destructive'
            className='p-2 m-3'>
            +
          </Button>
          <div>{len}字熟語</div>
          <Button
            type='button'
            onClick={() => count(-1)}
            variant='secondary'
            className='p-2 m-3'>
            -
          </Button>
        </div>
      </div>

      <form
        action={(fd) => postAction(fd, char, auth.currentUser!.uid)}
        className='flex flex-col justify-center items-center'>
        <div className='flex justify-center items-center'>
          <Label>お名前</Label>
          <Input type='text' name='author' />
        </div>

        <div className='flex flex-col justify-center items-center'>
          <h2 className='text-2xl font-bold p-5 m-1'>{char}</h2>
          <Button type='button' onClick={() => setChar(fn)}>
            変える
          </Button>
        </div>

        <div className='flex justify-center items-center'>
          <Label>読み</Label>
          <Input type='text' name='read' />
        </div>

        <Button type='submit' className='px-6 py-2 m-5 bg-slate-300'>
          送信
        </Button>
      </form>
    </div>
  );
};

export default Create;
