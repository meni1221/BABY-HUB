import { createContext, ReactNode, useEffect, useState } from "react";
import { IParents } from "../interface/parents";
import IBabysitter from "../interface/BabySitter";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

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

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { POST, VerifyToken } = useFetch("http://localhost:7700");
  const [user, setUser] = useState<IParents | IBabysitter | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("auth_token");
    const tokenRole = Cookies.get("role");

    const verifyAndLogin = async () => {
      if (token) {
        try {
          const decodedToken = await VerifyToken();
          if (!decodedToken?.user?.email || !decodedToken?.user?.password) {
            throw new Error("Invalid token data");
          }

          const { email, password } = decodedToken.user;
          let success = false;

          try {
            const loginPath =
              tokenRole === "babysitter" ? "babysitter" : "parent";
            success = await login({ email, password }, loginPath);
          } catch (loginError) {
            console.error("Login error:", loginError);
            success = false;
          }

          if (!success) {
            handleLogout();
          }
        } catch (error) {
          console.error("Token verification error:", error);
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

      // בניית ה-URL הנכון
      let endpoint = "auth/login";
      if (urlPath) {
        endpoint += `/${urlPath}`;
      }

      const response = await POST(endpoint, userClient);

      if (!response || !response.foundUser) {
        console.error("Invalid response:", response);
        throw new Error("Invalid response from server");
      }

      setUser(response.foundUser);

      // עדכון הקוקיז
      const role = urlPath === "babysitter" ? "babysitter" : "parent";
      Cookies.set("role", role);

      // ניווט
      navigate(`${urlPath}`);
      return true;
    } catch (error) {
      console.error("Login error details:", error);
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
      navigate("/");
      return true;
    } catch (error) {
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
}
