import React from 'react';

const UserPayoutDetails = () => {
  return (
    <div className="p-5 flex gap-4 items-stretch">
      {/* Requested Payout Amount */}
      <div className="border border-gray-300 rounded-lg flex flex-col w-1/3">
        <div className="flex items-center justify-between border-b border-gray-300 p-4 flex-grow">
          <p className="font-semibold text-gray-800">Requested Payout Amount</p>
          <p className="text-gray-900 font-semibold text-3xl">$10</p>
        </div>
        <div className="p-4 flex justify-between gap-2">
          <button className="bg-white border-2 border-red-500 text-red-500 px-8 py-3 rounded-lg flex items-center justify-center w-full hover:bg-red-50">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-lg">Reject</span>
          </button>
          <button className="bg-white border-2 border-green-500 text-green-500 px-8 py-3 rounded-lg flex items-center justify-center w-full hover:bg-green-50">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-lg">Approve</span>
          </button>
        </div>
      </div>

      {/* Payment Method */}
      <div className="border border-gray-300 rounded-lg flex flex-col w-1/3">
        <div className="p-4 h-full flex flex-col justify-between">
          <p className="font-semibold text-gray-800 mb-4">Payment method</p>
          <div className="border border-gray-200 rounded-md p-4 flex-grow flex items-center">
            <div className="flex items-center">
              <div className="bg-blue-50 p-2 rounded-md mr-3">
                <p className="text-blue-600 font-bold">PayPal</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Available Balance */}
      <div className="border border-gray-300 rounded-lg flex flex-col w-1/3">
        <div className="p-4 h-full flex flex-col justify-between">
          <p className="font-semibold text-gray-800">Available Balance</p>
          <p className="text-gray-900 font-semibold text-3xl mt-2">$5,120</p>
        </div>
      </div>
    </div>
  );
};

export default UserPayoutDetails;