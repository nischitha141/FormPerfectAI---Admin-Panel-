import Image from 'next/image';
import SidebarItem from './sidebarItem';
import { menuItems } from './menuItem';

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-[#1F222A] border-r shadow-sm flex flex-col p-4">
      {/* Logo Section */}
      <div className="flex items-center gap-2 mb-6">
        <Image
          src="/logo.svg"
          alt="Formperfect AI logo"
          width={60}
          height={38}
          priority
        />
        <span className="text-lg font-semibold text-white">FormPerfect AI</span>
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item, idx) => (
          <SidebarItem key={idx} item={item} />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
