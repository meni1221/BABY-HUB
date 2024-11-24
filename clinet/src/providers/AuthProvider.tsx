import { createContext, ReactNode, useState } from "react";
import { IParents } from "../interface/parents";
import IBabysitter from "../interface/BabySitter";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

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
  const { POST } = useFetch("http://localhost:7700");
  const [user, setUser] = useState<IParents | IBabysitter | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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
