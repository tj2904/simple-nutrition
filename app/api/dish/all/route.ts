import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const dishesWithIngredients = await prisma.dish.findMany({
    include: {
      ingredients: {
        select: {
          ingredientId: true,
          name: true,
        },
      },
    },
  });

  return NextResponse.json(dishesWithIngredients);
}
