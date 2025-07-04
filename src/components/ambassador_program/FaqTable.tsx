import React, { useState, useRef } from 'react';
import {
  MoreVertical,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import ConfirmationDialog from './ConfirmationDialog';
import { useRouter } from 'next/navigation';
interface FaqTable {
  id: string;
  Order: string;
  Question: string;
  Answer: string;
  Status: string;

}

interface FaqTableProps {
  requests: FaqTable[];
  searchQuery: string;
  filterType: string;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (size: number) => void;
  fetchData?: (page: number, limit: number) => void;
}

const FaqTable: React.FC<FaqTableProps> = ({ fetchData, requests, searchQuery, filterType, currentPage, totalPages, itemsPerPage, onPageChange, onItemsPerPageChange }) => {

  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [isSuspendDialogOpen, setIsSuspendDialogOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [sortConfig, setSortConfig] = useState<{ key: keyof FaqTable; direction: 'asc' | 'desc' } | null>(null);

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

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/main/faq`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id: selectedRow }),
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
      // alert("An error occurred while deleting");
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
      request.Answer.toLowerCase().includes(query) ||
      // request.Order.toLowerCase().includes(query) ||
      request.Question.toLowerCase().includes(query) ||
      request.Status.toLowerCase().includes(query)


    const matchesFilter = filter === '' || request.Status.toLowerCase() === filter;

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





  const handleSort = (key: keyof FaqTable) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      } else {
        return { key, direction: 'asc' };
      }
    });
  };

  const renderSortIcon = (key: keyof FaqTable) => {
    const isActive = sortConfig?.key === key;
    return sortConfig?.direction === 'asc' && isActive ? (
      <ChevronUp className={`inline w-3 h-3 ml-1 ${isActive ? 'text-gray-700' : 'text-gray-400'}`} />
    ) : (
      <ChevronDown className={`inline w-3 h-3 ml-1 ${isActive ? 'text-gray-700' : 'text-gray-400'}`} />
    );
  };



  return (
    <div className="mt-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-[#FBFBFD]">
          <thead className="bg-[#FBFBFD]">
            <tr>
              {[
                { label: 'Order', key: 'Order' },
                { label: 'Question', key: 'Question' },
                { label: 'AnswerPreview', key: 'AnswerPreview' },
                { label: 'Status', key: 'Status' },
              ].map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-3 text-left text-xs font-bold text-gray-500  tracking-wider cursor-pointer"
                  onClick={() => handleSort(col.key as keyof FaqTable)}
                >
                  {col.label}
                  {renderSortIcon(col.key as keyof FaqTable)}
                </th>
              ))}
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentRequests.map((request, index) => (
              <tr key={request.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.Question}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-xs truncate"
                  title={request.Answer}>{request.Answer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${request.Status === "Active"
                      ? "bg-green-100 text-green-700"
                      : request.Status === "Hide"
                        ? "bg-[#FFEBD6] text-[#FF8000]"
                        : "bg-gray-100 text-gray-700"
                      }`}
                  >
                    {request.Status === "Hide" ? "Hidden" : request.Status}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                  <div ref={menuRef}>
                    <button
                      onClick={(e) => handleActionClick(request.id, e)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>

                    {selectedRow === request.id && (
                      <div className="absolute right-2 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                        <div className="py-1">

                          <button
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                            onClick={() => router.push(`/faq?id=${request.id}`)}
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

        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1 rounded-lg border border-gray-200 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
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

export default FaqTable;
