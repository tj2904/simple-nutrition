/**
 * Utility Tests for Nutrient Handling
 * Tests the nutrient combining, sorting, and filtering logic
 */

import {
  compareObjects,
  moveZerosToEnd,
  combineNutrientArrays,
} from "@/utils/NutrientHandling";
import { Nutrient } from "@/types";

describe("NutrientHandling Utilities", () => {
  describe("compareObjects", () => {
    it("should sort nutrients by custom unit order", () => {
      const nutrient1: Nutrient = {
        name: "Calories",
        amount: 100,
        unit: "kcal",
        percentOfDailyNeeds: 5,
      };
      const nutrient2: Nutrient = {
        name: "Vitamin A",
        amount: 500,
        unit: "IU",
        percentOfDailyNeeds: 10,
      };

      const result = compareObjects(nutrient1, nutrient2);
      expect(result).toBeLessThan(0); // kcal should come before IU
    });

    it("should sort nutrients with same unit by amount descending", () => {
      const nutrient1: Nutrient = {
        name: "Vitamin A",
        amount: 300,
        unit: "µg",
        percentOfDailyNeeds: 10,
      };
      const nutrient2: Nutrient = {
        name: "Vitamin B6",
        amount: 200,
        unit: "µg",
        percentOfDailyNeeds: 15,
      };

      const result = compareObjects(nutrient1, nutrient2);
      // When units match, returns valueB - valueA (200 - 300 = -100), so nutrient1 sorts first
      expect(result).toBeLessThan(0);
    });

    it("should handle case-insensitive unit comparison", () => {
      const nutrient1: Nutrient = {
        name: "Test1",
        amount: 100,
        unit: "MG",
        percentOfDailyNeeds: 5,
      };
      const nutrient2: Nutrient = {
        name: "Test2",
        amount: 50,
        unit: "mg",
        percentOfDailyNeeds: 3,
      };

      const result = compareObjects(nutrient1, nutrient2);
      // When units match, returns valueB - valueA (50 - 100 = -50)
      expect(result).toBeLessThan(0);
    });
  });

  describe("moveZerosToEnd", () => {
    it("should move nutrients with zero amount to the end", () => {
      const nutrients: Nutrient[] = [
        { name: "A", amount: 100, unit: "mg", percentOfDailyNeeds: 10 },
        { name: "B", amount: 0, unit: "mg", percentOfDailyNeeds: 0 },
        { name: "C", amount: 50, unit: "mg", percentOfDailyNeeds: 5 },
        { name: "D", amount: 0, unit: "mg", percentOfDailyNeeds: 0 },
      ];

      const result = moveZerosToEnd(nutrients);

      expect(result).toEqual([
        { name: "A", amount: 100, unit: "mg", percentOfDailyNeeds: 10 },
        { name: "C", amount: 50, unit: "mg", percentOfDailyNeeds: 5 },
        { name: "B", amount: 0, unit: "mg", percentOfDailyNeeds: 0 },
        { name: "D", amount: 0, unit: "mg", percentOfDailyNeeds: 0 },
      ]);
    });

    it("should handle array with no zeros", () => {
      const nutrients: Nutrient[] = [
        { name: "A", amount: 100, unit: "mg", percentOfDailyNeeds: 10 },
        { name: "B", amount: 50, unit: "mg", percentOfDailyNeeds: 5 },
      ];

      const result = moveZerosToEnd(nutrients);

      expect(result).toEqual(nutrients);
    });

    it("should handle array with all zeros", () => {
      const nutrients: Nutrient[] = [
        { name: "A", amount: 0, unit: "mg", percentOfDailyNeeds: 0 },
        { name: "B", amount: 0, unit: "mg", percentOfDailyNeeds: 0 },
      ];

      const result = moveZerosToEnd(nutrients);

      expect(result).toEqual(nutrients);
    });

    it("should handle empty array", () => {
      const nutrients: Nutrient[] = [];

      const result = moveZerosToEnd(nutrients);

      expect(result).toEqual([]);
    });
  });

  describe("combineNutrientArrays", () => {
    it("should combine multiple nutrient arrays", () => {
      const dataArray = [
        [
          { name: "Protein", amount: 10, percentOfDailyNeeds: 20 },
          { name: "Fat", amount: 5, percentOfDailyNeeds: 7 },
        ],
        [
          { name: "Protein", amount: 15, percentOfDailyNeeds: 30 },
          { name: "Carbs", amount: 20, percentOfDailyNeeds: 6 },
        ],
      ];

      const result = combineNutrientArrays(dataArray);

      expect(result).toContainEqual({
        name: "Protein",
        amount: 25,
        percentOfDailyNeeds: 50,
      });
      expect(result).toContainEqual({
        name: "Fat",
        amount: 5,
        percentOfDailyNeeds: 7,
      });
      expect(result).toContainEqual({
        name: "Carbs",
        amount: 20,
        percentOfDailyNeeds: 6,
      });
    });

    it("should handle single array", () => {
      const dataArray = [
        [
          { name: "Protein", amount: 10, percentOfDailyNeeds: 20 },
          { name: "Fat", amount: 5, percentOfDailyNeeds: 7 },
        ],
      ];

      const result = combineNutrientArrays(dataArray);

      expect(result).toEqual(dataArray[0]);
    });

    it("should handle empty arrays", () => {
      const dataArray = [[], []];

      const result = combineNutrientArrays(dataArray);

      expect(result).toEqual([]);
    });

    it("should correctly sum percentOfDailyNeeds", () => {
      const dataArray = [
        [{ name: "Vitamin C", amount: 50, percentOfDailyNeeds: 25 }],
        [{ name: "Vitamin C", amount: 30, percentOfDailyNeeds: 15 }],
        [{ name: "Vitamin C", amount: 20, percentOfDailyNeeds: 10 }],
      ];

      const result = combineNutrientArrays(dataArray);

      expect(result).toHaveLength(1);
      expect(result[0].amount).toBe(100);
      expect(result[0].percentOfDailyNeeds).toBe(50);
    });
  });
});
