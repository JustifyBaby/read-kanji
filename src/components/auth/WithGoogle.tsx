/**
 * v0 by Vercel.
 * @see https://v0.dev/t/fNwElcpBOmD
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Icon from "./GoogleIcon.svg";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";

function WithGoogle() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const ONE_SIDE = 20;
  return (
    <Button
      onClick={signInWithGoogle}
      variant='outline'
      className='flex items-center gap-2 px-6 py-3 text-lg font-medium'>
      <Image src={Icon} alt='google-icon' width={ONE_SIDE} height={ONE_SIDE} />{" "}
      Googleで入室
    </Button>
  );
}

export default WithGoogle;
