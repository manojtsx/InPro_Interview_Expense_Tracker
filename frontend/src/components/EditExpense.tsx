"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter, useParams } from "next/navigation";
import { InputBoxProps } from "@/interfaces/OtherInterface";
import { Category } from "@/interfaces/Category";
const API = process.env.NEXT_PUBLIC_BACKEND_URL;

const EditExpense = () => {
  const router = useRouter();
  const { id } = useParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [expense, setExpense] = useState({
    title: "",
    amount: 0,
    categoryId: "",
    date: "",
    isRecurring: false,
    note: "",
    userId: localStorage.getItem("userId")
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await fetch(`${API}categories`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const response = await result.json();
        if (!response) {
          throw new Error("Failed to fetch categories");
        }
        console.log(response);
        setCategories(response);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    const fetchExpense = async () => {
      try {
        const result = await fetch(`${API}expenses/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const response = await result.json();
        if (!response) {
          throw new Error(response.message);
        }
        console.log(response);
        setExpense({
            ...response,
            date: response.date ? new Date(response.date).toISOString().slice(0, 10) : '', // Ensure a valid date format
          });
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    fetchCategories();
    fetchExpense();
  }, [API, id]);

  const handleExpenseDataChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!expense) return;
    const name = event.target.name;
    const value = event.target.type === "checkbox" ? (event.target as HTMLInputElement).checked : event.target.value;
    setExpense({ ...expense, [name]: value });
  };

  const handleEditExpense = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting || !expense) return; // Prevent multiple submissions
    setIsSubmitting(true);
    const expenseData = {
      ...expense,
      amount: Number(expense.amount),
      date: new Date(expense.date).toISOString().slice(0, 10)
    };
    console.log(expenseData);
    try {
      const result = await fetch(`${API}expenses/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(expenseData)
      });
      const response = await result.json();
      if (!response) {
        throw new Error(response.message);
      }
      toast.success(response.message);
      router.push(`/expenses`);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!expense) {
    return <div>Loading...</div>;
  }

  return (
    <section className="bg-gray-1 py-20 dark:bg-dark lg:py-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white px-10 py-16 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]">
              <div className="mb-10 text-center md:mb-16">
                <a href="/" className="mx-auto inline-block max-w-[160px]">
                  <img src="/icon/logo.png" alt="logo" />
                </a>
              </div>
              <form onSubmit={handleEditExpense} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <InputBox value={expense.title} onChange={handleExpenseDataChange} type="text" name="title" placeholder="Title" />
                <InputBox value={expense.amount.toString()} onChange={handleExpenseDataChange} type="number" name="amount" placeholder="Amount" />
                <div className="mb-6">
                  <select
                    name="categoryId"
                    value={expense.categoryId ? expense.categoryId.toString() : ""}
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
                <InputBox value={new Date(expense.date).toISOString().slice(0, 10)} onChange={handleExpenseDataChange} type="date" name="date" placeholder="Date" />
                <div className="mb-6 flex items-center">
                  <input
                    type="checkbox"
                    name="isRecurring"
                    checked={expense.isRecurring}
                    onChange={handleExpenseDataChange}
                    className="mr-2"
                  />
                  <label htmlFor="isRecurring" className="text-base text-body-color dark:text-dark-6">Recurring</label>
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <textarea
                    name="note"
                    value={expense.note}
                    onChange={handleExpenseDataChange}
                    placeholder="Note"
                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3"
                  />
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <input
                    type="submit"
                    value="Edit Expense"
                    className={`w-full cursor-pointer rounded-md border border-primary bg-blue-600 text-white px-5 py-3 text-base font-medium hover:bg-blue-400 transition hover:bg-opacity-90 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isSubmitting}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditExpense;

const InputBox: React.FC<InputBoxProps> = ({ type, placeholder, name, value, onChange }) => {
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