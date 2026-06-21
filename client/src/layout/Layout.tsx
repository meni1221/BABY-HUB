import { ReactNode } from "react";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import Main from "./main/Main";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <Main children={children} />
      <Footer />
    </>
  );
};

export default Layout;
