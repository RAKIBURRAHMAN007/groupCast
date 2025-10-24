// services/messageApi.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxiosPublic from "../hooks/useAxiosPublic";

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

// API Functions - FIXED to work with email
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
}): Promise<Message> => {
  // Remove senderEmail from here - backend should get it from auth
  const response = await axiosPublic.post("/messages/send", data);
  return response.data.data;
};

export const deleteMessage = async (messageId: string): Promise<void> => {
  // Remove userEmail from here - backend should get it from auth
  await axiosPublic.delete(`/messages/${messageId}`);
};

// React Query Hooks - FIXED
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

  return useMutation({
    mutationFn: (data: {
      groupId: string;
      content: string;
      messageType?: "text" | "image" | "file";
    }) => sendMessage(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["messages", variables.groupId],
      });
    },
  });
};

export const useDeleteMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (messageId: string) => deleteMessage(messageId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
};
