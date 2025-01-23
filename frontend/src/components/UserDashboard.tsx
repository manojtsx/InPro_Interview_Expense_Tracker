"use client";
import React, { useEffect, useState } from "react";
import { Category } from "@/interfaces/Category";
import { Expense } from "@/interfaces/Expense";
import { User } from "@/interfaces/User";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { toast } from "react-toastify";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface UserDashboardProps {
  userId: string;
}

export default function UserDashboard({ userId }: UserDashboardProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const API = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await fetch(`${API}users/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const response = await result.json();
        setUser(response);
      } catch (error: any) {
        console.error("Failed to fetch user", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const result = await fetch(`${API}categories`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const response = await result.json();
        if (Array.isArray(response)) {
          setCategories(response);
        } else {
          throw new Error(response.message);
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    const fetchExpenses = async () => {
      try {
        const result = await fetch(`${API}expenses`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const response = await result.json();
        if (Array.isArray(response)) {
          setExpenses(response);
        } else {
          throw new Error(response.message);
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    fetchUser();
    fetchCategories();
    fetchExpenses();
  }, [API, userId]);

  const expenseData = {
    labels: categories.map((category) => category.name),
    datasets: [
      {
        label: "Expenses",
        data: categories.map((category) => {
          const categoryExpenses = expenses.filter(
            (expense) => expense.categoryId && expense.categoryId._id === category._id
          );
          return categoryExpenses.reduce(
            (total, expense) => total + expense.amount,
            0
          );
        }),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <section>
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-lg px-10 py-16 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]">
              {user && (
                <div className="mb-10 text-left flex flex-row md:flex-col">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {user.name}
                  </h2>
                  <div className="flex items-center justify-between pr-60">
                    <p className="text-gray-600">{user.email}</p>
                    <p className="text-gray-600">Currency: {user.currency}</p>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h2 className="mb-4 text-xl font-semibold text-gray-800">
                    Expenses Chart
                  </h2>
                  <div className="mb-6">
                    <Bar data={expenseData} />
                  </div>
                  <h2 className="mb-4 text-xl font-semibold text-gray-800">
                    Expenses
                  </h2>
                  <table className="min-w-full bg-white dark:bg-dark-2">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b border-gray-200 dark:border-dark-3">
                          Title
                        </th>
                        <th className="py-2 px-4 border-b border-gray-200 dark:border-dark-3">
                          Amount
                        </th>
                        <th className="py-2 px-4 border-b border-gray-200 dark:border-dark-3">
                          Category
                        </th>
                        <th className="py-2 px-4 border-b border-gray-200 dark:border-dark-3">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {expenses.length > 0 ? (
                        expenses.map((expense) => (
                          <tr key={expense._id}>
                            <td className="py-2 px-4 border-b border-gray-200 dark:border-dark-3">
                              {expense.title}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200 dark:border-dark-3">
                              {expense.amount}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200 dark:border-dark-3">
                              {expense.categoryId ? expense.categoryId.name : "N/A"}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200 dark:border-dark-3">
                              {new Date(expense.date).toLocaleDateString()}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={4}
                            className="py-2 px-4 border-b border-gray-200 dark:border-dark-3"
                          >
                            No expenses found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div>
                  <h2 className="mb-4 text-xl font-semibold text-gray-800">
                    Categories
                  </h2>
                  <ul className="mb-6 text-left">
                    {categories.length > 0 ? (
                      categories.map((category) => (
                        <li
                          key={category._id}
                          className="mb-4 flex items-center text-gray-700"
                        >
                          <span className="mr-2">{category.icon}</span>
                          <span>{category.name}</span>
                        </li>
                      ))
                    ) : (
                      <li className="mb-4 text-gray-700">
                        No categories found
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}