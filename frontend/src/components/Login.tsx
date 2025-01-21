"use client"
import { InputBoxProps } from "@/interfaces/OtherInterface";
import { User } from "@/interfaces/User";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
const API = process.env.NEXT_PUBLIC_BACKEND_URL;

const Login = () => {
  const router = useRouter();
  const [user,setUser] = useState<User>({
    email : "",
    password : ""
  });
  
  const handleUserDataChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
      const name = event.target.name;
      const value = event.target.value;
      setUser({...user, [name] : value});
      console.log({...user, [name] : value})
    }
    const handleLogin = async(event: React.FormEvent<HTMLFormElement>) =>{
      event.preventDefault();
      try{
        const result = await fetch(`${API}auth/login`,{
          method : "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body : JSON.stringify(user)
        });
        const response = await result.json();
        if(!response){
          throw new Error(response.message)
        }
        console.log(response.message)
        localStorage.setItem('token',response.accessToken)
        localStorage.setItem('userId',response.userId)
        router.push(`/dashboard/${response.userId}`)
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
                <a
                  href="/#"
                  className="mx-auto inline-block max-w-[160px]"
                >
                  <img
                    src="/icon/logo.png"
                    alt="logo"
                  />
                </a>
              </div>
              <form onSubmit={handleLogin}>
                <InputBox value={user.email} onChange={handleUserDataChange} type="email" name="email" placeholder="Email" />
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
                    value="Sign In"
                    className="w-full cursor-pointer rounded-md border border-primary bg-blue-600 text-white px-5 py-3 text-base font-medium hover:bg-blue-400 transition hover:bg-opacity-90"
                  />
                </div>
              </form>
              <a
                href="/#"
                className="mb-2 inline-block text-base text-dark hover:text-primary hover:underline dark:text-white"
              >
                Forget Password?
              </a>
              <p className="text-base text-body-color dark:text-dark-6">
                <span className="pr-0.5">Not a member yet?</span>
                <a
                  href="/register"
                  className="text-primary hover:underline"
                >
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

const InputBox: React.FC<InputBoxProps> = ({ type, placeholder, name,value, onChange }) => {
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
