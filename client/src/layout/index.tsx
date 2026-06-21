import { ReactNode } from "react";
import Footer from "./footer";
import Header from "./header";
import Main from "./main";

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
