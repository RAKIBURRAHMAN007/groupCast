// components/layout/Sidebar.tsx
import {
  FaUsers,
  FaTasks,
  FaUser,
  FaBell,
  FaCog,
  FaTimes,
} from "react-icons/fa";

interface SidebarProps {
  activeSection: "groups" | "tasks";
  onSectionChange: (section: "groups" | "tasks") => void;
  onMobileMenuToggle?: () => void;
}

const Sidebar = ({
  activeSection,
  onSectionChange,
  onMobileMenuToggle,
}: SidebarProps) => {
  // Removed chat section from menu
  const menuItems = [
    { id: "groups" as const, icon: FaUsers, label: "Groups", badge: 3 },
    { id: "tasks" as const, icon: FaTasks, label: "Tasks", badge: 5 },
  ];

  const bottomMenuItems = [
    { id: "reminders", icon: FaBell, label: "Reminders" },
    { id: "profile", icon: FaUser, label: "Profile" },
    { id: "settings", icon: FaCog, label: "Settings" },
  ];

  return (
    <div className="lg:w-20 w-40 bg-gray-800 flex flex-col items-center py-6 space-y-8 h-full">
      {/* Mobile Header */}
      <div className="w-full flex items-center justify-between px-4 lg:hidden">
        <div className="w-10 h-10 bg-yellow-600 rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-sm">GC</span>
        </div>
        <button
          onClick={onMobileMenuToggle}
          className="text-gray-400 hover:text-white p-2"
        >
          <FaTimes size={20} />
        </button>
      </div>

      {/* Desktop Logo */}
      <div className="hidden lg:block">
        <div className="w-12 h-12 bg-yellow-600 rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-lg">GC</span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 flex flex-col space-y-6 w-full px-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                onSectionChange(item.id);
                if (onMobileMenuToggle) {
                  onMobileMenuToggle();
                }
              }}
              className={`relative w-full p-3 rounded-2xl transition-all duration-200 group ${
                isActive
                  ? "bg-yellow-600 text-white"
                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <Icon size={20} className="mx-auto" />

              {/* Badge */}
              {item.badge > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {item.badge > 9 ? "9+" : item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Navigation */}
      <div className="flex flex-col space-y-4 w-full px-2">
        {bottomMenuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              className="relative w-full p-3 rounded-2xl text-gray-400 hover:bg-gray-700 hover:text-white transition-all duration-200 group"
              onClick={onMobileMenuToggle}
            >
              <Icon size={20} className="mx-auto" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
