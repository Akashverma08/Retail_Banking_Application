import { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  TextField,
} from "@mui/material";

export type TransactionFilters = {
  search: string;
  type: string;
  category: string;
  fromDate: string;
  toDate: string;
};

type Props = {
  onApply: (filters: TransactionFilters) => void;
};

export default function TransactionFilter({ onApply }: Props) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleApply = () => {
    onApply({
      search: search.trim(),
      type,
      category,
      fromDate,
      toDate,
    });
  };

  const handleReset = () => {
    setSearch("");
    setType("");
    setCategory("");
    setFromDate("");
    setToDate("");

    onApply({
      search: "",
      type: "",
      category: "",
      fromDate: "",
      toDate: "",
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        mb: 3,
        alignItems: "center",
      }}
    >
      <TextField
        label="Reference Number"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        size="small"
      />

      <TextField
        select
        label="Transaction Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        size="small"
        sx={{ minWidth: 150 }}
      >
        <MenuItem value="">All Types</MenuItem>
        <MenuItem value="debit">Debit</MenuItem>
        <MenuItem value="credit">Credit</MenuItem>
      </TextField>

      <TextField
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        size="small"
      />

      <TextField
        label="From Date"
        type="date"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
        size="small"
        slotProps={{ inputLabel: { shrink: true } }}
      />

      <TextField
        label="To Date"
        type="date"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
        size="small"
        slotProps={{ inputLabel: { shrink: true } }}
      />

      <Button variant="contained" onClick={handleApply}>
        Apply Filters
      </Button>

      <Button variant="outlined" onClick={handleReset}>
        Reset
      </Button>
    </Box>
  );
}