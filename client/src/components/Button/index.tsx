import { Button as MantineButton, ButtonProps as MantineButtonProps } from "@mantine/core";
import { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends Record<string, unknown> {
  children: ReactNode;
  variant?: ButtonVariant;
}

const variantMap: Record<ButtonVariant, MantineButtonProps["variant"]> = {
  danger: "filled",
  ghost: "subtle",
  primary: "filled",
  secondary: "light",
};

const Button = ({
  children,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) => {
  const buttonType = type as "button" | "submit" | "reset" | undefined;

  return (
    <MantineButton
      color={variant === "danger" ? "red" : "babyhub"}
      radius="md"
      variant={variantMap[variant]}
      type={buttonType}
      {...(props as MantineButtonProps)}
    >
      {children}
    </MantineButton>
  );
};

export default Button;
