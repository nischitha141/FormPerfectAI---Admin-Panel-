'use client';

import React, { useEffect, useState } from 'react';
import TableHeader from '@components/ambassador_program/TableHeader';
import withAuth from '../../utils/withAuth';
import WorkoutTable from '@components/ambassador_program/WorkoutTable';


const Workout_Metrics = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [workoutData, setWorkoutData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
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
  const fetchData = async (page: number, limit: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;


      const res = await fetch(
        `${apiUrl}/api/admin/Workouts?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,

            'Content-Type': 'application/json',
          },
        }
      );

      const result = await res.json();
      const raw = result?.data?.data || [];

      const formatted = raw.map((item: any) => ({
        id: item._id,
        WorkoutName: item.name,
        TrainerName: 'AI',
        Rounds: item.exercises?.length.toString() || '0',
        Duration: `${item.totalTime} min`,
        DifficultyLevel: item.goalCategoryId.namr || 'N/A',
        WorkoutType: item.focusArea?.join(', ') || '',
      }));

      setWorkoutData(formatted);
      setTotalPages(result?.data?.totalPage || 1);

      if (result?.data?.pagination?.currentPage !== currentPage) {
        setCurrentPage(result?.data?.currentPage);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);


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
        <TableHeader title={"Workout List"} addNewWorkOut={true} searchQuery={searchQuery} setSearchQuery={setSearchQuery} filterType={filterType} setFilterType={setFilterType} />
        <WorkoutTable
          requests={workoutData}
          searchQuery={searchQuery}
          filterType={filterType}
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => {
            if (page >= 1 && page <= totalPages) {
              setCurrentPage(page);
            }
          }}
          onItemsPerPageChange={(limit) => {
            setItemsPerPage(limit);
            setCurrentPage(1);
          }}
        />

      </div>
    </div>
  );
};

export default withAuth(Workout_Metrics);