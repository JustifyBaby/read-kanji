"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/firebase";
import { authSchema } from "@/utils/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";

const EmailAuth = () => {
  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
  });

  const [seeable, setSeeable] = useState(false);

  const emailSignIn = (email: string, password: string) => {
    try {
      createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      try {
        signInWithEmailAndPassword(auth, email, password);
      } catch (e2) {
        console.error(`${e}
          ${e2}
          is happened`);
        return;
      }
    }

    redirect("/");
  };
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={() =>
            form.handleSubmit(({ email, password }) =>
              emailSignIn(email, password)
            )
          }>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>メールアドレス</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter Email Address'
                    {...field}
                    name='email'
                  />
                </FormControl>
                <FormDescription>非公開の認証用メールアドレス</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>パスワード</FormLabel>
                <FormControl>
                  <Input
                    type={seeable ? "text" : "password"}
                    placeholder='Enter Strong Password'
                    {...field}
                    name='password'
                  />
                  <span
                    onClick={() => setSeeable(!seeable)}
                    className='w-9 rounded-md mx-2 flex justify-center items-center cursor-pointer bg-slate-100'>
                    {seeable ? "X" : "👁"}
                  </span>
                </FormControl>
                <FormDescription>
                  8文字以上で英数字の強力なパスワード。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>送信</Button>
        </form>
      </Form>
    </div>
  );
};

export default EmailAuth;
