
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";

import { getPayeeById } from "../../services/payeesService";
import type { Payee } from "../../types/payees";

export default function ViewPayee() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [payee, setPayee] = useState<Payee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPayee = async () => {
      if (!id) {
        setError("Payee ID is missing");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const result = await getPayeeById(id);
        setPayee(result);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch payee details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPayee();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!payee) {
    return <Alert severity="warning">Payee not found</Alert>;
  }

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4, p: 2 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Payee Details
      </Typography>

      <Paper elevation={2} sx={{ p: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              ID
            </Typography>
            <Typography>{payee.id}</Typography>
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary">
              Name
            </Typography>
            <Typography>{payee.name}</Typography>
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary">
              Payee Account Number
            </Typography>
            <Typography>{payee.accountNumber}</Typography>
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary">
              IFSC Code
            </Typography>
            <Typography>{payee.ifsc}</Typography>
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary">
              Verified
            </Typography>
            <Typography>
              {payee.isVerified ? "Verified" : "Pending"}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 2, mt: 4, flexWrap: "wrap" }}>
          <Button
            variant="contained"
            onClick={() => navigate(`/payees/edit/${payee.id}`)}
          >
            Edit
          </Button>

          <Button
            variant="contained"
            color="success"
            onClick={() => navigate("/transfer", {
              state: { payeeId: payee.id },
            })}
          >
            Transfer Money
          </Button>

          <Button
            variant="outlined"
            onClick={() => navigate("/payees")}
          >
            Back to Payees
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}