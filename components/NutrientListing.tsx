import { GoCheckCircleFill, GoXCircleFill } from "react-icons/go";

export default function NutritionalListing(nut: any) {
  const nutrients = nut.nutrients;
  return (
    <div className="px-2">
      <h2 className="text-xl font-semibold text-left text-gray-500">
        Nutrients
      </h2>

      <ul
        role="list"
        className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
      >
        {nutrients.map((nutrient: any) => (
          <li
            key={nutrient.name}
            className="col-span-1 flex rounded-md shadow-sm"
          >
            {nutrient.amount > 0 ? (
              <div className="bg-lime-700 flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white">
                <GoCheckCircleFill className="h-5 w-5" />
              </div>
            ) : (
              <div className="bg-red-500 flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white">
                <GoXCircleFill className="h-5 w-5" />
              </div>
            )}

            <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-stone-300">
              <div className="flex-1 px-4 py-2 text-sm text-slate-700">
                {nutrient.name}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
