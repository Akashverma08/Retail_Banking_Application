import api from "./api";
import type { Payee, CreatePayeePayload } from "../types/payees";

export const getPayees = async (): Promise<Payee[]> => {
  const response = await api.get<Payee[]>("/payees");
  return response.data;
};

export const addPayee = async ( payload: CreatePayeePayload): Promise<Payee> => {
  const response = await api.post<Payee>("/payees", payload);
  return response.data;
};

export const getPayeeById = async (id: string): Promise<Payee> => {
  const response = await api.get<Payee>(`/payees/${id}`);
  return response.data;
};

export const updatePayee = async (id: string,payload: Partial<CreatePayeePayload>): Promise<Payee> => {
  const response = await api.patch<Payee>(`/payees/${id}`, payload);
  return response.data;
};

export const deletePayee = async (id: string): Promise<void> => {
  await api.delete(`/payees/${id}`);
};