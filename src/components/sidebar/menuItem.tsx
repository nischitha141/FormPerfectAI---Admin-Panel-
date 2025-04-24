// components/Sidebar/menuItems.ts

import { Home, Users, Settings, DollarSign, Users2 } from 'lucide-react';

export type MenuItem = {
  name: string;
  icon: React.ReactNode;
  href: string;
};

export const menuItems: MenuItem[] = [
  { name: 'Dashboard', icon: <Home size={18} />, href: '/dashboard' },
  { name: 'Ambassador Program', icon: <Users2 size={18} />, href: '/ambassador-program' },
  { name: 'Payout Requests', icon: <DollarSign size={18} />, href: '/payouts' },
  { name: 'Users', icon: <Users size={18} />, href: '/users' },
  { name: 'Settings', icon: <Settings size={18} />, href: '/settings' },
];
