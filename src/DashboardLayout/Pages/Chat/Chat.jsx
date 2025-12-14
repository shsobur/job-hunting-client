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
import { useContext } from "react";

const Chat = () => {
  const { logOut } = useContext(AuthContext);
  const { profile } = useUserData();
  const location = useLocation();
  const navigate = useNavigate();
  const role = profile?.userRole;

  const getRoleFromRoute = () => {
    const path = location.pathname;
    if (role) {
      if (path.includes("admin-chat")) {
        if (role === "Admin") {
          return "admin";
        } else {
          navigate("/");

          handleLogout();

          return null;
        }
      } else if (path.includes("recruiter-chat")) {
        if (role === "Recruiter") {
          return "recruiter";
        } else {
          navigate("/");

          handleLogout();

          return null;
        }
      } else if (path.includes("user-chat")) {
        if (role === "Job Seeker") {
          return "user";
        } else {
          navigate("/");

          handleLogout();

          return null;
        }
      }
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

  // Loading for unauthorized access__
  if (userRole === null) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Verifying access permissions...</p>
      </div>
    );
  }

  const renderChatLayout = () => {
    switch (userRole) {
      case "admin":
        return <AdminChatLayout></AdminChatLayout>;

      case "recruiter":
        return <RecruiterChatLayout></RecruiterChatLayout>;

      case "user":
        return <UserChatLayout></UserChatLayout>;

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
    <>
      <div className="chat-page">{renderChatLayout()}</div>
    </>
  );
};

export default Chat;
