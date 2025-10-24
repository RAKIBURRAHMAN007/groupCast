/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useRealtimeMessages.ts
import { useContext, useEffect, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { SocketContext } from "../contexts/SoketContext";
import type { Message } from "../services/messageApi";

export const useRealtimeMessages = (groupId: string) => {
  const { socket } = useContext(SocketContext);
  const queryClient = useQueryClient();

  // Function to join group room
  const joinGroupRoom = useCallback(() => {
    if (socket && groupId) {
      socket.emit("joinGroup", groupId);
    }
  }, [socket, groupId]);

  // Function to leave group room
  const leaveGroupRoom = useCallback(() => {
    if (socket && groupId) {
      socket.emit("leaveGroup", groupId);
    }
  }, [socket, groupId]);

  // Handle incoming messages
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage: Message) => {
      if (newMessage.groupId === groupId) {
        // Update the messages query cache with the new message
        queryClient.setQueryData(
          ["messages", groupId, 1], // Assuming page 1 for real-time updates
          (oldData: any) => {
            if (!oldData) return oldData;

            return {
              ...oldData,
              messages: [...oldData.messages, newMessage],
              pagination: {
                ...oldData.pagination,
                totalMessages: oldData.pagination.totalMessages + 1,
              },
            };
          }
        );
      }
    };

    const handleMessageDeleted = (data: {
      messageId: string;
      groupId: string;
    }) => {
      if (data.groupId === groupId) {
        // Invalidate queries to refetch messages
        queryClient.invalidateQueries({ queryKey: ["messages", groupId] });
      }
    };

    // Listen for real-time events
    socket.on("newMessage", handleNewMessage);
    socket.on("messageDeleted", handleMessageDeleted);

    // Join the group room when component mounts
    joinGroupRoom();

    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("messageDeleted", handleMessageDeleted);
      leaveGroupRoom();
    };
  }, [socket, groupId, queryClient, joinGroupRoom, leaveGroupRoom]);

  // Function to send message via socket
  const sendRealtimeMessage = useCallback(
    (messageData: {
      groupId: string;
      content: string;
      messageType?: "text" | "image" | "file";
    }) => {
      if (socket) {
        socket.emit("sendMessage", messageData);
      }
    },
    [socket]
  );

  // Function to delete message via socket
  const deleteRealtimeMessage = useCallback(
    (messageId: string) => {
      if (socket) {
        socket.emit("deleteMessage", { messageId, groupId });
      }
    },
    [socket, groupId]
  );

  return {
    sendRealtimeMessage,
    deleteRealtimeMessage,
    joinGroupRoom,
    leaveGroupRoom,
  };
};
