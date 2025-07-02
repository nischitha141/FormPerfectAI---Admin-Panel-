'use client';

import React, { useEffect, useState } from 'react';
import TableHeader from '@components/ambassador_program/TableHeader';
import withAuth from '../../utils/withAuth';
import WorkoutTable from '@components/ambassador_program/WorkoutTable';
type WorkoutAPIResponse = {
  _id: string;
  name: string;
  totalTime: number;
  goalCategoryId: { name?: string };
  exercises?: unknown[];
  focusArea?: string[];
};


const Workout_Metrics = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [workoutData, setWorkoutData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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

      const formatted = raw.map((item: WorkoutAPIResponse) => ({
        id: item._id,
        WorkoutName: item.name,
        TrainerName: 'AI',
        Rounds: item.exercises?.length.toString() || '0',
        Duration: `${item.totalTime} min`,
        DifficultyLevel: item.goalCategoryId.name || 'N/A',
        WorkoutType: item.goalCategoryId.name || 'N/A',
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
          fetchData={fetchData}
        />

      </div>
    </div>
  );
};

export default withAuth(Workout_Metrics);