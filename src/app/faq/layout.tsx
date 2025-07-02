// layout.tsx
import Sidebar from "@components/sidebar/sidebar";
import Header from "@components/header/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header
          title="FAQ Management"
          description="Manage frequently asked questions that support and guide your users."
          showPayoutButton={false}
          showAddNewWorkout={false}
          isFaq={true}
        />
        <main className="flex-1 p-6 bg-white overflow-auto">{children}</main>
      </div>
    </div>
  );
}
