import { useContext, useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { AuthContext } from "../../providers/AuthProvider/context";
import { useLanguage } from "../../providers/LanguageProvider/context";

export const useHeaderState = () => {
  const { user, logout } = useContext(AuthContext) ?? {};
  const { texts, toggleLanguage } = useLanguage();
  const [role, setRole] = useState("guest");

  useEffect(() => {
    setRole(Cookies.get("role") || "guest");
  }, [user]);

  const dashboardLink = useMemo(() => {
    if (!user) return null;

    return role === "babysitter"
      ? { label: texts.navDashboard, to: "/babysitter", type: "babysitter" }
      : { label: texts.navBabysitters, to: "/parent", type: "parent" };
  }, [role, texts, user]);

  return {
    dashboardLink,
    isAuthenticated: Boolean(user),
    logout,
    texts,
    toggleLanguage,
  };
};
