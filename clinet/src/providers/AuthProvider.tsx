import { createContext, ReactNode, useState } from "react";
import { IParents } from "../interface/parents";
import IBabysitter from "../interface/BabySitter";

interface AuthContextType {
  user: IParents | IBabysitter | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IParents | IBabysitter | null>(null);
  const [error, setError] = useState<string | null>(null);

  // -----------LOGIN-----------
  const login = async () => {};

  // -----------LOGUOT-----------
  const logout = async () => {};

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
