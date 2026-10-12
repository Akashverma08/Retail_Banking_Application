import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

import type { AppDispatch, RootState } from "../redux/store";
import { setPayees, removePayeeFromList } from "../redux/payeesSlice";
import { getPayees, deletePayee } from "../services/payeesService";
import type { Payee } from "../types/payees";

export default function PayeesList() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const payees = useSelector((state: RootState) => state.payees.payees);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPayees = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await getPayees();
        dispatch(setPayees(result));
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch payees"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPayees();
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this payee?");

    if (!confirmed) return;

    try {
      await deletePayee(id);
      dispatch(removePayeeFromList(id));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete payee"
      );
    }
  };

  const columns: GridColDef<Payee>[] = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 130,
      flex: 1,
    },
    {
      field: "accountNumber",
      headerName: "Payee Account Number",
      minWidth: 160,
      flex: 1,
    },
    {
      field: "ifsc",
      headerName: "IFSC Code",
      minWidth: 140,
      flex: 1,
    },
    {
      field: "isVerified",
      headerName: "Verified",
      minWidth: 110,
      valueGetter: (_value, row) =>
        row.isVerified ? "Verified" : "Pending",
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 240,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1, alignItems: "center", height: "100%" }}>
          <Button
            size="small"
            onClick={() => navigate(`/payees/${params.row.id}`)}
          >
            View
          </Button>

          <Button
            size="small"
            onClick={() => navigate(`/payees/edit/${params.row.id}`)}
          >
            Edit
          </Button>

          <Button
            size="small"
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5">Manage Payees</Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/payees/create")}
        >
          Add Payee
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <DataGrid
        rows={payees}
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
      />
    </Box>
  );
}
