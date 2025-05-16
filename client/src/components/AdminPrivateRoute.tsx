import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { IParents } from "../interface/parents";

interface PrivateRouteProps {
  children: JSX.Element;
}

const AdminPrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useContext(AuthContext) ?? {};
  const userAdmin = user as IParents;
  return userAdmin.isAdmin ? children : <Navigate to="/login" />;
};

export default AdminPrivateRoute;
