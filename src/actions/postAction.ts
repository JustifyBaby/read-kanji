import prisma from "@/utils/db";
import { UserRead } from "@/utils/types";

export const postAction = async (
  fd: FormData,
  kanji: string,
  authorId: string
) => {
  const read = fd.get("read")!.toString();
  const author = fd.get("author")!.toString();

  const data: UserRead = {
    author,
    authorId,
    kanji,
    read,
  };

  try {
    prisma.$connect();
    await prisma.userRead.create({ data });
  } catch (err) {
    console.log(err);
  } finally {
    prisma.$disconnect();
  }
};
