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
        <h1>Hello from main</h1>
        {children}
        <Register />
        <LoginPage />
      </main>
    </>
  );
}
