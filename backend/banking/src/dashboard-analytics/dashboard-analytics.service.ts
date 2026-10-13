import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Transactions } from "../transactions/schemas/transactions.schema.js";
import { Account } from "../accounts/schemas/accounts.schema.js";
import { Users } from "../users/schemas/users.schema.js";


@Injectable()
export class DashboardAnalyticsService {

    constructor(@InjectModel(Users.name)
    private readonly usersModel: Model<Users>,
        @InjectModel(Account.name)
        private readonly accountsModel: Model<Account>,
        @InjectModel(Transactions.name)
        private readonly transactionsModel: Model<Transactions>,
    ) { }


    async getAdminDashboard() {

        const [users, accounts, recentTransactions] = await Promise.all([
            this.usersModel.aggregate([
                {
                    $match: {
                        role: "Customer",
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: {
                            $sum: 1
                        },
                        Active: {
                            $sum: {
                                $cond: [{ $eq: ["$isLocked", false] }, 1, 0]
                            }
                        },
                        Inactive: {
                            $sum: {
                                $cond: [{ $eq: ["$isLocked", true] }, 1, 0]
                            }
                        }
                    },

                },
                {
                    $project: {
                        _id: 0,
                        total: 1,
                        Active: 1,
                        Inactive: 1
                    }
                }
            ]),

            this.accountsModel.aggregate([
                {
                    $group: {
                        _id: null,
                        total: {
                            $sum: 1
                        },
                        Active: {
                            $sum: {
                                $cond: [{ $eq: ["$isFrozen", false] }, 1, 0],
                            }
                        },
                        Freeze: {
                            $sum: {
                                $cond: [{ $eq: ["$isFrozen", true] }, 1, 0]
                            }
                        },

                    },

                },
                {
                    $project: {
                        _id: 0,
                        total: 1,
                        Active: 1,
                        Freeze: 1
                    }
                }

            ]),

            this.transactionsModel.aggregate([
                {
                    $sort: {
                        createdAt: -1
                    }
                },
                {
                    $limit: 5
                },
                {
                    $project: {
                        _id: 0,
                        id: 1,
                        userId: 1,
                        accountId: 1,
                        payeeId: 1,
                        type: 1,
                        amount: 1,
                        balanceAfter: 1,
                        category: 1,
                        description: 1,
                        referenceNumber: 1

                    }
                }
            ])

        ])

        return {
            users: users[0] ?? {
                total: 0,
                Active: 0,
                Inactive: 0
            },
            accounts: accounts[0] ?? {
                total: 0,
                Active: 0,
                Freeze: 0
            },
            recentTransactions: recentTransactions

        }

    }

    async getCustomerDashboard(userId: string) {
        const [accounts, recentTransactions] = await Promise.all([
            // Customer ke accounts aur total balance
            this.accountsModel.aggregate([
                {
                    $match: {
                        userId: userId,
                    },
                },
                {
                    $group: {
                        _id: null,
                        totalAccounts: { $sum: 1 },
                        totalBalance: { $sum: "$balance" },
                        activeAccounts: {
                            $sum: {
                                $cond: [
                                    { $eq: ["$isFrozen", false] },
                                    1,
                                    0,
                                ],
                            },
                        },
                        frozenAccounts: {
                            $sum: {
                                $cond: [
                                    { $eq: ["$isFrozen", true] },
                                    1,
                                    0,
                                ],
                            },
                        },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        totalAccounts: 1,
                        totalBalance: 1,
                        activeAccounts: 1,
                        frozenAccounts: 1,
                    },
                },
            ]),

            // Customer ki latest 5 transactions
            this.transactionsModel.aggregate([
                {
                    $match: {
                        userId: userId,
                    },
                },
                {
                    $sort: {
                        createdAt: -1,
                    },
                },
                {
                    $limit: 5,
                },
                {
                    $project: {
                        _id: 0,
                        id: 1,
                        accountId: 1,
                        type: 1,
                        amount: 1,
                        balanceAfter: 1,
                        category: 1,
                        description: 1,
                        referenceNumber: 1,
                        createdAt: 1,
                    },
                },
            ]),
        ]);

        return {
            accounts: accounts[0] ?? {
                totalAccounts: 0,
                totalBalance: 0,
                activeAccounts: 0,
                frozenAccounts: 0,
            },
            recentTransactions,
        };
    }
}
