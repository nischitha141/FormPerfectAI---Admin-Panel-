import React, { useState, useEffect, useRef } from 'react';
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

interface FaqTable {
  id: string;
  Order: string;
  Question: string;
  AnswerPreview: string;
  Status: string;

}

interface FaqTableProps {
  requests: FaqTable[];
  searchQuery: string;
  filterType: string;
}

const FaqTable: React.FC<FaqTableProps> = ({ requests, searchQuery, filterType }) => {
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isSuspendDialogOpen, setIsSuspendDialogOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const [sortConfig, setSortConfig] = useState<{ key: keyof FaqTable; direction: 'asc' | 'desc' } | null>(null);

  const handleActionClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedRow(selectedRow === id ? null : id);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setSelectedRow(null);
    }
  };

  const handleSuspendClick = () => {
    setIsSuspendDialogOpen(true);
    setSelectedRow(null);
  };

  const handleSuspendConfirm = () => {
    // TODO: Implement suspend logic here
    setIsSuspendDialogOpen(false);
  };

  const handleDialogClose = () => {
    setIsSuspendDialogOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setCurrentPage(1); // Reset page on filter/search
  }, [searchQuery, filterType]);
  const filteredRequests = requests.filter((request) => {
    const query = searchQuery?.toLowerCase() || '';
    const filter = filterType || '';

    const matchesSearch =
      request.AnswerPreview.toLowerCase().includes(query) ||
      request.Order.toLowerCase().includes(query) ||
      request.Question.toLowerCase().includes(query) ||
      request.Status.toLowerCase().includes(query)


    const matchesFilter = filter === '' || request.Status === filter;

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

  const totalPages = Math.ceil(sortedRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRequests = filteredRequests.slice(startIndex, startIndex + itemsPerPage);

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
    if (sortConfig?.key !== key) return null;
    return sortConfig.direction === 'asc' ? (
      <ChevronUp className="inline w-3 h-3 ml-1" />
    ) : (
      <ChevronDown className="inline w-3 h-3 ml-1" />
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
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
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
            {currentRequests.map((request) => (
              <tr key={request.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.Order}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.Question}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.AnswerPreview}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${request.Status === "Active"
                        ? "bg-green-100 text-green-700"
                        : request.Status === "Hidden"
                          ? "bg-[#FFEBD6] text-[#FF8000]"
                          : "bg-gray-100 text-gray-700"
                      }`}
                  >
                    {request.Status}
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
                            onClick={() => alert('Edit clicked')}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </button>
                          <button
                            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full"
                            onClick={() => handleSuspendClick()}
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
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
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
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-1 rounded-lg border border-gray-200 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
