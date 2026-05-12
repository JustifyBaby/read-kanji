"use server";
import prisma from "@/utils/db";
import { ActionParamSchema } from "@/utils/types";
import { revalidatePath } from "next/cache";
import z from "zod";

export const deletePost = async (id: string) => {
  try {
    await prisma.userRead.delete({ where: { id } });
    console.log("deleted");
  } catch (e) {
    console.log(e);
    return {
      status: "error",
      message: "Prisma Error",
    };
  }

  revalidatePath("/");
  return {
    status: "success",
    message: null,
  };
};

export const highRated = async (fd: FormData) => {
  try {
    const evalData = fd.get("eval")?.toString();
    if (!evalData) {
      console.log("[FormData] eval is not defined!");
      return;
    }

    const json = ActionParamSchema.safeParse(JSON.parse(evalData));
    if (!json.success) {
      console.log(z.treeifyError(json.error));
      return;
    }

    const { id, raterId } = json.data;

    const data = await prisma.userRead.findUnique({ where: { id } });
    if (!data) throw new Error("Cannot read [data]");
    data.good = [...data.good, raterId];

    await prisma.userRead.update({ where: { id }, data });
    console.log("rated");
  } catch (err) {
    console.log(err);
  }
  revalidatePath("/");
  return;
};
