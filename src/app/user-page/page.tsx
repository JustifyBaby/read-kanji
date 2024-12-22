import { SerialPagination } from "@/components/ui/pagination";
import UserAction from "@/components/UserAction";
import prisma from "@/utils/db";
import { ITEMS_PER_PAGE } from "@/utils/global";
import { QueryParam } from "@/utils/types";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const UserPage = async ({ searchParams }: QueryParam) => {
  const { id } = await searchParams;

  const { userId } = await auth();

  if (!userId)
    return NextResponse.redirect(process.env.NEXT_PUBLIC_DOMAIN + "?id=0");
  const skip = Number(id) * ITEMS_PER_PAGE;

  const [contents, total] = await prisma.$transaction([
    prisma.userRead.findMany({
      where: { authorId: userId },
      skip,
      take: ITEMS_PER_PAGE,
    }),
    prisma.userRead.count({ where: { authorId: userId } }),
  ]);

  const pageSize = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <ul className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
        {contents.map(
          ({ id, author, kanji, read, createdAt, authorId, good }) => (
            <li
              key={id}
              className='shadow transform rounded-xl bg-white/10 p-6 transition-all duration-300 hover:bg-white/20'>
              <div className='flex flex-col justify-center items-center'>
                <h2 className='mb-4 text-2xl font-bold group-hover:text-[hsl(280,100%,70%)]'>
                  {read}
                </h2>
                <h2 className='mb-4 text-3xl font-bold group-hover:text-[hsl(280,100%,70%)]'>
                  {kanji}
                </h2>
              </div>
              <div className='mb-4 text-lg'>{author}氏</div>
              <div className='flex justify-center items-center'>
                <span className='text-base text-gray-400'>
                  {createdAt.toLocaleDateString()}
                </span>
                <UserAction
                  session={userId}
                  id={id}
                  authorId={authorId}
                  good={good}
                />
              </div>
            </li>
          )
        )}
      </ul>
      <SerialPagination currentPageId={Number(id)} length={pageSize} />
    </div>
  );
};

export default UserPage;
