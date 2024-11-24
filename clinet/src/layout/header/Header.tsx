import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import logo from "../../assets/logo.png";
import TopNavLink from "../../componnets/TopNavLink";
import { Link } from "react-router-dom";

export default function Header() {
  const { user, logout } = useContext(AuthContext) ?? {};

  return (
    <div>
      <header className="nav-bar">
        <div className="nav left-side">
          <TopNavLink to="/">Home</TopNavLink>
          <TopNavLink to="/about">About</TopNavLink>
        </div>

        <div className="logo-container ">
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
