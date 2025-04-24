import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  title?: string;
  description?: string;
  showPayoutButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  title = "Dashboard",
  description = "Welcome to the dashboard",
  showPayoutButton = true
}) => {
  return (
    <header className="w-full h-16 bg-[#F5F5F5] flex items-center justify-between px-6">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
          <Image src="/bank_card.svg" alt="FormPerfect AI" width={20} height={20} />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-900">{title}</span>
          <span className="text-xs text-gray-500">{description}</span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Icons Container */}
        <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2">
          <Image src="/search.svg" alt="FormPerfect AI" width={20} height={20} />
        </div>
        <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2">
          <Image src="/notification.svg" alt="FormPerfect AI" width={20} height={20} />
        </div>
        {/* Button */}
        {showPayoutButton && (
          <Link href="/payouts">
            <button className="border border-[#1570EF] text-[#1570EF] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1570EF] hover:text-white transition-colors">
              Pending Payout Requests
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header; 