"use client";
import { Pencil } from "lucide-react";
import Image from "next/image";

interface InputWithButtonProps {
  label: string;
  value: string;
  onButtonClick: () => void;
  customIcon?: React.ReactNode | null;
  customText?: string | null;
  // Optional props for handling images from public folder
  imageSrc?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageClassName?: string;
}

export default function InputWithButton({ 
  label, 
  value, 
  onButtonClick, 
  customIcon,
  customText,
  imageSrc,
  imageWidth = 20,
  imageHeight = 20,
  imageClassName = ""
}: InputWithButtonProps) {
  const renderButtonContent = () => {
    // If custom text is provided
    if (customText) {
      // If both customText and imageSrc are provided, show image + text
      if (imageSrc) {
        return (
          <div className="flex items-center gap-2">
            <Image 
              src={imageSrc}
              width={imageWidth}
              height={imageHeight}
              alt="Button icon"
              className={imageClassName}
            />
            <span className="text-sm font-medium">{customText}</span>
          </div>
        );
      }
      
      // If both customText and customIcon are provided, show customIcon + text
      if (customIcon) {
        return (
          <div className="flex items-center gap-2">
            {customIcon}
            <span className="text-sm font-medium">{customText}</span>
          </div>
        );
      }
      
      // If only customText is provided, show default pencil + text
      return (
        <div className="flex items-center gap-2">
          <Pencil size={20} color="#000000" />
          <span className="text-sm font-medium">{customText}</span>
        </div>
      );
    }
    
    // If only image source is provided (no text), show just image
    if (imageSrc) {
      return (
        <Image 
          src={imageSrc}
          width={imageWidth}
          height={imageHeight}
          alt="Button icon"
          className={imageClassName}
        />
      );
    }
    
    // If only custom icon is provided (no text), show just custom icon
    if (customIcon) {
      return customIcon;
    }
    
    // Default fallback - pencil icon only
    return <Pencil size={20} color="#000000" />;
  };

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
          {renderButtonContent()}
        </button>
      </div>
    </div>
  );
}