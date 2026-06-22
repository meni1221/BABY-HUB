import { Card, Group, Stack, Text, Title } from "@mantine/core";
import PageHeader from "../../components/PageHeader";
import { Link } from "react-router-dom";
import { TbArrowRight } from "react-icons/tb";
import { useLanguage } from "../../providers/LanguageProvider/context";
import Button from "../../components/Button";
import PageSection from "../../components/PageSection";

const HomePage = () => {
  const { texts } = useLanguage();

  return (
    <>
      <PageHeader
        title={texts.homeTitle}
        subtitle={texts.homeSubtitle}
      />

      <PageSection
        id="home-start"
        title={texts.homeCtaTitle}
        subtitle={texts.homeCtaText}
      >
        <Card p="xl" radius="lg" shadow="xs" withBorder>
          <Group justify="space-between" align="center" gap="lg">
            <Stack gap={4}>
              <Title order={3} size="h4">
                {texts.homeCtaTitle}
              </Title>
              <Text c="dimmed">{texts.homeCtaText}</Text>
            </Stack>
            <Button component={Link} to="/login">
              {texts.homeCtaButton}
              <TbArrowRight />
            </Button>
          </Group>
        </Card>
      </PageSection>
    </>
  );
};

export default HomePage;
