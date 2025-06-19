'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { workoutFormState, exerciseFormState } from '@lib/recoil/workoutFormState';
// import { useRecoilValue } from 'recoil';
import { CloudUpload } from 'lucide-react';
import Link from 'next/link';
import { MobileWorkout } from '@components/workout_metrics/mobile-workout';
const AddNewWorkoutStep2Page = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'workout' | 'exercise'>('workout');
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  // const workoutForm = useRecoilValue(workoutFormState);
  // const exerciseForm = useRecoilValue(exerciseFormState);
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImageUrl(imageUrl);
    }
  };
  const handlePublish = () => {
    // You can also call an API here before showing the modal
    setShowModal(true);
  };

  const handleDone = () => {
    setShowModal(false);
    router.push("/workout_metrics"); // or any page you'd like to go to
  };
  // const workoutForm = {
  //   workoutName: "Full Body Burn",
  //   description: "A high-intensity full-body workout that targets major muscle groups.",
  //   muscleGroup: "Full Body",
  //   difficulty: "Intermediate",
  //   type: "Strength",
  //   equipment: "Dumbbells, Mat",
  //   calories: "450",
  //   tags: "HIIT, Full Body, Fat Burn",
  //   rounds: "3",
  //   duration: "45 minutes",
  //   videoFile: null, // You can mock this with a File object if needed
  // };


  // const [errors, setErrors] = useState<{ [key: string]: string }>({});



  return (
    <div className="relative">
      <div className="space-y-4 p-6">
        <div className="flex justify-between flex-col">
          <span className="text-lg font-semibold text-gray-900 font-urbanist">Add New Workout</span>
          <span className="text-sm text-gray-500 font-urbanist">Manage and review user details, subscription status, and account activity.</span>
        </div>

        <div className="border-t border-gray-200" />
        <div >

          {/* Tabs */}
          <div className="mb-6 border-b border-gray-200">
            <div className="flex gap-6">
              <button
                onClick={() => setActiveTab('workout')}
                className={`pb-2 font-semibold text-sm font-urbanist ${activeTab === 'workout' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
                  }`}
              >
                Add Workout
              </button>
              {/* <button
              onClick={() => setActiveTab('exercise')}
              className={`pb-2 font-semibold text-sm font-urbanist ${activeTab === 'exercise' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
                }`}
            >
              Add Exercise
            </button> */}
            </div>
          </div>

          {/* Upload */}

          {/* Form Fields */}
          <div className="space-y-7">
            {/* Reusable Row Style */}
            <div className="flex flex-col  justify-between gap-10">

              {/* Mobile Preview */}
              <div className="w-[730px] flex justify-between">
                <div className='flex flex-col'>
                  <p className="text-sm font-medium text-gray-700">Banner appearance</p>
                  <p className="text-sm text-gray-400">Change how banners appear to visitors.</p>
                </div>
                <MobileWorkout uploadedImageUrl={uploadedImageUrl} />
              </div>
              <div className="border-t border-gray-200" />

              {/* Upload Section */}
              <div className="w-full space-y-2 flex items-center gap-4 mt-2 p-3">
                <div className='flex flex-col'>
                  <p className="text-sm font-medium text-gray-700">Banner appearance</p>
                  <p className="text-sm text-gray-400">Change how banners appear to visitors.</p>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  {uploadedImageUrl && (
                    <img
                      src={uploadedImageUrl}
                      alt="Uploaded"
                      className="w-[200px] h-[145px] object-cover border-2 border-blue-500 rounded-lg"
                    />
                  )}

                  <label
                    htmlFor="fileUpload"
                    className="cursor-pointer border border-dashed border-gray-300 p-4 rounded-lg w-[250px] h-[145px] text-center  flex flex-col items-center "
                  >
                    <div className="w-10 h-10  border border-gray-300 rounded-lg flex items-center justify-center ">

                      <CloudUpload />
                    </div>
                    <p className="text-blue-600 text-sm font-semibold">Click to upload</p>
                    <p className="text-gray-600 text-sm">or drag and drop</p>
                    <p className="text-xs text-gray-400 mt-1">SVG, PNG, JPG or GIF (max. 800×400px)</p>
                    <input
                      id="fileUpload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>


              </div>
            </div>


          </div>

          <div className="border-t border-gray-200" />

          {/* Submit Button */}
          <div className="flex justify-end gap-6 p-3">

            <Link href="/workout_metrics/addnewworkout/step_1">
              <button className="px-4 py-2 text-sm border border-gray-300 rounded-md">
                Back
              </button>
            </Link>
            <button className="px-6 py-2 text-white bg-blue-600 rounded-md w-[165px]" onClick={handlePublish}>Publish</button>

          </div>
        </div>
      </div>
      {showModal && (
       <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative shadow-lg">
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-semibold"
            >
              &times;
            </button>

            {/* Success icon */}
            <div className="flex justify-start mb-4">
              <div className="w-10 h-10 bg-green-100 text-green-600 flex items-center justify-center rounded-full">
                ✓
              </div>
            </div>

            {/* Title and content */}
            <h2 className=" font-semibold text-lg mb-2">
              Workout Published Successfully
            </h2>
            <p className=" text-sm text-gray-600 mb-6">
              Your new workout <span className="font-semibold">Lower Body Workout</span> has been
              successfully published and is now live for users to access.
            </p>

            {/* Done button */}
            <div className="flex justify-center">
              <button
                onClick={handleDone}
                className=" w-[90%] bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNewWorkoutStep2Page;
