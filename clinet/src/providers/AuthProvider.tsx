import { createContext, ReactNode, useEffect, useState } from "react";
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
  login: (user: UserDTO, urlPath: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { POST } = useFetch("http://localhost:7700");
  const [user, setUser] = useState<IParents | IBabysitter | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(error);
  }, [error]);

  // -----------LOGIN-----------
  const login = async (
    userClient: UserDTO,
    urlPath: string
  ): Promise<boolean> => {
    try {
      const userData = await POST(`auth/login/${urlPath}`, userClient);

      setUser(userData.foundUser);
      navigate(`/${urlPath}`);
      return true;
    } catch (error) {
      setError(`Login failed. Please try again ${error}`);
      return false;
    }
  };

  // -----------LOGUOT-----------
  const logout = async (): Promise<boolean> => {
    try {
      const userData = await POST("auth/logout");
      setError(userData.foundUser);
      setUser(null);
      return true;
    } catch (error) {
      setError(`Logout failed. Please try again ${error}`);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
