import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

export default function Comment() {
  const { user } = useContext(AuthContext) ?? {};

  return (
    <>
      <div>{}</div>
    </>
  );
}
