import { useState } from "react";
import { RegisterParent } from "./registerParent";
import { RegisterBaybisitter } from "./registerBaybisitter";
import PageHeader from "../../components/PageHeader";
import { useLanguage } from "../../providers/LanguageProvider";
import { TbUserHeart, TbUsers } from "react-icons/tb";

export const Register = () => {
  const [flag, setFlag] = useState("babysitter");
  const { t } = useLanguage();

  return (
    <>
      <PageHeader
        title={t("registerTitle")}
        subtitle={t("registerSubtitle")}
      />
      <div>
        <button
          className={flag === "babysitter" ? "selected" : ""}
          onClick={() => setFlag("babysitter")}
        >
          <TbUserHeart />
          {t("babysitter")}
        </button>
        <button
          className={flag === "parent" ? "selected" : ""}
          onClick={() => setFlag("parent")}
        >
          <TbUsers />
          {t("parent")}
        </button>
      </div>
      {flag === "parent" && <RegisterParent />}
      {flag === "babysitter" && <RegisterBaybisitter />}
    </>
  );
};
