"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Expense } from "@/interfaces/Expense";
import { Category } from "@/interfaces/Category";
import { InputBoxProps } from "@/interfaces/OtherInterface";
import { IRecurringExpense } from "@/interfaces/RecurringExpense";

const API = process.env.NEXT_PUBLIC_BACKEND_URL;

const RecurringExpense = () => {
  const [recurringExpenses, setRecurringExpenses] = useState<
    IRecurringExpense[]
  >([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newExpense, setNewExpense] = useState({
    title: "",
    amount: 0,
    categoryId: "",
    frequency: "monthly",
    startDate: "",
    endDate: "",
    note: "",
    userId: localStorage.getItem("userId"),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchRecurringExpenses = async () => {
      try {
        const result = await fetch(`${API}recurring-expenses`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const response = await result.json();
        setRecurringExpenses(response);
      } catch (error: any) {
        toast.error(error.message);
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
        setCategories(response);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    fetchRecurringExpenses();
    fetchCategories();
  }, [API]);

  const handleExpenseDataChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const name = event.target.name;
    const value =
      event.target.type === "checkbox"
        ? (event.target as HTMLInputElement).checked
        : event.target.value;
    setNewExpense({ ...newExpense, [name]: value });
  };

  const handleAddExpense = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);
    try {
      const result = await fetch(`${API}recurring-expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newExpense),
      });
      const response = await result.json();
      if (!response) {
        throw new Error(response.message);
      }
      toast.success(response.message);
      setRecurringExpenses([...recurringExpenses, response]);
      setNewExpense({
        title: "",
        amount: 0,
        categoryId: "",
        frequency: "monthly",
        startDate: "",
        endDate: "",
        note: "",
        userId: localStorage.getItem("userId"),
      });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteExpense = async (id: string) => {
    try {
      const result = await fetch(`${API}recurring-expenses/${id}`, {
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
      setRecurringExpenses(
        recurringExpenses.filter((expense) => expense._id !== id)
      );
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <section className="bg-gray-1 dark:bg-dark">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[800px] overflow-hidden rounded-lg px-10 py-16 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]">
              <h1 className="mb-10 text-2xl font-bold text-gray-800">
                Recurring Expenses
              </h1>
              <form
                onSubmit={handleAddExpense}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2"
              >
                <InputBox
                  value={newExpense.title}
                  onChange={handleExpenseDataChange}
                  type="text"
                  name="title"
                  placeholder="Title"
                />
                <InputBox
                  value={newExpense.amount.toString()}
                  onChange={handleExpenseDataChange}
                  type="number"
                  name="amount"
                  placeholder="Amount"
                />
                <div className="mb-6">
                  <select
                    name="categoryId"
                    value={newExpense.categoryId}
                    onChange={handleExpenseDataChange}
                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-6">
                  <select
                    name="frequency"
                    value={newExpense.frequency}
                    onChange={handleExpenseDataChange}
                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3"
                    required
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="startDate"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Start Date:
                  </label>
                  <InputBox
                    value={newExpense.startDate}
                    onChange={handleExpenseDataChange}
                    type="date"
                    name="startDate"
                    placeholder="Start Date"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="endDate"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    End Date (optional):
                  </label>
                  <InputBox
                    value={newExpense.endDate}
                    onChange={handleExpenseDataChange}
                    type="date"
                    name="endDate"
                    placeholder="End Date (optional)"
                  />
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <textarea
                    name="note"
                    value={newExpense.note}
                    onChange={handleExpenseDataChange}
                    placeholder="Note"
                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3"
                  />
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <input
                    type="submit"
                    value="Add Recurring Expense"
                    className={`w-full cursor-pointer rounded-md border border-primary bg-blue-600 text-white px-5 py-3 text-base font-medium hover:bg-blue-400 transition hover:bg-opacity-90 ${
                      isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={isSubmitting}
                  />
                </div>
              </form>
              <table className="min-w-full bg-white dark:bg-dark-2 mt-10">
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
                      Frequency
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 dark:border-dark-3">
                      Start Date
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 dark:border-dark-3">
                      End Date
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 dark:border-dark-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recurringExpenses.map((expense) => (
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
                        {expense.frequency}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-dark-3">
                        {new Date(expense.startDate).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-dark-3">
                        {expense.endDate
                          ? new Date(expense.endDate).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-dark-3">
                        <button
                          onClick={() =>
                            router.push(
                              `/recurring-expenses/edit/${expense._id}`
                            )
                          }
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

export default RecurringExpense;

const InputBox: React.FC<InputBoxProps> = ({
  type,
  placeholder,
  name,
  value,
  onChange,
}) => {
  return (
    <div className="mb-6">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3"
        required
      />
    </div>
  );
};
