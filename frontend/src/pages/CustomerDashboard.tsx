import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getCustomerDashboard } from "@/services/dashboardService";
import type { CustomerDashboardData } from "../types/dashboard";

export default function CustomerDashboard() {
    const [dashboard, setDashboard] =
        useState<CustomerDashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const data = await getCustomerDashboard();
                setDashboard(data);
            } catch {
                setError("Unable to load dashboard data.");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    if (loading) {
        return <div className="content">Loading dashboard...</div>;
    }

    if (error) {
        return <div className="content">{error}</div>;
    }

    if (!dashboard) {
        return <div className="content">No dashboard data available.</div>;
    }

    const formatAmount = (amount: number) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 2,
        }).format(amount);

    return (
        <div className="content">
            <h1 className="page-title">Customer Dashboard</h1>
            <p>Welcome to your banking dashboard.</p>

            <div className="dashboard-cards">
                <div className="dashboard-card">
                    <h3>Total Balance</h3>
                    <h2>{formatAmount(dashboard.accounts.totalBalance)}</h2>
                </div>

                <div className="dashboard-card">
                    <h3>My Accounts</h3>
                    <h2>{dashboard.accounts.totalAccounts}</h2>
                </div>

                <div className="dashboard-card">
                    <h3>Active Accounts</h3>
                    <h2>{dashboard.accounts.activeAccounts}</h2>
                </div>

                <div className="dashboard-card">
                    <h3>Frozen Accounts</h3>
                    <h2>{dashboard.accounts.frozenAccounts}</h2>
                </div>
            </div>

            <h2>Quick Actions</h2>

            <div className="customer-options">
                <Link to="/my-accounts">My Accounts</Link>
                <Link to="/my-transactions">My Transactions</Link>
                <Link to="/transfer">Transfer Money</Link>
                <Link to="/payees">Manage Payees</Link>
                <Link to="/bills">Pay Bills</Link>
            </div>

            <h2>Recent Transactions</h2>

            {dashboard.recentTransactions.length === 0 ? (
                <p>No transactions found yet.</p>
            ) : (
                <div className="recent-transactions">
                    {dashboard.recentTransactions.map((transaction) => (
                        <div
                            className="transaction-item"
                            key={transaction.id ?? transaction.referenceNumber}
                        >
                            <div>
                                <h4>
                                    {transaction.description ||
                                        transaction.category ||
                                        "Transaction"}
                                </h4>

                                <p>
                                    {transaction.createdAt
                                        ? new Date(
                                              transaction.createdAt
                                          ).toLocaleString("en-IN")
                                        : transaction.referenceNumber}
                                </p>
                            </div>

                            <strong
                                className={
                                    transaction.type === "debit"
                                        ? "debit"
                                        : "credit"
                                }
                            >
                                {transaction.type === "debit" ? "−" : "+"}
                                {formatAmount(Number(transaction.amount))}
                            </strong>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}