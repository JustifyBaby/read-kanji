import { SerialPagination } from "@/components/ui/pagination";
import UserAction from "@/components/UserAction";
import prisma from "@/utils/db";
import { ICON_DEFAULT_URL, ITEMS_PER_PAGE } from "@/utils/global";
import { AuthorInfo, QueryParam } from "@/utils/types";
import { auth, clerkClient } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

export default async function Home({ searchParams }: QueryParam) {
  const { id } = await searchParams;

  const skip = Number(id) * ITEMS_PER_PAGE;
  const [contentsByDB, total] = await prisma.$transaction([
    prisma.userRead.findMany({ skip, take: ITEMS_PER_PAGE }),
    prisma.userRead.count(),
  ]);

  const pageSize = Math.ceil(total / ITEMS_PER_PAGE);

  const { userId } = await auth();

  const client = await clerkClient();
  const users = await client.users.getUserList();
  const authors: AuthorInfo[] = users.data.map((user) => {
    const authorIcon = user.hasImage ? user.imageUrl : ICON_DEFAULT_URL;

    return {
      authorId: user.id,
      authorEmailName: user.fullName,
      authorIcon,
    };
  });

  const contents = contentsByDB.map((content) => {
    const author = authors.find((item) => item.authorId === content.authorId);
    return {
      ...content,
      authorName: content.authorName ?? author?.authorEmailName ?? "Unknown",
      authorIcon: author?.authorIcon ?? ICON_DEFAULT_URL,
    };
  });

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="flex justify-center items-center">
        {userId ? (
          <Link
            href={"/user-page/?id=0"}
            className="m-2 p-1 underline text-lg text-blue-400"
          >
            あなたのページ
          </Link>
        ) : (
          <></>
        )}
      </div>
      <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {contents.map((content) => (
          <li
            key={content.id}
            className="shadow transform rounded-xl bg-white/10 p-6 transition-all duration-300 hover:bg-white/20"
          >
            <div className="flex flex-col justify-center items-center">
              <h2 className="mb-4 text-2xl font-bold group-hover:text-[hsl(280,100%,70%)]">
                {content.read}
              </h2>
              <h2 className="mb-4 text-3xl font-bold group-hover:text-[hsl(280,100%,70%)]">
                {content.kanji}
              </h2>
            </div>
            <div className="mb-4 text-lg flex justify-center items-center">
              <Image
                src={content.authorIcon}
                alt={`${content.authorName}'s icon url`}
                width={25}
                height={25}
              />
              <h2 className="text-lg m-1">{content.authorName}氏</h2>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-base text-gray-400 mx-3">
                {content.createdAt.toLocaleDateString()}
              </span>
              <UserAction
                session={userId}
                id={content.id}
                authorId={content.authorId}
                good={content.good}
              />
            </div>
          </li>
        ))}
      </ul>
      <SerialPagination currentPageId={Number(id)} length={pageSize} />
    </div>
  );
}
