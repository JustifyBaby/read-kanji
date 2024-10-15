import SignIn from "@/components/auth/SignIn";
import UserAction from "@/components/UserAction";
import { API_URL } from "@/utils/global";
import { UserRead } from "@/utils/types";

export default async function Home() {
  const res = await fetch(API_URL, {
    cache: "no-store",
  });
  const data = await res.json();
  const contents: UserRead[] = data.data;

  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <SignIn />

      <ul className='w-full flex flex-col justify-center items-center p-2 m-4'>
        {contents.map(
          ({ id, author, authorId, kanji, highRater, read, createdAt }) => (
            <li key={id}>
              <h2>{read}</h2>
              <h2>{kanji}</h2>
              <p>{author}氏による</p>
              <small>{createdAt!.toLocaleString()}</small>
              <UserAction id={id!} authorId={authorId} highRater={highRater!} />
            </li>
          )
        )}
      </ul>
    </div>
  );
}
