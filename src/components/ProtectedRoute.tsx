import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "@/context/UserContextProvider";

export const ProtectedRoute = () => {
  const { userId } = useContext(UserContext);

  if (!userId) {
    return <Navigate to="/signin" replace />;
  }
  return <Outlet />;
};