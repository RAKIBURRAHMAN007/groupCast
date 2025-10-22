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
  activeSection: "groups" | "tasks" | "profile" | "reminders" | "settings";
  onSectionChange: (
    section: "groups" | "tasks" | "profile" | "reminders" | "settings"
  ) => void;
  onMobileMenuToggle?: () => void;
}

const Sidebar = ({
  activeSection,
  onSectionChange,
  onMobileMenuToggle,
}: SidebarProps) => {
  const menuItems = [
    { id: "groups" as const, icon: FaUsers, label: "Groups", badge: 3 },
    { id: "tasks" as const, icon: FaTasks, label: "Tasks", badge: 5 },
  ];

  const bottomMenuItems = [
    { id: "reminders" as const, icon: FaBell, label: "Reminders" },
    { id: "profile" as const, icon: FaUser, label: "Profile" },
    { id: "settings" as const, icon: FaCog, label: "Settings" },
  ];

  const handleItemClick = (
    section: "groups" | "tasks" | "profile" | "reminders" | "settings"
  ) => {
    onSectionChange(section);
    if (onMobileMenuToggle) {
      onMobileMenuToggle();
    }
  };

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
              onClick={() => handleItemClick(item.id)}
              className={`relative w-full p-3 rounded-2xl transition-all duration-200 group ${
                isActive
                  ? "bg-yellow-600 text-white"
                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <Icon size={20} className="mx-auto" />
              {item.badge > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {item.badge > 9 ? "9+" : item.badge}
                </span>
              )}
              <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 hidden lg:block">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bottom Navigation */}
      <div className="flex flex-col space-y-4 w-full px-2">
        {bottomMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`relative w-full p-3 rounded-2xl transition-all duration-200 group ${
                isActive
                  ? "bg-yellow-600 text-white"
                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <Icon size={20} className="mx-auto" />
              <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 hidden lg:block">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
