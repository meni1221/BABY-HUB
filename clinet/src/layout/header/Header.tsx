import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

export default function Header() {
  const {user,logout} = useContext(AuthContext) ??{}


  
  return (
    <div>
      <header className="nav-bar">
        <div className="home-about">
          <Link to={"/"}>Home </Link>
          <Link to={"/about"}>About </Link>
        </div>1
        <h1>Hello from header</h1>
        {!user &&
        <div className="login-register">
          <Link to={"/login"} id="login-header">
            Login
          </Link>
          <Link to={"/register"}> Register</Link>
        </div>
}{
  user &&  <span onClick={ ()=> logout!()}><Link to={"/"}> Register</Link></span>
}
      </header>
    </div>
  );
}
