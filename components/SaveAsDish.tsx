"use client";
import { useState } from "react";
import LoadingDots from "@/components/loading-dots";
import { toast } from "react-hot-toast";

export default function SaveAsDish({ selectedFood }: any) {
  const [loading, setLoading] = useState(false);
  const [dishName, setDishName] = useState(""); // State to store the custom dish name

  const handleSaveDishClick = async () => {
    setLoading(true);

    fetch("/api/dish/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: dishName,
        ingredients: selectedFood,
      }),
    }).then(async (res) => {
      console.log(res);
      setLoading(false);
      toast.success("Dish saved successfully!");
    });
  };

  return (
    <div className="mt-4 border rounded p-2  bg-slate-600">
      <h1 className="text-xl font-bold my-2">Save Ingredients as a Dish</h1>
      {/* Input field for custom dish name */}
      <div className="mb-4">
        <label className=" mr-2 font-medium">Custom Dish Name:</label>
        <input
          type="text"
          value={dishName}
          onChange={(e) => setDishName(e.target.value)}
          className="border rounded px-2 py-1 w-1/3 text-black"
        />
        <button
          disabled={loading}
          className="m-4 w-72 border-stone-400 bg-slate-700 text-white hover:bg-stone-300 hover:text-slate-700  h-10  items-center justify-center rounded-md border text-sm transition-all focus:outline-none"
          onClick={handleSaveDishClick}
        >
          {loading ? <LoadingDots color="#808080" /> : "Save as a Dish"}
        </button>
      </div>
    </div>
  );
}
