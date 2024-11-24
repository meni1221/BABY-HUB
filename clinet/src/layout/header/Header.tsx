import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

export default function Header() {
  const { user, logout } = useContext(AuthContext) ?? {};

  return (
    <div>
      <header className="nav-bar">
        <div className="nav left-side">
          <Link to={"/"}>Home </Link>
          <Link to={"/about"}>About </Link>
        </div>
        <h1>BabyHub</h1>
        {!user && (
          <div className="nav right-side">
            <Link to={"/login"} id="login-header">
              Login
            </Link>
            <Link to={"/register"}> Register</Link>
          </div>
        )}

        {user && (
          <span className="nav right-side" onClick={() => logout!()}>
            <Link to={"/"}> Loguot</Link>
          </span>
        )}
      </header>
    </div>
  );
}
