"use client";

import { Button } from "./ui/button";
import TrashBox from "./icon/TrashBox";
import { deletePost, highRated } from "@/actions/userAction";
import { Suspense, useActionState } from "react";
import { ActionParam } from "@/utils/types";

interface Props {
  id: string;
  authorId: string;
  good: string[];
  session: string | null;
}

const UserAction = ({ session, id, authorId, good }: Props) => {
  // 確認画面
  const deleteBody = (fd: FormData) =>
    new Promise<FormData>((resolve, reject) => {
      if (confirm("本当に削除しますか？")) return resolve(fd);
      else return reject("誤作動でした。");
    }).then(deletePost);

  return (
    <Suspense fallback={<div>削除しています...</div>}>
      {session === authorId ? (
        <form action={deletePost}>
          <Button
            name='deleteBtn'
            value={id}
            variant={"secondary"}
            className='flex justify-center items-center'>
            <TrashBox />
            削除
          </Button>
        </form>
      ) : (
        <form action={highRated} className='flex justify-center items-center'>
          <Button
            className='px-4 py-2 m-3'
            disabled={good.includes(session!)}
            variant={good.includes(session!) ? "ghost" : "default"}
            name='eval'
            value={JSON.stringify({ id, raterId: session } as ActionParam)}>
            &hearts;
          </Button>
          <p>{good.length}</p>
        </form>
      )}
    </Suspense>
  );
};

export default UserAction;
