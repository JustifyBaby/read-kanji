import prisma from "@/utils/db";
import { RouteParam } from "@/utils/types";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (q: NextRequest, { params }: RouteParam) => {
  const id = parseInt(params.id);
  let data;
  try {
    prisma.$connect();
    data = await prisma.userRead.findUnique({ where: { id } });
    if (!data) throw new Error("data is nullish");
  } catch (e) {
    console.log(e);
  } finally {
    prisma.$disconnect();
  }

  return NextResponse.json({ data });
};

export const DELETE = async (q: NextRequest, { params }: RouteParam) => {
  const id = parseInt(params.id);
  try {
    prisma.$connect();
    await prisma.userRead.delete({ where: { id } });
  } catch (e) {
    console.log(e);
  } finally {
    prisma.$disconnect();
  }
  redirect("/");
};
