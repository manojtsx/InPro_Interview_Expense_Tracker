"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Category } from "@/interfaces/Category";
import { Montserrat } from "next/font/google";
const API = process.env.NEXT_PUBLIC_BACKEND_URL;

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const ViewCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await fetch(`${API}categories`, {
          headers: {
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

    fetchCategories();
  }, []);

  const handleAddCategory = () => {
    router.push("/categories/add");
  };

  const handleEditCategory = (id: string) => {
    router.push(`/categories/edit/${id}`);
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      const result = await fetch(`${API}categories/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const response = await result.json();
      if (!response) {
        throw new Error("Failed to delete category");
      }
      toast.success(response.message);
      setCategories(categories.filter((category) => category._id !== id));
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section
      className={`bg-gray-1 ${montserrat.className}`}
    >
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[800px] overflow-hidden rounded-lg px-10 py-16 text-center sm:px-12 md:px-[60px]">
              <div className="mb-6 text-right">
                <button
                  onClick={handleAddCategory}
                  className="inline-block rounded-md bg-blue-600 text-white px-5 py-2 text-base font-medium hover:bg-blue-400 transition hover:bg-opacity-90"
                >
                  Add Category
                </button>
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3"
                />
              </div>
              <table className="min-w-full bg-white dark:bg-dark-2">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-200 dark:border-dark-3">
                      Name
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 dark:border-dark-3">
                      Icon
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 dark:border-dark-3">
                      User ID
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 dark:border-dark-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCategories && filteredCategories.map((category) => (
                    <tr key={category._id}>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-dark-3">
                        {category.name}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-dark-3">
                        {category.icon}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-dark-3">
                        {category.userId?.name || "Global"}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-dark-3">
                        <button
                          onClick={() => handleEditCategory(category._id)}
                          className="inline-block rounded-md bg-yellow-500 text-white px-3 py-1 text-sm font-medium hover:bg-yellow-400 transition hover:bg-opacity-90 mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category._id)}
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

export default ViewCategory;
