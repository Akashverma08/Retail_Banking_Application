
import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

import { getAllTransactions } from "../../services/transactionsService";
import type { Transaction } from "../../types/transactions";

export default function AdminTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getAllTransactions();
        setTransactions(data);
      } catch {
        setError("Failed to load transactions.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const columns: GridColDef<Transaction>[] = [
    {
      field: "referenceNumber",
      headerName: "Reference Number",
      minWidth: 210,
      flex: 1.2,
    },
    {
      field: "userId",
      headerName: "Customer ID",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "accountId",
      headerName: "Account ID",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "type",
      headerName: "Type",
      minWidth: 120,
      renderCell: (params) => (
        <Typography
          sx={{
            fontWeight: 600,
            color:
              params.row.type === "debit"
                ? "error.main"
                : "success.main",
          }}
        >
          {params.row.type === "debit" ? "Debit" : "Credit"}
        </Typography>
      ),
    },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 140,
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
      field: "category",
      headerName: "Category",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "description",
      headerName: "Description",
      minWidth: 180,
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Date & Time",
      minWidth: 190,
      valueFormatter: (value) =>
        value && !Number.isNaN(Date.parse(String(value)))
          ? new Date(String(value)).toLocaleString("en-IN")
          : "-",
    },
  ];

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 1, md: 3 }, width: "100%" }}>
      <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>
        All Transactions
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Monitor transactions across all customers.
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Paper elevation={2} sx={{ p: 2, borderRadius: 3 }}>
        <DataGrid
          rows={transactions}
          columns={columns}
          getRowId={(row) =>
            row.id ?? row._id ?? row.referenceNumber
          }
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
        />
      </Paper>
    </Box>
  );
}
