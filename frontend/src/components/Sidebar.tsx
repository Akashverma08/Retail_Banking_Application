import { Link, useNavigate } from "react-router";

export default function Sidebar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <aside className="sidebar">


      {role === "Admin" && (
        <>
          <Link to="/dashboard"><h3>Dashboard</h3></Link>
          <Link to="/users"><h3>User List</h3></Link>
          <Link to="/accounts/create"><h3>Create User</h3></Link>
          <Link to="/accounts"><h3>Accounts</h3></Link>
          <Link to="/transactions"><h3>Transactions</h3></Link>
        </>
      )}

      {role === "Customer" && (
        <>
          <Link to="/customerDashboard"><h3>Dashboard</h3></Link>
          <Link to="/my-accounts"><h3>My Accounts</h3></Link>
          <Link to="/my-transactions"><h3>My Transactions</h3></Link>
          <Link to="/transfer"><h3>Transfer Money</h3></Link>
          <Link to="/payees"><h3>Manage Payees</h3></Link>
          <Link to="/bills"><h3>Pay Bills</h3></Link>
        </>
      )}

      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}