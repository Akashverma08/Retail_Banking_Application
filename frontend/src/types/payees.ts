export interface Payee {
  id: string;
  userId: string;
  name: string;
  accountNumber: string;
  ifsc: string;
  isVerified: boolean;
  nickname?: string;
}

export interface CreatePayeePayload {
  name: string;
  accountNumber: string;
  ifsc: string;
  nickname: string;
}