"use client";

import React, { useState, useRef, useEffect } from "react";
import { Calendar } from "lucide-react";
import Image from "next/image";

interface SubscriptionHistoryEntry {
  action: string;
  date: string;
  oldPlan: string;
  newPlan: string;
  status: string;
  newPlanRank: number;
  oldPlanRank: number | null;
}

interface SubscriptionHistoryTableProps {
  subscriptionData: SubscriptionHistoryEntry[];
  onDateRangeFilter: (startDate: string, endDate: string) => void;
}

const SubscriptionHistoryTable: React.FC<SubscriptionHistoryTableProps> = ({
  subscriptionData,
  onDateRangeFilter,
}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  };

  const handleApplyFilter = () => {
    if (startDate && endDate) {
      onDateRangeFilter(startDate, endDate);
      setShowDatePicker(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusLower = status.toLowerCase();
    const badgeClasses = "px-2 py-1 text-xs font-medium rounded-full ";

    switch (statusLower) {
      case "confirmed":
        return badgeClasses + "bg-green-100 text-green-800";
      case "pending":
        return badgeClasses + "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return badgeClasses + "bg-red-100 text-red-800";
      default:
        // return badgeClasses + "bg-gray-100 text-gray-800";
        return badgeClasses + "bg-green-100 text-green-800";
    }
  };

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-");
  };

  return (
    <div className="space-y-6">
      {/* Header with Date Range Filter */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 font-urbanist">
          Subscription Upgrade/Downgrade History
        </h3>

        <div className="flex items-center gap-3">
          {/* Select Dates Button */}
          <div className="relative" ref={datePickerRef}>
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="cursor-pointer flex items-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors min-w-36"
            >
              <Calendar className="w-5 h-5 text-gray-400" />
              <span>Select dates</span>
            </button>

            {/* Date Picker Dropdown */}
            {showDatePicker && (
              <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-20 min-w-80">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1 ">
                        From
                      </label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full cursor-pointer border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {startDate && (
                        <div className="text-xs text-gray-500 mt-1">
                          {formatDisplayDate(startDate)}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        To
                      </label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min={startDate}
                        className="w-full cursor-pointer border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {endDate && (
                        <div className="text-xs text-gray-500 mt-1">
                          {formatDisplayDate(endDate)}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t">
                    <button
                      onClick={() => {
                        setStartDate("");
                        setEndDate("");
                      }}
                      className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
                    >
                      Clear
                    </button>
                    <button
                      onClick={handleApplyFilter}
                      disabled={!startDate || !endDate}
                      className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md cursor-pointer hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Apply Filter Button */}
          <button
            onClick={handleApplyFilter}
            disabled={!startDate || !endDate}
            className=" cursor-pointer flex items-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors min-w-32"
          >
            {/* <Filter className="w-5 h-5 text-gray-400" /> */}

            <Image
              src="/apply_filter.svg"
              alt="Google"
              width={20}
              height={20}
            />
            <span>Apply filter</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white  overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Old Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  New Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subscriptionData.map((entry, index) => (
                <tr key={index} className="hover:bg-gray-50 font-[400]">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-urbanist font-[400]">
                    {formatDate(entry.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-urbanist font-[400]">
                    {entry.action}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-urbanist font-[400]">
                    {entry.oldPlan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-urbanist font-[400]">
                    {entry.newPlan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-urbanist font-[400]">
                    {entry.action === "Upgrade"
                      ? "Upgrade to Premium Plan"
                      : entry.action === "Downgrade"
                      ? "Switch to a lower plan"
                      : "Eligible for Upgrade"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-[400]">
                    <span className={getStatusBadge(entry.status)}>
                      {entry.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {subscriptionData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm font-urbanist">
              No subscription history found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionHistoryTable;
