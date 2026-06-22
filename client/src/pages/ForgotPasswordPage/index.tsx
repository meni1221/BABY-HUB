import {
  Alert,
  Anchor,
  Container,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { TbMail } from "react-icons/tb";
import Button from "../../components/Button";
import { usePasswordResetRequest } from "../../hooks/usePasswordReset";
import { useLanguage } from "../../providers/LanguageProvider/context";

const ForgotPasswordPage = () => {
  const { texts } = useLanguage();
  const {
    email,
    error,
    handleSubmit,
    isSent,
    isSubmitting,
    setEmail,
  } = usePasswordResetRequest();

  return (
    <Container maw={560} px={0}>
      <Stack gap="lg">
        <Stack gap={6} ta="center">
          <Title order={1} fz={{ base: 30, sm: 38 }} lh={1.12}>
            {texts.forgotPasswordTitle}
          </Title>
          <Text c="dimmed" maw={460} mx="auto">
            {texts.forgotPasswordSubtitle}
          </Text>
        </Stack>

        <Paper component="form" onSubmit={handleSubmit} p={{ base: "md", sm: "xl" }} radius="lg" shadow="sm" withBorder>
          <Stack gap="lg">
            <TextInput
              id="email"
              label={texts.email}
              type="email"
              placeholder={texts.emailPlaceholder}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />

            {isSent && (
              <Alert color="green" role="status">
                {texts.forgotPasswordSentText}
              </Alert>
            )}

            {error && (
              <Alert color="red" role="alert">
                {error}
              </Alert>
            )}

            <Button fullWidth loading={isSubmitting} type="submit">
              <TbMail />
              {texts.forgotPasswordSubmit}
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

export default ForgotPasswordPage;
