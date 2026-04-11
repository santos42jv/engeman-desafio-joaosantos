import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";

type ProtectedRouteProps = {
  roles: string[];
};

export const ProtectedRoute = ({ roles }: ProtectedRouteProps) => {
  const { isAuthenticated, user, isLoadingUser } = useUser();

  if (isLoadingUser) return null;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};