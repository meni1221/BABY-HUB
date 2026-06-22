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
import { TbLogin2 } from "react-icons/tb";
import Button from "../../components/Button";
import { useLoginForm } from "../../hooks/useLoginForm";

export const LoginPage = () => {
  const { texts } = useLanguage();
  const {
    authContext,
    email,
    handleInputChange,
    handleSubmit,
    password,
  } = useLoginForm();

  if (!authContext) {
    return (
      <Alert color="red" role="alert">
        {texts.authContextUnavailable}
      </Alert>
    );
  }

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

              <Divider />

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
