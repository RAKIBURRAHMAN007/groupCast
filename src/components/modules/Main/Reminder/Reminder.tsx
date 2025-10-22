// components/Reminders/Reminders.tsx
import { useState } from "react";
import {
  FaPlus,
  FaBell,
  FaTrash,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";

interface Reminder {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  completed: boolean;
}

const Reminders = () => {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: "1",
      title: "Team Meeting",
      description: "Weekly team sync meeting",
      date: "2024-01-15",
      time: "14:00",
      completed: false,
    },
    {
      id: "2",
      title: "Project Deadline",
      description: "Submit final project deliverables",
      date: "2024-01-20",
      time: "17:00",
      completed: false,
    },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
  });

  const handleAdd = () => {
    if (formData.title && formData.date && formData.time) {
      const newReminder: Reminder = {
        id: Date.now().toString(),
        ...formData,
        completed: false,
      };
      setReminders([...reminders, newReminder]);
      setFormData({ title: "", description: "", date: "", time: "" });
      setIsAdding(false);
    }
  };

  const handleEdit = (id: string) => {
    const reminder = reminders.find((r) => r.id === id);
    if (reminder) {
      setFormData({
        title: reminder.title,
        description: reminder.description,
        date: reminder.date,
        time: reminder.time,
      });
      setEditingId(id);
    }
  };

  const handleSaveEdit = () => {
    if (editingId && formData.title && formData.date && formData.time) {
      setReminders(
        reminders.map((reminder) =>
          reminder.id === editingId ? { ...reminder, ...formData } : reminder
        )
      );
      setEditingId(null);
      setFormData({ title: "", description: "", date: "", time: "" });
    }
  };

  const handleDelete = (id: string) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };

  const toggleComplete = (id: string) => {
    setReminders(
      reminders.map((reminder) =>
        reminder.id === id
          ? { ...reminder, completed: !reminder.completed }
          : reminder
      )
    );
  };

  const cancelForm = () => {
    setFormData({ title: "", description: "", date: "", time: "" });
    setIsAdding(false);
    setEditingId(null);
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-800">
      {/* Header */}
      <div className="p-6 border-b border-gray-700 bg-gray-900">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Reminders</h1>
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FaPlus size={16} />
            <span>Add Reminder</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Add/Edit Form */}
          {(isAdding || editingId) && (
            <div className="bg-gray-900 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                {editingId ? "Edit Reminder" : "New Reminder"}
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-yellow-600 focus:outline-none"
                />
                <textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-yellow-600 focus:outline-none resize-none"
                  rows={3}
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-yellow-600 focus:outline-none"
                  />
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                    className="bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-yellow-600 focus:outline-none"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={editingId ? handleSaveEdit : handleAdd}
                    className="flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <FaSave size={16} />
                    <span>{editingId ? "Save Changes" : "Add Reminder"}</span>
                  </button>
                  <button
                    onClick={cancelForm}
                    className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <FaTimes size={16} />
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Reminders List */}
          <div className="space-y-4">
            {reminders.map((reminder) => (
              <div
                key={reminder.id}
                className={`bg-gray-900 rounded-xl p-4 border-l-4 ${
                  reminder.completed
                    ? "border-green-500 opacity-60"
                    : "border-yellow-600"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleComplete(reminder.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        reminder.completed
                          ? "bg-green-500 border-green-500"
                          : "border-gray-400 hover:border-yellow-600"
                      }`}
                    >
                      {reminder.completed && (
                        <span className="text-white text-sm">✓</span>
                      )}
                    </button>
                    <div>
                      <h3
                        className={`font-semibold ${
                          reminder.completed
                            ? "text-gray-400 line-through"
                            : "text-white"
                        }`}
                      >
                        {reminder.title}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {reminder.description}
                      </p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-yellow-600 text-sm flex items-center">
                          <FaBell size={12} className="mr-1" />
                          {reminder.date} at {reminder.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {!reminder.completed && (
                      <button
                        onClick={() => handleEdit(reminder.id)}
                        className="text-gray-400 hover:text-yellow-600 p-2 transition-colors"
                      >
                        <FaEdit size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(reminder.id)}
                      className="text-gray-400 hover:text-red-500 p-2 transition-colors"
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {reminders.length === 0 && !isAdding && (
              <div className="text-center py-12">
                <FaBell className="text-gray-400 text-4xl mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-400 mb-2">
                  No Reminders
                </h3>
                <p className="text-gray-500">Add a reminder to get started</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reminders;
