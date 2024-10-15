import prisma from "@/utils/db";
import { RouteParam } from "@/utils/types";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (q: NextRequest, { params }: RouteParam) => {
  const id = parseInt(params.id);
  try {
    prisma.$connect();
    const data = await prisma.userRead.findUnique({ where: { id } });
    if (!data) throw new Error("Cannot read data");
    const { authorId }: { authorId: string } = await q.json();
    data.highRater = [...data.highRater, authorId];

    await prisma.userRead.update({ where: { id }, data });
  } catch (e) {
    console.log(e);
  } finally {
    prisma.$disconnect();
  }

  redirect("/");
};
