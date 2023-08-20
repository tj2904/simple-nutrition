"use client";
import { useState, useEffect } from "react";

interface Dish {
  id: number;
  name: string;
  ingredients: {
    ingredientId: number;
    name: string;
  };

const DataTable: React.FC = () => {

  const [dishes, setDishes] = useState<Dish[]>([]);

  useEffect(() => {
    async function fetchData() {
      await fetch("/api/dish/all", {
        method: "GET",
      }).then(async (res) => {
        setDishes(await res.json());
      });
    }
    fetchData();
  }, []);

  const handleRowClick = (selectedDish: Dish) => {
    // Here you can access the selected dish and its ingredients
    console.log("row clicked");
  };

  return (
    <div className="mx-auto max-w-7xl ">
      <div className="py-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex  sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold leading-6 text-white">
                Dishes
              </h1>
              <p className="mt-2 text-sm text-gray-300">
                A list of all the saved dishes in your account showing their
                name and ingredients.
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none"></div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-slate-300 table-fixed">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                      >
                        Ingredients
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-600">
                    {dishes.map((dish) => (
                      <tr key={dish.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                          {dish.name}
                        </td>
                        <td className="px-3 py-4 text-sm">
                          {dish.ingredients.map((ingredient) => (
                            <span
                              key={`${ingredient.ingredientId}-${ingredient.name}`}
                              className=" inline-flex items-center rounded-full bg-slate-600 ring-1 ring-slate-500 ring-inset px-2 py-1 m-1 text-xs font-medium text-stone-200"
                            >
                              {ingredient.name}
                            </span>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
