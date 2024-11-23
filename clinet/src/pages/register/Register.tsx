import React, { useState } from "react";
import { RegisterParent } from "./registerParent/RegisterParent";
import { RegisterBaybisitter } from "./registerBaybisitter/RegisterBaybisitter";
import PageHeader from "../../componnets/PageHeader";

export const Register = () => {
  const [flag, setFlag] = useState("");

  return (
    <>
      <PageHeader
        title="register"
        subtitle="Welcome to the parent/babysitter registration page"
      />
      <div>
        <button onClick={() => setFlag("parent")}>register parent</button>
        <button onClick={() => setFlag("babysitter")}>
          register babysitter
        </button>
      </div>
      {flag === "parent" && <RegisterParent />}
      {flag === "babysitter" && <RegisterBaybisitter />}
    </>
  );
};
