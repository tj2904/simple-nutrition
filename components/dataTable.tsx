"use client";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Ingredient, ApiResponse, Nutrient } from "../types";
import { fetchNutrients } from "../utils/extApis";
import {
  compareObjects,
  moveZerosToEnd,
  combineNutrientArrays,
} from "../utils/NutrientHandling";
import { toast } from "react-hot-toast";
import LoadingDots from "./loading-dots";

interface Dish {
  id: number;
  name: string;
  description: string;
  ingredients: {
    forEach(arg0: (ingredient: any) => void): unknown;
    map(
      arg0: (ingredient: any) => import("react").JSX.Element
    ): import("react").ReactNode;
    ingredientId: number;
    name: string;
  };
}
[];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

let ApiKey: string | undefined = process.env.NEXT_PUBLIC_API_KEY;

export default function DataTable({
  selectedFood,
  setSelectedFood,
  handleApiResult,
  setApiResult, // Receive setApiResult function
}: {
  selectedFood: Ingredient[];
  setSelectedFood: React.Dispatch<React.SetStateAction<Ingredient[]>>;
  handleApiResult: (result: Nutrient[], fetchedImages: string[]) => void;
  setApiResult: React.Dispatch<React.SetStateAction<Nutrient[] | null>>; // Define the type for setApiResult
}) {
  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedDishes, setSelectedDishes] = useState<Dish[]>([]);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(false);

  const handleApiCall = async () => {
    if (selectedFood && Array.isArray(selectedFood)) {
      // empty array before pushing new image data
      const fetchedImages: string[] = [];
      const fetchPromises = selectedFood.map((food) => {
        const foodId = food.ingredientId;
        return fetch(
          `https://api.spoonacular.com/food/ingredients/${foodId}/information?apiKey=${ApiKey}&amount=100&unit=grams`
        )
          .then((response) => response.json())
          .then((data) => {
            fetchedImages.push(data.image); // Push the image
            
data.nutrition.nutrients.sort(compareObjects);
            const sortedNutrients = moveZerosToEnd(data.nutrition.nutrients);
            return sortedNutrients;
          })
          .catch((error) => {
            console.log("api call error: ", error);
            const capitalisedIngredient = food.ingredient.replace(
              /(^\w{1})|(\s+\w{1})/g,
              (letter: string) => letter.toUpperCase()
            );
            console.log(
              "The ingredient searched for is: ",
              foodId + " " + capitalisedIngredient
            );
            toast.error(
              "Error fetching nutrients for " + capitalisedIngredient
            );
            return null;
          });
      });

      Promise.all(fetchPromises)
        .then((results) => {
          const combinedArray = combineNutrientArrays(results);
          let sortedArray = combinedArray.sort(compareObjects);
          sortedArray = moveZerosToEnd(sortedArray);
          setApiResult(sortedArray);
          handleApiResult(sortedArray, fetchedImages); // Pass fetchedImages back to parent
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      await fetch("/api/dish/all", {
        method: "GET",
      }).then(async (res) => {
        setDishes(await res.json());
        setLoading(false);
      });
    }
    fetchData();
  }, []);

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedDishes.length > 0 && selectedDishes.length < dishes.length;
    setChecked(selectedDishes.length === dishes.length);
    setIndeterminate(isIndeterminate);
    // @ts-ignore
    checkbox.current.indeterminate = isIndeterminate;
  }, [selectedDishes, dishes.length]);

  function toggleAll() {
    setSelectedDishes(checked || indeterminate ? [] : dishes);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  const lookUpAllIngredients = async () => {
    // Step 2: Extract ingredients from each item and flatten the list
    const allIngredients: Ingredient[] = [];
    selectedDishes.forEach((selectedDish) => {
      selectedDish.ingredients.forEach((ingredient: any) => {
        allIngredients.push(ingredient);
      });
    });

    // Step 4: Remove duplicate ingredients (optional)
    const uniqueIngredients = allIngredients.reduce(
      (uniqueList: any[], ingredient: { ingredientId: any }) => {
        if (
          !uniqueList.some((i) => i.ingredientId === ingredient.ingredientId)
        ) {
          uniqueList.push(ingredient);
        }
        return uniqueList;
      },
      [] as Ingredient[]
    );
    setSelectedFood(uniqueIngredients);

    // Now you have a list of all unique ingredients
    console.log("onClick", uniqueIngredients);

    // call the api
    handleApiCall();
  };

  return (
    <div className="mx-auto max-w-7xl ">
      <div className="py-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold leading-6 text-white">
                Dishes
              </h1>
              <p className="mt-2 text-lg text-left text-slate-300">
                A list of all the saved dishes in your account showing their
                name and ingredients.
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none"></div>
          </div>
          <div className="m-1 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                {loading ? (
                  <div className="flex justify-center m-8">
                    <LoadingDots color="#fff" />
                  </div>
                ) : (
                  <table className="min-w-full divide-y divide-slate-300 table-fixed">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="relative px-7 sm:w-12 sm:px-6"
                        >
                          <input
                            type="checkbox"
                            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            // @ts-ignore
                            ref={checkbox}
                            checked={checked}
                            onChange={toggleAll}
                          />
                        </th>
                        <th
                          scope="col"
                          className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-slate-300"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="hidden px-3 py-3.5 text-left text-sm font-semibold text-slate-300 md:table-cell"
                        >
                          Ingredients
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-600">
                      {dishes.map((dish) => (
                        <tr
                          key={dish.id}
                          className={
                            selectedDishes.includes(dish)
                              ? "bg-slate-600"
                              : undefined
                          }
                        >
                          <td className="relative px-7 sm:w-12 sm:px-6">
                            {selectedDishes.includes(dish) && (
                              <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                            )}
                            <input
                              type="checkbox"
                              className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              value={dish.id}
                              checked={selectedDishes.includes(dish)}
                              onChange={(e) =>
                                setSelectedDishes(
                                  e.target.checked
                                    ? [...selectedDishes, dish]
                                    : selectedDishes.filter((p) => p !== dish)
                                )
                              }
                            />
                          </td>
                          <td
                            className={classNames(
                              "whitespace-nowrap pr-3 text-sm font-medium",
                              selectedDishes.includes(dish)
                                ? "text-slate-200"
                                : "text-slate-300",
                              dish.description === null ? " py-4" : "py-2"
                            )}
                          >
                            <div className="font-semibold"> {dish.name}</div>
                            <div className="mt-1 truncate text-slate-400">
                              {dish.description}
                            </div>
                          </td>
                          <td className="hidden px-3 py-4 text-sm md:table-cell">
                            {dish.ingredients.map((i) => (
                              <span
                                key={`${i.ingredientId}-${i.name}`}
                                className=" inline-flex items-center rounded-full bg-slate-600 ring-1 ring-slate-500 ring-inset px-2 py-1 m-1 text-xs font-normal text-center text-stone-200"
                              >
                                {i.name}
                              </span>
                            ))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        className="float-right px-2 mr-2 md:mr-6 mb-8 md:mb-0 border-stone-400 bg-slate-700 text-sm text-white hover:bg-white hover:text-slate-700 h-10 rounded-md border transition-all focus:outline-none"
        onClick={lookUpAllIngredients}
      >
        Search ingredients for all selected dishes
      </button>
    </div>
  );
}
