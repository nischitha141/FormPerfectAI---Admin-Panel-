'use client';
import Sidebar from "@components/sidebar/sidebar";
import Header from "@components/header/header";


export default function Workout_MetricsLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">

        <Header
          title="Workout Metrics"
          description="Manage exercises, track workout stats, control workout content, and customize workout details."
          showPayoutButton={false}
        />

        <main className="flex-1 p-6 bg-white overflow-auto">{children}</main>
      </div>
    </div>
  );
}