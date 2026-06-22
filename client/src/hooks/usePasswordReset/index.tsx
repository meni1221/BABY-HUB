import { FormEvent, useState } from "react";
import { apiUrl } from "../../config/api";
import { useLanguage } from "../../providers/LanguageProvider/context";
import { useNotification } from "../../providers/NotificationProvider/context";
import { logger } from "../../utils/logger";

interface RequestResetPayload {
  email: string;
}

interface ConfirmResetPayload {
  password: string;
  token: string;
}

const postPasswordReset = async (path: string, body: object) => {
  const response = await fetch(apiUrl(path), {
    body: JSON.stringify(body),
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });

  if (!response.ok) {
    const error = (await response.json().catch(() => null)) as
      | { message?: string }
      | null;
    throw new Error(error?.message || "Password reset request failed");
  }

  return response.json();
};

export const usePasswordResetRequest = () => {
  const { texts } = useLanguage();
  const { notify } = useNotification();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await postPasswordReset("auth/password-reset/request", {
        email,
      } satisfies RequestResetPayload);
      setIsSent(true);
      notify({
        message: texts.feedbackPasswordResetRequestSuccessMessage,
        title: texts.feedbackPasswordResetRequestSuccessTitle,
        tone: "success",
      });
    } catch (error) {
      logger.error("Password reset request failed", error);
      const errorMessage =
        error instanceof Error ? error.message : texts.feedbackGenericErrorMessage;

      setError(errorMessage);
      notify({
        message: errorMessage,
        title: texts.feedbackPasswordResetErrorTitle,
        tone: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    email,
    error,
    handleSubmit,
    isSent,
    isSubmitting,
    setEmail,
  };
};

export const usePasswordResetConfirm = (token: string) => {
  const { texts } = useLanguage();
  const { notify } = useNotification();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (password.length < 8) {
      setError(texts.feedbackPasswordTooShortMessage);
      notify({
        message: texts.feedbackPasswordTooShortMessage,
        title: texts.feedbackPasswordResetErrorTitle,
        tone: "warning",
      });
      return;
    }

    if (password !== confirmPassword) {
      setError(texts.feedbackPasswordMismatchMessage);
      notify({
        message: texts.feedbackPasswordMismatchMessage,
        title: texts.feedbackPasswordResetErrorTitle,
        tone: "warning",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await postPasswordReset("auth/password-reset/confirm", {
        password,
        token,
      } satisfies ConfirmResetPayload);
      setIsDone(true);
      notify({
        message: texts.feedbackPasswordResetConfirmSuccessMessage,
        title: texts.feedbackPasswordResetConfirmSuccessTitle,
        tone: "success",
      });
    } catch (error) {
      logger.error("Password reset confirm failed", error);
      const errorMessage =
        error instanceof Error ? error.message : texts.feedbackGenericErrorMessage;

      setError(errorMessage);
      notify({
        message: errorMessage,
        title: texts.feedbackPasswordResetErrorTitle,
        tone: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    confirmPassword,
    error,
    handleSubmit,
    isDone,
    isSubmitting,
    password,
    setConfirmPassword,
    setPassword,
  };
};
