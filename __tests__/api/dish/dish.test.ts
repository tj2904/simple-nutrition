/**
 * API Route Tests for Dish Creation
 * Tests dish creation and ingredient management
 */

import { POST } from "@/app/api/dish/route";
import prisma from "@/lib/prisma";

jest.mock("@/lib/prisma");

describe("POST /api/dish", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully create a dish with ingredients", async () => {
    const mockDish = {
      id: 1,
      userEmail: "user@example.com",
      name: "Pasta Carbonara",
      description: "Classic Italian pasta",
      createdAt: new Date(),
      updatedAt: new Date(),
      ingredients: [
        { id: 1, ingredientId: 1, name: "Eggs", dishId: 1 },
        { id: 2, ingredientId: 2, name: "Bacon", dishId: 1 },
      ],
    };

    (prisma.dish.create as jest.Mock).mockResolvedValue(mockDish);

    const request = new Request("http://localhost:3000/api/dish", {
      method: "POST",
      body: JSON.stringify({
        userEmail: "user@example.com",
        name: "Pasta Carbonara",
        description: "Classic Italian pasta",
        ingredients: [
          { ingredient: "Eggs", ingredientId: 1 },
          { ingredient: "Bacon", ingredientId: 2 },
        ],
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.name).toBe("Pasta Carbonara");
    expect(data.ingredients).toHaveLength(2);
    expect(prisma.dish.create).toHaveBeenCalled();
  });

  it("should create dish with correct ingredient structure", async () => {
    (prisma.dish.create as jest.Mock).mockResolvedValue({
      id: 1,
      userEmail: "user@example.com",
      name: "Test Dish",
      description: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      ingredients: [],
    });

    const request = new Request("http://localhost:3000/api/dish", {
      method: "POST",
      body: JSON.stringify({
        userEmail: "user@example.com",
        name: "Test Dish",
        ingredients: [
          { ingredient: "Ingredient1", ingredientId: 1 },
          { ingredient: "Ingredient2", ingredientId: 2 },
        ],
      }),
    });

    await POST(request);

    expect(prisma.dish.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          userEmail: "user@example.com",
          name: "Test Dish",
          ingredients: expect.objectContaining({
            create: expect.arrayContaining([
              expect.objectContaining({
                name: "Ingredient1",
                ingredientId: 1,
              }),
            ]),
          }),
        }),
      }),
    );
  });

  it("should create dish with optional description", async () => {
    (prisma.dish.create as jest.Mock).mockResolvedValue({
      id: 1,
      userEmail: "user@example.com",
      name: "Dish with Description",
      description: "A detailed description",
      createdAt: new Date(),
      updatedAt: new Date(),
      ingredients: [],
    });

    const request = new Request("http://localhost:3000/api/dish", {
      method: "POST",
      body: JSON.stringify({
        userEmail: "user@example.com",
        name: "Dish with Description",
        description: "A detailed description",
        ingredients: [],
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(data.description).toBe("A detailed description");
  });

  it("should handle dish creation with empty ingredients array", async () => {
    (prisma.dish.create as jest.Mock).mockResolvedValue({
      id: 1,
      userEmail: "user@example.com",
      name: "Empty Dish",
      description: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      ingredients: [],
    });

    const request = new Request("http://localhost:3000/api/dish", {
      method: "POST",
      body: JSON.stringify({
        userEmail: "user@example.com",
        name: "Empty Dish",
        ingredients: [],
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(data.ingredients).toEqual([]);
  });

  it("should include ingredients in response", async () => {
    (prisma.dish.create as jest.Mock).mockResolvedValue({
      id: 1,
      userEmail: "user@example.com",
      name: "Test",
      description: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      ingredients: [{ id: 1, ingredientId: 1, name: "Ingredient1", dishId: 1 }],
    });

    const request = new Request("http://localhost:3000/api/dish", {
      method: "POST",
      body: JSON.stringify({
        userEmail: "user@example.com",
        name: "Test",
        ingredients: [{ ingredient: "Ingredient1", ingredientId: 1 }],
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(prisma.dish.create).toHaveBeenCalledWith(
      expect.objectContaining({
        include: { ingredients: true },
      }),
    );
  });
});
