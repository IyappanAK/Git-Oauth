import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function LoginRoute() {
  const token = localStorage.getItem("token");
  console.log("token from Login", token);

  useEffect(() => {
    if (!token) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [token]);

  return <>{!token ? <Outlet /> : <Navigate to="/home" />}</>;
}
