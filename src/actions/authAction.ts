"use server";

import { auth } from "@/lib/firebase";
import { authSchema } from "@/utils/formSchema";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { redirect } from "next/navigation";

export const authByEmail = (state: string | null, fd: FormData) => {
  const email = fd.get("email")?.toString();
  const password = fd.get("password")?.toString();
  try {
    const { email: emailOk, password: passwordOk } = authSchema.parse({
      email,
      password,
    });

    createUserWithEmailAndPassword(auth, emailOk, passwordOk);
    redirect("/");
  } catch (e: any) {
    return { ...e };
  }
};
