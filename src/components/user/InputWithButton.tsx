"use client";

import { Pencil } from "lucide-react";

interface InputWithButtonProps {
  label: string;
  value: string;
  onButtonClick: () => void;
}

export default function InputWithButton({ label, value, onButtonClick }: InputWithButtonProps) {
  return (
    <div className="flex gap-1 flex-col">
      <label htmlFor="" className="text-[#414651] text-[14px]">
        {label}
      </label>
      <div className="flex overflow-hidden max-w-[500px] border-[1px] border-[#E0E0E1] rounded-xl bg-white">
        <input
          type="text"
          value={value}
          disabled={true}
          className="py-[10px] px-[14px] flex-1 bg-white h-[40px] border-0 outline-none"
        />
        <button
          onClick={onButtonClick}
          className="flex items-center justify-center px-3 border-l border-[#E0E0E1] hover:opacity-70 hover:bg-gray-300 transition-all cursor-pointer"
        >
          <Pencil size={20} color="#000000" />
        </button>
      </div>
    </div>
  );
}