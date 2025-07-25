import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RedirectIfAuth = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Navigate to='/dashboard' />
  ) : (
    children
  );
};

export default RedirectIfAuth;
