import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  return (
    <header className='flex justify-between p-2 m-2 w-1/2 shadow mx-auto'>
      <div
        id='auth'
        className='mx-2 bg-green-600 px-4 py-2 rounded-md text-slate-200'>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>

      <h1 className='text-2xl font-bold'>変な熟語ゲーム</h1>

      <Link
        href={"/create"}
        className='text-lg mx-2 bg-sky-200 px-4 py-2 rounded-md hover:text-red-500 hover:shadow'>
        新規投稿
      </Link>
    </header>
  );
};

export default Header;
