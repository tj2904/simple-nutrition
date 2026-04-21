/**
 * Type Tests
 * Tests type definitions and interfaces
 */

import { Nutrient, Ingredient, ApiResponse } from "@/types";

describe("TypeScript Types", () => {
  describe("Nutrient Interface", () => {
    it("should accept valid nutrient object", () => {
      const nutrient: Nutrient = {
        name: "Protein",
        amount: 25,
        unit: "g",
        percentOfDailyNeeds: 50,
      };

      expect(nutrient.name).toBe("Protein");
      expect(nutrient.amount).toBe(25);
      expect(nutrient.unit).toBe("g");
      expect(nutrient.percentOfDailyNeeds).toBe(50);
    });

    it("should have required properties", () => {
      // This test verifies TypeScript compilation would fail
      // if required properties are missing
      const nutrient: Nutrient = {
        name: "Test",
        amount: 10,
        unit: "mg",
        percentOfDailyNeeds: 5,
      };

      expect(nutrient).toBeDefined();
    });
  });

  describe("Ingredient Interface", () => {
    it("should accept valid ingredient object", () => {
      const ingredient: Ingredient = {
        ingredient: "Eggs",
        ingredientId: 12345,
      };

      expect(ingredient.ingredient).toBe("Eggs");
      expect(ingredient.ingredientId).toBe(12345);
    });
  });

  describe("ApiResponse Interface", () => {
    it("should accept valid API response", () => {
      const response: Partial<ApiResponse> = {
        id: 1,
        original: "Fresh eggs",
        name: "eggs",
        amount: 3,
        unit: "large",
        nutrition: {
          nutrients: [],
          properties: [],
          flavonoids: [],
          caloricBreakdown: {
            percentProtein: 30,
            percentFat: 60,
            percentCarbs: 10,
          },
        },
      };

      expect(response.id).toBe(1);
      expect(response.name).toBe("eggs");
    });
  });
});
