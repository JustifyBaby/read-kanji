"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "./ui/button";
import { auth } from "@/lib/firebase";
import { API_URL } from "@/utils/global";
import TrashBox from "./icon/TrashBox";

interface Props {
  id: number;
  authorId: string;
  highRater: string[];
}

const UserAction = ({ id, authorId, highRater }: Props) => {
  const [session] = useAuthState(auth);
  const deletePost = async () => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
  };

  const highRated = async () => {
    await fetch(`${API_URL}/eval/${id}`, {
      method: "PUT",
      body: JSON.stringify({ authorId }),
    });
  };

  return session?.uid === authorId ? (
    <div>
      <Button
        onClick={deletePost}
        variant={"secondary"}
        className='flex justify-center items-center'>
        <TrashBox />
        削除
      </Button>
    </div>
  ) : (
    <div>
      <Button onClick={highRated}>&hearts;</Button>
      <p>{highRater.length}</p>
    </div>
  );
};

export default UserAction;
