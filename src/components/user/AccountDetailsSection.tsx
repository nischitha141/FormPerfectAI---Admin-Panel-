"use client";

import { UserProfile } from "../../types/api";
import InputWithButton from "./InputWithButton";
import LabeledInput from "./LabeledInput";

interface AccountDetailsSectionProps {
  user: UserProfile;
  formatDate: (dateString: string) => string;
}

export default function AccountDetailsSection({ user, formatDate }: AccountDetailsSectionProps) {
  return (
    <div className="bg-[#F5F5F5] w-full border-[1px] border-[#E0E0E1] shadow-md rounded-xl p-6 text-black flex flex-col gap-6">
      <InputWithButton
        label="Account Status"
        value={user.status}
        onButtonClick={() => console.log("button clicked")}
      />
      <LabeledInput label="Account Creation Date" value={formatDate(user.AccountCreationDate)} />
      <LabeledInput label="Last Active Date" value={formatDate(user.lastActive)} />
    </div>
  );
}