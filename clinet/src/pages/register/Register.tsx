import React, { useState } from "react";
import { RegisterParent } from "./registerParent/RegisterParent";
import { RegisterBaybisitter } from "./registerBaybisitter/RegisterBaybisitter";

export const Register = () => {
  const [flag, setFlag] = useState("");
  const togel = (register: string) => {
    if (register === "parent") {
      <RegisterParent />;
    } else {
      <RegisterBaybisitter />;
    }
  };
  return (
    <>
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
