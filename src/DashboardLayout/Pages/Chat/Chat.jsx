// File import__
import "./Chat.css";
import { jhError } from "../../../utils";
import useUserData from "../../../Hooks/userData";
import { AuthContext } from "../../../Context/AuthContext";
import RecruiterChatLayout from "../../../Components/ChatLayouts/RecruiterChatLayout/RecruiterChatLayout";
import UserChatLayout from "../../../Components/ChatLayouts/UserChatLayout/UserChatLayout";
import AdminChatLayout from "../../../Components/ChatLayouts/AdminChatLayout/AdminChatLayout";

// Package__
import { useLocation, useNavigate } from "react-router";

// From react__
import { useContext, useMemo } from "react";
import useChatSocket from "../../../Hooks/useChatSocket";

const Chat = () => {
  const { user, logOut } = useContext(AuthContext);
  const { profile } = useUserData();
  const location = useLocation();
  const navigate = useNavigate();

  // Socket user data__
  const socketUserData = useMemo(() => {
    if (!profile || !user) return null;
    return {
      email: user.email,
      username: profile.userName,
      role: profile.userRole,
      profilePhoto: profile.profilePhoto,
    };
  }, [profile, user]);

  const { isConnected, onlineUsers, messages, error, sendMessage } =
    useChatSocket(socketUserData);

  // Role check from route__
  const getRoleFromRoute = () => {
    const path = location.pathname;
    const role = profile?.userRole;

    if (!role) return null;

    if (path.includes("admin-chat")) {
      return role === "Admin" ? "admin" : null;
    }
    if (path.includes("recruiter-chat")) {
      return role === "Recruiter" ? "recruiter" : null;
    }
    if (path.includes("user-chat")) {
      return role === "Job Seeker" ? "user" : null;
    }
    return null;
  };

  const handleLogout = () => {
    logOut().then(() => {
      jhError({
        title: "Error!",
        text: "Warning! you are trying to unauthorize access. We captured you activity next time you might be block",
      });
    });
  };

  const userRole = getRoleFromRoute();

  // Loading states
  if (!socketUserData || userRole === null) {
    if (userRole === null) {
      navigate("/");
      handleLogout();
    }

    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading chat...</p>
      </div>
    );
  }

  const renderChatLayout = () => {
    switch (userRole) {
      case "admin":
        return (
          <AdminChatLayout
            onlineUsers={onlineUsers}
            messages={messages}
            sendMessage={sendMessage}
            isConnected={isConnected}
            error={error}
          />
        );
      case "recruiter":
        return (
          <RecruiterChatLayout
            onlineUsers={onlineUsers}
            messages={messages}
            sendMessage={sendMessage}
            isConnected={isConnected}
            error={error}
          />
        );
      case "user":
        return (
          <UserChatLayout
            onlineUsers={onlineUsers}
            messages={messages}
            sendMessage={sendMessage}
            isConnected={isConnected}
            error={error}
          />
        );
      default:
        return (
          <div className="error-container">
            <h3>Access Denied</h3>
            <p>You don't have permission to access this page.</p>
          </div>
        );
    }
  };

  return (
    <div className="chat-page">
      {renderChatLayout()}
    </div>
  );
};

export default Chat;