"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
 
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
        {/* {isFaq && (

          <button onClick={() => setShowModal(true)}
            className="border border-[#1570EF] text-[#1570EF] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1570EF] hover:text-white transition-colors font-urbanist">
            Add New FAQ
          </button>

        )} */}
        {/* {showModal && (
         
        )} */}
        {isFaq && (
          <button
            onClick={() => router.push('/faq?mode=create')}
            className="border border-[#1570EF] text-[#1570EF] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1570EF] hover:text-white transition-colors font-urbanist"
          >
            Add New FAQ
          </button>
        )}


      </div>
    </header>
  );
};

export default Header;