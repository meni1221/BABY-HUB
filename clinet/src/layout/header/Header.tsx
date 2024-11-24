import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <h1>Hello from header</h1>
      <header className="nav-bar">
        <div className="home-about">
          <Link to={"/"}>Home </Link>
          <Link to={"/about"}>About </Link>
        </div>
        <div className="login-register">
          <Link to={"/login"} id="login-header">Login</Link>
          <Link to={"/register"}> Register</Link>
        </div>
      </header>
    </div>
  );
}
