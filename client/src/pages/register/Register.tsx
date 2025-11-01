import { useState } from "react";
import { RegisterParent } from "./registerParent/RegisterParent";
import { RegisterBaybisitter } from "./registerBaybisitter/RegisterBaybisitter";
import PageHeader from "../../components/PageHeader";
import { BABYSITTER, PARENT, REGISTER } from "../../Constants/Text.const";

export const Register = () => {
  const [flag, setFlag] = useState("babysitter");

  return (
    <>
      <PageHeader title={REGISTER} subtitle="ברוכים הבאים לדף ההרשמה" />
      <div>
        <button
          className={flag === "babysitter" ? "selected" : ""}
          onClick={() => setFlag("babysitter")}
        >
          {BABYSITTER}
        </button>
        <button
          className={flag === "parent" ? "selected" : ""}
          onClick={() => setFlag("parent")}
        >
          {PARENT}
        </button>
      </div>
      {flag === "parent" && <RegisterParent />}
      {flag === "babysitter" && <RegisterBaybisitter />}
    </>
  );
};
