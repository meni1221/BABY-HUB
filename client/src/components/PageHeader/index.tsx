import { Box, Text, Title } from "@mantine/core";

interface Props {
  title: string;
  subtitle: string;
}

const PageHeader = (props: Props) => {
  return (
    <Box
      component="header"
      mb="xl"
      pb="md"
      style={{ borderBottom: "1px solid var(--mantine-color-default-border)" }}
    >
      <Title order={1} size="clamp(1.85rem, 4vw, 3rem)">
        {props.title}
      </Title>
      <Text c="dimmed" mt={8} maw={760}>
        {props.subtitle}
      </Text>
    </Box>
  );
};

export default PageHeader;
