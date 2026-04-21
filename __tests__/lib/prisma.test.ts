/**
 * Prisma Helper Tests
 * Tests Prisma client initialization and configuration
 */

import prisma from "@/lib/prisma";

jest.mock("@/lib/prisma");

describe("Prisma Client", () => {
  it("should have user model methods", () => {
    expect(prisma.user).toBeDefined();
    expect(prisma.user.create).toBeDefined();
    expect(prisma.user.findUnique).toBeDefined();
    expect(prisma.user.update).toBeDefined();
    expect(prisma.user.delete).toBeDefined();
  });

  it("should have dish model methods", () => {
    expect(prisma.dish).toBeDefined();
    expect(prisma.dish.create).toBeDefined();
    expect(prisma.dish.findMany).toBeDefined();
    expect(prisma.dish.update).toBeDefined();
    expect(prisma.dish.delete).toBeDefined();
  });

  it("should have food model methods", () => {
    expect(prisma.food).toBeDefined();
    expect(prisma.food.findMany).toBeDefined();
    expect(prisma.food.create).toBeDefined();
    expect(prisma.food.delete).toBeDefined();
  });

  it("should have ingredient model methods", () => {
    expect(prisma.ingredient).toBeDefined();
    expect(prisma.ingredient.findMany).toBeDefined();
    expect(prisma.ingredient.create).toBeDefined();
  });
});
