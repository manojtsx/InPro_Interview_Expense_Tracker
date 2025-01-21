"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { InputBoxProps } from "@/interfaces/OtherInterface";
const API = process.env.NEXT_PUBLIC_BACKEND_URL;

const AddCategory = () => {
  const router = useRouter();
  const [category, setCategory] = useState({
    name: "",
    icon: "",
    userId: localStorage.getItem('userId') || null,
    description: "",
  });

  const handleCategoryDataChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setCategory({ ...category, [name]: value });
  };

  const handleAddCategory = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await fetch(`${API}categories`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(category)
      });
      const response = await result.json();
      if (!response) {
        throw new Error(response.message);
      }
      toast.success(response.message);
      router.push(`/dashboard/${localStorage.getItem('userId')}`);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

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
              <form onSubmit={handleAddCategory} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <InputBox value={category.name} onChange={handleCategoryDataChange} type="text" name="name" placeholder="Category Name" />
                <InputBox value={category.icon} onChange={handleCategoryDataChange} type="text" name="icon" placeholder="Icon" />
                <div className="col-span-1 sm:col-span-2">
                  <textarea
                    name="description"
                    value={category.description}
                    onChange={handleCategoryDataChange}
                    placeholder="Description"
                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3"
                  />
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <input
                    type="submit"
                    value="Add Category"
                    className="w-full cursor-pointer rounded-md border border-primary bg-blue-600 text-white px-5 py-3 text-base font-medium hover:bg-blue-400 transition hover:bg-opacity-90"
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

export default AddCategory;

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
      />
    </div>
  );
};