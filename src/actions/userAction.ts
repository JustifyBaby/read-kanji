"use server";
import prisma from "@/utils/db";
import { ActionParam } from "@/utils/types";
import { revalidatePath } from "next/cache";

export const deletePost = async (fd: FormData) => {
  const id = fd.get("deleteBtn")!.toString();

  try {
    await prisma.userRead.delete({ where: { id } });
    console.log("deleted");
  } catch (e) {
    console.log(e);
  }

  revalidatePath("/");
  return;
};

export const highRated = async (fd: FormData) => {
  try {
    const { id, raterId } = JSON.parse(
      fd.get("eval")!.toString()
    ) as ActionParam;

    const data = await prisma.userRead.findUnique({ where: { id } });
    if (!data) throw new Error("Cannot read data");
    data.good = [...data.good, raterId];

    await prisma.userRead.update({ where: { id }, data });
    console.log("rated");
  } catch (err) {
    console.log(err);
  }
  revalidatePath("/");
  return;
};
