import { ReactNode, useEffect, useState } from "react";
import { IParents } from "../../interface/parents";
import IBabysitter from "../../interface/BabySitter";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { API_BASE_URL } from "../../config/api";
import { logger } from "../../utils/logger";
import { useLanguage } from "../LanguageProvider/context";
import { useNotification } from "../NotificationProvider/context";
import { AuthContext, AuthRole, UserDTO } from "./context";

interface AuthResponse {
  foundUser: IParents | IBabysitter;
  role: AuthRole;
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { POST, VerifyToken } = useFetch(API_BASE_URL);
  const { texts } = useLanguage();
  const { notify } = useNotification();
  const [user, setUser] = useState<IParents | IBabysitter | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<AuthRole | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const tokenRole = Cookies.get("role");

    const handleLogout = () => {
      setUser(null);
      setRole(null);
      Cookies.remove("role");
      navigate("/login");
    };

    const verifySession = async () => {
      if (tokenRole !== "babysitter" && tokenRole !== "parent") {
        setUser(null);
        setRole(null);
        return;
      }

      try {
        const verifiedUser = await VerifyToken<IParents | IBabysitter>(tokenRole);
        setUser(verifiedUser);
        setRole(tokenRole);
      } catch (error) {
        logger.error("Token verification error", error);
        handleLogout();
      }
    };

    verifySession();
  }, [VerifyToken, navigate]);

  const clearError = () => setError(null);

  const login = async (userClient: UserDTO): Promise<boolean> => {
    try {
      clearError();

      const response = await POST<AuthResponse>("auth/login", userClient);

      if (
        !response ||
        !response.foundUser ||
        (response.role !== "babysitter" && response.role !== "parent")
      ) {
        logger.warn("Invalid login response", response);
        throw new Error("Invalid response from server");
      }

      setUser(response.foundUser);
      setRole(response.role);
      Cookies.set("role", response.role, { sameSite: "strict" });

      logger.info(`User logged in as ${response.role}`);
      notify({
        message: texts.feedbackLoginSuccessMessage,
        title: texts.feedbackLoginSuccessTitle,
        tone: "success",
      });
      navigate(`/${response.role}`);
      return true;
    } catch (error) {
      logger.error("Login error details", error);
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setError(`Login failed: ${errorMessage}`);
      notify({
        message: errorMessage,
        title: texts.feedbackLoginErrorTitle,
        tone: "error",
      });
      return false;
    }
  };

  const logout = async (): Promise<boolean> => {
    try {
      clearError();
      await POST("auth/logout");
      setUser(null);
      setRole(null);
      Cookies.remove("role");
      logger.info("User logged out");
      notify({
        message: texts.feedbackLogoutSuccessMessage,
        title: texts.feedbackLogoutSuccessTitle,
        tone: "success",
      });
      navigate("/");
      return true;
    } catch (error) {
      logger.error("Logout error details", error);
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setError(`Logout failed: ${errorMessage}`);
      notify({
        message: errorMessage,
        title: texts.feedbackLogoutErrorTitle,
        tone: "error",
      });
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, login, logout, clearError, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
