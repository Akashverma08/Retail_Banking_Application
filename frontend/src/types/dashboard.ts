import type { Transaction } from "./transactions";

export interface AdminDashboardData {
    users: {
        total: number;
        Active?: number;
        Inactive: number;
    };
    accounts: {
        total: number;
        Active: number;
        Freeze: number;
    };
    recentTransactions: Transaction[];
}

export interface CustomerDashboardData {
    accounts: {
        totalAccounts: number;
        totalBalance: number;
        activeAccounts: number;
        frozenAccounts: number;
    };
    recentTransactions: Transaction[];
}