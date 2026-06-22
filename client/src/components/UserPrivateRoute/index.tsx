import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext, AuthRole } from "../../providers/AuthProvider/context";
interface PrivateRouteProps {
  children: ReactNode;
  requiredRole?: AuthRole;
}

const PrivateRouteUser = ({ children, requiredRole }: PrivateRouteProps) => {
  const authContext = useContext(AuthContext);

  if (!authContext?.user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && authContext.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRouteUser;
