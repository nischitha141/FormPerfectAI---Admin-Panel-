'use client';

import React, { useEffect, useState } from 'react';
import TableHeader from '@components/ambassador_program/TableHeader';
import CommonTable from '@components/common_table/CommonTable';
import type { SubscriptionUser } from '../../types/api';
import withAuth from '../../utils/withAuth';
import { userService } from '@services/user.service';

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [subscriptionUser, setSubsciptionUser] = useState<SubscriptionUser[]>([]);
  // const [userStatusList, setUserStatusList] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await userService.getSubscriptionUsers();
        // ✅ Set subscription users
        if (response.success && response.data) {
          setSubsciptionUser(response.data.users);
        } else {
          setError(response.message || 'Failed to fetch referrals');
        }

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
    

      <div className="bg-white rounded-lg shadow-sm p-6">
        <TableHeader title={"Users List"}/>
        <CommonTable users={subscriptionUser} />
      </div>
    </div>
  );
};

export default withAuth(Users);