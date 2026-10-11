
import { useState, useEffect } from "react";
import { getMyAccounts } from "../services/taskService";


type Account = {
  id: string;
  type: string;
  accountNumber: string;
  maskedNumber: string;
  balance: number;
  currency: string;
  dailyLimit: number;
};

export default function MyAccount() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getMyAccounts();
        console.log("My Accounts:", result);

        setAccounts(result);
      } catch (err) {
        console.error("Error fetching accounts:", err);
        setError("Unable to load your accounts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  if (loading) {
    return (
      <div className="my-account-page">
        <p className="account-message">Loading your accounts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-account-page">
        <p className="account-error">{error}</p>
        <button
          className="retry-button"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="my-account-page">
      <h1>My Accounts</h1>
      <p className="account-subtitle">
        View your account details and balances.
      </p>

      {accounts.length === 0 ? (
        <p className="account-message">No accounts found.</p>
      ) : (
        <div className="my-account-list">
          {accounts.map((acc) => (
            <div className="my-account-card" key={acc.id}>
              <div className="account-card-header">
                <h2>{acc.type} Account</h2>
                <span className="account-badge">{acc.currency}</span>
              </div>

              <p className="masked-number">{acc.accountNumber}</p>

              <div className="account-balance">
                <span>Available Balance</span>
                <h3>
                  {acc.currency}{" "}
                  {Number(acc.balance).toLocaleString("en-IN")}
                </h3>
              </div>

              <div className="account-details">
                <p>
                  <span>Account Number</span>
                  <strong>{acc.maskedNumber}</strong>
                </p>

                <p>
                  <span>Account Type</span>
                  <strong>{acc.type}</strong>
                </p>

                <p>
                  <span>Daily Limit</span>
                  <strong>
                    {acc.currency}{" "}
                    {Number(acc.dailyLimit).toLocaleString("en-IN")}
                  </strong>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
