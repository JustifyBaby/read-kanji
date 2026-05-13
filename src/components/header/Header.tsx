"use client";
import { HEADER_HEIGHT } from "@/utils/global";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { PlusCircle, Gamepad2 } from "lucide-react";

const Header = () => {
  return (
    <header
      style={{ height: `${HEADER_HEIGHT}px` }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4"
    >
      <div className="max-w-5xl mx-auto h-full flex items-center justify-between">
        {/* 左側：ロゴエリア */}
        <Link href={"/?id=0"} className="flex items-center gap-2 group">
          <div className="bg-slate-900 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
            <Gamepad2 className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-black tracking-tighter text-slate-800">
            変な熟語<span className="text-slate-400 font-light">ゲーム</span>
          </h1>
        </Link>

        {/* 右側：アクションエリア */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* 新規投稿ボタン（デスクトップ向け） */}
          <Link
            href={"/create"}
            className="hidden sm:flex items-center gap-2 text-sm font-bold px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            新規投稿
          </Link>

          {/* 新規投稿ボタン（スマホ向けアイコンのみ） */}
          <Link href={"/create"} className="sm:hidden text-slate-600">
            <PlusCircle className="w-6 h-6" />
          </Link>

          {/* 認証エリア */}
          <div className="flex items-center border-l border-slate-200 pl-3 sm:pl-6">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
                  ログイン
                </button>
              </SignInButton>
            </Show>
            <Show when="signed-in">
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-9 h-9 border border-slate-200",
                  },
                }}
              />
            </Show>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
