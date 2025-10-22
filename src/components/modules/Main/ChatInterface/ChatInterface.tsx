// components/chat/ChatInterface.tsx
import { useState, useRef, useEffect } from "react";
import {
  FaPaperPlane,
  FaPaperclip,
  FaSmile,
  FaEllipsisV,
  FaSearch,
  FaPhone,
  FaVideo,
  FaArrowLeft,
} from "react-icons/fa";

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock data
  useEffect(() => {
    const mockMessages: Message[] = [
      {
        id: "1",
        text: "Hey team! How is the project going?",
        sender: "Alice Johnson",
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
      // ... more messages
    ];
    setMessages(mockMessages);
  }, [groupId]);

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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-800 h-full">
      {/* Chat Header */}
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
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold text-sm">DT</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white text-sm md:text-base truncate">
              Development Team
            </h3>
            <p className="text-gray-400 text-xs truncate">
              8 members • Last seen recently
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
          <button className="text-gray-400 hover:text-white transition-colors hidden sm:block">
            <FaPhone size={16} />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors hidden sm:block">
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

      {/* Messages Area */}
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
      <div className="bg-gray-750 p-3 md:p-4 border-t border-gray-700">
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
            className="flex-1 bg-gray-700 text-white px-3 md:px-4 py-2 md:py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm md:text-base"
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
  );
};

export default ChatInterface;
