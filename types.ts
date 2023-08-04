export interface Ingredient {
  ingredient: string;
  ingredientId: number;
}
// types.d.ts

export interface Nutrient {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
}

interface EstimatedCost {
  value: number;
  unit: string;
}

export interface ApiResponse {
  id: number;
  original: string;
  originalName: string;
  name: string;
  amount: number;
  unit: string;
  unitShort: string;
  unitLong: string;
  possibleUnits: string[];
  estimatedCost: EstimatedCost;
  consistency: string;
  shoppingListUnits: string[];
  aisle: string;
  image: string;
  meta: any[]; // You can replace 'any' with a more specific type if needed
  nutrition: {
    nutrients: Nutrient[];
    properties: {
      name: string;
      amount: number;
      unit: string;
    }[];
    flavonoids: {
      name: string;
      amount: number;
      unit: string;
    }[];
    caloricBreakdown: {
      percentProtein: number;
      percentFat: number;
      percentCarbs: number;
    };
    weightPerServing: {
      amount: number;
      unit: string;
    };
  };
  categoryPath: string[];
}
