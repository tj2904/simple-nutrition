"use client";
import { useEffect, useState } from "react";

export default function currentProfile(email: any) {
  const [details, setDetails]: any = useState();

  useEffect(() => {
    fetch("/api/user/details", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.email,
      }),
    }).then(async (res) => {
      if (res.status === 200) {
        const data = await res.json();
        setDetails(data.data);
      } else {
        console.log(res);
      }
    });
  }, []);

  return (
    <div>
      <div className="p-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-white">
          Current Profile Information
        </h3>
      </div>
      <div className=" border-t border-white/10">
        <dl className="divide-y divide-white/10">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-white">
              Full name
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
              {details?.firstName} {details?.surname}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-white">
              Email address
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
              {details?.email}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
