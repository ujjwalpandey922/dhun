import { InputType } from "@/type";
import React from "react";

const Input = ({ name, onChange, value, disabled, width }: InputType) => {
  return (
    <>
      <input
        className={`h-full ${
          width ? "md:w-[300px] w-full" : "md:w-[70px] w-full"
        } rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0   focus:border-2 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-[#C2C2C2] disabled:text-black`}
        name={name}
        onChange={(e) => onChange(e)}
        value={value}
        disabled={!disabled}
      />
    </>
  );
};

export default Input;
