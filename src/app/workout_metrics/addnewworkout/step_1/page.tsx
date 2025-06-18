'use client';
import React, { useState } from 'react';
import WorkoutVideoUpload from '@components/workout_metrics/WorkoutVideoUpload';
import { useRouter } from 'next/navigation';
import {  exerciseFormState } from '@lib/recoil/workoutFormState';
import { useSetRecoilState } from 'recoil';
interface FormType {
  workoutName: string;
  description: string;
  muscleGroup: string[];
  difficulty: string;
  type: string;
  equipment: string;
  calories: string;
  tags: string;
  rounds: string;
  duration: string;
  videoFile: File | null;
}
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
  // const setWorkoutForm = useSetRecoilState(workoutFormState);
  const setExerciseForm = useSetRecoilState(exerciseFormState);
  const [showDropdown, setShowDropdown] = useState(false);
  const [form, setForm] = useState<FormType>({
    workoutName: '',
    description: '',
    muscleGroup: [],
    difficulty: '',
    type: '',
    equipment: '',
    calories: '',
    tags: '',
    rounds: '',
    duration: '',
    videoFile: null as File | null,
  });
  const [excerciseForm, setExcerciseForm] = useState({
    workoutName: '',
    rounds: '',
    duration: '',
    videoFile: null as File | null,
  });
  // const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleChangeexercise = (exercise: string) => {
    const current = form.muscleGroup;
    const updated = current.includes(exercise)
      ? current.filter((e) => e !== exercise)
      : [...current, exercise];

    setForm({ ...form, muscleGroup: updated });
  };

  const handleUpload = (file: File) => {
    setForm((prev) => ({ ...prev, videoFile: file }));
  };
  const handleChangeExcercise = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setExcerciseForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadExcercise = (file: File) => {
    setExcerciseForm((prev) => ({ ...prev, videoFile: file }));
  };

  // const validateForm = () => {
  //   const newErrors: { [key: string]: string } = {};
  //   if (!form.workoutName) newErrors.workoutName = 'Workout Name is required';
  //   if (!form.difficulty) newErrors.difficulty = 'Difficulty Level is required';
  //   if (!form.type) newErrors.type = 'Workout Type is required';
  //   if (!form.videoFile) newErrors.videoFile = 'Workout Video is required';
  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const handleSubmit = () => {
    // if (validateForm()) {
    console.log('Form submitted:', form);
    if (activeTab === 'workout') {
      // setWorkoutForm(form);
    } else {
      setExerciseForm(excerciseForm);
    }
    console.log('Form submitted:', excerciseForm);
    router.push('/workout_metrics/addnewworkout/step_2'); // Adjust this as per your route structure
    // }
  };

  return (
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
            <div className="flex items-start gap-16">
              <label className="w-[150px] text-sm font-urbanist font-medium pt-2">Workout Video</label>
              <WorkoutVideoUpload onUpload={handleUpload} uploadedFileName={form.videoFile?.name} />
            </div>

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


            <div className="flex items-center gap-16">
              <label className="w-[150px] text-sm font-urbanist font-medium">Difficulty Level</label>
              <select
                name="difficulty"
                value={form.difficulty}
                onChange={handleChange}
                className="w-[516px] border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">Select</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            <hr className="border-t border-gray-200" />

            <div className="flex items-center gap-16">
              <label className="w-[150px] text-sm font-urbanist font-medium">Workout Type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-[516px] border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">Select</option>
                <option>Strength</option>
                <option>Flexibility</option>
                <option>Cardio</option>
                <option>Muscle Gain</option>
                <option>Weight Loss</option>
                <option>Yoga</option>
              </select>
            </div>

            <div className="flex items-center gap-16">
              <label className="w-[150px] text-sm font-urbanist font-medium">Equipment Required</label>
              <select
                name="equipment"
                value={form.equipment}
                onChange={handleChange}
                className="w-[516px] border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">Select</option>
                <option>None</option>
                <option>Dumbells</option>
                <option>Elastic Bands</option>
                <option>Swiss Ball</option>

              </select>

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
              <WorkoutVideoUpload onUpload={handleUploadExcercise} uploadedFileName={excerciseForm.videoFile?.name} />
            </div>

            <div className="flex items-center gap-16">
              <label className="w-[150px] text-sm font-urbanist font-medium">Workout Name</label>
              <input
                type="text"
                name="workoutName"
                value={excerciseForm.workoutName}
                onChange={handleChangeExcercise}
                className="w-[516px] border border-gray-300 rounded-lg p-3 bg-white"
              />
            </div>



            <div className="flex items-center gap-16">
              <label className="w-[150px] text-sm font-urbanist font-medium">Number of Rounds</label>
              <input
                type="number"
                name="rounds"
                value={excerciseForm.rounds}
                onChange={handleChangeExcercise}
                className="w-[516px] border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div className="flex items-center gap-16">
              <label className="w-[150px] text-sm font-urbanist font-medium">Total Duration</label>
              <input
                type="text"
                name="duration"
                value={excerciseForm.duration}
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
