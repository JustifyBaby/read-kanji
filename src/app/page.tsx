import { SerialPagination } from "@/components/ui/pagination";
import UserAction from "@/components/UserAction";
import prisma from "@/utils/db";
import { ITEMS_PER_PAGE } from "@/utils/global";
import { QueryParam } from "@/utils/types";
import { auth, currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

export default async function Home({ searchParams }: QueryParam) {
  const { id } = await searchParams;

  const skip = Number(id) * ITEMS_PER_PAGE;
  const [contents, total] = await prisma.$transaction([
    prisma.userRead.findMany({ skip, take: ITEMS_PER_PAGE }),
    prisma.userRead.count(),
  ]);

  const pageSize = Math.ceil(total / ITEMS_PER_PAGE);

  const { userId } = await auth();
  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <div className='flex justify-center items-center'>
        {userId ? (
          <Link
            href={"/user-page/?id=0"}
            className='m-2 p-1 underline text-lg text-blue-400'>
            あなたのページ
          </Link>
        ) : (
          <></>
        )}
      </div>
      <ul className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
        {contents.map(
          ({
            id,
            author,
            kanji,
            read,
            createdAt,
            authorId,
            authorIcon,
            good,
          }) => (
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
              <div className='mb-4 text-lg flex justify-center items-center'>
                <Image
                  src={
                    authorIcon ===
                    "https://kotonohaworks.com/free-icons/wp-content/uploads/kkrn_icon_user_1.png"
                      ? "https://kotonohaworks.com/free-icons/wp-content/uploads/kkrn_icon_user_1.png"
                      : `https://img.clerk.com/${authorIcon}`
                  }
                  alt={`${author}'s icon url`}
                  width={25}
                  height={25}
                />
                <h2 className='text-lg m-1'>{author}氏</h2>
              </div>
              <div className='flex justify-center items-center'>
                <span className='text-base text-gray-400 mx-3'>
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
}
