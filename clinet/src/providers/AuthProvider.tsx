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
    console.log("1", token); // מציג את הטוקן

    const verifyAndLogin = async () => {
      if (token) {
        try {
          const decodedToken = await VerifyToken();
          console.log("Decoded Token:", decodedToken);

          const { email, password } = decodedToken.user;
          console.log(email, password);

          if (email && password) {
            const success = await login({ email, password }, "babysitter");

            if (!success) {
              setUser(null);
              Cookies.remove("auth_token");
              navigate("/login");
            }
          } else {
            Cookies.remove("auth_token");
            navigate("/");
          }
        } catch (error) {
          console.error("Error during token verification or login:", error);
          setUser(null);
          Cookies.remove("authToken");
          navigate("/login");
        }
      } else {
        setUser(null);
      }
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
      const userData = await POST(`auth/login/${urlPath}`, userClient);

      if (!userData || !userData.foundUser) {
        throw new Error("Invalid response from server");
      }

      setUser(userData.foundUser);
      navigate(`/${urlPath}`);
      return true;
    } catch (error) {
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
