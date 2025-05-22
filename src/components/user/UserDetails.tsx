"use client";
import { UserProfile } from "../../types/api";
import SectionHeader from "./SectionHeader";
import PersonalInfoSection from "./PersonalInfoSection";
import FitnessProfileSection from "./FitnessProfileSection";
import AccountDetailsSection from "./AccountDetailsSection";

interface UserDetailsProps {
  user: UserProfile;
}

export default function UserDetails({ user }: UserDetailsProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) return dateString;

    const isToday = new Date().toDateString() === date.toDateString();
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    return isToday
      ? `Today, ${day} ${month} ${year}`
      : `${day} ${month} ${year}`;
  };

  return (
    <div className="px-5">
      {/* Section 1: Personal Info */}
      <div className="border-b border-gray-200 flex pb-[20px]">
        <SectionHeader
          title="Personal Info"
          description="View the user's personal details to ensure accurate records."
        />
        <PersonalInfoSection user={user} />
      </div>

      {/* Section 2: Fitness Profile */}
      <div className="border-b border-gray-200 flex py-[20px]">
        <SectionHeader
          title="Fitness Profile"
          description="Check the user's fitness preferences, goals, and profile for reference."
        />
        <FitnessProfileSection user={user} />
      </div>

      {/* Section 3: Account Details */}
      <div className="flex py-[20px]">
        <SectionHeader
          title="Account Details"
          description="Review the user's account status and details."
        />
        <AccountDetailsSection user={user} formatDate={formatDate} />
      </div>

      {/* Section 4: Empty Section */}
      <div></div>
    </div>
  );
}
