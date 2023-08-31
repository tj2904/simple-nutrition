"use client";
import MultiNutrientListing from "@/components/MultiNutrientListing";
import DataTable from "@/components/dataTable";
import { useState } from "react";
import { Ingredient, Nutrient } from "types";

export default function Dishes() {
  const [selectedFood, setSelectedFood] = useState<Ingredient[]>([]);
  const [apiResult, setApiResult] = useState<Nutrient[] | null>(null);
  const [images, setImages] = useState<string[]>([]);

  const handleApiResult = (result: Nutrient[], fetchedImages: string[]) => {
    setApiResult(result);
    setImages(fetchedImages);
  };

  return (
    <>
      <section className="min-h-screen">
        <DataTable
          selectedFood={selectedFood}
          setSelectedFood={setSelectedFood}
          handleApiResult={handleApiResult}
          setApiResult={setApiResult} // Pass setApiResult function
        />
      </section>
      {apiResult && (
        <section className="max-w-screen-xl mx-auto clear-both mt-8 md:-mt-36">
          <h3 className="font-semibold text-xl ml-5">Nutritional Content</h3>
          <MultiNutrientListing nutrients={apiResult} images={images} />
        </section>
      )}
    </>
  );
}
