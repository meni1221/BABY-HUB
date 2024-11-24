import React, { Children } from "react";
import { Register } from "../../pages/register/Register";
import { LoginPage } from "../../pages/LoginPage";
import { BaybisitterHomePage } from "../../pages/BaybisitterHomePage";
import { EditBabysitter } from "../../componnets/EditBabysitter";

interface Props {
  children: React.ReactNode;
}

export default function Main({ children }: Props) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
