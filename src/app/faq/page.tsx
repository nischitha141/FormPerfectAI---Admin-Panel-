'use client';

import React, {  useState } from 'react';
import TableHeader from '@components/ambassador_program/TableHeader';
// import CommonTable from '@components/common_table/CommonTable';
// import type { SubscriptionUser } from '../../types/api';
import withAuth from '../../utils/withAuth';
// import { userService } from '@services/user.service';
// import WorkoutTable from '@components/ambassador_program/WorkoutTable';
import FaqTable from '@components/ambassador_program/FaqTable';

const Workout_Metrics = () => {
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  // const [subscriptionUser, setSubsciptionUser] = useState<SubscriptionUser[]>([]);
  // const [userStatusList, setUserStatusList] = useState<string[]>([]);
const faqData: FaqTable[] = [
  {
    id: "1",
    Order: "1",
    Question: "How do I track my workouts?",
    AnswerPreview: 'Simply go to the "Workouts" section, select your workout, and...',
    Status: "Active"
  },
  {
    id: "2",
    Order: "2",
    Question: "How does FormPerfect AI work?",
    AnswerPreview: "FormPerfect AI uses your device's camera and advanced mo...",
    Status: "Active"
  },
  {
    id: "3",
    Order: "3",
    Question: "Is FormPerfect AI free to use?",
    AnswerPreview: "FormPerfect AI is free to use for first 7 days trial period and...",
    Status: "Active"
  },
  {
    id: "4",
    Order: "4",
    Question: "How can I join a fitness challenge?",
    AnswerPreview: 'Head to the "Challenges" section, view all available fitness ch...',
    Status: "Hidden"
  },
  {
    id: "5",
    Order: "5",
    Question: "Is there a way to set fitness goals?",
    AnswerPreview: "You can set personalized fitness goals based on steps, work...",
    Status: "Active"
  },
  {
    id: "6",
    Order: "6",
    Question: "How can I join a fitness challenge?",
    AnswerPreview: 'Head to the "Challenges" section, view all available fitness ch...',
    Status: "Hidden"
  },
  {
    id: "7",
    Order: "7",
    Question: "How can I join a fitness challenge?",
    AnswerPreview: 'Head to the "Challenges" section, view all available fitness ch...',
    Status: "Hidden"
  },
  {
    id: "8",
    Order: "8",
    Question: "How can I join a fitness challenge?",
    AnswerPreview: 'Head to the "Challenges" section, view all available fitness ch...',
    Status: "Active"
  },
  {
    id: "9",
    Order: "9",
    Question: "How can I join a fitness challenge?",
    AnswerPreview: 'Head to the "Challenges" section, view all available fitness ch...',
    Status: "Active"
  },
  {
    id: "10",
    Order: "10",
    Question: "How can I join a fitness challenge?",
    AnswerPreview: 'Head to the "Challenges" section, view all available fitness ch...',
    Status: "Active"
  }
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
        <TableHeader title={""} addFaq={true} searchQuery={searchQuery} setSearchQuery={setSearchQuery} filterType={filterType} setFilterType={setFilterType}/>
        <FaqTable requests={faqData} searchQuery={searchQuery} filterType={filterType}/>
      </div>
    </div>
  );
};

export default withAuth(Workout_Metrics);