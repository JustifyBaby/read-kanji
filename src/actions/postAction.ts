"use server";

import prisma from "@/utils/db";
import { ReadGuessSchema } from "@/utils/formSchema";
import { IS_DEV } from "@/utils/global";
import { CreateAction } from "@/utils/types";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import z from "zod";

export const postAction = async (
  _: CreateAction,
  fd: FormData,
): Promise<CreateAction> => {
  try {
    const { userId: authorId } = await auth(); // Clerkから取得

    if (!authorId) {
      return {
        status: "error",
        messages: ["不明なエラー"],
      };
    }

    const kanjiData = fd.get("kanji")?.toString();
    const readData = fd.get("read")?.toString();
    const authorData = fd.get("author")?.toString();

    const readGuess = ReadGuessSchema.safeParse({
      kanji: kanjiData,
      read: readData,
      author: authorData,
    });

    if (!readGuess.success) {
      if (IS_DEV) console.log(z.treeifyError(readGuess.error));

      return { status: "error", messages: ["入力にエラーがありました。"] };
    }

    const { author, kanji, read } = readGuess.data;

    await prisma.userRead.create({
      data: {
        authorName: author,
        authorId,
        kanji,
        read,
      },
    });
    revalidatePath("/");
    return { status: "success", redirectTo: "/?id=0" };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return {
        status: "error",
        messages: IS_DEV ? err.issues.map((i) => i.message) : ["入力エラー"],
      };
    }

    console.error(
      `======
${err}
======`,
    );

    return {
      status: "error",
      messages: IS_DEV ? ["SERVER ERROR"] : ["不明なエラー"],
    };
  }
};
