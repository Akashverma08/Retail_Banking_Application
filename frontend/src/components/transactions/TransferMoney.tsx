
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import { getPayees } from "../../services/payeesService";
import {
  transferMoney,
  type TransferResponse,
} from "../../services/transactionsService";
import type { Payee } from "../../types/payees";
import { transferValidationSchema } from "@/validation/transferValidation";

export default function TransferMoney() {
  const navigate = useNavigate();

  const [payees, setPayees] = useState<Payee[]>([]);
  const [loadingPayees, setLoadingPayees] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<TransferResponse | null>(null);

  useEffect(() => {
    const fetchPayees = async () => {
      try {
        setError(null);
        const result = await getPayees();
        setPayees(result);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load payees"
        );
      } finally {
        setLoadingPayees(false);
      }
    };

    fetchPayees();
  }, []);

  const formik = useFormik({
    initialValues: {
      accountNumber: "",
      payeeId: "",
      amount: "",
      description: "Money Transfer",
      category: "transfer",
    },

    validationSchema: transferValidationSchema,

    onSubmit: async (values) => {
      try {
        setError(null);
        setSuccess(null);

        const result = await transferMoney({
          accountNumber: values.accountNumber.trim(),
          payeeId: values.payeeId,
          amount: Number(values.amount),
          description: values.description.trim() || "Money Transfer",
          category: values.category,
        });

        setSuccess(result);
        formik.resetForm();
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Transfer failed"
        );
      }
    },
  });

  if (loadingPayees) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Transfer Money
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>
            {success.message}
          </Typography>
          <Typography variant="body2">
            Reference Number: {success.referenceNumber}
          </Typography>
        </Alert>
      )}

      {payees.filter((payee) => payee.isVerified).length === 0 && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          No verified payees available. Please add and verify a payee first.
        </Alert>
      )}

      <Box component="form" onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          required
          label="Your Account Number"
          name="accountNumber"
          value={formik.values.accountNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.accountNumber &&
            Boolean(formik.errors.accountNumber)
          }
          helperText={
            formik.touched.accountNumber
              ? formik.errors.accountNumber
              : ""
          }
          margin="normal"
        />

        <TextField
          select
          fullWidth
          required
          label="Select Payee"
          name="payeeId"
          value={formik.values.payeeId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.payeeId &&
            Boolean(formik.errors.payeeId)
          }
          helperText={
            formik.touched.payeeId
              ? formik.errors.payeeId
              : "Only verified payees can receive transfers"
          }
          margin="normal"
        >
          {payees
            .filter((payee) => payee.isVerified)
            .map((payee) => (
              <MenuItem key={payee.id} value={payee.id}>
                {payee.name} — {payee.accountNumber}
              </MenuItem>
            ))}
        </TextField>

        <TextField
          fullWidth
          required
          type="number"
          label="Amount"
          name="amount"
          value={formik.values.amount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.amount &&
            Boolean(formik.errors.amount)
          }
          helperText={
            formik.touched.amount ? formik.errors.amount : ""
          }
          slotProps={{
            htmlInput: { min: 0, step: "0.01" },
          }}
          margin="normal"
        />

        <TextField
          select
          fullWidth
          required
          label="Category"
          name="category"
          value={formik.values.category}
          onChange={formik.handleChange}
          margin="normal"
        >
          <MenuItem value="transfer">Transfer</MenuItem>
          <MenuItem value="bills">Bills</MenuItem>
          <MenuItem value="shopping">Shopping</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </TextField>

        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description &&
            Boolean(formik.errors.description)
          }
          helperText={
            formik.touched.description
              ? formik.errors.description
              : ""
          }
          margin="normal"
        />

        <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            disabled={
              formik.isSubmitting ||
              payees.every((payee) => !payee.isVerified)
            }
          >
            {formik.isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Transfer Money"
            )}
          </Button>

          <Button
            type="button"
            variant="outlined"
            onClick={() => navigate("/payees")}
            disabled={formik.isSubmitting}
          >
            Back to Payees
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
