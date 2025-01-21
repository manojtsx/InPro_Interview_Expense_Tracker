"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    router.push('/');
  };

  return (
    <header>
      <div className="bg-blue-500 dark:bg-dark">
        <div className="container mx-auto">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-28 h-14 max-w-full px-4 flex items-center ml-4">
              <a href="/" className="block w-full">
                <img
                  src="/icon/logo.png"
                  alt="logo"
                  className="w-full h-full object-contain dark:hidden"
                />
                <img
                  src="/icon/logo.png"
                  alt="logo"
                  className="w-full h-full object-contain hidden dark:block"
                />
              </a>
            </div>
            <div className="flex w-full items-center justify-between px-4">
              <div>
                <button
                  onClick={() => setOpen(!open)}
                  id="navbarToggler"
                  className={`${
                    open && "navbarTogglerActive"
                  } absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden`}
                >
                  <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                  <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                  <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                </button>
                <nav
                  id="navbarCollapse"
                  className={`absolute right-4 top-full w-full max-w-[300px] rounded-lg bg-white px-6 py-5 shadow lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none dark:bg-dark-2 lg:dark:bg-transparent ${
                    !open && "hidden"
                  }`}
                >
                  <ul className="block lg:flex">
                    <li className="relative group">
                      <button
                        className="flex py-2 text-base font-medium text-white hover:text-gray-500 hover:text-dark lg:ml-12 lg:inline-flex dark:text-dark-6 dark:hover:text-white"
                      >
                        Expenses
                      </button>
                      <ul className="absolute left-0 mt-0 w-48 rounded-lg bg-white shadow-lg dark:bg-dark-2 hidden group-hover:block group-hover:group-hover:block">
                        <li>
                          <a
                            href="/expenses"
                            className="block px-4 py-2 text-base font-medium text-gray-800 hover:text-gray-500 hover:text-dark dark:text-dark-6"
                          >
                            View Expenses
                          </a>
                        </li>
                        <li>
                          <a
                            href="/expenses/add"
                            className="block px-4 py-2 text-base font-medium text-gray-800 hover:text-gray-500 hover:text-dark dark:text-dark-6 "
                          >
                            Add Expenses
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="relative group">
                      <button
                        className="flex py-2 text-base font-medium text-white hover:text-gray-500 hover:text-dark lg:ml-12 lg:inline-flex dark:text-dark-6"
                      >
                        Budgets
                      </button>
                      <ul className="absolute left-0 mt-0 w-48 rounded-lg bg-white shadow-lg dark:bg-dark-2 hidden group-hover:block group-hover:group-hover:block">
                        <li>
                          <a
                            href="/budgets/set"
                            className="block px-4 py-2 text-base font-medium text-gray-800 hover:text-gray-500 hover:text-dark dark:text-dark-6 "
                          >
                            Set Budgets
                          </a>
                        </li>
                        <li>
                          <a
                            href="/budgets/delete"
                            className="block px-4 py-2 text-base font-medium text-gray-800 hover:text-gray-500 hover:text-dark dark:text-dark-6"
                          >
                            Delete Budgets
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="relative group">
                      <button
                        className="flex py-2 text-base font-medium text-white hover:text-gray-500 hover:text-dark lg:ml-12 lg:inline-flex dark:text-dark-6"
                      >
                        Categories
                      </button>
                      <ul className="absolute left-0 mt-0 w-48 rounded-lg bg-white shadow-lg dark:bg-dark-2 hidden group-hover:block group-hover:group-hover:block">
                        <li>
                          <a
                            href="/categories"
                            className="block px-4 py-2 text-base font-medium text-gray-800 hover:text-gray-500 hover:text-dark dark:text-dark-6"
                          >
                            View Categories
                          </a>
                        </li>
                        <li>
                          <a
                            href="/categories/add"
                            className="block px-4 py-2 text-base font-medium text-gray-800 hover:text-gray-500 hover:text-dark dark:text-dark-6"
                          >
                            Add Categories
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a
                        href="/reports"
                        className="flex py-2 text-base font-medium text-white hover:text-gray-500 hover:text-dark lg:ml-12 lg:inline-flex dark:text-dark-6"
                      >
                        Reports
                      </a>
                    </li>
                    <li>
                      <a
                        href="/recurring-expenses"
                        className="flex py-2 text-base font-medium text-white hover:text-gray-500 hover:text-dark lg:ml-12 lg:inline-flex dark:text-dark-6"
                      >
                        Recurring Expenses
                      </a>
                    </li>
                    <li>
                      <a
                        href="/notifications"
                        className="flex py-2 text-base font-medium text-white hover:text-gray-500 hover:text-dark lg:ml-12 lg:inline-flex dark:text-dark-6"
                      >
                        Notifications
                      </a>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="flex py-2 text-base font-medium text-white hover:text-gray-500 hover:text-dark lg:ml-12 lg:inline-flex dark:text-dark-6"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}