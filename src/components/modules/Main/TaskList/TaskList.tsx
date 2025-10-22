// components/tasks/TaskList.tsx
import { useState } from "react";
import {
  FaSearch,
  FaPlus,
  FaFilter,
  FaCheckCircle,
  FaClock,
  FaExclamationCircle,
  FaUser,
  FaBars,
  FaEllipsisV,
  FaEdit,
  FaTrash,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  assigneeAvatar: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "completed";
  group: string;
  groupId: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

interface TaskListProps {
  onTaskSelect: (taskId: string) => void;
  selectedTask: string | null;
}

const TaskList = ({ onTaskSelect, selectedTask }: TaskListProps) => {
  const [filter, setFilter] = useState<
    "all" | "todo" | "in-progress" | "completed"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<
    "dueDate" | "priority" | "createdAt" | "title"
  >("dueDate");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedPriority, setSelectedPriority] = useState<
    "all" | "high" | "medium" | "low"
  >("all");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showPriorityMenu, setShowPriorityMenu] = useState(false);

  // Mock data - replace with actual API call
  const tasks: Task[] = [
    {
      id: "1",
      title: "Implement user authentication",
      description:
        "Set up Firebase auth with email and Google providers including secure password reset",
      assignee: "You",
      assigneeAvatar: "Y",
      dueDate: "2024-12-15",
      priority: "high",
      status: "in-progress",
      group: "Development Team",
      groupId: "1",
      createdAt: "2024-12-01",
      updatedAt: "2024-12-05",
      tags: ["Authentication", "Security", "Frontend"],
    },
    {
      id: "2",
      title: "Design landing page",
      description:
        "Create modern landing page with Tailwind CSS and responsive design",
      assignee: "Alice Johnson",
      assigneeAvatar: "A",
      dueDate: "2024-12-20",
      priority: "medium",
      status: "todo",
      group: "Design Team",
      groupId: "2",
      createdAt: "2024-12-02",
      updatedAt: "2024-12-02",
      tags: ["UI/UX", "Frontend", "Design"],
    },
    {
      id: "3",
      title: "Setup database schema",
      description:
        "Design and implement MongoDB collections with proper indexing",
      assignee: "Bob Smith",
      assigneeAvatar: "B",
      dueDate: "2024-12-10",
      priority: "high",
      status: "completed",
      group: "Development Team",
      groupId: "1",
      createdAt: "2024-11-28",
      updatedAt: "2024-12-08",
      tags: ["Database", "Backend"],
    },
    {
      id: "4",
      title: "Write API documentation",
      description:
        "Document all REST API endpoints with examples and error codes",
      assignee: "You",
      assigneeAvatar: "Y",
      dueDate: "2024-12-18",
      priority: "low",
      status: "todo",
      group: "Development Team",
      groupId: "1",
      createdAt: "2024-12-03",
      updatedAt: "2024-12-03",
      tags: ["Documentation", "API"],
    },
    {
      id: "5",
      title: "Fix mobile responsiveness",
      description: "Ensure all components work perfectly on mobile devices",
      assignee: "You",
      assigneeAvatar: "Y",
      dueDate: "2024-12-12",
      priority: "medium",
      status: "in-progress",
      group: "Development Team",
      groupId: "1",
      createdAt: "2024-12-04",
      updatedAt: "2024-12-06",
      tags: ["Mobile", "Responsive", "Frontend"],
    },
    {
      id: "6",
      title: "Setup CI/CD pipeline",
      description:
        "Configure GitHub Actions for automated testing and deployment",
      assignee: "Charlie Brown",
      assigneeAvatar: "C",
      dueDate: "2024-12-25",
      priority: "high",
      status: "todo",
      group: "DevOps Team",
      groupId: "3",
      createdAt: "2024-12-05",
      updatedAt: "2024-12-05",
      tags: ["DevOps", "CI/CD", "Automation"],
    },
  ];

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter = filter === "all" || task.status === filter;
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesPriority =
      selectedPriority === "all" || task.priority === selectedPriority;

    return matchesFilter && matchesSearch && matchesPriority;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    let aValue: any, bValue: any;

    switch (sortBy) {
      case "dueDate":
        aValue = new Date(a.dueDate);
        bValue = new Date(b.dueDate);
        break;
      case "priority":
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        aValue = priorityOrder[a.priority];
        bValue = priorityOrder[b.priority];
        break;
      case "createdAt":
        aValue = new Date(a.createdAt);
        bValue = new Date(b.createdAt);
        break;
      case "title":
        aValue = a.title.toLowerCase();
        bValue = b.title.toLowerCase();
        break;
      default:
        return 0;
    }

    if (sortOrder === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const getPriorityIcon = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return <FaExclamationCircle className="text-red-500" size={14} />;
      case "medium":
        return <FaClock className="text-yellow-500" size={14} />;
      case "low":
        return <FaCheckCircle className="text-green-500" size={14} />;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: Task["status"]) => {
    switch (status) {
      case "completed":
        return <FaCheckCircle className="text-green-500" size={14} />;
      case "in-progress":
        return <FaClock className="text-yellow-500" size={14} />;
      case "todo":
        return <FaExclamationCircle className="text-gray-400" size={14} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "completed":
        return "text-green-400 bg-green-900 bg-opacity-30";
      case "in-progress":
        return "text-yellow-400 bg-yellow-900 bg-opacity-30";
      case "todo":
        return "text-gray-400 bg-gray-700 bg-opacity-30";
      default:
        return "text-gray-400 bg-gray-700 bg-opacity-30";
    }
  };

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "text-red-400 bg-red-900 bg-opacity-30";
      case "medium":
        return "text-yellow-400 bg-yellow-900 bg-opacity-30";
      case "low":
        return "text-green-400 bg-green-900 bg-opacity-30";
      default:
        return "text-gray-400 bg-gray-700 bg-opacity-30";
    }
  };

  const formatDueDate = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays === -1) return "Yesterday";
    if (diffDays < 0) return `${Math.abs(diffDays)}d ago`;
    if (diffDays < 7) return `${diffDays}d`;

    return due.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  const handleSort = (
    field: "dueDate" | "priority" | "createdAt" | "title"
  ) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
    setShowSortMenu(false);
  };

  const getSortIcon = (field: string) => {
    if (sortBy !== field) return null;
    return sortOrder === "asc" ? (
      <FaArrowUp size={10} />
    ) : (
      <FaArrowDown size={10} />
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-800">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Tasks</h2>
            <p className="text-gray-400 text-sm">Manage your team tasks</p>
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
            placeholder="Search tasks, descriptions, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-700 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
      </div>

      {/* Filter and Sort Controls */}
      <div className="p-4 border-b border-gray-700 space-y-3">
        {/* Status Filter Buttons */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {(["all", "todo", "in-progress", "completed"] as const).map(
            (filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${
                  filter === filterType
                    ? "bg-yellow-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {getStatusIcon(filterType === "all" ? "todo" : filterType)}
                {filterType.charAt(0).toUpperCase() +
                  filterType.slice(1).replace("-", " ")}
              </button>
            )
          )}
        </div>

        {/* Priority and Sort Controls */}
        <div className="flex gap-2">
          {/* Priority Filter */}
          <div className="relative flex-1">
            <button
              onClick={() => setShowPriorityMenu(!showPriorityMenu)}
              className="w-full bg-gray-700 text-gray-300 px-3 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-between text-sm"
            >
              <span>
                Priority:{" "}
                {selectedPriority === "all"
                  ? "All"
                  : selectedPriority.charAt(0).toUpperCase() +
                    selectedPriority.slice(1)}
              </span>
              <FaFilter size={12} />
            </button>

            {showPriorityMenu && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-lg z-10">
                {(["all", "high", "medium", "low"] as const).map((priority) => (
                  <button
                    key={priority}
                    onClick={() => {
                      setSelectedPriority(priority);
                      setShowPriorityMenu(false);
                    }}
                    className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-600 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                      selectedPriority === priority
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    {priority === "all"
                      ? "All Priorities"
                      : `${
                          priority.charAt(0).toUpperCase() + priority.slice(1)
                        } Priority`}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sort Button */}
          <div className="relative">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="bg-gray-700 text-gray-300 px-3 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2 text-sm whitespace-nowrap"
            >
              <span>Sort</span>
              <FaEllipsisV size={12} />
            </button>

            {showSortMenu && (
              <div className="absolute top-full right-0 mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-lg z-10 min-w-32">
                <button
                  onClick={() => handleSort("dueDate")}
                  className="w-full px-3 py-2 text-sm text-left hover:bg-gray-600 transition-colors first:rounded-t-lg flex items-center justify-between"
                >
                  <span>Due Date</span>
                  {getSortIcon("dueDate")}
                </button>
                <button
                  onClick={() => handleSort("priority")}
                  className="w-full px-3 py-2 text-sm text-left hover:bg-gray-600 transition-colors flex items-center justify-between"
                >
                  <span>Priority</span>
                  {getSortIcon("priority")}
                </button>
                <button
                  onClick={() => handleSort("title")}
                  className="w-full px-3 py-2 text-sm text-left hover:bg-gray-600 transition-colors flex items-center justify-between"
                >
                  <span>Title</span>
                  {getSortIcon("title")}
                </button>
                <button
                  onClick={() => handleSort("createdAt")}
                  className="w-full px-3 py-2 text-sm text-left hover:bg-gray-600 transition-colors last:rounded-b-lg flex items-center justify-between"
                >
                  <span>Created</span>
                  {getSortIcon("createdAt")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Task Button */}
      <div className="p-4 border-b border-gray-700">
        <button className="w-full bg-yellow-600 text-white py-3 px-4 rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center gap-2 text-sm md:text-base font-semibold">
          <FaPlus size={16} />
          Create New Task
        </button>
      </div>

      {/* Tasks List */}
      <div className="flex-1 overflow-y-auto">
        {sortedTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-gray-400 p-8 text-center">
            <FaFilter size={32} className="mb-3 opacity-50" />
            <p className="text-lg font-medium mb-2">No tasks found</p>
            <p className="text-sm text-gray-500">
              {searchTerm || filter !== "all" || selectedPriority !== "all"
                ? "Try adjusting your search or filters"
                : "Create your first task to get started"}
            </p>
          </div>
        ) : (
          sortedTasks.map((task) => (
            <div
              key={task.id}
              onClick={() => onTaskSelect(task.id)}
              className={`p-4 border-b border-gray-700 cursor-pointer transition-all hover:bg-gray-750 active:bg-gray-700 group ${
                selectedTask === task.id
                  ? "bg-gray-750 border-l-4 border-l-yellow-600"
                  : ""
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {getStatusIcon(task.status)}
                  <h3 className="font-semibold text-white text-sm md:text-base truncate flex-1">
                    {task.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  {getPriorityIcon(task.priority)}
                  <button
                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white transition-all p-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle task actions
                    }}
                  >
                    <FaEllipsisV size={12} />
                  </button>
                </div>
              </div>

              <p className="text-gray-400 text-sm mb-3 line-clamp-2 leading-relaxed">
                {task.description}
              </p>

              {/* Tags */}
              {task.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {task.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {task.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded-full">
                      +{task.tags.length - 3}
                    </span>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs flex-wrap">
                  {/* Assignee */}
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-semibold">
                        {task.assigneeAvatar}
                      </span>
                    </div>
                    <span className="text-gray-400 whitespace-nowrap">
                      {task.assignee}
                    </span>
                  </div>

                  {/* Group */}
                  <span className="text-gray-500 hidden sm:inline">•</span>
                  <span className="text-gray-400 text-xs hidden sm:inline">
                    {task.group}
                  </span>
                </div>

                {/* Due Date */}
                <div
                  className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                    isOverdue(task.dueDate) && task.status !== "completed"
                      ? "text-red-400 bg-red-900 bg-opacity-30"
                      : "text-gray-400 bg-gray-700 bg-opacity-30"
                  }`}
                >
                  {formatDueDate(task.dueDate)}
                </div>
              </div>

              {/* Status and Priority Badges */}
              <div className="flex justify-between items-center mt-3">
                <div className="flex gap-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      task.status
                    )}`}
                  >
                    {task.status.replace("-", " ").toUpperCase()}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority.toUpperCase()}
                  </span>
                </div>

                {/* Updated Date */}
                <span className="text-gray-500 text-xs whitespace-nowrap">
                  Updated {formatDueDate(task.updatedAt)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Stats Footer */}
      <div className="p-4 border-t border-gray-700 bg-gray-750">
        <div className="flex justify-between text-xs text-gray-400 flex-wrap gap-2">
          <span>Total: {tasks.length}</span>
          <span>
            Completed: {tasks.filter((t) => t.status === "completed").length}
          </span>
          <span>
            In Progress:{" "}
            {tasks.filter((t) => t.status === "in-progress").length}
          </span>
          <span>Todo: {tasks.filter((t) => t.status === "todo").length}</span>
          <span>Showing: {sortedTasks.length}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
