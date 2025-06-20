'use client';

import React from 'react';
import { Search } from 'lucide-react';

type TableHeaderProps = {
  title: string;
  addNewWorkOut?: boolean,
  searchQuery?: string;
  setSearchQuery?: (value: string) => void;
  filterType?: string;
  setFilterType?: (value: string) => void;
  addFaq?: boolean,

};

const TableHeader: React.FC<TableHeaderProps> = ({ title, addFaq = false, addNewWorkOut = false, searchQuery, setSearchQuery, filterType, setFilterType }) => {
  return (
    <div className="space-y-4">
      {/* Header with Download */}
      {title && (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            {/* <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
          <Download className="w-4 h-4" />
          <span>Download Reports</span>
        </button> */}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200" />
        </>
      )}



      {/* Filters Section */}
      <div className="flex flex-col md:flex-row gap-4 bg-[#FBFBFD] p-4 rounded-lg">
        {/* Search Bar */}
        <div className="w-full md:w-[40%]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            {addNewWorkOut ? (
              setSearchQuery ? (
                <input
                  type="text"
                  placeholder="Search by Workout Name, Type..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              ) : null
            ) : addFaq ? (
              setSearchQuery ? (
                <input
                  type="text"
                  placeholder="Search by Name, Type..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              ) : null
            ) : (
              <input
                type="text"
                placeholder="Search ambassadors..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            )}


          </div>
        </div>

        {/* Spacer to push filters to the right */}
        <div className="flex-1" />

        {/* Right-aligned filters */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Filter Status Dropdown */}
          <div className="w-full md:w-48">
            {addNewWorkOut && setFilterType ? (
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Filter Status</option>
                <option value="Strength">Strength</option>
                <option value="Flexibility">Flexibility</option>
                <option value="Cardio">Cardio</option>
                <option value="Muscle_Gain">Muscle Gain</option>
                <option value="Weight_Loss">Weight Loss</option>
                <option value="Yoga">Yoga</option>
              </select>
            ) : addFaq && setFilterType ? (
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Filter Status</option>
                <option value="active">Active</option>
                <option value="hidden">Hidden</option>
              </select>
            ) : (
              <select
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Filter Status</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="pending">Pending</option>
              </select>
            )}


          </div>

          {/* Date Range Picker */}
          {!addNewWorkOut && !addFaq && (
            <div className="w-full md:w-48">
              <input
                type="text"
                placeholder="Select Date Range"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onClick={() => {/* Date picker dialog will be implemented here */ }}
              />
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default TableHeader; 