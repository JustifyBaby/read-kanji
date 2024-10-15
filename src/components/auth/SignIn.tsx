"use client";

import { auth } from "@/lib/firebase";
import EmailLink from "./EmailLink";
import WithGoogle from "./WithGoogle";
import { useAuthState } from "react-firebase-hooks/auth";
import SignOut from "./SignOut";
import PostLink from "../PostLink";

const SignIn = () => {
  const [session] = useAuthState(auth);
  return (
    <div>
      {session ? (
        <div>
          <SignOut />
          <PostLink />
        </div>
      ) : (
        <div>
          <WithGoogle />
          <EmailLink />
        </div>
      )}
    </div>
  );
};

export default SignIn;
