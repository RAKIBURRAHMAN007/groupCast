// components/layout/MainLayout.tsx
import { useState } from "react";
import Sidebar from "../SideBar/SideBar";
import GroupList from "../GroupList/GroupList";
import TaskList from "../TaskList/TaskList";
import ChatInterface from "../ChatInterface/ChatInterface";
import TaskDetails from "../TaskDetails/TaskDetails";

import { FaUsers, FaTasks, FaBars } from "react-icons/fa";
import Profile from "../Profile/Profile";
import Reminders from "../Reminder/Reminder";
import { Settings } from "lucide-react";

const MainLayout = () => {
  const [activeSection, setActiveSection] = useState<
    "groups" | "tasks" | "profile" | "reminders" | "settings"
  >("groups");
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSection = (
    section: "groups" | "tasks" | "profile" | "reminders" | "settings"
  ) => {
    setActiveSection(section);
    setSelectedGroup(null);
    setSelectedTask(null);
    setIsSidebarOpen(false);
  };

  const toggleGroupSelection = (groupId: string) => {
    setSelectedGroup(groupId);
    setSelectedTask(null);
    setActiveSection("groups");
  };

  const toggleTaskSelection = (taskId: string) => {
    setSelectedTask(taskId);
    setSelectedGroup(null);
    setActiveSection("tasks");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleBack = () => {
    setSelectedGroup(null);
    setSelectedTask(null);
  };

  // Bottom navigation items
  const bottomNavItems = [
    { id: "groups" as const, icon: FaUsers, label: "Groups" },
    { id: "tasks" as const, icon: FaTasks, label: "Tasks" },
  ];

  // Render right panel content based on active section
  const renderRightPanelContent = () => {
    const isManageSection = (
      ["profile", "reminders", "settings"] as string[]
    ).includes(activeSection);

    if (selectedGroup) {
      return <ChatInterface groupId={selectedGroup} onBack={toggleBack} />;
    } else if (selectedTask) {
      return <TaskDetails taskId={selectedTask} onBack={toggleBack} />;
    } else if (activeSection === "profile") {
      return <Profile />;
    } else if (activeSection === "reminders") {
      return <Reminders />;
    } else if (activeSection === "settings") {
      return <Settings />;
    } else {
      return (
        <div className="flex-1 flex items-center justify-center text-gray-400 p-8 text-center">
          <div className="max-w-md">
            <h3 className="text-xl font-semibold mb-2">Welcome to GroupCast</h3>
            <p className="text-gray-400 mb-4">
              {activeSection === "groups" && "Select a group to start chatting"}
              {activeSection === "tasks" && "Select a task to view details"}
              {isManageSection && "Manage your account and preferences"}
            </p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Left Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-50
        transform transition-transform duration-300 ease-in-out
        ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }
      `}
      >
        <Sidebar
          activeSection={activeSection}
          onSectionChange={toggleSection}
          onMobileMenuToggle={toggleSidebar}
        />
      </div>

      {/* Middle Panel - Groups/Tasks List */}
      <div
        className={`
        flex flex-col w-full lg:w-1/3 xl:w-1/4
        border-r border-gray-700 bg-gray-800
        transform transition-transform duration-300 ease-in-out
        ${
          !selectedGroup &&
          !selectedTask &&
          activeSection !== "profile" &&
          activeSection !== "reminders" &&
          activeSection !== "settings"
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }
        absolute lg:relative inset-y-0 left-0 z-40
        w-full lg:w-auto
      `}
      >
        {activeSection === "groups" && (
          <GroupList
            onGroupSelect={toggleGroupSelection}
            selectedGroup={selectedGroup}
          />
        )}
        {activeSection === "tasks" && (
          <TaskList
            onTaskSelect={toggleTaskSelection}
            selectedTask={selectedTask}
          />
        )}
        {(activeSection === "profile" ||
          activeSection === "reminders" ||
          activeSection === "settings") && (
          <div className="p-4 border-b border-gray-700 lg:hidden">
            <h1 className="text-xl font-semibold capitalize">
              {activeSection}
            </h1>
          </div>
        )}
      </div>

      {/* Right Panel - Chat Interface / Task Details / Profile / Reminders / Settings */}
      <div
        className={`
        flex-1 flex flex-col bg-gray-800
        ${
          selectedGroup ||
          selectedTask ||
          activeSection === "profile" ||
          activeSection === "reminders" ||
          activeSection === "settings"
            ? "flex"
            : "hidden lg:flex"
        }
      `}
      >
        {renderRightPanelContent()}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 z-50">
        <div className="flex justify-around items-center p-2">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => toggleSection(item.id)}
                className={`flex flex-col items-center p-2 rounded-lg transition-colors flex-1 mx-1 ${
                  isActive
                    ? "bg-yellow-600 text-white"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                <Icon size={20} />
                <span className="text-xs mt-1">{item.label}</span>
              </button>
            );
          })}

          {/* More Button */}
          <button
            onClick={toggleSidebar}
            className="flex flex-col items-center p-2 rounded-lg transition-colors flex-1 mx-1 text-gray-400 hover:text-gray-300"
          >
            <FaBars size={20} />
            <span className="text-xs mt-1">More</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
