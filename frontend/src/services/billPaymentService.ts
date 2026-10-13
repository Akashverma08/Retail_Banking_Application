
import api from "./api";

export interface CreateBillPayment {
  accountNumber: string;
  billerCode: string;
  consumerNumber: string;
  amount: number;
}

export interface BillPayment {
  id: string;
  userId: string;
  billerCode: string;
  consumerNumber: string;
  amount: number;
  status: "PENDING" | "SUCCESS" | "FAILED";
  refNumber: string;
  createdAt?: string;
}

export const createBillPayment = async(data: CreateBillPayment): Promise<BillPayment> => {
  const response = await api.post<{message: string;refNumber: string;payment: BillPayment;}>("/bill-payment", data);
  return response.data.payment;
};

export const getMyBillPayments = async (): Promise<BillPayment[]> => {
  const response = await api.get<BillPayment[]>("/bill-payment");
  return response.data;
};
