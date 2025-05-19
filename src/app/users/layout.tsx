'use client';
import Sidebar from "@components/sidebar/sidebar";
import Header from "@components/header/header";
import { usePathname } from 'next/navigation';

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isUserProfilePage = pathname.startsWith('/users/') && pathname.split('/').length === 3;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {!isUserProfilePage ? (
          <Header
            title="Users"
            description="Track referrals, earnings, and tier progress at a glance"
          />
        ) : (
            <Header
            isUserProfilePage={true}
              showPayoutButton={false}
          />)
        }
        <main className="flex-1 p-6 bg-white overflow-auto">{children}</main>
      </div>
    </div>
  );
}