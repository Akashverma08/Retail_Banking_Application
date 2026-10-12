
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import {toast} from "react-toastify";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";

import type { AppDispatch } from "../../redux/store";
import { addPayeeToList } from "../../redux/payeesSlice";
import { addPayee } from "../../services/payeesService";
import type { CreatePayeePayload } from "../../types/payees";
import { payeeValidationSchema } from "@/validation/payeeValidation";

export default function AddPayee() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);

  const formik = useFormik<CreatePayeePayload>({
    initialValues: {
      name: "",
      accountNumber: "",
      ifsc: "",
      nickname: "",
    },

    validationSchema: payeeValidationSchema,

    onSubmit: async (values) => {
      try {
        setError(null);

        const payload: CreatePayeePayload = {
          name: values.name.trim(),
          accountNumber: values.accountNumber,
          ifsc: values.ifsc.trim().toUpperCase(),
          nickname: values.nickname.trim(),
        };

        const result = await addPayee(payload);

        dispatch(addPayeeToList(result));

        toast.success("Payee Add SuccessFully");

        navigate("/payees");
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to add payee"
        );
      }
    },
  });

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Add Payee
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          required
          label="Payee Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={
            formik.touched.name ? formik.errors.name : ""
          }
          margin="normal"
        />

        <TextField
          fullWidth
          required
          label="Account Number"
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
          slotProps={{
            htmlInput: { inputMode: "numeric" },
          }}
          margin="normal"
        />

        <TextField
          fullWidth
          required
          label="IFSC Code"
          name="ifsc"
          value={formik.values.ifsc}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.ifsc && Boolean(formik.errors.ifsc)}
          helperText={
            formik.touched.ifsc ? formik.errors.ifsc : ""
          }
          slotProps={{
            htmlInput: { style: { textTransform: "uppercase" } },
          }}
          margin="normal"
        />

        <TextField
          fullWidth
          required
          label="Nickname"
          name="nickname"
          value={formik.values.nickname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.nickname &&
            Boolean(formik.errors.nickname)
          }
          helperText={
            formik.touched.nickname
              ? formik.errors.nickname
              : ""
          }
          margin="normal"
        />

        <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Add Payee"
            )}
          </Button>

          <Button
            type="button"
            variant="outlined"
            onClick={() => navigate("/payees")}
            disabled={formik.isSubmitting}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
