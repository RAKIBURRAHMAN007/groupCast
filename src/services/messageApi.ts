/* eslint-disable @typescript-eslint/no-unused-vars */
// services/messageApi.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxiosPublic from "../hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const axiosPublic = UseAxiosPublic();

export interface Message {
  _id: string;
  content: string;
  senderId: {
    _id: string;
    name: string;
    email: string;
  };
  groupId: string;
  messageType: "text" | "image" | "file" | "system";
  createdAt: string;
  updatedAt: string;
}

export interface MessagesResponse {
  messages: Message[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalMessages: number;
    hasMore: boolean;
  };
}

// API Functions
export const getMessagesByGroup = async (
  groupId: string,
  page: number = 1,
  limit: number = 50
): Promise<MessagesResponse> => {
  const response = await axiosPublic.get(
    `/messages/${groupId}?page=${page}&limit=${limit}`
  );
  return response.data.data;
};

export const sendMessage = async (data: {
  groupId: string;
  content: string;
  messageType?: "text" | "image" | "file";
  senderEmail: string;
}): Promise<Message> => {
  const response = await axiosPublic.post("/messages/send", data);
  return response.data.data;
};

export const deleteMessage = async (
  messageId: string,
  userEmail: string
): Promise<void> => {
  await axiosPublic.delete(`/messages/${messageId}/${userEmail}`);
};

// React Query Hooks
export const useMessages = (groupId: string, page: number = 1) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["messages", groupId, page],
    queryFn: () => getMessagesByGroup(groupId, page),
    enabled: !!groupId,
    staleTime: 1000 * 60, // 1 minute stale time
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.user;

  return useMutation({
    mutationFn: (data: {
      groupId: string;
      content: string;
      messageType?: "text" | "image" | "file";
    }) =>
      sendMessage({
        ...data,
        senderEmail: currentUser?.email || "", // Automatically add senderEmail
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["messages", variables.groupId],
      });
    },
  });
};

export const useDeleteMessage = () => {
  const queryClient = useQueryClient();
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.user;

  return useMutation({
    mutationFn: (messageId: string) =>
      deleteMessage(messageId, currentUser?.email || ""),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
};
