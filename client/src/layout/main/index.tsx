import { ReactNode } from "react";
import "./style.scss";

interface Props {
  children: ReactNode;
}

const Main = ({ children }: Props) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default Main;
