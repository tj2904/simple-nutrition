"use client";
import SignOut from "@/components/sign-out";
import GetNutrition from "@/components/GetNutrition";

export default function Home() {
  return (
    <div className="flex  bg-slate-700">
      <div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center">
        <h1 className="text-white font-bold text-2xl">You&apos;re in! </h1>
        <GetNutrition />
        <SignOut />
      </div>
    </div>
  );
}
