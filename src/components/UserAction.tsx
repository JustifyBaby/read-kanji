import { Button } from "./ui/button";
import TrashBox from "./icon/TrashBox";
import { deletePost, highRated } from "@/actions/userAction";
import { auth } from "@clerk/nextjs/server";

interface Props {
  id: string;
  authorId: string;
  good: string[];
}

const UserAction = async ({ id, authorId, good }: Props) => {
  const session = await auth();
  return session.userId === authorId ? (
    <form action={deletePost}>
      <Button
        name='deleteBtn'
        value={id}
        variant={"secondary"}
        className='flex justify-center items-center'>
        <TrashBox />
        削除
      </Button>
    </form>
  ) : (
    <form action={highRated}>
      <Button
        className='p-2 m-2'
        name='eval'
        value={JSON.stringify({ id, authorId })}>
        &hearts;
      </Button>
      <p>{good.length}</p>
    </form>
  );
};

export default UserAction;
