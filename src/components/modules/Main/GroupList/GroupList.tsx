/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import {
  FaSearch,
  FaPlus,
  FaLock,
  FaUsers,
  FaSpinner,
  FaTimes,
  FaSignInAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import {
  useCreateGroup,
  useUserGroups,
  useJoinGroup,
} from "../../../../services/groupapi";

interface GroupListProps {
  onGroupSelect: (groupId: string) => void;
  selectedGroup: string | null;
}

const GroupList = ({ onGroupSelect, selectedGroup }: GroupListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [inviteCode, setInviteCode] = useState("");
  const [newGroupData, setNewGroupData] = useState({
    name: "",
    description: "",
    isPrivate: false,
  });

  const { data: groups = [], isLoading, isError, refetch } = useUserGroups();
  const createGroupMutation = useCreateGroup();
  const joinGroupMutation = useJoinGroup();

  const filteredGroups = groups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newGroupData.name.trim() && newGroupData.description.trim()) {
      try {
        await createGroupMutation.mutateAsync(newGroupData);
        toast.success(`Group "${newGroupData.name}" created successfully!`);
        setNewGroupData({ name: "", description: "", isPrivate: false });
        setIsCreateModalOpen(false);
      } catch (error: any) {
        toast.error(`Failed to create group. Please try again.${error}`);
      }
    }
  };

  const handleJoinGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteCode.trim()) {
      try {
        await joinGroupMutation.mutateAsync(inviteCode.trim().toUpperCase());
        toast.success("Successfully joined the group!");
        setInviteCode("");
        setIsJoinModalOpen(false);
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            "Failed to join group. Invalid code?"
        );
      }
    }
  };

  if (isError) {
    return (
      <div className="flex-1 flex flex-col bg-gray-800 items-center justify-center p-6">
        <div className="text-center">
          <p className="text-red-400 mb-4">Failed to load groups</p>
          <button
            onClick={() => refetch()}
            className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-800">
      {/* Fixed Header */}
      <div className="flex-shrink-0 p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold text-white">Groups</h2>
        <p className="text-gray-400 text-sm">
          {isLoading ? "Loading..." : `${groups.length} groups`}
        </p>
      </div>

      {/* Fixed Search Bar */}
      <div className="flex-shrink-0 p-4 border-b border-gray-700">
        <div className="relative">
          <FaSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Search groups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-700 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
      </div>

      {/* Fixed Action Buttons */}
      <div className="flex-shrink-0 p-4 border-b border-gray-700 space-y-2">
        <button
          onClick={() => setIsCreateModalOpen(true)}
          disabled={createGroupMutation.isPending}
          className="w-full bg-yellow-600 text-white py-3 px-4 rounded-lg hover:bg-yellow-700 flex items-center justify-center gap-2 disabled:opacity-50 transition-colors"
        >
          {createGroupMutation.isPending ? (
            <FaSpinner className="animate-spin" size={16} />
          ) : (
            <FaPlus size={16} />
          )}
          {createGroupMutation.isPending ? "Creating..." : "Create New Group"}
        </button>

        <button
          onClick={() => setIsJoinModalOpen(true)}
          disabled={joinGroupMutation.isPending}
          className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2 disabled:opacity-50 transition-colors"
        >
          {joinGroupMutation.isPending ? (
            <FaSpinner className="animate-spin" size={16} />
          ) : (
            <FaSignInAlt size={16} />
          )}
          {joinGroupMutation.isPending ? "Joining..." : "Join Group"}
        </button>
      </div>

      {/* Scrollable Groups List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <FaSpinner className="animate-spin text-yellow-600" size={24} />
          </div>
        ) : filteredGroups.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <FaUsers className="text-gray-400 mb-4" size={48} />
            <h3 className="text-white font-semibold mb-2">
              {searchTerm ? "No groups found" : "No groups yet"}
            </h3>
            <p className="text-gray-400 text-sm">
              {searchTerm
                ? "Try different search terms"
                : "Create your first group to get started"}
            </p>
          </div>
        ) : (
          filteredGroups.map((group) => (
            <div
              key={group._id}
              onClick={() => onGroupSelect(group._id)}
              className={`p-4 border-b border-gray-700 cursor-pointer hover:bg-gray-750 transition-all duration-200 ${
                selectedGroup === group._id
                  ? "bg-gray-750 border-l-4 border-l-yellow-600"
                  : "border-l-4 border-l-transparent"
              }`}
            >
              <div className="flex items-start gap-3">
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
                  <p className="text-gray-400 text-xs truncate mb-2">
                    {group.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <FaUsers className="text-gray-400" size={10} />
                      <span className="text-gray-400 text-xs">
                        {group.members?.length || 0} members
                      </span>
                    </div>
                    <span className="text-gray-500 text-xs">
                      {new Date(group.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Group Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">Create New Group</h2>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <form onSubmit={handleCreateGroup} className="p-6 space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Group Name *
                </label>
                <input
                  type="text"
                  value={newGroupData.name}
                  onChange={(e) =>
                    setNewGroupData({ ...newGroupData, name: e.target.value })
                  }
                  placeholder="Enter group name"
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none"
                  required
                  maxLength={50}
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Description *
                </label>
                <textarea
                  value={newGroupData.description}
                  onChange={(e) =>
                    setNewGroupData({
                      ...newGroupData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Describe the purpose of this group"
                  rows={3}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none resize-none"
                  required
                  maxLength={200}
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isPrivate"
                  checked={newGroupData.isPrivate}
                  onChange={(e) =>
                    setNewGroupData({
                      ...newGroupData,
                      isPrivate: e.target.checked,
                    })
                  }
                  className="text-yellow-600 focus:ring-yellow-600"
                />
                <label htmlFor="isPrivate" className="text-gray-400 text-sm">
                  Private group (only invited members can join)
                </label>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="flex-1 bg-gray-700 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    createGroupMutation.isPending ||
                    !newGroupData.name.trim() ||
                    !newGroupData.description.trim()
                  }
                  className="flex-1 bg-yellow-600 text-white py-3 px-4 rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50"
                >
                  {createGroupMutation.isPending ? "Creating..." : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Join Group Modal */}
      {isJoinModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">Join Group</h2>
              <button
                onClick={() => setIsJoinModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <form onSubmit={handleJoinGroup} className="p-6 space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Invite Code *
                </label>
                <input
                  type="text"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                  placeholder="Enter invite code"
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none uppercase tracking-wider text-center text-lg font-mono"
                  required
                  maxLength={10}
                />
                <p className="text-gray-500 text-xs mt-2">
                  Ask the group admin for the invite code
                </p>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsJoinModalOpen(false)}
                  className="flex-1 bg-gray-700 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={joinGroupMutation.isPending || !inviteCode.trim()}
                  className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  {joinGroupMutation.isPending ? "Joining..." : "Join"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupList;
