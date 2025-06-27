'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useWorkoutStore } from '@lib/store/workoutFormState';
import { CloudUpload } from 'lucide-react';
import Link from 'next/link';
import { MobileWorkout } from '@components/workout_metrics/mobile-workout';

const AddNewWorkoutStep2Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const workoutId = searchParams.get('workoutId');
  const [activeTab, setActiveTab] = useState<'workout' | 'exercise'>('workout');
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { form: workoutForm, setForm } = useWorkoutStore();
  const [isLoading, setIsLoading] = useState(false);
  const [errorToast, setErrorToast] = useState<string | null>(null);


  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // for preview
      setUploadedImageUrl(imageUrl);              // show in <img src={uploadedImageUrl} />
      setForm({ image: file });// for api
    }
  };


  useEffect(() => {
    const handleFile = async () => {
      const response = await fetch('/Gym_Mobility.png');
      const blob = await response.blob();
      const fallbackFile = new File([blob], 'Gym_Mobility.png', { type: blob.type });

      const imageUrl = URL.createObjectURL(fallbackFile);
      setUploadedImageUrl(imageUrl);

      setForm({ image: fallbackFile });// for api
    }
    handleFile()

  }, []);
  // useEffect(() => {
  //   const fetchWorkout = async () => {
  //     if (!workoutId) return;

  //     try {
  //       const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  //       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/WorkoutById?workoutId=${workoutId}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       const result = await res.json();

  //       const workout = result.data?.data;

  //       if (workout) {
  //         setForm({
  //           workoutName: workout.name || '',
  //           description: workout.description || '',
  //           muscleGroup: workout.exercises.exercisesId ? [workout.exercises.exercisesId] : [],
  //           focusArea: workout.focusArea || '',
  //           equipment: workout.equipment || '', 
  //           calories: workout.totalBurnCalories?.toString() || '',
  //           Workouttype: workout.type,
  //           duration: workout.duration?.toString() || '',
  //           image: new File([], 'placeholder.jpg'),
  //         });
  //         setUploadedImageUrl(workout.media?.[0]?.url || null);
  //       }


  //       if (!res.ok || result.success === false) {
  //         setErrorToast(result.message || "Failed to fetch workout");
  //         return;
  //       }
  //     } catch (err) {
  //       setErrorToast("Something went wrong" + (err instanceof Error ? `: ${err.message}` : ""));
  //     }
  //   };

  //   fetchWorkout();
  // }, [workoutId]);
  const handlePublish = async () => {
    try {
      setIsLoading(true);
      setErrorToast(null);

      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const formData = new FormData();

      // ✅ Append fields matching the API
      if (!(workoutForm.image instanceof File)) {
        throw new Error("Image is missing or invalid.");
      }
      if (workoutId) {
        formData.append("workoutId", workoutId);
      }

      formData.append("image", workoutForm.image); // File
      formData.append("name", workoutForm.workoutName); // ✅ Matches API's `name`
      formData.append("description", workoutForm.description);
      formData.append("totalTime", workoutForm.duration);
      formData.append("totalBurnCalories", workoutForm.calories);
      formData.append("focusArea", JSON.stringify([workoutForm.focusArea]));
      formData.append("equipment", JSON.stringify([workoutForm.equipment]));
      formData.append("exercises", JSON.stringify(workoutForm.muscleGroup.map((id) => ({ _id: id }))));
      formData.append("goalCategoryId", workoutForm.Workouttype);


      const res = await fetch(`${apiUrl}/api/admin/updateWorkout`, {
        method:"PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });


      const text = await res.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error(" Server response is not JSON:", err);
        setErrorToast("Unexpected server response");
        return;
      }

      if (!res.ok || data.success === false) {
        setErrorToast(data.message || "Something went wrong");
        setTimeout(() => setErrorToast(null), 3000);
      } else {
        setShowModal(true);
      }

    } catch (err) {
      console.error("Update error:", err);
      setErrorToast(err instanceof Error ? err.message : "Something went wrong");
      setTimeout(() => setErrorToast(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };



  const handleDone = () => {
    setShowModal(false);
    router.push("/workout_metrics"); // or any page you'd like to go to
  };
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500"></div>
      </div>
    );
  }



  return (
    <div className="relative">
      <div className="space-y-4 p-6">
        <div className="flex justify-between flex-col">
          <span className="text-lg font-semibold text-gray-900 font-urbanist">Add New Workout</span>
          <span className="text-sm text-gray-500 font-urbanist">Manage and review user details, subscription status, and account activity.</span>
        </div>
        {errorToast && (
          <div className="fixed top-6 right-6 z-50 bg-white-500  px-6 py-4 rounded-lg shadow-lg w-[320px] animate-fade-in-out">
            ⚠️ {errorToast}
          </div>
        )}
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

            <Link href={workoutId ? "/workout_metrics" : "/workout_metrics/addnewworkout/step_1"}>
              <button className="px-4 py-2 text-sm border border-gray-300 rounded-md">
                Back
              </button>
            </Link>
            <button className="px-6 py-2 text-white bg-blue-600 rounded-md w-[165px] disabled:opacity-50" onClick={handlePublish} >Update</button>

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
                 <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.5 11L9.5 14L15.5 8M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="#079455" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
            </div>

            {/* Title and content */}
            <h2 className=" font-semibold text-lg mb-2">
              Workout Updated Successfully
            </h2>
            <p className=" text-sm text-gray-600 mb-6">
              Your new workout <span className="font-semibold">{workoutForm.workoutName}</span> has been
              successfully Updated and is now live for users to access.
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
