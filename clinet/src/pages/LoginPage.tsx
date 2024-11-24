import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

export const LoginPage = () => {
  const userContext = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [courentURL, setCourentURL] = useState("babysitter");

  useEffect(() => {
    console.log(courentURL);
  }, [courentURL]);

  const handleSubmit = async (e: React.FormEvent) => {
    if (!userContext) {
      return <p>Error: User context is not available.</p>;
    }

    e.preventDefault();
    console.log("TAKTAKTAK" + courentURL);

    userContext.login({ email, password }, courentURL);
    setError(" ");
  };

  return (
    <>
      <div>
        <button
          onClick={() => setCourentURL("babysitter")}
          className={courentURL === "babysitter" ? "selected" : ""}
        >
          login babysitter
        </button>
        <button
          onClick={() => setCourentURL("parent")}
          className={courentURL === "parent" ? "selected" : ""}
        >
          login parent
        </button>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">אימייל</label>
          <input
            id="email"
            type="email"
            placeholder="Please enter an email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">סיסמה</label>
          <input
            id="password"
            type="password"
            placeholder="Please enter a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit">Login</button>
      </form>
    </>
  );
};
