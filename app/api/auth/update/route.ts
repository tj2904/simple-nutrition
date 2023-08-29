import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, firstName, surname } = await req.json();
  const exists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (exists) {
    prisma.user.update({
      where: {
        email,
      },
      data: {
        firsName: firstName,
        surname: surname,
      },
    });
    return NextResponse.json({ message: "User updated" }, { status: 200 });
  } else {
    return NextResponse.json({ error: "User does not exist" }, { status: 400 });
  }
}
