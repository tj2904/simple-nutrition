import React from "react";

function SelectedIngredientListing({ selectedFood }: any) {
  return (
    <>
      Selected ingredients:
      <div className="capitalize pb-4">
        {selectedFood?.map((f: any) => (
          <span
            key={f.ingredient}
            className="mt-2 inline-flex items-center rounded-full bg-slate-600 ring-1 ring-slate-500 ring-inset px-2 py-1 mx-1 text-xs font-medium text-stone-200"
          >
            {f.ingredient}
          </span>
        ))}
      </div>
    </>
  );
}

export default SelectedIngredientListing;
