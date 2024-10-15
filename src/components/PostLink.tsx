import Link from "next/link";

const PostLink = () => {
  return (
    <div>
      <Link href={"/create"}>新しい投稿</Link>
    </div>
  );
};

export default PostLink;
