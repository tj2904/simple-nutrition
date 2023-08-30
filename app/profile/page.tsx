"use client";
import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useSession } from "next-auth/react";
import CurrentProfile from "@/components/currentProfile";

export default function Profile() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  return (
    <div className="max-w-screen-md mx-auto px-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          fetch("/api/user/update", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: session?.user?.email,
              firstName: e.currentTarget.firstName.value,
              surname: e.currentTarget.surname.value,
            }),
          }).then(async (res) => {
            setLoading(false);
            if (res.status === 200) {
              toast.success("Profile updated!");
              location.reload();
            } else {
              const { error } = await res.json();
              toast.error(error);
            }
          });
        }}
      >
        <div className="space-y-12 ">
          <div className="border-b border-white/10 py-12">
            <h1 className="font-semibold text-xl leading-7 text-white">
              Profile
            </h1>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              This information will be displayed publicly so be careful what you
              share.
            </p>
            {session !== undefined && session !== null && session.user && (
              <CurrentProfile email={session.user.email} />
            )}

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  <span className="font-light line-through ">Photo</span> (Not
                  currently avaliable)
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <UserCircleIcon
                    className="h-12 w-12 text-gray-500"
                    aria-hidden="true"
                  />
                  <button
                    disabled={true}
                    type="button"
                    className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-white/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-white">
              Add Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Optional, only add the informaiton you want to share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    autoComplete="given-name"
                    placeholder="John"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="surname"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="surname"
                    id="surname"
                    autoComplete="family-name"
                    placeholder="Doe"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            disabled={loading}
            className={`${
              loading
                ? "cursor-not-allowed border-gray-200 bg-gray-100"
                : "border-stone-400 bg-slate-700 text-white hover:bg-white hover:text-slate-700"
            } flex h-10 w-40 px-4 items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
          >
            {loading ? <LoadingDots color="#808080" /> : <p>Update Name</p>}
          </button>
        </div>
      </form>
    </div>
  );
}
