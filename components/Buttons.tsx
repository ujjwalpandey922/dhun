import { ButtonType } from '@/type';
import React from 'react'

const Buttons = ({text,onClick,disabled}:ButtonType) => {
  return (
    <button
      className={`transform rounded-lg border border-transparent cursor-pointer bg-[#6741D9] py-2 font-bold duration-300 disabled:cursor-auto hover:border-[#F0C3F1] disabled:bg-[#C2C2C2] disabled:text-black`}
      onClick={onClick}
      disabled={!disabled}
    >
      {text}
    </button>
  );
}

export default Buttons
