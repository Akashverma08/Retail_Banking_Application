
import type {
  Users,
  CreateUser,
  CreateAccount,
  AccountDetails,
} from "../types/task";

import api from "./api";

export const getUsers = async (): Promise<Users[]> => {
  const response = await api.get<Users[]>("/users");
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
