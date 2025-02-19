import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import PageHeader from "../components/PageHeader";
import TopNavLink from "../components/TopNavLink";

export const LoginPage = () => {
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentURL, setCurrentURL] = useState("babysitter");
  useEffect(() => {
    return () => {
      authContext!.clearError();
    };
  }, []);

  if (!authContext) {
    return <p>Error: User context is not available.</p>;
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
      <PageHeader title="Login" subtitle="Welcome to the Login page" />
      <div>
        <button
          onClick={() => handleURLChange("babysitter")}
          className={currentURL === "babysitter" ? "selected" : ""}
        >
          Babysitter
        </button>
        <button
          onClick={() => handleURLChange("parent")}
          className={currentURL === "parent" ? "selected" : ""}
        >
          Parent
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="login-form"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Please enter an email"
            value={email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Please enter a password"
            value={password}
            onChange={handleInputChange}
            required
          />
        </div>

        {authContext.error && (
          <div className="error-message">{authContext.error}</div>
        )}

        <button type="submit">Login</button>
      </form>

      <div style={{ marginTop: "10px", textAlign: "center" }}>
        <p>
          If you are not registered yet, please{" "}
          <TopNavLink to="/register">register here</TopNavLink>
        </p>
      </div>
    </>
  );
};
