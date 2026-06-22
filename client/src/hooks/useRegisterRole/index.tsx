import { useState } from "react";

export type RegisterRole = "babysitter" | "parent";

export const useRegisterRole = () => {
  const [role, setRole] = useState<RegisterRole>("babysitter");

  return { role, setRole };
};
