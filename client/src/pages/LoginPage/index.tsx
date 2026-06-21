import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import PageHeader from "../../components/PageHeader";
import TopNavLink from "../../components/TopNavLink";
import { useLanguage } from "../../providers/LanguageProvider";
import { TbLogin2, TbUserHeart, TbUsers } from "react-icons/tb";
import "./style.scss";

export const LoginPage = () => {
  const authContext = useContext(AuthContext);
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentURL, setCurrentURL] = useState("babysitter");
  useEffect(() => {
    return () => {
      authContext!.clearError();
    };
  }, []);

  if (!authContext) {
    return <p>{t("authContextUnavailable")}</p>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    authContext.clearError();
    await authContext.login({ email, password }, currentURL);
  };

  const handleURLChange = (url: string) => {
    setCurrentURL(url);
    authContext.clearError();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "email") setEmail(value);
    if (id === "password") setPassword(value);
    authContext.clearError();
  };

  return (
    <>
      <PageHeader title={t("loginTitle")} subtitle={t("loginSubtitle")} />
      <div className="login-page__switcher">
        <button
          onClick={() => handleURLChange("babysitter")}
          className={currentURL === "babysitter" ? "selected" : ""}
        >
          <TbUserHeart />
          {t("babysitter")}
        </button>
        <button
          onClick={() => handleURLChange("parent")}
          className={currentURL === "parent" ? "selected" : ""}
        >
          <TbUsers />
          {t("parent")}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">{t("email")}</label>
          <input
            id="email"
            type="email"
            placeholder={t("emailPlaceholder")}
            value={email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">{t("password")}</label>
          <input
            id="password"
            type="password"
            placeholder={t("passwordPlaceholder")}
            value={password}
            onChange={handleInputChange}
            required
          />
        </div>

        {authContext.error && (
          <div className="error-message">{authContext.error}</div>
        )}

        <button type="submit">
          <TbLogin2 />
          {t("loginSubmit")}
        </button>
      </form>

      <div className="login-page__register">
        <p>
          {t("loginNoAccount")}{" "}
          <TopNavLink to="/register">{t("loginRegisterLink")}</TopNavLink>
        </p>
      </div>
    </>
  );
};
