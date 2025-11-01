import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import logo from "../../assets/logo.png";
import Cookies from "js-cookie";
import TopNavLink from "../../components/TopNavLink";
import "./style.scss";


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
          <TopNavLink to="/">Home</TopNavLink>
          <TopNavLink to="/about">About</TopNavLink>
          {user &&
            (tokenRole === "babysitter" ? (
              <TopNavLink to="/babysitter">Dashboard</TopNavLink>
            ) : (
              <TopNavLink to="/parent">Babysitters</TopNavLink>
            ))}
        </div>

        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="BabyHub Logo" className="logo" />
          </Link>
        </div>

        {!user && (
          <div className="nav right-side">
            <TopNavLink to="/login">Login</TopNavLink>
            <TopNavLink to="/register">Register</TopNavLink>
          </div>
        )}

        {user && (
          <div className="nav right-side" onClick={() => logout!()}>
            <TopNavLink to="/">Logout</TopNavLink>
          </div>
        )}
      </header>
    </div>
  );
}
