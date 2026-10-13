import api from "./api";

export const getAdminDashboard = async () => {
  const response = await api.get("/dashboard-analytics/admin");
  return response.data;
};

export const getCustomerDashboard = async () => {
  const response = await api.get("/dashboard-analytics/customer");
  return response.data;
};