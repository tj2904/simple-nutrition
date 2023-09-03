"use client";
import { useState } from "react";
import LoadingDots from "@/components/loading-dots";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function SaveAsDish({ selectedFood }: any) {
  const [loading, setLoading] = useState(false);
  const [dishName, setDishName] = useState("");
  const [dishDescription, setDishDescription] = useState("");
  const { data: session } = useSession();

  const handleSaveDishClick = async () => {
    setLoading(true);

    fetch("/api/dish/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: session?.user?.email,
        name: dishName,
        description: dishDescription,
        ingredients: selectedFood,
      }),
    }).then(async (res) => {
      console.log(res);
      setLoading(false);
      toast.success("Dish saved successfully!");
    });
  };

  return (
    <>
      <div className="md:w-3/4 md:mx-auto mt-4 border rounded border-slate-800/60 p-3 mx-4 bg-slate-600/60">
        <h1 className="text-xl font-bold mb-2">
          Save these ingredients as a Dish
        </h1>
        {/* Input field for custom dish name */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4 ">
            <label className="block text-sm text-left font-semibold leading-6 text-slate-300">
              Dish Name:
            </label>
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-stone-300 sm:max-w-md">
              <input
                type="text"
                value={dishName}
                onChange={(e) => setDishName(e.target.value)}
                className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-slate-300 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="col-span-5 mt-4">
          <div className="flex justify-between">
            <label className=" block text-sm font-semibold leading-6 text-slate-300">
              Short Description:
            </label>
            <span
              className="text-sm leading-6 text-gray-400"
              id="description-optional"
            >
              Optional
            </span>
          </div>
          <div className="mt-1">
            <input
              type="text"
              value={dishDescription}
              onChange={(e) => setDishDescription(e.target.value)}
              className="block w-full bg-transparent rounded-md border-0 py-1.5 pl-2 text-slate-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stone-300 sm:text-sm sm:leading-6 "
            />
          </div>
        </div>
        <button
          disabled={loading}
          className="mt-4 w-72 border-stone-400 bg-slate-700 text-white hover:bg-stone-300 hover:text-slate-700  h-10  items-center justify-center rounded-md border text-sm transition-all focus:outline-none"
          onClick={handleSaveDishClick}
        >
          {loading ? <LoadingDots color="#808080" /> : "Save as a Dish"}
        </button>
      </div>
      <div></div>
    </>
  );
}
