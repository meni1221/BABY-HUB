import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider/context";

type LoginRole = "babysitter" | "parent";

export const useLoginForm = () => {
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<LoginRole>("babysitter");

  useEffect(() => {
    return () => authContext?.clearError();
  }, [authContext]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    if (id === "email") setEmail(value);
    if (id === "password") setPassword(value);
    authContext?.clearError();
  };

  const handleRoleChange = (nextRole: LoginRole) => {
    setRole(nextRole);
    authContext?.clearError();
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    authContext?.clearError();
    await authContext?.login({ email, password }, role);
  };

  return {
    authContext,
    email,
    handleInputChange,
    handleRoleChange,
    handleSubmit,
    password,
    role,
  };
};
