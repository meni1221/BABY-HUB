import {
  Alert,
  Anchor,
  Container,
  Paper,
  PasswordInput,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Link, useSearchParams } from "react-router-dom";
import { TbLockCheck } from "react-icons/tb";
import Button from "../../components/Button";
import { usePasswordResetConfirm } from "../../hooks/usePasswordReset";
import { useLanguage } from "../../providers/LanguageProvider/context";

const ResetPasswordPage = () => {
  const { texts } = useLanguage();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const {
    confirmPassword,
    error,
    handleSubmit,
    isDone,
    isSubmitting,
    password,
    setConfirmPassword,
    setPassword,
  } = usePasswordResetConfirm(token);

  return (
    <Container maw={560} px={0}>
      <Stack gap="lg">
        <Stack gap={6} ta="center">
          <Title order={1} fz={{ base: 30, sm: 38 }} lh={1.12}>
            {texts.resetPasswordTitle}
          </Title>
          <Text c="dimmed" maw={460} mx="auto">
            {texts.resetPasswordSubtitle}
          </Text>
        </Stack>

        <Paper component="form" onSubmit={handleSubmit} p={{ base: "md", sm: "xl" }} radius="lg" shadow="sm" withBorder>
          <Stack gap="md">
            {!token && (
              <Alert color="red" role="alert">
                {texts.resetPasswordInvalidToken}
              </Alert>
            )}

            <PasswordInput
              id="password"
              label={texts.password}
              placeholder={texts.passwordPlaceholder}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
              disabled={!token || isDone}
              required
            />

            <PasswordInput
              id="confirmPassword"
              label={texts.resetPasswordConfirmLabel}
              placeholder={texts.passwordPlaceholder}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              autoComplete="new-password"
              disabled={!token || isDone}
              required
            />

            {isDone && (
              <Alert color="green" role="status">
                {texts.resetPasswordDoneText}
              </Alert>
            )}

            {error && (
              <Alert color="red" role="alert">
                {error}
              </Alert>
            )}

            <Button fullWidth loading={isSubmitting} disabled={!token || isDone} type="submit">
              <TbLockCheck />
              {texts.resetPasswordSubmit}
            </Button>
          </Stack>
        </Paper>

        <Text ta="center">
          <Anchor component={Link} fw={800} to="/login">
            {texts.forgotPasswordBackToLogin}
          </Anchor>
        </Text>
      </Stack>
    </Container>
  );
};

export default ResetPasswordPage;
