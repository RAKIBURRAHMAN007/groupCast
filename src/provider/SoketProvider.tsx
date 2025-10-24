// contexts/SocketContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { AuthContext } from "../contexts/AuthContext";

export interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

export const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    // Use email instead of _id for authentication
    if (!authContext?.user?.email) {
      console.log("No user email found, skipping socket connection");
      return;
    }

    console.log("Connecting socket with email:", authContext.user.email);

    const newSocket = io("http://localhost:5000", {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    newSocket.on("connect", () => {
      console.log("Socket connected successfully");
      setIsConnected(true);
      // Authenticate with email
      newSocket.emit("authenticate", { email: authContext?.user?.email });
    });

    newSocket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
      setIsConnected(false);
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      setIsConnected(false);
    });

    newSocket.on("authenticated", () => {
      console.log("Socket authenticated successfully");
    });

    newSocket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    setSocket(newSocket);

    return () => {
      console.log("Cleaning up socket connection");
      newSocket.close();
    };
  }, [authContext?.user?.email]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
