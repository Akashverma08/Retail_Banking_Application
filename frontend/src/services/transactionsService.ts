import api from "./api";
import type{Transaction} from "../types/transactions"

export interface TransferPayload {
  accountNumber: string;
  payeeId: string;
  amount: number;
  description?: string;
  category?: string;
}

export interface TransferResponse {
  message: string;
  referenceNumber: string;
  transactions: unknown[];
}

export const transferMoney = async (
  payload: TransferPayload
): Promise<TransferResponse> => {
  const response = await api.post<TransferResponse>(
    "/transactions",
    payload
  );

  return response.data;
};


export const getTransactions = async (): Promise<Transaction[]> => {
  const response = await api.get<Transaction[]>("/transactions");
  return response.data;
};

export const getAllTransactions = async (): Promise<Transaction[]> => {
  const response = await api.get<Transaction[]>("/transactions/admin");
  return response.data;
};