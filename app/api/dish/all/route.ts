import prisma from "@/lib/prisma";
import { NextApiResponse } from "next";

export default async function GET(req: Request, res: NextApiResponse) {
  try {
    // Fetch data from your database or source
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

    // Set caching headers to prevent caching
    res.setHeader("Cache-Control", "no-store, max-age=0");

    // Return the response as JSON
    res.json(dishesWithIngredients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
