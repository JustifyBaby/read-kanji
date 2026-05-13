import { SerialPagination } from "@/components/ui/pagination";
import UserAction from "@/components/UserAction";
import prisma from "@/utils/db";
import { ICON_DEFAULT_URL, ITEMS_PER_PAGE } from "@/utils/global";
import { AuthorInfo, QueryParam } from "@/utils/types";
import { auth, clerkClient } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { UserCircle, Calendar } from "lucide-react"; // アイコン追加

export default async function Home({ searchParams }: QueryParam) {
  const { id } = await searchParams;
  const skip = Number(id || 0) * ITEMS_PER_PAGE; // idがundefinedの場合のケア

  const [contentsByDB, total] = await prisma.$transaction([
    prisma.userRead.findMany({
      skip,
      take: ITEMS_PER_PAGE,
      orderBy: { createdAt: "desc" }, // 新しい順に表示
    }),
    prisma.userRead.count(),
  ]);

  const pageSize = Math.ceil(total / ITEMS_PER_PAGE);
  const { userId } = await auth();
  const client = await clerkClient();
  const users = await client.users.getUserList();

  const authors: AuthorInfo[] = users.data.map((user) => ({
    authorId: user.id,
    authorEmailName: user.fullName,
    authorIcon: user.hasImage ? user.imageUrl : ICON_DEFAULT_URL,
  }));

  const contents = contentsByDB.map((content) => {
    const author = authors.find((item) => item.authorId === content.authorId);
    return {
      ...content,
      authorName: content.authorName ?? author?.authorEmailName ?? "Unknown",
      authorIcon: author?.authorIcon ?? ICON_DEFAULT_URL,
    };
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* ユーザーナビゲーション */}
      <div className="flex justify-end mb-8">
        {userId && (
          <Link
            href={"/user-page/?id=0"}
            className="flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full text-sm font-medium text-slate-600 hover:bg-white transition-all shadow-sm border border-slate-100"
          >
            <UserCircle className="w-4 h-4" />
            マイページを確認
          </Link>
        )}
      </div>

      {/* コンテンツグリッド */}
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {contents.map((content) => (
          <li
            key={content.id}
            className="group relative flex flex-col bg-white rounded-2xl p-6 border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-slate-200"
          >
            {/* 漢字と読みをセットで一つの「作品」として見せる */}
            <div className="flex-1 flex flex-col justify-center items-center py-8">
              <h2 className="text-5xl font-serif font-bold text-slate-800 tracking-widest mb-4">
                {content.kanji}
              </h2>
              <div className="relative">
                <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-md">
                  {content.read}
                </span>
                {/* 飾り線などで「読み」を強調 */}
                <div className="absolute -left-2 -right-2 top-1/2 h-[1px] bg-slate-200 -z-10" />
              </div>
            </div>

            {/* 投稿者情報 */}
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-100">
                <Image
                  src={content.authorIcon}
                  alt={content.authorName}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-700 leading-none">
                  {content.authorName}{" "}
                  <span className="text-[10px] font-normal text-slate-400">
                    氏
                  </span>
                </span>
                <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1">
                  <Calendar className="w-3 h-3" />
                  {content.createdAt.toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* アクションエリア */}
            <div className="flex items-center justify-between pt-2">
              <UserAction
                session={userId}
                id={content.id}
                authorId={content.authorId}
                good={content.good}
              />
            </div>

            {/**
             * will impl share with X
             */}
          </li>
        ))}
      </ul>

      {/* ページネーション */}
      <div className="mt-12 flex justify-center">
        <SerialPagination currentPageId={Number(id || 0)} length={pageSize} />
      </div>
    </div>
  );
}
