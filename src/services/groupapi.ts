// ============================================
// FILE 1: services/groupApi.ts
// ============================================
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxiosPublic from "../hooks/useAxiosPublic";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

const axiosPublic = UseAxiosPublic();

export interface Group {
  _id: string;
  name: string;
  description: string;
  members: Array<{
    userId: string;
    role: string;
    joinedAt: string;
  }>;
  isPrivate: boolean;
  inviteCode: string;
  createdAt: string;
  updatedAt: string;
}

// API functions
export const getUserGroups = async (email: string): Promise<Group[]> => {
  const response = await axiosPublic.get(`/groups/my-groups/${email}`);
  return response.data.data;
};

export const createGroup = async (
  data: { name: string; description: string; isPrivate: boolean },
  email: string
): Promise<Group> => {
  const response = await axiosPublic.post(`/groups/create/${email}`, data);
  return response.data.data;
};

export const getGroupById = async (groupId: string): Promise<Group> => {
  const response = await axiosPublic.get(`/groups/${groupId}`);
  return response.data.data;
};

export const joinGroupByCode = async (
  inviteCode: string,
  email: string
): Promise<Group> => {
  const response = await axiosPublic.post(`/groups/join/${email}`, {
    inviteCode,
  });
  return response.data.data;
};

export const updateGroup = async (
  groupId: string,
  data: Partial<Group>,
  email: string
): Promise<Group> => {
  const response = await axiosPublic.put(
    `/groups/update/${groupId}/${email}`,
    data
  );
  return response.data.data;
};

export const deleteGroup = async (
  groupId: string,
  email: string
): Promise<void> => {
  await axiosPublic.delete(`/groups/delete/${groupId}/${email}`);
};

export const addMember = async (
  groupId: string,
  memberEmail: string,
  role: string,
  adminEmail: string
): Promise<Group> => {
  const response = await axiosPublic.post(
    `/groups/${groupId}/members/${adminEmail}`,
    { memberEmail, role }
  );
  return response.data.data;
};

export const removeMember = async (
  groupId: string,
  memberEmail: string,
  adminEmail: string
): Promise<Group> => {
  const response = await axiosPublic.delete(
    `/groups/${groupId}/members/${memberEmail}/${adminEmail}`
  );
  return response.data.data;
};

export const updateMemberRole = async (
  groupId: string,
  memberEmail: string,
  role: string,
  adminEmail: string
): Promise<Group> => {
  const response = await axiosPublic.patch(
    `/groups/${groupId}/members/${memberEmail}/${adminEmail}/role`,
    { role }
  );
  return response.data.data;
};

export const regenerateInviteCode = async (
  groupId: string,
  adminEmail: string
): Promise<Group> => {
  const response = await axiosPublic.post(
    `/groups/${groupId}/regenerate-invite/${adminEmail}`
  );
  return response.data.data;
};

// React Query hooks
export const useUserGroups = () => {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["groups", user?.email],
    queryFn: () => getUserGroups(user?.email || ""),
    enabled: !!user?.email,
  });

  return {
    data: data || [],
    isLoading,
    isError,
    refetch,
  };
};

export const useCreateGroup = () => {
  const queryClient = useQueryClient();
  const authContext = useContext(AuthContext);
  const user = authContext?.user;

  return useMutation({
    mutationFn: (data: {
      name: string;
      description: string;
      isPrivate: boolean;
    }) => createGroup(data, user?.email || ""),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
};

export const useJoinGroup = () => {
  const queryClient = useQueryClient();
  const authContext = useContext(AuthContext);
  const user = authContext?.user;

  return useMutation({
    mutationFn: (inviteCode: string) =>
      joinGroupByCode(inviteCode, user?.email || ""),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
};

export const useUpdateGroup = () => {
  const queryClient = useQueryClient();
  const authContext = useContext(AuthContext);
  const user = authContext?.user;

  return useMutation({
    mutationFn: ({
      groupId,
      data,
    }: {
      groupId: string;
      data: Partial<Group>;
    }) => updateGroup(groupId, data, user?.email || ""),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
};

export const useDeleteGroup = () => {
  const queryClient = useQueryClient();
  const authContext = useContext(AuthContext);
  const user = authContext?.user;

  return useMutation({
    mutationFn: (groupId: string) => deleteGroup(groupId, user?.email || ""),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
};

export const useAddMember = () => {
  const queryClient = useQueryClient();
  const authContext = useContext(AuthContext);
  const user = authContext?.user;

  return useMutation({
    mutationFn: ({
      groupId,
      memberEmail,
      role = "member",
    }: {
      groupId: string;
      memberEmail: string;
      role?: string;
    }) => addMember(groupId, memberEmail, role, user?.email || ""),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
};

export const useRemoveMember = () => {
  const queryClient = useQueryClient();
  const authContext = useContext(AuthContext);
  const user = authContext?.user;

  return useMutation({
    mutationFn: ({
      groupId,
      memberEmail,
    }: {
      groupId: string;
      memberEmail: string;
    }) => removeMember(groupId, memberEmail, user?.email || ""),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
};

export const useUpdateMemberRole = () => {
  const queryClient = useQueryClient();
  const authContext = useContext(AuthContext);
  const user = authContext?.user;

  return useMutation({
    mutationFn: ({
      groupId,
      memberEmail,
      role,
    }: {
      groupId: string;
      memberEmail: string;
      role: string;
    }) => updateMemberRole(groupId, memberEmail, role, user?.email || ""),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
};

export const useRegenerateInviteCode = () => {
  const queryClient = useQueryClient();
  const authContext = useContext(AuthContext);
  const user = authContext?.user;

  return useMutation({
    mutationFn: (groupId: string) =>
      regenerateInviteCode(groupId, user?.email || ""),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
};
// Add this to your services/groupApi.ts file
export const useGroupById = (groupId: string) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["group", groupId],
    queryFn: () => getGroupById(groupId),
    enabled: !!groupId,
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
};
