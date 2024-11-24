import React, { useState } from "react";
import { RegisterParent } from "./registerParent/RegisterParent";
import { RegisterBaybisitter } from "./registerBaybisitter/RegisterBaybisitter";
import PageHeader from "../../componnets/PageHeader";

export const Register = () => {
  const [flag, setFlag] = useState("babysitter");

  return (
    <>
      <PageHeader
        title="register"
        subtitle="Welcome to the parent/babysitter registration page"
      />
      <div>
        <button
          className={flag === "babysitter" ? "selected" : ""}
          onClick={() => setFlag("babysitter")}
        >
          register babysitter
        </button>
        <button
          className={flag === "parent" ? "selected" : ""}
          onClick={() => setFlag("parent")}
        >
          register parent
        </button>
      </div>
      {flag === "parent" && <RegisterParent />}
      {flag === "babysitter" && <RegisterBaybisitter />}
    </>
  );
};
