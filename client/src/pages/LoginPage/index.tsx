import {
  Alert,
  Anchor,
  Container,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { useLanguage } from "../../providers/LanguageProvider/context";
import { TbLogin2, TbUserHeart, TbUsers } from "react-icons/tb";
import Button from "../../components/Button";
import SegmentedControl from "../../components/SegmentedControl";
import { useLoginForm } from "../../hooks/useLoginForm";

export const LoginPage = () => {
  const { texts } = useLanguage();
  const {
    authContext,
    email,
    handleInputChange,
    handleRoleChange,
    handleSubmit,
    password,
    role,
  } = useLoginForm();

  if (!authContext) {
    return (
      <Alert color="red" role="alert">
        {texts.authContextUnavailable}
      </Alert>
    );
  }

  const selectedRoleLabel = role === "babysitter" ? texts.babysitter : texts.parent;

  return (
    <Container maw={560} px={0}>
      <Stack gap="lg">
        <Stack gap={6} ta="center">
          <Title order={1} fz={{ base: 30, sm: 38 }} lh={1.12}>
            {texts.loginTitle}
          </Title>
          <Text c="dimmed" maw={440} mx="auto">
            {texts.loginSubtitle}
          </Text>
        </Stack>

        <Paper p={{ base: "md", sm: "xl" }} radius="lg" shadow="sm" withBorder>
          <Stack gap="lg">
            <Stack gap="xs">
              <Group justify="space-between" align="flex-end" gap="xs">
                <Stack gap={2}>
                  <Text fw={800}>{texts.selectAccountType}</Text>
                  <Text c="dimmed" fz="sm">
                    {selectedRoleLabel}
                  </Text>
                </Stack>
              </Group>

              <SegmentedControl
                ariaLabel={texts.selectAccountType}
                fullWidth
                mb={0}
                onChange={handleRoleChange}
                options={[
                  { icon: <TbUserHeart />, label: texts.babysitter, value: "babysitter" },
                  { icon: <TbUsers />, label: texts.parent, value: "parent" },
                ]}
                value={role}
              />
            </Stack>

            <Divider />

            <Stack component="form" gap="md" onSubmit={handleSubmit}>
              <TextInput
                id="email"
                label={texts.email}
                type="email"
                placeholder={texts.emailPlaceholder}
                value={email}
                onChange={handleInputChange}
                autoComplete="email"
                required
              />

              <PasswordInput
                id="password"
                label={texts.password}
                placeholder={texts.passwordPlaceholder}
                value={password}
                onChange={handleInputChange}
                autoComplete="current-password"
                required
              />

              <Anchor component={Link} fw={800} fz="sm" to="/forgot-password">
                {texts.forgotPasswordLink}
              </Anchor>

              {authContext.error && (
                <Alert color="red" role="alert">
                  {authContext.error}
                </Alert>
              )}

              <Button fullWidth size="md" type="submit">
                <TbLogin2 />
                {texts.loginSubmit}
              </Button>
            </Stack>
          </Stack>
        </Paper>

        <Group justify="center">
          <Text c="dimmed" ta="center">
            {texts.loginNoAccount}{" "}
            <Anchor component={Link} fw={800} to="/register">
              {texts.loginRegisterLink}
            </Anchor>
          </Text>
        </Group>
      </Stack>
    </Container>
  );
};
