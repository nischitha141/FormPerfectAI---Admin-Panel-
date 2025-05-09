'use client';

import React, { useEffect, useState } from 'react';
import { payoutService } from '../../services/payout.service';
import type { PayoutData, PayoutStats } from '../../types/api';
import DashboardDataCard from '@components/data_card/DataCard';
import TableHeader from '@components/ambassador_program/TableHeader';
import PayoutRequestsTable from '@components/ambassador_program/PayoutRequestsTable';
import withAuth from '../../utils/withAuth';

const PayoutsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [payoutData, setPayoutData] = useState<PayoutData[]>([]);
  const [payoutStats, setPayoutStats] = useState<PayoutStats | null>(null);

  useEffect(() => {
    const fetchPayoutData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await payoutService.getPayoutData();
        if (response.success && response.data) {
          setPayoutData(response.data.payoutData);
          setPayoutStats(response.data.payoutStats);
        } else {
          setError(response.message || 'Failed to fetch payout data');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching payout data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayoutData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500 text-center p-4">
          <p className="text-lg font-semibold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Transform payout data to match the table component's expected format
  const transformedPayoutData = payoutData.map(payout => ({
    id: payout._id,
    ambassadorName: payout.username,
    tierStatus: payout.tierName,
    totalEarnings: payout.totalEarnings,
    requestedAmount: payout.reqAmount,
    payoutMethod: payout.payment_method,
    requestedOn: new Date(payout.createdAt).toLocaleDateString(),
    status: payout.status
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardDataCard
          title="Total Referral Payouts(This Month)"
          value={payoutStats ? `$${(payoutStats.totalReferralPayoutThisMonth ?? 0).toFixed(2)}` : "$0.00"}
        />
        <DashboardDataCard
          title="Total Pending Payouts"
          value={payoutStats ? `$${((payoutStats.totalPendingPayouts ?? 0)).toFixed(2)}` : "$0.00"}
        />
        <DashboardDataCard
          title="Total Approved Payouts"
          value={payoutStats ? `$${(payoutStats.totalApprovedPayouts ?? 0).toFixed(2)}` : "$0.00"}
        />
        <DashboardDataCard
          title="Total Rejected Payouts"
          value={payoutStats ? `$${(payoutStats.totalReferralPayoutThisMonth ?? 0).toFixed(2)}` : "$0.00"}
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <TableHeader title="Payout Requests Table" />
        <PayoutRequestsTable requests={transformedPayoutData} />
      </div>
    </div>
  );
};

export default withAuth(PayoutsPage); 