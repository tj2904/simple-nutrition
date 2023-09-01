import prisma from "@/lib/prisma";
import { cache } from "react";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const revalidate = 0;
export async function GET(req: Request) {
  const dishesWithIngredients = cache(async (id: string) => {
    const getDishesWithIngredients = await prisma.dish.findMany({
      include: {
        ingredients: {
          select: {
            ingredientId: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json(getDishesWithIngredients);
  });
}
