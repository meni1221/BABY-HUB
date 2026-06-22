import { Container } from "@mantine/core";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Main = ({ children }: Props) => {
  return (
    <Container
      component="main"
      id="main-content"
      maw={1180}
      px={{ base: "md", sm: "xl" }}
      pt={{ base: "xl", sm: 40 }}
      pb={{ base: 104, sm: 40 }}
      tabIndex={-1}
    >
      {children}
    </Container>
  );
};

export default Main;
