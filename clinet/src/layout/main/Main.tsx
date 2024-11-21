import React, { Children } from "react";

interface Props {
  children: React.ReactNode;
}

export default function Main({ children }: Props) {
  return (
    <>
      <main>
        <h1>Hello from main</h1>
        {children}
      </main>
    </>
  );
}
