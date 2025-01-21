"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Expense } from "@/interfaces/Expense";
import { Montserrat } from "next/font/google";
const API = process.env.NEXT_PUBLIC_BACKEND_URL;

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const ViewExpense = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const result = await fetch(`${API}expenses`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const response = await result.json();
        if (!response) {
          throw new Error("Failed to fetch expenses");
        }
        setExpenses(response);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    fetchExpenses();
  }, []);

  const handleAddExpense = () => {
    router.push("/expenses/add");
  };

  const handleEditExpense = (id: string) => {
    router.push(`/expenses/edit/${id}`);
  };

  const handleDeleteExpense = async (id: string) => {
    try {
      const result = await fetch(`${API}expenses/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const response = await result.json();
      if (!response) {
        throw new Error("Failed to delete expense");
      }
      toast.success(response.message);
      setExpenses(expenses.filter((expense) => expense._id !== id));
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredExpenses = expenses.filter((expense) =>
    expense.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section
      className={`bg-gray-1 dark:bg-dark ${montserrat.className}`}
    >
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[800px] overflow-hidden rounded-lg px-10 py-16 text-center sm:px-12 md:px-[60px]">
              <div className="mb-6 text-right">
                <button
                  onClick={handleAddExpense}
                  className="inline-block rounded-md bg-blue-600 text-white px-5 py-2 text-base font-medium hover:bg-blue-400 transition hover:bg-opacity-90"
                >
                  Add Expense
                </button>
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Search expenses..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3"
                />
              </div>
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
                      Date
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 dark:border-dark-3">
                      Category
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 dark:border-dark-3">
                      User
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 dark:border-dark-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExpenses.map((expense) => (
                    <tr key={expense._id}>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-dark-3">
                        {expense.title}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-dark-3">
                        {expense.amount}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-dark-3">
                        {new Date(expense.date).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-dark-3">
                        {expense.categoryId.name}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-dark-3">
                        {expense.userId.name}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-dark-3">
                        <button
                          onClick={() => handleEditExpense(expense._id)}
                          className="inline-block rounded-md bg-yellow-500 text-white px-3 py-1 text-sm font-medium hover:bg-yellow-400 transition hover:bg-opacity-90 mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteExpense(expense._id)}
                          className="inline-block rounded-md bg-red-600 text-white px-3 py-1 text-sm font-medium hover:bg-red-400 transition hover:bg-opacity-90"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewExpense;