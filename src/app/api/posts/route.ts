import prisma from "@/utils/db";
import { UserRead } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    prisma.$connect();
    const data = await prisma.userRead.findMany();
    return NextResponse.json({ data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ data: err }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};

// export const POST = async (q: NextRequest) => {
//   const data: UserRead = await q.json();
//   try {
//     prisma.$connect();
//     await prisma.userRead.create({ data });
//     return NextResponse.json({ msg: "success!!" }, { status: 200 });
//   } catch (err) {
//     return NextResponse.json({ msg: err });
//   } finally {
//     prisma.$disconnect();
//   }
// };
