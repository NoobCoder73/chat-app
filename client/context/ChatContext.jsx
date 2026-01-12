import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessages, setUnseenMessages] = useState({});

  const { socket, axios } = useContext(AuthContext);

  // Fetch all users
  const getUsers = async () => {
    try {
      const { data } = await axios.get("/api/messages/users");
      if (data.success) {
        setUsers(data.users || []);
        setUnseenMessages(data.unseenMessages || {});
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch messages for a user
  const getMessages = async (userId) => {
    try {
      const { data } = await axios.get(`/api/messages/${userId}`);
      if (data.success) {
        setMessages(data.messages || []);
        // Refresh users/unseen counts after marking messages seen on the server
        getUsers();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Send a message
  const sendMessage = async (messageData) => {
    try {
      if (!selectedUser) {
        toast.error("No user selected.");
        return;
      }

      const { data } = await axios.post(
        `/api/messages/send/${selectedUser._id}`,
        messageData
      );

      if (data.success && data.newMessage) {
        setMessages((prev) => [...prev, data.newMessage]);
      } else {
        toast.error(data.message || "Send failed");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Subscribe to socket events
  const subscribeToMessages = () => {
    if (!socket) return;

    socket.off("newMessage"); // prevent multiple listeners

    socket.on("newMessage", (newMessage) => {
      if (!newMessage || !newMessage.senderId) return;

      // If message is from selected user
      if (selectedUser && newMessage.senderId === selectedUser._id) {
        newMessage.seen = true;

        setMessages((prev) => [...prev, newMessage]);

        // mark as seen
        axios.put(`/api/messages/mark/${newMessage._id}`).catch(() => {});

        // Reset unseen count for this sender (we just saw their message)
        setUnseenMessages((prev) => ({ ...prev, [newMessage.senderId]: 0 }));
        // Also refresh users to keep server/client in sync
        getUsers();
      } else {
        // Increase unseen count
        setUnseenMessages((prev) => ({
          ...prev,
          [newMessage.senderId]: (prev[newMessage.senderId] || 0) + 1,
        }));
      }
    });
  };

  useEffect(() => {
    subscribeToMessages();

    return () => {
      if (socket) socket.off("newMessage");
    };
  }, [socket, selectedUser]); // resubscribe when socket or selected user changes

  const value = {
    messages,
    users,
    selectedUser,
    unseenMessages,
    getUsers,
    getMessages,
    sendMessage,
    setSelectedUser,
    setUnseenMessages,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
