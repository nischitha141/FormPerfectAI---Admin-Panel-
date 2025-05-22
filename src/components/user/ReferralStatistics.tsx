import { MoreHorizontal } from "lucide-react";

interface StatCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

function StatCard({ title, icon, children }: StatCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg ">
      <div className="flex items-center justify-between mb-6 border-b border-gray-200 py-5 px-2">
        <div className="flex items-center gap-2 cursor-pointer">
          {icon && <div className="text-gray-500">{icon}</div>}
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
          <MoreHorizontal size={20} />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-6 pb-5">
        {children}
      </div>
    </div>
  );
}

interface StatItemProps {
  value: string | number;
  label: string;
}

function StatItem({ value, label }: StatItemProps) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold text-gray-900 mb-1">
        {value}
      </div>
      <div className="text-sm text-gray-500">
        {label}
      </div>
    </div>
  );
}

interface ReferralStatisticsProps {
  ambassadorData: {
    inactiveUser: number;
    totalConversionRate: number;
    activeReferralUsers: number;
    totalReferredUser: number;
    pendingPayout: number;
    comissionEarnThisMonth: number;
    comissionEarnLifeTime: number;
    refrerralCode: string;
  };
}

export default function ReferralStatistics({ ambassadorData }: ReferralStatisticsProps) {
  // Format numbers for display
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  // Format percentage
  const formatPercentage = (rate: number) => {
    return `${Math.round(rate * 100)}%`;
  };

  return (
    <div className="">
      {/* Header */}
      <div className="mb-6 border-b border-gray-200 py-4 ">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Referral Statistics
        </h2>
        <p className="text-gray-600 text-sm">
          Monitor referral performance, earnings, and conversion rates to track engagement and growth.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Referral Performance Summary */}
        <StatCard 
          title="Referral Performance Summary"
          icon={
            <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center">
              <span className="text-white text-[8px] font-bold">i</span>
            </div>
          }
        >
          <StatItem 
            value={formatNumber(ambassadorData.totalReferredUser)} 
            label="Total Referrals" 
          />
          <StatItem 
            value={`${ambassadorData.activeReferralUsers}/${ambassadorData.inactiveUser}`} 
            label="Active/Inactive Users" 
          />
          <StatItem 
            value={formatPercentage(ambassadorData.totalConversionRate)} 
            label="Conversion Rate" 
          />
          <StatItem 
            value={formatCurrency(ambassadorData.comissionEarnThisMonth)} 
            label="Earnings This Month" 
          />
        </StatCard>

        {/* Commission & Payouts */}
        <StatCard 
          title="Commission & Payouts"
          icon={
            <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center">
              <span className="text-white text-[8px] font-bold">i</span>
            </div>
          }
        >
          <StatItem 
            value={formatCurrency(ambassadorData.comissionEarnLifeTime)} 
            label="Total Lifetime Earnings" 
          />
          <StatItem 
            value={formatCurrency(ambassadorData.pendingPayout)} 
            label="Pending Payouts" 
          />
        </StatCard>
      </div>
    </div>
  );
}