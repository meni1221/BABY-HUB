import { Box, Card, SimpleGrid, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { TbShieldCheck, TbSparkles, TbUsersGroup } from "react-icons/tb";
import { useLanguage } from "../../providers/LanguageProvider/context";

const systemHighlights = [
  {
    icon: <TbUsersGroup />,
    titleKey: "systemForFamiliesTitle",
    textKey: "systemForFamiliesText",
  },
  {
    icon: <TbShieldCheck />,
    titleKey: "systemSafetyTitle",
    textKey: "systemSafetyText",
  },
  {
    icon: <TbSparkles />,
    titleKey: "systemFlowTitle",
    textKey: "systemFlowText",
  },
] as const;

const SystemInfo = () => {
  const { texts } = useLanguage();

  return (
    <Box component="section" aria-labelledby="system-info-title" mb={48}>
      <Stack gap="xs" maw={780} mb="lg">
        <Text c="babyhub" fw={800}>{texts.systemEyebrow}</Text>
        <Title id="system-info-title" order={2}>{texts.systemTitle}</Title>
        <Text c="dimmed" lh={1.75}>{texts.systemDescription}</Text>
      </Stack>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md">
        {systemHighlights.map((item) => (
          <Card component="article" key={item.titleKey} p="lg" radius="md" shadow="xs" withBorder>
            <ThemeIcon aria-hidden="true" color="babyhub" mb="md" radius="md" size={42} variant="light">
              {item.icon}
            </ThemeIcon>
            <Title order={3} size="h4">{texts[item.titleKey]}</Title>
            <Text c="dimmed" lh={1.7} mt={8}>{texts[item.textKey]}</Text>
          </Card>
        ))}
      </SimpleGrid>

      <Card mt="md" p="lg" radius="md" shadow="xs" withBorder>
        <Title order={3} size="h4">{texts.systemTermsTitle}</Title>
        <Text c="dimmed" lh={1.7} mt={8}>{texts.systemTermsText}</Text>
      </Card>
    </Box>
  );
};

export default SystemInfo;
