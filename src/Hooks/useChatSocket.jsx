import { useCallback, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SERVER_API_URL;

const useChatSocket = (userData) => {
  const socketRef = useRef(null);
  const didConnect = useRef(false);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userData) {
      setIsConnected(false);
      return;
    }

    if (didConnect.current) return;
    didConnect.current = true;
    
    console.log("Creating socket for:", userData.email);

    const newSocket = io(SOCKET_URL, {
      auth: userData,
      transports: ["polling", "websocket"],
    });

    socketRef.current = newSocket;
    newSocket.emit("user-join", userData);

    // Connection events__
    newSocket.on("connect", () => {
      console.log("✅ Socket connected");
      setIsConnected(true);
    });

    // Disconnection events__
    newSocket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
      setIsConnected(false);
    });

    // Error message__
    newSocket.on("connect_error", (err) => {
      console.error("Connection error:", err);
      setError("Failed to connect to chat server");
    });

    // Message event__
    newSocket.on("new-message", (message) => {
      console.log("📩 New message:", message);
      setMessages((prevMessages) => {
        const newMessage = {
          ...message,
          type: "received",
        };

        return [...prevMessages, newMessage];
      });
    });

    newSocket.on("message-sent", (message) => {
      console.log("📩 Message sent:", message);
      setMessages((prevMessages) => {
        const newMessage = {
          ...message,
          type: "sent",
        };

        return [...prevMessages, newMessage];
      });
    });

    // User list for admin__
    newSocket.on("online-users", (users) => {
      console.log("👥 Online users:", users);
      setOnlineUsers(users);
    });

    // Error handling__
    newSocket.on("error", (errorData) => {
      console.error("Socket error:", errorData);
      setError(errorData.message);
    });

    // Cleanup__
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        didConnect.current = false;
      }
      setIsConnected(false);
    };
  }, [userData]);

  // Privet message__
  const sendMessage = useCallback(
    (toEmail, message) => {
      const socket = socketRef.current;
      if (!socket || !socket.connected) {
        setError("Not connected to server");
        return false;
      }

      const senderData = {
        email: userData.email,
        username: userData.username,
        role: userData.role,
      };

      socket.emit("private-message", {
        toEmail,
        message,
        senderData,
      });

      return true;
    },
    [userData]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    isConnected,
    onlineUsers,
    messages,
    error,
    sendMessage,
    clearMessages,
  };
};

export default useChatSocket;
