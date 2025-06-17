'use client';

import React, {  useState } from 'react';
import TableHeader from '@components/ambassador_program/TableHeader';
// import CommonTable from '@components/common_table/CommonTable';
// import type { SubscriptionUser } from '../../types/api';
import withAuth from '../../utils/withAuth';
// import { userService } from '@services/user.service';
import WorkoutTable from '@components/ambassador_program/WorkoutTable';

const Workout_Metrics = () => {
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  // const [subscriptionUser, setSubsciptionUser] = useState<SubscriptionUser[]>([]);
  // const [userStatusList, setUserStatusList] = useState<string[]>([]);
const testRequests = [
  {
    id: '1',
    WorkoutName: 'Full Body Blast',
    TrainerName: 'AI',
    Rounds: '5',
    Duration: '30 min',
    DifficultyLevel: 'Intermediate',
    WorkoutType: 'Strength',
  },
  {
    id: '2',
    WorkoutName: '10-Minute HIIT Circuit',
    TrainerName: 'AI',
    Rounds: '10',
    Duration: '10 min',
    DifficultyLevel: 'Advanced',
    WorkoutType: 'Cardio',
  },
  {
    id: '3',
    WorkoutName: 'Core Crusher',
    TrainerName: 'Liam Carter',
    Rounds: '12',
    Duration: '45 min',
    DifficultyLevel: 'Beginner',
    WorkoutType: 'Flexibility',
  },
  {
    id: '4',
    WorkoutName: 'Upper Body Burn',
    TrainerName: 'AI',
    Rounds: '8',
    Duration: '25 min',
    DifficultyLevel: 'Intermediate',
    WorkoutType: 'Strength, Flexibility',
  },
];

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setIsLoading(true);
  //       setError(null);

  //       const response = await userService.getSubscriptionUsers();
  //       // ✅ Set subscription users
  //       if (response.success && response.data) {
  //         setSubsciptionUser(response.data.users);
  //       } else {
  //         setError(response.message || 'Failed to fetch referrals');
  //       }

  //     } catch (err) {
  //       setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500"></div>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
  // }

  return (
    <div className="space-y-6 p-4">
    

      <div className="bg-white rounded-lg shadow-sm p-6">
        <TableHeader title={"Workout List"} addNewWorkOut={true} searchQuery={searchQuery} setSearchQuery={setSearchQuery} filterType={filterType} setFilterType={setFilterType}/>
        <WorkoutTable requests={testRequests} searchQuery={searchQuery} filterType={filterType}/>
      </div>
    </div>
  );
};

export default withAuth(Workout_Metrics);