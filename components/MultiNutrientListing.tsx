import { GoXCircleFill } from "react-icons/go";
import { Nutrient } from "types";

export default function NutritionalListingByValue(props: any) {
  const nutrients = props.nutrients;
  const images = props.images;

  const badNutrients: string[] = [
    "Sugar",
    "Fat",
    "Mono Unsaturated Fat",
    "Poly Unsaturated Fat",
    "Saturated Fat",
    "Alcohol",
    "Sodium",
    "Caffeine",
    "Cholesterol",
  ];

  return (
    <div className="px-2 mx-3">
      <h2 className="text-xl font-semibold text-left text-gray-500">
        Combined nutrients, sorted by highest amount first
      </h2>
      <div className="isolate flex -space-x-1 overflow-hidden mt-1">
        {images.reverse().map((i: any, index: number) => (
          <img
            className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-700 bg-white"
            src={`https://spoonacular.com/cdn/ingredients_100x100/${i}`}
            alt={`Stock photo - ${i}`}
            key={`${i}-${index}`}
          />
        ))}
      </div>
      <ul
        role="list"
        className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
      >
        {nutrients.map((nutrient: Nutrient, index: number) => {
          const containsWord: Boolean = badNutrients.some((word) =>
            nutrient.name.includes(word)
          );
          let itemClassName = "";
          if (!containsWord && nutrient.amount > 0) {
            itemClassName = "bg-lime-700 col-span-1 flex rounded-md shadow-sm";
          } else if (containsWord && nutrient.amount > 0) {
            itemClassName = "bg-red-500 col-span-1 flex rounded-md shadow-sm";
          } else {
            itemClassName = "bg-blue-700 col-span-1 flex rounded-md shadow-sm";
          }
          return (
            <>
              <li key={nutrient.name} className={itemClassName}>
                {nutrient.amount > 0 ? (
                  <div className="flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-bold text-white">
                    {index + 1}
                  </div>
                ) : (
                  <div className="flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white">
                    <GoXCircleFill className="h-5 w-5" />
                  </div>
                )}

                <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-stone-300">
                  <div className="flex-1 px-2 py-2 text-sm font-semibold text-slate-700 divide-y divide-stone-400">
                    {nutrient.name}
                    <br />
                    <span className="text-xs font-normal text-slate-600 ">
                      {Math.round(nutrient.amount * 100) / 100} {nutrient.unit}{" "}
                      *
                    </span>
                  </div>
                </div>
              </li>
            </>
          );
        })}
      </ul>
      <p className="text-sm italic pt-2 text-stone-400">
        * per 100 grams of each selected ingredient.
      </p>
    </div>
  );
}
