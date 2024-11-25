import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router-dom";

export default function Comment() {
  const { user } = useContext(AuthContext) ?? {};

  return (
    <>
      <div>
        {user && (
          <>
            <h1>
              {user.name}
              <Link to={"/comment"}>
                <button>+</button>
              </Link>
            </h1>
          </>
        )}
      </div>
    </>
  );
}
