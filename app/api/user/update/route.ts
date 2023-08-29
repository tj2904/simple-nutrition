import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, firstName, surname } = await req.json();

  const user = await prisma.user.update({
    where: {
      email,
    },
    data: {
      firstName: firstName,
      surname: surname,
    },
  });
  return NextResponse.json({ message: "User updated" }, { status: 200 });
}
