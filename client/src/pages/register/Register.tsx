import React, { useState } from "react";
import { RegisterParent } from "./registerParent/RegisterParent";
import { RegisterBaybisitter } from "./registerBaybisitter/RegisterBaybisitter";
import PageHeader from "../../components/PageHeader";

export const Register = () => {
  const [flag, setFlag] = useState("babysitter");

  return (
    <>
      <PageHeader
        title="Register"
        subtitle="Welcome to the Registration page"
      />
      <div>
        <button
          className={flag === "babysitter" ? "selected" : ""}
          onClick={() => setFlag("babysitter")}
        >
          Babysitter
        </button>
        <button
          className={flag === "parent" ? "selected" : ""}
          onClick={() => setFlag("parent")}
        >
          Parent
        </button>
      </div>
      {flag === "parent" && <RegisterParent />}
      {flag === "babysitter" && <RegisterBaybisitter />}
    </>
  );
};
