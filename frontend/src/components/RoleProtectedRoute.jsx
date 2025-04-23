import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function RoleProtectedRoute({ allowedRoles }) {
  const { loading, isAuthenticated, user } = useAuth();

  if (loading) return <h1>Loading...</h1>;

  if (!loading && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Verificar si el usuario tiene el rol necesario
  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export default RoleProtectedRoute;
