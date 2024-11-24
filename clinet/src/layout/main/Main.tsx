import React, { Children } from "react";
import { Register } from "../../pages/register/Register";
import { LoginPage } from "../../pages/LoginPage";

interface Props {
  children: React.ReactNode;
}

export default function Main({ children }: Props) {
  return (
    <>
      <main>
        {children}
        {/* <h1>Hello from main</h1> */}
        {/* <Register /> */}
        {/* <LoginPage /> */}
      </main>
    </>
  );
}
