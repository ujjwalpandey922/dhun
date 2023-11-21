"use client";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
const page = () => {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const { value } = e.target;
    type === "userName" ? setuserName(value) : setPassword(value);
  };
  const handleSample = () => {
    setuserName("DJ@4");
    setPassword("Dhunjam@2023");
  };
  const handleSubmit = async () => {
    if (!userName || !password) {
      toast("Enter All Fields !!!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    try {
      const res = await axios.post(
        "https://stg.dhunjam.in/account/admin/login",
        {
          username: userName,
          password,
          redirect: false,
        }
      );
        console.log({res})
      if (res?.status === 200) {
        localStorage.setItem("id", res?.data?.data.id);
        router.push("/");
      } 
    } catch (error) {
      toast.error("Invalid Credentials", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      // throw new Error("Log In Failed");
    }
  };
  return (
    <main className="mx-auto  flex min-h-screen w-full items-center justify-center bg-[#030303] text-white">
      <section className="flex w-[30rem] flex-col space-y-10">
        <div className="text-center text-4xl font-medium">
          Venue Admin Login
        </div>

        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
          <input
            type="text"
            placeholder="User Name"
            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            value={userName}
            onChange={(e) => handleChange(e, "userName")}
          />
        </div>

        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 relative">
          <input
            type={!showPassword ? "password" : "text"}
            placeholder="Password"
            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            value={password}
            onChange={(e) => handleChange(e, "pass")}
          />
          {!showPassword ? (
            <IoEyeSharp
              className="absolute top-0 right-0 cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          ) : (
            <FaEyeSlash
              className="absolute top-0 right-0 cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          )}
        </div>

        <button
          className="transform rounded-lg bg-[#6741D9] py-2 font-bold duration-300 hover:bg-indigo-400"
          onClick={handleSubmit}
        >
          Sign In
        </button>

        <Link
          href="#"
          className="transform text-center font-semibold text-gray-500 duration-300 hover:text-gray-300"
        >
          New Registration?
        </Link>

        <p className="text-center text-lg">
          No account ? &nbsp;
          <Link
            href="#"
            className="font-medium text-indigo-500 underline-offset-4 hover:underline"
            onClick={handleSample}
          >
            Use Sample
          </Link>
        </p>
      </section>
    </main>
  );
};

export default page;
