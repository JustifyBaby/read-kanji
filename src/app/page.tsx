import UserAction from "@/components/UserAction";
import prisma from "@/utils/db";
import Link from "next/link";

export default async function Home() {
  const contents = await prisma.userRead.findMany();

  return (
    <div className='w-full flex flex-col justify-center items-center'>
      {process.env.NEXT_PUBLIC_ALLOW_PATHS!.split(",").map((path) => (
        <>{path}</>
      ))}
      <Link href={"/create"}>新規投稿</Link>
      <ul className='w-full grid p-2 m-4'>
        {contents.map(
          ({ id, author, kanji, read, createdAt, authorId, good }) => (
            <li key={id} className='flex flex-col justify-center items-center'>
              <div className='text-center'>
                <h2 className='font-medium text-xl'>{read}</h2>
                <h2 className='text-xl'>{kanji}</h2>
              </div>
              <p className='text-lg'>{author}氏による</p>
              <small>{createdAt.toLocaleString()}</small>
              <UserAction id={id} authorId={authorId} good={good} />
            </li>
          )
        )}
      </ul>
    </div>
  );
}
