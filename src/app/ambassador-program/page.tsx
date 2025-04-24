'use client';

import React, { useEffect, useState } from 'react';
import DataCard from '@components/data_card/DataCard';
import TableHeader from '@components/ambassador_program/TableHeader';
import AmbassadorTable from '@components/ambassador_program/AmbassadorTable';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ambassadorService } from '../../services/ambassador.service';
import type { ReferralUser, ReferralStats } from '../../types/api';
import withAuth from '../../utils/withAuth';


// TypeScript interfaces
interface GrowthData {
  name: string;
  value: number;
}

interface TierProgressProps {
  tier: string;
  count: number;
  percentage: string;
  color: string;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

// Mock data for the referral growth chart
const growthData: GrowthData[] = [
  { name: 'Dec 15', value: 4000 },
  { name: 'Dec 18', value: 5000 },
  { name: 'Dec 21', value: 5500 },
  { name: 'Dec 24', value: 5300 },
  { name: 'Dec 27', value: 5800 },
  { name: 'Dec 30', value: 6000 },
  { name: 'Jan 3', value: 5700 },
  { name: 'Jan 7', value: 6200 },
];

// Custom tooltip component for the chart
const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded-lg shadow-md border border-gray-200">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-sm text-blue-600">{`Referrals: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

// Tier progress component
const TierProgress: React.FC<TierProgressProps> = ({ tier, count, percentage, color }) => (
  <div className="flex items-center justify-between mb-3">
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">{tier}</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">{count}</span>
      <span className="text-xs text-gray-500">{percentage}</span>
      <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-2 rounded-full ${color}`}
          style={{ width: percentage }}
        ></div>
      </div>
    </div>
  </div>
);

const Ambassador = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [ambassadors, setAmbassadors] = useState<ReferralUser[]>([]);
  // const [userStatusList, setUserStatusList] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [referralRes, statusRes] = await Promise.all([
          ambassadorService.getReferralUsers(),
          ambassadorService.getUserStatusList(),
        ]);
        // ✅ Set referral users
        if (referralRes.success && referralRes.data) {
          setStats(referralRes.data.stats);
          setAmbassadors(referralRes.data.referralUsers);
        } else {
          setError(referralRes.message || 'Failed to fetch referrals');
        }

        // ✅ Set user status list
        if (statusRes.success && statusRes.data) {
          // setUserStatusList(statusRes.data.statusList);
        } else {
          setError(statusRes.message || 'Failed to fetch user status list');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate total metrics
  const totalAmbassadors = stats?.totalAmbassador || 0;
  const activeAmbassadors = stats?.totalActiveAmbassadors || 0;
  const totalReferredUsers = stats?.totalReferredUser || 0;
  const totalRevenue = stats?.totalRevenue || 0;
  const totalConversionRate = stats?.totalConversionRate || 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DataCard title="Total Ambassadors" value={totalAmbassadors.toLocaleString()} />
        <DataCard title="Active Ambassadors" value={activeAmbassadors.toLocaleString()} />
        <DataCard title="Total Referred Users" value={totalReferredUsers.toLocaleString()} />
        <DataCard title="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} />
        <DataCard title="Conversion Rate (%)" value={`${totalConversionRate.toFixed(1)}%`} />
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="bg-white p-4 rounded-md border border-gray-200 flex-1">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-sm text-gray-500">Referral Growth Over Time</h3>
              <p className="text-2xl font-bold">{growthData[growthData.length - 1].value.toLocaleString()}</p>
              <p className="text-xs text-gray-500">in selected period</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full">
                ▲ 2.9%
              </span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 0 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-md border border-gray-200 lg:w-1/3">
          <div className="flex justify-between mb-4">
            <h3 className="text-sm text-gray-500">Referral Tiers</h3>
            <h3 className="text-sm text-gray-500">Active Ambassadors</h3>
          </div>

          <div className="mt-4">
            <TierProgress tier="Free Tier" count={141} percentage="16.32%" color="bg-blue-400" />
            <TierProgress tier="Silver Tier" count={75} percentage="8.32%" color="bg-slate-300" />
            <TierProgress tier="Gold Tier" count={37} percentage="4.39%" color="bg-yellow-400" />
            <TierProgress tier="Diamond Tier" count={142} percentage="16.42%" color="bg-cyan-400" />
            <TierProgress tier="Platinum Tier" count={142} percentage="16.42%" color="bg-purple-400" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <TableHeader title={"Ambassador List"}/>
        <AmbassadorTable ambassadors={ambassadors} />
      </div>
    </div>
  );
};

export default withAuth(Ambassador);