import Link from "next/link";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/pQA4quUj8H4
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button";
import { IconProps } from "@/utils/types";

function Component() {
  return (
    <Button variant='outline' className='inline-flex items-center gap-2'>
      <MailIcon className='h-5 w-5' />
      メールアドレスで入室
    </Button>
  );
}

function MailIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <rect width='20' height='16' x='2' y='4' rx='2' />
      <path d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7' />
    </svg>
  );
}

const EmailLink = () => {
  return (
    <div>
      <Link href={"/auth/email"}>
        <Component />
      </Link>
    </div>
  );
};

export default EmailLink;
