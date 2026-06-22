import { Avatar, Card, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { useParams } from "react-router-dom";
import CommentRegister from "../../components/CommentRegister";
import { useLanguage } from "../../providers/LanguageProvider/context";
import EmptyState from "../../components/EmptyState";
import PageSection from "../../components/PageSection";
import { useBabysitterDetails } from "../../hooks/useBabysitterDetails";

const DisplayBabisitterPage = () => {
  const { id } = useParams();
  const { texts } = useLanguage();
  const { babysitter } = useBabysitterDetails(id);

  return (
    <>
      {babysitter ? (
        <Stack gap={48}>
          <PageSection
            id="babysitter-details"
            title={babysitter.name}
            subtitle={babysitter.about}
          >
            <Card p="xl" radius="lg" shadow="xs" withBorder>
              <Stack align="center">
                <Avatar
                  src={babysitter.image || "default-avatar.jpg"}
                  alt={`${babysitter.name}'s avatar`}
                  radius="xl"
                  size={144}
                />

                <Title order={3} size="h3">{babysitter.name}</Title>
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm" w="100%">
                  {[
                    [texts.age, babysitter.age],
                    [texts.location, babysitter.address],
                    [texts.preferences, babysitter.preferences],
                    [texts.experience, babysitter.experience],
                    [texts.price, babysitter.price],
                    [texts.likes, babysitter.likes],
                  ].map(([label, value]) => (
                    <Card key={String(label)} p="sm" radius="md" withBorder>
                      <Text c="dimmed" fw={700} size="sm">{label}</Text>
                      <Text>{value}</Text>
                    </Card>
                  ))}
                </SimpleGrid>
              </Stack>
            </Card>
          </PageSection>

          <PageSection
            id="babysitter-contact"
            title={texts.contact}
            subtitle={texts.expectations}
          >
            <CommentRegister id={babysitter._id!} />
          </PageSection>
        </Stack>
      ) : (
        <EmptyState title={texts.noUsers} message={texts.noBabysittersHelper} />
      )}
    </>
  );
};

export default DisplayBabisitterPage;
