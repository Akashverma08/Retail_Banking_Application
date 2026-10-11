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
            path="/customerDashboard"
            element={<Protected allowedRoles={["Customer"]}>
              <CustomerDashboard />
            </Protected>}
          />

          <Route
            path="/my-accounts"
            element={<Protected allowedRoles={["Customer"]}>
              <MyAccount/>
            </Protected>}
          />

          <Route
            path="/users"
            element={<Protected allowedRoles={["Admin"]}>
              <TaskList />
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