import { Box, Container, Text } from "@mantine/core";
import { useLanguage } from "../../providers/LanguageProvider/context";

const Footer = () => {
  const { texts } = useLanguage();

  return (
    <Box
      component="footer"
      py="lg"
      style={{ borderTop: "1px solid var(--mantine-color-default-border)" }}
    >
      <Container maw={1180} px={{ base: "md", sm: "xl" }}>
        <Text c="dimmed" ta="center">
          © {new Date().getFullYear()} {texts.footerRights}
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;
