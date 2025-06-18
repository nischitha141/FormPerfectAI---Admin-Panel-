'use client';
import Sidebar from "@components/sidebar/sidebar";
import Header from "@components/header/header";
import { usePathname } from 'next/navigation';

export default function Workout_MetricsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Check if path is for "add new workout" flow
  const isAddNewWorkoutPage = pathname.startsWith('/workout_metrics/addnewworkout/step_');

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">

        {!isAddNewWorkoutPage ? (
          <Header
            title="Workout Metrics"
            description="Manage exercises, track workout stats, control workout content, and customize workout details."
            showPayoutButton={false}
          />
        ) : (
          <Header
            showPayoutButton={false}
            isAddNewWorkoutPage={true}
            showAddNewWorkout={false}
            
          />
        )}

        <main className="flex-1 p-6 bg-white overflow-auto">{children}</main>
      </div>
    </div>
  );
}
