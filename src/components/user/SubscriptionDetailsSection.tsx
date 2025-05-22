"use client";

import { UserSubscriptionData } from "../../types/api";
import InputWithButton from "./InputWithButton";
import LabeledInput from "./LabeledInput";

interface SubscriptionDetailsSectionProps {
  userSubDetails: UserSubscriptionData;
  formatDate: (dateString: string) => string;
}

export default function SubscriptionDetailsSection({
  userSubDetails,
  formatDate,
}: SubscriptionDetailsSectionProps) {
  return (
    <div className="bg-[#F5F5F5] w-full border-[1px] border-[#E0E0E1] shadow-md rounded-xl p-6 text-black flex flex-col gap-6">
      <InputWithButton
        label="Subscription Plan"
        value={userSubDetails?.activeSubscriptionData?.planName || ""}
        onButtonClick={() => console.log("button clicked")}
      />
      <LabeledInput
        label="Next Billing Date"
        value={formatDate(
          userSubDetails?.activeSubscriptionData?.subscriptionEndDate || ""
        )}
      />
    </div>
  );
}