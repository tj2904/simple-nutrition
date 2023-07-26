"use client";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button
      className="rounded-md px-2.5 py-1.5 shadow-sm ring-1 ring-inset ring-stone-300 hover:bg-slate-800 text-stone-400 hover:text-stone-200 transition-all"
      onClick={() => signOut()}
    >
      I&apos;m done - sign me out!
    </button>
  );
}
