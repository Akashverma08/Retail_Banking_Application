import { useState } from "react";
import { Box, Button, MenuItem, TextField } from "@mui/material";

export type UserFilters = {
  search: string;
  role: string;
  status: string;
};

type UserFilterProps = {
  onApply: (filters: UserFilters) => void;
};

export default function UserFilter({ onApply }: UserFilterProps) {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  const handleApply = () => {onApply({
      search: search.trim(),
      role,
      status,
    });
  };

  const handleReset = () => {
    setSearch("");
    setRole("");
    setStatus("");

    onApply({
      search: "",
      role: "",
      status: "",
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
        label="Search name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleApply();
        }}
        size="small"
      />

      <TextField
        select
        label="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        size="small"
        sx={{ minWidth: 150 }}
      >
        <MenuItem value="">All Roles</MenuItem>
        <MenuItem value="Admin">Admin</MenuItem>
        <MenuItem value="Customer">Customer</MenuItem>
      </TextField>

      <TextField
        select
        label="User Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        size="small"
        sx={{ minWidth: 160 }}
      >
        <MenuItem value="">All Statuses</MenuItem>
        <MenuItem value="active">Active</MenuItem>
        <MenuItem value="locked">Locked</MenuItem>
      </TextField>

      <Button variant="contained" onClick={handleApply}>
        Apply Filters
      </Button>

      <Button variant="outlined" onClick={handleReset}>
        Reset
      </Button>
    </Box>
  );
}