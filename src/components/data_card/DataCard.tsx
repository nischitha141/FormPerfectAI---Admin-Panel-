'use client';

import React from 'react';

interface DataCardProps {
  title: string;
  value: string | number;
}

const DataCard: React.FC<DataCardProps> = ({ title, value }) => {
  return (
    <div className="bg-white rounded-[6px] p-4 shadow-sm inline-flex flex-col">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-lg font-[700] mt-1">{value}</p>
    </div>
  );
};

export default DataCard; 