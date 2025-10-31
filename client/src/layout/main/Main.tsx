import React from "react";
import "./style.scss";

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
