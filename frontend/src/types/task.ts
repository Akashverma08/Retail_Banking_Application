
export type Users = {
    id: string;
    name: string;
    role: string;
    isLocked: boolean;
    createdAt: string
}


export type CreateUser = {
    name: string;
    email: string;
    password: string;
    role: "Customer";
}

export type CreateAccount = {
    userId: string;
    type: "Savings" | "Current";
    balance?: number;
    currency?: string;
    dailyLimit: number;
};