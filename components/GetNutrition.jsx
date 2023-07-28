import React, { useEffect, useState } from "react";
import NutrientListing from "./NutrientListing";
function GetNutrition() {
  let ApiKey = process.env.NEXT_PUBLIC_API_KEY;
  const [selectedFood, setSelectedFood] = useState("");
  const [nutritionData, setNutrition] = useState("");

  const handleFoodChange = (event) => {
    setSelectedFood(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Make the API call using the selectedFood value
    // Replace the API URL and parameters with your own
    const apiUrl = `https://api.spoonacular.com/food/ingredients/${selectedFood}/information?amount=1&apiKey=${ApiKey}`;

    fetch(
      `https://api.spoonacular.com/food/ingredients/${selectedFood}/information?amount=1&apiKey=${ApiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        data.nutrition.nutrients.sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
        setNutrition(data);
        console.log("nutritionData", data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Object { id: 9040, name: "banana", image: "bananas.jpg" }
  // 9266 pineapple
  //11124

  return (
    <>
      <div className="mt-6">
        <form onSubmit={handleFormSubmit}>
          <div className="Select a food">
            <label
              htmlFor="food-select"
              className="block text-sm font-medium leading-6 text-stone-300"
            >
              Select a food:
            </label>
            <select
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              name="Select a food"
              id="food-select"
              defaultValue="Select..."
              value={selectedFood}
              onChange={handleFoodChange}
            >
              <option value="">Select...</option>
              <option value="11124">Carrots</option>
              <option value="9266">Pineapple</option>
              <option value="9040">Banana</option>
            </select>
          </div>
          <button
            type="submit"
            className=" rounded-md px-2.5 mt-4 py-1.5 shadow-sm ring-1 ring-inset ring-stone-300 hover:bg-slate-800 text-stone-400 hover:text-stone-200 transition-all"
          >
            Submit
          </button>
        </form>
      </div>
      {nutritionData && (
        <NutrientListing nutrients={nutritionData.nutrition.nutrients} />
      )}
    </>
  );
}

export default GetNutrition;
