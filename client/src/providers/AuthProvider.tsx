import { createContext, ReactNode, useEffect, useState } from "react";
import { IParents } from "../interface/parents";
import IBabysitter from "../interface/BabySitter";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { API_BASE_URL } from "../config/api";
import { logger } from "../utils/logger";

interface UserDTO {
  email: string;
  password: string;
}

interface AuthContextType {
  user: IParents | IBabysitter | null;
  error: string | null;
  login: (user: UserDTO, urlPath: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  clearError: () => void;
}

interface AuthResponse {
  foundUser: IParents | IBabysitter;
  token: string;
}

interface VerifyTokenResponse {
  user: UserDTO;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { POST, VerifyToken } = useFetch(API_BASE_URL);
  const [user, setUser] = useState<IParents | IBabysitter | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("auth_token");
    const tokenRole = Cookies.get("role");

    const verifyAndLogin = async () => {
      if (token) {
        try {
          const loginPath = tokenRole === "babysitter" ? "babysitter" : "parent";
          const decodedToken = await VerifyToken<VerifyTokenResponse>(
            loginPath
          );
          if (!decodedToken?.user?.email || !decodedToken?.user?.password) {
            throw new Error("Invalid token data");
          }

          const { email, password } = decodedToken.user;
          let success = false;
          try {
            success = await login({ email, password }, loginPath);
          } catch (loginError) {
            logger.error("Login error during token restore", loginError);
            success = false;
          }

          if (!success) {
            handleLogout();
          }
        } catch (error) {
          logger.error("Token verification error", error);
          handleLogout();
        }
      } else {
        setUser(null);
      }
    };

    const handleLogout = () => {
      setUser(null);
      Cookies.remove("auth_token");
      Cookies.remove("role");
      navigate("/login");
    };

    verifyAndLogin();
  }, []);

  const clearError = () => setError(null);

  const login = async (
    userClient: UserDTO,
    urlPath: string
  ): Promise<boolean> => {
    try {
      clearError();

      let endpoint = "auth/login";
      if (urlPath) {
        endpoint += `/${urlPath}`;
      }

      const response = await POST<AuthResponse>(endpoint, userClient);

      if (!response || !response.foundUser) {
        logger.warn("Invalid login response", response);
        throw new Error("Invalid response from server");
      }

      setUser(response.foundUser);

      const role = urlPath === "babysitter" ? "babysitter" : "parent";
      Cookies.set("role", role);

      logger.info(`User logged in as ${role}`);
      navigate(`${urlPath}`);
      return true;
    } catch (error) {
      logger.error("Login error details", error);
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setError(`Login failed: ${errorMessage}`);
      return false;
    }
  };

  const logout = async (): Promise<boolean> => {
    try {
      clearError();
      await POST("auth/logout");
      setUser(null);
      Cookies.remove("auth_token");
      Cookies.remove("role");
      logger.info("User logged out");
      navigate("/");
      return true;
    } catch (error) {
      logger.error("Logout error details", error);
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setError(`Logout failed: ${errorMessage}`);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, login, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
