"use client"
import React, { useState, useRef } from 'react';
import {
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import ConfirmationDialog from './ConfirmationDialog';
import { useRouter } from 'next/navigation';
interface WorkoutTable {
  id: string;
  WorkoutName: string;
  TrainerName: string;
  Rounds: string;
  Duration: string;
  // DifficultyLevel: string;
  WorkoutType: string;
}

interface WorkoutTableProps {
  requests: WorkoutTable[];
  searchQuery: string;
  filterType: string;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (size: number) => void;
  fetchData?: (page: number, limit: number) => void; // Optional fetch function
}


const WorkoutTable: React.FC<WorkoutTableProps> = ({ fetchData, requests, searchQuery, filterType, currentPage, totalPages, itemsPerPage, onPageChange, onItemsPerPageChange }) => {
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const router = useRouter();
  const [isSuspendDialogOpen, setIsSuspendDialogOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const [sortConfig, setSortConfig] = useState<{ key: keyof WorkoutTable; direction: 'asc' | 'desc' } | null>(null);

  const handleActionClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedRow(selectedRow === id ? null : id);
  };



  const handleSuspendClick = (id: string) => {

    setIsSuspendDialogOpen(true);
    setSelectedRow(id);
  };

  const handleSuspendConfirm = async () => {
    // TODO: Implement suspend logic here

    try {
      const token = localStorage.getItem('token');

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/WorkoutById`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ workoutId: selectedRow }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        if (fetchData) {
          fetchData(currentPage, itemsPerPage); // Refresh data after deletion
        }
      }

      else {
        alert(data.message || "Failed to delete workout");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("An error occurred while deleting");
    }
    setIsSuspendDialogOpen(false);
  };

  const handleDialogClose = () => {
    setIsSuspendDialogOpen(false);
  };




  const filteredRequests = requests.filter((request) => {
    const query = searchQuery?.toLowerCase() || '';
    const filter = filterType || '';

    const matchesSearch =
      request.WorkoutName.toLowerCase().includes(query) ||
      request.TrainerName.toLowerCase().includes(query) ||
      request.Rounds.toLowerCase().includes(query) ||
      request.Duration.toLowerCase().includes(query) ||
      // request.DifficultyLevel.toLowerCase().includes(query) ||
      request.WorkoutType.toLowerCase().includes(query);

    const matchesFilter = filter === '' || request.WorkoutType?.toLowerCase().split(',').map(x => x.trim()).includes(filter.toLowerCase());


    return matchesSearch && matchesFilter;
  });



  const sortedRequests = sortConfig
    ? [...filteredRequests].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    })
    : filteredRequests;

  const currentRequests = sortedRequests;
  const handleSort = (key: keyof WorkoutTable) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      } else {
        return { key, direction: 'asc' };
      }
    });
  };

  const renderSortIcon = (key: keyof WorkoutTable) => {
    if (sortConfig?.key !== key) return null;
    return sortConfig.direction === 'asc' ? (
      <ChevronUp className="inline w-3 h-3 ml-1" />
    ) : (
      <ChevronDown className="inline w-3 h-3 ml-1" />
    );
  };

  const handleViewClick = (id: string, e: React.MouseEvent): void => {
    e.stopPropagation();
    router.push(`/workout_metrics/addnewworkout/step_2?workoutId=${id}`);

    setSelectedRow(null); // Optionally close the menu after viewing
  }
  const handleEditClick = (id: string, e: React.MouseEvent): void => {
    e.stopPropagation();
    router.push(`/workout_metrics/editworkout/step_1?workoutId=${id}`);
    setSelectedRow(null); // Optionally close the menu after viewing
  }


  return (
    <div className="mt-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-[#FBFBFD]">
          <thead className="bg-[#FBFBFD]">
            <tr>
              {[
                { label: 'Workout Name', key: 'WorkoutName' },
                { label: 'Trainer Name', key: 'TrainerName' },
                { label: 'Rounds', key: 'Rounds' },
                { label: 'Duration', key: 'Duration' },
                // { label: 'Difficulty Level', key: 'DifficultyLevel' },
                { label: 'Workout Type', key: 'WorkoutType' },
              ].map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-3 text-left text-xs font-bold text-gray-500  tracking-wider cursor-pointer"
                  onClick={() => handleSort(col.key as keyof WorkoutTable)}
                >
                  {col.label}
                  {renderSortIcon(col.key as keyof WorkoutTable)}
                </th>
              ))}
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentRequests.map((request) => (
              <tr key={request.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.WorkoutName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.TrainerName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.Rounds}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.Duration}</td>
                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.DifficultyLevel}</td> */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.WorkoutType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                  <div ref={menuRef}>
                    <button
                      onClick={(e) => handleActionClick(request.id, e)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>

                    {selectedRow === request.id && (
                      <div
                        className="absolute right-2 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"

                      >
                        <div className="py-1">
                          <button
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                            onClick={(e) => handleViewClick(request.id, e)} // Prevents closing the menu
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </button>
                          <button
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                            onClick={(e) => handleEditClick(request.id, e)}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </button>
                          <button
                            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full"
                            onClick={() => handleSuspendClick(request.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {currentRequests.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-gray-500 py-4">
                  No matching results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 px-6 py-3 bg-[#FBFBFD] rounded-lg">
        {/* Items per page selector */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Show</span>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="border border-gray-200 rounded-lg px-2 py-1 text-sm"
          >

            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span className="text-sm text-gray-600">per page</span>
        </div>

        {/* Page navigation */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1 rounded-lg border border-gray-200 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-1 rounded-lg border border-gray-200 disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>


      <ConfirmationDialog
        isOpen={isSuspendDialogOpen}
        onClose={handleDialogClose}
        onConfirm={handleSuspendConfirm}
        title="Delete Workout"
        message="Are you sure you want to delete this workout? This action cannot be undone."
        confirmButtonText="Delete"
      />
    </div>
  );
};

export default WorkoutTable;
