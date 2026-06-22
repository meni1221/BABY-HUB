import { createContext } from "react";
import IBabysitter from "../../interface/BabySitter";
import { IParents } from "../../interface/parents";

export type AuthRole = "babysitter" | "parent";

export interface UserDTO {
  email: string;
  password: string;
}

export interface AuthContextType {
  user: IParents | IBabysitter | null;
  error: string | null;
  login: (user: UserDTO) => Promise<boolean>;
  logout: () => Promise<boolean>;
  clearError: () => void;
  role: AuthRole | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);
