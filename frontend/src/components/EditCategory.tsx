"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter, useParams } from "next/navigation";
import { InputBoxProps } from "@/interfaces/OtherInterface";
import { Category } from "@/interfaces/Category";
const API = process.env.NEXT_PUBLIC_BACKEND_URL;

const EditCategory = () => {
  const router = useRouter();
  const { id } = useParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      console.log(id);
      try {
        const result = await fetch(`${API}categories/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const response = await result.json();
        if (!response) {
          throw new Error("Failed to fetch category");
        }
        setCategory(response);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    fetchCategory();
  }, [API, id]);

  const handleCategoryDataChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!category) return;
    const name = event.target.name;
    const value = event.target.value;
    setCategory({ ...category, [name]: value });
  };

  const handleEditCategory = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(category);
    if (isSubmitting || !category) return; // Prevent multiple submissions
    setIsSubmitting(true);
    try {
      const result = await fetch(`${API}categories/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ ...category, userId: localStorage.getItem('userId') })
      });
      const response = await result.json();
      if (!response) {
        throw new Error(response.message);
      }
      toast.success(response.message);
      router.push(`/categories`);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!category) {
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
              <form onSubmit={handleEditCategory} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                    value="Edit Category"
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

export default EditCategory;

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