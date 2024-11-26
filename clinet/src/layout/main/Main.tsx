import React from "react";

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
