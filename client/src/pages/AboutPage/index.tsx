import { Avatar, Box, Card, Group, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import miki from "../../assets/miki.png";
import meni from "../../assets/meni.png";
import eliya from "../../assets/eliya.png";
import { useLanguage } from "../../providers/LanguageProvider/context";
import SystemInfo from "../../components/SystemInfo";

const developers = [
  { name: "Miki", image: miki },
  { name: "Meni", image: meni },
  { name: "Eliya", image: eliya },
];

const AboutPage = () => {
  const { texts } = useLanguage();

  return (
    <Stack gap={48}>
      <SystemInfo />

      <Box component="section" aria-labelledby="developers-title">
        <Stack gap={6} mb="md">
          <Text c="babyhub" fw={800} fz="sm">
            {texts.aboutSubtitle}
          </Text>
          <Title id="developers-title" order={2} size="h3">
            {texts.aboutTitle}
          </Title>
        </Stack>

        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
          {developers.map((dev) => (
            <Card component="article" key={dev.name} p="md" radius="lg" shadow="xs" withBorder>
              <Group gap="md" wrap="nowrap">
                <Avatar
                  src={dev.image}
                  alt={dev.name}
                  radius="xl"
                  size={68}
                  styles={{ image: { objectPosition: "top center" } }}
                />
                <Stack gap={2}>
                  <Title order={3} size="h4">
                    {dev.name}
                  </Title>
                  <Text c="dimmed" fz="sm">
                    {texts.developerRole}
                  </Text>
                </Stack>
              </Group>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </Stack>
  );
};

export default AboutPage;
