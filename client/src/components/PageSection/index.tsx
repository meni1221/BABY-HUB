import { Box, Stack, Text, Title } from "@mantine/core";
import { ReactNode } from "react";

interface PageSectionProps {
  children: ReactNode;
  id: string;
  subtitle?: string;
  title: string;
}

const PageSection = ({ children, id, subtitle, title }: PageSectionProps) => {
  return (
    <Box component="section" aria-labelledby={id}>
      <Stack gap="lg">
        <Stack gap={4}>
          <Title id={id} order={2} size="h3">
            {title}
          </Title>
          {subtitle && (
            <Text c="dimmed" maw={720}>
              {subtitle}
            </Text>
          )}
        </Stack>

        {children}
      </Stack>
    </Box>
  );
};

export default PageSection;
