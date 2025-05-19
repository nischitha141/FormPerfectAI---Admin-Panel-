"use client";

interface LabeledInputProps {
  label: string;
  value: string | number;
  maxWidth?: string;
  width?: string;
}

export default function LabeledInput({ label, value, maxWidth = "500px", width }: LabeledInputProps) {
  return (
    <div className="flex gap-1 flex-col" style={{ width }}>
      <label htmlFor="" className="text-[#414651] text-[14px]">
        {label}
      </label>
      <input
        type="text"
        value={value}
        disabled={true}
        className={`py-[10px] px-[14px] max-w-[${maxWidth}] bg-white h-[40px] border-[1px] border-[#E0E0E1] rounded-xl p-2`}
      />
    </div>
  );
}