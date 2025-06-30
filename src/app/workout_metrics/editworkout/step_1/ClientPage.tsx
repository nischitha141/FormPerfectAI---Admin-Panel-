'use client';
import React, { useEffect, useState } from 'react';
import WorkoutVideoUpload from '@components/workout_metrics/WorkoutVideoUpload';
import { useRouter } from 'next/navigation';
import { useWorkoutStore } from '@lib/store/workoutFormState';
import { useSearchParams } from 'next/navigation';
import WorkoutImageUpload from '@components/workout_metrics/WorkoutImageUpload';
type ExerciseOption = {
  _id: string;
  name: string;
  duration: string;
};

const AddNewWorkoutStep1Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const workoutId = searchParams.get('workoutId');
  const [activeTab, setActiveTab] = useState<'workout' | 'exercise'>('workout');
  const [exerciseOptions, setExerciseOptions] = useState<ExerciseOption[]>([]);
  const { form, setForm } = useWorkoutStore();
  const { exerciseForm, setExerciseForm } = useWorkoutStore();
  const [showDropdown, setShowDropdown] = useState(false);
  const [errorToast, setErrorToast] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const filteredOptions = exerciseOptions.filter((opt) =>
    opt.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [errors, setErrors] = useState({
    workoutName: "",
    description: "",
    calories: "",
    exerciseName: "",

  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const alphabetOnly = /^[A-Za-z\s]*$/;
    const alphanumeric = /^[A-Za-z0-9\s]*$/;
    const descriptionRegex = /^[A-Za-z0-9\s.,-]*$/;
    let errorMsg = "";
    // Conditional validation per field
    if (name === "workoutName" || name === "exerciseName") {
      if (!alphabetOnly.test(value)) {
        errorMsg = "Only alphabets are allowed.";
      }
    }
    if (name === "description") {
      if (!descriptionRegex.test(value)) {
        errorMsg = "Only letters, numbers are allowed.";
      }
    }
    if (name === "calories") {
      if (!alphanumeric.test(value)) {
        errorMsg = "Only letters and numbers are allowed.";
      }
    }

    setForm({ [name]: value });
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    console.log('Form updated:', { [name]: value });
  };
  const handleChangeexercise = (exercise: { _id: string; name: string; duration: string }) => {
    const exists = form.muscleGroup.some((item) => item.id === exercise._id);

    const updated = exists
      ? form.muscleGroup.filter((item) => item.id !== exercise._id)
      : [...form.muscleGroup, { id: exercise._id, name: exercise.name, duration: exercise.duration }];

    setForm({ muscleGroup: updated });
  };




  const handleUpload = (file: File) => {
    setExerciseForm({ image: file });

  };
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
    if (form.muscleGroup.length === 0) missingFields.push('Exercises');
    if (!form.focusArea) missingFields.push('focus Type');
    if (!form.equipment) missingFields.push('Equipment');
    if (!form.calories) missingFields.push('Calories');
    if (!form.Workouttype) missingFields.push('Workout Type');


    const hasFormatErrors = Object.values(errors).some((error) => error !== "");
    if (missingFields.length > 0 || hasFormatErrors) {
      let message = "";

      if (missingFields.length > 0) {
        message += `${missingFields.join(', ')} cannot be empty. `;
      }

      if (hasFormatErrors) {
        message += "Please correct format errors in the form.";
      }

      setErrorToast(message.trim());


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
      router.push(`/workout_metrics/editworkout/step_2?workoutId=${workoutId}`);
    }
  };
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        if (!token) {
          console.error("No token found in localStorage.");
          return;
        }

        const response = await fetch(`${apiUrl}/api/admin/exersices`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const resJson = await response.json();
        console.log("Fetched exercises:", resJson);

        if (Array.isArray(resJson.data?.data)) {
          setExerciseOptions(resJson.data.data);
        } else {
          console.error("Unexpected response format:", resJson);
        }
      } catch (err) {
        console.error("Failed to fetch exercises:", err);
      }
    };

    fetchExercises();
  }, []);



  useEffect(() => {
    const fetchWorkout = async () => {
      if (!workoutId) return;

      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/WorkoutById?workoutId=${workoutId}`, {

          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await res.json();

        const workout = result.data?.data;

        if (workout) {
          setForm({
            workoutName: workout.name || '',
            description: workout.description || '',
            muscleGroup: workout.exercises.map(
              (exercise: { name: string; _id: string; duration: string }) => ({
                name: exercise.name,
                id: exercise._id,
                duration: exercise.duration
              })
            ),
            focusArea: workout.focusArea || '',
            equipment: workout.equipment || '',
            calories: workout.totalBurnCalories?.toString() || '',
            Workouttype: workout.goalCategoryId?.name || '',
            // duration: workout.duration?.toString() || '',
            image: new File([], 'placeholder.jpg'),
          });

        }
        if (!res.ok || result.success === false) {
          setErrorToast(result.message || "Failed to fetch workout");
          return;
        }
      } catch (error) {
        setErrorToast("Something went wrong: " + (error instanceof Error ? error.message : 'Unknown error'));
      }
    };

    fetchWorkout();
  }, [workoutId]);
  const validateExerciseForm = () => {
    const missingFields: string[] = [];

    if (!exerciseForm.Name) missingFields.push("Exercise Name");
    if (!exerciseForm.difficulty) missingFields.push("Difficulty");
    if (!exerciseForm.duration) missingFields.push("Duration");
    if (!exerciseForm.image) missingFields.push("Image");
    if (!exerciseForm.videoFile) missingFields.push("Video");
    if (missingFields.length > 0) {
      const message = `${missingFields.join(", ")} cannot be empty`;
      setErrorToast(message);
      setTimeout(() => setErrorToast(null), 3000);
      return false;
    }

    return true;
  };

  const handleSaveExerciseAndContinue = async () => {
    if (validateExerciseForm()) {
      try {

        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        const formData = new FormData();
        if (exerciseForm.image) {
          formData.append("image", exerciseForm.image);
        }
        if (exerciseForm.videoFile) {
          formData.append("video", exerciseForm.videoFile);
        }
        formData.append("name", exerciseForm.Name);
        formData.append("difficulty", exerciseForm.difficulty);
        formData.append("duration", exerciseForm.duration);


        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/goals/exercise`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
        if (res.ok) {
          setActiveTab('workout');
        }
      } catch (error) {
        console.error('Error saving exercise:', error);
      }
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
            <div className="flex items-center gap-16">
              <label className="w-[150px] text-sm font-urbanist font-medium">Workout Name</label>
              <div>
                <input
                  type="text"
                  name="workoutName"
                  value={form.workoutName}
                  onChange={handleChange}
                  className={`w-[516px] border rounded-lg p-3 bg-white ${errors.workoutName ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.workoutName && (
                  <p className="text-red-500 text-sm mt-1">{errors.workoutName}</p>
                )}
              </div>
            </div>
            <div className="flex items-start gap-16">
              <label className="w-[150px] text-sm font-urbanist font-medium pt-2">Description</label>
              <div>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  maxLength={500}
                  className={`w-[516px] border rounded-lg px-3 py-2 h-24 ${errors.description ? "border-red-500" : "border-gray-300"
                    }`}
                />
                <p className="text-xs text-gray-500 text-right">{form.description.length}/500</p>
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-16 relative">
              <label className="w-[150px] text-sm font-urbanist font-medium">Select Exercise</label>
              <div className="w-[516px] relative">
                <div
                  tabIndex={0}
                  onClick={() => setShowDropdown((prev) => !prev)}
                  onFocus={() => setShowDropdown(true)}
                  className={`rounded-lg px-3 py-2 cursor-pointer flex justify-between items-center outline-none
    ${showDropdown ? "border-2 border-black " : "border border-gray-300"}`}
                >

                  <span className="text-sm">
                    {form.muscleGroup.length > 0
                      ? form.muscleGroup.map((item) => item.name).join(", ")
                      : "Select exercises"}
                  </span>
                  <svg
                    className={`w-4 h-4 ml-2 transform transition-transform ${showDropdown ? "rotate-180" : "rotate-0"}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {showDropdown && (
                  <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                    {/* Search box */}
                    <div className="px-4 py-2">
                      <input
                        type="text"
                        placeholder="Search exercises..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      />
                    </div>

                    {/* Filtered options */}
                    {filteredOptions.length > 0 ? (
                      filteredOptions.map((exercise) => {
                        const isChecked = form.muscleGroup.some((item) => item.id === exercise._id);
                        return (
                          <label
                            key={exercise._id}
                            className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm justify-between"
                          >
                            <div className="flex">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleChangeexercise(exercise)}
                                className="mr-2"
                              />
                              <span>{exercise.name}</span>
                            </div>
                            <span className="text-sm">{exercise.duration} mins</span>
                          </label>
                        );
                      })
                    ) : (
                      <div className="px-4 py-2 text-sm text-gray-500">No results found</div>
                    )}
                  </div>
                )}
              </div>
            </div>






            <hr className="border-t border-gray-200" />

            <div className="flex items-center gap-16 relative">
              <label className="w-[150px] text-sm font-urbanist font-medium">Focus Type</label>

              <div className="relative w-[516px]">
                <select
                  name="focusArea"
                  value={form.focusArea}
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
                className={`w-[516px] border rounded-lg px-3 py-2 ${errors.calories ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors.calories && (
                <p className="text-red-500 text-sm mt-1">{errors.calories}</p>
              )}
            </div>

            {/* <div className="flex items-center gap-16">
              <label className="w-[150px] text-sm font-urbanist font-medium">Tags</label>
              <input
                type="text"
                name="tags"
                value={form.tags}
                onChange={handleChange}
                className="w-[516px] border border-gray-300 rounded-lg px-3 py-2"
              />
            </div> */}
            <div className="flex items-center gap-16 relative">
              <label className="w-[150px] text-sm font-urbanist font-medium">Workout Type</label>

              <div className="relative w-[516px]">
                <select
                  name="Workouttype"
                  value={form.Workouttype}
                  onChange={handleChange}
                  className="w-full appearance-none border border-gray-300 rounded-lg px-3 py-2 text-sm font-urbanist pr-10"
                >
                  <option value="">Select</option>
                  <option>Lose weight</option>
                  <option>Build Muscle</option>
                  <option>Improve endurance</option>
                  <option>Enhance flexibility</option>
                  <option>Maintain general fitness</option>
                  <option>Gain healthy weight</option>
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

            <hr className="border-t border-gray-200" />

            {/* <div className="flex items-center gap-16">
              <label className="w-[150px] text-sm font-urbanist font-medium">Number of Rounds</label>
              <input
                type="number"
                name="rounds"
                value={form.rounds}
                onChange={handleChange}
                className="w-[516px] border border-gray-300 rounded-lg px-3 py-2"
              />
            </div> */}

            {/* <div className="flex items-center gap-16">
              <label className="w-[150px] text-sm font-urbanist font-medium">Total Duration</label>
              <input
                type="text"
                name="duration"
                value={form.duration}
                onChange={handleChange}
                className="w-[516px] border border-gray-300 rounded-lg px-3 py-2"
              />

            </div> */}
            {/* <div className="border-t border-gray-200 py-2" /> */}

          </div>
        )}

        {activeTab === 'exercise' && (
          <div className="space-y-7">
            {/* Reusable Row Style */}
            <div className="flex items-start gap-16">
              <label className="w-[150px] text-sm font-urbanist font-medium pt-2">Exercise Image</label>
              <WorkoutImageUpload onUpload={handleUpload} uploadedFileName={exerciseForm.image?.name} />
            </div>
            <div className="flex items-start gap-16">
              <label className="w-[150px] text-sm font-urbanist font-medium pt-2">Exercise Video</label>
              <WorkoutVideoUpload onUpload={handleUploadExcercise} uploadedFileName={exerciseForm.videoFile?.name} />
            </div>

            <div className="flex items-center gap-16">
              <label className="w-[150px] text-sm font-urbanist font-medium">Exercise Name</label>
              <input
                type="text"
                name="Name"
                value={exerciseForm.Name}
                onChange={handleChangeExcercise}
                className="w-[516px] border border-gray-300 rounded-lg p-3 bg-white"
              />
            </div>

            <div className="flex items-center gap-16 relative">
              <label className="w-[150px] text-sm font-urbanist font-medium">Difficulty Level</label>

              <div className="relative w-[516px]">
                <select
                  name="difficulty"
                  value={exerciseForm.difficulty}
                  onChange={handleChangeExcercise}
                  className="w-full appearance-none border border-gray-300 rounded-lg px-3 py-2 text-sm font-urbanist pr-10"
                >
                  <option value="">Select</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
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

            {/* <div className="flex items-center gap-16">
              <label className="w-[150px] text-sm font-urbanist font-medium">Number of Rounds</label>
              <input
                type="number"
                name="rounds"
                value={exerciseForm.rounds}
                onChange={handleChangeExcercise}
                className="w-[516px] border border-gray-300 rounded-lg px-3 py-2"
              />
            </div> */}

            <div className="flex items-center gap-16">
              <label className="w-[150px] text-sm font-urbanist font-medium">Total Duration</label>
              <input
                type="text"
                name="duration"
                value={exerciseForm.duration}
                onChange={handleChangeExcercise}
                placeholder='in minutes e.g. 30sec as 1min as 1'
                className="w-[516px] border border-gray-300 rounded-lg px-3 py-2"
              />

            </div>
            <div className="border-t border-gray-200 py-2" />
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          {activeTab === 'exercise' ? (
            <button
              onClick={handleSaveExerciseAndContinue}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Save
            </button>
          ) : activeTab === 'workout' ? (
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition mt-[20px] "
            >
              Next: Preview
            </button>
          ) : null}
        </div>

      </div>
    </div>
  );
};

export default AddNewWorkoutStep1Page;
