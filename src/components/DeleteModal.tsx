"use client";
import { deletePost } from "@/actions/userAction";
import { useState } from "react";
import { Button } from "./ui/button";
import { Trash2, AlertTriangle, X } from "lucide-react"; // アイコン変更

export default function DeleteModal({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const res = await deletePost(id);
    if (res.status === "success") {
      setIsOpen(false);
    } else {
      alert(res.message);
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors gap-1.5"
        onClick={() => setIsOpen(true)}
      >
        <Trash2 className="w-4 h-4" />
        <span className="text-xs">削除</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* 背景オーバーレイ */}
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => !isDeleting && setIsOpen(false)}
          />

          {/* モーダル本体 */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="bg-red-50 p-3 rounded-full mb-4">
                <AlertTriangle className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                投稿を削除しますか？
              </h3>
              <p className="text-sm text-slate-500 mt-2">
                この操作は取り消せません。
                <br />
                本当によろしいですか？
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-8">
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                disabled={isDeleting}
                className="rounded-xl border-slate-200"
              >
                キャンセル
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
                className="rounded-xl bg-red-500 hover:bg-red-600 shadow-lg shadow-red-200"
              >
                {isDeleting ? "削除中..." : "削除する"}
              </Button>
            </div>

            {!isDeleting && (
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
