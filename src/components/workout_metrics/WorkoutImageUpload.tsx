'use client';
import React, { useRef } from 'react';
import { CloudUpload } from 'lucide-react';

interface WorkoutVideoUploadProps {
  onUpload: (file: File) => void;
  uploadedFileName?: string;
}

const WorkoutImageUpload: React.FC<WorkoutVideoUploadProps> = ({ onUpload, uploadedFileName }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div className="border  border-gray-300 rounded-lg p-6 text-center bg-white w-[516px] h-[126px]">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <div
        onClick={() => fileInputRef.current?.click()}
        className="cursor-pointer flex flex-col items-center gap-2"
      >
        <div className="w-10 h-10  border border-gray-300 rounded-lg flex items-center justify-center ">

          <CloudUpload />
        </div>
        <div className="text-sm">
          <span
            className="font-semibold text-sm truncate max-w-[200px] inline-block align-bottom"
            style={{ color: '#175CD3' }}
            title={uploadedFileName || "Click to upload"} // tooltip for full name
          >
            {uploadedFileName ? uploadedFileName : "Click to upload"}
          </span>
          <span className="text-gray-600"> or drag and drop</span>
          <p className="text-sm text-gray-600 ">
            SVG, PNG, JPG or GIF (max. 800x400px)
          </p>
        </div>


      </div>
    </div>
  );
};

export default WorkoutImageUpload;
