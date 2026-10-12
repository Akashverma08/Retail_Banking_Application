import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Alert, CircularProgress, Box, Typography } from "@mui/material";

import { getAllAccounts } from "../services/accountsServices";
import type { Account } from "../types/accounts";
import type { AppDispatch, RootState } from "../redux/store";
import { setAccounts } from "../redux/accountsSlice";

const columns: GridColDef<Account>[] = [
  {
    field: "maskedNumber",
    headerName: "Account Number",
    flex: 1,
    minWidth: 170,
  },
  {
    field: "type",
    headerName: "Account Type",
    flex: 1,
    minWidth: 130,
  },
  {
    field: "balance",
    headerName: "Balance",
    flex: 1,
    minWidth: 130,
    valueGetter: (_value, row) =>
      `${row.currency} ${row.balance}`,
  },
  {
    field: "dailyLimit",
    headerName: "Daily Limit",
    flex: 1,
    minWidth: 130,
    valueGetter: (_value, row) =>
      `${row.currency} ${row.dailyLimit}`,
  },
  {
    field: "isFrozen",
    headerName: "Status",
    flex: 1,
    minWidth: 120,
    valueGetter: (_value, row) =>
      row.isFrozen ? "Frozen" : "Active",
  },
];

export default function AccountList() {
  const dispatch = useDispatch<AppDispatch>();

  const accounts = useSelector((state: RootState) => state.accounts.accounts);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setLoading(true);
        setError(null);

        const result: Account[] = await getAllAccounts();
        dispatch(setAccounts(result));
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch accounts"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, [dispatch]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        All Accounts
      </Typography>

      <DataGrid
        rows={accounts}
        columns={columns}
        getRowId={(row) => row.id}
        autoHeight
        pageSizeOptions={[5, 10, 25]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
              page: 0,
            },
          },
        }}
        disableRowSelectionOnClick
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            fontWeight: "bold",
          },
        }}
      />
    </Box>
  );
}