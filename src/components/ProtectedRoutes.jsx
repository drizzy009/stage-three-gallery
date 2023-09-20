/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { UserAuth } from "../contexts/AuthContext";

const ProtectedRoutes = ({ children }) => {
  const { user } = UserAuth();

  if (!user) {
    alert("You're not authenticated")
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoutes;