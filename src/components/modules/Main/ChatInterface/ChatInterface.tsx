/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// components/ChatInterface/ChatInterface.tsx
import { useState, useRef, useEffect, useContext } from "react";
import {
  FaPaperPlane,
  FaPaperclip,
  FaSmile,
  FaEllipsisV,
  FaSearch,
  FaPhone,
  FaVideo,
  FaArrowLeft,
  FaUsers,
  FaLock,
  FaCopy,
  FaShare,
  FaInfoCircle,
  FaEdit,
  FaTrash,
  FaUserPlus,
  FaCrown,
  FaUserShield,
  FaUser,
} from "react-icons/fa";
import { toast } from "react-toastify";
import {
  useGroupById,
  useRegenerateInviteCode,
  useUpdateGroup,
  useDeleteGroup,
  useRemoveMember,
  useUpdateMemberRole,
  useAddMember,
} from "../../../../services/groupapi";
import { AuthContext } from "../../../../contexts/AuthContext";

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
  isOwn: boolean;
}

interface ChatInterfaceProps {
  groupId: string;
  onBack?: () => void;
}

const ChatInterface = ({ groupId, onBack }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [showGroupInfo, setShowGroupInfo] = useState(false);
  const [isEditingGroup, setIsEditingGroup] = useState(false);
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [editGroupData, setEditGroupData] = useState({
    name: "",
    description: "",
    isPrivate: false,
  });
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const authContext = useContext(AuthContext);
  const currentUser = authContext?.user;

  const {
    data: group,
    isLoading: groupLoading,
    refetch: refetchGroup,
  } = useGroupById(groupId);

  const regenerateInviteCodeMutation = useRegenerateInviteCode();
  const updateGroupMutation = useUpdateGroup();
  const deleteGroupMutation = useDeleteGroup();
  const removeMemberMutation = useRemoveMember();
  const updateMemberRoleMutation = useUpdateMemberRole();
  const addMemberMutation = useAddMember();

  // Debug logs
  console.log("Current Group:", group);
  console.log("Current User:", currentUser);
  console.log("Group Members:", group?.members);

  // Helper function to get member email (handles both populated and non-populated userId)
  const getMemberEmail = (member: any): string => {
    if (typeof member.userId === "object" && member.userId?.email) {
      return member.userId.email;
    }
    return member.userId || "";
  };

  // Helper function to get member name
  const getMemberName = (member: any): string => {
    if (typeof member.userId === "object" && member.userId?.name) {
      return member.userId.name;
    }
    return getMemberEmail(member);
  };

  // Check if current user is admin - FIXED to work with populated userId
  const isCurrentUserAdmin = group?.members?.some((member: any) => {
    const memberEmail = getMemberEmail(member);
    return memberEmail === currentUser?.email && member.role === "admin";
  });

  console.log("Is Current User Admin:", isCurrentUserAdmin);

  // Mock messages data
  useEffect(() => {
    const mockMessages: Message[] = [
      {
        id: "1",
        text: "Hey team! How is the project going?",
        sender: "alice@example.com",
        timestamp: new Date(Date.now() - 3600000),
        isOwn: false,
      },
      {
        id: "2",
        text: "Going great! Just finished the authentication system.",
        sender: "You",
        timestamp: new Date(Date.now() - 1800000),
        isOwn: true,
      },
      {
        id: "3",
        text: "Don't forget to share the invite code with new members!",
        sender: "bob@example.com",
        timestamp: new Date(Date.now() - 600000),
        isOwn: false,
      },
    ];
    setMessages(mockMessages);
  }, [groupId]);

  // Initialize edit form when group data is available
  useEffect(() => {
    if (group) {
      setEditGroupData({
        name: group.name || "",
        description: group.description || "",
        isPrivate: group.isPrivate || false,
      });
    }
  }, [group]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "You",
      timestamp: new Date(),
      isOwn: true,
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");
  };

  const handleCopyInviteCode = () => {
    if (group?.inviteCode) {
      navigator.clipboard.writeText(group.inviteCode);
      toast.success("Invite code copied to clipboard!");
    }
  };

  const handleShareInviteCode = async () => {
    if (group?.inviteCode) {
      const shareData = {
        title: `Join ${group.name} on GroupCast`,
        text: `Join my group "${group.name}" on GroupCast! Use invite code: ${group.inviteCode}`,
        url: window.location.href,
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (error) {
          console.log("Error sharing:", error);
        }
      } else {
        navigator.clipboard.writeText(
          `Join my group "${group.name}" on GroupCast! Use invite code: ${group.inviteCode}`
        );
        toast.success("Invite message copied to clipboard!");
      }
    }
  };

  const handleRegenerateInviteCode = async () => {
    if (groupId) {
      try {
        await regenerateInviteCodeMutation.mutateAsync(groupId);
        toast.success("New invite code generated!");
        refetchGroup();
      } catch (error: any) {
        toast.error("Failed to regenerate invite code");
      }
    }
  };

  const handleUpdateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editGroupData.name.trim() || !editGroupData.description.trim()) {
      toast.error("Name and description are required");
      return;
    }

    try {
      await updateGroupMutation.mutateAsync({
        groupId,
        data: editGroupData,
      });
      toast.success("Group updated successfully!");
      setIsEditingGroup(false);
      refetchGroup();
    } catch (error: any) {
      toast.error("Failed to update group");
    }
  };

  const handleDeleteGroup = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this group? This action cannot be undone."
      )
    ) {
      try {
        await deleteGroupMutation.mutateAsync(groupId);
        toast.success("Group deleted successfully!");
        if (onBack) onBack();
      } catch (error: any) {
        toast.error("Failed to delete group");
      }
    }
  };

  const handleRemoveMember = async (memberEmail: string) => {
    if (
      window.confirm(
        `Are you sure you want to remove ${memberEmail} from the group?`
      )
    ) {
      try {
        await removeMemberMutation.mutateAsync({
          groupId,
          memberEmail,
        });
        toast.success("Member removed successfully!");
        refetchGroup();
      } catch (error: any) {
        toast.error("Failed to remove member");
      }
    }
  };

  const handleUpdateMemberRole = async (
    memberEmail: string,
    newRole: string
  ) => {
    try {
      await updateMemberRoleMutation.mutateAsync({
        groupId,
        memberEmail,
        role: newRole,
      });
      toast.success("Member role updated successfully!");
      refetchGroup();
    } catch (error: any) {
      toast.error("Failed to update member role");
    }
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberEmail.trim()) {
      toast.error("Please enter an email address");
      return;
    }

    try {
      await addMemberMutation.mutateAsync({
        groupId,
        memberEmail: newMemberEmail.trim(),
        role: "member",
      });
      toast.success("Member added successfully!");
      setIsAddingMember(false);
      setNewMemberEmail("");
      refetchGroup();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to add member");
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <FaCrown className="text-yellow-500" size={12} />;
      case "moderator":
        return <FaUserShield className="text-blue-400" size={12} />;
      default:
        return <FaUser className="text-gray-400" size={12} />;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (groupLoading) {
    return (
      <div className="flex-1 flex flex-col bg-gray-800 items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
        <p className="text-white mt-4">Loading group...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-800 h-screen">
      {/* Chat Header */}
      <div className="bg-gray-750 px-4 md:px-6 py-3 md:py-4 border-b border-gray-700 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {onBack && (
            <button
              onClick={onBack}
              className="text-gray-400 hover:text-white transition-colors flex-shrink-0 lg:hidden"
            >
              <FaArrowLeft size={18} />
            </button>
          )}
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <FaUsers className="text-white" size={18} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-white text-sm md:text-base truncate">
                {group?.name || "Loading..."}
              </h3>
              {group?.isPrivate && (
                <FaLock className="text-gray-400 flex-shrink-0" size={12} />
              )}
            </div>
            <p className="text-gray-400 text-xs truncate">
              {group?.members?.length || 0} members •{" "}
              {group?.description || "No description"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
          <button
            onClick={() => setShowGroupInfo(!showGroupInfo)}
            className={`text-gray-400 hover:text-white transition-colors ${
              showGroupInfo ? "text-yellow-500" : ""
            }`}
            title="Group Info"
          >
            <FaInfoCircle size={16} />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <FaPhone size={16} />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <FaVideo size={16} />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <FaSearch size={16} />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <FaEllipsisV size={16} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Messages Area */}
        <div
          className={`${
            showGroupInfo
              ? "hidden md:flex md:flex-1 lg:flex-2/3 xl:flex-3/4"
              : "flex-1 flex"
          } flex flex-col min-w-0`}
        >
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3 md:space-y-4 bg-gray-900 bg-opacity-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isOwn ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] md:max-w-xs lg:max-w-md px-3 py-2 md:px-4 md:py-2 rounded-2xl ${
                    message.isOwn
                      ? "bg-yellow-600 text-white rounded-br-none"
                      : "bg-gray-700 text-white rounded-bl-none"
                  }`}
                >
                  {!message.isOwn && (
                    <p className="text-xs text-gray-300 font-medium mb-1 truncate">
                      {message.sender}
                    </p>
                  )}
                  <p className="text-sm break-words">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.isOwn ? "text-yellow-200" : "text-gray-400"
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="bg-gray-750 mb-20 lg:mb-2 p-3 md:p-4 border-t border-gray-700 flex-shrink-0">
            <form
              onSubmit={handleSendMessage}
              className="flex items-center gap-2 md:gap-4"
            >
              <button
                type="button"
                className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
              >
                <FaPaperclip size={18} />
              </button>
              <button
                type="button"
                className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
              >
                <FaSmile size={18} />
              </button>

              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-gray-700 text-white px-3 md:px-4 py-2 md:py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm md:text-base min-w-0"
              />

              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="bg-yellow-600 text-white p-2 md:p-3 rounded-full hover:bg-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                <FaPaperPlane size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* Group Info Sidebar */}
        {showGroupInfo && group && (
          <div className="flex-1 md:flex-initial md:w-1/3 lg:w-1/4 xl:w-1/4 border-l border-gray-700 bg-gray-800 flex flex-col min-w-0">
            <div className="p-4 border-b border-gray-700 flex items-center justify-between flex-shrink-0">
              <h3 className="font-semibold text-white text-sm md:text-base">
                Group Information
              </h3>
              <div className="flex items-center gap-2">
                {isCurrentUserAdmin && (
                  <>
                    <button
                      onClick={() => setIsEditingGroup(!isEditingGroup)}
                      className="text-gray-400 hover:text-yellow-500 transition-colors"
                      title="Edit Group"
                    >
                      <FaEdit size={14} />
                    </button>
                    <button
                      onClick={handleDeleteGroup}
                      disabled={deleteGroupMutation.isPending}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      title="Delete Group"
                    >
                      {deleteGroupMutation.isPending ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <FaTrash size={14} />
                      )}
                    </button>
                  </>
                )}
                <button
                  onClick={() => setShowGroupInfo(false)}
                  className="text-gray-400 hover:text-white md:hidden"
                >
                  <FaArrowLeft size={16} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Edit Group Form */}
              {isEditingGroup ? (
                <div className="bg-gray-750 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3 text-sm md:text-base">
                    Edit Group
                  </h4>
                  <form onSubmit={handleUpdateGroup} className="space-y-3">
                    <div>
                      <label className="text-gray-400 text-xs mb-1 block">
                        Group Name
                      </label>
                      <input
                        type="text"
                        value={editGroupData.name}
                        onChange={(e) =>
                          setEditGroupData({
                            ...editGroupData,
                            name: e.target.value,
                          })
                        }
                        className="w-full bg-gray-700 text-white px-3 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-xs mb-1 block">
                        Description
                      </label>
                      <textarea
                        value={editGroupData.description}
                        onChange={(e) =>
                          setEditGroupData({
                            ...editGroupData,
                            description: e.target.value,
                          })
                        }
                        rows={3}
                        className="w-full bg-gray-700 text-white px-3 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500 resize-none"
                        required
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="isPrivate"
                        checked={editGroupData.isPrivate}
                        onChange={(e) =>
                          setEditGroupData({
                            ...editGroupData,
                            isPrivate: e.target.checked,
                          })
                        }
                        className="text-yellow-600 focus:ring-yellow-600"
                      />
                      <label
                        htmlFor="isPrivate"
                        className="text-gray-400 text-xs"
                      >
                        Private group
                      </label>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsEditingGroup(false)}
                        className="flex-1 bg-gray-600 text-white py-2 px-3 rounded text-sm hover:bg-gray-500 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={updateGroupMutation.isPending}
                        className="flex-1 bg-yellow-600 text-white py-2 px-3 rounded text-sm hover:bg-yellow-700 transition-colors disabled:opacity-50"
                      >
                        {updateGroupMutation.isPending ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                /* Group Details */
                <div>
                  <h4 className="text-gray-400 text-sm font-medium mb-3">
                    GROUP DETAILS
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-gray-400 text-xs">Group Name</p>
                      <p className="text-white font-medium text-sm md:text-base">
                        {group.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Description</p>
                      <p className="text-white text-sm">{group.description}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Privacy</p>
                      <p className="text-white text-sm">
                        {group.isPrivate ? "Private Group" : "Public Group"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Created</p>
                      <p className="text-white text-sm">
                        {new Date(group.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Invite Code Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-gray-400 text-sm font-medium">
                    INVITE MEMBERS
                  </h4>
                  {isCurrentUserAdmin && (
                    <button
                      onClick={() => setIsAddingMember(!isAddingMember)}
                      className="text-gray-400 hover:text-white transition-colors"
                      title="Add Member"
                    >
                      <FaUserPlus size={14} />
                    </button>
                  )}
                </div>

                {/* Add Member Form */}
                {isAddingMember && (
                  <div className="bg-gray-750 rounded-lg p-4 mb-3">
                    <h5 className="text-white text-sm font-medium mb-2">
                      Add Member
                    </h5>
                    <form onSubmit={handleAddMember} className="space-y-2">
                      <input
                        type="email"
                        value={newMemberEmail}
                        onChange={(e) => setNewMemberEmail(e.target.value)}
                        placeholder="Enter email address"
                        className="w-full bg-gray-700 text-white px-3 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
                        required
                      />
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setIsAddingMember(false)}
                          className="flex-1 bg-gray-600 text-white py-2 px-3 rounded text-sm hover:bg-gray-500 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={addMemberMutation.isPending}
                          className="flex-1 bg-yellow-600 text-white py-2 px-3 rounded text-sm hover:bg-yellow-700 transition-colors disabled:opacity-50"
                        >
                          {addMemberMutation.isPending ? "Adding..." : "Add"}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                <div className="bg-gray-750 rounded-lg p-4 space-y-3">
                  <div>
                    <p className="text-gray-400 text-xs mb-2">Invite Code</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 bg-gray-800 text-yellow-400 px-3 py-2 rounded text-sm font-mono tracking-wider text-center truncate">
                        {group.inviteCode}
                      </code>
                      <button
                        onClick={handleCopyInviteCode}
                        className="bg-gray-700 text-white p-2 rounded hover:bg-gray-600 transition-colors flex-shrink-0"
                        title="Copy code"
                      >
                        <FaCopy size={14} />
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-400 text-xs">
                    Share this code with others so they can join this group
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={handleShareInviteCode}
                      className="flex-1 bg-yellow-600 text-white py-2 px-3 rounded text-sm hover:bg-yellow-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <FaShare size={12} />
                      Share
                    </button>
                    {isCurrentUserAdmin && (
                      <button
                        onClick={handleRegenerateInviteCode}
                        disabled={regenerateInviteCodeMutation.isPending}
                        className="flex-1 bg-gray-700 text-white py-2 px-3 rounded text-sm hover:bg-gray-600 transition-colors disabled:opacity-50"
                      >
                        {regenerateInviteCodeMutation.isPending
                          ? "..."
                          : "New Code"}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Members Section */}
              <div>
                <h4 className="text-gray-400 text-sm font-medium mb-3">
                  MEMBERS ({group.members?.length || 0})
                </h4>
                <div className="space-y-2">
                  {group.members?.map((member: any, index: number) => {
                    const memberEmail = getMemberEmail(member);
                    const memberName = getMemberName(member);

                    return (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-2 rounded hover:bg-gray-750 group"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-medium">
                            {memberEmail?.charAt(0).toUpperCase() || "U"}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-white text-sm truncate">
                              {memberEmail || "Unknown User"}
                            </p>
                            {getRoleIcon(member.role)}
                          </div>
                          <p className="text-gray-400 text-xs capitalize">
                            {member.role}
                          </p>
                        </div>
                        {isCurrentUserAdmin &&
                          memberEmail !== currentUser?.email && (
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              {/* Role Dropdown */}
                              <select
                                value={member.role}
                                onChange={(e) =>
                                  handleUpdateMemberRole(
                                    memberEmail,
                                    e.target.value
                                  )
                                }
                                className="bg-gray-700 text-white text-xs rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                              >
                                <option value="member">Member</option>
                                <option value="moderator">Moderator</option>
                                <option value="admin">Admin</option>
                              </select>

                              {/* Remove Member Button */}
                              <button
                                onClick={() => handleRemoveMember(memberEmail)}
                                className="text-red-400 hover:text-red-500 transition-colors p-1"
                                title="Remove member"
                              >
                                <FaTrash size={12} />
                              </button>
                            </div>
                          )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
