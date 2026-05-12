import { Button } from "./ui/button";
import { highRated } from "@/actions/userAction";
import { Suspense } from "react";
import { ActionParamSchema } from "@/utils/types";
import DeleteModal from "./DeleteModal";

interface Props {
  id: string;
  authorId: string;
  good: string[];
  session: string | null;
}

const UserAction = ({ session, id, authorId, good }: Props) => {
  const rateValid = () => {
    const jsonData = ActionParamSchema.safeParse({ id, raterId: session });
    if (jsonData.success) return JSON.stringify(jsonData.data);
    console.log(jsonData.error);
    return "";
  };

  return (
    <Suspense fallback={<div>削除しています...</div>}>
      {session === authorId ? (
        <DeleteModal id={id} />
      ) : (
        <form action={highRated} className="flex justify-center items-center">
          {session ? (
            <Button
              className="px-4 py-2 m-3"
              disabled={good.includes(session!)}
              variant={good.includes(session!) ? "ghost" : "default"}
              name="eval"
              value={rateValid()}
            >
              &hearts;
            </Button>
          ) : (
            <></>
          )}
          <p>{good.length}</p>
        </form>
      )}
    </Suspense>
  );
};

export default UserAction;
