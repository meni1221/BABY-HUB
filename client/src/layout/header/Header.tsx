import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import logo from "../../assets/logo.png";
import Cookies from "js-cookie";
import TopNavLink from "../../components/TopNavLink";
import "./style.scss";
import { REGISTER ,LOGIN, LOGOUT, HOME, ABOUT, DASHBOARD, BABYSITTERS} from "../../Constants/Text.const";


export default function Header() {
  const { user, logout } = useContext(AuthContext) ?? {};
  const [tokenRole, setTokenRole] = useState("");

  useEffect(() => {
    const role = Cookies.get("role") || "guest";
    setTokenRole(role);
  }, [user]);

  return (
    <div>
      <header className="nav-bar">
        <div className="nav left-side">
          <TopNavLink to="/">{HOME}</TopNavLink>
          <TopNavLink to="/about">{ABOUT}</TopNavLink>
          {user &&
            (tokenRole === "babysitter" ? (
              <TopNavLink to="/babysitter">{DASHBOARD}</TopNavLink>
            ) : (
              <TopNavLink to="/parent">{BABYSITTERS}</TopNavLink>
            ))}
        </div>

        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="BabyHub Logo" className="logo" />
          </Link>
        </div>

        {!user && (
          <div className="nav right-side">
            <TopNavLink to="/login">{LOGIN}</TopNavLink>
            <TopNavLink to="/register">{REGISTER}</TopNavLink>
          </div>
        )}

        {user && (
          <div className="nav right-side" onClick={() => logout!()}>
            <TopNavLink to="/">{LOGOUT}</TopNavLink>
          </div>
        )}
      </header>
    </div>
  );
}
