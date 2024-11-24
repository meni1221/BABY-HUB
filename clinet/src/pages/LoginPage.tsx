import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [flag, setFlag] = useState(false);
  const [endpoint, setEndpoint] = useState("");

  const [Choice, setChoice] = useState("parents");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const navigate = useNavigate();

  const chooseURL = (endpointFromClient: string) => {
    setFlag(true);
    if (endpointFromClient === "/login/babysitter") {
      setEndpoint(endpointFromClient);
      console.log(endpointFromClient);
      return;
    }
    setEndpoint("/login/parent");
    console.log(endpoint);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
  };

  return (
    <>
      <div>
        <button onClick={() => chooseURL("/babysitter/login")}>
          login babysitter
        </button>
        <button onClick={() => chooseURL("/parent/login")}>login parent</button>
      </div>
      {flag && (
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
              placeholder="Please enter an password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit">Login</button>
        </form>
      )}
    </>
  );
};
