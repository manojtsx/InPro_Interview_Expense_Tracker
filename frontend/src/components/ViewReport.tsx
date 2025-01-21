"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Expense } from "@/interfaces/Expense";
import * as XLSX from "xlsx";

const API = process.env.NEXT_PUBLIC_BACKEND_URL;

const ViewReport = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const result = await fetch(`${API}expenses`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const response = await result.json();
        setExpenses(response);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    fetchExpenses();
  }, [API]);

  const handleFilter = () => {
    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates");
      return;
    }

    const filtered = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate >= new Date(startDate) && expenseDate <= new Date(endDate)
      );
    });

    setFilteredExpenses(filtered);
  };

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredExpenses);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
    XLSX.writeFile(workbook, "expenses_report.xlsx");
  };

  return (
    <section className="bg-gray-1">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[800px] overflow-hidden rounded-lg px-10 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]">
              <h1 className="mb-10 text-2xl font-bold text-gray-800 dark:text-white">View Report</h1>
              <div className="mb-6 flex justify-between">
                <div className="flex flex-col">
                  <label className="mb-2 text-gray-700 dark:text-gray-300">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-2 text-gray-700 dark:text-gray-300">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3"
                  />
                </div>
                <button
                  onClick={handleFilter}
                  className="self-end rounded-md bg-blue-600 text-white px-5 py-3 text-base font-medium hover:bg-blue-400 transition hover:bg-opacity-90"
                >
                  Filter
                </button>
              </div>
              <div className="mb-6">
                <button
                  onClick={handleExport}
                  className="rounded-md bg-green-600 text-white px-5 py-3 text-base font-medium hover:bg-green-400 transition hover:bg-opacity-90"
                >
                  Export to Excel
                </button>
              </div>
              <table className="min-w-full bg-white dark:bg-dark-2">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-200 dark:border-dark-3">Title</th>
                    <th className="py-2 px-4 border-b border-gray-200 dark:border-dark-3">Amount</th>
                    <th className="py-2 px-4 border-b border-gray-200 dark:border-dark-3">Category</th>
                    <th className="py-2 px-4 border-b border-gray-200 dark:border-dark-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExpenses.map((expense) => (
                    <tr key={expense._id}>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-dark-3">{expense.title}</td>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-dark-3">{expense.amount}</td>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-dark-3">{expense.categoryId.name}</td>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-dark-3">{new Date(expense.date).toLocaleDateString()}</td>
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

export default ViewReport;