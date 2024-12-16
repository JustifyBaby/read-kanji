"use server";
import prisma from "@/utils/db";
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

interface Param {
  id: string;
  authorId: string;
}
export const highRated = async (fd: FormData) => {
  try {
    const { id, authorId } = JSON.parse(fd.get("eval")!.toString()) as Param;
    const data = await prisma.userRead.findUnique({ where: { id } });
    if (!data) throw new Error("Cannot read data");
    data.good = [...data.good, authorId];

    await prisma.userRead.update({ where: { id }, data });
    console.log("rated");
  } catch (err) {
    console.log(err);
  }
  revalidatePath("/");
  return;
};
