import Link from "next/link";
import { FaNutritionix } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex h-screen bg-slate-700">
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <FaNutritionix className="text-stone-200 text-6xl" />
        <div className="text-center max-w-screen-sm mb-10">
          <h1 className="text-stone-200 font-bold text-2xl">
            Simple Nutrition
          </h1>
          <p className="text-stone-400 mt-5">
            Keep track of your daily nutrition intake.
          </p>
        </div>
        <div className="flex space-x-3">
          <Link href="/login">
            <button className="w-36 border-stone-400 bg-slate-700 text-white hover:bg-white hover:text-slate-700  h-10  items-center justify-center rounded-md border text-sm transition-all focus:outline-none">
              Sign In
            </button>
          </Link>
          <Link href="/register">
            <button className="w-36 border-stone-400 bg-slate-700 text-white hover:bg-white hover:text-slate-700  h-10  items-center justify-center rounded-md border text-sm transition-all focus:outline-none">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
