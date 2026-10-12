export interface Account {
  userId: string;
  type: string;
  accountNumber: string;
  maskedNumber: string;
  balance: number;
  currency: string;
  dailyLimit: number;
  isFrozen: boolean;
  createdById: string;
  id: string;
}