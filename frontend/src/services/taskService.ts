
import type {
    Users,
    CreateUser,
    CreateAccount,
    AccountDetails,
} from "../types/task";

import api from "./api";

export const getUsers = async (filters?: {
  search?: string;
  role?: string;
  status?: string;
}) => {
  const response = await api.get("/users", {
    params: filters,
  });

  return response.data;
};

export const createUser = async (data: CreateUser) => {
    const response = await api.post("/users", data);
    return response.data;
};

export const createAccount = async (data: CreateAccount) => {
    const response = await api.post("/accounts", data);
    return response.data;
};

export const getMyAccounts = async () => {
    const response = await api.get("/accounts/me");
    return response.data;
};

export const getMyCustomerDetails = async () => {
    const response = await api.get("/users/customer");
    return response.data;
};

export const getUserById = async (id: string): Promise<Users> => {
    const response = await api.get<Users>(`/users/${id}`);
    return response.data;
};

export const getAccountsByUserId = async (
    userId: string
): Promise<AccountDetails[]> => {
    const response = await api.get<AccountDetails[]>(
        `/accounts/user/${userId}`
    );
    return response.data;
};



export const toggleUserLock = async (id: string) => {
    const response = await api.patch(`/users/${id}/lock`);
    return response.data;
};

export const toggleFreezeAccount = async (id: string) => {
    const response = await api.patch(`/accounts/${id}/freeze`);
    return response.data;
};