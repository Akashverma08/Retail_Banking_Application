
import { useEffect, useState } from "react";
import type { Users } from "../types/task";
import { getUsers } from "../services/taskService";
import type { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { setUsers } from "../redux/userSlice";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { Link } from "react-router";
import UserFilter from "@/components/UserFilter";
import type { UserFilters } from "@/components/UserFilter";

const emptyFilters: UserFilters = {
  search: "",
  role: "",
  status: "",
};

export default function TaskList() {
  const dispatch = useDispatch<AppDispatch>();

  const [users, setUserRows] = useState<Users[]>([]);
  const [filters, setFilters] = useState<UserFilters>(emptyFilters);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const fetchedUsers = await getUsers(filters);

        setUserRows(fetchedUsers);
        dispatch(setUsers(fetchedUsers));
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [filters, dispatch]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1.2, minWidth: 130 },
    { field: "name", headerName: "Name", flex: 1, minWidth: 110 },
    { field: "email", headerName: "Email", flex: 1.5, minWidth: 170 },
    { field: "role", headerName: "Role", flex: 0.7, minWidth: 90 },
    {
      field: "isLocked",
      headerName: "Locked",
      flex: 0.7,
      minWidth: 90,
      renderCell: (params) => (params.value ? "Yes" : "No"),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1.2,
      minWidth: 150,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 190,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <Link to={`/users/${params.row.id}`}>
            <Button variant="outlined" size="small">
              View
            </Button>
          </Link>

          <Link to={`/users/edit/${params.row.id}`}>
            <Button variant="contained" size="small">
              Edit
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="content">
      <h1 className="page-title">User List</h1>

      <UserFilter onApply={setFilters} />

      <div className="table-container">
        <DataGrid
          rows={users}
          columns={columns}
          getRowId={(row) => row.id}
          loading={loading}
          pageSizeOptions={[10, 20, 30]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
                page: 0,
              },
            },
          }}
          autoHeight
        />
      </div>
    </div>
  );
}
