import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  console.log("start of api route");
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
  console.log("api route: ", dishesWithIngredients);
  return NextResponse.json(dishesWithIngredients);
}
