"use client";
import MultiNutrientListing from "@/components/MultiNutrientListing";
import DataTable from "@/components/dataTable";
import { useState } from "react";
import toast from "react-hot-toast";
import { Ingredient, Nutrient } from "types";
import {
  combineNutrientArrays,
  compareObjects,
  moveZerosToEnd,
} from "utils/NutrientHandling";

let ApiKey: string | undefined = process.env.NEXT_PUBLIC_API_KEY;

export default function Dishes() {
  const [selectedFood, setSelectedFood] = useState<Ingredient[]>([]);
  const [apiResult, setApiResult] = useState<Nutrient[] | null>(null);
  const [images, setImages] = useState<string[]>([]);

  const handleApiResult = (result: Nutrient[], fetchedImages: string[]) => {
    setApiResult(result);
    setImages(fetchedImages);
  };

  return (
    <section className="min-h-screen">
      <DataTable
        selectedFood={selectedFood}
        setSelectedFood={setSelectedFood}
        handleApiResult={handleApiResult}
        setApiResult={setApiResult} // Pass setApiResult function
      />
      {apiResult && (
        <section className="max-w-screen-xl mx-auto">
          <h1 className="font-bold text-2xl">Nutritional Content</h1>
          <MultiNutrientListing nutrients={apiResult} images={images} />
        </section>
      )}
    </section>
  );
}
