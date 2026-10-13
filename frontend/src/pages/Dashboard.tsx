import { useEffect, useState } from "react";
import { getAdminDashboard } from "../services/dashboardService";
import type { AdminDashboardData } from "../types/dashboard";

export default function Dashboard() {
    const [dashboard, setDashboard] = useState<AdminDashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const data = await getAdminDashboard();
                setDashboard(data);
            } catch {
                setError("Unable to load admin dashboard.");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    if (loading) {
        return <div className="dashboard-page">Loading dashboard...</div>;
    }

    if (error) {
        return <div className="dashboard-page">{error}</div>;
    }

    if (!dashboard) {
        return <div className="dashboard-page">No data available.</div>;
    }

    return (
        <div className="dashboard-page">
            <h1>Admin Dashboard</h1>
            <p>Welcome to the admin panel.</p>

            <div className="dashboard-cards">
                <div className="dashboard-card">
                    <h3>Total Customers</h3>
                    <h2>{dashboard.users.total}</h2>
                </div>

                <div className="dashboard-card">
                    <h3>Active Customers</h3>
                    <h2>{dashboard.users.Active}</h2>
                </div>

                <div className="dashboard-card">
                    <h3>Inactive Customers</h3>
                    <h2>{dashboard.users.Inactive}</h2>
                </div>

                <div className="dashboard-card">
                    <h3>Total Accounts</h3>
                    <h2>{dashboard.accounts.total}</h2>
                </div>

                <div className="dashboard-card">
                    <h3>Active Accounts</h3>
                    <h2>{dashboard.accounts.Active}</h2>
                </div>

                <div className="dashboard-card">
                    <h3>Frozen Accounts</h3>
                    <h2>{dashboard.accounts.Freeze}</h2>
                </div>
            </div>

            <h2>Recent Transactions</h2>

            {dashboard.recentTransactions.length === 0 ? (
                <p>No transactions found.</p>
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
                                    Reference: {transaction.referenceNumber}
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
                                ₹{Number(transaction.amount).toLocaleString("en-IN")}
                            </strong>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}