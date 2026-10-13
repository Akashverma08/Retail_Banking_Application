
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
    toggleUserLock,
    toggleFreezeAccount,
} from "../../services/taskService";

import type { Users, AccountDetails } from "@/types/task";

export default function EditUser() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [user, setUser] = useState<Users | null>(null);
    const [accounts, setAccounts] = useState<AccountDetails[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

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

                const [userData, accountData] = await Promise.all([
                    getUserById(id),
                    getAccountsByUserId(id),
                ]);

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


    const handleFreezeAccount = async (accountId: string) => {
        try {
            setError("");
            setSuccess("");

            const result = await toggleFreezeAccount(accountId);

            setAccounts((previousAccounts) =>
                previousAccounts.map((account) =>
                    account.id === accountId
                        ? { ...account, isFrozen: !account.isFrozen }
                        : account
                )
            );

            setSuccess(result.message);
        } catch {
            setError("Failed to update account status");
        }
    };

    const handleLockUser = async () => {
        if (!user) return;

        try {
            setSaving(true);
            setError("");
            setSuccess("");

            const result = await toggleUserLock(user.id);

            setUser((previousUser) =>
                previousUser
                    ? { ...previousUser, isLocked: !previousUser.isLocked }
                    : null
            );

            setSuccess(result.message);
        } catch {
            setError("Failed to update user status");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (error && !user) {
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
        <Box
            sx={{
                p: 3,
                width: "100%",
                maxWidth: "1200px",
                boxSizing: "border-box",
            }}
        >
            <Button onClick={() => navigate("/users")} sx={{ mb: 2 }}>
                Back to Users
            </Button>

            <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>
                Edit User
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    {success}
                </Alert>
            )}

            <Card
                sx={{
                    mb: 4,
                    width: "100%",
                    maxWidth: "850px",
                    borderRadius: 2,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
            >
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Personal Details
                    </Typography>

                    <Typography><b>Name:</b> {user.name}</Typography>
                    <Typography><b>Email:</b> {user.email}</Typography>
                    <Typography><b>Role:</b> {user.role}</Typography>

                    <Typography sx={{ mb: 2 }}>
                        <b>Status:</b> {user.isLocked ? "Locked" : "Active"}
                    </Typography>

                    <Button
                        variant="contained"
                        color={user.isLocked ? "success" : "error"}
                        disabled={saving}
                        onClick={handleLockUser}
                    >
                        {saving
                            ? "Updating..."
                            : user.isLocked
                                ? "Unlock User"
                                : "Lock User"}
                    </Button>
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
                    <Card
                        key={account.id}
                        sx={{
                            mb: 2,
                            width: "100%",
                            maxWidth: "850px",
                            borderRadius: 2,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                            transition: "box-shadow 0.2s",
                            "&:hover": {
                                boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                            },
                        }}
                    >
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

                            <Typography sx={{ mt: 1, mb: 1 }}>
                                <b>Status:</b> {account.isFrozen ? "Frozen" : "Active"}
                            </Typography>


                            <Button
                                variant="contained"
                                color={account.isFrozen ? "success" : "error"}
                                sx={{ mt: 1, textTransform: "none" }}
                                onClick={() => handleFreezeAccount(account.id)}
                            >
                                {account.isFrozen ? "Unfreeze Account" : "Freeze Account"}
                            </Button>
                        </CardContent>
                    </Card>

                ))
            )}
        </Box>
    );
}
