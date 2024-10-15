import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { Button } from "../ui/button";

const SignOut = () => {
  return (
    <div>
      <Button onClick={() => signOut(auth)}>サインアウトする。</Button>
    </div>
  );
};

export default SignOut;
