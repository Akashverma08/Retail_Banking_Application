import { Route, Routes, useLocation, Navigate } from "react-router";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Protected from "./pages/Protected";
import SignUp from "./pages/SignUp";
import AuthRoute from "./pages/AuthRoute";
import TaskList from "./pages/TaskList";
import CustomerDashboard from "./pages/CustomerDashboard";
import CreateAccount from "./pages/CreateAccount";
import MyAccount from "./pages/MyAccount";
import AccountList from "./pages/AccountList";
import PayeesList from "./pages/PayeesList";
import AddPayee from "./components/payees/AddPayee";
import EditPayee from "./components/payees/EditPayee";
import ViewPayee from "./components/payees/ViewPayee";
import TransferMoney from "./components/transactions/TransferMoney";
import MyTransactions from "./components/transactions/MyTransactions";
import AdminTransactions from "./components/transactions/AdminTransactions";
import UserDetails from "./components/users/UserDetails";

export default function App() {


  const location = useLocation();
  const isLoginPage = location.pathname === "/login" || location.pathname === "/signup";


  return (
    <div className="app">

      <Navbar />

      <div className="layout">

        {!isLoginPage && <Sidebar />}

        <Routes>
          <Route
            path="/login"
            element={<AuthRoute><Login /></AuthRoute>}
          />

          <Route
            path="/signup"
            element={<Protected allowedRoles={["Admin"]}>
              <SignUp />
            </Protected>}
          />

          <Route
            path="/dashboard"
            element={<Protected allowedRoles={["Admin"]}>
              <Dashboard />
            </Protected>}
          />

          <Route
            path="/accounts"
            element={<Protected allowedRoles={["Admin"]}>
              <AccountList />
            </Protected>}
          />

          <Route
            path="/customerDashboard"
            element={<Protected allowedRoles={["Customer"]}>
              <CustomerDashboard />
            </Protected>}
          />

          <Route
            path="/my-accounts"
            element={<Protected allowedRoles={["Customer"]}>
              <MyAccount />
            </Protected>}
          />

          <Route
            path="/payees"
            element={<Protected allowedRoles={["Customer"]}>
              <PayeesList />
            </Protected>}
          />

          <Route
            path="/payees/create"
            element={
              <Protected allowedRoles={["Customer"]}>
                <AddPayee />
              </Protected>
            }
          />

          <Route
            path="/transfer"
            element={
              <Protected allowedRoles={["Customer"]}>
                <TransferMoney />
              </Protected>
            }
          />

          <Route
            path="/my-transactions"
            element={
              <Protected allowedRoles={["Customer"]}>
                <MyTransactions />
              </Protected>
            }
          />

          <Route
            path="/payees/edit/:id"
            element={
              <Protected allowedRoles={["Customer"]}>
                <EditPayee />
              </Protected>
            }
          />

          <Route
            path="/payees/:id"
            element={
              <Protected allowedRoles={["Customer"]}>
                <ViewPayee />
              </Protected>
            }
          />

          <Route
            path="/transactions"
            element={
              <Protected allowedRoles={["Admin"]}>
                <AdminTransactions />
              </Protected>
            }
          />

          <Route
            path="/users"
            element={<Protected allowedRoles={["Admin"]}>
              <TaskList />
            </Protected>}
          />

          <Route
            path="/users/:id"
            element={<Protected allowedRoles={["Admin"]}>
              <UserDetails/>
            </Protected>}
          />

          <Route path="/accounts/create" element={
            <Protected allowedRoles={["Admin"]}>
              <CreateAccount />
            </Protected>} />


          <Route
            path="/"
            element={
              <Protected>
                {localStorage.getItem("role") === "Admin" ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Navigate to="/customer-dashboard" replace />
                )}
              </Protected>
            }
          />
        </Routes>

      </div>

      {!isLoginPage && <Footer />}



    </div>
  );
}