"use client";

import { UserProfile } from "../../types/api";
import LabeledInput from "./LabeledInput";

interface FitnessProfileSectionProps {
  user: UserProfile;
}

export default function FitnessProfileSection({ user }: FitnessProfileSectionProps) {
  return (
    <div className="bg-[#F5F5F5] w-full h-[400px] border-[1px] border-[#E0E0E1] shadow-md rounded-xl p-6 text-black flex flex-col gap-6">
      <LabeledInput label="Fitness Goals" value={user.fitnessGoal} />
      <LabeledInput label="Fitness Level" value={user.fitnessLevel} />
      <LabeledInput label="Preferred Workout Types" value={user.workoutType} />
      <LabeledInput label="Health Conditions or Limitations" value={user.healthCondition} />
    </div>
  );
}