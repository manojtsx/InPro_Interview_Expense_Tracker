"use client";
import { InputBoxProps } from "@/interfaces/OtherInterface";
import React, { useState } from "react";
import {User} from '@/interfaces/User'
import { toast } from "react-toastify";
const API = process.env.NEXT_PUBLIC_BACKEND_URL;

const Register = () => {
  const [user, setUser] = useState<User>({
    name : "",
    email : "",
    currency : "",
    password : ""
  })

  const handleUserDataChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
    const name = event.target.name;
    const value = event.target.value;
    setUser({...user, [name] : value});
    console.log({...user, [name] : value})
  }
  const handleRegister = async(event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    try{
      const result = await fetch(`${API}users`,{
        method : "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body : JSON.stringify(user)
      });
      const response = await result.json();
      if(!response){
        throw new Error(response.message);
      }
      toast.success(response.message)
    }catch(error:any){
      toast.error(error.message)
    }
  }
  return (
    <section className="bg-gray-1 py-20 dark:bg-dark lg:py-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white px-10 py-16 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]">
              <div className="mb-10 text-center md:mb-16">
                <a href="/#" className="mx-auto inline-block max-w-[160px]">
                  <img src="/icon/logo.png" alt="logo" />
                </a>
              </div>
              <form onSubmit={handleRegister}>
                <InputBox type="text" name="name" value={user.name as string} onChange={handleUserDataChange} placeholder="Name" />
                <InputBox type="email" name="email" value={user.email} onChange={handleUserDataChange} placeholder="Email" />

                <select name="currency" value={user.currency} onChange={handleUserDataChange} className="mb-6 w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 ">
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="JPY">JPY - Japanese Yen</option>
                  <option value="AUD">AUD - Australian Dollar</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                  <option value="CHF">CHF - Swiss Franc</option>
                  <option value="CNY">CNY - Chinese Yuan</option>
                  <option value="INR">INR - Indian Rupee</option>
                </select>
                <InputBox
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={user.password as string}
                  onChange={handleUserDataChange}
                />
                <div className="mb-10">
                  <input
                    type="submit"
                    value="Register"
                    className="w-full cursor-pointer rounded-md border border-primary bg-primary px-5 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-400 transition hover:bg-opacity-90"
                  />
                </div>
              </form>
              <p className="text-base text-body-color dark:text-dark-6">
                <span className="pr-0.5">Already a member?</span>
                <a href="/" className="text-primary hover:underline">
                  Login
                </a>
              </p>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;

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
