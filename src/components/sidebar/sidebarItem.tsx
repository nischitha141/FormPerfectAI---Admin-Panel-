// components/Sidebar/SidebarItem.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MenuItem } from './menuItem';

interface SidebarItemProps {
  item: MenuItem;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ item }) => {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <Link href={item.href}>
      <div className={`flex items-center gap-3 text-sm px-4 py-2 hover:bg-gray-700 rounded-md cursor-pointer transition ${
        isActive ? 'bg-[#35383F]' : ''
      }`}>
        <span className="text-gray-300">{item.icon}</span>
        <span className="text-white font-medium">{item.name}</span>
      </div>
    </Link>
  );
};

export default SidebarItem;