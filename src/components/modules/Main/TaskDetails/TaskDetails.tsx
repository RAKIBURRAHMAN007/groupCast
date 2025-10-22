// components/tasks/TaskDetails.tsx
import {
  FaArrowLeft,
  FaEdit,
  FaTrash,
  FaUser,
  FaCalendar,
  FaFlag,
  FaCheckCircle,
  FaPaperclip,
  FaComment,
} from "react-icons/fa";

interface TaskDetailsProps {
  taskId: string;
  onBack?: () => void;
}

const TaskDetails = ({ taskId, onBack }: TaskDetailsProps) => {
  // Mock data - replace with actual API call
  const task = {
    id: "1",
    title: "Implement user authentication",
    description:
      "Set up Firebase authentication with email/password and Google providers. Include proper error handling and validation. Make sure to implement secure password reset functionality and email verification.",
    assignee: "You",
    assigneeAvatar: "Y",
    dueDate: "2024-12-15",
    priority: "high",
    status: "in-progress",
    group: "Development Team",
    createdAt: "2024-12-01",
    updatedAt: "2024-12-05",
    attachments: [
      { id: "1", name: "auth_diagram.pdf", size: "2.4 MB", type: "pdf" },
      { id: "2", name: "api_specs.docx", size: "1.1 MB", type: "document" },
    ],
    subtasks: [
      { id: "1", title: "Setup Firebase project", completed: true },
      { id: "2", title: "Implement email/password auth", completed: true },
      { id: "3", title: "Add Google OAuth provider", completed: false },
      { id: "4", title: "Write authentication tests", completed: false },
      { id: "5", title: "Document authentication flow", completed: false },
    ],
    comments: [
      {
        id: "1",
        user: "Alice Johnson",
        avatar: "A",
        text: "Make sure to include password reset functionality and proper error messages for failed login attempts.",
        timestamp: "2024-12-02 14:30",
      },
      {
        id: "2",
        user: "You",
        avatar: "Y",
        text: "Working on Google OAuth integration now. The Firebase setup is complete and working well.",
        timestamp: "2024-12-05 10:15",
      },
      {
        id: "3",
        user: "Bob Smith",
        avatar: "B",
        text: "Great progress! Once authentication is done, we can start working on the user profile section.",
        timestamp: "2024-12-05 11:45",
      },
    ],
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500 bg-red-900 bg-opacity-30";
      case "medium":
        return "text-yellow-500 bg-yellow-900 bg-opacity-30";
      case "low":
        return "text-green-500 bg-green-900 bg-opacity-30";
      default:
        return "text-gray-500 bg-gray-700 bg-opacity-30";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-500 bg-green-900 bg-opacity-30";
      case "in-progress":
        return "text-yellow-500 bg-yellow-900 bg-opacity-30";
      case "todo":
        return "text-gray-500 bg-gray-700 bg-opacity-30";
      default:
        return "text-gray-500 bg-gray-700 bg-opacity-30";
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return "📄";
      case "document":
        return "📝";
      case "image":
        return "🖼️";
      case "spreadsheet":
        return "📊";
      default:
        return "📎";
    }
  };

  const progress =
    (task.subtasks.filter((st) => st.completed).length / task.subtasks.length) *
    100;

  return (
    <div className="flex-1 flex flex-col bg-gray-800 h-full">
      {/* Header */}
      <div className="bg-gray-750 px-4 md:px-6 py-3 md:py-4 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {onBack && (
            <button
              onClick={onBack}
              className="text-gray-400 hover:text-white transition-colors flex-shrink-0 md:hidden"
            >
              <FaArrowLeft size={18} />
            </button>
          )}
          <div className="flex-1 min-w-0">
            <h2 className="text-lg md:text-xl font-bold text-white truncate">
              Task Details
            </h2>
            <p className="text-gray-400 text-xs md:text-sm truncate">
              Manage and track task progress
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          <button
            className="text-gray-400 hover:text-yellow-500 transition-colors p-2"
            title="Edit Task"
          >
            <FaEdit size={16} />
          </button>
          <button
            className="text-gray-400 hover:text-red-500 transition-colors p-2"
            title="Delete Task"
          >
            <FaTrash size={16} />
          </button>
        </div>
      </div>

      {/* Task Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white mb-3">
              {task.title}
            </h1>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              {task.description}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="bg-gray-750 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400 text-sm">Progress</span>
              <span className="text-white text-sm font-medium">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-yellow-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-gray-400 text-xs mt-2">
              {task.subtasks.filter((st) => st.completed).length} of{" "}
              {task.subtasks.length} subtasks completed
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-750 rounded-lg">
              <FaUser className="text-gray-400 flex-shrink-0" size={16} />
              <div className="min-w-0">
                <p className="text-gray-400 text-xs md:text-sm">Assignee</p>
                <p className="text-white font-medium text-sm md:text-base truncate">
                  {task.assignee}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-750 rounded-lg">
              <FaCalendar className="text-gray-400 flex-shrink-0" size={16} />
              <div className="min-w-0">
                <p className="text-gray-400 text-xs md:text-sm">Due Date</p>
                <p className="text-white font-medium text-sm md:text-base">
                  {new Date(task.dueDate).toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-750 rounded-lg">
              <FaFlag className="text-gray-400 flex-shrink-0" size={16} />
              <div className="min-w-0">
                <p className="text-gray-400 text-xs md:text-sm">Priority</p>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                    task.priority
                  )}`}
                >
                  {task.priority.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-750 rounded-lg">
              <FaCheckCircle
                className="text-gray-400 flex-shrink-0"
                size={16}
              />
              <div className="min-w-0">
                <p className="text-gray-400 text-xs md:text-sm">Status</p>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    task.status
                  )}`}
                >
                  {task.status.replace("-", " ").toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Group Info */}
          <div className="flex items-center gap-3 p-3 bg-gray-750 rounded-lg">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-semibold">G</span>
            </div>
            <div>
              <p className="text-gray-400 text-xs md:text-sm">Group</p>
              <p className="text-white font-medium text-sm md:text-base">
                {task.group}
              </p>
            </div>
          </div>
        </div>

        {/* Subtasks */}
        <div className="bg-gray-750 rounded-lg p-4 md:p-5">
          <h3 className="text-lg font-semibold text-white mb-4">Subtasks</h3>
          <div className="space-y-2">
            {task.subtasks.map((subtask) => (
              <div
                key={subtask.id}
                className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={subtask.completed}
                  onChange={() => {}}
                  className="w-4 h-4 text-yellow-600 bg-gray-600 border-gray-500 rounded focus:ring-yellow-500 focus:ring-2"
                />
                <span
                  className={`flex-1 text-sm md:text-base ${
                    subtask.completed
                      ? "text-gray-400 line-through"
                      : "text-white"
                  }`}
                >
                  {subtask.title}
                </span>
                {subtask.completed && (
                  <FaCheckCircle
                    className="text-green-500 flex-shrink-0"
                    size={14}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Attachments */}
        {task.attachments.length > 0 && (
          <div className="bg-gray-750 rounded-lg p-4 md:p-5">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <FaPaperclip size={16} />
              Attachments
            </h3>
            <div className="space-y-2">
              {task.attachments.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
                >
                  <span className="text-xl">{getFileIcon(file.type)}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm md:text-base truncate">
                      {file.name}
                    </p>
                    <p className="text-gray-400 text-xs">{file.size}</p>
                  </div>
                  <button className="text-gray-400 hover:text-white transition-colors p-1">
                    <FaTrash size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comments */}
        <div className="bg-gray-750 rounded-lg p-4 md:p-5">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <FaComment size={16} />
            Comments ({task.comments.length})
          </h3>
          <div className="space-y-4">
            {task.comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-gray-700 rounded-lg p-3 md:p-4"
              >
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-semibold">
                      {comment.avatar}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                      <p className="text-white font-medium text-sm truncate">
                        {comment.user}
                      </p>
                      <p className="text-gray-400 text-xs flex-shrink-0">
                        {new Date(comment.timestamp).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                      {comment.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Comment */}
            <div className="flex gap-3 pt-4 border-t border-gray-600">
              <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-semibold">Y</span>
              </div>
              <div className="flex-1">
                <textarea
                  placeholder="Add a comment..."
                  rows={3}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none text-sm md:text-base"
                />
                <div className="flex justify-between items-center mt-2">
                  <button className="text-gray-400 hover:text-white transition-colors p-1">
                    <FaPaperclip size={16} />
                  </button>
                  <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium">
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons - Mobile */}
      <div className="md:hidden bg-gray-750 p-4 border-t border-gray-700">
        <div className="flex gap-3">
          <button className="flex-1 bg-yellow-600 text-white py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors text-center">
            Mark Complete
          </button>
          <button className="flex-1 bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors text-center">
            Edit Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
