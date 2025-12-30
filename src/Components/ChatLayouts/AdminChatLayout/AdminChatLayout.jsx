import {
  FaPaperPlane,
  FaTrash,
  FaCircle,
  FaComments,
  FaSearch,
  FaEllipsisV,
  FaBuilding,
  FaUser,
} from "react-icons/fa";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { useState, useEffect, useRef } from "react";

const AdminChatLayout = ({
  onlineUsers,
  messages,
  sendMessage,
  isConnected,
}) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [unreadCounts, setUnreadCounts] = useState({});
  const messagesEndRef = useRef(null);

  // Filter and sort online users with search
  const filteredUsers = onlineUsers.filter((user) => {
    if (!searchQuery.trim()) return true;
    const searchLower = searchQuery.toLowerCase();
    return (
      user.username?.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.role.toLowerCase().includes(searchLower)
    );
  });

  // Filter messages for selected user
  const filteredMessages = messages.filter(
    (msg) =>
      msg.to?.email === selectedUser?.email ||
      msg.from?.email === selectedUser?.email
  );

  // Calculate unread messages for each user
  useEffect(() => {
    const counts = {};
    onlineUsers.forEach((user) => {
      const userMessages = messages.filter(
        (msg) =>
          (msg.from?.email === user.email && msg.type === "received") ||
          (msg.to?.email === user.email && msg.type === "sent")
      );
      const unread = userMessages.filter(
        (msg) => msg.type === "received" && !msg.read
      ).length;
      counts[user.email] = unread;
    });
    setUnreadCounts(counts);
  }, [messages, onlineUsers]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [filteredMessages]);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedUser) return;

    const success = sendMessage(selectedUser.email, messageInput);
    if (success) {
      setMessageInput("");
    }
  };

  const handleClearChat = () => {
    setSelectedUser(null);
    // In future, we can add API call to clear chat from database
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    // Mark messages as read when user is selected
    setUnreadCounts((prev) => ({
      ...prev,
      [user.email]: 0,
    }));
  };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-80px)] bg-gray-100">
      {/* Left Sidebar - Users List */}
      <div className="w-full md:w-80 lg:w-96 border-r border-gray-200 bg-gray-50 flex flex-col flex-shrink-0">
        {/* Sidebar Header */}
        <div className="p-4 md:p-5 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FaUser className="text-[#3C8F63]" />
              Admin Panel
            </h2>
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <FaEllipsisV className="text-gray-500" />
            </button>
          </div>

          {/* Connection Status */}
          <div
            className={`mb-4 px-3 py-2 rounded-lg text-sm font-medium ${
              isConnected
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {isConnected
              ? `🟢 ${onlineUsers.length} users online`
              : "🔴 Connecting to server..."}
          </div>

          {/* Search Box */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#3C8F63] focus:ring-2 focus:ring-[#3C8F63]/20"
              />
            </div>
          </div>
        </div>

        {/* Users List */}
        <div className="flex-1 overflow-y-auto p-3 md:p-4">
          {filteredUsers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>{searchQuery ? "No users found" : "No users online"}</p>
            </div>
          ) : (
            filteredUsers.map((user) => (
              <div
                key={user.email}
                onClick={() => handleUserSelect(user)}
                className={`flex items-center gap-3 p-3 md:p-4 rounded-xl mb-3 cursor-pointer transition-all border ${
                  selectedUser?.email === user.email
                    ? "bg-[#E8F5EE] border-[#3C8F63]"
                    : "bg-white border-gray-200 hover:border-gray-300"
                }`}
              >
                {/* User Avatar with Role Badge */}
                <div className="relative">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg text-white ${
                      user.role === "recruiter"
                        ? "bg-blue-600"
                        : user.role === "admin"
                        ? "bg-purple-600"
                        : "bg-[#3C8F63]"
                    }`}
                  >
                    {user.role === "recruiter" ? (
                      <FaBuilding />
                    ) : (
                      user.username?.charAt(0)?.toUpperCase() ||
                      user.email.charAt(0).toUpperCase()
                    )}
                  </div>
                  {isConnected && (
                    <FaCircle className="absolute bottom-0 right-0 text-green-500 text-xs bg-white rounded-full" />
                  )}
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-800 truncate">
                      {user.username || user.email.split("@")[0]}
                    </h4>
                    <span className="text-xs text-gray-500">
                      {user.joinedAt
                        ? new Date(user.joinedAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "Just now"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-1">
                    <span
                      className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-full ${
                        user.role === "recruiter"
                          ? "bg-blue-100 text-blue-700 border border-blue-200"
                          : user.role === "admin"
                          ? "bg-purple-100 text-purple-700 border border-purple-200"
                          : "bg-gray-100 text-gray-700 border border-gray-200"
                      }`}
                    >
                      {user.role}
                    </span>

                    {/* Unread Message Badge */}
                    {unreadCounts[user.email] > 0 && (
                      <span className="w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                        {unreadCounts[user.email]}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Side - Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="relative">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg text-white ${
                      selectedUser.role === "recruiter"
                        ? "bg-blue-600"
                        : "bg-[#3C8F63]"
                    }`}
                  >
                    {selectedUser.role === "recruiter" ? (
                      <FaBuilding />
                    ) : (
                      selectedUser.username?.charAt(0)?.toUpperCase() ||
                      selectedUser.email.charAt(0).toUpperCase()
                    )}
                  </div>
                  <FaCircle className="absolute bottom-0 right-0 text-green-500 text-xs bg-white rounded-full" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">
                    {selectedUser.username || selectedUser.email.split("@")[0]}
                  </h3>
                  <div className="flex items-center gap-2">
                    <FaCircle className="text-green-500 text-xs" />
                    <p className="text-sm text-green-600 font-medium">Online</p>
                    <span className="text-xs text-gray-500 ml-2">
                      {selectedUser.role}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleClearChat}
                className="flex items-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 rounded-lg transition-colors font-medium"
              >
                <FaTrash />
                Clear Chat
              </button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 md:p-5 bg-gradient-to-b from-gray-100 to-white">
              {filteredMessages.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <FaComments className="text-5xl mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-semibold mb-2">
                    No messages yet
                  </h3>
                  <p>
                    Start the conversation with{" "}
                    {selectedUser.username || selectedUser.email.split("@")[0]}
                  </p>
                </div>
              ) : (
                filteredMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.type === "sent" ? "justify-end" : "gap-3"
                    } mb-4 md:mb-5`}
                  >
                    {msg.type !== "sent" && (
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                          msg.from?.role === "recruiter"
                            ? "bg-blue-600"
                            : "bg-gray-600"
                        } text-white`}
                      >
                        {msg.from?.username?.charAt(0)?.toUpperCase() ||
                          msg.from?.email?.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <div
                      className={
                        msg.type === "sent" ? "flex flex-col items-end" : ""
                      }
                    >
                      {msg.type !== "sent" && (
                        <p className="text-xs font-semibold text-gray-700 mb-1">
                          {msg.from?.username || msg.from?.email?.split("@")[0]}
                        </p>
                      )}
                      <div
                        className={`rounded-2xl px-4 py-3 max-w-xs md:max-w-md ${
                          msg.type === "sent"
                            ? "bg-[#3C8F63] text-white rounded-br-none"
                            : "bg-white shadow-sm border border-gray-100 rounded-tl-none"
                        }`}
                      >
                        <p>{msg.message}</p>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 md:p-5 border-t border-gray-200 bg-white">
              <div className="flex items-center gap-3">
                <button className="p-3 rounded-xl hover:bg-gray-100 transition-colors">
                  <HiOutlineEmojiHappy className="text-2xl text-gray-500" />
                </button>
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder={`Message ${
                    selectedUser.username || selectedUser.email.split("@")[0]
                  }...`}
                  className="flex-1 w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#3C8F63] focus:ring-2 focus:ring-[#3C8F63]/20"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={
                    !messageInput.trim() || !selectedUser || !isConnected
                  }
                  className="flex items-center gap-2 px-6 py-3.5 bg-[#3C8F63] text-white rounded-xl hover:bg-[#2E7A55] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaPaperPlane />
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <FaComments className="text-6xl mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold mb-2">
                Select a user to chat
              </h3>
              <p className="mb-6">
                Choose from the online users list to start messaging
              </p>
              <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg max-w-md mx-auto">
                <p className="font-medium mb-2">💡 Features available:</p>
                <ul className="space-y-1 text-left">
                  <li>• Real-time messaging with online users</li>
                  <li>• User search by name, email, or role</li>
                  <li>• Unread message indicators</li>
                  <li>• Online/offline status</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChatLayout;