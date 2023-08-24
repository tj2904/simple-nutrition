"use client";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar({ session }: any) {
  const pathname = usePathname();
  const inSession = session;

  console.log("Session:", inSession);
  return (
    <Disclosure as="nav" className="border-b-[1px] border-b-stone-400">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="w-7 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    data-name="Layer 1"
                    viewBox="0 0 512 640"
                    x="0px"
                    y="0px"
                  >
                    <path d="M38,484.5H271.77c13,12.76,27,19.51,40.94,19.51a93.92,93.92,0,0,0,34.5-6.51,8.06,8.06,0,0,1,5.88,0A93.86,93.86,0,0,0,387.58,504c24.38,0,48.59-20.48,68.19-57.66C471.46,416.57,482,379.23,482,353.44a94.46,94.46,0,0,0-119.47-91.05c4.47-36,30-54.09,31.13-54.9a8,8,0,1,0-9-13.21c-.87.59-12.25,8.58-22.46,24.07a61.92,61.92,0,0,0-6-10V66.12a8,8,0,0,0-8-8H264.77V46.44a8,8,0,0,0-8-8H230.6a36.11,36.11,0,0,0-71.32,0H129.35a8,8,0,0,0-8,8V58.12H38a8,8,0,0,0-8,8V476.5A8,8,0,0,0,38,484.5Zm318.22-203a7.64,7.64,0,0,0,.8-.29,78.46,78.46,0,0,1,109,72.24c0,23.43-9.8,57.77-24.39,85.45-16.45,31.21-36.14,49.12-54,49.12a78.08,78.08,0,0,1-28.65-5.4,23.94,23.94,0,0,0-17.57,0,78.08,78.08,0,0,1-28.65,5.4c-17.88,0-37.58-17.91-54-49.12-14.58-27.68-24.38-62-24.38-85.45a78.45,78.45,0,0,1,109-72.22A17.58,17.58,0,0,0,356.22,281.49ZM342,216.26a45.79,45.79,0,0,1,8.94,18,45.77,45.77,0,0,1-63.35-30.79,45.81,45.81,0,0,1,54.31,12.69ZM137.35,54.44h29a8,8,0,0,0,8-7.61,8,8,0,0,0,.49-2.73,20.11,20.11,0,1,1,40.21,0,8,8,0,0,0,.49,2.73,8,8,0,0,0,8,7.61h25.26V77.79H137.35ZM46,74.12h75.35V85.79a8,8,0,0,0,8,8H256.77a8,8,0,0,0,8-8V74.12h75.36V193.33a61.89,61.89,0,0,0-65.57-1.06,8,8,0,0,0-3.81,7.85A61.71,61.71,0,0,0,348,252.25a101.61,101.61,0,0,0-1.83,12.88A94.46,94.46,0,0,0,218.3,353.44c0,25.79,10.54,63.13,26.23,92.91a186.21,186.21,0,0,0,13.61,22.15H46Z" />
                    <path d="M189.77,123,170.1,135.89V125.46a8,8,0,0,0-8-8H98a8,8,0,0,0-8,8v65.91a8,8,0,0,0,8,8H162.1a8,8,0,0,0,8-8V155l28.43-18.61A8,8,0,0,0,189.77,123ZM154.1,146.36l-15.46,10.12-8.85-9.81a8,8,0,0,0-11.88,10.73l13.44,14.88a8,8,0,0,0,10.32,1.33l12.43-8.13v17.89H106V133.46H154.1Z" />
                    <path d="M189.77,240,170.1,252.83V242.4a8,8,0,0,0-8-8H98a8,8,0,0,0-8,8v65.92a8,8,0,0,0,8,8H162.1a8,8,0,0,0,8-8V272l28.43-18.6A8,8,0,0,0,189.77,240ZM154.1,263.3l-15.46,10.12-8.85-9.8a8,8,0,0,0-11.88,10.72l13.44,14.89a8,8,0,0,0,10.32,1.33l12.43-8.13v17.89H106V250.4H154.1Z" />
                    <path d="M162.1,351.35H98a8,8,0,0,0-8,8v65.92a8,8,0,0,0,8,8H162.1a8,8,0,0,0,8-8V359.35A8,8,0,0,0,162.1,351.35Zm-8,65.92H106V367.35H154.1Z" />
                  </svg>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                    <a
                      href="/"
                      className={`rounded-md px-3 py-2 text-sm font-medium ${
                        pathname === "/"
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-600 hover:text-white"
                      }`}
                    >
                      Home
                    </a>
                    <a
                      href="/multi-search"
                      className={`rounded-md px-3 py-2 text-sm font-medium ${
                        pathname === "/multi-search"
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-600 hover:text-white"
                      }`}
                    >
                      Search
                    </a>
                  </div>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex items-center">
                  {/* <button
                    type="button"
                    className="relative rounded-full  p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button> */}

                  {/* Profile dropdown */}
                  {inSession ? (
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          {/* <img
                    className="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  /> */}
                          <UserCircleIcon className="h-10 w-10 rounded-full bg-slate-700" />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="/profile"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Your Profile
                              </a>
                            )}
                          </Menu.Item>

                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => signOut()}
                                className="block w-full"
                              >
                                <a className="block px-4 py-2 text-left text-sm bg-gray-100 text-gray-700">
                                  Sign out
                                </a>
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  ) : (
                    <Link href="/login">
                      <button className="w-auto px-4 border-stone-400 bg-slate-700 text-white hover:bg-stone-300 hover:text-slate-700  h-10 rounded-md border text-sm transition-all focus:outline-none">
                        Log In / Register
                      </button>
                    </Link>
                  )}
                </div>
              </div>
              <div className="-mr-2 flex sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
              <Disclosure.Button
                as="a"
                href="/"
                className={`block rounded-md ${
                  pathname === "/"
                    ? "bg-gray-900 text-white"
                    : "text-gray-400 hover:bg-gray-600 hover:text-white"
                } px-3 py-2 text-base font-medium`}
              >
                Home
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/multi-search"
                className={`block rounded-md ${
                  pathname === "/multi-search"
                    ? "bg-gray-900 text-white"
                    : "text-gray-400 hover:bg-gray-600 hover:text-white"
                } px-3 py-2 text-base font-medium`}
              >
                Search
              </Disclosure.Button>
            </div>
            <div className="border-t border-slate-400 bg-slate-600 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  {/* <img
                    className="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  /> */}
                  <UserCircleIcon className="h-10 w-10 rounded-full" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">
                    {inSession.user.email}
                  </div>
                  <div className="text-sm font-medium text-gray-400">
                    {inSession.user.email}
                  </div>
                </div>
                {/* <button
                  type="button"
                  className="relative ml-auto flex-shrink-0 rounded-full  p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}
              </div>
              <div className="mt-3 space-y-1 px-2">
                <Disclosure.Button
                  as="a"
                  href="/profile"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-800 hover:text-white"
                >
                  Your Profile
                </Disclosure.Button>

                <Disclosure.Button
                  onClick={() => signOut()}
                  className="block rounded-md w-full text-left px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-800 hover:text-white"
                >
                  Sign out
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
