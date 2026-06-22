import { FormEvent, useState } from "react";
import { apiUrl } from "../../config/api";
import { logger } from "../../utils/logger";

type ResetRole = "babysitter" | "parent";

interface RequestResetPayload {
  email: string;
  role: ResetRole;
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
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [role, setRole] = useState<ResetRole>("parent");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await postPasswordReset("auth/password-reset/request", {
        email,
        role,
      } satisfies RequestResetPayload);
      setIsSent(true);
    } catch (error) {
      logger.error("Password reset request failed", error);
      setError(error instanceof Error ? error.message : "Password reset request failed");
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
    role,
    setEmail,
    setRole,
  };
};

export const usePasswordResetConfirm = (token: string) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsSubmitting(true);

    try {
      await postPasswordReset("auth/password-reset/confirm", {
        password,
        token,
      } satisfies ConfirmResetPayload);
      setIsDone(true);
    } catch (error) {
      logger.error("Password reset confirm failed", error);
      setError(error instanceof Error ? error.message : "Password reset failed");
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
