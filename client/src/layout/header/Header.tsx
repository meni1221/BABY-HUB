import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import logo from "../../assets/logo.png";
import Cookies from "js-cookie";
import TopNavLink from "../../components/TopNavLink";
import { useLanguage } from "../../providers/LanguageProvider";
import {
  TbHome,
  TbInfoCircle,
  TbLanguage,
  TbLayoutDashboard,
  TbLogin2,
  TbLogout,
  TbUserHeart,
  TbUserPlus,
} from "react-icons/tb";
import "./style.scss";

const Header = () => {
  const { user, logout } = useContext(AuthContext) ?? {};
  const { t, toggleLanguage } = useLanguage();
  const [tokenRole, setTokenRole] = useState("");

  useEffect(() => {
    const role = Cookies.get("role") || "guest";
    setTokenRole(role);
  }, [user]);

  return (
    <div>
      <header className="nav-bar">
        <div className="nav left-side">
          <TopNavLink to="/">
            <TbHome />
            {t("navHome")}
          </TopNavLink>
          <TopNavLink to="/about">
            <TbInfoCircle />
            {t("navAbout")}
          </TopNavLink>
          {user &&
            (tokenRole === "babysitter" ? (
              <TopNavLink to="/babysitter">
                <TbLayoutDashboard />
                {t("navDashboard")}
              </TopNavLink>
            ) : (
              <TopNavLink to="/parent">
                <TbUserHeart />
                {t("navBabysitters")}
              </TopNavLink>
            ))}
        </div>

        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="BabyHub Logo" className="logo" />
          </Link>
        </div>

        {!user && (
          <div className="nav right-side">
            <TopNavLink to="/login">
              <TbLogin2 />
              {t("navLogin")}
            </TopNavLink>
            <TopNavLink to="/register">
              <TbUserPlus />
              {t("navRegister")}
            </TopNavLink>
          </div>
        )}

        {user && (
          <div className="nav right-side" onClick={() => logout!()}>
            <TopNavLink to="/">
              <TbLogout />
              {t("navLogout")}
            </TopNavLink>
          </div>
        )}

        <button
          className="language-toggle"
          type="button"
          onClick={toggleLanguage}
          aria-label="Toggle language"
        >
          <TbLanguage />
          {t("languageToggle")}
        </button>
      </header>
    </div>
  );
};

export default Header;
