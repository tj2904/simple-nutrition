import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();

  const user: object | null = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      surname: true,
    },
  });
  return NextResponse.json({ data: user }, { status: 200 });
}
