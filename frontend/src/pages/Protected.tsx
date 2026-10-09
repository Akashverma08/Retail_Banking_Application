import { Navigate } from "react-router";
import type { ReactNode } from "react";

interface ProtectedProps {
  children: ReactNode;
  allowedRoles?: string[];
}

export default function Protected({
  children,
  allowedRoles,
}: ProtectedProps) {
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role ?? "")) {
    return (
      <Navigate
        to={role === "Admin" ? "/dashboard" : "/customerDashboard"}
        replace
      />
    );
  }

  return <>{children}</>;
}