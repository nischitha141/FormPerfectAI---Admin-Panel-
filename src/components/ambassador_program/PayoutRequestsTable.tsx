import React, { useState, useEffect, useRef } from 'react';
import { MoreVertical, Eye, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';
import ConfirmationDialog from './ConfirmationDialog';

interface PayoutRequest {
  id: string;
  ambassadorName: string;
  tierStatus: string;
  totalEarnings: number;
  requestedAmount: number;
  payoutMethod: string;
  requestedOn: string;
  status: string;
}

interface PayoutRequestsTableProps {
  requests: PayoutRequest[];
}

const PayoutRequestsTable: React.FC<PayoutRequestsTableProps> = ({ requests }) => {
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isSuspendDialogOpen, setIsSuspendDialogOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(requests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRequests = requests.slice(startIndex, endIndex);

  return (
    <div className="mt-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#FBFBFD]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ambassador</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tier Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Earnings</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payout Method</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested On</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentRequests.map((request) => (
              <tr key={request.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.ambassadorName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.tierStatus}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${request.totalEarnings}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${request.requestedAmount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.payoutMethod}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.requestedOn}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${request.status.toLowerCase() === 'pending' ? 'bg-amber-100 text-amber-800' :
                    request.status.toLowerCase() === 'approved' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                    {request.status}
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

                    {/* Action Menu */}
                    {selectedRow === request.id && (
                      <div className="fixed right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-[99999]">
                        <div className="py-1">
                          <button
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                            onClick={() => handleSuspendClick()}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </button>
                          {request.status.toLowerCase() === 'pending' ? (
                            <>
                              <button
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                                onClick={() => handleSuspendClick()}
                              >
                                <Check className="w-4 h-4 mr-2 text-[#079455]" />
                                <div className='text-[#079455]'>Approve</div>
                              </button>
                              <button
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                                onClick={() => handleSuspendClick()}
                              >
                                <X className="w-4 h-4 mr-2 text-[#D92D20]" />
                                <div className='text-[#D92D20]'>Reject</div>
                              </button>
                            </>
                          ) : null}

                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
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
          <span className="text-sm text-gray-600">List per page</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-1 rounded-lg border border-gray-200 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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
        title="Suspend Ambassador"
        message="Are you sure you want to suspend this ambassador? This action cannot be undone, and they will lose access to their referral dashboard."
        confirmButtonText="Suspend"
      />

    </div>
  );
};

export default PayoutRequestsTable; 