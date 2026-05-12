"use client";
import { deletePost } from "@/actions/userAction";
import { useState } from "react";
import { Button } from "./ui/button";
import TrashBox from "./icon/TrashBox";

export default function DeleteModal({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    const res = await deletePost(id);
    if (res.status === "success") setIsOpen(false);
    else alert(res.message);
  };

  return (
    <>
      <Button
        name="deleteBtn"
        value={id}
        variant={"secondary"}
        className="flex justify-center items-center"
        onClick={() => setIsOpen(true)}
      >
        <TrashBox />
        削除
      </Button>

      {isOpen && (
        <div className="modal">
          <p>本当に削除しますか？</p>
          <Button onClick={handleDelete}>はい、消します</Button>
          <Button onClick={() => setIsOpen(false)}>キャンセル</Button>
        </div>
      )}
    </>
  );
}
