
import { useEffect, useState } from "react";
import {
    Alert,
    Box,
    Chip,
    CircularProgress,
    Paper,
    Typography,
} from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

import { getTransactions } from "../services/transactionsService";
import type { Transaction } from "../types/transactions";

export default function MyTransactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getTransactions();
                setTransactions(data);
            } catch {
                setError("Unable to load transactions. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    const columns: GridColDef<Transaction>[] = [
        {
            field: "type",
            headerName: "Transaction Type",
            minWidth: 130,
            flex: 1,
            renderCell: (params) => (
                <Chip
                    label={
                        params.row.type === "debit"
                            ? "Money Sent"
                            : "Money Received"
                    }
                    color={params.row.type === "debit" ? "error" : "success"}
                    size="small"
                    variant="outlined"
                />
            ),
        },
        {
            field: "amount",
            headerName: "Amount",
            minWidth: 120,
            flex: 0.8,
            renderCell: (params) => (
                <Typography
                    sx={{ fontWeight: 600 }}
                    color={params.row.type === "debit" ? "error.main" : "success.main"}
                >
                    {params.row.type === "debit" ? "−" : "+"}
                    {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                        maximumFractionDigits: 2,
                    }).format(params.row.amount)}
                </Typography>
            ),
        },
        {
            field: "description",
            headerName: "Description",
            minWidth: 180,
            flex: 1,
            valueGetter: (_value, row) =>
                row.description || "Money Transfer",
        },
        {
            field: "category",
            headerName: "Category",
            minWidth: 120,
            flex: 0.7,
            valueGetter: (_value, row) => row.category || "Transfer",
        },
        {
            field: "referenceNumber",
            headerName: "Reference No.",
            minWidth: 160,
            flex: 1,
        },
        {
            field: "balanceAfter",
            headerName: "Balance After",
            minWidth: 130,
            flex: 0.9,
            valueFormatter: (value) =>
                value == null
                    ? "-"
                    : new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                        maximumFractionDigits: 2,
                    }).format(Number(value)),
        },
        {
            field: "createdAt",
            headerName: "Date & Time",
            minWidth: 180,
            flex: 1.2,
            sortable:false,
            valueFormatter: (value) =>
                value && !Number.isNaN(Date.parse(String(value)))
                    ? new Date(String(value)).toLocaleString("en-IN")
                    : "-",
        }
    ];

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                p: { xs: 1, md: 3 },
                width: "100%",
                minWidth: 0,
                boxSizing: "border-box",
                overflowX: "hidden",
            }}
        >
            <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>
                My Transactions
            </Typography>

            <Typography color="text.secondary" sx={{ mb: 3 }}>
                Track your money transfers and received payments.
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {!error && transactions.length === 0 && (
                <Alert severity="info" sx={{ mb: 2 }}>
                    No transactions found yet.
                </Alert>
            )}

            <Paper
                elevation={2}
                sx={{
                    p: { xs: 1, sm: 2 },
                    borderRadius: 3,
                    width: "100%",
                    minWidth: 0,
                    maxWidth: "100%",
                    boxSizing: "border-box",
                }}
            >
                <DataGrid
                    rows={transactions}
                    columns={columns}
                    getRowId={(row) => row.id ?? row._id ?? row.referenceNumber}
                    autoHeight
                    pageSizeOptions={[5, 10, 25]}
                    initialState={{
                        sorting: {
                            sortModel: [{ field: "createdAt", sort: "desc" }],
                        },
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    disableRowSelectionOnClick
                    sx={{
                        width: "100%",
                        border: 0,
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: "action.hover",
                        },
                        "& .MuiDataGrid-cell": {
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                        },
                    }}
                />
            </Paper>
        </Box>
    );
}
