import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider/context";

export const useLoginForm = () => {
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    return () => authContext?.clearError();
  }, [authContext]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    if (id === "email") setEmail(value);
    if (id === "password") setPassword(value);
    authContext?.clearError();
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    authContext?.clearError();
    await authContext?.login({ email, password });
  };

  return {
    authContext,
    email,
    handleInputChange,
    handleSubmit,
    password,
  };
};
