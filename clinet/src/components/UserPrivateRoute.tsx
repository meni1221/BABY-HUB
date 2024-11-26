import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRouteUser: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useContext(AuthContext) ?? {};
  return user ? children : <Navigate to="/parent" />;
};

export default PrivateRouteUser;
