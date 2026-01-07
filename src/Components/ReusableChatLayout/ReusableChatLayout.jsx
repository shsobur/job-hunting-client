import {
  FaPaperPlane,
  FaTrash,
  FaCircle,
  FaSearch,
  FaEllipsisV,
  FaUser,
  FaTimes,
  FaBuilding,
  FaBriefcase,
} from "react-icons/fa";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { useState } from "react";
import useSocket from "../../Hooks/useSocket";

const ReusableChatLayout = ({ userRole, userName }) => {
  const { socket, isConnected } = useSocket();
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - will replace with real data later
  const conversations = [
    {
      id: 1,
      userId: "user_123",
      name: "John Doe",
      avatar: "JD",
      email: "john@example.com", // ✅ ADD THIS
      role: "Job Seeker",
      lastMessage: "Hello, I have a question...",
      lastMessageTime: "10:45 AM",
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: 2,
      userId: "user_456",
      name: "Jane Smith",
      avatar: "JS",
      email: "jane@example.com", // ✅ ADD THIS
      role: userRole === "admin" ? "Recruiter" : "Admin",
      lastMessage: "Thanks for the update!",
      lastMessageTime: "Yesterday",
      unreadCount: 0,
      isOnline: false,
    },
  ];

  const [messages, setMessages] = useState([
    {
      id: 1,
      senderId: "user_123",
      senderName: "John Doe",
      text: "Hello! How can I help you?",
      timestamp: "10:40 AM",
      isCurrentUser: false,
    },
    {
      id: 2,
      senderId: "current",
      senderName: "You",
      text: "I need help with the dashboard.",
      timestamp: "10:41 AM",
      isCurrentUser: true,
    },
  ]);

  // Role-based configurations
  const getRoleConfig = () => {
    const configs = {
      admin: {
        title: "Admin Messages",
        placeholder: "Search all users...",
        canClearChat: true,
        canMessageAnyone: true,
        sidebarTitle: "All Users",
      },
      recruiter: {
        title: "Recruiter Messages",
        placeholder: "Search candidates...",
        canClearChat: true,
        canMessageAnyone: false,
        sidebarTitle: "Candidates",
      },
      user: {
        title: "My Messages",
        placeholder: "Search conversations...",
        canClearChat: false,
        canMessageAnyone: false,
        sidebarTitle: "Conversations",
      },
    };
    return configs[userRole] || configs.user;
  };

  const config = getRoleConfig();

  // Send message__
  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedUser) return;

    if (socket && isConnected) {
      console.log("📤 Sending to:", selectedUser.email);

      socket.emit("send_message", {
        to: selectedUser.email,
        text: messageInput,
        timestamp: new Date().toISOString(),
      });

      // Add message to UI immediately
      const newMessage = {
        id: Date.now(),
        senderId: "current",
        senderName: "You",
        text: messageInput,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isCurrentUser: true,
      };

      // Add to messages array
      setMessages((prev) => [...prev, newMessage]);
    } else {
      console.error("❌ Socket not connected");
    }

    setMessageInput("");
  };

  const handleSelectUser = (user) => {
    console.log(`[${userRole}] Selected user:`, user.name);
    setSelectedUser(user);
    // TODO: Load messages for this user
  };

  const handleClearChat = () => {
    if (!selectedUser) return;
    console.log(`[${userRole}] Clearing chat with ${selectedUser.name}`);
    // TODO: Implement clear chat
  };

  const getRoleBadgeClass = (role) => {
    switch (role) {
      case "Admin":
        return "bg-purple-100 text-purple-700";
      case "Recruiter":
        return "bg-blue-100 text-blue-700";
      case "Job Seeker":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getRoleIcon = () => {
    switch (userRole) {
      case "admin":
        return <FaUser className="text-[#3C8F63]" />;
      case "recruiter":
        return <FaBriefcase className="text-blue-600" />;
      case "user":
        return <FaUser className="text-green-600" />;
      default:
        return <FaUser />;
    }
  };

  // Filter conversations based on search
  const filteredConversations = conversations.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get online users count
  const onlineUsersCount = conversations.filter((user) => user.isOnline).length;

  return (
    <div className="flex h-[100%] bg-gray-100">
      {/* LEFT SIDEBAR */}
      <div className="w-full md:w-80 lg:w-96 border-r border-gray-200 bg-white flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {getRoleIcon()}
              <h2 className="text-xl font-bold text-gray-800">
                {config.title}
              </h2>
            </div>
            <button className="text-gray-500 hover:text-gray-700">
              <FaEllipsisV />
            </button>
          </div>

          {/* Online Status */}
          <div className="px-3 py-2 rounded-lg text-sm bg-green-50 text-green-700 border border-green-200 mb-4">
            <div className="flex items-center gap-2">
              <FaCircle className="text-xs text-green-500" />
              <span>{onlineUsersCount} users online</span>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={config.placeholder}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3C8F63] focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No conversations found
            </div>
          ) : (
            filteredConversations.map((user) => (
              <div
                key={user.id}
                className={`flex items-center gap-3 p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                  selectedUser?.userId === user.userId
                    ? "bg-green-50 border-l-4 border-l-[#3C8F63]"
                    : ""
                }`}
                onClick={() => handleSelectUser(user)}
              >
                {/* Avatar with Online Status */}
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-[#3C8F63] text-white flex items-center justify-center font-bold">
                    {user.avatar}
                  </div>
                  {user.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-gray-800 truncate">
                      {user.name}
                    </h4>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {user.lastMessageTime}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-600 truncate max-w-[120px]">
                      {user.lastMessage}
                    </span>
                    {user.unreadCount > 0 && (
                      <span className="w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {user.unreadCount}
                      </span>
                    )}
                  </div>

                  {/* Role Badge */}
                  <div className="mt-1">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${getRoleBadgeClass(
                        user.role
                      )}`}
                    >
                      {user.role}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-2 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            {filteredConversations.length}{" "}
            {filteredConversations.length === 1
              ? "conversation"
              : "conversations"}
          </p>
        </div>
      </div>

      {/* RIGHT PANEL - Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        {selectedUser ? (
          <>
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center gap-3">
                <button className="md:hidden text-gray-500 hover:text-gray-700">
                  <FaTimes />
                </button>

                <div className="w-12 h-12 rounded-full bg-[#3C8F63] text-white flex items-center justify-center font-bold">
                  {selectedUser.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">
                    {selectedUser.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        selectedUser.isOnline ? "bg-green-500" : "bg-gray-400"
                      }`}
                    ></div>
                    <span className="text-sm text-gray-600">
                      {selectedUser.isOnline ? "Online" : "Offline"}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      {selectedUser.role}
                    </span>
                  </div>
                </div>
              </div>

              {config.canClearChat && (
                <button
                  onClick={handleClearChat}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2"
                >
                  <FaTrash />
                  Clear Chat
                </button>
              )}
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              <div className="mx-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 ${
                      message.isCurrentUser ? "flex justify-end" : "flex"
                    }`}
                  >
                    {!message.isCurrentUser && (
                      <div className="w-8 h-8 rounded-full bg-gray-600 text-white flex items-center justify-center text-sm mr-2">
                        {selectedUser.avatar.charAt(0)}
                      </div>
                    )}

                    <div
                      className={`max-w-[70%] ${
                        message.isCurrentUser ? "text-right" : ""
                      }`}
                    >
                      {!message.isCurrentUser && (
                        <p className="text-xs font-semibold text-gray-700 mb-1">
                          {message.senderName}
                        </p>
                      )}
                      <div
                        className={`px-4 py-3 rounded-2xl ${
                          message.isCurrentUser
                            ? "bg-[#3C8F63] text-white rounded-br-none"
                            : "bg-white border border-gray-200 rounded-bl-none"
                        }`}
                      >
                        {message.text}
                      </div>
                      <span className="text-xs text-gray-500 mt-1 block">
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="mx-auto">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder={`Message ${selectedUser.name}...`}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3C8F63] focus:border-transparent"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />

                  <button
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    className="px-6 py-3 bg-[#3C8F63] text-white rounded-xl hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaPaperPlane />
                    <span className="hidden sm:inline">Send</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Empty state when no user is selected
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
              <FaUser className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Select a conversation
            </h3>
            <p className="text-gray-500 max-w-md">
              {userRole === "admin"
                ? "Choose a user from the list to start messaging"
                : userRole === "recruiter"
                ? "Select a candidate to view messages"
                : "Select a conversation to continue"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReusableChatLayout;
