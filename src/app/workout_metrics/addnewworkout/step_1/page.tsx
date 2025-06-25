'use client';
import React, { useState } from 'react';
import WorkoutVideoUpload from '@components/workout_metrics/WorkoutVideoUpload';
import { useRouter } from 'next/navigation';
import { useWorkoutStore } from '@lib/store/workoutFormState';

const exerciseOptions = [
  "Push Ups",
  "Squats",
  "Deadlifts",
  "Plank",
  "Pull Ups",
  "Lunges",
];
const AddNewWorkoutStep1Page = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'workout' | 'exercise'>('workout');
  const { form, setForm, resetForm } = useWorkoutStore();
  const { exerciseForm, setExerciseForm } = useWorkoutStore();
  const [showDropdown, setShowDropdown] = useState(false);
  const [errorToast, setErrorToast] = useState<string | null>(null);




  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ [name]: value });
  };
  const handleChangeexercise = (exercise: string) => {
    const current = form.muscleGroup;
    const updated = current.includes(exercise)
      ? current.filter((e) => e !== exercise)
      : [...current, exercise];

    setForm({ ...form, muscleGroup: updated });
  };

  // const handleUpload = (file: File) => {
  //   setForm({ videoFile: file });

  // };
  const handleChangeExcercise = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setExerciseForm({ [name]: value });
  };

  const handleUploadExcercise = (file: File) => {
    setExerciseForm({ videoFile: file });
  };

  const validateForm = () => {
    const missingFields: string[] = [];

    if (!form.workoutName) missingFields.push('Workout Name');
    if (!form.description) missingFields.push('Description');
    if (form.muscleGroup.length === 0) missingFields.push('Muscle Group');
    if (!form.difficulty) missingFields.push('Difficulty');
    if (!form.type) missingFields.push('Workout Type');
    if (!form.equipment) missingFields.push('Equipment');
    if (!form.calories) missingFields.push('Calories');
    if (!form.tags) missingFields.push('Tags');
    if (!form.rounds) missingFields.push('Rounds');
    if (!form.duration) missingFields.push('Duration');
    
    console.log('missingFields:', missingFields);

    if (missingFields.length > 0) {
      const message = `${missingFields.join(', ')} cannot be empty`;
      setErrorToast(message);
      console.log('errorToast:', errorToast, message);

      // Auto clear after 3 seconds
      setTimeout(() => {
        setErrorToast(null);
      }, 3000);

      return false;
    }

    return true;
  };


  const handleSubmit = () => {


    if (validateForm()) {
      console.log('Form submitted:', form);
      if (activeTab === 'workout') {
        router.push('/workout_metrics/addnewworkout/step_2');
      } else {
        setExerciseForm(exerciseForm);
      }
      // console.log('Form submitted:', setWorkoutForm);

      console.log('Form submitted:', exerciseForm);
      // Adjust this as per your route structure
    }
  };




  return (
    <div className="space-y-4 p-6">
      <div className="flex justify-between flex-col">
        <span className="text-lg font-semibold text-gray-900 font-urbanist">Add New Workout</span>
        <span className="text-sm text-gray-500 font-urbanist">Manage and review user details, subscription status, and account activity.</span>
      </div>

      <div className="border-t border-gray-200" />
      <div >
        {errorToast && (
          <div className="fixed top-6 right-6 z-50 bg-white-500  px-6 py-4 rounded-lg shadow-lg w-[320px] animate-fade-in-out">
            ⚠️ {errorToast}
          </div>
        )}

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
            <button
              onClick={() => setActiveTab('exercise')}
              className={`pb-2 font-semibold text-sm font-urbanist ${activeTab === 'exercise' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
                }`}
            >
              Add Exercise
            </button>
          </div>
        </div>

        {/* Upload */}

        {/* Form Fields */}
        {activeTab === 'workout' && (
          <div className="space-y-7">
            {/* Reusable Row Style */}
            {/* <div className="flex items-start gap-16">
              <label className="w-[150px] text-sm font-urbanist font-medium pt-2">Workout Video</label>
              <WorkoutVideoUpload onUpload={handleUpload} uploadedFileName={form.videoFile?.name} />
            </div> */}

            <div className="flex items-center gap-16">
              <label className="w-[150px] text-sm font-urbanist font-medium">Workout Name</label>
              <input
                type="text"
                name="workoutName"
                value={form.workoutName}
                onChange={handleChange}
                className="w-[516px] border border-gray-300 rounded-lg p-3 bg-white"
              />
            </div>

            <div className="flex items-start gap-16">
              <label className="w-[150px] text-sm font-urbanist font-medium pt-2">Description</label>
              <div>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  maxLength={500}
                  className="w-[516px] border border-gray-300 rounded-lg px-3 py-2 h-24"
                />
                <p className="text-xs text-gray-500 text-right">{form.description.length}/500</p>
              </div>
            </div>

            <div className="flex items-center gap-16 relative">
              <label className="w-[150px] text-sm font-urbanist font-medium">Select Exercise</label>

              <div className="w-[516px] relative">
                {/* Styled input box with a dropdown arrow */}
                <div
                  className="border border-gray-300 rounded-lg px-3 py-2 cursor-pointer flex justify-between items-center "
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <span className="text-sm ">
                    {form.muscleGroup.length > 0
                      ? form.muscleGroup.join(", ")
                      : "Select exercises"}
                  </span>
                  <svg
                    className={`w-4 h-4 ml-2 transform transition-transform ${showDropdown ? "rotate-180" : "rotate-0"
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Dropdown list */}
                {showDropdown && (
                  <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto ">
                    {exerciseOptions.map((exercise) => (
                      <label
                        key={exercise}
                        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm "
                      >
                        <input
                          type="checkbox"
                          checked={form.muscleGroup.includes(exercise)}
                          onChange={() => handleChangeexercise(exercise)}
                          className="mr-2 "
                        />
                        {exercise}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>


            <div className="flex items-center gap-16 relative">
              <label className="w-[150px] text-sm font-urbanist font-medium">Difficulty Level</label>

              <div className="relative w-[516px]">
                <select
                  name="difficulty"
                  value={form.difficulty}
                  onChange={handleChange}
                  className="w-full appearance-none border border-gray-300 rounded-lg px-3 py-2 text-sm font-urbanist pr-10"
                >
                  <option value="">Select</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>

                {/* Dropdown icon */}
                <svg
                  className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>


            <hr className="border-t border-gray-200" />

            <div className="flex items-center gap-16 relative">
              <label className="w-[150px] text-sm font-urbanist font-medium">Workout Type</label>

              <div className="relative w-[516px]">
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full appearance-none border border-gray-300 rounded-lg px-3 py-2 text-sm font-urbanist pr-10"
                >
                  <option value="">Select</option>
                  <option>Strength</option>
                  <option>Flexibility</option>
                  <option>Cardio</option>
                  <option>Muscle Gain</option>
                  <option>Weight Loss</option>
                  <option>Yoga</option>
                </select>

                {/* Custom dropdown arrow */}
                <svg
                  className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>


            <div className="flex items-center gap-16 relative">
              <label className="w-[150px] text-sm font-urbanist font-medium">Equipment Required</label>

              <div className="relative w-[516px]">
                <select
                  name="equipment"
                  value={form.equipment}
                  onChange={handleChange}
                  className="w-full appearance-none border border-gray-300 rounded-lg px-3 py-2 text-sm font-urbanist pr-10"
                >
                  <option value="">Select</option>
                  <option>None</option>
                  <option>Dumbells</option>
                  <option>Elastic Bands</option>
                  <option>Swiss Ball</option>
                </select>

                {/* Custom dropdown arrow */}
                <svg
                  className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>


            <div className="flex items-center gap-16">
              <label className="w-[150px] text-sm font-urbanist font-medium">Calories Burned</label>
              <input
                type="text"
                name="calories"
                value={form.calories}
                onChange={handleChange}
                className="w-[516px] border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div className="flex items-center gap-16">
              <label className="w-[150px] text-sm font-urbanist font-medium">Tags</label>
              <input
                type="text"
                name="tags"
                value={form.tags}
                onChange={handleChange}
                className="w-[516px] border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <hr className="border-t border-gray-200" />

            <div className="flex items-center gap-16">
              <label className="w-[150px] text-sm font-urbanist font-medium">Number of Rounds</label>
              <input
                type="number"
                name="rounds"
                value={form.rounds}
                onChange={handleChange}
                className="w-[516px] border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div className="flex items-center gap-16">
              <label className="w-[150px] text-sm font-urbanist font-medium">Total Duration</label>
              <input
                type="text"
                name="duration"
                value={form.duration}
                onChange={handleChange}
                className="w-[516px] border border-gray-300 rounded-lg px-3 py-2"
              />

            </div>
            <div className="border-t border-gray-200 py-2" />

          </div>
        )}

        {activeTab === 'exercise' && (
          <div className="space-y-7">
            {/* Reusable Row Style */}
            <div className="flex items-start gap-16">
              <label className="w-[150px] text-sm font-urbanist font-medium pt-2">Workout Video</label>
              <WorkoutVideoUpload onUpload={handleUploadExcercise} uploadedFileName={exerciseForm.videoFile?.name} />
            </div>

            <div className="flex items-center gap-16">
              <label className="w-[150px] text-sm font-urbanist font-medium">Workout Name</label>
              <input
                type="text"
                name="workoutName"
                value={exerciseForm.workoutName}
                onChange={handleChangeExcercise}
                className="w-[516px] border border-gray-300 rounded-lg p-3 bg-white"
              />
            </div>



            <div className="flex items-center gap-16">
              <label className="w-[150px] text-sm font-urbanist font-medium">Number of Rounds</label>
              <input
                type="number"
                name="rounds"
                value={exerciseForm.rounds}
                onChange={handleChangeExcercise}
                className="w-[516px] border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div className="flex items-center gap-16">
              <label className="w-[150px] text-sm font-urbanist font-medium">Total Duration</label>
              <input
                type="text"
                name="duration"
                value={exerciseForm.duration}
                onChange={handleChangeExcercise}
                className="w-[516px] border border-gray-300 rounded-lg px-3 py-2"
              />

            </div>
            <div className="border-t border-gray-200 py-2" />
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Next: Preview
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewWorkoutStep1Page;
