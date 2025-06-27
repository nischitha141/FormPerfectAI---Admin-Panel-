"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  title?: string;
  description?: string;
  showPayoutButton?: boolean;
  isUserProfilePage?: boolean;
  showAddNewWorkout?: boolean;
  isAddNewWorkoutPage?: boolean;
  isFaq?: boolean;

}

const Header: React.FC<HeaderProps> = ({
  title = "Dashboard",
  description = "Welcome to the dashboard",
  showPayoutButton = true,
  isUserProfilePage = false,
  showAddNewWorkout = true,
  isAddNewWorkoutPage = false,
  isFaq = false,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [visible, setVisible] = useState(true);
  return (
    <header className="w-full h-16 bg-[#F5F5F5] flex items-center justify-between px-6">
      {/* Left Section */}
      {!isAddNewWorkoutPage ? (
        !isUserProfilePage ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <Image src="/bank_card.svg" alt="FormPerfect AI" width={20} height={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900 font-urbanist">{title}</span>
              <span className="text-xs text-gray-500 font-urbanist">{description}</span>
            </div>
          </div>
        ) : (
          <Link href="/users">
            <button className="flex gap-1 bg-white border border-[#E0E0E1] rounded-[10px] px-[10px] py-2 w-[232px] h-[40px] shadow-[0px_1px_2px_0px_#0A0D1408] text-[14px] font-medium text-gray-900 hover:bg-gray-50 transition-colors font-urbanist leading-[20px] tracking-[-0.006em] items-center">
              <Image src="/back_arrow.svg" alt="Back" width={20} height={20} />
              <span>Back to ALL Users</span>
            </button>
          </Link>
        )
      ) : <Link href={`/workout_metrics`}>
        <button className="flex  gap-1 bg-white border border-[#E0E0E1] rounded-[10px] px-[10px] py-2 w-[232px] h-[40px] shadow-[0px_1px_2px_0px_#0A0D1408] text-[14px] font-medium text-gray-900 hover:bg-gray-50 transition-colors font-urbanist leading-[20px] tracking-[-0.006em] items-center">
          <Image src="/back_arrow.svg" alt="Back" width={20} height={20} />
          <span>Back to Workout Metrics</span>
        </button>
      </Link>}


      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2">
          <Image src="/search.svg" alt="FormPerfect AI" width={20} height={20} />
        </div>
        <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2">
          <Image src="/notification.svg" alt="FormPerfect AI" width={20} height={20} />
        </div> */}
        {showPayoutButton && (
          <Link href="/payouts">
            <button className="border border-[#1570EF] text-[#1570EF] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1570EF] hover:text-white transition-colors font-urbanist">
              Pending Payout Requests
            </button>
          </Link>
        )}
        {showAddNewWorkout && (
          <Link href={`/workout_metrics/addnewworkout/step_1`}>
            <button className="border border-[#1570EF] text-[#1570EF] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1570EF] hover:text-white transition-colors font-urbanist">
              Add New Workout
            </button>
          </Link>
        )}
        {isFaq && (

          <button onClick={() => setShowModal(true)}
            className="border border-[#1570EF] text-[#1570EF] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1570EF] hover:text-white transition-colors font-urbanist">
            Add New FAQ
          </button>

        )}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white w-[600px] rounded-xl p-6 shadow-lg relative">

              <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_dii_11466_10535)">
                  <path d="M2 11C2 5.47715 6.47715 1 12 1H40C45.5229 1 50 5.47715 50 11V39C50 44.5229 45.5228 49 40 49H12C6.47715 49 2 44.5228 2 39V11Z" fill="white" />
                  <path d="M12 1.5H40C45.2467 1.5 49.5 5.75329 49.5 11V39C49.5 44.2467 45.2467 48.5 40 48.5H12C6.7533 48.5 2.5 44.2467 2.5 39V11C2.5 5.7533 6.75329 1.5 12 1.5Z" stroke="#E0E0E1" />
                  <path d="M28.0914 19.7222H34.0451C34.5173 19.7222 34.7534 19.7222 34.8914 19.8215C35.0119 19.9081 35.0903 20.0414 35.1075 20.1888C35.1272 20.3577 35.0126 20.564 34.7833 20.9768L33.3624 23.5343C33.2793 23.684 33.2377 23.7589 33.2214 23.8381C33.207 23.9083 33.207 23.9806 33.2214 24.0508C33.2377 24.13 33.2793 24.2049 33.3624 24.3545L34.7833 26.9121C35.0126 27.3248 35.1272 27.5312 35.1075 27.7001C35.0903 27.8475 35.0119 27.9808 34.8914 28.0674C34.7534 28.1667 34.5173 28.1667 34.0451 28.1667H26.6136C26.0224 28.1667 25.7269 28.1667 25.5011 28.0516C25.3024 27.9504 25.141 27.7889 25.0398 27.5903C24.9247 27.3645 24.9247 27.0689 24.9247 26.4778V23.9444M21.2303 34.5L17.0081 17.6111M18.5914 23.9444H26.4025C26.9937 23.9444 27.2892 23.9444 27.515 23.8294C27.7137 23.7282 27.8751 23.5667 27.9763 23.3681C28.0914 23.1423 28.0914 22.8467 28.0914 22.2556V17.1889C28.0914 16.5977 28.0914 16.3021 27.9763 16.0763C27.8751 15.8777 27.7137 15.7162 27.515 15.615C27.2892 15.5 26.9937 15.5 26.4025 15.5H18.6433C17.906 15.5 17.5374 15.5 17.2852 15.6528C17.0642 15.7867 16.9 15.997 16.8237 16.2439C16.7366 16.5256 16.8261 16.8832 17.0049 17.5985L18.5914 23.9444Z" stroke="#4E525A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </g>
                <defs>
                  <filter id="filter0_dii_11466_10535" x="0" y="0" width="52" height="52" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="1" />
                    <feGaussianBlur stdDeviation="1" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.0392157 0 0 0 0 0.0496732 0 0 0 0 0.0705882 0 0 0 0.05 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_11466_10535" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_11466_10535" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="-2" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.0392157 0 0 0 0 0.0496732 0 0 0 0 0.0705882 0 0 0 0.05 0" />
                    <feBlend mode="normal" in2="shape" result="effect2_innerShadow_11466_10535" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feMorphology radius="1" operator="erode" in="SourceAlpha" result="effect3_innerShadow_11466_10535" />
                    <feOffset />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.0392157 0 0 0 0 0.0496732 0 0 0 0 0.0705882 0 0 0 0.18 0" />
                    <feBlend mode="normal" in2="effect2_innerShadow_11466_10535" result="effect3_innerShadow_11466_10535" />
                  </filter>
                </defs>
              </svg>

              <h2 className="text-lg font-semibold my-2">FAQ Details</h2>
              <p className="text-xs text-gray-500 font-urbanist mb-2">Add a new question or update an existing one to keep your FAQs helpful and relevant.</p>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Question</label>
                  <input
                    type="text"
                    placeholder="e.g. How does FormPerfect AI work?"
                    className="w-full border rounded-md px-3 py-2 mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Answer</label>
                  <textarea
                    placeholder="e.g. FormPerfect AI uses your device’s camera to analyze your movements..."
                    className="w-full border rounded-md px-3 py-2 mt-1"
                    rows={3}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setVisible(prev => !prev)}
                    className={`w-11 h-5 flex items-center rounded-full p-1 transition-colors duration-300 ${visible ? 'bg-[#1570EF]' : 'bg-gray-300'
                      }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${visible ? 'translate-x-5' : 'translate-x-0'
                        }`}
                    />
                  </button>
                  <label htmlFor="visible" className="text-sm">Visible to users</label>
                </div>
                <div className="text-xs text-gray-500 font-urbanist mb-2">Toggle to show or hide this FAQ from users in the app.</div>
              </div>

              <div className="mt-6 flex justify-center gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 w-[40%]"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 rounded-lg bg-[#1570EF] text-white hover:bg-[#0e5fd8] w-[40%]"
                  onClick={() => setShowModal(false)}>
                  Save
                </button>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-semibold"
              >
                &times;
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};

export default Header;