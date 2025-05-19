"use client";

interface SectionHeaderProps {
  title: string;
  description: string;
}

export default function SectionHeader({
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="w-[300px] mr-4">
      <h3 className="text-[#1F222A] font-semibold text-[18px]">{title}</h3>
      <h6 className="text-[#535862] font-normal text-[14px]">{description}</h6>
    </div>
  );
}
