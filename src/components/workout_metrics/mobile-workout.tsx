"use client";
import React from "react";
import { cn } from "../../utils/mobile";
import { Timer, Flame } from 'lucide-react';
import { useWorkoutStore } from '@lib/store/workoutFormState';
interface MobileWorkoutProps {
  className?: string;
  uploadedImageUrl?: string | null;
}

export function MobileWorkout({ className, uploadedImageUrl }: MobileWorkoutProps) {

  const workoutForm = useWorkoutStore(state => state.form);
  return (
    <div className={cn("flex items-center justify-center p-8", className)}>
      {/* iPhone Frame */}
      <div className="relative">
        {/* Phone Shadow */}
        <div className="absolute inset-0 bg-black/20 rounded-[3rem] blur-xl translate-y-4" />

        {/* Phone Body */}
        <div className="relative bg-black rounded-[3rem] p-2 shadow-2xl">
          {/* Phone Screen */}
          <div className="bg-white rounded-[2.5rem] overflow-hidden relative">
            {/* Status Bar */}
            <div className="absolute top-0 left-0 right-0 h-6 bg-black z-50">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl" />
            </div>

            {/* Status Bar Content */}
            <div className="absolute top-1 left-6 right-6 h-4 flex items-center justify-between text-white text-xs font-medium z-50">
              <span>9:41</span>
              <div className="flex items-center gap-1">
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-white rounded-full" />
                  <div className="w-1 h-1 bg-white rounded-full" />
                  <div className="w-1 h-1 bg-white rounded-full" />
                  <div className="w-1 h-1 bg-white/40 rounded-full" />
                </div>
                <svg className="w-3 h-3" fill="white" viewBox="0 0 24 24">
                  <path d="M2 17h20v2H2zm1.15-4.05L4 11.47l.85 1.48L8 10.12l3.15 2.83L12 11.47l.85 1.48L16 10.12l3.15 2.83L20 11.47l.85 1.48H23v-2h-1.15l-.85-1.48L20 11.47l-.85-1.48L16 12.88l-3.15-2.83L12 11.47l-.85-1.48L8 12.88L4.85 10.05L4 11.47 3.15 10.05H2v2h1.15z" />
                </svg>
                <div className="w-5 h-3 border border-white rounded-sm">
                  <div className="w-3 h-1.5 bg-white rounded-sm ml-0.5 mt-0.5" />
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="w-[280px] h-[600px] overflow-hidden">
              <div className="pt-6">
                {/* Workout Content */}
                <div
                  className="bg-black text-white h-[600px] overflow-y-auto scrollbar-hide"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between px-4 py-3">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    <div className="flex items-center gap-3">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Video Section */}
                  <div className="relative mx-4 mb-4">
                    <div className=" bg-gray-800 rounded-2xl overflow-hidden relative">
                      {/* Video Content */}
                      {uploadedImageUrl ? (<img
                        src={uploadedImageUrl}
                        alt="Workout Banner"
                        className="h-1/3 w-full object-cover"
                      />) : (<img
                        src="/Gym_Mobility.png"
                        alt="Workout demonstration"
                        className="w-full h-full object-cover"
                      />)

                      }





                    </div>
                  </div>
                  {/* Timer Box - Single rectangular container overlaying center-bottom */}
                  <div className="relative bottom-[35px]  flex justify-center ">
                    <div
                      className="relative rounded-xl p-[2px] bg-[conic-gradient(_#D0EA59,_transparent_65%,_transparent_50%,_transparent_65%,_#D0EA59)]"
                    >
                      <div className="bg-black/80 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center gap-6">
                        {/* Time Section */}
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-[#D0EA59]  flex items-center justify-center border rounded-lg">
                            <div className=" text-black">
                              <Timer className="w-4 h-4" />

                            </div>
                          </div>
                          <div className="text-white text-xs">
                            <span className="font-medium">Time</span>
                            <br />
                            <span className="font-semibold">{workoutForm.duration}</span>
                          </div>
                        </div>

                        {/* Burn Section */}
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-[#D0EA59]  flex items-center justify-center border rounded-lg">
                            <div className=" text-black">
                              < Flame className="w-4 h-4" />

                            </div>
                          </div>
                          <div className="text-white text-xs">
                            <span className="font-medium">Burn</span>
                            <br />
                            <span className="font-semibold">{workoutForm.calories}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="px-4 space-y-6">
                    {/* Title */}
                    <h1 className="text-2xl font-bold text-white">
                      {workoutForm.workoutName}
                    </h1>

                    {/* Description */}
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {workoutForm.description}

                    </p>

                    {/* Equipment */}
                    <div className="space-y-3">
                      <h3 className="text-white font-semibold">Equipment:</h3>
                      <p className="text-gray-300 text-sm">
                        {workoutForm.equipment}

                      </p>
                    </div>

                    {/* Focus Areas */}
                    <div className="space-y-3">
                      <h3 className="text-white font-semibold">Focus Areas:</h3>
                      <p className="text-gray-300 text-sm">
                        {workoutForm.muscleGroup}
                      </p>
                    </div>

                    {/* Rounds */}
                    <div className="flex items-center justify-between">
                      <h3 className="text-white font-semibold">Rounds:</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-white text-lg font-bold">1</span>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-400">                        {workoutForm.rounds}
                        </span>
                      </div>
                    </div>

                    {/* Warm Up Section */}
                    <div className="bg-gray-900 rounded-2xl p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-lime-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-black"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-white font-medium">Warm Up</h4>
                          <p className="text-gray-400 text-sm">Jumping Jack</p>
                        </div>
                      </div>
                      <svg
                        className="w-6 h-6 text-lime-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>

                    {/* Bottom spacing for scroll */}
                    <div className="h-20" />
                  </div>
                </div>
              </div>
            </div>

            {/* Home Indicator */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-black rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
