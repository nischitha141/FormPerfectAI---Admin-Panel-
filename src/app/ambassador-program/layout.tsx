import Sidebar from "@components/sidebar/sidebar";
import Header from "@components/header/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header
          title="Ambassador Program"
          description="Track referrals, earnings, and tier progress at a glance"
          showAddNewWorkout={false}
        />
        <main className="flex-1 p-6 bg-white overflow-auto">{children}</main>
      </div>
    </div>
  );
} 