"use client";

import { UserProfile } from "../../types/api";
import LabeledInput from "./LabeledInput";

interface PersonalInfoSectionProps {
  user: UserProfile;
}

export default function PersonalInfoSection({ user }: PersonalInfoSectionProps) {
  return (
    <div className="bg-[#F5F5F5] w-full h-[400px] border-[1px] border-[#E0E0E1] shadow-md rounded-xl p-6 text-black flex flex-col gap-6">
      <LabeledInput label="First Name" value={user.firstName} />
      <LabeledInput label="Email address" value={user.email} />
      <div className="flex gap-5">
        <LabeledInput label="Gender" value={user.gender} width="240px" />
        <LabeledInput label="Phone number" value={user.number} width="240px" />
      </div>
      <div className="flex gap-5 min-w-[500px]">
        <LabeledInput label="Age" value={user.age} width="240px" />
        <LabeledInput label="Height & Weight" value={`${user.height}/${user.weight}`} width="240px" />
      </div>
    </div>
  );
}