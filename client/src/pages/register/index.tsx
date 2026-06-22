import { RegisterParent } from "./registerParent";
import { RegisterBaybisitter } from "./registerBaybisitter";
import { useLanguage } from "../../providers/LanguageProvider/context";
import { TbUserHeart, TbUsers } from "react-icons/tb";
import SegmentedControl from "../../components/SegmentedControl";
import { useRegisterRole } from "../../hooks/useRegisterRole";
import { Container, Paper, Stack, Text, Title } from "@mantine/core";

export const Register = () => {
  const { role, setRole } = useRegisterRole();
  const { texts } = useLanguage();
  const selectedRoleLabel = role === "babysitter" ? texts.babysitter : texts.parent;

  return (
    <Container maw={860} px={0}>
      <Stack gap="lg">
        <Stack gap={6} ta="center">
          <Title order={1} fz={{ base: 30, sm: 38 }} lh={1.12}>
            {texts.registerTitle}
          </Title>
          <Text c="dimmed" maw={520} mx="auto">
            {texts.registerSubtitle}
          </Text>
        </Stack>

        <Paper p={{ base: "md", sm: "lg" }} radius="lg" shadow="sm" withBorder>
          <Stack gap="xs">
            <Text fw={800}>{texts.selectAccountType}</Text>
            <Text c="dimmed" fz="sm">
              {selectedRoleLabel}
            </Text>
            <SegmentedControl
              ariaLabel={texts.selectAccountType}
              fullWidth
              mb={0}
              onChange={setRole}
              options={[
                { icon: <TbUserHeart />, label: texts.babysitter, value: "babysitter" },
                { icon: <TbUsers />, label: texts.parent, value: "parent" },
              ]}
              value={role}
            />
          </Stack>
        </Paper>

        {role === "parent" && <RegisterParent />}
        {role === "babysitter" && <RegisterBaybisitter />}
      </Stack>
    </Container>
  );
};
