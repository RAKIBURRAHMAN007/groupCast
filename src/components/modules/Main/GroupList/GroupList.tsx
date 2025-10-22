// components/groups/GroupList.tsx
import { FaSearch, FaPlus, FaLock, FaUsers, FaBars } from "react-icons/fa";

interface Group {
  id: string;
  name: string;
  description: string;
  members: number;
  unread: number;
  lastMessage: string;
  lastMessageTime: string;
  isPrivate: boolean;
}

interface GroupListProps {
  onGroupSelect: (groupId: string) => void;
  selectedGroup: string | null;
}

const GroupList = ({ onGroupSelect, selectedGroup }: GroupListProps) => {
  // Mock data
  const groups: Group[] = [
    {
      id: "1",
      name: "Development Team",
      description: "Frontend and backend discussions",
      members: 8,
      unread: 3,
      lastMessage: "Hey, did you finish the task?",
      lastMessageTime: "2:30 PM",
      isPrivate: false,
    },
    {
      id: "2",
      name: "Design Team",
      description: "UI/UX design discussions",
      members: 5,
      unread: 0,
      lastMessage: "New design assets uploaded",
      lastMessageTime: "1:15 PM",
      isPrivate: false,
    },
    // ... more groups
  ];

  return (
    <div className="flex-1 flex flex-col bg-gray-800">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Groups</h2>
            <p className="text-gray-400 text-sm">Your team workspaces</p>
          </div>
          <button className="md:hidden text-gray-400 hover:text-white p-2">
            <FaBars size={16} />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b border-gray-700">
        <div className="relative">
          <FaSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Search groups..."
            className="w-full bg-gray-700 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
      </div>

      {/* Create Group Button */}
      <div className="p-4 border-b border-gray-700">
        <button className="w-full bg-yellow-600 text-white py-3 px-4 rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center gap-2 text-sm md:text-base">
          <FaPlus size={16} />
          Create New Group
        </button>
      </div>

      {/* Groups List */}
      <div className="flex-1 overflow-y-auto">
        {groups.map((group) => (
          <div
            key={group.id}
            onClick={() => onGroupSelect(group.id)}
            className={`p-4 border-b border-gray-700 cursor-pointer transition-colors hover:bg-gray-750 active:bg-gray-700 ${
              selectedGroup === group.id
                ? "bg-gray-750 border-l-4 border-l-yellow-600"
                : ""
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FaUsers className="text-white" size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white text-sm truncate">
                      {group.name}
                    </h3>
                    {group.isPrivate && (
                      <FaLock
                        className="text-gray-400 flex-shrink-0"
                        size={12}
                      />
                    )}
                  </div>
                  <p className="text-gray-400 text-xs truncate">
                    {group.description}
                  </p>
                </div>
              </div>

              {/* Unread badge */}
              {group.unread > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 ml-2">
                  {group.unread}
                </span>
              )}
            </div>

            {/* Last message and time */}
            <div className="flex justify-between items-center mt-2">
              <p className="text-gray-400 text-sm truncate flex-1 mr-2">
                {group.lastMessage}
              </p>
              <span className="text-gray-500 text-xs whitespace-nowrap flex-shrink-0">
                {group.lastMessageTime}
              </span>
            </div>

            {/* Members count */}
            <div className="flex items-center gap-1 mt-2">
              <FaUsers className="text-gray-400" size={10} />
              <span className="text-gray-400 text-xs">
                {group.members} members
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupList;
