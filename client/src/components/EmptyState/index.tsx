import { Paper, Stack, Text, Title } from "@mantine/core";
import { ReactNode } from "react";

interface EmptyStateProps {
  action?: ReactNode;
  message: string;
  title: string;
}

const EmptyState = ({ action, message, title }: EmptyStateProps) => {
  return (
    <Paper
      aria-live="polite"
      component="section"
      p="xl"
      radius="md"
      shadow="xs"
      withBorder
    >
      <Stack align="center" gap="xs" ta="center">
      <Title order={2}>{title}</Title>
      <Text c="dimmed">{message}</Text>
      {action}
      </Stack>
    </Paper>
  );
};

export default EmptyState;
