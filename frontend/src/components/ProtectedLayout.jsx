import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedLayout = () => {
  const { isAuthenticated } = useAuth();

  // Redirect to sign-in if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  // Render child routes (protected components)
  return <Outlet />;
};

export default ProtectedLayout;
