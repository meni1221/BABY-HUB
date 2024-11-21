import Footer from "./footer/Footer";
import Header from "./header/Header";
import Main from "./main/Main";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <div className="app-container">
        <Header />
        <Main children={children} />
        <Footer />
      </div>
    </>
  );
}