import { Outlet, useLocation, useNavigate, Navigate } from "react-router-dom";
import React from "react";
function MainAuth() {
  const token = localStorage.getItem("token") != null;
  return !token ? <Navigate to="/login" /> : <Outlet />;
}
export default MainAuth;
