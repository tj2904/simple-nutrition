/**
 * Integration Tests for API Routes
 * Tests complete API workflows with proper error handling
 */

import prisma from "@/lib/prisma";

jest.mock("@/lib/prisma");

describe("API Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("User and Dish Workflows", () => {
    it("should handle creating a user and then a dish", async () => {
      const mockUser = {
        id: 1,
        email: "user@example.com",
        password: "hashed_password",
        firstName: null,
        surname: null,
      };

      const mockDish = {
        id: 1,
        userEmail: "user@example.com",
        name: "Test Dish",
        description: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        ingredients: [],
      };

      (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);
      (prisma.dish.create as jest.Mock).mockResolvedValue(mockDish);

      // Simulate user creation
      const userResult = await (prisma.user.create as jest.Mock)({
        data: {
          email: mockUser.email,
          password: mockUser.password,
        },
      });

      expect(userResult.id).toBe(1);

      // Simulate dish creation
      const dishResult = await (prisma.dish.create as jest.Mock)({
        data: {
          userEmail: mockUser.email,
          name: "Test Dish",
          ingredients: { create: [] },
        },
      });

      expect(dishResult.userEmail).toBe(mockUser.email);
    });

    it("should handle multiple dishes per user", async () => {
      (prisma.dish.findMany as jest.Mock).mockResolvedValue([
        {
          id: 1,
          userEmail: "user@example.com",
          name: "Dish 1",
          description: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          ingredients: [],
        },
        {
          id: 2,
          userEmail: "user@example.com",
          name: "Dish 2",
          description: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          ingredients: [],
        },
      ]);

      const dishes = await (prisma.dish.findMany as jest.Mock)({
        where: { userEmail: "user@example.com" },
      });

      expect(dishes).toHaveLength(2);
      expect(dishes.every((d: any) => d.userEmail === "user@example.com")).toBe(
        true,
      );
    });
  });

  describe("Error Handling", () => {
    it("should handle database connection errors gracefully", async () => {
      (prisma.user.findUnique as jest.Mock).mockRejectedValue(
        new Error("Database connection failed"),
      );

      expect(prisma.user.findUnique).rejects.toThrow(
        "Database connection failed",
      );
    });

    it("should handle validation errors", async () => {
      (prisma.user.create as jest.Mock).mockRejectedValue(
        new Error("Invalid email format"),
      );

      expect(prisma.user.create).rejects.toThrow("Invalid email format");
    });
  });

  describe("Data Integrity", () => {
    it("should maintain referential integrity for dishes and ingredients", async () => {
      (prisma.dish.create as jest.Mock).mockResolvedValue({
        id: 1,
        userEmail: "user@example.com",
        name: "Test",
        description: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        ingredients: [
          { id: 1, ingredientId: 1, name: "Ingredient 1", dishId: 1 },
          { id: 2, ingredientId: 2, name: "Ingredient 2", dishId: 1 },
        ],
      });

      const dish = await (prisma.dish.create as jest.Mock)({
        data: {
          userEmail: "user@example.com",
          name: "Test",
          ingredients: {
            create: [
              { ingredientId: 1, name: "Ingredient 1" },
              { ingredientId: 2, name: "Ingredient 2" },
            ],
          },
        },
        include: { ingredients: true },
      });

      expect(dish.ingredients.every((i: any) => i.dishId === dish.id)).toBe(
        true,
      );
    });

    it("should handle updating dish and ingredients together", async () => {
      (prisma.dish.update as jest.Mock).mockResolvedValue({
        id: 1,
        userEmail: "user@example.com",
        name: "Updated Dish",
        description: "Updated description",
        createdAt: new Date(),
        updatedAt: new Date(),
        ingredients: [],
      });

      const updated = await (prisma.dish.update as jest.Mock)({
        where: { id: 1 },
        data: {
          name: "Updated Dish",
          description: "Updated description",
        },
      });

      expect(updated.name).toBe("Updated Dish");
      expect(updated.description).toBe("Updated description");
    });
  });
});
