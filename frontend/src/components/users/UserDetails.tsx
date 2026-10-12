
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";

import {
  getUserById,
  getAccountsByUserId,
} from "../../services/taskService";

import type { Users, AccountDetails } from "@/types/task";

export default function UserDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [user, setUser] = useState<Users | null>(null);
  const [accounts, setAccounts] = useState<AccountDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("User ID is missing");
      setLoading(false);
      return;
    }

    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const [userData, accountData] = await Promise.all([getUserById(id),getAccountsByUserId(id),]);

        setUser(userData);
        setAccounts(accountData);
      } catch {
        setError("Failed to fetch user details or accounts");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
        <Button onClick={() => navigate("/users")} sx={{ mt: 2 }}>
          Back to Users
        </Button>
      </Box>
    );
  }

  if (!user) {
    return <Alert severity="info">User not found</Alert>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Button onClick={() => navigate("/users")} sx={{ mb: 2 }}>
        Back to Users
      </Button>

      <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>
        User Profile
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Personal Details
          </Typography>

          <Typography><b>Name:</b> {user.name}</Typography>
          <Typography><b>Role:</b> {user.role}</Typography>
          <Typography>
            <b>Status:</b> {user.isLocked ? "Locked" : "Active"}
          </Typography>
        </CardContent>
      </Card>

      <Typography variant="h5" sx={{ fontWeight: 700 }} gutterBottom>
        User Accounts
      </Typography>

      {accounts.length === 0 ? (
        <Alert severity="info">
          No accounts found for this user.
        </Alert>
      ) : (
        accounts.map((account) => (
          <Card key={account.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">
                {account.type} Account
              </Typography>

              <Typography>
                <b>Account Number:</b>{" "}
                {account.maskedNumber ?? account.accountNumber}
              </Typography>

              <Typography variant="h5" sx={{ my: 1 }}>
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: account.currency || "INR",
                }).format(account.balance)}
              </Typography>

              <Typography>
                <b>Status:</b>{" "}
                {account.isFrozen ? "Frozen" : "Active"}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}
