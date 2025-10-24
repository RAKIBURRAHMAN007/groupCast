/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { io, type Socket } from "socket.io-client";
import { SocketContext } from "../contexts/SoketContext";

// contexts/SocketContext.tsx - UPDATED
export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const authContext = useContext(AuthContext);

  useEffect(() => {
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

      // Authenticate with email immediately after connection
      newSocket.emit("authenticate", { email: authContext?.user?.email });
    });

    newSocket.on("authenticated", () => {
      console.log("Socket authenticated successfully");
    });

    newSocket.on("authentication_error", (error: any) => {
      console.error("Socket authentication failed:", error);
    });

    // Add error handling for joinGroup events
    newSocket.on("joinGroup_error", (error: any) => {
      console.error("Failed to join group:", error);
    });

    newSocket.on("error", (error: any) => {
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
