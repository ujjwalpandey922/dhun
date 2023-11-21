"use client";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import Buttons from "@/components/Buttons";
const page = () => {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  // change Logic
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const { value } = e.target;
    type === "userName" ? setuserName(value) : setPassword(value);
  };

  // Set Needed username and password
  const handleSample = () => {
    setuserName("DJ@4");
    setPassword("Dhunjam@2023");
  };

  // Submit Logic
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

      return;
    }
  };
  return (
    <main className="mx-auto p-8 flex min-h-screen w-full items-center justify-center bg-[#030303] text-white">
      <section className="flex w-full md:w-[38rem] flex-col space-y-10">
        <div className="text-center text-4xl font-medium">
          Venue Admin Login
        </div>

        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
          <input
            type="text"
            placeholder="User Name"
            className=" border-none bg-transparent outline-none placeholder:italic focus:outline-none md:w-[300px] w-full"
            value={userName}
            onChange={(e) => handleChange(e, "userName")}
          />
        </div>

        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 relative">
          <input
            type={!showPassword ? "password" : "text"}
            placeholder="Password"
            className=" border-none bg-transparent outline-none placeholder:italic focus:outline-none md:w-[300px] w-full"
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

        <Buttons onClick={handleSubmit} text="Sign In" disabled={true} />

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
