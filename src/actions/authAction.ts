"use server";

import { auth } from "@/lib/firebase";
import { authSchema } from "@/utils/formSchema";
import { AuthMsg } from "@/utils/types";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const authByEmail = (state: AuthMsg, fd: FormData): AuthMsg => {
  const email = fd.get("email")?.toString();
  const password = fd.get("password")?.toString();
  try {
    state = authSchema.parse({
      email,
      password,
    });
  } catch (err) {
    return {
      email: "有効なメールアドレスを入力してください。",
      password: "パスワードは、8文字以上で英数字を含めてください。",
    };
  }

  const { email: emailOk, password: passwordOk } = state;

  if (auth.currentUser?.email === email) {
    signInWithEmailAndPassword(auth, emailOk, passwordOk);
  } else {
    createUserWithEmailAndPassword(auth, emailOk, passwordOk);
  }

  return {
    email: "OK",
    password: "OK",
  };
};
