import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userEmail, name, ingredients, description } = await req.json();
  // const exists = await prisma.dish.findUnique({
  //   where: {
  //     name,
  //   },
  // });
  // if (exists) {
  //   return NextResponse.json({ error: "Dish already exists" }, { status: 400 });
  // } else
  {
    const dish = await prisma.dish.create({
      data: {
        userEmail,
        name,
        description,
        ingredients: {
          create: ingredients.map((ingredient: any) => ({
            name: ingredient.ingredient,
            ingredientId: ingredient.ingredientId,
          })),
        },
      },
      include: {
        ingredients: true,
      },
    });
    return NextResponse.json(dish);
  }
}
