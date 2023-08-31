import { Nutrient } from "../types";
const customUnitOrder: string[] = ["kcal", "IU", "µg", "mg", "g", "kg"];

export function compareObjects(a: Nutrient, b: Nutrient): number {
  const unitA = a.unit.toLowerCase();
  const unitB = b.unit.toLowerCase();
  const valueA = a.amount;
  const valueB = b.amount;

  const indexA = customUnitOrder.indexOf(unitA);
  const indexB = customUnitOrder.indexOf(unitB);

  if (indexA === indexB) {
    return valueB - valueA;
  }

  return indexB - indexA;
}

export function moveZerosToEnd(arr: Nutrient[]): Nutrient[] {
  const zeros = arr.filter((item) => item.amount === 0);
  const nonZeros = arr.filter((item) => item.amount !== 0);
  return [...nonZeros, ...zeros];
}

export function combineNutrientArrays(dataArray: any[]) {
  return dataArray.reduce((accumulator: any[], currentArray: any[]) => {
    currentArray.forEach(
      (currentNutrient: {
        name: string;
        amount: any;
        percentOfDailyNeeds: any;
      }) => {
        const existingNutrient = accumulator.find(
          (nutrient: Nutrient) => nutrient.name === currentNutrient.name
        );

        if (existingNutrient) {
          existingNutrient.amount += currentNutrient.amount;
          existingNutrient.percentOfDailyNeeds +=
            currentNutrient.percentOfDailyNeeds;
        } else {
          accumulator.push({ ...currentNutrient });
        }
      }
    );

    return accumulator;
  }, []);
}
