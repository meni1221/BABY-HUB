import { Avatar, Card, Group, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { TbEye, TbMessageCircle } from "react-icons/tb";
import Button from "../Button";
import IBabysitter from "../../interface/BabySitter";

interface BabysitterCardProps {
  babysitter: IBabysitter;
  labels: {
    age: string;
    contact: string;
    location: string;
    moreDetails: string;
  };
  onContact?: (id?: string) => void;
  onDetails: (id?: string) => void;
}

const BabysitterCard = ({
  babysitter,
  labels,
  onContact,
  onDetails,
}: BabysitterCardProps) => {
  return (
    <Card component="article" padding="lg" radius="md" shadow="xs" withBorder>
      <Stack gap="md">
      <Avatar
        src={babysitter.image || "/default-avatar.jpg"}
        alt={`${babysitter.name} profile`}
        radius="xl"
        size={84}
      />
      <Title order={2} size="h3">{babysitter.name}</Title>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
        <div>
          <Text c="dimmed" fw={700} size="sm">{labels.age}</Text>
          <Text>{babysitter.age}</Text>
        </div>
        <div>
          <Text c="dimmed" fw={700} size="sm">{labels.location}</Text>
          <Text>{babysitter.address}</Text>
        </div>
      </SimpleGrid>
      <Group grow>
        <Button onClick={() => onDetails(babysitter._id)} variant="secondary">
          <TbEye />
          {labels.moreDetails}
        </Button>
        {onContact && (
          <Button onClick={() => onContact(babysitter._id)}>
            <TbMessageCircle />
            {labels.contact}
          </Button>
        )}
      </Group>
      </Stack>
    </Card>
  );
};

export default BabysitterCard;
