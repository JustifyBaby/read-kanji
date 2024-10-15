"use client";
import { authByEmail } from "@/actions/authAction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { empty } from "@/utils/global";
import { IconProps } from "@/utils/types";
import { ReactNode, useState } from "react";
import { useFormState } from "react-dom";

const Danger = ({ children }: { children: ReactNode }) => (
  <p className='text-red-800 font-medium text-lg'>{children}</p>
);

function EyeIcon({
  seeableProp,
  props,
}: {
  seeableProp: boolean;
  props: IconProps;
}) {
  return seeableProp ? (
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
      <path d='M18 6 6 18' />
      <path d='m6 6 12 12' />
    </svg>
  ) : (
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
      <path d='M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z' />
      <circle cx='12' cy='12' r='3' />
    </svg>
  );
}

const EmailAuth = () => {
  const [seeable, setSeeable] = useState(false);
  const [msg, action] = useFormState(authByEmail, {
    email: "",
    password: "",
  });

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>
      <form
        action={action}
        className='flex flex-col items-center justify-center w-3/4'>
        <div className='flex justify-center items-center p-3'>
          <Label>メールアドレス</Label>
          <Input name='email' type='email' placeholder='Enter your email' />
        </div>
        <Danger>{empty(msg.email, null)}</Danger>
        <div className='flex justify-center items-center p-3'>
          <Label>強固なパスワード (8文字以上で英数字含む)</Label>
          <Input
            placeholder='Enter strong password'
            name='password'
            type={seeable ? "text" : "password"}
          />
          <EyeIcon
            props={{
              className: "w-12 h-12 m-2 p-2 text-muted-foreground",
              onClick() {
                setSeeable(!seeable);
              },
            }}
            seeableProp={seeable}
          />
        </div>
        <Danger>{empty(msg.password, null)}</Danger>

        <Button className='m-3 px-8'>サインイン</Button>
      </form>
    </div>
  );
};

export default EmailAuth;
