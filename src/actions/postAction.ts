"use server";

import prisma from "@/utils/db";
import { formSchema } from "@/utils/formSchema";
import { CreateAction, ZodErrorType } from "@/utils/types";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const postAction = async (
  state: CreateAction,
  fd: FormData
): Promise<CreateAction> => {
  try {
    const { userId: authorId } = await auth(); // Clerkから取得

    if (!authorId) {
      return {
        status: "error",
        messages: ["まだ認証が済んでいないようです"],
      };
    }

    const kanjiData = fd.get("kanji")!.toString();
    const readData = fd.get("read")!.toString();
    const authorData = fd.get("author")!.toString();

    const { kanji, read, author } = formSchema.parse({
      kanji: kanjiData,
      read: readData,
      author: authorData,
    });

    await prisma.userRead.create({
      data: {
        author,
        authorId,
        kanji,
        read,
      },
    });
    revalidatePath("/");
    return { status: "success", redirectTo: "/?id=0" };
  } catch (err) {
    console.error(err);
    const { issues } = err as ZodErrorType;
    const messages = issues.map(({ message }) => message);
    return { status: "error", messages };
  }
};
