
export interface Transaction {
  id?: string;
  _id?: string;
  userId: string;
  accountId: string;
  payeeId?: string;
  type: "debit" | "credit";
  amount: number;
  balanceAfter: number;
  description?: string;
  category?: string;
  referenceNumber: string;
  createdAt: string;
}
